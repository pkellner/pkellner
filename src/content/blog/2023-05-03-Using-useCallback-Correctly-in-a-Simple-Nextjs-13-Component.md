---
status: publish
published: true
pubDatetime: 2023-05-03T20:00:00.000Z
title: Using useCallback Correctly in a Simple Next.js 13 Component
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
description: This post demonstrates using the useCallback hook in a Next.js 13 component for better performance. It shows how to create a simple Counter component with a button that increments the count, utilizing useCallback to avoid unnecessary re-renders.
---

# Using `useCallback` Correctly in a Simple Next.js 13 Component

In this blog post, we'll explore how to use the `useCallback` hook correctly in a simple Next.js 13 component with a button. The `useCallback` hook is essential for optimizing the performance of your React applications, as it helps you avoid unnecessary re-renders by memoizing your callback functions.

## Prerequisites

- Basic understanding of React and React Hooks
- Familiarity with Next.js
- Node.js and npm installed on your machine

## Setting up a Next.js 13 project

First, let's set up a new Next.js 13 project by running the following command:

```bash
npx create-next-app my-next-app
cd my-next-app
```

Creating the `Counter` component
--------------------------------

Now, let's create a simple `Counter` component that will demonstrate the use of `useCallback`. Inside the `components` folder, create a new file named `Counter.js`.

Paste the following code into the `Counter.js` file:

```javascript
import { useState, useCallback } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

In this component, we have:

1.  Imported the `useState` and `useCallback` hooks from React.
2.  Created a state variable `count` with an initial value of `0`.
3.  Defined an `increment` function using the `useCallback` hook that increments the `count` state by `1`.
4.  Returned a JSX markup with a header displaying the `count` value and a button that triggers the `increment` function.

The `useCallback` hook takes two arguments:

1.  The callback function you want to memoize.
2.  An array of dependencies.

In our case, we pass an empty array `[]` as the dependencies since our `increment` function does not rely on any external variables. This means the `increment` function will be memoized and not recreated during re-renders, thus avoiding unnecessary re-renders of the component.

Using the `Counter` component in the main page
----------------------------------------------

Finally, let's use the `Counter` component in our main page. Open the `pages/index.js` file and modify its content as follows:

```javascript
import Head from 'next/head';
import Counter from '../components/Counter';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js 13 useCallback Example</title>
      </Head>
      <main>
        <h1>Next.js 13 useCallback Example</h1>
        <Counter />
      </main>
    </div>
  );
}
```

Now, start the development server with:

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser, and you'll see the `Counter` component in action.

That's it! You've successfully created a simple Next.js 13 component using the `useCallback` hook to optimize its performance.
