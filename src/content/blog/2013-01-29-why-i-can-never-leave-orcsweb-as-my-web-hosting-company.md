---
status: publish
published: true
pubDatetime: 2013-01-29T20:00:00.000Z
title: Why I Can Never Leave ORCSWeb as My Web Hosting Company
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3411
wordpress_url: https://peterkellner.net/?p=3411
date: '2013-01-29 17:36:21 -0800'
date_gmt: '2013-01-30 00:36:21 -0800'
categories:
- SQL Server
- Sql Server 2008
- hosting
tags: []
---
<h2>Some Background and Getting Started</h2>
<p>Last weekend, a relatively new customer of mine moved their production <a href="http://en.wikipedia.org/wiki/Web_hosting_service">hosting</a> from a private dedicated server running ASP.NET to <a href="http://www.orcsweb.com/">ORCSWeb</a> <a href="http://en.wikipedia.org/wiki/Cloud_computing">cloud hosting</a>.&#160; They were running SqlServer 2000 and Windows Server 2003. We moved them to <a href="http://www.microsoft.com/en-us/server-cloud/windows-server/">Microsoft Windows 2008</a> and Sqlserver 2008.&#160; These kind of moves of productions servers always make me very nervous.&#160; It seems like even though we make list after list, check the lists twice, test moving the SqlServer databases, etc., something always seems to go wrong.&#160; In this case, their SqlServer database is 50Gig so that adds a little interest also.</p>
<p>The moved started at 8PM eastern time.&#160; Everything seemed to be going smoothly until I actually tried running the data on the new server.&#160; Boom!&#160; Http Error 500 (Internal Error).&#160; It’s now about 11PM eastern time and I’m on the west coast at 8PM.&#160; I realize I’m getting kind of hungry (and stupid because of that) so I decided to take a 30 minute break and grab some food.&#160; After getting food, I decided to call my managed hosting support time (now near midnight on the east coast where ORCSWeb is) and Artur answers the page.</p>
<p>&#160;</p>
<h2>Now Comes The Amazing Part</h2>
<p>I explain the problem to Artur who quietly listens to my long winded and winding explanation of how I got where I did.&#160; Basically, I’m wanting him to look at server logs and help me diagnose what is wrong.&#160; After he patiently listened to me (and I was finished with my long winded explanation), Artur says “I was thinking about calling you a while ago when I noticed your server was generating errors.&#160; I took a look and found several things wrong in the setup including permissions errors”.&#160; He then goes on to say “So, I fixed those errors and everything seems to be working now”.</p>
<p>Wow!&#160; It never occurred to me to check to see if the server magically started working after I came back from my short dinner.&#160; It was, and it is!</p>
<p>&#160;</p>
<h2>Job Well Done ORCSWeb!</h2>
