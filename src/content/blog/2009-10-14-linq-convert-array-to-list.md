---
status: publish
published: true
pubDatetime: 2009-10-14T20:00:00.000Z
title: Using LINQ to Convert an Array Into a Generic List with C#
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 364
wordpress_url: https://peterkellner.net/2009/10/14/linq-convert-array-to-list/
date: '2009-10-14 17:35:45 -0700'
date_gmt: '2009-10-15 00:35:45 -0700'
categories:
- ASP.NET 3.5
- C#
- LINQ
tags: []
---
<p>This is just going to be a short post, but I bet it’s something I do a large number of times so I thought I’d blog it.&#160; Say you get back from something like a web service an array of objects.</p>
<p> <!--more-->
<p>In my case this:</p>
<pre class="csharpcode">cmRateResult[] cmRateResults = TransiteUtils.MakeRateRequest(_cmRateRequest);</pre>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
<p>Then, I want to convert that into</p>
<p>List&lt;cmRateResult]</p>
<p>We all know the foreach way of doing it, about 5 lines of code</p>
<pre class="csharpcode">var cmRateResultsList = <span class="kwrd">new</span> List&lt;cmRateResult&gt;(cmRateResults.Length);
 <span class="kwrd">foreach</span> (var r <span class="kwrd">in</span> cmRateResults)
 {
      cmRateResultsList.Add(r);
 }</pre>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
<p>Or, my preferred way is to use the LINQ for syntax as follows:</p>
<pre class="csharpcode">var recs = (from data <span class="kwrd">in</span> cmRateResults select data).ToList();</pre>
<p>But, it’s nicer (IMHO) to do it with LINQ chaining, though exactly the same. here it is:</p>
<pre class="csharpcode">var recs = cmRateResults.Select(data =&gt; data)).ToList()</pre>
<p>Hope this helps!</p>
<pre class="csharpcode">&#160;</pre>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
