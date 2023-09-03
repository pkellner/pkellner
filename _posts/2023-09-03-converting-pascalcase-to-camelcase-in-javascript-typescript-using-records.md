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
# Converting PascalCase to CamelCase in TypeScript: A Type-Safe Approach with CatList

One of the advantages of [TypeScript](https://www.typescriptlang.org/) is type safety, which helps ensure your data behaves as you expect. A task that can come up fairly often is the conversion of object keys from [PascalCase](https://www.freecodecamp.org/news/programming-naming-conventions-explained/#:~:text=What%20is%20Pascal%20Case%3F,pascal%20case%3A%20FirstName%20and%20LastName%20.) to [camelCase](https://en.wikipedia.org/wiki/Camel_case). In this blog post, we'll explore how to accomplish this transformation while leveraging TypeScript's type-safe capabilities, specifically through the `Record` type and `Object.entries()` function.

## Record Type in TypeScript: An Asset for Type Safety

The `Record` type is an invaluable tool for creating type-safe objects in TypeScript. Consider the following line:

```typescript
let camelCaseCats: Record<string, typeof session[keyof typeof session]> = {};
```

With `Record<K, T>`, we can dictate that the keys (`K`) will be strings and the values (`T`) will hold the same type as those in our `session` object. This is TypeScript’s built-in mechanism for guaranteeing that both the keys and values conform to the expected types.

## Unlocking Object Iteration with Object.entries()

The function `Object.entries()` is native to JavaScript and also usable in TypeScript. It takes an object and returns an array containing its own enumerable property `[key, value]` pairs, making object iteration a breeze.

```typescript
for (const [key, value] of Object.entries(session)) {
  // Perform operations here
}
```

## A Complete Example: Converting CatList Array to CamelCase

Let's assume we have an array called `catList`, each element of which is an object of type `Cats`. The keys in these `Cats` objects are in PascalCase, and we aim to convert them to camelCase.

Here's our type and sample data:

```typescript
type Cats = {
  CatName: string;
  IsHungry: boolean;
  LastFedDate: string | null;
};

const catList: Cats[] = [
  {
    CatName: "Whiskers",
    IsHungry: true,
    LastFedDate: "2023-09-01"
  },
  {
    CatName: "Fluffy",
    IsHungry: false,
    LastFedDate: null
  }
];
```

To perform the conversion while maintaining type safety through the `Record` type, we can do:

```typescript
function convertToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

const camelCasedCats = catList.map(session => {
  let camelCaseCats: Record<string, typeof session[keyof typeof session]> = {};
  for (const [key, value] of Object.entries(session)) {
    camelCaseCats[convertToCamelCase(key)] = value === null ? 'unassigned' : value;
  }
  return camelCaseCats;
});

console.log(camelCasedCats);
```

Upon executing this code, `camelCasedCats` will become an array of objects with camelCased keys. TypeScript's type safety will be maintained thanks to the `Record` type.

## Conclusions

We've seen how the task of converting object keys from PascalCase to camelCase can be performed in a type-safe manner using TypeScript. By leveraging the `Record` type, we ensure that our keys and values conform to the data types we expect, mitigating potential errors down the line. Coupled with `Object.entries()`, which facilitates straightforward iteration over object properties, we can accomplish this task with both efficiency and safety.

Understanding these features can go a long way in making your TypeScript code not just functional but also robust. After all, one of the significant benefits of using TypeScript is its type-safe nature, which helps catch potential issues before they turn into runtime errors. Happy coding!