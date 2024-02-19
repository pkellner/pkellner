---
status: publish
published: true
pubDatetime: 2008-04-01T20:00:00.000Z
title: Display Images with IIS7 in Vista or Windows 2008
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>How to solve problem off image not appearing in iis7.  css,gif's, etc.</p>"
wordpress_id: 107
wordpress_url: https://peterkellner.net/2008/04/01/iis7imageproblem/
date: '2008-04-01 05:38:59 -0700'
date_gmt: '2008-04-01 12:38:59 -0700'
categories:
- Page Handlers
- ASP.NET 2.0
tags: []
---
<p>So, this may seem simple, but for an hour I wrestled with displaying images on IIS7 with vista.&#160; ASP.NET worked fine, but no static files, css, jpg's, gif's or anything.&#160; Just unformatted text.</p>
<p>Turns out when I added the web server in vista, I forgot to check the Static Content checkbox under World Wide Web Services / Common Http Features.</p>
<p> <!--more-->
<p>Hope this finds you if you are having the same problem.</p>
<p><a href="/wp/wp-content/uploads/2008/04/webconfig.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="webconfig" src="/wp/wp-content/uploads/2008/04/webconfig-thumb.jpg" width="333" height="297" /></a></p>
