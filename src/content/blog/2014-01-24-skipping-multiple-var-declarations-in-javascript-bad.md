---
status: publish
published: true
pubDatetime: 2014-01-24T20:00:00.000Z
title: Skipping Multiple var declarations in JavaScript, Bad?
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3897
wordpress_url: https://peterkellner.net/?p=3897
date: '2014-01-24 09:54:07 -0800'
date_gmt: '2014-01-24 16:54:07 -0800'
categories:
- JavaScript
tags: []
---
<p>I’m not sure what bugs me about writing code like the following in JavaScript</p>
<pre class="csharpcode"><span class="kwrd">var</span> form = button.up(<span class="str">'form'</span>).getForm(),
    formWindow = button.up(<span class="str">'window'</span>);</pre>
<pre class="csharpcode">I certainly see it all the time.  Maybe I just need to get use to it.  I always right my code like the following:</pre>
<pre class="csharpcode"><span class="kwrd">var</span> form = button.up(<span class="str">'form'</span>).getForm();
<span class="kwrd">var</span> formWindow = button.up(<span class="str">'window'</span>);</pre>
<pre class="csharpcode">I understand wanting to save download bandwidth, but to me it just seems confusing to read.  Am I the only one?</pre>
<p>
  </p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
