---
status: publish
published: true
pubDatetime: 2010-02-24T20:00:00.000Z
title: Small LINQ Trick for Converting List&lt;String&gt; to String Text List
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 525
wordpress_url: https://peterkellner.net/2010/02/24/linq-trick-foreach-stringbuilder/
date: '2010-02-24 14:58:28 -0800'
date_gmt: '2010-02-24 21:58:28 -0800'
categories:
- C#
- LINQ
tags: []
---
<p>Here is a shorthand way for converting a list of strings defined as follows:</p>
<pre class="csharpcode"> List&lt;<span class="kwrd">string</span>&gt; strings = <span class="kwrd">new</span> List&lt;<span class="kwrd">string</span>&gt;
 
	{
		<span class="str">&quot;a&quot;</span>,<span class="str">&quot;b&quot;</span>,<span class="str">&quot;c&quot;</span>

	};</pre>
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
<p>To something that looks like:</p>
<p><!--more--></p>
<p>“a:b:c:”</p>
<p>Here is the trick using the foreach syntax:</p>
<pre class="csharpcode"> var stringBuilder = <span class="kwrd">new</span> StringBuilder();
 strings.ForEach(a=&gt;stringBuilder.AppendFormat(<span class="str">&quot;{0}:&quot;</span>,a));</pre>
<p>&#160; </p>
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
