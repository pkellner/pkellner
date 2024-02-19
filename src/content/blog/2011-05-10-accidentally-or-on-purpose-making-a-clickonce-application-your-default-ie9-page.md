---
status: publish
published: true
pubDatetime: 2011-05-10T20:00:00.000Z
title: Accidentally (or on purpose) Making A ClickOnce Application your default IE9
  Page
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1470
wordpress_url: https://peterkellner.net/2011/05/10/accidentally-or-on-purpose-making-a-clickonce-application-your-default-ie9-page/
date: '2011-05-10 09:55:35 -0700'
date_gmt: '2011-05-10 16:55:35 -0700'
categories:
- Microsoft
- ClickOnce
- IE9
tags: []
---
<p>So, I’m testing a Microsoft <a href="http://msdn.microsoft.com/en-us/library/142dbbz4(VS.80).aspx">ClickOnce</a> application in a virtual machine and for convenience, I set the default page to be my <a href="http://en.wikipedia.org/wiki/ClickOnce">ClickOnce</a> page of the application I was testing.&#160; Clearly, I was not of full clarity because what happens now is when I run IE, it checks to see if the application is up to date, then immediately exits <a href="http://windows.microsoft.com/en-us/internet-explorer/products/ie/home">IE</a>.&#160; Problem is, I can’t actually stay in IE long enough to change the default to anything else, and of course, I can’t run IE anymore.</p>
<p>So, following what Daniel Boom once said (he was never lost, just at times confused as to where he was for a couple weeks), I began wondering how I could get my IE back without resorting to registry tweaks.</p>
<p>The solution was to simply find an application that had a help window with a URL in it.&#160; That is, almost all windows applications have a help/about that will take you to some web page.&#160; I did that and it worked.&#160; Then, I could set the default page back to blank as it should be.</p>
<p>Hope this helps!</p>
