---
status: publish
published: true
pubDatetime: 2012-07-06T20:00:00.000Z
title: varchar(max) means 2GB in SqlServer, not 8092, EF CodeFirst Gets it right
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2084
wordpress_url: https://peterkellner.net/?p=2084
date: '2012-07-06 10:04:48 -0700'
date_gmt: '2012-07-06 17:04:48 -0700'
categories:
- ASP.NET 2.0
tags: []
---
<p>I wasted about 30 minutes wrestling with a <a href="http://msdn.microsoft.com/en-us/data/ef.aspx">EF CodeFirst</a> type issue today.&#160; I was creating an attribute for what I wanted to be a large text field and not have it limited to 8092 bytes which what I incorrectly thought required it to be something like varbinary, text or image types.&#160; My CodeFirst code looks like this:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: &#39;Courier New&#39;, courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; max-height: 200px; width: 97.5%; background-color: #f4f4f4">
<div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">
<pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: white"><span id="lnum1" style="color: #606060">   1:</span> [Column(TypeName = <span style="color: #006080">&quot;Text&quot;</span>)]   </pre>
<p><!--CRLF--></p>
<pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> MimeMessageFull { get; set; }</pre>
<p><!--CRLF--></div>
</div>
<p>&#160;</p>
<p>What got created in my <a href="http://msdn.microsoft.com/en-us/library/ms187752.aspx">SqlServer</a> database is the following:</p>
<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: &#39;Courier New&#39;, courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; max-height: 200px; width: 97.5%; background-color: #f4f4f4">
<div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">
<pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: white"><span id="lnum1" style="color: #606060">   1:</span> [MimeMessageFull] <span style="color: #0000ff">varchar</span>(<span style="color: #0000ff">max</span>) <span style="color: #0000ff">COLLATE</span> SQL_Latin1_General_CP1_CI_AS <span style="color: #0000ff">NULL</span>,</pre>
<p><!--CRLF--></div>
</div>
<p>I kept changing things trying to make it text, image or varbinary with no success.&#160; Finally, I ran into this url:&#160; </p>
<p><a href="http://msdn.microsoft.com/en-us/library/ms187993.aspx">http://msdn.microsoft.com/en-us/library/ms187993.aspx</a></p>
<p>which says clearly varchar(max) is the new image type.</p>
<p><a href="/wp/wp-content/uploads/2012/07/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb.png" width="383" height="345" /></a> </p>
<p>So, there you have it.&#160; ntext,text and image are out!</p>
<p>HTH’s.</p>
