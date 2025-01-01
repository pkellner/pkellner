---
title: Replacing Legacy throw in React 19 with Suspense and use
description: React once used thrown Promises for Suspense. .use() is recommended now, but legacy throwing is still supported.
pubDatetime: 2024-12-31T23:57:31.292Z
preview: /postimages2024/2024-03-28-lessons-learned-building-react-app-with-help-of-chatgpt/throw.png
draft: false
tags:
    - react
    - react19
categories:
    - suspense
    - react
---
I've been closely watching the evolution of React 19, and in particlar how it has changed to support `Suspense` in client only apps. When React 18 released, the behavior associated with `Suspense` was to use `throw` as a helper to figure out when promises completed, and there by elements enclosed in a Suspense boundary could be rendered.

I recently noticed this comment: 

`This feature is implemented for both use and for the legacy promise throwing behavior.`

in [this issue](https://github.com/facebook/react/issues/29898). I had not realized that the throw behavior was now legacy. So, I asked [ChatGPT](https://chatgpt.com/) about it and this is what it said. It makes total sense to me so I thought I'd blog it in case anyone else is interested.

First, a bit of context: React uses Suspense to “pause” rendering when some data isn’t ready yet—traditionally, this has worked by literally throwing a Promise inside a component. React catches that thrown Promise and uses it as a trigger to show a fallback until the Promise resolves (or rejects). That’s often referred to as the “legacy promise throwing behavior.”  

# From ChatGPT o1:

- **What it is**: Before the new `.use()` API, if a React component needed asynchronous data, it would commonly do something like:
  ```tsx
  function AsyncComponent() {
    const data = fetchSomething();
    if (!data.ready) {
      // "Throw" the Promise so that React knows to suspend
      throw data.promise;
    }
    return <div>{data.value}</div>;
  }
  ```
- **Why it worked**: React’s reconciler recognizes a thrown Promise as an indication the component isn’t ready. It suspends, shows a fallback (like a loading spinner), and then retries rendering once the Promise resolves.  

Although it’s a bit unorthodox to literally throw a Promise, this approach became an (undocumented) standard pattern for server- and client-side Suspense.

## New `.use()` Behavior

- **What it is**: React has introduced (and is still refining) a new, more formal API called `.use()`. Instead of throwing a Promise directly from your component, you can call `use(myAsyncResource)`. Internally, React still uses a similar mechanism to track loading, but it’s wrapped in a clearer, first-class function call.
- **Benefits**: 
  - Cleaner code: You call `use()` rather than writing a `throw`.
  - Potentially more robust & flexible for server components, concurrency features, etc.
  - It more explicitly signals your intention to “consume async data and possibly suspend.”

According to [the linked GitHub issue](https://github.com/facebook/react/issues/29898), React’s `.use()` will eventually be the recommended way to handle async resources. However, for backward-compatibility, the “legacy promise throwing behavior” is still supported. In other words, even if you don’t switch over to `.use()`, the old mechanism of throwing a Promise is not going away immediately; React continues to handle both so users aren’t forced to migrate in one big step.

### Summary

1. **Legacy Behavior**: Throw a Promise from your component to trigger Suspense.  
2. **Current (New) Behavior**: Call `React.use(resource)` to trigger Suspense without manually throwing.  
3. **Both Supported**: React continues to honor the old promise-throwing approach for backward compatibility, while encouraging the new `.use()` API for clarity and future-proofing.

