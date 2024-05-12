---
title: Running React 19 From a CDN and using esm.sh
description: This blog explains updating to React 19 using esm.sh, transitioning from UMD to ESM modules. It includes changes in CDN usage, detailed esm.sh functionality, and how to find and use the correct React package versions.
pubDatetime: 2024-05-10T16:51:20.332Z
preview: /postimages2024/umd-build-1.png
draft: false
tags:
    - react reactjs react19 esmsh
categories:
    - react
type: default
---

# Running React 19 From a CDN and using esm.sh

![](/postimages2024/umd-build-1.png)

If you are as excited as me about the [React 19](https://react.dev/blog/2024/04/25/react-19) release as me, and just can't wait to try out all the cool new features, read on! [Ricky Hanlon](https://twitter.com/rickhanlonii), one of my favorite dev's on the React core team, has written a very complete [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) on the new React blog.

If you have reason to run React without a build system (like [next.js](https://nextjs.org/) for example), you may have followed the previous recommendation from the React team at [React 18 CDN Links](https://legacy.reactjs.org/docs/cdn-links.html). This basically says you can simply download the scripts as follows and use the very cool [unpkg.com](https://unpkg.com/) (written by [Michael Jackson](https://twitter.com/mjackson), another of my favorite library authors), and then you could write code as follows to use the React library to render a list of 3 numbers to the browser.

## Using a CDN the Old Way with React 18

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple React App No JSX React 18</title>
    <script type="application/javascript">
      window.onload = () => {
        const rootElement = document.getElementById("root");
        const ints = [1, 2, 3];
        ints.forEach((i) => {
          let li = document.createElement("li");
          li.innerHTML = i;
          rootElement.appendChild(li);
        });
      };
    </script>
    <script
      crossorigin
      src="UMD was widely used in the past as a convenient way to load React without a build step. Now, there are modern alternatives for loading modules as scripts in HTML documents. Starting with React 19, React will no longer produce UMD builds to reduce the complexity of its testing and release process."
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
  </head>
  <body>
    <ul id="root"></ul>
  </body>
</html>
```

## Short Story About What Has Changed

As Ricky says in the upgrade guide 

> UMD was widely used in the past as a convenient way to load React without a build step. Now, there are modern alternatives for loading modules as scripts in HTML documents. Starting with React 19, React will no longer produce UMD builds to reduce the complexity of its testing and release process.

That means that you can't simply change the reference `https://unpkg.com/react-dom@18/umd/react-dom.development.js` to simply include `@19` and expect it to work.  Ricky goes on to say *"we recommend using an ESM-based CDN such as esm.sh."*  If you are like me, and those are just not enough words to get you to make it work, this blog post is for you. 

## Using a CDN the New Way with React 19 and esm.sh

I've spent an hour or so figuring out exactly how to make my little example work in React 19. Here is code, followed by a more detailed explanation of using [esm.sh](https://esm.sh/).



```html
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple React App No JSX React 19</title>
    <script type="module">
      import React from "https://esm.sh/react@19.0.0-beta-04b058868c-20240508/?dev"
      import ReactDOMClient from "https://esm.sh/react-dom@19.0.0-beta-04b058868c-20240508/client/?dev"

      window.onload = () => {
        const rootElement = ReactDOMClient.createRoot(document.getElementById('root'));
        const ints = [1, 2, 3];
        const elements = ints.map(i => React.createElement('li', {}, i));
        rootElement.render(React.createElement('ul', {}, elements));
      };
    </script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

I'm guessing now that you see how the `import` works, you can figure everything else out about how to use `esm.sh`. Here is some more details on everything I learned in my little investigation.

## Background on esm.sh and the New React 19 Story Around Using It

### With a little help from ChatGPT, here is what `esm.sh` is as it relates to React:

The `esm.sh` CDN operates as a server that handles JavaScript packages published to the npm registry. When you import a package through `esm.sh`, the server performs several actions to serve the request. Here's a simplified breakdown of how `esm.sh` typically figures out where to get imports from and serves them:

1. **Package Resolution**: When a request is made to `esm.sh` for a package, say `https://esm.sh/react@19`, the server first parses the URL to identify the package name (`react`) and the version (`19`). It then queries the npm registry to fetch the specific version of the package requested.

2. **Module Conversion**: Most npm packages are written in CommonJS format, which is standard for Node.js but not suitable for direct use in web browsers that require ECMAScript modules (ESM). `esm.sh` takes the CommonJS modules and converts them into ESM format. This involves analyzing dependencies, rewriting `require()` calls as `import` statements, and ensuring that exports are correctly handled.

3. **Caching and Optimization**: To improve performance and reduce load times, `esm.sh` caches the converted ESM packages. It also applies optimizations such as minification and compression to make the files smaller and faster to download.

4. **Serving the Files**: Once the package is converted to ESM and optimized, it is served to the client. `esm.sh` ensures that the served modules are compatible with modern browsers and provides various build options (like specifying development or production versions) through URL query parameters.

5. **Handling Updates and Dependencies**: If a package is updated on npm, `esm.sh` detects these updates and can re-fetch and convert the latest versions as needed. It also handles package dependencies by recursively converting and serving any dependencies required by the main package.

By using `esm.sh`, developers can easily incorporate npm packages into their web projects without needing a local build step, allowing for simpler development processes and quicker deployment of changes. The service essentially bridges the gap between the npm ecosystem and the needs of modern web applications.

### Here Is How To Find the Right Package to Use.

If you are wondering how I find a reference to the right package to use, that is, in my example above, I could not simply use what Ricky put in his blog post:

```html
<script type="module">
  import React from "https://esm.sh/react@19/?dev"
  import ReactDOMClient from "https://esm.sh/react-dom@19/client?dev"
  ...
</script>
```

because there is no @react@19 yet. Instead, I needed to go to the npm package manage site for react and use one of the React beta's for React 19.  The URL I went to for this is:  

[`https://www.npmjs.com/package/react](https://www.npmjs.com/package/react)

Then, in the upper right is a link that takes you to the 1758 versions (those are all the versions of React that have even been published including betas and everything else).

![](/postimages2024/umd-build-2.png)

I [click on that](https://www.npmjs.com/package/react?activeTab=versions), and it shows me a list of the "Current Tags", which is where I choose which React 19 version I want. I chose the beta because React 19 production has not shipped... yet.

![](/postimages2024/umd-build-3.png)

Now, from that, you can see what caused me to include the exact version of React 19 I wanted.

It's just 

```javascript
import React from "https://esm.sh/react@19.0.0-beta-04b058868c-20240508/?dev"
import ReactDOMClient from "https://esm.sh/react-dom@19.0.0-beta-04b058868c-20240508/client/?dev"
```

From that, it's clear what you need to import into your HTML.


**Hope this helps!** (back to my regularly scheduled programming)








