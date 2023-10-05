---
layout: post
status: publish
published: true
title: Handling Environment Variables in Next.js 13 (Both Server and Client)
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Handling environment variables in Next.js can be tricky. While server-rendered code safely accesses these, client-side exposure is risky. Next.js recommends prefixing client-exposed variables with `NEXT_PUBLIC_`, but this approach, combined with Webpack's quirks, can be complex. A clearer method is treating all variables as server-side and passing them as props to client components. Always prefix non-sensitive client-bound variables with PUBLIC_ as a precautionary measure. Safe coding!

---


**Handling Environment Variables in Next.js 13, Both Server and Client**

Next.js, the darling of the React world, has consistently managed to simplify and streamline the development process for both seasoned and beginner developers. Yet, there’s one area which can often leave developers scratching their heads – handling environment variables. Let’s dive deep into this topic.

**Background: Next.js and Environmental Variables**

Historically, environment variables have been used in applications to provide configuration details that might vary across different environments (like development, staging, and production). They are a fantastic way to maintain secrets or runtime configurations without hardcoding them into your app. Next.js, not to be left behind, provides mechanisms to leverage these.

**The Server-Client Dilemma**

Next.js makes a distinction when it comes to using environment variables. While the server-rendered code can access these variables freely without exposing them, the client-rendered code presents a challenge.

**Here's the big deal**: If you accidentally include these environment variables in your client-side code, you are, in essence, exposing potentially sensitive information to anyone who takes a look at the source code of your webpage. Security blunders waiting to happen!

**All About That Prefix**

When you intend to expose an environment variable to the client-side, Next.js mandates that you prefix them with `NEXT_PUBLIC_`. This helps in ensuring that developers consciously decide which variables are sent to the browser. Yet, it brings complexity to the table. You end up with a naming convention that is unique to Next.js, thereby reducing portability.

**Baked In Variables: The Webpack Intricacy**

Here’s a quirk – these variables are injected at build time by Webpack. This means that operations you'd expect to behave dynamically like string concatenations or type coercing may not work as anticipated.

_For example:_

Imagine you have the following environment variable: `NEXT_PUBLIC_API_URL="https://myapi.com/"`. You might assume that `NEXT_PUBLIC_API_URL + 'endpoint'` would yield "[https://myapi.com/endpoint](https://myapi.com/endpoint)". But due to how Webpack optimizes and replaces these variables, the result can be unexpected, leading to potential bugs.

**There's A Better Way (In My Humble Opinion)**

I posit that a clearer, more developer-friendly approach exists. Treat all environment variables as server-side. Then, pass them explicitly as props to client components. This way, they can be accessed directly when rendering in the browser.

_Example for Google reCAPTCHA v3:_

Let’s say you have these variables:

```makefile
RECAPTCHA_SECRET="your_secret_key_here"
PUBLIC_RECAPTCHA_SITE_KEY="your_public_key_here"
```

In your page or component, you can do:

```javascript
export async function getServerSideProps() {
    return {
        props: {
            recaptchaSiteKey: process.env.PUBLIC_RECAPTCHA_SITE_KEY
        }
    }
}

// Now in your component, you can use `recaptchaSiteKey` directly.
```

**A Friendly Reminder**: I highly recommend prefixing environment variables that'll eventually land on the client with `PUBLIC_`. It's not mandatory, but it’s a reminder that the data isn’t sensitive. So, `PUBLIC_` acts as a mental flag for developers to tread carefully.

**To Conclude...**

While Next.js has its prescription on handling environment variables for the client-side, sometimes, the best medicine is one's own experience and understanding. By handling all environment variables server-side and passing them explicitly, we maintain clarity, reduce ambiguity, and keep our apps secure. And isn’t that what we all want? Safe coding!