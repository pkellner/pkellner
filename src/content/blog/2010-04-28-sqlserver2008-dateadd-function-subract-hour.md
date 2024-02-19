---
status: publish
published: true
pubDatetime: 2010-04-28T20:00:00.000Z
title: Using SqlServer 2008 and TSQL Subtract 1 Hour From All Values In a DateTime
  Column
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1284
wordpress_url: https://peterkellner.net/2010/04/28/sqlserver2008-dateadd-function-subract-hour/
date: '2010-04-28 16:36:00 -0700'
date_gmt: '2010-04-28 23:36:00 -0700'
categories:
- Sql Server 2008
- TSQL
tags: []
---
<p>In this post, we’ll go briefly the process of how you would update all rows in a SQL Server 2008 table such that a particular date column will be moved back 1 hour in time.&#160; This is actually pretty simple, but being that I typically do my work in the ORM layer (that is <a href="http://msdn.microsoft.com/en-us/library/bb425822.aspx">LINQ2SQL</a> or <a href="http://msdn.microsoft.com/en-us/library/aa697427(VS.80).aspx">Entity Framework</a>), I just don’t do much of this.&#160; The process I’m going to follow is first to use <a href="http://msdn.microsoft.com/en-us/library/ms174173.aspx">Microsoft SQL Server Management Studio</a> to make sure I know what I’m doing with the Sql Server 2008 functions, then add it to an UPDATE statement.</p>
<p> <!--more-->
<p>So, first thing I do is fire up <a href="http://msdn.microsoft.com/en-us/library/ms174173.aspx">Microsoft SQL Server Management Studio</a>, create a new query (it does not matter what database because I’m going to simply execute some <a href="http://en.wikipedia.org/wiki/Transact-SQL">TSQL</a>.</p>
<p>Basically, I’m going to write some simple TSQL to create a variable with today's date (and time) in it, then use the function <a href="http://msdn.microsoft.com/en-us/library/ms186819.aspx">DATEADD</a> and create a new date with 1 hour less.&#160; Here is the code:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">DECLARE</span> @MyDate datetime<br /><span style="color: #0000ff">DECLARE</span> @NewDate datetime<br /><br /><span style="color: #0000ff">SET</span> @MyDate = GetDate();<br /><span style="color: #0000ff">SET</span> @NewDate = DATEADD(<span style="color: #0000ff">HOUR</span>,-1,@MyDate);<br /><br /><span style="color: #0000ff">PRINT</span> @MyDate<br /><span style="color: #0000ff">PRINT</span> @NewDate</pre>
<p></div>
<p>And, after pasting it in Microsoft SQL Server Management Studio, you can see the output when pressing execute.</p>
<p><a href="/FilesForWebDownload/UsingSqlServer2008andTSQLSubtract1HourFr_EA7E/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingSqlServer2008andTSQLSubtract1HourFr_EA7E/image_thumb.png" width="401" height="328" /></a> </p>
<p>Now, we’ve proven to ourselves we no how to subtract an hour, let’s apply it to a simple SQL Statement and presto, problem solved.&#160; Here is the final simple SQL that does the job.</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">UPDATE</span> <span style="color: #0000ff">Load</span> <br /><span style="color: #0000ff">SET</span> ProcessedDate=DATEADD(<span style="color: #0000ff">HOUR</span>,-1,ProcessedDate) <br /><span style="color: #0000ff">WHERE</span> Id=954249</pre>
</div>
<div>&#160;</div>
<div>That’s it! Hope this simple little post helps someone.</div>
<div>
  </div>
