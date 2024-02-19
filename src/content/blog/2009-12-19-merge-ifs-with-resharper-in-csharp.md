---
status: publish
published: true
pubDatetime: 2009-12-19T20:00:00.000Z
title: Another Cool Resharper Refactoring
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 397
wordpress_url: https://peterkellner.net/2009/12/19/merge-ifs-with-resharper-in-csharp/
date: '2009-12-19 18:52:12 -0800'
date_gmt: '2009-12-20 01:52:12 -0800'
categories:
- C#
- ReSharper
tags: []
---
<p>So, if you are like me, it’s easy to make mistakes on whether to use &amp;&amp; or || when combining variables on if statements.&#160; I hate to just start nesting if statements because the code gets bulky, but if not, I have to think three times about whether I got it right.</p>
<p>So, Here comes <a href="http://www.jetbrains.com/resharper/">Resharper</a> for c# from <a href="http://www.jetbrains.com/">Jetbrains</a>.&#160; Simply write the if statement nested as follows:</p>
<p> <!--more-->
<pre class="csharpcode"><span class="kwrd">if</span> (_instance._meta == <span class="kwrd">null</span>)
{
    <span class="kwrd">if</span> (DataContextLazyLoad)
    {
        AssignAllDataContexts.Run();
    }
}</pre>
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
<p>Then, resharper will give you the following suggestion about merging if’s:</p>
<p><a href="/FilesForWebDownload/AnotherCoolResharperRefactoring_FB3D/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AnotherCoolResharperRefactoring_FB3D/image_thumb.png" width="543" height="208" /></a></p>
<p>Chose “Merge two if’s”</p>
<p>And, this is what you get:</p>
<pre class="csharpcode"><span class="kwrd">if</span> (_instance._meta == <span class="kwrd">null</span> &amp;&amp; DataContextLazyLoad)
{
    AssignAllDataContexts.Run();
}</pre>
<p>OK, granted, this one was pretty simple, but think about when it gets more complicated.&#160; Hard not to love this product.</p>
