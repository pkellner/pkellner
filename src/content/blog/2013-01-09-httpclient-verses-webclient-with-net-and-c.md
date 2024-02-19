---
status: publish
published: true
pubDatetime: 2013-01-09T20:00:00.000Z
title: HttpClient Verses WebClient with .Net and C#
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2691
wordpress_url: https://peterkellner.net/?p=2691
date: '2013-01-09 15:47:23 -0800'
date_gmt: '2013-01-09 22:47:23 -0800'
categories:
- ASP.net
- ASP.NET 4.5
tags: []
---
<p>I often find I do what I know over and over again and don’t look for new solutions if the old tried and true solution works.&#160; At my last hackathon, I wrote an app the screen scraped the starbucks site.&#160; I noticed when I looked at the site that a redirect happened after sign in.&#160; My WebClient call did not follow the redirect.&#160; I asked for help from a very bright Microsoft Azure guy (<a href="https://twitter.com/joshtwist">Josh Twist</a>) who blogs at <a title="http://www.thejoyofcode.com/About_us.aspx" href="http://www.thejoyofcode.com/About_us.aspx">http://www.thejoyofcode.com/About_us.aspx</a>.&#160; Josh suggested switching to HttpClient and making sure to set the option that follows redirects.</p>
<p>Perfect!&#160; I’m hooked on HttpClient now forever. WebClient is now just in my rear view mirror.</p>
