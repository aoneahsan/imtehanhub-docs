---
id: forms
title: Forms — React Hook Form + Zod + project-wide field components
sidebar_label: Forms
sidebar_position: 4
description: Every form uses React Hook Form + Zod with a shared field-component library. One pattern, full type-safety, isolated re-renders, accessible by default.
keywords:
  - React Hook Form Zod
  - shared form field components
  - typed forms TypeScript
  - accessible forms Radix
  - Pakistani app forms
slug: /developers/architecture/forms
---

# Forms

**Every form in ImtehanHub is built with React Hook Form + Zod**. No exceptions, no second pattern, no "this one's small so we'll just use `useState`". The reason is uniformity: one mental model, one validation system, one set of accessibility defaults across every input the user touches.

> **TL;DR** — `useForm` with `zodResolver`. Schema lives outside the component. Render via shared `<TextField>`, `<SelectField>`, `<TextAreaField>` etc. from `src/components/form-fields/`. Use `useWatch` for subscriptions, never `watch()` in render. `mode: 'onSubmit'`, `reValidateMode: 'onBlur'` for performance.

## The canonical form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, SelectField } from '@/components/form-fields';

// 1) Schema — outside the component so it's stable across renders (valid-resolver-caching)
const profileSchema = z.object({
  displayName: z
    .string()
    .min(3, 'Display name must be at least 3 characters')
    .max(30, 'Display name must be 30 characters or fewer'),
  selectedClass: z.enum(['class-9', 'class-10', '1st-year', '2nd-year']),
  selectedBoard: z.string().min(1, 'Pick a board'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// 2) Component
function ProfileForm({ initial, onSubmit }: { initial: ProfileFormData; onSubmit: (d: ProfileFormData) => Promise<void> }) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initial,        // formcfg-default-values
    mode: 'onSubmit',              // formcfg-validation-mode
    reValidateMode: 'onBlur',      // formcfg-revalidate-mode
  });

  const { handleSubmit, control, formState: { isSubmitting } } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        control={control}
        name="displayName"
        label="Display name"
        placeholder="What should we call you?"
        required
      />
      <SelectField
        control={control}
        name="selectedClass"
        label="Your class"
        options={CLASS_OPTIONS}
        required
      />
      <SelectField
        control={control}
        name="selectedBoard"
        label="Examination board"
        options={BOARD_OPTIONS}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        Save changes
      </Button>
    </form>
  );
}
```

Every form in the app looks like this. Differences are only the shape of the schema, the field components used, and the submit handler.

## The shared field components

`src/components/form-fields/` holds wrappers for every field type the app uses:

| Component | Wraps | Used for |
|---|---|---|
| `TextField` | Radix TextField | Plain text input |
| `TextAreaField` | Radix TextArea | Multi-line input |
| `SelectField` | Radix Select | Single-choice dropdown |
| `RadioCardField` | Radix RadioGroup + custom card UI | Card-based picker (≤ 7 options) |
| `CheckboxField` | Radix Checkbox | Boolean |
| `NumberField` | Radix TextField + `inputMode="numeric"` | Numbers with formatting |
| `DateField` | Radix Popover + date picker | Date picker |
| `FileField` | Custom `<input type="file">` + drag-drop overlay | File uploads (CNIC, avatar) |
| `BilingualField` | Two TextField/TextAreaField side-by-side | EN + UR pairs (community submissions) |
| `TagsField` | Radix TextField + chip rendering | Comma-separated tags |

Every field component:

- Accepts `control` from `useForm` and `name` (typed against the schema).
- Renders a label, the input, and an error message below.
- Handles `required` indicator (`*`) and `disabled` state consistently.
- Exposes `helpText` for inline hints.
- Internally uses `useController` (not `register`) so re-renders stay isolated to that field — see `ctrl-usecontroller-isolation` in `react-hook-form` rules.

Adding a new form field type means adding one wrapper here. Pages never reach for raw Radix components.

## Schema patterns

### Schema lives outside the component

```typescript
// ❌ Re-created on every render — defeats resolver caching
function MyForm() {
  const schema = z.object({ ... });
  const form = useForm({ resolver: zodResolver(schema) });
}

