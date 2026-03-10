---
title: "Are MCP Servers Going Obsolete? No — But Skills Are Claiming Territory That Was Never Really Theirs"
description: "MCP servers aren't dying, but a real shift is happening. Many use cases that started as MCP servers are finding a better home in skills. Here's what's actually going on."
pubDatetime: 2026-03-10T10:00:00.000Z
draft: false
tags: [mcp, skills, ai-agents, tanstack, developer-tooling, claude, llm, react]
ogImage: /images/mcp-skills-obsolete-og.png
---

<!-- Title alternatives:
1. "Skills vs. MCP Servers: The Real Story Behind the Shift in AI Developer Tooling"
2. "MCP Isn't Dead — Developers Are Just Getting Smarter About What Belongs Where"
3. "Teach the Agent or Let It Act? Why Skills and MCP Are Splitting the Work"

Subtitle: Understanding the maturing line between teaching an agent and giving it tools
-->

## TL;DR

[MCP](https://modelcontextprotocol.io/) servers aren't going away — but many things people first built as MCP servers are migrating to [skills](https://docs.anthropic.com/en/docs/claude-code/skills), because skills turn out to be a better fit for shipping library knowledge, coding conventions, and version-aware guidance. This post was written on March 10, 2026. The ecosystem is moving fast, so take the specifics with a grain of salt if you're reading this months later. The core mental model — skills teach the agent, MCP lets the agent act — should hold up longer than any particular product decision.

---

![Are MCP Servers Going Obsolete? Skills vs. MCP](/images/mcp-skills-obsolete-og.png)

## The Question Everyone Keeps Asking

If you've been paying attention to the AI developer tooling space over the past few months, you've probably noticed something: projects that once led with "we have an MCP server" are now leading with "we have skills." Or they're quietly de-emphasizing MCP in favor of other approaches. And it's happening enough that developers are understandably confused.

"If MCP is the future, why do I keep seeing people replace MCP servers with skills?"

It's a fair question. And the short answer is: they're not replacing MCP. They're relocating work that was always a slightly awkward fit for MCP into something that handles it better. That's not a death knell — it's the ecosystem growing up.

## A Quick Disclaimer on Certainty

Before I go further, I want to be upfront about something. I'm watching this ecosystem from the outside, same as most of you. I can see public repos, docs, blog posts, and conference talks. I can't see internal roadmaps, product discussions, or the specific trade-offs teams weighed before shipping. What follows are informed observations and reasonable inferences — not insider knowledge. When I say "it seems like" or "this probably reflects," I mean exactly that.

This matters because it's tempting to build a grand narrative around a few data points. I'll try not to do that.

## The Ecosystem Shift: What's Actually Happening

Here's the pattern, as clearly as I can state it:

Early in the [MCP](https://modelcontextprotocol.io/) wave, many teams — reasonably — explored MCP as *the* way to make their libraries, frameworks, and tools AI-friendly. MCP was the most visible new primitive. It had a spec. It had momentum. It had support from [Anthropic](https://www.anthropic.com/), and increasingly from [OpenAI](https://openai.com/index/new-tools-for-building-agents/) and others. If you wanted your project to be "agent-ready," building an MCP server felt like the obvious move.

And for a lot of use cases, it was and still is the right move.

But for another set of use cases — specifically, shipping package-level knowledge, coding conventions, best practices, and version-specific guidance — MCP turned out to be more infrastructure than the problem required. You don't need a running server to tell an AI model how your router works. You don't need a [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) connection to explain that your library deprecated `useQuery` v3 patterns in favor of v5 syntax.

**Skills are a more natural fit when the goal is to teach an agent. MCP is a more natural fit when the goal is to let an agent act.**

That single sentence captures most of what's happening right now.

## TanStack: A Case Study in Getting It Right

[TanStack](https://tanstack.com/) is one of the most interesting examples of this shift, and I think they deserve credit for how they're navigating it.

If you're in the [React](https://react.dev/) ecosystem, you almost certainly use something TanStack builds — [TanStack Query](https://tanstack.com/query/latest), [TanStack Router](https://tanstack.com/router/latest), [TanStack Table](https://tanstack.com/table/latest), [TanStack Form](https://tanstack.com/form/latest). These are foundational libraries. They're thoughtfully designed, well-documented, and widely adopted.

TanStack appears to be leaning into skills as the primary way to make their packages AI-friendly. And when you think about what TanStack packages actually need from an AI assistant, this makes a lot of sense:

- An agent working with TanStack Router needs to understand route configuration patterns, type-safe link generation, and how file-based routing conventions work
- An agent working with TanStack Query needs to know about `queryKey` factories, mutation invalidation patterns, and the difference between `staleTime` and `gcTime`
- An agent working with TanStack Form needs to understand validation schemas, field-level vs. form-level validation, and how to compose form adapters

None of these require a live server connection. None of them require authenticated API calls. None of them require dynamic data. What they require is *knowledge* — carefully curated, version-aware knowledge about how to use the library correctly.

That's what skills do. A skill can ship alongside a package and say: "Here's how to think about this library. Here are the current patterns. Here are the things that changed in the latest version. Here's what the agent should reach for first."

I don't want to overclaim what TanStack's internal thinking is. But from the outside, the direction looks like: ship guidance closer to the package, make version-specific knowledge easier for agents to consume, reduce unnecessary infrastructure for workflows that are mostly instructional, and give developers a simpler path for agent-ready package intelligence.

Whether or not every library author follows the exact same approach, TanStack is asking the right questions about where the line belongs between teaching an agent and equipping an agent. That's a contribution to the ecosystem that goes beyond any single product decision.

## Why This Shift Makes Sense

There's a well-known pattern in platform transitions: early on, people use the most visible new primitive for too many things. This isn't a criticism — it's how ecosystems find their shape.

When [REST](https://en.wikipedia.org/wiki/REST) APIs took off, people built REST endpoints for things that would have been better as background jobs, webhooks, or [WebSocket](https://en.wikipedia.org/wiki/WebSocket) connections. When [GraphQL](https://graphql.org/) arrived, some teams rewrote everything into GraphQL even when a simple REST endpoint was perfectly fine. When [serverless](https://en.wikipedia.org/wiki/Serverless_computing) became the rage, people stuffed long-running stateful processes into [Lambda](https://aws.amazon.com/lambda/) functions and wondered why things were painful.

MCP followed the same early pattern. It was genuinely useful, so it got applied broadly. Some of that broad application stuck. Some of it is now migrating to more appropriate homes.

The thing to understand is that this isn't a failure of MCP. It's the natural specialization that happens when a platform matures. Skills and MCP are not competing — they're *separating concerns*:

- **Skills** handle the "think" layer: how should the agent reason about this library, what patterns to follow, what to avoid, what changed recently
- **MCP** handles the "do" layer: execute this database query, create this [GitHub](https://github.com/) issue, deploy this service, fetch live data from this API

When you look at it through that lens, the current shift isn't surprising at all. It's clarifying.

## Where MCP Still Clearly Matters

Let me be direct: if you're building anything that involves live systems, authenticated actions, or dynamic data, MCP is not going anywhere. Skills can't replace what MCP does for these use cases, and they shouldn't try.

Here are the places where MCP remains the right tool:

**Databases and data systems.** If your agent needs to query a [PostgreSQL](https://www.postgresql.org/) database, inspect table schemas, or run analytics queries — that's MCP. There's no static skill that can substitute for a live database connection.

**Cloud infrastructure.** Managing [AWS](https://aws.amazon.com/) resources, deploying to [Kubernetes](https://kubernetes.io/), checking [CloudWatch](https://aws.amazon.com/cloudwatch/) logs — all of this requires authenticated, live interaction with remote systems. MCP servers for cloud providers are only going to become more important.

**SaaS integrations.** Interacting with [Jira](https://www.atlassian.com/software/jira), [Linear](https://linear.app/), [Slack](https://slack.com/), [Figma](https://www.figma.com/) — any tool where the agent needs to read or write data in a shared system — that's textbook MCP territory.

**Browser automation and testing.** Running a headless browser, interacting with web pages, taking screenshots, running [Lighthouse](https://developer.chrome.com/docs/lighthouse/) audits — these require live tool execution.

**Internal developer platforms.** If your company has a deployment pipeline, a feature flag system, or a secrets manager that agents need to interact with, MCP servers are how you expose those capabilities safely.

The pattern is clear: if the agent needs to *do* something against a live system, MCP is your answer.

## A Practical Decision Framework: Skills vs. MCP

Here's a simple framework for deciding what belongs where. It's not perfect, but it covers the vast majority of cases I've seen:

| Signal | Use a Skill | Use MCP |
|--------|-------------|---------|
| The main need is... | Knowledge, patterns, conventions | Actions, data, tool execution |
| The content is... | Relatively stable between releases | Dynamic, live, real-time |
| Auth required? | No | Usually yes |
| A running server needed? | No | Yes |
| Version-specific? | Yes — guidance changes per version | Less relevant |
| Example | "How to configure TanStack Router" | "Query my Postgres database" |
| Another example | "React 19 patterns and migration tips" | "Create a GitHub PR from this diff" |
| Another example | "Our design system component usage" | "Fetch current Datadog metrics" |

And here's the important nuance: **in many serious systems, both will exist together.**

A mature developer platform might have:
- A **skill** that teaches the agent how the team's internal framework works, what folder structure to follow, which components to use from the design system, and what naming conventions to apply
- An **MCP server** that lets the agent deploy code, run integration tests against staging, query the feature flag service, and post results to [Slack](https://slack.com/)

These aren't competing. They're complementary. The skill makes the agent smart about your system. The MCP server makes the agent capable of acting within it.

## What This Means for Library Authors and Tool Builders

If you maintain an [npm](https://www.npmjs.com/) package, a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) tool, a design system, or a framework, here's the practical takeaway:

**Start with a skill.** For most packages, the highest-leverage thing you can do for AI-assisted development is ship a skill that teaches agents how to use your library correctly. This means: current API patterns, common pitfalls, migration guidance from previous versions, and the "how we think about this" context that lives in your head but not always in your docs.

**Add MCP when you have operational needs.** If your tool has a CLI that agents should invoke, a server that agents should query, or an API that agents should call with authentication — that's when MCP makes sense.

**For advanced developer tooling, plan for both.** If you're building something like a full-stack framework, an internal developer platform, or a hosted service with both a library component and an operational component, you probably want a skill for the "how to use it" knowledge and an MCP server for the "do things with it" capabilities.

A few concrete examples:

- **A React component library** → Skill first. The agent needs to know your component API, composition patterns, and theming approach. It doesn't need a running server for that.
- **A database client library** → Skill for the API patterns, MCP for actual database operations.
- **A CI/CD platform** → Skill for pipeline configuration conventions, MCP for triggering builds, reading logs, and managing deployments.
- **A CSS framework like [Tailwind](https://tailwindcss.com/)** → Skill. The agent needs to understand utility classes, responsive patterns, and customization. No live server required.
- **An observability platform like [Datadog](https://www.datadoghq.com/)** → MCP. The agent needs to query live metrics, create dashboards, and set up alerts against a running system.

## The Bigger Picture: Not Replacement, but Separation

If I had to summarize this whole post in one mental model, it would be this:

The AI developer tooling ecosystem is going through the same kind of specialization that every successful platform goes through. The question isn't "MCP or skills?" — it's "which layer does this belong to?"

- **Teaching layer (skills):** Encode knowledge. Ship guidance. Make agents understand your library, your patterns, your conventions.
- **Action layer (MCP):** Expose capabilities. Enable operations. Let agents interact with live systems, authenticated services, and dynamic data.

Some things that started in the action layer are moving to the teaching layer because they were always more about knowledge than execution. That's healthy. That's the ecosystem getting smarter about its own architecture.

MCP isn't dying. Skills aren't killing it. The line between them is just getting clearer — and that's good for everyone building on top of this stack.

## Key Takeaways

- **MCP is not obsolete.** It remains the right choice for live tools, authenticated actions, dynamic data, and system interactions.
- **Skills are winning the "knowledge" category.** For library guidance, coding conventions, and version-aware best practices, skills are proving to be a better fit than MCP servers.
- **The trend is specialization, not replacement.** Teams are getting clearer about what should be a skill and what should be an MCP server.
- **For most library authors, start with a skill.** It's the highest-leverage way to make your package AI-friendly. Add MCP when you have genuine operational needs.
- **In production systems, expect both.** Skills to make agents smart. MCP to make agents capable. The best developer experiences will combine both layers thoughtfully.
