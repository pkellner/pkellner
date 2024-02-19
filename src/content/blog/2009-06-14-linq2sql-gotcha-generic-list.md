---
status: publish
published: true
pubDatetime: 2009-06-14T20:00:00.000Z
title: Interesting LINQ side affect, Pass in empty List&lt;int&gt; using Contains
  and Get Where 0 == 1. Hmm
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 323
wordpress_url: https://peterkellner.net/2009/06/14/linq2sql-gotcha-generic-list/
date: '2009-06-14 08:21:18 -0700'
date_gmt: '2009-06-14 15:21:18 -0700'
categories:
- C#
- LINQ
- LINQ to SQL
tags: []
---
<p>We’ve built a data access layer on top of LINQ2SQL for dynamically building the layer we call for data access.&#160; It’s convenient because we pass in a query object as a parameter that has a bunch of nullable variables in it.&#160; Here is kind of what it looks like:</p>
<div class="csharpcode">
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> CodeGenTestQuery : QueryBase</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">public</span> <span class="kwrd">int</span>? Id { get; set; }</pre>
<pre>        <span class="kwrd">public</span> List&lt;<span class="kwrd">int</span>&gt; Ids { get; set; }</pre>
<pre class="alt">        <span class="kwrd">public</span> <span class="kwrd">bool</span>? IsStarred { get; set; }</pre>
<pre>        ...</pre>
</div>
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
<p>If I pass an empty list of int’s into Ids, I have a line of code that build the query as follows:</p>
<p><!--more--></p>
<pre class="csharpcode"><span class="kwrd">if</span> (query.Ids != <span class="kwrd">null</span>) baseQuery = baseQuery.Where(a =&gt; query.Ids.Contains(a.Id));</pre>
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
<p>This works fine as long as a pass into ids either null, or a list that contains more than one object. However, if I pass in an empty list like this:</p>
<pre class="csharpcode"><span class="kwrd">new</span> CodeGenTestQuery
    {
         Ids = <span class="kwrd">new</span> List&lt;<span class="kwrd">int</span>&gt;() { }, MyAge = 2
     }</pre>
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
<p>Then, the result of the LINQ query is it creates a where clause that says something like this:</p>
<p><span class="kwrd">SELECT</span> [t0].[Id],</p>
<p>&#160;&#160;&#160;&#160;&#160;&#160; [t0].[IsStarred]</p>
<p><span class="kwrd">FROM</span> [dbo].[CodeGenTest] <span class="kwrd">AS</span> [t0]</p>
<p><span class="kwrd">WHERE</span> ([t0].[MyAge] = 2) <span class="kwrd">AND</span></p>
<p>&#160;&#160;&#160;&#160;&#160; (0 = 1)</p>
<p>Which means you will not get the MyAge == 2 record ever</p>
<p>So, I changed my c# as follows and now I get what I expect.</p>
<pre class="csharpcode"><span class="kwrd">if</span> (query.Ids != <span class="kwrd">null</span>)
            {
                <span class="kwrd">if</span> (query.Ids.Count &gt; 0)
                {
                    baseQuery = baseQuery.Where(a =&gt; query.Ids.Contains(a.Id));
                }
}</pre>
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
<p>I can see this kind of thinking on the <a href="http://msdn.microsoft.com/en-us/library/bb425822.aspx">LINQ2SQL</a> team, but it’s a little insidious if you ask me.</p>
