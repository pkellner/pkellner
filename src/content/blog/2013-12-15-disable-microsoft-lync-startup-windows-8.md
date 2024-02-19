---
status: publish
published: true
pubDatetime: 2013-12-15T20:00:00.000Z
title: How To Disable Microsoft Lync At Startup In Windows 8
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3873
wordpress_url: https://peterkellner.net/?p=3873
date: '2013-12-15 10:01:22 -0800'
date_gmt: '2013-12-15 17:01:22 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p><span style="background-color: #ffff00;">Update From <a href="https://twitter.com/jongalloway"><span style="background-color: #ffff00;">@JonGalloway</span></a> "Lync Options / Personal / Uncheck" removes Lync from the startup list.  Thanks  Jon!"</span></p>
<p><a href="https://twitter.com/jongalloway"><img class="alignnone size-medium wp-image-3879" alt="jgall" src="/wp/wp-content/uploads/2013/12/jgall-300x61.jpg" width="300" height="61" /></a></p>
<hr />
<p>On Thursday this week I had a Lync meeting I was invited to so naturally, I had to install Lync.  When I rebooted my computer later I discovered that <a href="http://office.microsoft.com/en-us/lync/">Lync </a>was starting on it's on.  I'm not sure who at Microsoft made the decision to set Lync to auto start once it has been installed, but I'm quite disappointed.  Then, when I tried to figure out how to make it not start, I discovered that in the tools menu there is no such option I could find.  Again, even more disappointed.</p>
<p>I hunted around the internet for a solution and I found lots of discussions around this (surprisingly, not much criticism). Most the discussion was suggesting things having to do with powershell and regedit.  Again, not excited about doing either on my production development computer.</p>
<h2>My Solution</h2>
<p><a href="/wp/wp-content/uploads/2013/12/disable_lync_on_start.jpg"><img class="size-medium wp-image-3874 alignright" style="border: 1px solid black; margin: 3px;" title="Disable Lync At Startup Through Task Manager" alt="disable_lync_on_start" src="/wp/wp-content/uploads/2013/12/disable_lync_on_start-300x154.jpg" width="300" height="154" /></a><br />
I decided to see if my old friend msconfig.exe (run from command prompt) would help me.  I ran that and when I went to the "startup programs" tab, it sent me to task manager.  I did find Lync there (you can see the screen shot below).  There it lists as Lync's startup impact as high.  Duh!  Maybe the task manager team should talk to the Lync team.</p>
<p>Anyhow, I've disabled Lync but have not rebooted yet. I hope it works.</p>
<p>&nbsp;</p>
