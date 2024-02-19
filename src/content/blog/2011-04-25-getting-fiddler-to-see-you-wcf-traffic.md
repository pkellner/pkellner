---
status: publish
published: true
pubDatetime: 2011-04-25T20:00:00.000Z
title: Getting Fiddler to See you WCF Traffic
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1469
wordpress_url: https://peterkellner.net/2011/04/25/getting-fiddler-to-see-you-wcf-traffic/
date: '2011-04-25 17:48:15 -0700'
date_gmt: '2011-04-26 00:48:15 -0700'
categories:
- WCF
- Visual Studio 2010
- Fiddler
tags: []
---
<p>There are lots of articles on the internet if you search for <a href="http://msdn.microsoft.com/en-us/netframework/aa663324">WCF</a> <a href="http://fiddler2.com/fiddler2/">Fiddler</a> however it’s not clear what the simplest path to follow is. For me, it turns out that just sprinkling a couple lines of code at the bottom of my windows forms app’s app.config file is all it took.&#160; I got the tip from this post:&#160; <a title="http://www.fiddler2.com/fiddler/help/hookup.asp" href="http://www.fiddler2.com/fiddler/help/hookup.asp">http://www.fiddler2.com/fiddler/help/hookup.asp</a></p>
<p>The magic lines are as follows:</p>
<p>&lt;<b>system.net</b>&gt;    <br />&#160;&#160;&#160; &lt;defaultProxy&gt;    <br />&#160;&#160;&#160;&#160;&#160; &lt;proxy bypassonlocal=&quot;false&quot; usesystemdefault=&quot;true&quot; /&gt;    <br />&#160;&#160;&#160; &lt;/defaultProxy&gt;    <br />&#160; &lt;/<b>system.net</b>&gt;    <br />&lt;/configuration&gt;</p>
<p>That’s it!&#160; Now, Fiddler just sees the traffic.&#160; I’m a happy camper.</p>
<p><a href="/wp/wp-content/uploads/2011/04/image2.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/04/image_thumb2.png" width="721" height="357" /></a></p>
