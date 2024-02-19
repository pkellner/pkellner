---
status: publish
published: true
pubDatetime: 2011-09-20T20:00:00.000Z
title: Silicon Valley Code Camp Login Failing with IE10 (Fixed Now)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1573
wordpress_url: https://peterkellner.net/2011/09/20/silicon-valley-code-camp-login-failing-with-ie10-fixed-now/
date: '2011-09-20 10:10:29 -0700'
date_gmt: '2011-09-20 17:10:29 -0700'
categories:
- ".Net 2.0"
- ASP.NET 2.0
- ".NET 4.0"
- ASP.NET 4.0
tags: []
---
<p>&#160;</p>
<p><a href="http://www.hanselman.com/blog/BugAndFixASPNETFailsToDetectIE10CausingDoPostBackIsUndefinedJavaScriptErrorOrMaintainFF5ScrollbarPosition.aspx">Scott Hanselman posted</a> a while back about a browsers definition problem with some ASP.NET sites that causes problems.&#160; Microsoft has <a href="http://support.microsoft.com/kb/2600088">articles</a> on this also.&#160; Having just received my <a href="http://www.buildwindows.com/">BUILD</a> tablet that includes IE10, I tested the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp web site</a> and discovered that when you login, then switch to another page, the login did not stick.&#160; After uploading the two files Scott mentions (<a href="http://msdn.microsoft.com/en-us/library/ms228122.aspx">firefox.browser and ie.browser</a>), the problem goes away.</p>
<p>Thanks Scott for the heads up.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/09/image3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/09/image_thumb2.png" width="657" height="350" /></a></p>
