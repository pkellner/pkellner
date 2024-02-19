---
status: publish
published: true
pubDatetime: 2015-01-31T20:00:00.000Z
title: Visual Studio 2015 Nasty Scroll Problem
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4168
wordpress_url: https://peterkellner.net/?p=4168
date: '2015-01-31 10:58:20 -0800'
date_gmt: '2015-01-31 17:58:20 -0800'
categories:
- Visual Studio
tags: []
---
<p>It just happened to me again.&#160; I accidentally moved a file in my Visual Studio solution that I had not intention of moving.&#160; I think I’ve narrowed down what my user error is that causes this but still, I know this happens to a lot of people besides me so I thought I’d file a connect bug with the hopes that Microsoft fixes it.</p>
<p>Here is the URL of the connect bug.&#160; Please go and vote for it!</p>
<p><a title="https://connect.microsoft.com/VisualStudio/feedback/details/1110209" href="https://connect.microsoft.com/VisualStudio/feedback/details/1110209">https://connect.microsoft.com/VisualStudio/feedback/details/1110209</a></p>
<p>Here is what I actually posted:</p>
<p>I'm labeling this as a bug because it happens so often and often with large consequences.&#160; Today, I finally spend some time and nailed down what actually causes it. </p>
<p>Here is the scenario:   <br />1.&#160; Go to scroll bar of Solution Explorer and grab scroll bar    <br />2.&#160; Start Moving scroll bar    <br />3.&#160; (do not notice that you missed grabbing the scroll bar but instead have grabbed a file    <br />4.&#160; let go of dragged files </p>
<p>The result is the file is dropped at some random place in your solution, likely never to be found again.</p>
