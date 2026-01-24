---
title: "Understanding React's useEffectEvent: A Complete Guide to Solving Stale Closures"
description: React 19.2's useEffectEvent hook eliminates the useRef workaround pattern for accessing latest state in Effects. Learn when and how to use it.
pubDatetime: 2026-01-09T14:00:00.000Z
draft: false
tags:
  - react
  - react19
  - hooks
  - javascript
  - typescript
categories:
  - react
  - javascript
ogImage: /images/use-effect-event-og.png
---

# Understanding React's useEffectEvent: A Complete Guide to Solving Stale Closures

## TL;DR

`useEffectEvent` lets you read the latest props/state inside an Effect without adding them to the dependency array. This means the Effect won't re-run when those values change. [Jump to the first example](#example-1-chat-room-connection).

![Understanding React's useEffectEvent - Say Goodbye to Stale Closures](/images/use-effect-event-og.png)

---

## The Core Problem

Here's the situation: you have a `useEffect` that sets up something expensive—a WebSocket connection, an interval timer, a subscription. Inside that setup, your callback needs to read some state. But you don't want changes to that state to tear down and rebuild your connection.

**The tension:**
- If you include the state in the dependency array → Effect re-runs, connection restarts (bad)
- If you exclude the state from dependencies → callback sees stale value (also bad)

`useEffectEvent` solves this. It gives you a function that always reads the latest values when called, but isn't treated as a reactive dependency.

---

## Example 1: Chat Room Connection

Let's build a chat component. When a message arrives, we want to play a sound—but only if the user hasn't muted notifications.

### The Broken Version (Stale Closure)

```tsx
import { useEffect, useState } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = connectToRoom(roomId);

    connection.on("message", (message: string) => {
      // BUG: This captures the initial value of isMuted
      // It will NEVER see updates when the user toggles the checkbox!
      if (!isMuted) {
        playSound();
      }
    });

    return () => connection.disconnect();
  }, [roomId]); // ❌ isMuted is missing - callback sees stale value!

  return (
    <div>
      <h1>Chat Room: {roomId}</h1>
      <label>
        <input
          type="checkbox"
          checked={isMuted}
          onChange={(e) => setIsMuted(e.target.checked)}
        />
        Mute notifications
      </label>
    </div>
  );
}
```

**What goes wrong:** The callback captures `isMuted` when the Effect first runs. User toggles mute? The callback still sees the old value. The [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) is stale.

### The "Fix" That Creates a New Problem

You might think: "Just add `isMuted` to the dependency array!"

```tsx
useEffect(() => {
  const connection = connectToRoom(roomId);

  connection.on("message", (message: string) => {
    if (!isMuted) {
      playSound();
    }
  });

  return () => connection.disconnect();
}, [roomId, isMuted]); // ❌ Now isMuted triggers reconnection!
```

Now the callback sees the latest value... but every time `isMuted` changes:

1. React runs the cleanup function → `connection.disconnect()`
2. React runs the Effect again → `connectToRoom(roomId)`
3. New message handler is registered

**Toggling a mute checkbox causes a chat reconnection!** Messages might be missed during reconnection. The server sees connection churn. It's wasteful and broken.

### The Solution: useEffectEvent

```tsx
import { useEffect, useState, useEffectEvent } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  const [isMuted, setIsMuted] = useState(false);

  // Create an Effect Event - reads latest isMuted when called
  const onMessage = useEffectEvent((message: string) => {
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = connectToRoom(roomId);
    connection.on("message", onMessage);
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only roomId triggers reconnection

  return (
    <div>
      <h1>Chat Room: {roomId}</h1>
      <label>
        <input
          type="checkbox"
          checked={isMuted}
          onChange={(e) => setIsMuted(e.target.checked)}
        />
        Mute notifications
      </label>
    </div>
  );
}
```

**What happens now:**
- Change `roomId` → reconnect (correct!)
- Toggle `isMuted` → nothing happens to connection
- Message arrives → `onMessage` checks **current** `isMuted` value

The Effect only cares about `roomId`. The `onMessage` function reads `isMuted` when called, getting whatever the current value is at that moment.

---

## Example 2: REST Polling Dashboard

Here's another common scenario: a dashboard that polls an API every 10 seconds. The request includes a filter option that the user can toggle.

### The Broken Version (Timer Resets)

```tsx
import { useEffect, useState } from "react";

function Dashboard({ teamId }: { teamId: string }) {
  const [includeArchived, setIncludeArchived] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/team/${teamId}/tasks?archived=${includeArchived}`
      );
      const json = await response.json();
      setData(json);
    };

    fetchData(); // Fetch immediately
    const intervalId = setInterval(fetchData, 10000); // Then every 10 seconds

    return () => clearInterval(intervalId);
  }, [teamId, includeArchived]); // ❌ Toggling checkbox restarts the timer!

  return (
    <div>
      <h1>Team Dashboard</h1>
      <label>
        <input
          type="checkbox"
          checked={includeArchived}
          onChange={(e) => setIncludeArchived(e.target.checked)}
        />
        Include archived tasks
      </label>

      <ul>
        {data?.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**What goes wrong:** Every time user toggles "Include archived":

1. Effect cleanup runs → `clearInterval(intervalId)`
2. Effect runs again → new interval starts from zero

If user toggles 5 times in 3 seconds, the timer resets 5 times and never actually fires. No data gets fetched until they stop clicking.

### The Solution: useEffectEvent

```tsx
import { useEffect, useState, useEffectEvent } from "react";

function Dashboard({ teamId }: { teamId: string }) {
  const [includeArchived, setIncludeArchived] = useState(false);
  const [data, setData] = useState(null);

  // Effect Event reads latest includeArchived when called
  const fetchData = useEffectEvent(async () => {
    const response = await fetch(
      `/api/team/${teamId}/tasks?archived=${includeArchived}`
    );
    const json = await response.json();
    setData(json);
  });

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [teamId]); // ✅ Only teamId restarts the interval

  return (
    <div>
      <h1>Team Dashboard</h1>
      <label>
        <input
          type="checkbox"
          checked={includeArchived}
          onChange={(e) => setIncludeArchived(e.target.checked)}
        />
        Include archived tasks
      </label>

      <ul>
        {data?.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**What happens now:**
- Change `teamId` → restart interval, fetch new team's data (correct!)
- Toggle "Include archived" → interval keeps running uninterrupted
- Next fetch → uses current `includeArchived` value

---

## The Old Workaround: useRef

Before `useEffectEvent`, the standard pattern was to mirror values into a `useRef`:

```tsx
function Dashboard({ teamId }: { teamId: string }) {
  const [includeArchived, setIncludeArchived] = useState(false);
  const [data, setData] = useState(null);

  // Step 1: Create a ref
  const includeArchivedRef = useRef(includeArchived);

  // Step 2: Keep ref in sync with state
  useEffect(() => {
    includeArchivedRef.current = includeArchived;
  }, [includeArchived]);

  // Step 3: Read from ref in your Effect
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/team/${teamId}/tasks?archived=${includeArchivedRef.current}`
      );
      const json = await response.json();
      setData(json);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [teamId]);

  // ... JSX
}
```

**This works**, but:
- Extra `useRef` declaration
- Extra `useEffect` to keep it synced
- Remember to read `.current` not the state directly
- Repeat for every value you need to "escape"

`useEffectEvent` automates this exact pattern.

---

## A Note on Function Identity

> **⚠️ Common confusion: is the returned function stable?**
>
> You might wonder: is `onMessage` (the function returned by `useEffectEvent`) stable—the same reference each render like `useCallback` provides?
>
> **No, and it doesn't matter.**
>
> React returns a new `onMessage` function each render. If you put `onMessage` in a dependency array, your Effect would re-run every render—which is a sign you're using it wrong.
>
> **Why it still works:** Every version of `onMessage` (from render 1, render 2, etc.) reads from the same internal ref. React keeps that ref updated. So when a subscription calls the `onMessage` it captured on render 1, it still reads the current callback with current values.
>
> **Bottom line:** Don't worry about stability. Just follow the rule—call it from Effects, never list it as a dependency.

---

## How It Works Under the Hood

There's no magic here. `useEffectEvent` does exactly what you'd do with `useRef`, but React handles it for you.

Here's a conceptual model (not the actual React implementation):

```tsx
function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const latestCallbackRef = useRef(callback);

  // React actually updates this during commit phase, not render
  // (simplified here for clarity)
  latestCallbackRef.current = callback;

  // Returns a NEW function each render - intentionally!
  // All versions read from the same ref, so they all get latest values
  return ((...args: Parameters<T>) => {
    return latestCallbackRef.current(...args);
  }) as T;
}
```

**The key insight:** All function instances share the same ref. Even if your Effect captured an "old" function from render 1, calling it reads from `latestCallbackRef.current`—which points to the latest callback.

### Visualizing the Stale Closure Problem

![The Stale Closure Problem - callbacks capture values at creation time](/postimages2024/2026-01-09-useeffectevent/stale-closure-problem.svg)

### How useRef Solves It

![How useRef solves the stale closure problem](/postimages2024/2026-01-09-useeffectevent/useref-solution.svg)

### How useEffectEvent Works

![How useEffectEvent actually works - shared ref, not stable function](/postimages2024/2026-01-09-useeffectevent/useeffectevent-internals.svg)

### The Equivalence

![Conceptual equivalence between manual useRef pattern and useEffectEvent](/postimages2024/2026-01-09-useeffectevent/equivalence-diagram.svg)

---

## Rules and Caveats

`useEffectEvent` comes with important rules. The [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) (version 6.1.1+) enforces these.

### Rule 1: Only Call Effect Events from Inside Effects

Effect Events are designed for one purpose: being called from within Effects.

```tsx
// ✅ Correct: Called from inside an Effect
const onMessage = useEffectEvent((msg: string) => {
  console.log(msg, latestState);
});

useEffect(() => {
  socket.on("message", onMessage);
  return () => socket.off("message", onMessage);
}, []);

// ❌ Wrong: Called from an event handler
<button onClick={() => onMessage("hello")}>Click me</button>

// ❌ Wrong: Called during render
return <div>{onMessage("rendered")}</div>;
```

React actively guards against this—it will throw an error if you call an Effect Event outside an Effect context.

For regular event handlers (`onClick`, `onChange`, etc.), you don't need `useEffectEvent`. Those handlers run fresh on each interaction with current values.

### Rule 2: Don't Pass Effect Events to Other Components

Keep Effect Events local to their component:

```tsx
// ❌ Wrong: Passing Effect Event as a prop
function Parent() {
  const onTick = useEffectEvent(() => {
    console.log(latestCount);
  });

  return <Timer onTick={onTick} />; // Don't do this!
}

// ✅ Correct: Keep Effect Events local
function Parent() {
  const [count, setCount] = useState(0);

  const onTick = useEffectEvent(() => {
    console.log(count);
  });

  useEffect(() => {
    const id = setInterval(() => onTick(), 1000);
    return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}
```

### Rule 3: Don't Use useEffectEvent to Suppress Linter Warnings

This is about intent. Ask yourself: "When this value changes, should the Effect re-run?"

- **Yes** → It's a dependency, list it
- **No** → Wrap the logic in an Effect Event

```tsx
// ❌ Wrong: Using useEffectEvent to avoid listing page as dependency
const fetchData = useEffectEvent(async () => {
  const data = await fetch(`/api/items?page=${page}`);
  setItems(data);
});

useEffect(() => {
  fetchData();
}, []); // "Now I don't need page in deps!" <- Wrong thinking!

// ✅ Correct: page SHOULD be a dependency - you WANT to refetch when it changes
useEffect(() => {
  async function fetchData() {
    const data = await fetch(`/api/items?page=${page}`);
    setItems(data);
  }
  fetchData();
}, [page]);
```

---

## When Should You Use useEffectEvent?

Use it when you have a callback inside an Effect that:

1. **Is passed to a subscription, timer, or external library** that you don't want to re-register
2. **Needs to read the latest props/state** when it's called
3. **Those values shouldn't trigger the Effect to re-run**

| Scenario | Reactive (triggers Effect) | Non-reactive (Effect Event) |
|----------|---------------------------|----------------------------|
| Chat room connection | `roomId` | `isMuted`, `theme` |
| Polling dashboard | `teamId` | `includeArchived`, `sortOrder` |
| Analytics logging | `pageUrl` | `cartItemCount`, `userId` |
| WebSocket messages | `socketUrl` | `isOnline`, `preferences` |
| Interval timer | - (runs once) | `count`, `step` |

---

## React Version Notes

`useEffectEvent` was introduced as a stable feature in React 19.2. If you're on an earlier version:

- **React 18.x and earlier**: Use the `useRef` pattern described above
- **React 19.0-19.1**: `useEffectEvent` was available but experimental
- **React 19.2+**: Use `useEffectEvent` confidently

Check your React version:

```bash
npm list react
```

---

## Summary

`useEffectEvent` solves one specific problem: **reading fresh values in an Effect callback without those values causing the Effect to re-run.**

That's the whole thing. No other magic.

**The mental model:**
- **Dependencies** answer: "When should this Effect re-run?"
- **Effect Events** answer: "What values should I read when the Effect's callback runs?"

By separating these concerns, your code becomes clearer and bugs become harder to introduce.

---

## Further Reading

- [React Docs: useEffectEvent Reference](https://react.dev/reference/react/useEffectEvent) - Official API documentation
- [React Docs: Separating Events from Effects](https://react.dev/learn/separating-events-from-effects) - In-depth conceptual guide
- [React Docs: useEffect Reference](https://react.dev/reference/react/useEffect) - Comprehensive Effect documentation
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) - Understanding the JavaScript concept behind stale closures
