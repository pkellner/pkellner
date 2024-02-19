---
status: publish
published: true
pubDatetime: 2012-02-15T20:00:00.000Z
title: LINQ To SQL Performance Getting Huge Improvement in EF5, Microsoft Does Listen!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1818
wordpress_url: https://peterkellner.net/2012/02/15/linq-to-sql-performance-getting-huge-improvement-in-ef5-microsoft-does-listen/
date: '2012-02-15 08:19:41 -0800'
date_gmt: '2012-02-15 15:19:41 -0800'
categories:
- LINQ
- LINQ to SQL
- Entity Framework
- ".NET 5.0"
- Compile
tags: []
---
<h2>
<p>&#160;</p>
<p>The Original Problem</p>
</h2>
<p>Back in 2009, I discovered what I considered a fatal flaw in performance using <a href="http://msdn.microsoft.com/en-us/data/cc298428">LINQ2SQL</a> with LINQ queries.&#160; I published 2 very popular articles on this as well as discussed it with many of my peers and Microsoft.&#160; At the time, I was told in no uncertain terms by Microsoft that this was an inherent problem and for many reasons I did not agree with, they would not be addressing the issue.&#160; Well, now, more than 2 years later, Microsoft has addressed this exact issue in <a href="http://msdn.microsoft.com/en-us/data/aa937723">Entity Framework</a> Version 5 and will be providing the exact fix that is needed!</p>
<p><a href="/2009/06/08/linq2sql-uncompiled-verses-compiled-iis-performance-aspnet/">https://peterkellner.net/2009/06/08/linq2sql-uncompiled-verses-compiled-iis-performance-aspnet/</a></p>
<p><a href="/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/">https://peterkellner.net/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/</a></p>
<p>Basically, as I discussed in these articles below, without compiling queries, the amount of time it takes to <a href="http://msdn.microsoft.com/en-us/library/bb399335.aspx">compile</a> each one causes unacceptably slow performance.&#160; That is, if you look at my graph (copied here)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image4.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb4.png" width="494" height="314" /></a></p>
<p>for a simple LINQ query, you can see that compiled query can be 37x faster than a non compiled, and if you read the article further, you’ll see that not compiling queries can cause the <a href="http://msdn.microsoft.com/en-us/library/bb896297.aspx">compile</a> itself on every execution to significantly dwarf the time it takes to actually do the complete round trip including the execution to the database.</p>
<p>&#160;</p>
<h2>Microsoft Solution Coming in Entity Framework 5</h2>
<p>I just read on the EF blog that this fix is coming.&#160; The full article is here:</p>
<p><a href="http://blogs.msdn.com/b/adonet/archive/2012/02/14/sneak-preview-entity-framework-5-0-performance-improvements.aspx">http://blogs.msdn.com/b/adonet/archive/2012/02/14/sneak-preview-entity-framework-5-0-performance-improvements.aspx</a></p>
<p><a href="/wp/wp-content/uploads/2012/02/image5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb5.png" width="495" height="280" /></a></p>
<p>From these results, it seems that Microsoft will not improved LINQ2SQL, just EF but IMHO, that’s OK.&#160; I’m moving my LINQ2SQL projects that are still in service to EF as should all of us be.&#160; </p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>So, even though Microsoft kept telling me I was shouting into the wind, they totally took on behind the scenes and solved this huge problem.&#160; Thank you Microsoft!</p>
