---
status: publish
published: true
pubDatetime: 2012-07-29T20:00:00.000Z
title: LINQ and &ldquo;Possible Multiple Enumerations of IEnumerable&rdquo; Warning
  / Resharper To the Rescue!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2115
wordpress_url: https://peterkellner.net/?p=2115
date: '2012-07-29 09:17:09 -0700'
date_gmt: '2012-07-29 16:17:09 -0700'
categories:
- Best Practices
- Refactor
- ReSharper
tags: []
---
<p>In the most recent version of <a href="http://www.jetbrains.com/resharper/download/">Resharper 7</a> from <a href="http://www.jetbrains.com/">JetBrains</a>, the brilliant team has gone one step above and beyond.&#160; Not only do they show this error which can be quite tricky to both understand and fix, but they now go one step further and offer a fix.</p>
<p>For example, look at the below code:</p>
<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: &#39;Courier New&#39;, courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; max-height: 200px; width: 97.5%; background-color: #f4f4f4">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">var emailDetailInfos = <span style="color: #0000ff">new</span> List&lt;EmailDetailInfo&gt;();<br /><span style="color: #0000ff">using</span> (var db = <span style="color: #0000ff">new</span> SiteDB())<br />{<br />  <span style="color: #0000ff">foreach</span> (var emailDetailId <span style="color: #0000ff">in</span> emailDetailIds)<br />  {<br />    <span style="color: #008000">// first get details about this particular email</span><br />    var emailDetail = db.EmailDetails.FirstOrDefault(a =&gt; a.Id == emailDetailId);<br />    <span style="color: #0000ff">if</span> (emailDetail != <span style="color: #0000ff">null</span>)<br />    {<br />        <span style="color: #008000">// get all the Details associated including the htmlbody if there is one (that is, images and body)</span><br />        var details = (from ed <span style="color: #0000ff">in</span> db.EmailDetails<br />                       join det <span style="color: #0000ff">in</span> db.Details on ed.Id equals det.EmailDetailId<br />                       <span style="color: #0000ff">where</span> emailDetailIds.Contains(ed.Id)<br />                       select det).ToList();</pre>
<p></div>
<p>&#160;</p>
<p>emailDetailIds is actually passed in as a <a href="http://en.wikipedia.org/wiki/C_Sharp_4.0">IEnumerable</a>&lt;long&gt; which means that each time I use it, it may be enumerated again. This is a fairly straight forward example as well as the fix, but let’s see what happens when you just ask Resharper to fix it.&#160; You get:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: &#39;Courier New&#39;, courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; max-height: 200px; width: 97.5%; background-color: #f4f4f4">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">var emailDetailInfos = <span style="color: #0000ff">new</span> List&lt;EmailDetailInfo&gt;();<br /><span style="color: #0000ff">using</span> (var db = <span style="color: #0000ff">new</span> SiteDB())<br />{<br />  var detailIds = emailDetailIds <span style="color: #0000ff">as</span> List&lt;<span style="color: #0000ff">long</span>&gt; ?? emailDetailIds.ToList();</pre>
<p></div>
<p>This simply does the enumeration once, stores it in a static list and we are done.</p>
<p>Very nice!</p>
