---
status: publish
published: true
pubDatetime: 2011-09-07T20:00:00.000Z
title: A Quick Tip On How To Ignore Time When Querying From SqlServer
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1566
wordpress_url: https://peterkellner.net/2011/09/07/a-quick-tip-on-how-to-ignore-time-when-querying-from-sqlserver/
date: '2011-09-07 09:15:29 -0700'
date_gmt: '2011-09-07 16:15:29 -0700'
categories:
- Sql Server 2008
- Microsoft
- Query
tags: []
---
<p>Seems like this comes up a lot so I thought I’d blog about a clean way I found to do this from a <a href="http://stackoverflow.com/questions/353014/convert-sql-server-datetime-fields-to-compare-date-parts-only-with-indexed-looku">StackOverflow article</a>.&#160; Basically, the problem is if you have a bunch of <a href="http://msdn.microsoft.com/en-us/library/bb264565(v=sql.90).aspx">Sql</a> records that have date and times in them (not 00:00:00 for time), using <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft’s</a> <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">SqlServer</a>.&#160; You may want to query all records that are on a certain date.&#160; You can certainly for a query that looks like:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">SELECT * FROM VolunteerJobs <br />   WHERE JobStartTime &gt;=<span style="color: #006080">'08-01-2008'</span> AND <br />         JobStartTime&lt;=<span style="color: #006080">'08-14-2008 23:59:59.996'</span></pre>
<p></div>
<p>However, this feels a little awkward.&#160; A better way that I plan on using is:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">SELECT *<br />FROM VolunteerJob<br />WHERE DateAdd<br />   (day, datediff(day, 0, JobStartTime), 0) =<br />       <span style="color: #006080">'2010-10-09'</span></pre>
<p></div>
<p>Somehow, it just feels better.&#160; HTH’s.</p>
