---
status: publish
published: true
pubDatetime: 2012-01-31T20:00:00.000Z
title: Take Defaults! (not customizations) When Installing Software
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1800
wordpress_url: https://peterkellner.net/2012/01/31/take-defaults-not-customizations-when-installing-software/
date: '2012-01-31 22:55:11 -0800'
date_gmt: '2012-02-01 05:55:11 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>&#160;</p>
<h2>Some Background</h2>
<p>Years ago, my friend Bill Venners of <a href="http://www.artima.com/weblogs/index.jsp?blogger=bv">Artima</a> told me a life long lesson that I always seem to forget.&#160; He said that when people design <a href="http://www.apple.com/macosx/recovery/">installation</a> programs, they always thoroughly test the “default” installation but not all the corner cases around custom options.</p>
<p>Today, while configuring my new <a href="http://www.apple.com/mac/">MacBook</a> (Best <a href="http://windows.microsoft.com/en-us/windows7/products/home">Windows 7</a> Computer Laptop they say), I learned this lesson all over again.&#160; So, here is the story.</p>
<p>&#160;</p>
<h2>
<p>How To Split Your Hard MacBook Primary Drive 50/50, IOS Lion and Windows 7</p>
</h2>
<p>My thinking is that I need to first allocate a NTFS partition on the MacBook that takes half my hard drive and let the OSX Lion install take over the rest.&#160; After about 10 iterations of IOS complaining that it did not have enough resources, I finally decided to take a step backwards and ask myself “how would my mom be able to do this?” and we all know that Mac’s are designed for my mom.&#160; So, with that thinking, I just let the IOS Lion install take over the entire disk.&#160; Then I ran the Boot Camp Assistant.&#160; It asked me how much of my hard drive I wanted for Windows, I said 50% and everything ran perfect.&#160; No partition magic, no special setup, just take the defaults with <a href="http://www.apple.com/support/bootcamp/">bootcamp</a>!</p>
