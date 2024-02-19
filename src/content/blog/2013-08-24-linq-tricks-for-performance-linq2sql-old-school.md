---
status: publish
published: true
pubDatetime: 2013-08-24T20:00:00.000Z
title: LINQ tricks for performance (LINQ2SQL Old School)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3712
wordpress_url: https://peterkellner.net/?p=3712
date: '2013-08-24 18:54:22 -0700'
date_gmt: '2013-08-25 01:54:22 -0700'
categories:
- C#
- Visual Studio
- LINQ to SQL
- ASP.net
- LINQ2SQL
- asp
tags: []
---
<p>I’m working quite a bit on the new Silicon Valley Code Camp site these days and introducing lots of new ways to view sessions.&#160; Much of this code I’ve written over 8 years ago, long before I had so many tricks in my bag.</p>
<p>So, one of the things we track is session interest by attendee.&#160; To do that we have two tables, SessionAttendee and Sessions. </p>
<p><a href="/wp/wp-content/uploads/2013/08/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb6.png" width="322" height="175" /></a> </p></p>
<p>Doing a simple join and count of the number of SessionAttendee records per session pretty much gives us what we need. Basically, we create a dictionary so we can get all the counts at once so that way, just one sql to the database</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">interestCountsDict = (from data <span style="color: #0000ff">in</span> meta.SessionAttendee<br />                    <span style="color: #0000ff">where</span> data.Interestlevel == 2<br />                    group data by data.Sessions_id<br />                    into g<br />                    orderby g.Key ascending<br />                    select <span style="color: #0000ff">new</span> {cnt = g.Count(), id = g.Key}).<br />                       ToDictionary(k =&gt; k.id, v =&gt; v.cnt);</pre>
<p></div>
<p>As I’m debugging this (now, not 8 years ago) I notice that the dictionary is over 1000 records (yes, we’ve had over 1000 sessions over the past 8 years of code camp.&#160; So, the obvious thing is to add a where by codeCampYearId and constrain it to this year only.&#160; Problem is, the sort above only looks in the SessionAttendee table and for that, we need to join to the Session table because that is where the year is.</p>
<p>At first, I shudder to think of making this linq more complex (yes, I think it’s kind of complex with just a group by and order by).&#160; So, I decide the easiest thing to is to take it to pieces.&#160; That is, create the linq one piece at a time.&#160; In my case, only join to the sessions table if we are looking at one year only.&#160; So, here is my final code which I claim is much more efficient, and for this year, only brings in this year sessions.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">if</span> (query.CodeCampYearIds.Count == 1)<br />{<br />    var xx = from data <span style="color: #0000ff">in</span> meta.SessionAttendee<br />        <span style="color: #0000ff">where</span> data.Interestlevel == 2<br />        select data;<br /><br />    var yy = from data <span style="color: #0000ff">in</span> xx<br />        join data1 <span style="color: #0000ff">in</span> meta.Sessions on data.Sessions_id<br />            equals data1.Id<br />        <span style="color: #0000ff">where</span> data1.CodeCampYearId == query.CodeCampYearId<br />        select data;<br /><br />    interestCountsDict = (from data <span style="color: #0000ff">in</span> yy<br />        <span style="color: #0000ff">where</span> data.Interestlevel == 2<br />        group data by data.Sessions_id<br />        into g<br />        orderby g.Key ascending<br />        select <span style="color: #0000ff">new</span> {cnt = g.Count(), id = g.Key}).<br />        ToDictionary(k =&gt; k.id, v =&gt; v.cnt);<br />}<br /><span style="color: #0000ff">else</span><br />{<br />    interestCountsDict = (from data <span style="color: #0000ff">in</span> meta.SessionAttendee<br />        <span style="color: #0000ff">where</span> data.Interestlevel == 2<br />        group data by data.Sessions_id<br />        into g<br />        orderby g.Key ascending<br />        select <span style="color: #0000ff">new</span> {cnt = g.Count(), id = g.Key}).<br />        ToDictionary(k =&gt; k.id, v =&gt; v.cnt);<br />}</pre>
<p></div>
<p>HTH’s</p>