// ✅ Module-level — stable identity
const schema = z.object({ ... });
function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) });
}
```

### Conditional fields via discriminated union

When a form has fields that only exist in some modes (e.g. community submission for MCQ vs Long), use a discriminated union:

```typescript
const submissionSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('mcq'),
    question: z.string().min(10),
    questionUrdu: z.string().min(10),
    options: z.array(z.string()).length(4),
    correctIndex: z.number().int().min(0).max(3),
  }),
  z.object({
    kind: z.literal('long'),
    question: z.string().min(10),
    questionUrdu: z.string().min(10),
    expectedKeyPoints: z.array(z.string()).min(2),
  }),
  // ...
]);
```

The TypeScript type narrows correctly inside the form so `correctIndex` is only accessible when `kind === 'mcq'`.

### Async schemas — server-side checks

```typescript
const displayNameSchema = z.string().min(3).refine(
  async (name) => !(await userService.isDisplayNameTaken(name)),
  'Display name is already taken'
);
```

Async refinements run only on submit by default — they don't fire on every keystroke. For real-time availability checks, use a debounced async hook outside Zod (`useDebouncedCallback` + `userService.isDisplayNameTaken`).

## Subscriptions — `useWatch`, not `watch()`

`watch()` in render subscribes to **every** form value and re-renders the entire form on every keystroke. Always use `useWatch` with a specific name:

```typescript
// ❌ Re-renders entire form every keystroke
const allValues = watch();

// ❌ Still re-renders entire form
const displayName = watch('displayName');

// ✅ Isolated re-render — only this component re-renders when displayName changes
const displayName = useWatch({ control, name: 'displayName' });
```

For the live-character-count pattern below the textarea, isolate the watcher into a dedicated component:

```tsx
function CharacterCount({ control, name, max }: Props) {
  const value = useWatch({ control, name });
  return <span>{(value?.length ?? 0)} / {max}</span>;
}
```

That component re-renders on keystroke — the form does not.

## Validation modes

```typescript
useForm({
  mode: 'onSubmit',           // First validation runs on submit
  reValidateMode: 'onBlur',   // After first submit, re-validate fields on blur
});
```

This is the project default and the React Hook Form team's recommendation. `onChange` mode validates on every keystroke — slower, noisier, often worse UX because errors flash while the user is still typing.

The exceptions:
- **Sign-in / sign-up** can use `'onSubmit'` exclusively because the user submits immediately.
- **Multi-step wizards** validate per-step (`mode: 'onChange'` only for the active step's fields via `trigger`).

## Field arrays — useFieldArray correctly

For MCQ options or community-submission key points where the user adds rows:

```tsx
const { fields, append, remove } = useFieldArray({ control, name: 'options' });

return (
  <div>
    {fields.map((field, index) => (
      <TextField
        key={field.id}                       // array-use-field-id-as-key — never index
        control={control}
        name={`options.${index}`}
        label={`Option ${index + 1}`}
      />
    ))}
    <Button type="button" onClick={() => append('')}>Add option</Button>
  </div>
);
```

Key by `field.id` (RHF's stable ID), never by array index. Adding / removing rows preserves DOM identity, which preserves input focus and accessibility state.

## Default values — always provide them

```typescript
// ❌ Uncontrolled-then-controlled warning, missing fields, weird reset behaviour
const form = useForm({ resolver: zodResolver(schema) });

// ✅ Every field has a defaultValue, even if it's empty string / null / []
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    displayName: '',
    selectedClass: 'class-9',
    selectedBoard: '',
  },
});
```

For edit forms loading from the server, use `defaultValues: async () => fetchEntity(id)` — RHF will block render until the promise resolves.

## Submit handler — services, not raw mutations

```typescript
const onSubmit = handleSubmit(async (data) => {
  await profileService.updateProfile(user.uid, data);
  toast.success('Profile updated');
});
```

The service layer handles validation duplicates (same data goes through Zod on submission and Firestore security rules at the database). Forms never call repositories directly.

## Common questions

### Should I use `register` or `useController`?

`useController` (via the field wrappers). `register` works for very simple uncontrolled inputs but breaks when wrapping Radix components (which expect `value` + `onChange` props, not refs).

### Can I validate one field against another?

Yes — Zod's `superRefine` or `.refine()` with a path:

```typescript
z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords must match',
});
```

(ImtehanHub has no password forms today because we are Google-sign-in-only, but this pattern is used for "new email" / "confirm email" flows in admin tooling.)

### How do I handle file uploads in a form?

`FileField` stores the `File` object in the form value. On submit, the service layer uploads to Drive (or FilesHub) and stores the resulting URL in Firestore.

### My form is slow on every keystroke. What did I do wrong?

Almost always one of:
1. Calling `watch()` in render → switch to `useWatch` per-field.
2. Schema defined inside the component → hoist it to module level.
3. Re-rendering parent on every value change → isolate the watcher into a child.

## Next

- [Layer contracts](/docs/developers/architecture/layers) — where forms plug into services + repos.
- [State management](/docs/developers/architecture/state) — RHF is one of the three state buckets.
- [Storage adapter](/docs/developers/architecture/storage) — how form drafts (e.g. an in-progress test) persist.
