---
status: publish
published: true
pubDatetime: 2009-10-18T20:00:00.000Z
title: Using ReSharper, I&rsquo;ve Always Wondered Why They Had the &ldquo;Invert
  if&rdquo; refactor
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 366
wordpress_url: https://peterkellner.net/2009/10/18/refactor-csharp-if-resharper/
date: '2009-10-18 08:33:06 -0700'
date_gmt: '2009-10-18 15:33:06 -0700'
categories:
- C#
- Refactor
- ReSharper
tags: []
---
<p> Well, now I know.&#160; Here is an example of some code I just wrote:</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">if</span> (doDeficitCalc)</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">throw</span> </pre>
<pre>        <span class="kwrd">new</span> ApplicationException(<span class="str">&quot;Need to implement deficit weight rating&quot;</span>);</pre>
<pre class="alt">}</pre>
<pre><span class="kwrd">else</span></pre>
<pre class="alt">{</pre>
<pre>    <span class="rem">// Linear interpolation from top of range to bottom for speed</span></pre>
<pre class="alt">    <span class="kwrd">double</span> x1 = rateBreakList[0];</pre>
<pre>    <span class="kwrd">double</span> x2 = rateBreakList[rateBreakList.Count - 1];</pre>
<pre class="alt">&#160;</pre>
<pre>    <span class="kwrd">double</span> y1 = rateList[0];</pre>
<pre class="alt">    <span class="kwrd">double</span> y2 = rateList[rateList.Count - 1];</pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
<pre>    <span class="kwrd">double</span> frac = weight/(x2 - x1);</pre>
<pre class="alt">    <span class="kwrd">double</span> yResult = y1 + (frac*(y2 - y1));</pre>
<pre>    retWeight = yResult;</pre>
<pre class="alt">}</pre>
</div>
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
<p><a href="http://www.jetbrains.com/resharper/">ReSharper</a> correctly warns me that the else statement is redundant as shown below:</p>
<p><!--more--></p>
<p><a href="/FilesForWebDownload/UsingResharperIveAlwaysWonderedWhyTheyHa_765C/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingResharperIveAlwaysWonderedWhyTheyHa_765C/image_thumb.png" width="377" height="195" /></a></p>
<p>So, if I hover over the “if” statement, I get the chance to invert the if clause</p>
<p><a href="/FilesForWebDownload/UsingResharperIveAlwaysWonderedWhyTheyHa_765C/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingResharperIveAlwaysWonderedWhyTheyHa_765C/image_thumb_3.png" width="548" height="156" /></a></p>
<p>When I accept the invert if, I now get:</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">if</span> (!doDeficitCalc)</pre>
<pre>{</pre>
<pre class="alt">    <span class="rem">// Linear interpolation from top of range to bottom for speed</span></pre>
<pre>    <span class="kwrd">double</span> x1 = rateBreakList[0];</pre>
<pre class="alt">    <span class="kwrd">double</span> x2 = rateBreakList[rateBreakList.Count - 1];</pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="kwrd">double</span> y1 = rateList[0];</pre>
<pre>    <span class="kwrd">double</span> y2 = rateList[rateList.Count - 1];</pre>
<pre class="alt">&#160;</pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="kwrd">double</span> frac = weight/(x2 - x1);</pre>
<pre>    <span class="kwrd">double</span> yResult = y1 + (frac*(y2 - y1));</pre>
<pre class="alt">    retWeight = yResult;</pre>
<pre>}</pre>
<pre class="alt"><span class="kwrd">else</span></pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">throw</span></pre>
<pre>        <span class="kwrd">new</span> ApplicationException(<span class="str">&quot;Need to implement deficit weight rating&quot;</span>);</pre>
<pre class="alt">}</pre>
</div>
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
<p>Which has no warning!!!&#160; Just what I wanted with less key strokes.</p>
<p>Thank you again <a href="http://www.jetbrains.com/resharper/">ReSharper</a>!</p>
