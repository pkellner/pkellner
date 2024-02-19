---
status: publish
published: true
pubDatetime: 2008-10-12T20:00:00.000Z
title: How To Tell If Ajax is working on your site with ASP.NET's ajax UpdatePanel
  and other Controls
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 176
wordpress_url: https://peterkellner.net/2008/10/12/tell-ajax-working-asp-net/
date: '2008-10-12 20:36:26 -0700'
date_gmt: '2008-10-13 01:36:26 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- Atlas/AJAX
- IIS7
tags: []
---
<p>So, I suppose you should just be able to see the fact that <a href="http://www.asp.net/ajax/">Ajax</a> is working by the lack of page flashing.&#160; That may be true on a normal page on a slow connection, but if you are testing locally, it may not be so obvious.&#160; You can certainly crank up your debugging tools like <a href="http://getfirebug.com/">firebug</a> or <a href="http://www.asp.net/ajax/">Fiddler</a>, or you can do the cheap trip about I'm about to explain.</p>
<p>Simply, add a sleep statement to your page_load event (Thread.Sleep(3000);) and run your page.&#160; If you are using <a href="http://www.microsoft.com/windows/products/winfamily/ie/default.mspx">IE7</a> like I am, on the post back (for a full page), you will see the windows icon spinning in the tab control.&#160; If you see that, you are getting a full page post back. If not, chances are you are not.</p>
<p>Hope this helps!</p>
