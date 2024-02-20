---
layout: post
status: publish
published: true
title: ChatGPT for Code Reviews Accurate but Lacks Initiative
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: ChatGPT can be an asset in code review but lacks the instinct to suggest improvements or identify gaps that a junior developer might easily catch. While it does what it's told, don't expect it to go above and beyond.

---

# ChatGPT for Code Reviews: Accurate but Lacks Initiative

In the constantly evolving world of software development, quality code is more important than ever. Today, we're going to take a closer look at how ChatGPT stacks up when it comes to reviewing and improving TypeScript code, particularly for email obfuscation. While the machine does what it's told, it doesn't always go above and beyond. Let's dive in.

## Setting The Stage: Initial Code Review with ChatGPT

I turned to ChatGPT to review a piece of TypeScript code designed to obfuscate email addresses. The question was straightforward: "Does this code implement correct rules for the standards of Internet domain names and usernames in email addresses?"

### The Original Code

Here's the TypeScript code in question:

```typescript
const obfuscateEmail = (email: string): string | null => {
  const logError = (message: string) => {
    console.log(`${message} Email: ${email}`);
  };

  if (!email.includes("@")) {
    logError("Invalid email format: '@' symbol missing.");
    return null;
  }

  const [user, domain] = email.split("@");

  if (!user || !domain) {
    logError("User or domain part is empty.");
    return null;
  }

  const domainParts = domain.split(".");

  if (domainParts.length < 2) {
    logError("Domain doesn't have a valid format.");
    return null;
  }

  const [firstPart, secondPart] = domainParts;

  if (!firstPart || !secondPart || firstPart.length < 3) {
    logError("Parts of domain are either empty or too short.");
    return null;
  }

  const obfuscatedUser = user[0] + "*".repeat(user.length - 1);
  const obfuscatedDomain = "*".repeat(firstPart.length - 2) + firstPart.slice(-2) + "." + secondPart;

  return `${obfuscatedUser}@${obfuscatedDomain}`;
};
```

### The Conversation with ChatGPT

**Me:** Does this code implement correct rules for the standards of Internet domain names and usernames in email addresses?

**ChatGPT:** The code does touch upon some key aspects but misses out on several. Would you like a refactored version of this function that accounts for the caveats?

**Me:** Absolutely, go ahead.

**ChatGPT:** I can draft up a more robust version of `obfuscateEmail` that considers those guidelines. Keep in mind, this won't be as comprehensive as running a full RFC 5322 validation, but it'll be more nuanced than the original.

### ChatGPT's Revised Code

With that green light, ChatGPT provided this refactored code:

```typescript
const obfuscateEmail = (email: string): string | null => {
  const logError = (message: string) => {
    console.log(`${message} Email: ${email}`);
  };

  if (!email.includes("@")) {
    logError("Invalid email format: '@' symbol missing.");
    return null;
  }

  if (email.length > 254) {
    logError("Email exceeds the allowed maximum length.");
    return null;
  }

  const [user, domain] = email.split("@");

  if (!user || !domain || user.length > 64) {
    logError("User or domain part is empty or username is too long.");
    return null;
  }

  const domainParts = domain.split(".");

  if (domainParts.length < 2) {
    logError("Domain doesn't have a valid format.");
    return null;
  }

  const tld = domainParts[domainParts.length - 1];

  if (!tld || tld.length < 2) {
    logError("Invalid top-level domain.");
    return null;
  }

  const obfuscatedUser = user[0] + "*".repeat(user.length - 1);
  const domainExceptTld = domainParts.slice(0, -1).join('.');
  const obfuscatedDomain = "*".repeat(domainExceptTld.length) + "." + tld;

  return `${obfuscatedUser}@${obfuscatedDomain}`;
};
```

## The Final Verdict: Doing What's Asked, but Not More

ChatGPT did improve upon the original code but didn't make the initiative to suggest best practices or offer insights that would come naturally to a junior developer. While the machine can be a useful tool for code validation, remember that it will only do what it's asked. A valuable lesson for anyone integrating AI into their coding workflow.



