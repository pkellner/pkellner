---
layout: post
status: publish
published: true
title: ChatGPT Can Be Lazy And Not Think Out of the Box
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Navigating ChatGPT for database queries can be frustrating. In one instance, ChatGPT's solution for counting rows in a Prisma model proved problematic. Despite clarifications, the AI missed the mark, revealing its inability to completely rethink a problem. This behavior highlighted its shortcomings, resembling an approach worse than what one might expect from a junior programmer.

---

## ChatGPT Can Be Lazy And Not Think Out of the Box

When working with a tool as sophisticated as ChatGPT, one might anticipate consistently accurate and insightful outputs. However, this isn't always the case, as demonstrated by a recent interaction I had with the model while querying a SQL Server database using Prisma.

For context, consider the following Prisma model:

```typescript
model EmailDetails {
  Id                    Int       @id(map: "EmailDetails_pk") @default(autoincrement())
  AttendeesId           Int
  EmailSendStatus       String?   @db.NVarChar(16)
  EmailDetailsTopicId   Int?
  ...
}
```

I presented ChatGPT with the following request:

> "create a prisma query that counts the number of EmailSendStatusIds set to 'EmailSent' for an array of emailDetailstopicIds."

The response from ChatGPT was:

```typescript
const prisma = new PrismaClient();

async function getEmailSendStatusCount(emailDetailsTopicIds) {
    const count = await prisma.emailDetails.count({
        where: {
            EmailSendStatus: "EmailSent",
            EmailDetailsTopicId: {
                in: emailDetailsTopicIds
            }
        }
    });
    return count;
}
```

Upon reviewing, I found it wasn't aligned with my requirements. I was aiming for a count specific to each `EmailDetailsTopicId`. With hopes of rectification, I provided another prompt:

> "actually, 1 per row please"

ChatGPT then suggested:

```typescript
async function getEmailSendStatusCountsPerId(emailDetailsTopicIds) {
    const counts = [];

    for (const id of emailDetailsTopicIds) {
        const countForId = await prisma.emailDetails.count({
            where: {
                EmailSendStatus: "EmailSent",
                EmailDetailsTopicId: id
            }
        });
        counts.push({ topicId: id, count: countForId });
    }

    return counts;
}
```

This method would have necessitated multiple round trips to the database, a grossly inefficient approach. Only after pointing out the need for grouping did ChatGPT offer a solution that better fit the requirement:

```typescript
async function getEmailSendStatusCountsPerId(emailDetailsTopicIds) {
    const results = await prisma.emailDetails.groupBy({
        by: ['EmailDetailsTopicId'],
        where: {
            EmailSendStatus: "EmailSent",
            EmailDetailsTopicId: {
                in: emailDetailsTopicIds
            }
        },
        _count: {
            EmailDetailsTopicId: true
        }
    });

    return results.map(r => ({
        topicId: r.EmailDetailsTopicId,
        count: r._count.EmailDetailsTopicId
    }));
}
```

### Conclusion

In conclusion, what I learned is that even when told to re-do something, ChatGPT does not think about the fact that you told it, that it was on a bad path. It just fixes the bad path instead of going back to the drawing board and doing it again.

Seems that's not quite like real thinking to me. This is worse than I'd expect from a junior programmer.

