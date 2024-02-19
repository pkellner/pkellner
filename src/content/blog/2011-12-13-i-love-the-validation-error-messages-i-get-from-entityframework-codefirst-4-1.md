---
status: publish
published: true
pubDatetime: 2011-12-13T20:00:00.000Z
title: I Love the Validation Error Messages I Get From EntityFramework CodeFirst 4.1!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1726
wordpress_url: https://peterkellner.net/2011/12/13/i-love-the-validation-error-messages-i-get-from-entityframework-codefirst-4-1/
date: '2011-12-13 22:20:22 -0800'
date_gmt: '2011-12-14 05:20:22 -0800'
categories:
- Entity Framework
- CodeFirst
tags: []
---
<p>I’ve been using <a href="http://msdn.microsoft.com/en-us/data/aa937723">EntityFramework’s</a> <a href="http://msdn.microsoft.com/en-us/data/gg685467">CodeFirst</a> 4.1 on a new project I’ve been working.&#160; I plan to blog quite&#160; bit about it, but in the mean time I just felt the need to share.&#160; I’ve got some fairly complex code where I add an object tree to the database context (which turns into SqlServer data).&#160; When I call db.SaveChanges(), I get an awesome error (see below) telling me exactly why it failed.</p>
<p>I’m currently on the honey moon with <a href="http://msdn.microsoft.com/en-us/data/hh134816">EF CodeFirst</a>.&#160; I only have about 10 tables (4 deep at most).&#160; Life is good.</p>
<p>&#160;&#160;<br />
<blockquote style="margin-right: 0px" dir="ltr"><a href="/wp/wp-content/uploads/2011/12/image6.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/12/image_thumb6.png" width="616" height="302" /></a></p></blockquote>
