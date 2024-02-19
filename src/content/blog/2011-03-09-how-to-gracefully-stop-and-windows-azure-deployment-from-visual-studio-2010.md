---
status: publish
published: true
pubDatetime: 2011-03-09T20:00:00.000Z
title: How To Gracefully Stop and Windows Azure Deployment From Visual Studio 2010
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1440
wordpress_url: https://peterkellner.net/2011/03/09/how-to-gracefully-stop-and-windows-azure-deployment-from-visual-studio-2010/
date: '2011-03-09 10:00:16 -0800'
date_gmt: '2011-03-09 17:00:16 -0800'
categories:
- Visual Studio 2010
- VS2010
- Azure
- Azure Web Role
tags: []
---
<p>The way I do <a href="http://www.microsoft.com/windowsazure/">Windows Azure</a> development is that I have <a href="http://social.technet.microsoft.com/Forums/en/windowsazuredata/thread/aedbfdd4-0092-4b10-a84f-ba816438ed54">OneClick Deployment</a> setup on my Azure host.&#160; This means I can simply and quickly update what I have on my Azure WebRole and test it without going through the 10 to 20 minute deployment process.&#160; Sometimes, when I’m tired, I accidentally press the “Debug” or “Run” button on my <a href="http://www.microsoft.com/visualstudio/en-us/products/2010-editions">Visual Studio 2010</a> cloud project.&#160; This launches a 2 or 3 minute process that I have trouble killing.</p>
<p>Today, I accidentally figured out a way to stop it.&#160; Simply go to the web project and right mouse button on your project and say “Publish”. You will be immediately presented with an option to stop the deployment!</p>
<p>That’s it.&#160; Simple, but pretty undiscoverable IMHO.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/How-To-Gracefully-Stop-and-Windows-Azure_7C9D/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/How-To-Gracefully-Stop-and-Windows-Azure_7C9D/image_thumb.png" width="244" height="95" /></a></p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/How-To-Gracefully-Stop-and-Windows-Azure_7C9D/SNAGHTMLc6db08a.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="SNAGHTMLc6db08a" border="0" alt="SNAGHTMLc6db08a" src="/FilesForWebDownload/How-To-Gracefully-Stop-and-Windows-Azure_7C9D/SNAGHTMLc6db08a_thumb.png" width="287" height="369" /></a></p>
