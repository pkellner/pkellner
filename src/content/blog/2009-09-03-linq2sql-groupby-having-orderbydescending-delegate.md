---
status: publish
published: true
pubDatetime: 2009-09-03T20:00:00.000Z
title: Using LINQ2SQL, Use Group By To Get List of Top Occuring Values
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 350
wordpress_url: https://peterkellner.net/2009/09/03/linq2sql-groupby-having-orderbydescending-delegate/
date: '2009-09-03 16:05:45 -0700'
date_gmt: '2009-09-03 23:05:45 -0700'
categories:
- C#
- LINQ
- LINQ to SQL
tags: []
---
<p> So, I’m really enjoying using LINQ and specifically <a href="http://social.msdn.microsoft.com/Forums/en-US/linqprojectgeneral/threads">LINQ2SQL</a>.&#160; I’ve got a current problem where I want to get from a long list of loads (potentially hundreds per day), a short list of days in reverse order, that have a certain number or more of loads.</p>
<p> <!--more-->
<p>So, How to do this?&#160; Well, first, here is the answer:</p>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span>       <span class="rem">/// &lt;summary&gt;</span></pre>
<pre><span class="lnum">   2:  </span>        <span class="rem">/// Returns a list of days that have a loadCount &gt; loadCount</span></pre>
<pre class="alt"><span class="lnum">   3:  </span>        <span class="rem">/// &lt;/summary&gt;</span></pre>
<pre><span class="lnum">   4:  </span>        <span class="rem">/// &lt;param name=&quot;days&quot;&gt;&lt;/param&gt;</span></pre>
<pre class="alt"><span class="lnum">   5:  </span>        <span class="rem">/// &lt;param name=&quot;loadCount&quot;&gt;&lt;/param&gt;</span></pre>
<pre><span class="lnum">   6:  </span>        <span class="rem">/// &lt;returns&gt;&lt;/returns&gt;</span></pre>
<pre class="alt"><span class="lnum">   7:  </span>        <span class="kwrd">public</span> List&lt;DateTime&gt; GetLastDaysWithLoadsGreaterThan(<span class="kwrd">int</span> days,<span class="kwrd">int</span> loadCount)</pre>
<pre><span class="lnum">   8:  </span>        {</pre>
<pre class="alt"><span class="lnum">   9:  </span>            var dateGroups = (from load <span class="kwrd">in</span> _meta.Load</pre>
<pre><span class="lnum">  10:  </span>                              orderby load.DateCreated</pre>
<pre class="alt"><span class="lnum">  11:  </span>                              group load by load.DateCreated</pre>
<pre><span class="lnum">  12:  </span>                              into g</pre>
<pre class="alt"><span class="lnum">  13:  </span>                                  <span class="kwrd">where</span> g.Count() &gt; loadCount</pre>
<pre><span class="lnum">  14:  </span>                                  select <span class="kwrd">new</span></pre>
<pre class="alt"><span class="lnum">  15:  </span>                                             {</pre>
<pre><span class="lnum">  16:  </span>                                                 g.Key,</pre>
<pre class="alt"><span class="lnum">  17:  </span>                                                 cnt = g.Count()</pre>
<pre><span class="lnum">  18:  </span>                                             }).Take(days).OrderByDescending(f =&gt; f.Key);</pre>
<pre class="alt"><span class="lnum">  19:  </span>            </pre>
<pre><span class="lnum">  20:  </span>            var listDates = dateGroups.Select(a =&gt; a.Key).ToList();</pre>
<pre class="alt"><span class="lnum">  21:  </span>            </pre>
<pre><span class="lnum">  22:  </span>            <span class="kwrd">return</span> listDates;</pre>
<pre class="alt"><span class="lnum">  23:  </span>        }</pre>
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
<p>And now, a short explanation.</p>
<p>First, the obvious I thought would have been if I did orderby load.DateCreated descending, that I would not have had to reverse the list at the end.&#160; It did not work and I’m not sure why. Luckily, I can sort the list at the very end which is a small penalty since my lists are not that large.</p>
<p>Notice the groupby and the where clause are doing the work.&#160; The resulting anonymous method solves the problem of getting the data out.</p>
<p>Line 20 is one of my favorite tricks to avoid 4 or 5 lines of code.</p>
<p>And of course, the SQL is a lot simpler, but not type safe.</p>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span><span class="kwrd">SELECT</span> datecreated,</pre>
<pre><span class="lnum">   2:  </span>       <span class="kwrd">count</span>(*)</pre>
<pre class="alt"><span class="lnum">   3:  </span><span class="kwrd">FROM</span> dbo.[<span class="kwrd">Load</span>]</pre>
<pre><span class="lnum">   4:  </span><span class="kwrd">group</span> <span class="kwrd">by</span> datecreated</pre>
<pre class="alt"><span class="lnum">   5:  </span><span class="kwrd">having</span> <span class="kwrd">count</span>(*) &gt; 200</pre>
<pre><span class="lnum">   6:  </span><span class="kwrd">order</span> <span class="kwrd">by</span> datecreated <span class="kwrd">desc</span></pre>
<pre class="alt"><span class="lnum">   7:  </span>  </pre>
</div>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">That’s it!&#160; hope this helps.</div>
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
