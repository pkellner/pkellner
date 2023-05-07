---
layout: post
status: publish
published: true
title: Migrating from useState to useReducer, Building a Counter in a Next.js App
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: In this tutorial, we migrated from useState to useReducer while building a counter interface in a Next.js app. This helps manage state updates more efficiently and scales better as app complexity grows. Additional tips include extracting the reducer, using the Context API for global state, adding custom middleware, and exploring other hooks.

---
Introduction

In this tutorial, we will demonstrate how to migrate from using `useState` to `useReducer` when creating a counter interface that allows you to increment, decrement, and reset the count value. This article is tailored for intermediate React developers looking to expand their knowledge of React hooks.

We will start by creating a new Next.js app using `npx` as our foundation.

Prerequisites

*   Familiarity with React and React hooks
*   Node.js installed on your system

Step 1: Create a Next.js App

Open your terminal and run the following command to create a new Next.js app:

```lua
npx create-next-app counter-app
```

This will create a new directory called `counter-app` with a basic Next.js project structure. Navigate to the new directory:

```bash
cd counter-app
```

Step 2: Implement the Counter with useState

Before migrating to `useReducer`, let's create a simple counter using `useState`. Open the `pages/index.js` file and replace its content with the following code:

```javascript
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

Step 3: Migrate to useReducer

Now, we'll migrate the code to use `useReducer` instead of `useState`. First, import `useReducer` at the top of the `index.js` file:

```javascript
import { useReducer } from 'react';
```

Next, define the reducer function and the initial state:

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}
```

Now, replace the `useState` hook with the `useReducer` hook:

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

Finally, update the event handlers to use `dispatch`:

```javascript
const increment = () => dispatch({ type: 'increment' });
const decrement = () => dispatch({ type: 'decrement' });
const reset = () => dispatch({ type: 'reset' });
```

And update the count display to use `state.count` instead of `count`:

```javascript
<h1>Counter: {state.count}</h1>
```

Here's the complete code:

```javascript
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => dispatch({ type: 'increment' }); const decrement = () => dispatch({ type: 'decrement' }); const reset = () => dispatch({ type: 'reset' });

  return ( 
    <div> 
      <h1>Counter: {state.count}</h1>
      <button onClick={increment}>Increment</button> 
      <button onClick={decrement}>Decrement</button> 
      <button onClick={reset}>Reset</button> 
    </div>
  ); 
}
```


Step 4: Run the App

Start the development server by running the following command:

```
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. You should now see the counter interface with buttons to increment, decrement, and reset the count value.

Conclusion

In this tutorial, we demonstrated how to migrate from `useState` to `useReducer` when creating a counter interface in a Next.js app. 

Additional Tips

Now that you have successfully migrated from `useState` to `useReducer`, here are some additional tips to further enhance your React development skills.

1.  Extract the Reducer to a Separate File

As your application grows in complexity, it's a good practice to keep your code modular by extracting the reducer function to a separate file. You can then import it in any component that requires it.

Create a new file called `reducer.js` in your `counter-app` directory and move the reducer function and the initial state to that file:

```javascript
// reducer.js
export const initialState = { count: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}
```

Then, import the `reducer` and `initialState` in your `index.js` file:

```javascript
import { useReducer } from 'react';
import { reducer, initialState } from './reducer';

// ... rest of the component code
```

2.  Use Context API for Global State

If you need to share the counter state across multiple components, consider using the Context API. It will allow you to provide and consume the state without the need to pass it down through props.

3.  Add Custom Middleware

When using `useReducer`, you can add custom middleware to handle side effects, logging, or any other functionality that should be triggered when dispatching actions. This can be particularly useful in more complex applications.

4.  Explore Other Hooks

React has a variety of built-in hooks that can help you manage state, side effects, and other aspects of your components. Some common hooks include `useEffect`, `useMemo`, and `useRef`. Familiarize yourself with these hooks and experiment with them to improve your components.

By applying these additional tips and exploring the capabilities of React hooks, you'll be well-equipped to tackle more complex scenarios in your React applications.
