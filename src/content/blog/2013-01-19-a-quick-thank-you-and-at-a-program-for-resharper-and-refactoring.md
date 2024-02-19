---
status: publish
published: true
pubDatetime: 2013-01-19T20:00:00.000Z
title: A Quick Thank you and At-A-Program For Resharper and Refactoring
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3398
wordpress_url: https://peterkellner.net/?p=3398
date: '2013-01-19 19:05:12 -0800'
date_gmt: '2013-01-20 02:05:12 -0800'
categories:
- Refactor
- ReSharper
tags: []
---
<p>I had the following line embedded in an initializer:</p>
<p>EmailAlerts = String.IsNullOrEmpty(emailAlerts) ? false : emailAlerts.ToLower().Equals(&quot;true&quot;),</p>
<p><a href="http://www.jetbrains.com/resharper/">Resharper</a> says (“Simplify conditional operator”)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/01/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/01/image_thumb1.png" width="540" height="106" /></a> </p>
<p>&#160;</p>
<p>I say sure, ReSharper does</p>
<p>EmailAlerts = !String.IsNullOrEmpty(emailAlerts) &amp;&amp; emailAlerts.ToLower().Equals(&quot;true&quot;),</p>
<p>Clean, Elegant.&#160; I’ve had some posts like this criticized in the past with comments like “Well, if you can’t do that on your own you shouldn’t be programming”.&#160; My reply: “I could have, I didn’t, It did, and I like it better.</p>
<p>&#160;</p>
<p>That’s it for now.</p>
