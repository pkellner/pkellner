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

`useEffectEvent` lets you read the latest props/state inside an Effect without adding them to the dependency array. It eliminates the need for `useRef` workarounds when you need a stable callback that always sees current values. [Jump to the comparison](#side-by-side-comparison-the-aha-moment).

![Understanding React's useEffectEvent - Say Goodbye to Stale Closures](/images/use-effect-event-og.png)

---

## Introduction

If you've worked with [React](https://react.dev/) hooks for any length of time, you've likely encountered this frustrating situation: you set up a subscription or timer inside `useEffect`, and the callback needs to read the latest state. But if you add that state to the dependency array, your Effect re-runs (and re-subscribes) every time the state changes. That's wasteful at best and broken at worst.

The traditional workaround? Mirror your state into a `useRef` so the callback can read it without adding a dependency. It works, but it's boilerplate-heavy and easy to get wrong.

[React 19.2](https://react.dev/) introduced `useEffectEvent` to solve this problem cleanly. This hook creates a stable function that always reads the latest values when called—without requiring those values in your Effect's dependencies.

This post will walk you through:
1. The problem `useEffectEvent` solves
2. The old `useRef` workaround and its drawbacks
3. How `useEffectEvent` works under the hood
4. Practical examples showing both approaches
5. Rules and caveats you need to know

## The Problem: Stale Closures in Effects

Let's start with a concrete problem. You're building a chat app that connects to a room. When you receive a message, you want to show a notification—but only if notifications are enabled.

Here's the "obvious" approach that **doesn't work**:

```tsx
import { useEffect, useState } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const connection = connectToRoom(roomId);

    connection.on("message", (message: string) => {
      // BUG: This captures the initial value of notificationsEnabled
      // It will NEVER see updates when the user toggles the checkbox!
      if (notificationsEnabled) {
        showNotification(message);
      }
    });

    return () => connection.disconnect();
  }, [roomId]); // notificationsEnabled is NOT in deps

  return (
    <label>
      <input
        type="checkbox"
        checked={notificationsEnabled}
        onChange={(e) => setNotificationsEnabled(e.target.checked)}
      />
      Enable notifications
    </label>
  );
}
```

The callback inside `connection.on("message", ...)` creates a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) that captures `notificationsEnabled` at the time the Effect runs. Since `notificationsEnabled` isn't in the dependency array, the Effect only runs once when `roomId` changes. The callback forever sees the original value.

### The "Fix" That Creates a New Problem

You might think: "Easy, just add `notificationsEnabled` to the dependencies!"

```tsx
useEffect(() => {
  const connection = connectToRoom(roomId);

  connection.on("message", (message: string) => {
    if (notificationsEnabled) {
      showNotification(message);
    }
  });

  return () => connection.disconnect();
}, [roomId, notificationsEnabled]); // Now notificationsEnabled is a dep
```

Now the callback sees the latest value... but there's a catch. Every time `notificationsEnabled` changes, the Effect runs again. That means:

1. Disconnect from the room
2. Reconnect to the room
3. Re-register the message handler

Toggling a notification checkbox shouldn't cause a chat reconnection! The user experience would be terrible—messages might be missed during reconnection, the connection count on the server spikes, and it's just wasteful.

This is the core tension `useEffectEvent` resolves: **some values should trigger Effect re-runs (like `roomId`), while others should be read when needed but not trigger re-runs (like `notificationsEnabled`)**.

## The Old Workaround: useRef

Before `useEffectEvent`, the standard pattern was to "escape" the closure by mirroring values into a `useRef`:

```tsx
import { useEffect, useRef, useState } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mirror the value into a ref
  const notificationsEnabledRef = useRef(notificationsEnabled);

  // Keep the ref in sync with state
  useEffect(() => {
    notificationsEnabledRef.current = notificationsEnabled;
  }, [notificationsEnabled]);

  useEffect(() => {
    const connection = connectToRoom(roomId);

    connection.on("message", (message: string) => {
      // Read from the ref instead of the closure
      if (notificationsEnabledRef.current) {
        showNotification(message);
      }
    });

    return () => connection.disconnect();
  }, [roomId]); // Only roomId triggers reconnection

  return (
    <label>
      <input
        type="checkbox"
        checked={notificationsEnabled}
        onChange={(e) => setNotificationsEnabled(e.target.checked)}
      />
      Enable notifications
    </label>
  );
}
```

This works! The connection Effect only re-runs when `roomId` changes. The message handler reads from `notificationsEnabledRef.current`, which is always up to date.

### Why the useRef Pattern Is Problematic

1. **Boilerplate**: Every value you want to "escape" requires a ref, a sync Effect, and remembering to read `.current`

2. **Easy to forget**: When you add a new value the callback needs, you must remember to add another ref and sync Effect

3. **Clutters your component**: The "real" logic gets buried under ref management

4. **Not enforced by the linter**: The ESLint rules for hooks can't verify you're using refs correctly

## Enter useEffectEvent

`useEffectEvent` provides a first-class solution. It returns a stable function that, when called, always executes with the latest props and state.

```tsx
import { useEffect, useState, useEffectEvent } from "react";

function ChatRoom({ roomId }: { roomId: string }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Create an Effect Event that reads latest values
  const onMessage = useEffectEvent((message: string) => {
    if (notificationsEnabled) {
      showNotification(message);
    }
  });

  useEffect(() => {
    const connection = connectToRoom(roomId);
    connection.on("message", onMessage);
    return () => connection.disconnect();
  }, [roomId]); // Only roomId triggers reconnection

  return (
    <label>
      <input
        type="checkbox"
        checked={notificationsEnabled}
        onChange={(e) => setNotificationsEnabled(e.target.checked)}
      />
      Enable notifications
    </label>
  );
}
```

Notice what's different:

- No refs
- No sync Effects
- No `.current` reads
- The `onMessage` function is stable (same identity across renders)
- But when called, it sees the current `notificationsEnabled` value

## Side-by-Side Comparison: The Aha Moment

Let's look at both approaches for a practical example: tracking page visits with analytics.

### The Problem

You want to log page visits whenever the URL changes. The log should include:
- The URL that was visited (reactive—should trigger the log)
- The current number of cart items (not reactive—shouldn't trigger a new log)

### Without useEffectEvent (useRef workaround)

```tsx
import { useContext, useEffect, useRef } from "react";
import { ShoppingCartContext } from "./cart";

function Page({ url }: { url: string }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  // Step 1: Create a ref to hold the latest value
  const numberOfItemsRef = useRef(numberOfItems);

  // Step 2: Keep the ref synchronized
  useEffect(() => {
    numberOfItemsRef.current = numberOfItems;
  }, [numberOfItems]);

  // Step 3: Use the ref in your Effect
  useEffect(() => {
    logVisit(url, numberOfItemsRef.current);
  }, [url]); // Only url triggers re-run
}
```

**Lines of code for the workaround:** 8 (ref declaration, sync Effect, reading `.current`)

### With useEffectEvent

```tsx
import { useContext, useEffect, useEffectEvent } from "react";
import { ShoppingCartContext } from "./cart";

function Page({ url }: { url: string }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  // Create an Effect Event for the non-reactive logic
  const onVisit = useEffectEvent((visitedUrl: string) => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // Only url triggers re-run
}
```

**Lines of code:** 4 (just the Effect Event and Effect)

### Key Insight: Arguments vs Captured Values

Notice how I passed `url` as an argument to `onVisit()` rather than reading it directly inside the Effect Event. This is intentional and encouraged by the [React docs](https://react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events).

When you pass `url` as an argument:
- It's clear that different URLs represent different "events"
- The reactive value flows explicitly through the function call

When you read `numberOfItems` inside the Effect Event:
- It captures the latest value at call time
- It doesn't influence when the Effect runs

This pattern makes the reactive vs non-reactive split crystal clear.

## Is This Magic? (Spoiler: No, It's Just JavaScript)

When I first saw `useEffectEvent`, my reaction was: "Wait, how does this work? The callback just... knows the latest state? Is React doing something magical here?"

The answer is **no**. There's no magic, no special compiler tricks, no hidden React internals doing something impossible. `useEffectEvent` is doing exactly what you've been doing manually with `useRef`—React just automates the pattern for you.

Let's demystify this step by step with some diagrams.

### Understanding the Stale Closure Problem Visually

First, let's visualize why closures go stale. When you create a callback inside a component, it captures the values from that specific render:

![The Stale Closure Problem - callbacks capture values at creation time](/postimages2024/2026-01-09-useeffectevent/stale-closure-problem.svg)

The callback created in Render 1 captures `count = 0`. Even though the component re-renders with new values, that callback still holds onto its original closure. When the event finally fires, it reads the stale value.

### How useRef Solves It

The `useRef` pattern works because refs provide a **mutable container with a stable identity**:

![How useRef solves the stale closure problem](/postimages2024/2026-01-09-useeffectevent/useref-solution.svg)

The key insight: the ref object itself never changes identity. Your callback's closure captures the ref object (which stays the same), and when it runs, it reads `.current` (which has been updated). Indirection solves the problem!

### How useEffectEvent Works (The "Magic" Revealed)

Now here's the reveal: `useEffectEvent` does the **exact same thing**. React creates a stable wrapper function that delegates to an internal ref holding the latest callback:

![How useEffectEvent actually works - it's just the useRef pattern automated](/postimages2024/2026-01-09-useeffectevent/useeffectevent-internals.svg)

When you call the wrapper function that `useEffectEvent` returns:
1. It doesn't execute your callback directly
2. Instead, it looks up the latest version from an internal ref
3. Then it calls that latest version

This is why the returned function has a **stable identity** (same function reference across renders) but **reads the latest values** (because it delegates to the freshly-updated callback).

### The Equivalence

Here's the same thing expressed as code:

![Conceptual equivalence between manual useRef pattern and useEffectEvent](/postimages2024/2026-01-09-useeffectevent/equivalence-diagram.svg)

What you write with `useRef`:

```tsx
// Manual approach: 8 lines
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);

const handler = useCallback(() => {
  console.log(countRef.current);
}, []);
```

What `useEffectEvent` gives you:

```tsx
// useEffectEvent: 3 lines
const handler = useEffectEvent(() => {
  console.log(count);
});
```

Same behavior. Less code. The "magic" is just React automating a well-known pattern.

### A Conceptual Implementation

Here's what `useEffectEvent` is essentially doing under the hood:

```tsx
// This is NOT the actual React implementation, just a mental model
function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  // This ref holds the latest callback
  const latestCallbackRef = useRef(callback);

  // Update the ref after each render (synchronously, before Effects run)
  latestCallbackRef.current = callback;

  // Return a stable wrapper that calls the latest callback
  const stableWrapper = useCallback((...args: Parameters<T>) => {
    return latestCallbackRef.current(...args);
  }, []);

  return stableWrapper as T;
}
```

The real implementation is more sophisticated (it's integrated with React's internal [fiber architecture](https://github.com/acdlite/react-fiber-architecture)), but this captures the essence: **a stable identity wrapping an always-updated callback**.

### Why This Matters

Understanding that `useEffectEvent` isn't magic has practical benefits:

1. **Debugging**: When something goes wrong, you can reason about it—it's just refs and callbacks
2. **Mental model**: You understand *why* the rules exist (like "only call from Effects")
3. **Fallback knowledge**: On older React versions, you know exactly how to replicate the behavior
4. **Confidence**: You're not relying on "it just works"—you understand the mechanism

The best abstractions aren't magical black boxes. They're convenient wrappers around patterns you already understand.

## A More Complex Example: Muting a Chat Connection

Here's an example that really shows the value. Imagine a chat app where:
- Changing rooms should reconnect
- Toggling mute should NOT reconnect

### The Buggy Obvious Approach

```tsx
function Chat({ roomId }: { roomId: string }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = connectToRoom(roomId);

    connection.on("message", (message: string) => {
      // BUG: isMuted is stale!
      if (!isMuted) {
        playMessageSound();
      }
      addMessageToChat(message);
    });

    return () => connection.disconnect();
  }, [roomId]); // isMuted not in deps = stale

  return (
    <button onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
}
```

Toggle mute all you want—sounds will play based on the initial `isMuted` value.

### The Reconnecting "Fix"

```tsx
useEffect(() => {
  const connection = connectToRoom(roomId);

  connection.on("message", (message: string) => {
    if (!isMuted) {
      playMessageSound();
    }
    addMessageToChat(message);
  });

  return () => connection.disconnect();
}, [roomId, isMuted]); // Now it works... but reconnects on mute toggle
```

This works but has terrible UX. Every mute toggle:
1. Disconnects from chat
2. Reconnects
3. Potentially misses messages during reconnection

### The useRef Workaround

```tsx
function Chat({ roomId }: { roomId: string }) {
  const [isMuted, setIsMuted] = useState(false);

  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const connection = connectToRoom(roomId);

    connection.on("message", (message: string) => {
      if (!isMutedRef.current) {
        playMessageSound();
      }
      addMessageToChat(message);
    });

    return () => connection.disconnect();
  }, [roomId]);

  return (
    <button onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
}
```

Works correctly, but adds ref boilerplate.

### The Clean useEffectEvent Solution

```tsx
import { useEffect, useState, useEffectEvent } from "react";

function Chat({ roomId }: { roomId: string }) {
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent((message: string) => {
    if (!isMuted) {
      playMessageSound();
    }
    addMessageToChat(message);
  });

  useEffect(() => {
    const connection = connectToRoom(roomId);
    connection.on("message", onMessage);
    return () => connection.disconnect();
  }, [roomId]); // Clean: only roomId triggers reconnection

  return (
    <button onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
}
```

No refs, no extra Effects, no boilerplate. The separation of concerns is explicit:
- **Reactive (roomId)**: Changes trigger reconnection
- **Non-reactive (isMuted)**: Read latest value when needed, doesn't trigger reconnection

## Rules and Caveats

`useEffectEvent` is powerful but comes with important rules. The [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) (version 6.1.1+) enforces these.

### Rule 1: Only Call Effect Events from Inside Effects

Effect Events are designed for one purpose: being called from within Effects. They're not general-purpose stable callbacks.

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
<button onClick={() => onMessage("hello")}>
  Click me
</button>

// ❌ Wrong: Called during render
return <div>{onMessage("rendered")}</div>;
```

For regular event handlers (onClick, onChange, etc.), you don't need `useEffectEvent`. The handler runs with fresh values each time since it's created on each render.

### Rule 2: Don't Pass Effect Events to Other Components

Effect Events should be "local" to their component. Don't pass them as props:

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

If you're building a custom hook that needs a callback parameter, define the Effect Event inside the hook, not outside.

### Rule 3: Declare Effect Events Right Before the Effect That Uses Them

Keep the Effect Event declaration close to its usage:

```tsx
// ✅ Good: Effect Event declared right before its Effect
function Component() {
  const [value, setValue] = useState(0);

  const onInterval = useEffectEvent(() => {
    console.log("Current value:", value);
  });

  useEffect(() => {
    const id = setInterval(() => onInterval(), 1000);
    return () => clearInterval(id);
  }, []);
}

// ❌ Avoid: Effect Event far from its Effect (confusing)
function Component() {
  const [value, setValue] = useState(0);
  const onInterval = useEffectEvent(() => { /* ... */ });

  // ... 50 lines of other code ...

  useEffect(() => {
    const id = setInterval(() => onInterval(), 1000);
    return () => clearInterval(id);
  }, []);
}
```

### Rule 4: Don't Use useEffectEvent to Suppress Linter Warnings

This is about intent. `useEffectEvent` is for separating reactive from non-reactive logic—not for silencing the exhaustive-deps lint rule.

```tsx
// ❌ Wrong mental model: "I'll use useEffectEvent so I don't have to list dependencies"
const fetchData = useEffectEvent(async () => {
  const data = await fetch(`/api/items?page=${page}`);
  setItems(data);
});

useEffect(() => {
  fetchData();
}, []); // "Now I don't need page in deps!" <- Wrong!

// ✅ Correct: page SHOULD be a dependency because you WANT to refetch when it changes
useEffect(() => {
  async function fetchData() {
    const data = await fetch(`/api/items?page=${page}`);
    setItems(data);
  }
  fetchData();
}, [page]); // Correctly triggers refetch on page change
```

The question to ask: "When this value changes, should the Effect re-run?" If yes, it's a dependency. If no (you just want to read the latest value when something else triggers the Effect), use an Effect Event.

## When Should You Use useEffectEvent?

Use `useEffectEvent` when you have a callback inside an Effect that:

1. **Is passed to a subscription, timer, or external library** that you don't want to re-register

2. **Needs to read the latest props/state** when it's called

3. **Those values shouldn't trigger the Effect to re-run**

Common scenarios:

| Scenario | Reactive (triggers Effect) | Non-reactive (Effect Event) |
|----------|---------------------------|----------------------------|
| Chat room connection | `roomId` | `isMuted`, `theme` |
| Analytics logging | `pageUrl` | `cartItemCount`, `userId` |
| Interval counter | - (runs once) | `count`, `step` |
| WebSocket messages | `socketUrl` | `isOnline`, `preferences` |
| Animation frame | - (runs once) | `currentPosition` |

## A Word on React Versions

`useEffectEvent` was introduced as a stable feature in React 19.2. If you're on an earlier version:

- **React 18.x and earlier**: Use the `useRef` pattern described above
- **React 19.0-19.1**: `useEffectEvent` was available but experimental
- **React 19.2+**: Use `useEffectEvent` confidently

You can check your React version:

```bash
npm list react
```

## Summary

`useEffectEvent` solves a long-standing pain point in React hooks: accessing the latest state/props inside an Effect without triggering unnecessary re-runs.

**Before**: Mirror values into refs, add sync Effects, read `.current`—all manual, error-prone boilerplate.

**After**: Wrap your callback in `useEffectEvent` and let React handle keeping it updated.

The key mental model:
- **Dependencies** answer: "When should this Effect re-run?"
- **Effect Events** answer: "What values should I read when the Effect runs?"

By separating these concerns explicitly, your code becomes clearer and bugs become harder to introduce.

## Further Reading

- [React Docs: useEffectEvent Reference](https://react.dev/reference/react/useEffectEvent) - Official API documentation
- [React Docs: Separating Events from Effects](https://react.dev/learn/separating-events-from-effects) - In-depth conceptual guide
- [React Docs: useEffect Reference](https://react.dev/reference/react/useEffect) - Comprehensive Effect documentation
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) - Understanding the JavaScript concept behind stale closures
