---
status: publish
published: true
pubDatetime: 2007-08-10T20:00:00.000Z
title: Always Set Stop On Exception While Doing Debugging in Visual Studio 2005 or
  2008
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This article discusses a best practices method for automatically having
  the debugger stop on unhandled exceptions in visual studio 2005 or 2008</p>"
wordpress_id: 71
wordpress_url: https://peterkellner.net/2007/08/10/stoponexceptionvs/
date: '2007-08-10 09:05:12 -0700'
date_gmt: '2007-08-10 16:05:12 -0700'
categories:
- ".Net 2.0"
- Best Practices
- Visual Studio
tags: []
---
<p>One of the tricks I've learned over time is to always set visual studio to stop on a thrown exception.&#160; Normally, during running of a .net application, unhandled exceptions are simply processed and absorbed quietly.&#160; For the most part, this is good because you do not want your users to see error messages all the time, and likely what is being thrown is not interesting anyhow.&#160; It is however bad because throwing exceptions is very time consuming for the application as well as it may actually be something important.</p>
<p>To keep this from happening, my &quot;best practice&quot; is to go into the menu choice Debug/Exceptions as follows:</p>
<p><img alt="Debug Excetpion Menu Choice" src="/wp/wp-content/uploads/2007/08/vsexceptions1.jpg" /></p>
<p> <!--more-->
<p>Then, you will get the following dialog.&#160; Make sure to check everything as show below:</p>
<p><img alt="Debug Excetpion Menu Choice" src="/wp/wp-content/uploads/2007/08/vsexceptions.jpg" /></p>
<p>Then, when you hit an exception while debugging, the debugger will stop on the offending line so you can figure out if you should be surrounding this with a try/catch, or whether it's just an oversight you need to fix.</p>
<p>Good luck with this!&#160; It's helped me a huge amount in finding bugs I would have likely found later and much more painfully.</p>
