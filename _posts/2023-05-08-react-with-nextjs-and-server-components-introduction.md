---
layout: post
status: publish
published: true
title: Next.js 13 and Server Components, Harnessing the Power of Async Components
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: This article introduces React with Next.js and server components, detailing their benefits and implementation. It covers how server components enable reduced bundle sizes and improved performance, and how Next.js complements React by offering features like automatic routing, server rendering, and static site generation. The post also provides step-by-step setup instructions and examples.

---
# Introduction

Since their inception in 2014, server components have evolved to become a cornerstone of modern web development. As web applications grew more complex, developers were faced with the challenge of optimizing performance and delivering better user experiences. Server components emerged as a powerful solution, allowing developers to offload rendering tasks to the server-side and greatly reduce the amount of code shipped to the client.

Over the years, server components have undergone significant improvements, and the release of Next.js 13 has taken them to new heights. In this article, we'll dive into how Next.js 13 works with server components and explore an example of fetching data from the Placeholder API using async components. We'll utilize the fetch API and avoid using the obsolete .server.js convention and polyfill.

# Understanding Server Components in Next.js 13

Next.js 13 has introduced several optimizations and enhancements to server components. Among the most notable improvements is the ability to use async components, which allows developers to create responsive and highly efficient web applications.

Async components enable developers to fetch data from external sources, such as APIs, without blocking the rendering of other components. This means that even when waiting for data to be fetched, the rest of the application can continue to render and provide a seamless user experience.

# Fetching Data from the Placeholder API

Let's dive into an example of using an async server component to fetch data from the Placeholder API. We'll start by creating a new Next.js 13 project and installing the required dependencies:

```lua
npx create-next-app nextjs13-server-components
cd nextjs13-server-components
```

Now, let's create a new file called `PlaceholderData.server.js` in the `components` directory. In this file, we'll define an async server component that fetches data from the Placeholder API.

```javascript
import { useState, useEffect } from 'react';

export default function PlaceholderData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Placeholder Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

In the code above, we're using the `useState` and `useEffect` hooks from React to fetch and manage the data. We fetch the data using the `fetch` API, then update our component's state with the fetched data. Note that we're not using the .server.js convention, as it's now obsolete.

Next, let's import and use the `PlaceholderData` component in our `index.js` file:

```javascript
import PlaceholderData from '../components/PlaceholderData.server';

export default function Home() {
  return (
    <div>
      <h1>Next.js 13 Server Components Example</h1>
      <PlaceholderData />
    </div>
  );
}
```

With this setup, our application fetches data from the Placeholder API using an async server component, resulting in an efficient and responsive user experience.

# Conclusion

Next.js 13 has taken server components to the next level by introducing optimizations such as async components. 
By leveraging these features, developers can create highly efficient and responsive web applications that provide a seamless user experience. 
By following the example in this article, you can
easily integrate server components into your Next.js 13 projects, optimizing your applications' performance and delivering an excellent user experience.

To learn more about server components, async components, and other features of Next.js 13, visit the official React and Next.js documentation:

*   [React Docs](https://react.dev/)
*   [Next.js Docs](https://nextjs.org/docs/getting-started)

As web development continues to evolve, staying up-to-date with the latest advancements and best practices is essential. By leveraging the power of Next.js 13 server components and async components, you can stay ahead of the curve and build cutting-edge web applications that delight your users.