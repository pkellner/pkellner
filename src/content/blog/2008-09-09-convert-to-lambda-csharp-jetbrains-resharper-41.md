---
status: publish
published: true
pubDatetime: 2008-09-09T20:00:00.000Z
title: ToLambda Refactor From ReSharper is Just Too Cool!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 155
wordpress_url: https://peterkellner.net/2008/09/09/convert-to-lambda-csharp-jetbrains-resharper-41/
date: '2008-09-09 11:07:31 -0700'
date_gmt: '2008-09-09 16:07:31 -0700'
categories:
- ASP.NET 3.5
- C#
- Tools
tags: []
---
<p> Can hardly contain my excitement.&#160; I was just cleaning up a business object to post in my MVC article and of course was using <a href="http://www.jetbrains.com/resharper/">JetBrain's Resharper 4.1</a>.&#160; Not sure if any of you remember, but when I started learning ASP.NET I developed some nice business objects to use with <a href="/category/msdn-articles/">my MSDN articles</a>.&#160; One of the nice tricks used is using <a href="http://msdn.microsoft.com/en-us/library/0yw3tz5k(VS.80).aspx">anonymous delegates</a> to sort lists.&#160; The code was a little tricky, but id did the job.&#160; Here is the old code:</p>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">
<pre class="alt">[DataObjectMethod(DataObjectMethodType.Select, <span class="kwrd">true</span>)]</pre>
<pre>    <span class="kwrd">public</span> List&lt;BusinessObjectItem&gt; GetMembers()</pre>
<pre class="alt">    {</pre>
<pre>        listBusinessObject.Sort(</pre>
<pre class="alt">            <span class="kwrd">new</span> Comparison&lt;BusinessObjectItem&gt;(</pre>
<pre>                <span class="kwrd">delegate</span>(BusinessObjectItem lhs, BusinessObjectItem rhs)</pre>
<pre class="alt">                { <span class="kwrd">return</span> lhs.Name.CompareTo(rhs.Name); }));</pre>
<pre>        <span class="kwrd">return</span> listBusinessObject;</pre>
<pre class="alt">    }</pre>
</div>
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
<p><!--more--></p>
<p>
  <br />So, the first thing I did was to execute the ReSharper &quot;cleanup&quot; from the right mouse button as follows:</p>
<p><a href="/wp/wp-content/uploads/2008/09/image.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb.png" width="157" height="244" /></a></p>
<p>Then, when I hover over the &quot;return&quot; and press the right mouse button with the light bulb, I get this:</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_3.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_3.png" width="244" height="91" /></a></p>
<p>I say &quot;Convert to Lambda&quot; and I get this:</p>
<p>&#160;</p>
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt">listBusinessObject.Sort(</pre>
<pre>            <span class="kwrd">new</span> Comparison&lt;BusinessObjectItem&gt;(</pre>
<pre class="alt">                (lhs, rhs) =&gt; lhs.Name.CompareTo(rhs.Name)));</pre>
<pre>        <span class="kwrd">return</span> listBusinessObject;</pre>
<pre>&#160;</pre>
<pre>Way to cool!  Just had to share.</pre>
<pre>&#160;</pre>
</div>
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
