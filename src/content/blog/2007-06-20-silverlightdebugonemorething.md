---
status: publish
published: true
pubDatetime: 2007-06-20T20:00:00.000Z
title: One Last Gotcha for debugging Web Service Projects with Silverlight
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br /><p>So you followed all my directions and you still can't debug your
  Silverlight Project with a web service?  Read on.</p>"
wordpress_id: 66
wordpress_url: https://peterkellner.net/2007/06/20/silverlightdebugonemorething/
date: '2007-06-20 18:09:27 -0700'
date_gmt: '2007-06-21 01:09:27 -0700'
categories:
- Silverlight
tags: []
---
<h2>Project / Properties / Startup Options</h2>
<p>All of a sudden, I could no longer debug my project. After poking around for a while, I discovered that if I went to the webserver projects property tab, startup options I had to select &quot;Silverlight Project&quot;. I don't remember unchecking this, but none the less, there you go.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebugc.jpg" width="500" /></p>
<p> I'm of course referring to my article of a couple days ago at:&#160; <br /><a href="/2007/06/18/silverlightdebugwebservicedotnet/">     <br />https://peterkellner.net/2007/06/18/silverlightdebugwebservicedotnet/</a></p>
