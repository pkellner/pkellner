---
status: publish
published: true
pubDatetime: 2014-02-17T20:00:00.000Z
title: A Minimalist WebAPI 2 Visual Studio Project
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3944
wordpress_url: https://peterkellner.net/?p=3944
date: '2014-02-17 09:12:40 -0800'
date_gmt: '2014-02-17 16:12:40 -0800'
categories:
- WebAPI
- Visual Studio 2013
tags: []
---
<p>Introduction</p>
<p>Many of us have been asking Microsoft to keep all the extra stuff out of <a href="http://www.visualstudio.com/">Visual Studio</a> 2013 projects.&#160; For example, I don’t want JQuery in my project yet almost all project types include it.&#160; So, here are my steps to create just <a href="http://www.asp.net/vnext/overview/aspnet-web-api">WebAPI</a> 2 and no other types that are not directly that.</p>
<p>The Steps</p>
<p>File / New / Project</p>
<p><a href="/wp/wp-content/uploads/2014/02/image7.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb7.png" width="244" height="138" /></a> </p>
<p>Empty Project with Just WebAPI</p>
<p><a href="/wp/wp-content/uploads/2014/02/image8.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb8.png" width="244" height="171" /></a> </p>
<p>Then, when I go into References / Manage NuGet</p>
<p><a href="/wp/wp-content/uploads/2014/02/image9.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb9.png" width="244" height="84" /></a> </p>
<p>I see just 4 packages</p>
<p><a href="/wp/wp-content/uploads/2014/02/image10.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb10.png" width="244" height="154" /></a> </p>
<p>My Solution explorer is small and if I look in my App_Start, I just have one simple file, WebApiConfig.cs which is as follows:</p>
<p><a href="/wp/wp-content/uploads/2014/02/image13.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb13.png" width="244" height="236" /></a>&#160;</p>
<p><a href="/wp/wp-content/uploads/2014/02/image14.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb14.png" width="244" height="225" /></a> </p>
<p>Project size, 29 files, 9 folders.&#160;&#160; I’d say that’s pretty good.</p>
