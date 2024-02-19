---
status: publish
published: true
pubDatetime: 2013-04-14T20:00:00.000Z
title: 'Why ReSharper Is Worth Using (reason #879)'
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3589
wordpress_url: https://peterkellner.net/?p=3589
date: '2013-04-14 08:47:30 -0700'
date_gmt: '2013-04-14 15:47:30 -0700'
categories:
- C#
- ReSharper
tags: []
---
<p>&#160;</p>
<p>I often email the folks at <a href="http://www.jetbrains.com/">JetBrains</a> (the makers of <a href="http://www.jetbrains.com/resharper/">ReSharper</a>) letting them know that one of their refactors is wrong.&#160; They often email me back letting me know my about my misunderstanding.&#160; I actually enjoy this.</p>
<p>Today, was a perfect example but I did not get past the <a href="http://www.jetbrains.com/resharper/">ReSharper</a> feedback form when I realized my code was wrong (sadly missed the exchange with them).&#160; I’m busy writing the SEO save for <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp’s</a> new web site (coming by next week hopefully).&#160; In this case, I’m looking for a trackId passed into the sessions.aspx page. If I find it, then I redirect to a more friendly URL.</p>
<p>Here is my code I was going to complain to ReSharper about as incorrectly warning me that my trackId = –1; is redundant.</p>
<p><a href="/wp/wp-content/uploads/2013/04/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb6.png" width="380" height="70" /></a> </p>
<p><a href="/wp/wp-content/uploads/2013/04/SNAGHTML40a7f61.png"><img title="SNAGHTML40a7f61" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="SNAGHTML40a7f61" src="/wp/wp-content/uploads/2013/04/SNAGHTML40a7f61_thumb.png" width="381" height="95" /></a></p></p>
<p>My mistake is that trackId is always replaced (even with 0) if the QueryString does not evaluate to a valid int.</p>
<p>The corrected code is this:</p>
<p><a href="/wp/wp-content/uploads/2013/04/image7.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb7.png" width="396" height="66" /></a> </p>
<p>One less bug thanks to ReSharper.</p>
