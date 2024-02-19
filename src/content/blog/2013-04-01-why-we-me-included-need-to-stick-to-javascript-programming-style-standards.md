---
status: publish
published: true
pubDatetime: 2013-04-01T20:00:00.000Z
title: Why We (Me Included) Need to Stick To JavaScript Programming Style Standards
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3561
wordpress_url: https://peterkellner.net/?p=3561
date: '2013-04-01 13:24:16 -0700'
date_gmt: '2013-04-01 20:24:16 -0700'
categories:
- JavaScript
- Coding Standards
tags: []
---
<p>&#160;</p>
<p>I’ve listened multiple times to <a href="http://www.crockford.com/">Douglas Crockford</a> talk about the importance of following good programming style standards.&#160; I try to normally, but this morning I got a little lazy with the following code:</p>
<p>store.sync({    <br />&#160;&#160;&#160; success: function() {Ext.Msg.alert(&quot;success&quot;)},     <br />&#160;&#160;&#160; failure: function(a,b,c) {…</p>
<p>I wrote this a while back and wanted to keep it short so I did not put the alert message on it’s own line.&#160; Then, today I came along and decided to not have it execute the alert so I simply added a leading “//” giving me</p>
<p>store.sync({    <br />&#160;&#160;&#160; success: function() {//Ext.Msg.alert(&quot;success&quot;)},     <br />&#160;&#160;&#160; failure: function(a,b,c) {..</p>
<p>Well, of course it crashed my production deployment because I was again lazy and did not test.</p>
<p>Had I originally done it correctly as </p>
<p>store.sync({    <br />&#160;&#160;&#160; success: function() {     <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; Ext.Msg.alert(&quot;success&quot;)     <br />&#160;&#160;&#160; },…</p>
<p>I would have not been bitten today.</p>
<p>Just sayin…</p>
