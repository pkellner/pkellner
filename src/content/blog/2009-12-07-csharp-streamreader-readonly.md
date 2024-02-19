---
status: publish
published: true
pubDatetime: 2009-12-07T20:00:00.000Z
title: How To User StreamReader to Open A File ReadOnly in C# (.NET)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 393
wordpress_url: https://peterkellner.net/2009/12/07/csharp-streamreader-readonly/
date: '2009-12-07 18:14:35 -0800'
date_gmt: '2009-12-07 01:14:35 -0800'
categories:
- ASP.NET 3.5
tags: []
---
<p>&#160;</p>
<p>This is probably something pretty simple, hardly worth blogging about, but it took me a little while (15 minutes)&#160; to figure out how to open a file <a href="http://msdn.microsoft.com/en-us/library/acdd6hb7.aspx">ReadOnly</a> with StreamReader,&#160; so hopefully, next person looking will hit my blog post right away and save themselves 14 minutes.&#160; <a href="http://msdn.microsoft.com/en-us/library/system.io.streamreader.aspx">StreamReader</a> can be very useful in <a href="http://msdn.microsoft.com/en-us/vcsharp/aa336809.aspx">C#.</a></p>
<p>Say you have a block of code like the following for simply reading all lines of a file:</p>
<p> <!--more-->
<pre class="csharpcode">StreamReader streamReader = <span class="kwrd">new</span> StreamReader(<span class="str">&quot;myfile.txt&quot;</span>)
<span class="kwrd">string</span> line;
  <span class="kwrd">while</span> ((line = streamReader.ReadLine()) != <span class="kwrd">null</span>)
  {  
       <span class="rem">// do something      </span>
   }</pre>
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
<p>When you run this, you will quickly find out that the file gets opened read/write.</p>
<p>To open the file ReadOnly, you have to add a little bit of extra information to the StreamReader constructor call.</p>
<p>That is:</p>
<pre class="csharpcode">StreamReader streamReader = <span class="kwrd">new</span> StreamReader(File.OpenRead(file));</pre>
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
<p>Hope this helps!</p>
