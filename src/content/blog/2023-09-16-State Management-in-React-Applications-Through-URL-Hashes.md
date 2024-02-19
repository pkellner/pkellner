---
status: publish
published: true
pubDatetime: 2023-09-16T20:00:00.000Z
title: State Management in React Applications Through URL Hashes
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
description: Managing state in React applications can be streamlined using URL hashes. This article explores this concept with two examples—a basic toggle switch and a cookie catalog. We discuss the benefits of this method, including enhanced user experience and compatibility with server-side rendering. Learn how to maintain state effectively across React components.


---

# State Management in React Applications Through URL Hashes

Before we delve deep into more intricate examples, let's start with a straightforward one—a React functional component designed to toggle between "On" and "Off" states. This toggle switch initializes and updates its state based on the URL hash.

## Trivial Example: Crafting a Simple Toggle Switch in React

### Code Snippet

```javascript
import React, { useEffect, useState } from 'react';

// Function to fetch the hash value from the URL
const getHash = () => 
  typeof window !== 'undefined'
    ? decodeURIComponent(window.location.hash.replace("#", ""))
    : undefined;

const SwitchComponent = () => {
  // Initialize state from the URL hash
  const [state, setState] = useState(getHash() === 'on' ? 'On' : 'Off');
  
  // Use useEffect to set up an event listener for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      // Update the state based on the new hash value
      setState(getHash() === 'on' ? 'On' : 'Off');
    };

    // Attach the hashchange event listener
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Render the component
  return <div>{`Switch is ${state}`}</div>;
};
```

### Browsing Example

To browse to this toggle switch component, you can navigate to a URL like:

* For an "On" state: `http://example.com/switch#on`
* For an "Off" state: `http://example.com/switch#off`

## Core Concepts: In-depth Insights

### Why URL Hash for State Management?

1. **Seamless User Experience**: Bookmarking or sharing URLs with the hash will preserve the component's state, making for a smooth user experience.
2. **Persistence Across Reloads**: The state is maintained across browser reloads as it is encapsulated within the URL hash.
3. **Server-Side Rendering Compatibility**: URL hash simplifies state restoration when using server-side rendering, reducing the complexity of your application.

### How to Store State in URL Hash

1. **State Initialization**: Upon component mounting, we initialize its state based on the URL hash.
2. **State Modification**: To update both the application state and the URL hash, use `window.location.hash = newStateValue`.
3. **Event-Driven Updates**: We listen for the `hashchange` event on the window object to sync our state with the URL hash.

### Advantages and Limitations

1. **Pros**: Easy to implement, enhances shareability, and simplifies server-side rendering.
2. **Cons**: Limited capacity for data storage in URL, and potential security risks with sensitive data.

## Comprehensive Example: Building a React Cookie Catalog

### Code Snippet

```javascript
import React, { useEffect, useState } from 'react';

// Function to fetch hash value from URL
const getHash = () => 
  typeof window !== 'undefined'
    ? decodeURIComponent(window.location.hash.replace("#", ""))
    : undefined;

const CookieCatalog = () => {
  const [selectedCookie, setSelectedCookie] = useState(getHash());

  useEffect(() => {
    const handleHashChange = () => {
      const newCookie = getHash();
      setSelectedCookie(newCookie);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const cookies = [
    {id: 'chocolate', name: 'Chocolate Chip'},
    {id: 'oatmeal', name: 'Oatmeal Raisin'},
    {id: 'sugar', name: 'Sugar Cookie'},
    {id: 'ginger', name: 'Gingerbread'}
  ];

  const displayCookie = () => {
    const foundCookie = cookies.find(cookie => cookie.id === selectedCookie);
    return foundCookie ? foundCookie.name : 'Please select a cookie from the list.';
  };

  return (
    <div>
      <h1>Cookie Catalog</h1>
      <p>Current Cookie: {displayCookie()}</p>
      <ul>
        {cookies.map((cookie) => (
          <li key={cookie.id}>
            <a href={`#${cookie.id}`}>{cookie.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Browsing Example

To browse the cookie catalog, navigate to URLs like:

* For Chocolate Chip: `http://example.com/cookie-catalog#chocolate`
* For Oatmeal Raisin: `http://example.com/cookie-catalog#oatmeal`
* For Sugar Cookie: `http://example.com/cookie-catalog#sugar`
* For Gingerbread: `http://example.com/cookie-catalog#ginger`

By following these URLs, you'll find that the application will display the cookie type according to the URL hash, making it an interactive and dynamic experience.

## Summary

To encapsulate, managing state in React applications through URL hashes provides a robust yet straightforward mechanism that addresses several facets—enhanced user experience, state persistence, and server-side rendering compatibility. This article delved into two practical examples: a basic toggle switch and a more complex cookie catalog, both leveraging URL hashes for state management.

In these examples, the foundational concept remained consistent: initialize the state based on the current URL hash, update the URL hash to reflect changes in the state, and set up an event listener to keep both in sync. By understanding and implementing these simple steps, one can effectively maintain state across React components, allowing for an interactive, shareable, and resilient user experience.

Whether you're building something as simple as a toggle switch or as dynamic as an online catalog, URL hashes offer a convenient, easily manageable state solution for your React applications.
