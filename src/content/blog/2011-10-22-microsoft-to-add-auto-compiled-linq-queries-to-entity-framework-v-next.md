---
status: publish
published: true
pubDatetime: 2011-10-22T20:00:00.000Z
title: Microsoft To Add Auto-Compiled LINQ Queries to Entity Framework V.Next!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1610
wordpress_url: https://peterkellner.net/2011/10/22/microsoft-to-add-auto-compiled-linq-queries-to-entity-framework-v-next/
date: '2011-10-22 18:57:03 -0700'
date_gmt: '2011-10-23 01:57:03 -0700'
categories:
- LINQ
- Performance
- LINQ to SQL
- ".NET 4.0"
- Entity Framework
- ".NET 4.5"
tags: []
---
<p>&#160;</p>
<p>In May of 2009 I discovered some significant performance problems that I <a href="/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/">blogged</a> about.&#160; In summary, I had tracked it down to the issue of LINQ2SQ having to create a full expression tree on every instantiation of a LINQ2SQL query.&#160; I’m not a compiler write kind of guy but do respect the complexity of that and doing things like building expression trees, but still this really sucked.&#160; Using the compile syntax in LINQ2SQL is very awkward, and IMHO takes all the fun out of using LINQ2SQL.&#160; If you don’t remember my post, here is the graph showing the evil happening.</p>
<p>&#160;</p>
<p><a href="/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/10/image6.png" width="285" height="173" /></a></p>
<p>So, what is a Microsoft MVP to do?&#160; I complained to everyone at Microsoft I knew.&#160; I made this my mission for about a year.&#160; I was told time after time that the problem was hugely complicated and no one was working on making it any faster.&#160; I just could not believe it because I felt this was such a barrier to success to <a href="http://msdn.microsoft.com/en-us/library/bb425822.aspx">LINQ2SQL</a> type technology (now <a href="http://msdn.microsoft.com/en-us/library/bb399572.aspx">Entity Framework</a> really) that Microsoft just could not ignore my findings.&#160; I was actually surprised that I was the only one screaming about this.</p>
<p>Well, quietly, <a href="http://blogs.msdn.com/b/adonet/archive/2011/10/18/how-we-talk-about-ef-and-its-future-versions.aspx">Microsoft has announced that in .Net Framework 4.5, Entity Framework will include “Auto-Compiled LINQ Queries”</a>.&#160; This is awesome!&#160;&#160; When it comes out, I’ll be testing and it giving feedback.</p>
<p>For now, I’m a very happy camper.</p>
<p>&#160;</p>
<p><a href="http://blogs.msdn.com/b/adonet/archive/2011/10/18/how-we-talk-about-ef-and-its-future-versions.aspx"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/10/image7.png" width="882" height="474" /></a></p>
