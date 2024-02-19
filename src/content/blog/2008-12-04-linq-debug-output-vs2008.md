---
status: publish
published: true
pubDatetime: 2008-12-04T20:00:00.000Z
title: Logging your Sql with LINQ Update Commands. Simple Logging to your Visual Studio
  2008 Debugger Output Console
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 192
wordpress_url: https://peterkellner.net/2008/12/04/linq-debug-output-vs2008/
date: '2008-12-04 21:13:34 -0800'
date_gmt: '2008-12-05 02:13:34 -0800'
categories:
- LINQ
- Visual Studio
tags: []
---
<p> So, you want to do an update but are wondering what the hec LINQ is doing.&#160; Turns out it is really easy.&#160; All you have to do is run in the debugger and add the Log option to your data context.</p>
<p>Here is an example:</p>
<div class="csharpcode">
<pre class="alt">DataClassesGeneralDataContext db3pLogicContext;</pre>
<pre>db3pLogicContext.Log = Console.Out;</pre>
<pre class="alt">&#160;</pre>
<pre>var companyQuery = from tbl <span class="kwrd">in</span> db3pLogicContext.Companies</pre>
<pre class="alt">                   <span class="kwrd">where</span> tbl.ParentId != 0</pre>
<pre>                   select tbl;</pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">int</span> totalCntParents = companyQuery.Count();</pre>
<pre class="alt"><span class="kwrd">foreach</span> (DBAccess.Company co <span class="kwrd">in</span> companyQuery)</pre>
<pre>{</pre>
<pre class="alt">    co.CreateDate = DateTime.Now;</pre>
<pre>    <span class="kwrd">break</span>;</pre>
<pre class="alt">}</pre>
<pre>&#160;</pre>
<pre class="alt">db3pLogicContext.SubmitChanges();</pre>
</div>
<div class="csharpcode">&#160;</div>
<p><!--more--></p>
<p>Now, when you run the code, you can look on your debugger output and see something that looks like this:</p>
<div class="csharpcode"><a href="/wp/wp-content/uploads/2008/12/image.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/12/image_thumb.png" width="431" height="417" /></a> </div>
<div class="csharpcode">&#160;</div>
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
<p>Also, if you want to actually execute select type statements, take a look at the Query Visualizer posted on Scott Guthrie's web site:</p>
<p><a title="http://weblogs.asp.net/scottgu/archive/2007/07/31/linq-to-sql-debug-visualizer.aspx" href="http://weblogs.asp.net/scottgu/archive/2007/07/31/linq-to-sql-debug-visualizer.aspx">http://weblogs.asp.net/scottgu/archive/2007/07/31/linq-to-sql-debug-visualizer.aspx</a></p>
