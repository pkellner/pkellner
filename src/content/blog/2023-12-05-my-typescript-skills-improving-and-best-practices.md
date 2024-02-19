---
status: publish
published: true
pubDatetime: 2023-12-05T20:00:00.000Z
title: My TypeScript Skills Improving and Best Practices
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
description: I improved my TypeScript skills by resolving a bug in a REST service, learning the importance of proper type assertions and error handling in Prisma database interactions.
---


### My TypeScript Skills Improving and Best Practices

#### A Lesson in Debugging and Type Safety

This morning, a seemingly simple issue in my [TypeScript](https://www.typescriptlang.org/) project led me down a two-hour debugging rabbit hole. The task at hand was developing a REST service, but it was failing to return all fields of a database record - one field was consistently missing.

The heart of the matter lay in my use of [Prisma](https://www.prisma.io/), a robust database toolkit, for schema definition. Here's a glimpse of the schema for a better understanding:

```prisma
model Speaker {
  id            Int               @id @default(autoincrement())
  firstName     String
  lastName      String
  company       String
  twitterHandle String
  userBioShort  String
  timeSpeaking  DateTime
  sessions      SpeakerSession[]
  favorites     AttendeeFavorite[]
}
```

The problem manifested in the following code segment from my REST service:

```typescript
async function getSpeakerDataById(id: number) {
  const speakerData : Speaker = await prisma.speaker.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      company: true,
      twitterHandle: true,
      userBioShort: true,
      timeSpeaking: true,
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  }) ?? {} as Speaker;
```

Confused, I turned to ChatGPT for an explanation, particularly about the use of `{}` and type assertions in TypeScript. The explanation revealed a crucial aspect of TypeScript's type system:

> In TypeScript, `as Speaker` is a type assertion, used to tell TypeScript to treat the object on the left side of `as` as an instance of the Speaker type. Using `{}` as `Speaker` means if `prisma.speaker.findUnique` returns null or undefined, TypeScript should treat the empty object `{}` as a Speaker object. This can be risky if the Speaker type has mandatory fields, as accessing any property on this empty object would yield undefined, leading to runtime errors.

Realizing the potential pitfalls of my approach, I restructured the code. I first assigned the result to a temporary variable (`speakerData`), and then, if not found, threw an error. If found, it was then assigned to a `SpeakerRec`.

Here is the adjusted code:

```typescript
async function getSpeakerDataById(id: number) {
  const speakerData : Speaker | null = await prisma.speaker.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      company: true,
      twitterHandle: true,
      userBioShort: true,
      timeSpeaking: true,
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });

  if (!speakerData) {
    throw new Error("Speaker not found:" + id);
  }

  const speakerOri : Speaker = speakerData as Speaker;
```

This adjustment was crucial. Now, if a required field was omitted from the `speakerData` declaration, TypeScript would issue a warning. This is because TypeScript's type system enforces strict adherence to defined types. By explicitly assigning the result to a `Speaker` type variable, any mismatch or missing properties in the object structure would be flagged by the compiler, ensuring type safety and reducing the risk of runtime errors.

In summary, this debugging experience was a valuable lesson in TypeScript's type system and best practices. It highlighted the importance of understanding and correctly utilizing type assertions and error handling to write more reliable and robust code.
