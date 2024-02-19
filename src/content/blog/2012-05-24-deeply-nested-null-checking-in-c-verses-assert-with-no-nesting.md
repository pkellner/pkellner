---
status: publish
published: true
pubDatetime: 2012-05-24T20:00:00.000Z
title: Deeply Nested Null Checking in C# verses Assert with no nesting
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2011
wordpress_url: https://peterkellner.net/?p=2011
date: '2012-05-24 17:07:30 -0700'
date_gmt: '2012-05-25 00:07:30 -0700'
categories:
- C#
- ReSharper
- ".NET 4.0"
tags: []
---
<p>One of the code smells that particularly bothers me (though I often find myself doing it anyhow) is when I defensively program against nulls in <a href="http://msdn.microsoft.com/en-us/vstudio/hh388566.aspx">C#</a> (though could be any other language).&#160; That is, I do something like the following</p>
<pre class="csharpcode">var rec = getRecord(..);
<span class="kwrd">if</span> (rec != <span class="kwrd">null</span>)
{
   var rec1 = getAnotherRecord(..);
   <span class="kwrd">if</span> (rec1 != <span class="kwrd">null</span>) 
   {
       rec2 = getAThridRecord(..);
       <span class="kwrd">if</span> (rec2 != <span class="kwrd">null</span>)...</pre>
<p>
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
<p>The code gets ugly quick and the nesting does not help the readability, and if anything, hurts it.</p>
<p>Today, while using a daily build of Resharper7, I noticed that when I asked <a href="http://www.jetbrains.com/resharper/">resharper</a> to do the null check for me, instead of doing the above, it did the following:</p>
<pre class="csharpcode">var rec = getRecord(..);
Debug.Assert(rec != <span class="kwrd">null</span>,<span class="str">&quot;rec != null&quot;</span>);

var rec1 = getAnotherRecord(..);
Debug.Assert(rec1 != <span class="kwrd">null</span>,<span class="str">&quot;rec1 != null&quot;</span>);

var rec2 = getAThirdrRecord(..);
Debug.Assert(rec2 != <span class="kwrd">null</span>,<span class="str">&quot;rec2 != null&quot;</span>);</pre>
<p>
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>I think I like this better.&#160; Still to early to decide such a big shift in my coding style.</p>
<p>What do you think?</p>
