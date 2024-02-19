---
status: publish
published: true
pubDatetime: 2009-04-03T20:00:00.000Z
title: Not Using Session in ASP.NET means Session Affinity/Sticky Sessions Not Necessary
  in Web Farms!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 283
wordpress_url: https://peterkellner.net/2009/04/03/aspnet-session-provider-stefan-schackow-thread-affinity/
date: '2009-04-03 21:51:53 -0700'
date_gmt: '2009-04-04 04:51:53 -0700'
categories:
- ASP.NET 3.5
- C#
- How Things Work
- IIS7
- WebFarm
- Security
tags: []
---
<p>So, I’ve always incorrectly thought that somehow, the cookie stored in <a href="http://www.asp.net/">asp.net</a> was somehow tied to the Session provider in asp.net.&#160; Turns out I’m wrong.&#160; This came up because I was discussing with another engineer whether we need to bother with a Session provider since we do not use Session in our <a href="http://en.wikipedia.org/wiki/Server_farm">web application</a>.&#160; That is, we don’t ever store information by saying something like: </p>
<p>Session[“MyKey1”] = “MyShoppingCartInfo1”;</p>
<p>My assumption was that somehow, the Cookie planted on the client’s browser was in lock step with the IIS server through Session and that even if we did not store Session data, we still had to hook up a Session Provider.&#160; Wrong I am.</p>
<p> <!--more-->
<p>I emailed <a href="http://www.amazon.com/Professional-ASP-NET-Security-Membership-Management/dp/0764596985">Stefan Schackow</a>, a Microsoft employee who is an expert on all things secure around <a href="http://www.iis.net/">IIS</a> and ASP.NET and he assured me of this fact.&#160; In fact, I’m going to quote (with his permission) what he told me.</p>
<blockquote><p><em>If your app doesn’t use Session anywhere then it doesn’t matter.&#160; We don’t internally rely on session state for anything.&#160; You could literally pull the SessionStateModule out of the configured httpModules list and it would have no effect.</em></p>
<p><em>This is a point of confusion for developers because the term “session” is overloaded.&#160; For some of the EJB platforms “session” implies things like authenticated sessions.&#160; But for </em><a href="http://ASP.NET"><em>ASP.NET</em></a><em> session is just a bag of data – if your application doesn’t use it, you can completely ignore the feature.</em></p>
</blockquote>
<p>I hope this helps you if you were misguided like I was.</p>
