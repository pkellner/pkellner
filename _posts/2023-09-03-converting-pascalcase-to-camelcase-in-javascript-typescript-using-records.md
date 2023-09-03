---
layout: post
status: publish
published: true
title: Converting PascalCase to CamelCase in JavaScript Records Using TypeScript
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: When you're knee-deep in data transformations, the little things like converting object keys from PascalCase to camelCase can become surprisingly complex. But what if you're working with TypeScript and need to maintain that strong type checking? In our latest blog post, we delve into this very topic. We dissect TypeScript's `Record` type for maximum flexibility and robustness, explain how `Object.entries()` is a game-changer for object manipulation, and walk you through each step of the conversion process with simple string operations—no regular expressions involved. Whether you're a TypeScript newbie or a seasoned veteran, this post will expand your toolkit for data transformations.

---
# Converting PascalCase to CamelCase in JavaScript Records Using TypeScript

When handling data, one often needs to transform the format, and a common need is to change object key casing. But how do we do it in a strongly typed language like TypeScript? We'll walk you through it, step by step, with an emphasis on using TypeScript's `Record` type and the `Object.entries()` method.

## Setting the Scene with Base Data

First, let's initialize some cat-related data where keys are in PascalCase:

```typescript
type Cats = {
  CatName: string;
  IsHungry: boolean;
  LastFedDate: string | null;
};

const sessions: Cats[] = [
  {
    CatName: "Whiskers",
    IsHungry: true,
    LastFedDate: "2021-09-03"
  },
  {
    CatName: "Fluffy",
    IsHungry: false,
    LastFedDate: "2021-09-01"
  },
  {
    CatName: "Socks",
    IsHungry: true,
    LastFedDate: null
  }
];
```

Here, we define a TypeScript `type` called `Cats` that describes the shape of each session object. Each session has a `CatName`, a boolean `IsHungry`, and a `LastFedDate` which can be either a string or null.

## The Magic of TypeScript's Record Type

Let's turn our attention to this line:

```typescript
let camelCaseSession: Record<string, typeof session[keyof typeof session]> = {};
```

### The Breakdown:

* `Record<K, T>`: This is a type that represents an object whose keys are of type `K` and values are of type `T`.

* `<string, ...>`: Here, we specify that the keys in `camelCaseSession` will be strings.

* `typeof session[keyof typeof session]`: This part dynamically determines the type of values in the `session` object. This essentially means "whatever types the values in the `session` object are." This makes our code flexible and robust, as we don't hardcode the value types.


Putting it all together, the line tells TypeScript: "Hey, we're going to create an object where the keys are strings, and the values are of the same types as those in the `session` object."

## The Engine Room: Object.entries()

The function `Object.entries(session)` takes an object as its argument and returns an array of `[key, value]` pairs from that object. So, for a session object like:

```typescript
{
  CatName: "Whiskers",
  IsHungry: true,
  LastFedDate: "2021-09-03"
}
```

`Object.entries()` would produce:

```typescript
[
  ["CatName", "Whiskers"],
  ["IsHungry", true],
  ["LastFedDate", "2021-09-03"]
]
```

This is extremely useful for looping through an object's properties without knowing the keys beforehand.

## The Conversion Function: convertToCamelCase

```typescript
function convertToCamelCase(cats: string): string {
  let result = '';
  for (let i = 0; i < cats.length; i++) {
    if (i === 0) {
      result += cats[i].toLowerCase();
    } else {
      result += cats[i];
    }
  }
  return result;
}
```

In this function, we go through each character of the string. If it's the first character, we convert it to lowercase. The rest of the characters remain unchanged.

## Putting It All Together

Now let's marry all these components into a coherent code snippet:

```typescript
const camelCasedSessions = sessions.map(session => {
  let camelCaseSession: Record<string, typeof session[keyof typeof session]> = {};
  for (const [key, value] of Object.entries(session)) {
    camelCaseSession[convertToCamelCase(key)] = value === null ? 'unassigned' : value;
  }
  return camelCaseSession;
});

console.log(camelCasedSessions);
```

## Conclusion and Summary

In this blog post, we explored:

1. How TypeScript's `Record` type adds both flexibility and type safety to our code.
2. The utility of `Object.entries()` in object manipulation.
3. The intricacies of converting PascalCase keys to camelCase using simple string operations.

Understanding these building blocks not only helps in performing the case conversion task at hand but also enriches our general TypeScript and JavaScript knowledge, making us more proficient in data transformations.