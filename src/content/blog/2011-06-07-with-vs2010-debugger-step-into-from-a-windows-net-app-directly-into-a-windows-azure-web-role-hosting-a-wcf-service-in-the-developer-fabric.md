---
status: publish
published: true
pubDatetime: 2011-06-07T20:00:00.000Z
title: With VS2010 Debugger, Step Into, From a Windows .Net App Directly into a Windows
  Azure Web Role Hosting a WCF Service In The Developer Fabric
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1508
wordpress_url: https://peterkellner.net/2011/06/07/with-vs2010-debugger-step-into-from-a-windows-net-app-directly-into-a-windows-azure-web-role-hosting-a-wcf-service-in-the-developer-fabric/
date: '2011-06-07 14:52:09 -0700'
date_gmt: '2011-06-07 21:52:09 -0700'
categories:
- Visual Studio
- Visual Studio 2010
- Azure
- Azure Blob Storage
- Azure Web Role
- Azure Deployment
tags: []
---
<p>&#160;</p>
<p>OK, I think this is the longest post title I’ve ever made, but if you understand it, you’ll know why it needs to be so long.&#160; I discovered this totally by accident.&#160; I would never ever have pressed F11 (step into) from a client side proxy and expect to get into anything but a bunch of ugly machine generated proxy code (especially with <a href="http://www.microsoft.com/windowsazure/">Azure</a>).&#160; To my total surprise, I landed right inside my <a href="http://msdn.microsoft.com/en-us/netframework/aa663324.aspx">WCF</a> service as if I had started the <a href="http://www.microsoft.com/en-us/cloud/developer/resource.aspx?resourceId=what-is-windows-azure&amp;fbid=flWeS4xmu1C&amp;WT.srch=1&amp;WT.mc_id=85C588D4-A353-4E3D-8824-823A9551AA51&amp;CR_SCC=200028978">Windows Azure Developer fabric</a> in debug mode and set a break point.</p>
<p>So, I’ll step through the process an show screen shots on the outside chance I was dreaming and can’t reproduce it. If I can, now I will have proof so I can do it again.&#160; Sorry for the work in progress code you will see.&#160; The point here is really the debugger and not the code I’m showing so try and ignore that.</p>
<p>OK, here we go.</p>
<p>Let’s assume you have a completely configured azure web role that is hosting a simple <a href="http://en.wikipedia.org/wiki/Windows_Communication_Foundation">WCF</a> service.&#160; When you start that web role and point at the service, you’ll get something like this: (just a note that I started the app fabric by deploying directly from <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft</a> <a href="http://www.microsoft.com/visualstudio/en-us">Visual Studio 2010</a> with the start/run.&#160; I am using a debug profile but am <strong>NOT </strong>running in debug mode.&#160; If I do run the app fabric in debug mode, this does not work.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image4.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb4.png" width="480" height="366" /></a></p>
<p>  <!--more-->
<p>&#160;</p>
<p>OK, now let’s run my app that has a <a href="http://visualstudiomagazine.com/articles/2011/06/01/pcnet_wcf-and-soa.aspx">WCF</a> client configured to connect to this service.&#160; The configuration is the normal “Add Service Reference” you would expect but I’m showing it any how just to be clear.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb5.png" width="485" height="473" /></a></p>
<p>&#160;</p>
<p>Next, we simply Launch <a href="http://www.microsoft.com/visualstudio/en-us">Visual Studio 2010</a> in <a href="http://msdn.microsoft.com/en-us/library/sc65sadd.aspx">debug</a> mode and put a break point just before we cross over into the WCF service by calling the above proxy code.&#160; Here is what that screen looks like after the break point is hit and I’m about to step INTO.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image6.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb6.png" width="616" height="198" /></a></p>
<p><font size="6">F11</font></p>
<p>&#160;</p>
<p>and…..</p>
<p><a href="/wp/wp-content/uploads/2011/06/image7.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb7.png" width="657" height="265" /></a></p>
<p><font size="2"></font></p>
<p>There we are!!! right inside the source code that is my WCF service with everything working as if I had launched the site on it’s own, set a break point and waited.</p>
<p>&#160;</p>
<p>Truly amazing!!!&#160; I have nothing more to say.</p>
