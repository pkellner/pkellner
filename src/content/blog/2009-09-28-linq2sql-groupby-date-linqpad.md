---
status: publish
published: true
pubDatetime: 2009-09-28T20:00:00.000Z
title: LINQPad Help For Creating Nasty Group by Query in Native SQL
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 361
wordpress_url: https://peterkellner.net/2009/09/28/linq2sql-groupby-date-linqpad/
date: '2009-09-28 09:51:21 -0700'
date_gmt: '2009-09-28 16:51:21 -0700'
categories:
- C#
- LINQ
- LINQ to SQL
- TSQL
tags: []
---
<p> I often speak very highly of <a href="http://msdn.microsoft.com/en-us/netframework/aa904594.aspx">LINQ</a> and also <a href="http://www.linqpad.net/">LINQPad</a>.&#160; This morning, I was struggling with some sql that would let me do a count by DateTime while stripping out the time portion.&#160; That is, I just want to know how many entries are in the table for each Date (regardless of what time).&#160; I tried lots of solutions I got from search, and they all gave not correct results, usually involving Casting and other non fun sql programming constructs.</p>
<p> <!--more-->
<p>It occurred to me I could do it in LINQ, then grab out the SQL it generated.&#160; The tool?&#160; LINQPad of course.&#160; So, here is what I typed into LINQPad:</p>
<pre class="csharpcode">(from data <span class="kwrd">in</span> Attendees
let dateNoTime = 
    <span class="kwrd">new</span> DateTime
     (data.CreationDate.Value.Year,
      data.CreationDate.Value.Month,
      data.CreationDate.Value.Day)
orderby dateNoTime
group data by dateNoTime into g
<span class="kwrd">where</span> g.Count() &gt; 0
select <span class="kwrd">new</span> 
    {
    g.Key,
    Number_Registered = g.Count() 
    }).OrderByDescending(f=&gt;f.Key)</pre>
<p>
  </p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<pre class="csharpcode">Then, After pasting that into LINQPad, choosing the SQL tab on the bottom, it gives me this:</pre>
<pre class="csharpcode"><span class="kwrd">SELECT</span> [t2].[value3] <span class="kwrd">AS</span> [<span class="kwrd">Key</span>], [t2].[value2] <span class="kwrd">AS</span> [Number_Registered]
<span class="kwrd">FROM</span> (
<span class="kwrd">SELECT</span> <span class="kwrd">COUNT</span>(*) <span class="kwrd">AS</span> [<span class="kwrd">value</span>], <span class="kwrd">COUNT</span>(*) <span class="kwrd">AS</span> [value2], [t1].[<span class="kwrd">value</span>] 
          <span class="kwrd">AS</span> [value3]
<span class="kwrd">FROM</span> (
    <span class="kwrd">SELECT</span> <span class="kwrd">CONVERT</span>
         (DATETIME, <span class="kwrd">CONVERT</span>(<span class="kwrd">NCHAR</span>(2), DATEPART(<span class="kwrd">Month</span>, [t0].[CreationDate])) 
           + (<span class="str">'/'</span> + (<span class="kwrd">CONVERT</span>(<span class="kwrd">NCHAR</span>(2), DATEPART(<span class="kwrd">Day</span>, [t0].[CreationDate])) +
              (<span class="str">'/'</span> + <span class="kwrd">CONVERT</span>(<span class="kwrd">NCHAR</span>(4), DATEPART(<span class="kwrd">Year</span>, [t0].[CreationDate]))))), 101) 
                    <span class="kwrd">AS</span> [<span class="kwrd">value</span>]
        <span class="kwrd">FROM</span> [Attendees] <span class="kwrd">AS</span> [t0]
        ) <span class="kwrd">AS</span> [t1]
    <span class="kwrd">GROUP</span> <span class="kwrd">BY</span> [t1].[<span class="kwrd">value</span>]
    ) <span class="kwrd">AS</span> [t2]
<span class="kwrd">WHERE</span> [t2].[<span class="kwrd">value</span>] &gt; @p0
<span class="kwrd">ORDER</span> <span class="kwrd">BY</span> [t2].[value3] DESC</pre>
<p>
  </p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<p>And, the nice screen shot of LINQPad</p>
<p><a href="/FilesForWebDownload/LINQPadHelpForCreatingNastyGroupbyQueryi_875D/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/LINQPadHelpForCreatingNastyGroupbyQueryi_875D/image_thumb.png" width="397" height="421" /></a></p>
<p>And, it works perfect!&#160; Even the TSql generated looks pretty nice.&#160; <a href="http://msdn.microsoft.com/en-us/library/ms177673.aspx">Group By</a>, <a href="http://msdn.microsoft.com/en-us/library/ms187928.aspx">Convert</a>, <a href="http://msdn.microsoft.com/en-us/library/ms174420.aspx">DatePart</a> and everything. Somehow, I feel like I’ve cheated, but I’m good with that in this case.</p>
<p>Hope this helps!</p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
