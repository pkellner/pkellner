---
status: publish
published: true
pubDatetime: 2011-03-20T20:00:00.000Z
title: How To Read All The Bytes From A File in C# and Put Them Into A Byte Array
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1448
wordpress_url: https://peterkellner.net/2011/03/20/how-to-read-all-the-bytes-from-a-file-in-c-and-put-them-into-a-byte-array/
date: '2011-03-20 11:32:51 -0700'
date_gmt: '2011-03-20 18:32:51 -0700'
categories:
- C#
tags: []
---
<p>I normally don’t blog about such simple things, but somehow, I’ve always done this in about 5 lines of code and I ran into at <a href="http://www.eggheadcafe.com/software/aspnet/35803970/read-binary-file-to-a-byte-array.aspx">eggheadcafe</a> in one line this morning.&#160; Simply using the <a href="http://msdn.microsoft.com/en-us/library/system.io.file.aspx">File</a> static method <a href="http://msdn.microsoft.com/en-us/library/system.io.file.readallbytes.aspx">ReadAllBytes</a> of the File class.</p>
<p>Here it is.&#160; Can’t be much simpler I don’t think.</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">byte</span>[] downloadByteArray = File.ReadAllBytes(imageLocation);</pre>
<p></div>
<p>That’s it! hope this helps someone else.</p>
