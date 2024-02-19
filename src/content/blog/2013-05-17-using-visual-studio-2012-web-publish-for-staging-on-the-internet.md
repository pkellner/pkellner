---
status: publish
published: true
pubDatetime: 2013-05-17T20:00:00.000Z
title: Using Visual Studio 2012 Web Publish For Staging On The Internet
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3604
wordpress_url: https://peterkellner.net/?p=3604
date: '2013-05-17 19:36:08 -0700'
date_gmt: '2013-05-18 02:36:08 -0700'
categories:
- Web.Config
- ASP.net
- ASP.NET 4.5
- Visual Studio 2012
- Transforms
tags: []
---
<p>&#160;</p>
<p>Let’s say you have a production code like <a href="http://siliconvalley-codecamp.com">http://siliconvalley-codecamp.com</a> and you want to have a test site on the internet that will not be seen by anyone unless they login (or maybe even login as an admin).&#160; Using <a href="http://en.wikipedia.org/wiki/Web.config">web.config</a> (with <a href="http://www.microsoft.com/visualstudio/eng/visual-studio-update">Visual Studio 2012</a>), transformations makes that very straight forward.&#160; I know because I just did that.&#160; I created a test site (say: <a href="http://test.siliconvalley-codecamp.com">http://test.siliconvalley-codecamp.com</a>) and set up my publish to replace my normal anonymous authentication (allowing anonymous users) to one that denies anonymous users.&#160; Just as an aside, the reason I did this was I notice that google was indexing some of those pages even though my robots.txt file says to deny access to all robots.&#160; Apparently some crawlers don’t respect that signal.</p>
<p>For a little background, I did publish some basics about doing transforms here:</p>
<p><a href="/2013/03/31/vs2012-web-deploy-using-tranforms-for-connection-string-in-production/">https://peterkellner.net/2013/03/31/vs2012-web-deploy-using-tranforms-for-connection-string-in-production/</a></p>
<p>So, here is what I have in my web.config file that is part of my normal project source control.</p>
<p><a href="/wp/wp-content/uploads/2013/05/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb1.png" width="376" height="128" /></a> </p>
<p>And, here is my transform file (Web.Test.config)</p>
<p><a href="/wp/wp-content/uploads/2013/05/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb2.png" width="362" height="152" /></a> </p>
<p>And, just to show the result, this is what end up on my test server:</p>
<p><a href="/wp/wp-content/uploads/2013/05/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb3.png" width="331" height="91" /></a> </p>
<p>And Finally, just for some extra bonus stuff here at the end, here is what my tranformation looks like that simply removes the debug option when I publish to production.</p>
<p><a href="/wp/wp-content/uploads/2013/05/image4.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb4.png" width="486" height="68" /></a></p>
