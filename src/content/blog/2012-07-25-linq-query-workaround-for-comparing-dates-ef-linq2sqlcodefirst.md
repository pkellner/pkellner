---
status: publish
published: true
pubDatetime: 2012-07-25T20:00:00.000Z
title: LINQ Query Workaround for Comparing Dates (EF, LINQ2SQL,CodeFirst)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2112
wordpress_url: https://peterkellner.net/?p=2112
date: '2012-07-25 19:59:46 -0700'
date_gmt: '2012-07-26 02:59:46 -0700'
categories:
- LINQ
- LINQ to SQL
- CodeFirst
tags: []
---
<p>&#160;</p>
<p>I seem to always get this error all the time (kind of like I never learn).</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/07/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb5.png" width="498" height="214" /></a> </p>
<p>&#160;</p>
<p>Or, for you search engines reading:</p>
<blockquote><p><em>LINQ to Entities does not recognize the method 'System.DateTime Subtract(System.TimeSpan)' method, and this method cannot be translated into a store expression.</em></p>
</blockquote>
<p>&#160;</p>
<p>The solution is very straight forward.&#160; Just pull out the Subtract and compare the dates directly like this:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<pre id="codeSnippet" class="csharpcode">DateTime compareDateTime = DateTime.UtcNow.Subtract(<span class="kwrd">new</span> TimeSpan(0, 0, 15, 0));<br /><br /><span class="rem">// now get failures with last run more than 15 minutes ago</span><br />var usersFailedLasttime =<br />db.PushChannels.Where(a =&gt; a.RequestPushNotification.HasValue &amp;&amp; a.RequestPushNotification.Value &amp;&amp;<br />                         a.PushNotificationLastRunSuccess.HasValue &amp;&amp;<br />                         !a.PushNotificationLastRunSuccess.Value &amp;&amp;<br />                         a.PushNotificationFailedDateTime.HasValue &amp;&amp;<br />                         a.PushNotificationFailedDateTime.Value &lt; compareDateTime);</pre>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode">That’s it!  Now, since I’ve blogged this, maybe next time I’ll remember (or the Microsoft team will fix it)</pre>
<pre class="csharpcode">&#160;</pre>
<p></div>
