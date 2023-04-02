---
layout: post
status: publish
published: true
title: Convert useState to useReducer in a React Context
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Often we want to add some extra side effects when a state change happens. That could be for things like logging changes or even changing other state values that are dependent.
---

Often, we find ourselves in a situation where we've coded with [useState](https://reactjs.org/docs/hooks-state.html) and we want more capability integrated into our change.  That is, we may want to add a logging statement that outputs the original value and the changed value, or even store that change someplace as history. useReducer is perfect for this, but as it's parameters feel quite different. Luckily, since useState is actually built with [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer), it is very possible to make this conversion.

## The Original Code That Uses useState

```JavaScript
export const DisplayCountContext = createContext();

function DisplayCountProvider({ children, initialDisplayCount }) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
 
  const contextValue = {
    displayCount,
    setDisplayCount,
  };
  
  return (
    <DisplayCountContext.Provider value={contextValue}>
      {children}
    </DisplayCountContext.Provider>
  );
}

export { DisplayCountProvider };
```

## The Equivalent Code Using useReducer

```JavaScript
export const DisplayCountContext = createContext();

function DisplayCountProvider({ children, initialDisplayCount }) {
  
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case "setDisplayCount":
        newState = { ...state, displayCount: action.payload };
        break;
      default:
        throw new Error();
    }
    return newState;
  }
  
  const [state, dispatch] = useReducer(reducer, {
    displayCount: initialDisplayCount,
  });

  const setDisplayCount = (val) => {
    // put your extra logging type code
    // like: console.log(`Original Value:${displayCount}  New Value: ${val}`)
    dispatch({ type: "setDisplayCount", payload: val });
  };

  const contextValue = {
    displayCount: state.displayCount,
    setDisplayCount,
  };

  return (
    <DisplayCountContext.Provider value={contextValue}>
      {children}
    </DisplayCountContext.Provider>
  );
}

export { DisplayCountProvider };
```

That's literally it.  

