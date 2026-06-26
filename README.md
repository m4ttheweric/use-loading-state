# useLoadingState

A tiny React hook for managing loading state around async work, so you stop wiring up `useState(false)` plus `try` / `finally` by hand in every handler.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live demo: https://use-loading-state.netlify.app/

## Why

Every async handler in React tends to grow the same boilerplate: a loading flag, a `setLoading(true)`, and a `finally` to set it back. `useLoadingState` wraps that pattern in one hook. Hand it a promise-returning function and it tracks the loading state for you, including when several independent tasks are in flight at once.

## Install

```bash
npm install @m4ttheweric/use-loading-state
# or
yarn add @m4ttheweric/use-loading-state
# or
bun add @m4ttheweric/use-loading-state
```

React 18 is a peer dependency.

## Quick start

```tsx
import { useLoadingState } from '@m4ttheweric/use-loading-state';

function SaveButton() {
  const [runTask, { isLoading }] = useLoadingState();

  return (
    <button disabled={isLoading} onClick={() => runTask(() => saveToServer())}>
      {isLoading ? 'Saving...' : 'Save'}
    </button>
  );
}
```

`runTask` runs your async function, flips `isLoading` to `true` while it runs, and flips it back when the promise settles (even if it throws).

## API

```ts
const [runTask, { isLoading, isIdLoading, loadingIds }] =
  useLoadingState<IdType>(defaultTask?);
```

### Arguments

- `defaultTask?: () => Promise<unknown>` (optional): if you pass it, `runTask()` with no arguments runs this task.
- `IdType` (optional generic): narrows your loading ids to a literal union, e.g. `useLoadingState<'save' | 'delete'>()`.

### `runTask(params?)`

Accepts either a function or an options object, and returns the original promise (so you can `await` it or chain `.catch()`):

```ts
runTask(() => doThing());
runTask({ task: () => doThing(), loadingId: 'save' });
```

### State object

| Property | Type | Description |
| --- | --- | --- |
| `isLoading` | `boolean` | `true` while a task is running |
| `isIdLoading` | `(id: IdType) => boolean` | whether a specific named task is running |
| `loadingIds` | `Set<IdType>` | the named tasks currently running |

## Tracking multiple tasks independently

Pass a `loadingId` and check it with `isIdLoading`. This is the clean way to show a spinner on the exact row or button that's busy, without a separate `useState` per item:

```tsx
function ItemList({ items }) {
  const [runTask, { isIdLoading }] = useLoadingState();

  return items.map(item => (
    <button
      key={item.id}
      disabled={isIdLoading(item.id)}
      onClick={() => runTask({ loadingId: item.id, task: () => remove(item.id) })}
    >
      {isIdLoading(item.id) ? 'Removing...' : 'Remove'}
    </button>
  ));
}
```

## Errors

The error is re-thrown after the loading state is cleared, so the flag never gets stuck. Handle it however you like:

```tsx
runTask({ loadingId: 'save', task: () => save() }).catch(err =>
  notify(err.message)
);
```

## Default task

If you only ever run one task, set it once and call `runTask()` bare:

```tsx
const [runTask, { isLoading }] = useLoadingState(() =>
  fetch('/api/data').then(r => r.json())
);

<button disabled={isLoading} onClick={() => runTask()}>
  Load
</button>;
```

## Local development

```bash
bun install
bun run dev      # demo app
bun test         # vitest
```

## License

MIT
