---
title: "Boring on Purpose: The Case for a Real Server in 2026"
date: 2026-07-20
excerpt: "At CHPTRS, almost everything runs on autonomous agents. That only holds together if the app itself can tell the agent when it's wrong — and that's exactly what a real server gives you"
pillar: ai
image: /og/boring-on-purpose.png
---

*Why I built Billet, and gave my AI agents a proper server.*

At [CHPTRS](https://chptrs.tech), almost everything we do runs on autonomous agents. Not one agent doing one thing while someone watches it, but a lot of them, working in parallel, building and shipping real features while we get on with other work.

That only holds together if you can actually trust them. An agent left running for an hour is only worth anything if what it produces is right, and when it isn't, something has to catch that without a human in the loop. Reliability and autonomy are the whole game. Take either one away and you're back to babysitting, and the moment you're babysitting you can only run one agent at a time.

So Billet started as a simple question: what does an app have to look like for me to hand it to an agent, walk off, and trust what I find when I come back?

The answer is that the app itself has to be the thing that tells the agent when it's wrong. Not me, because I'm not sat there watching. That idea has a name: backpressure, a term coined by [Geoffrey Huntley](https://latentpatterns.com/principles). Type errors, failing tests, lint warnings, a build that won't compile. Every one of those is a check that catches a mistake so I don't have to. Every time the toolchain says no, that's one less time an agent drifts off course and I have to step back in. (There's more on this in the [README](https://github.com/alexpricedev/Billet?tab=readme-ov-file#why-this-architecture-works-for-agents) if you want it.)

So what I really needed was a way to build apps that are easy to test and hard to break, from the ground up. State lives on the server and gets sorted out before anything renders. Templates that do the same thing every single time. The more of the app I could lock down with types and tests, the longer I could leave an agent running on its own.

## Nobody actually chooses the fat front-end

If you leave an AI coding agent to it, it'll build you a React app on Next.js. Point one of the AI builder tools at the same problem, like Lovable or Base44, and you get the same thing. It's not that this is right for your problem. It's just the most common pattern out there, so it's what falls out.

Quick bit of jargon first, because the rest of this leans on it. Your app has two halves. There's the part that runs on your user's phone or laptop, in their browser, which people call the client. And there's the part that runs on a computer you control somewhere else, which is the server. These tools tend to cram nearly everything into the client and then wire it straight into a ready-made cloud database, the kind Lovable and Base44 set up for you (Supabase is the usual one). There's barely any server in the middle.

That split causes problems. Because so much of the app runs in the browser, testing it properly means faking a browser. You're stuck with one way of rendering, its quirks, its build setup. Every one of those is somewhere the AI can get it wrong without anything flagging it.

If you're building something really interactive, like a collaborative editor or a drawing canvas, that complexity is worth it. I'd reach for a full client-side framework too. No argument there.

But most of what we build isn't that, and most of what anyone builds isn't that. It's pages that load some data, show it, and take a form submission. Tbh, most single-page apps have felt like overkill for years.

The difference now is that it matters more than ever. When an AI will reach for the heaviest option going without being asked, knowing when to actually deploy one of these frameworks, and when to leave it well alone, is one of the more important calls you get to make. The default has stopped being a decision, and that's exactly when you need to start making one.

What I think a lot of people don't realise is that when you do hit a page that genuinely needs high interactivity or a load of state, you can just opt into React for that one page (or Preact, in Billet's case). You drop a reactive component onto the page that needs it and leave everything else as plain server-rendered HTML. You opt into the fat client per page, instead of the whole app being one by default.

## The RLS problem

So back to that thick client concept, your browser wired right into a cloud DB that you don't fully control. There's a bigger problem lurking in there, and if you've shipped anything on Lovable or Base44 you've probably already run into it.

Because your app's data lives in that cloud database and the browser talks to it more or less directly, every table you've got is basically sitting out in the open. The connection is right there in the app, on the user's device. Anyone reasonably technical can open their browser's dev tools and poke at it.

So how do you stop one user reading another user's data? There's no real server in the middle to act as the bouncer. So the vendor (Supabase etc) offers you Row-Level Security (RLS) instead, usually with a big warning telling you to switch it on: your access rules, written in SQL, stuck onto each table one by one.

And this is where it all comes apart for me.

Your rules are now spread across loads of little policies, written in a language that's built for querying data, not for describing who's allowed to do what. There's no one place you can read to understand your own permissions. It's scattered across every table you've got.

You can't really test a policy the way you'd test a normal function either. You test it by throwing requests at it with different logins and hoping you covered everything. Miss one and it fails open, which is the worst way for a security thing to fail because nothing tells you.

And the rules you actually want usually don't fit anyway. Something like "only if their plan is active and they're under their quota" doesn't want to be a line of SQL. So that logic ends up back in the client, and now your permissions live in two places that have to agree forever.

It's slow, too. Those checks run on every single row of data, every time someone asks for anything, and the database ends up doing a load of extra work just to enforce them.

The real issue is that RLS only exists because there's nothing else there to do the job. Put a server back in the middle and most of this just goes away.

## So here's what I did instead

Billet isn't an app, it's a template you build your app on top of. It's a starting point for server-rendered apps with a light sprinkle of client-side JavaScript, and it comes with all the best-practice stuff for a modern web app already wired up. So instead of setting the same things up from scratch every time, you get them out the box and start on the actual product. One codebase, one test runner, one thing to deploy.

It's boring on purpose, and it's the same every time:

- Services own the data and the business logic
- Controllers do the deciding: fetch, choose, respond
- Templates just render, and nothing else

Templates are simple functions of what you pass them. Same input, same HTML, every time. So I test them by calling `renderToString()` (ah yes, we're still using JSX, the template language React popularised, just not React itself) and checking what comes out. No headless browser, no hydration, no flaky timing stuff.

The data is all sorted out on the server before a template runs, so there's nothing to load on the client and no back-and-forth waterfall to debug.

Under the hood it's [Bun](https://bun.sh) doing the running, bundling and testing. PostgreSQL through `Bun.SQL` with parameterised queries, so no ORM and nothing to inject into. Magic-link auth, CSRF protection and rate limiting are all already there.

And because all that boring baseline is done properly, it conforms to the [specification.website](https://specification.website) guidelines out of the box and scores a straight 100 across the board on Google's PageSpeed Insights. That's not me chasing a vanity number. It's just what falls out when the fundamentals are sorted from the start instead of bolted on at the end.

Best of all, the database goes back to just being a database. It's tucked safely behind the server, not sitting out in the open for you to lock down one policy at a time.

## Why a real server is worth it

So what does putting a proper server back in the middle actually get you? Start with the big one. There's now a single place where the deciding happens. Your user's browser asks for something, the server checks whether they're actually allowed it and sends back only what they should see, and your database stays tucked away where nobody on the outside can reach it directly. That's basically the whole point.

Your permissions become normal code. Real functions, with types, that you can read top to bottom and cover with tests. When you need "active plan and under quota", you just write an `if`. And it only lives in one spot.

Your secrets stay on the server where they belong. Your database sits behind the server and the browser can't touch it.

And this is where it all loops back to why I started. Apps built this way are exactly the kind of thing my agents are good at.

Agents do their best work when they get quick, clear feedback. Strict types, zero lint warnings, templates that behave, and a test suite that runs in seconds. The toolchain tells the agent it messed up before I ever have to. That's the backpressure that lets me walk off and actually trust what I find when I come back.

The fat client works against all of that. Async rendering and browser state give an agent a hundred little ways to be wrong and no quick way to notice.

Billet does the opposite. The whole setup is the feedback loop.

Billet was built and named in Sheffield, the Steel City. A billet is a rough piece of steel that's been shaped and is ready to be worked into something specific. That's the idea. A solid starting block with all the boring-but-important stuff already sorted, so the first thing I actually build is the product itself.

If you want to build on it, Billet's on [GitHub](https://github.com/alexpricedev/Billet). Grab it, then open `START_PROMPT.md` with your agent and it'll walk you through the whole setup: env files, renaming the project, stripping out the starter content, and checking everything works. After that you're straight onto the actual product.

And if you get stuck or just want to talk it through, I'm always around to help.
