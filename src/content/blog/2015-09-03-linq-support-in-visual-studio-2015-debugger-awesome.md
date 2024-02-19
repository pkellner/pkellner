---
status: publish
published: true
pubDatetime: 2015-09-03T20:00:00.000Z
title: LINQ Support in Visual Studio 2015 Debugger Awesome
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4296
wordpress_url: https://peterkellner.net/?p=4296
date: '2015-09-03 08:26:03 -0700'
date_gmt: '2015-09-03 15:26:03 -0700'
categories:
- C#
- Visual Studio
- Debugging
- Visual Studio 2015
tags: []
---
<p>I’ve been wanting to do this for a very long time.  I’m in the debugger of <a href="https://www.visualstudio.com/en-us/products/vs-2015-product-editions.aspx">Visual Studio 2015</a> and I have some data structure that is a collection of objects.  To find what I want, I’ve had to either write ugly conditional debugging statements or put in some temporary c# if statements to stop on what I wanted and examine it.</p>
<p>Now, I can just write the LINQ code in the watch window of <a href="https://www.visualstudio.com/">Visual Studio</a> and see exactly what I want.  Check out the screen shot below and notice that I just typed in: meetupResults.results.Select(a=&gt;a.urlname).ToList() and I got exactly what I wanted.</p>
<p>Very nice!</p>
<p><a href="/wp/wp-content/uploads/2015/09/image.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/09/image_thumb.png" alt="image" width="610" height="436" border="0" /></a></p>
