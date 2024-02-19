---
status: publish
published: true
pubDatetime: 2010-07-26T20:00:00.000Z
title: How To Override ToString() in a Simple C# Class
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1346
wordpress_url: https://peterkellner.net/2010/07/26/override-tostring-csharp-simple/
date: '2010-07-26 11:25:50 -0700'
date_gmt: '2010-07-26 18:25:50 -0700'
categories:
- C#
- ".NET 4.0"
tags: []
---
<p>So, you have a simple class that has a bunch public properties and you want to be able to use <a href="http://msdn.microsoft.com/en-us/library/system.object.tostring.aspx">ToString()</a> on it to show some data?&#160; It’s easy.&#160; All you have to do is override the ToString() class inside your <a href="http://msdn.microsoft.com/en-us/vcsharp/default.aspx">C#</a> code.</p>
<p>So, here is an example class that does that.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> DbProgressReport<br />{<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> ScopeNameProgress { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> SourceOrDestination { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> TableName { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> TotalRecords { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> ChangesApplied { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> ChangesFailed { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> ChangesPending { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Deletes { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Inserts { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> TotalChanges { get; set; }<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Updates { get; set; }<br />    <span style="color: #0000ff">public</span> DateTime LastChangeDate { get; set; }<br /><br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">override</span> <span style="color: #0000ff">string</span> ToString()<br />    {<br />        <span style="color: #0000ff">string</span> readableDbProgressReport =<br />            <span style="color: #0000ff">string</span>.Format(<br />                <span style="color: #006080">&quot;{0} ScopeName {1},Table {2},TotalRecords {3}&quot;</span><br />                SourceOrDestination, ScopeNameProgress, TableName);<br /><br />        <span style="color: #0000ff">return</span> readableDbProgressReport;<br />    }<br />    ...</pre>
<p></div>
<p>Now, all you have to do when accessing this class is use the ToString property.</p>
<p>That is:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">DbProgressReport dbProgressReport = <br />  <span style="color: #0000ff">new</span> DbProgressReport(<span style="color: #006080">&quot;source&quot;</span>,<span style="color: #006080">&quot;scopename&quot;</span>,<span style="color: #006080">&quot;tablename&quot;</span>);<br /><span style="color: #0000ff">string</span> str = dbProgressReport.ToString();<br /></pre>
<p></div>
<p>and the output will be:</p>
<p>source ScopeName scopename,&#160; Table tablename</p>
<p>Simple as that!</p>
<p>Hope this helps.</p>
