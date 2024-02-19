---
status: publish
published: true
pubDatetime: 2009-06-03T20:00:00.000Z
title: How Fast are In Memory LINQ Evaluations for Doing Simple Things?
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 316
wordpress_url: https://peterkellner.net/2009/06/03/linq-in-memory-performance/
date: '2009-06-03 18:27:19 -0700'
date_gmt: '2009-06-04 01:27:19 -0700'
categories:
- C#
- LINQ
- Performance
- LINQ to SQL
tags: []
---
<p>So, I recently blogged about the huge penalty for <a href="/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/">not compiling your LINQ2SQL</a>.&#160; This problem is so big that it occurred to us that maybe all of LINQ has the problem.&#160; So, time for a simple test.&#160; Below is a very simple program that basically generates a list of Ids.&#160; In one case, it’s using LINQ, and the other just Plain C#.&#160; The code is pretty self explanatory.&#160; Here are the results:</p>
<table border="0" cellspacing="0" cellpadding="2" width="400">
<tbody>
<tr>
<td valign="top" width="200">Test Performed</td>
<td valign="top" width="200">Time to Do 100000 iterations</td>
</tr>
<tr>
<td valign="top" width="200">Using LINQ</td>
<td valign="top" width="200">52ms</td>
</tr>
<tr>
<td valign="top" width="200">Using Simple C#</td>
<td valign="top" width="200">35ms</td>
</tr>
</tbody>
</table>
<p>Well, my fears are put aside.&#160; Though LINQ is somewhat slower, for 100,000 iterations, .052 seconds is pretty good.&#160; (compared with processing a single not to complicated LINQ2SQL statement for 100,000 iterations would take about 20,000 seconds or 333 hours.&#160; Quite a difference to .052 seconds!</p>
<p> <!--more-->
<p>Here is the code I ran for my test.&#160; Hope this help!</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System;</pre>
<pre><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Diagnostics;</pre>
<pre><span class="kwrd">using</span> System.Linq;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Text;</pre>
<pre>&nbsp;</pre>
<pre class="alt"><span class="kwrd">namespace</span> LINQTimingInMemory</pre>
<pre>{</pre>
<pre class="alt">     <span class="kwrd">class</span> Program</pre>
<pre>     {</pre>
<pre class="alt">         <span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)</pre>
<pre>         {</pre>
<pre class="alt">             <span class="kwrd">for</span> (<span class="kwrd">int</span> i=0;i&lt;2;i++)</pre>
<pre>             {</pre>
<pre class="alt">                 List&lt;<span class="kwrd">int</span>&gt; myList = <span class="kwrd">new</span> List&lt;<span class="kwrd">int</span>&gt;() {1,2,3,4,5,6,7,8,9,6,5,5,5,5,5,5};</pre>
<pre>                 Stopwatch stopWatch = <span class="kwrd">new</span> Stopwatch();</pre>
<pre class="alt">                 stopWatch.Start();</pre>
<pre>                 <span class="kwrd">int</span> iterations = 100000;</pre>
<pre class="alt">                 <span class="kwrd">for</span> (<span class="kwrd">int</span> t = 0; t &lt; iterations; t++)</pre>
<pre>                 {</pre>
<pre class="alt">                     <span class="kwrd">if</span> (i == 0)</pre>
<pre>                     {</pre>
<pre class="alt">                         var ids = myList.Where(a =&gt; a &gt; 5).ToList();</pre>
<pre>                     }</pre>
<pre class="alt">                     <span class="kwrd">else</span></pre>
<pre>                     {</pre>
<pre class="alt">                         var ids = <span class="kwrd">new</span> List&lt;<span class="kwrd">int</span>&gt;();</pre>
<pre>                         <span class="kwrd">foreach</span> (var v <span class="kwrd">in</span> myList)</pre>
<pre class="alt">                         {</pre>
<pre>                             <span class="kwrd">if</span> (v &gt; 5)</pre>
<pre class="alt">                             {</pre>
<pre>                                 ids.Add(v);</pre>
<pre class="alt">                             }</pre>
<pre>                         }</pre>
<pre class="alt">                     }</pre>
<pre>                 }</pre>
<pre class="alt">                 stopWatch.Stop();</pre>
<pre>                 <span class="kwrd">int</span> ti = Convert.ToInt32(stopWatch.ElapsedMilliseconds);</pre>
<pre class="alt">                 Console.WriteLine(<span class="str">"time for "</span> + i.ToString() + <span class="str">" "</span> + ti/iterations + <span class="str">" "</span> + ti);</pre>
<pre>                 stopWatch.Reset();</pre>
<pre class="alt">             }</pre>
<pre>         }</pre>
<pre class="alt">     }</pre>
<pre> }</pre>
</div>
