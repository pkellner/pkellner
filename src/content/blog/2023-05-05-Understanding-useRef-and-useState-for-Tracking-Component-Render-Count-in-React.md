---
status: publish
published: true
pubDatetime: 2023-05-05T20:00:00.000Z
title: Understanding useRef and useState for Tracking Component Render Count in React
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: peter@peterkellner.net
  url: 'https://peterkellner.net'
author_login: admin

display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
description: This post explains useRef and useState usage in React by creating a custom hook to track component render count without extra re-renders. useRef stores render count while useState manages multiple state values independently, allowing efficient updates and improved code readability.

---
# Understanding useRef and useState for Tracking Component Render Count in React


Introduction
------------

As an intermediate React developer, you're probably already familiar with the `useState` hook for managing component state. However, you might be wondering when and why you should use the `useRef` hook in addition to `useState`. In this blog post, we'll explore a practical example of using `useRef` and `useState` together to track the render count of a React component. By the end, you'll have a better understanding of why `useRef` is essential for certain scenarios, and how it can complement `useState` in managing component behavior.

The Problem
-----------

We want to track the number of times a component has been rendered without causing additional re-renders. We also want to manage multiple state values that control different aspects of the component.

The Solution
------------

To achieve this, we'll create a custom React hook that uses `useRef` to store the render count and `useState` to manage different state values within the component.

### 1\. Why useRef for Render Count?

The `useRef` hook is used for storing mutable values across renders without causing re-renders when its value changes. This makes it an ideal candidate for tracking render count without causing an infinite loop of re-renders, which would happen if we were to use `useState` for this purpose.

### 2\. Creating the Custom Hook

Let's create a custom hook called `useComponentRenderCount` that uses `useRef` to store the render count and increments it on every render using the `useEffect` hook.

```javascript
import { useRef, useEffect } from 'react';

function useComponentRenderCount() {
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current = renderCountRef.current + 1;
  });

  return renderCountRef.current;
}
```

### 3\. Using the Custom Hook in a Component

Now let's use this custom hook in a component that has two separate state values, one for a timer and one for click events.

```javascript
import React, { useState, useEffect } from 'react';
import useComponentRenderCount from './useComponentRenderCount';

function App() {
  const renderCount = useComponentRenderCount();
  const [timerCount, setTimerCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Component render count: {renderCount}</p>
      <p>Timer count: {timerCount}</p>
      <p>Click count: {clickCount}</p>
      <button onClick={handleClick}>Increment click count</button>
    </div>
  );
}

export default App;
```

### 4\. Why Two Separate State Values?

In this example, we have two state values, `timerCount` and `clickCount`. By separating these state values, we can control different aspects of the component independently. This improves code readability and makes it easier to manage state updates for each value. In our example, the timer state is updated every second using `setInterval`, and the click state is updated when the button is clicked.

Conclusion
----------

Understanding when to use `useRef` in addition to `useState` is crucial for managing complex component behavior in React. In this example, we used `useRef` to track the render count without causing additional re-renders, and `useState` to manage multiple state values independently. This allowed us to update different aspects of the component while keeping the render count tracking efficient and performant.

As you continue to develop your React skills, always consider the different use cases for hooks like `useRef` and `useState`. Balancing performance and functionality is key to creating high-quality applications. Happy coding!
