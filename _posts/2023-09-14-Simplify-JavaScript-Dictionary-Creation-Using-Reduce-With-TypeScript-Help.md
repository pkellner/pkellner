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

In the world of JavaScript and TypeScript, developers often find themselves dealing with various types of collections like arrays, sets, and dictionaries. One of the most common tasks is converting an array to a dictionary or an object with specific keys. While there are multiple ways to achieve this, two widely used methods are `forEach` and `reduce`. This blog post aims to provide insights into how `reduce` can be a more efficient alternative to `forEach` for this specific task, while also adhering to coding best practices, such as avoiding cyclic redundancy.

## Initial Approach Using `forEach`

Let's consider an example that leverages TypeScript's strong typing features. We have an interface `SessionInterest` and an array `sessionInterestTotals` containing objects that conform to this interface.

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

Our objective is to convert this array into a dictionary (an object in JavaScript/TypeScript parlance), keyed by the `sessionId`.

Here's how you could do this using `forEach`:

```typescript
const sessionInterestTotalDict: Record<number, SessionInterest> = {};

sessionInterestTotals.forEach((entry: SessionInterest) => {
  sessionInterestTotalDict[entry.sessionId] = entry;
});
```

This code effectively iterates over each entry in `sessionInterestTotals` and maps it to `sessionInterestTotalDict` using the `sessionId` as the key.

## Refactor with `reduce`

The `reduce` method in JavaScript and TypeScript is an advanced array method that reduces the array to a single value.

Here's how we can achieve the same result using `reduce`:

```typescript
const sessionInterestTotalDict: Record<number, SessionInterest> = sessionInterestTotals.reduce((acc: Record<number, SessionInterest>, entry: SessionInterest) => {
  acc[entry.sessionId] = entry;
  return acc;
}, {});
```

Notice how `reduce` uses an accumulator (`acc`), which is the object that will eventually become our dictionary. The initial value of this accumulator is an empty object `{}`, and `reduce` modifies this object in each iteration to include our new key-value pair. Finally, it returns the populated object.

## TypeScript Constructs Involved

### Interface

TypeScript's `interface` construct allows us to define the shape of the objects. In our example, `SessionInterest` is an interface that specifies the structure each session interest entry should adhere to.

### Record

The `Record<K, T>` utility type is used to define an object where all property keys are of type `K` and the value associated with each key is of type `T`. In our example, `Record<number, SessionInterest>` specifies that the key is a number (`sessionId`), and the value is of type `SessionInterest`.

## Coding Best Practices and Cyclic Redundancy

### Immutability

One of the best practices in coding is to keep data structures immutable unless there's a strong reason to do otherwise. `reduce` inherently adheres to this principle, unlike `forEach` which relies on modifying an external object. The `acc` within `reduce` is confined to the function scope, minimizing side-effects.

### Cyclic Redundancy

Repeating the same logic in multiple parts of a codebase is often termed as cyclic redundancy. This practice should be avoided, as it makes the code less maintainable and more error-prone. Using `reduce` to abstract common dictionary-creation logic can help in minimizing redundancy.

## Conclusion

While `forEach` is straightforward and easy to understand, `reduce` provides a more functional and less error-prone approach to creating dictionaries. It adheres to best coding practices and leverages TypeScript’s typing capabilities effectively. Understanding the nuances between these two methods can help developers write cleaner, more maintainable code.