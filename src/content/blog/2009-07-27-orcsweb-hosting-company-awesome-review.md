---
status: publish
published: true
pubDatetime: 2009-07-27T20:00:00.000Z
title: Bravo for ORCSWeb! On so many fronts
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 337
wordpress_url: https://peterkellner.net/2009/07/27/orcsweb-hosting-company-awesome-review/
date: '2009-07-27 12:59:07 -0700'
date_gmt: '2009-07-27 19:59:07 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- Code Camp Web Site Series
- web
- ASP.NET 2.0
- SQL Server
- Sql Server 2008
- hosting
tags: []
---
<p>Many of you know of <a href="http://www.orcsweb.com/">ORCSWeb</a> either by reputation, or by way of <a href="http://weblogs.asp.net/owscott/default.aspx">Scott Forsyth</a>, one of my ASP.NET MVP brothers.&#160; In case you don’t, they are a managed hosting solutions company specializing in Microsoft technologies.&#160; I’ve used their basic services for quite a while and have always been very happy.&#160; It has always seemed that anytime I’ve called them (and it always seems like the middle of the night) one of their tech support staff is always available to help me, and go the extra mile if necessary.</p>
<p>The company I’m now working at is small and we don’t have a lot of resources to maintain hardware and do operating system type support.&#160; We do have a high load requirement so we need a very robust supported solution.&#160; Before this, I’d always been in the under $50 per month type plan with ORCSWeb, but I decided I needed more servers and a higher level of support.&#160; I really did not know what level of support to expect when signing up for the managed servers but decided to go for it anyway.</p>
<p>All&#160; can say is <strong>WOW!!!</strong>&#160; I am over the top impressed. </p>
<p> <!--more-->
<p>We currently have 3 virtual servers hosted at ORCSWeb.&#160; One, we use as a development server, and the other two are in a webfarm configuration.&#160; I’ve always believed that when you go into production with a web site it’s critical you start with 2 servers in a webfarm.&#160; it’s really easy to go from 2 to 10, but can be very painful to go from 1 to 2.&#160;&#160; That’s a topic for another post, but suffice it to say, 2 is the minimum.</p>
<p>So, why am I so impressed?&#160; First, the support team they assigned to me is totally awesome.&#160; They all are focussed and competent which is a total relief compared with most hosting companies I’ve dealt with.&#160; Other companies always have good people, but it seems to be the bad ones that really give me cause to remember.&#160; Second, because I paid extra for the full managed support options on our three servers, I’ve been able to ask the things like the following.&#160; Almost all of them I could do myself, but I’m swamped with my technology role in the new company and really appreciate being able to hand stuff like this off.</p>
<ul>
<li>I’ve pointed my MX record at my .149 server.&#160; Could you please set up email and create the following 7 accounts. </li>
<li>Please Setup a secure ftp server at the following address with the following username and password (and make sure the user is locked down to the root) </li>
<li>Setup DFS Replication between these two directories on .148 and .149 </li>
<li>Create a RoboCopy script that copies files from my dev server to the .149 mirrored directory </li>
<li>Please set up web statistics for me on <a href="http://www.siliconvalley-codecamp.com">http://www.siliconvalley-codecamp.com</a> </li>
<li>Please figure out why SqlServer 2008 is not letting me access catalog MyStuff1 from user 3p1 and fix </li>
<li>Please make a replicate of website MyWeb1.com including the sqlserver catalog’s and put it on MyWeb2.com on server .149 </li>
<li>Please replace the sqlserver catalog MyStuff3 on server .149 with the bak file I uploaded to my ftp server </li>
<li>I could go on and on, but I think you are getting the idea. </li>
<li>Always with a smile, 24x7, what else can I say. </li>
</ul>
<p>By the way, if you want to see one of my sites hosted there, go to <a href="http://www.siliconvalley-codecamp.com">http://www.siliconvalley-codecamp.com</a></p>
<p>Thank you <a href="http://www.orcsweb.com/">ORCSWeb</a> for making things a lot easier for me.</p>
