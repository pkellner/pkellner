---
layout: post
status: publish
published: true
title: An Example GraphQL Apollo Server 3 with Redis and Auth Working
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: This is a clean example of a GraphQL Apollo Server Version 3 working with Redis. It is based on a clone of a V2 project and has all the fixes for version 3.
---



# The repository that includes the source


https://github.com/pkellner/apollo-server-3-with-cache-redis

All you have to do is 

npm install

npm start

And you are good to go. You'll get a GraphQL playground that you can type your queries into.  Try this one, or in the readme to test auth.

```
  {
    hello {
      value
    }
    membership {
      id
      firstName
      lastName
    }
  }
```


You can browse to the final running URL here: 

`localhost:/graphql`

Here is the playground:

![]/assets/posts/2022-02-11/as3-working.png)

And what the Redis data looks like

![](/assets/posts/2022-02-11/redis-insight-screenshot.png)


Enjoy!
