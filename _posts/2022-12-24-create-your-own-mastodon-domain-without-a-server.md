---
layout: post
status: publish
published: true
title: How To Create a Custom Name on Mastodon @pkellner@peterkellner.net
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: I don't want to be tied to a particular Mastodon server for my Mastodon name. It's easy to solve the problem by creating a simple static file on your web server.
---

## The Problem

How many of us know people that are still using aol.com for their email? I know for me, when I see that
I immediately think "dinosaur". I know that's bad, and I shouldn't pre-judge, but it's hard not to. That's why I
created my own domain ([peterkellner.net](https://peterkellner.net)) a very long time ago. I allowed me to not have to keep telling people I've
changed my address. You don't know that my email is hosted on gmail, and that's just how I want it.

We can do the same thing pretty easily with Mastodon. it took me about 3 hours to figure it out, but hopefully, you
will be faster.

Oh, and follow me at [@pkellner@peterkellner.net](https://techhub.social/@pkellner)

## The Solution Using GitHub Pages

I happen to use GitHub Pages and Jekyll for this blog, but it really doesn't matter what you use to make this work.
All you need to do is figure out a way such that your Mastodon configuration file is referenced from a URL on your web site that
looks like this:

**{YourDomain}/.well-known/webfinger**

Or, in my case, [https://peterkellner.net/.well-known/webfinger](https://peterkellner.net/.well-known/webfinger)

To get this file, you need to browse to your current Mastodon instance at a URL like this:

**{Your Mastodon Host}/.well-known/webfinger?resource=acct:accountname@server**

or in my case:

https://techhub.social/.well-known/webfinger?resource=acct:pkellner@techhub.social

Then, using wget, or however you want, copy that file to your own static server so it responds from the URL

**{YourDomain}/.well-known/webfinger** ( [https://peterkellner.net/.well-known/webfinger](https://peterkellner.net/.well-known/webfinger) )

Because I use Jekyl and GitHub Pages, I had to also update my _config.yaml file to have the additional line:

**include: [ ".well-known" ]**

Here is the [commit](https://github.com/pkellner/pkellner/commit/c384f4239fa602ff440bbe14bf106b0ca76ca6e3) I did that with.

but this may not be necessary for you.

See you at Mastodon!

[@pkellner@peterkellner.net](https://techhub.social/@pkellner)

# Reference

Everything I know I got from:

[https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html](https://blog.maartenballiauw.be/post/2022/11/05/mastodon-own-donain-without-hosting-server.html)

