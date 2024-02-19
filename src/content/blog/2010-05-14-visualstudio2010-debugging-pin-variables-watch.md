---
status: publish
published: true
pubDatetime: 2010-05-14T20:00:00.000Z
title: Using Visual Studio 2010&rsquo;s Debugger PIN Feature
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1317
wordpress_url: https://peterkellner.net/2010/05/14/visualstudio2010-debugging-pin-variables-watch/
date: '2010-05-14 21:57:26 -0700'
date_gmt: '2010-05-15 04:57:26 -0700'
categories:
- Visual Studio 2010
- VS2010
- Debugging
- Tips
tags: []
---
<p>One of the very cool new features in Visual Studio 2010 is the ability to “Pin” a variable you are watching, right in the place you want to see it.&#160; It’s always been a hassle to have to add a “Watch” and keep track of it among all your other watch variables.&#160; I guess I shouldn’t really complain because I’ve always really like the debug capabilities in Visual Studio, but I have to say, this new “Pin” is really nice.</p>
<p> <!--more-->
<p>&#160;</p>
<p>So, let me explain by example.&#160; </p>
<p>At the moment, I’m debugging the Silicon Valley Code Camp web site project and I’m checking a boolean I set called DoValidation.&#160; I’m trying to figure out why it is changing, but first I have to figure out when.&#160; So, I set a break point on the line as shown below:</p>
<p><a href="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_thumb.png" width="444" height="203" /></a> </p>
<p>Now, I hover over the variable I want to pin and press the little pin icon shown here:</p>
<p><a href="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_3.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_thumb_3.png" width="443" height="198" /></a> </p>
<p>I then see the following with my little watch window right in line with my code.</p>
<p><a href="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_4.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_thumb_4.png" width="447" height="144" /></a> </p>
<p>I can even click the little chevron under the pin and add a comment as I show next.</p>
<p><a href="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_5.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingVisualStudio2010sDebuggerPINFeature_134A7/image_thumb_5.png" width="468" height="193" /></a> </p>
<p>The nice thing is that this stays here just like your break point until you close it.&#160; A very convenient feature.</p>
