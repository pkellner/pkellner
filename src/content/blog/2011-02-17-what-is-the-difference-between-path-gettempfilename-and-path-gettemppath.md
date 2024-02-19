---
status: publish
published: true
pubDatetime: 2011-02-17T20:00:00.000Z
title: What is the Difference Between Path.GetTempFileName and Path.GetTempPath
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1435
wordpress_url: https://peterkellner.net/2011/02/17/what-is-the-difference-between-path-gettempfilename-and-path-gettemppath/
date: '2011-02-17 17:40:31 -0800'
date_gmt: '2011-02-18 00:40:31 -0800'
categories:
- C#
- ".NET 4.0"
tags: []
---
<p>Getting filenames to use as scratch files is usually very straight forward.&#160; Well, today, I found out “not so much”.&#160; I decided today was a good day to tackle the problem of why is my file synchronization product we are about to release still littering my tmp directory with files when it finishes.&#160; Turns out, it’s the subtle difference between the above two Path member functions GetTempFileName and GetTempPath.</p>
<p>The big difference is that GetTempFileName actually creates a file where as GetTempPath simply tells you where the file is going to be.</p>
<p>Here are some words out of MSDN for <a href="http://msdn.microsoft.com/en-us/library/system.io.path.gettempfilename(v=VS.100).aspx">Path.GetTempFileName</a></p>
<blockquote><p>This method creates a temporary file with a .TMP file extension.</p>
</blockquote>
<p>And For <a href="http://msdn.microsoft.com/en-us/library/system.io.path.gettemppath.aspx">Path.GetTempPath</a></p>
<blockquote><p>The path to the temporary folder, ending with a backslash.</p>
</blockquote>
<p>Subtle, but clear when you read the doc.&#160; If you read the community content, there is a humorous discussion with someone saying “you might as well use the other one, it does the same thing”.&#160; All I can say to that is read the docs!&#160; I got stung today, but never again.</p>
<p>I’m now creating my filename with a string as follows which kind of does the same thing, but not really.&#160; </p>
<p>&#160;</p>
<p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">string</span> GetTempFileWithGuid(<span style="color: #0000ff">string</span> filePrefix)<br />{<br />    <span style="color: #0000ff">string</span> retFileName = <span style="color: #0000ff">string</span>.Format(<span style="color: #006080">&quot;{0}{1}{2}.crsync&quot;</span>, <br />        Path.GetTempPath(), filePrefix, Guid.NewGuid());<br />    <span style="color: #0000ff">return</span> retFileName;<br />}</pre>
</p></div></p>
<p>HTH’s.</p>
