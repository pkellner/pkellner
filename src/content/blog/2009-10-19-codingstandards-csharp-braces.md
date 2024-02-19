---
status: publish
published: true
pubDatetime: 2009-10-19T20:00:00.000Z
title: To Brace or not to Brace in C# ifs and other Constructs
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 367
wordpress_url: https://peterkellner.net/2009/10/19/codingstandards-csharp-braces/
date: '2009-10-19 08:24:09 -0700'
date_gmt: '2009-10-19 15:24:09 -0700'
categories:
- Best Practices
- C#
tags: []
---
<p>In <a href="/2009/10/18/refactor-csharp-if-resharper/">my last post</a>, I found a use for inverting if statements.&#160; That is, I postulated that it is better to have an explicit else when it’s impossible for that code to be executed.&#160; The argument for just falling through the loop with no else is that why have unnecessary code. </p>
<p>My argument is intent.&#160; I personally like to make the intent of my code as clear as possible and having the extra else provides that for me.</p>
<p>Now, for the braces discussion.&#160; That is, is it OK to do this:</p>
<pre class="csharpcode"><span class="kwrd">if</span> (myObject1==<span class="kwrd">null</span>) err = <span class="str">&quot;bad1&quot;</span>;
<span class="kwrd">if</span> (myObject2==<span class="kwrd">null</span>) err = <span class="str">&quot;bad2&quot;</span>;
<span class="kwrd">if</span> (myObject3==<span class="kwrd">null</span>) err = <span class="str">&quot;bad3&quot;</span>;
<span class="kwrd">if</span> (myObject4==<span class="kwrd">null</span>) err = <span class="str">&quot;bad4&quot;</span>;
<span class="kwrd">if</span> (myObject5==<span class="kwrd">null</span>) err = <span class="str">&quot;bad5&quot;</span>;</pre>
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
<p>or should you be required by coding standards to do this:</p>
<p><!--more--></p>
<pre class="csharpcode"><span class="kwrd">if</span> (myObject1==<span class="kwrd">null</span>)
{
 err = <span class="str">&quot;bad1&quot;</span>;
}
<span class="kwrd">if</span> (myObject2==<span class="kwrd">null</span>) 
{
 err = <span class="str">&quot;bad2&quot;</span>;
}
//...</pre>
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
<p>I always follow the second, even though the code is clumsier.&#160; I’m a creature of small errors and have found that it can lead to insidious errors when I don’t&#160; That is, I may&#160; say the following and expect both to be executed and will be sadly surprised.</p>
<pre class="csharpcode"><span class="kwrd">if</span> ( myObject==<span class="kwrd">null</span>)  err1 = <span class="str">&quot;bad1&quot;</span>; errorno=3;</pre>
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
<p>Of course, in the above example, errno will always be 3 whether or not myObject is null or not.</p>
<p>I’m supported in my thinking by Juval Lowy of IDesign in his <a href="http://www.scribd.com/doc/10731655/IDesign-C-Coding-Standard-232">coding standard 2.32</a>. I’m not in 100% agreement with these coding specs (specifically around the use of m_, but overall, I like them very much.</p>
<p><a href="/FilesForWebDownload/ToBraceornottoBraceinCifsandotherConstru_70F0/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ToBraceornottoBraceinCifsandotherConstru_70F0/image_thumb.png" width="641" height="76" /></a></p>
<p>I’m also supported by one of my favorite .net guys, <a href="http://blogs.msdn.com/brada/articles/361363.aspx">Brad Abrams in his writings</a>.</p>
<p><a href="/FilesForWebDownload/ToBraceornottoBraceinCifsandotherConstru_70F0/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ToBraceornottoBraceinCifsandotherConstru_70F0/image_thumb_3.png" width="640" height="168" /></a></p>
<p>HTH’s!</p>
