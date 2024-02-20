---
layout: post
status: publish
published: true
title: Simplifying JavaScript Dictionary Creation with reduce in TypeScript
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: This blog post explores how to use reduce in TypeScript for efficiently converting an array into a dictionary, comparing it with the more traditional forEach approach. It also discusses coding best practices and cyclic redundancy.

---
# Simplifying JavaScript Dictionary Creation with `reduce` in TypeScript

When working with [JavaScript](https://www.javascript.com/) or [TypeScript](https://www.typescriptlang.org/), developers often find themselves manipulating collections such as arrays, sets, and dictionaries. The process of converting an array to a dictionary, for example, can be accomplished in several ways. This blog post explores the benefits of using the [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method over the commonly used `forEach`. Specifically, we will examine how this switch can positively affect the [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) of your codebase, a key metric in understanding code maintainability and quality.

## Initial Approach Using `forEach`

Firstly, let's consider a TypeScript example featuring the interface `SessionInterest` and an array named `sessionInterestTotals` with objects conforming to this interface.

```typescript
interface SessionInterest {
  sessionId: number;
  InterestLevel2Count: number;
  InterestLevel3Count: number;
};

const sessionInterestTotals: SessionInterest[] = [
  { sessionId: 1, InterestLevel2Count: 10, InterestLevel3Count: 5 },
  { sessionId: 2, InterestLevel2Count: 20, InterestLevel3Count: 7 },
  // ... more data
];
```

The task at hand is to transform this array into a dictionary, where the `sessionId` serves as the key. Using `forEach`, the transformation looks as follows:

```typescript
const sessionInterestTotalDict: Record<number, SessionInterest> = {};

sessionInterestTotals.forEach((entry: SessionInterest) => {
  sessionInterestTotalDict[entry.sessionId] = entry;
});
```

### Cyclomatic Complexity of `forEach` Approach

The Cyclomatic Complexity of this code is relatively low but not minimal. The `forEach` loop adds an additional level of complexity due to the function it takes as an argument. For this particular example, it would likely be a Cyclomatic Complexity of 2, considering the loop and the arrow function.

## Refactor with `reduce`

`reduce` is a powerful array method in JavaScript and TypeScript that can condense an array into a single value, such as an object or a number. Here’s how one could refactor the code using `reduce`:

```typescript
const sessionInterestTotalDict: Record<number, SessionInterest> = sessionInterestTotals.reduce((acc: Record<number, SessionInterest>, entry: SessionInterest) => {
  acc[entry.sessionId] = entry;
  return acc;
}, {});
```

### Cyclomatic Complexity of `reduce` Approach

One of the advantages of using `reduce` is that it typically results in lower Cyclomatic Complexity. In this specific example, the complexity would be 1 since there's only a single function to consider—the one passed to `reduce`. This is a straightforward, albeit minor, reduction in complexity compared to the `forEach` approach.

## Deeper Dive into Cyclomatic Complexity

Cyclomatic Complexity is a software metric used to indicate the complexity of a program. It is computed using the control flow graph of the program. A program with high Cyclomatic Complexity has more branches and is, therefore, more complex and potentially harder to understand and test. Lowering the complexity often results in code that is easier to manage and debug.

## TypeScript Constructs Involved

### Interface and Record

We used TypeScript's `interface` to define the shape of objects, and `Record` as a utility type to specify the dictionary's key-value pair types. These features not only enhance type safety but also self-document the code, reducing the need for external comments.

## Conclusion

While `forEach` might appear to be a straightforward approach for converting arrays to dictionaries, `reduce` is a powerful alternative that often results in simpler and cleaner code with reduced Cyclomatic Complexity. The method is aligned with best coding practices, offering a functional approach that can be easier to reason about. Understanding these nuances can equip developers to make informed decisions, thereby writing code that is not only robust but also maintainable.