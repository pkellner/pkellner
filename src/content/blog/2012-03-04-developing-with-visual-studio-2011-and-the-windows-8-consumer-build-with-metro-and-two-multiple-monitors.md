---
status: publish
published: true
pubDatetime: 2012-03-04T20:00:00.000Z
title: Developing With Visual Studio 2011 and the Windows 8 Consumer Build With Metro
  and Two (multiple) Monitors
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1858
wordpress_url: https://peterkellner.net/2012/03/04/developing-with-visual-studio-2011-and-the-windows-8-consumer-build-with-metro-and-two-multiple-monitors/
date: '2012-03-04 19:27:19 -0800'
date_gmt: '2012-03-05 02:27:19 -0800'
categories:
- Debugging
- Windows 8
- Windows 8 Store
- VS2011
tags: []
---
<p>Wow, that’s a long title. Sorry, but I just wanted to be clear what you are getting into if you come here.&#160; In this article, I’m going to talk about what it takes in very simple terms to build and specifically debug a <a href="http://msdn.microsoft.com/en-us/windows/apps">windows 8</a> metro application using the beta version of Visual Studio 2011.</p>
<p>Here are the steps:</p>
<p>1.&#160; Install <a href="http://windows.microsoft.com/en-US/windows-8/download?ocid=W_MSC_W8P_DevCenter_MetroApps_EN-US">Windows 8 Metro</a> and <a href="http://www.microsoft.com/visualstudio/11/en-us">Visual Studio 2011 Beta</a></p>
<p>2.&#160; Using display settings (control panel / display) make the monitor that is not your desktop the primary monitor</p>
<p>3.&#160; Launch your desktop on the computer that is your primary monitor</p>
<p>4.&#160; Run Visual Studio 2011 Beta on your desktop</p>
<p>5.&#160; Create a <a href="http://en.wikipedia.org/wiki/Windows_8">Metro</a> style project</p>
<p>6.&#160; Run/Debug from inside Visual Studio</p>
<p>That’s it!&#160; The trick is that you want to be running visual studio from the monitor you are sitting in front of and NOT call that your main monitor.&#160; If you don’t do this, then metro comes up and covers up your Visual Studio session.</p>
<p>Hope this helps!</p>
