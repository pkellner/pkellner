---
status: publish
published: true
pubDatetime: 2009-05-06T20:00:00.000Z
title: LINQ To SQL Very Slow Performance Without Compile (CompileQuery)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
description: |-
  <br/>
  In this article, it is shown how important it can be to use the CompileQuery class when using LINQ to SQL.  Doing a simple query in LINQ to SQL verses ADO.NET is shown to run 37 times slower without taking advantage of the Compile feature in LINQ to SQL.  If you are doing the same query over and over in LINQ to SQL, this is a no brainer.  I'm surprised I did not know this myself previously.

  <br/><br/>
  <img src='https://peterkellner.net/FilesForWebDownload/LINQToSQLVerySlowPerformanceWithoutCompi_88A7/image.png' alt='Performance of LINQ to SQL compiled verses not and ADO.NET' />
wordpress_id: 302
wordpress_url: https://peterkellner.net/2009/05/06/linq-to-sql-slow-performance-compilequery-critical/
date: '2009-05-06 10:23:25 -0700'
date_gmt: '2009-05-06 17:23:25 -0700'
categories:
- ASP.NET 3.5
- Best Practices
- C#
- LINQ
- LINQ to SQL
tags: []
---
<h2>Background</h2>
<p>At my company, we have been running a workflow process that is taking 6 hours to complete.&#160; This is a new project so we’ve had the good fortune to be able to use the latest Microsoft technologies.&#160; We are a Microsoft shop, so that means <a href="http://www.microsoft.com/sqlserver/2008/en/us/default.aspx">Sql Server 2008</a>, <a href="http://msdn.microsoft.com/en-us/vcsharp/default.aspx">C#,</a> <a href="http://www.asp.net/">ASP.NET</a>, <a href="http://extjs.com/">ExtJS</a>, LINQ to SQL (hoping to move to Entity Framework someday) and others.&#160; After spending all day running performance analysis tools and basically performing a full audit of the 6 hour process, we sadly concluded that our time was being eaten up by <a href="http://weblogs.asp.net/scottgu/archive/2007/05/19/using-linq-to-sql-part-1.aspx">LINQ to SQL</a> processing.&#160; My experience has always been that anything you do on the compiled code side is usually overwhelmed by database access times, usually at least ten to one.&#160; Well, I learned a lot yesterday.</p>
<p> <!--more--><br />
<h2>The Problem</h2>
<p>Since I already know the answer, I put together a very trivial problem to solve.&#160; What I want to do is execute one simple SQL statement over and over.&#160;&#160; I’m going to query just one table that actually has no records in it just to make sure the database really has nothing to do.&#160; I’m going to make this connection on my blazingly fast <a href="http://shop.lenovo.com/us/notebooks/thinkpad/w-series">Lenovo W500</a> with a SATA <a href="http://en.wikipedia.org/wiki/Solid-state_drive">SSD</a> running Sql Server 2008&#160; locally.&#160; I’m going to run that simple query first calling just ADO.NET (bare bones using best practices), Then using LINQ to SQL in the way I’ve always used it (and I would say 99% of the other developers out there), then I’m going to compile that LINQ to SQL and run it again.&#160; Actually, I’m going to iterate 2000 times for each of the three conditions.</p>
<p>So, here is the simple SQL I’m executing:</p>
<pre class="csharpcode"><span class="kwrd">SELECT</span> 
  Id,
  FileName,
  FileSize,
  UploadDate,
  DownloadDate,
  ProcessDate
<span class="kwrd">FROM</span>
  LinqTest
<span class="kwrd">WHERE</span> 
  dbo.LinqTest.FileName = <span class="str">'MyVal'</span></pre>
<h2>The Shocking Results</h2>
<p><a href="/wp/wp-content/uploads/2009/05/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/05/image_thumb.png" width="522" height="317" /></a></p>
<p>Or, for those graphically challenged (like search engines), Here is the actual data.</p>
<table border="0" cellspacing="0" cellpadding="0" width="332">
<tbody>
<tr>
<td width="177">Test Description</td>
<td width="153">Seconds Execution for 2000 Iterations</td>
</tr>
<tr>
<td width="177">ADO.NET</td>
<td width="153">0.48</td>
</tr>
<tr>
<td width="177">Linq2Sql Not Compiled</td>
<td width="153">18.14</td>
</tr>
<tr>
<td width="177">Linq2Sql Compiled</td>
<td width="153">0.87</td>
</tr>
</tbody>
</table>
<p>In English, this says that</p>
<ul>
<li>LINQ to SQL is&#160; <strong>37 times slower</strong> than running a raw ADO.NET Sql query </li>
<li>LINQ to SQL compiled <strong>1.8 times slower</strong> than running a raw ADO.NET Sql query </li>
</ul>
<p>I’ve read in several places that compiling your LINQ will help, but I have never heard anyone say how <u>drastic</u> the speed improvement can be.&#160; For example, in one of my favorite books (<a href="http://www.amazon.com/exec/obidos/ASIN/1933988169/petkelsblo-20">LINQ in Action</a>) by Fabrice Marguerie and others, he quotes on page 296&#160; a blog post by Rico Mariani titled <a href="http://blogs.msdn.com/ricom/archive/2007/06/22/dlinq-linq-to-sql-performance-part-1.aspx">DLINQ (Linq to SQL Performance (Part 1)</a> as saying using a compiled query offers nearly twice the performanced of a non-compiled query, and goes on to say that it brings the performance to within 93% of using a raw data reader.&#160;&#160; Well, suffice it to say I never ran the test myself.&#160; I could have lived with twice, but not 37 times.</p>
<p>Here is the Project File Source: </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:5092a85c-00d3-4251-820d-af7837a27d56" class="wlWriterSmartContent">
<p><a href="/wp/wp-content/uploads/2009/05/LINQ2SQL_CompiledQuery.zip">Project Source (Visual Studio 2008 Solution)</a></p>
</div>
<h2>How to Compile you SQL (seems like a duh kind of thing)</h2>
<p>It’s actually not very hard.&#160; I’m attaching the Visual Studio 2008 project that I ran this test with to this post so you can run it for yourself as well as see an example of how to write the compiled LINQ code.&#160; Below is the method that actually does the work.&#160; I won’t include in this article the actual ADO.NET and LINQ to SQL not compiled code, but you can see those for yourself in the attached solution.</p>
<div class="csharpcode">
<pre>&#160;</pre>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span><span class="rem">/// &lt;summary&gt;</span></pre>
<pre><span class="lnum">   2:  </span><span class="rem">/// This method compiles the LINQ to SQL query and </span></pre>
<pre class="alt"><span class="lnum">   3:  </span><span class="rem">/// then executes it the number of iterations passed</span></pre>
<pre><span class="lnum">   4:  </span><span class="rem">/// in.  </span></pre>
<pre class="alt"><span class="lnum">   5:  </span><span class="rem">/// &lt;/summary&gt;</span></pre>
<pre><span class="lnum">   6:  </span><span class="rem">/// &lt;param name=&quot;iterations&quot;&gt;Number of iterations&lt;/param&gt;</span></pre>
<pre class="alt"><span class="lnum">   7:  </span><span class="rem">/// &lt;returns&gt;time in seconds of execution&lt;/returns&gt;</span></pre>
<pre><span class="lnum">   8:  </span><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">double</span> </pre>
<pre class="alt"><span class="lnum">   9:  </span>    TestDataAccessSpeedLinq2SqlCompiled(<span class="kwrd">int</span> iterations)</pre>
<pre><span class="lnum">  10:  </span>{</pre>
<pre class="alt"><span class="lnum">  11:  </span>    Func&lt;DataClassesDataContext, <span class="kwrd">string</span>, IQueryable&lt;LinqTest&gt;&gt; compiledQuery =</pre>
<pre><span class="lnum">  12:  </span>        CompiledQuery.Compile((DataClassesDataContext meta,<span class="kwrd">string</span> fileNameForSearch) =&gt;</pre>
<pre class="alt"><span class="lnum">  13:  </span>                              (from myData <span class="kwrd">in</span> meta.LinqTests</pre>
<pre><span class="lnum">  14:  </span>                               orderby myData.Id</pre>
<pre class="alt"><span class="lnum">  15:  </span>                               <span class="kwrd">where</span> myData.FileName.Equals(fileNameForSearch)</pre>
<pre><span class="lnum">  16:  </span>                               select myData));</pre>
<pre class="alt"><span class="lnum">  17:  </span>&#160;</pre>
<pre><span class="lnum">  18:  </span>    var metaNew = <span class="kwrd">new</span> DataClassesDataContext();</pre>
<pre class="alt"><span class="lnum">  19:  </span>    DateTime startTime = DateTime.Now;</pre>
<pre><span class="lnum">  20:  </span>    <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i &lt; iterations; i++)</pre>
<pre class="alt"><span class="lnum">  21:  </span>    {</pre>
<pre><span class="lnum">  22:  </span>        IOrderedQueryable&lt;LinqTest&gt; query = </pre>
<pre class="alt"><span class="lnum">  23:  </span>            (IOrderedQueryable&lt;LinqTest&gt;) </pre>
<pre><span class="lnum">  24:  </span>            compiledQuery(metaNew,<span class="kwrd">string</span>.Format(<span class="str">&quot;abcde{0}&quot;</span>, i));</pre>
<pre class="alt"><span class="lnum">  25:  </span>        List&lt;LinqTest&gt; newList = query.ToList();</pre>
<pre><span class="lnum">  26:  </span>    }</pre>
<pre class="alt"><span class="lnum">  27:  </span>    <span class="kwrd">return</span> </pre>
<pre><span class="lnum">  28:  </span>        DateTime.Now.Subtract(startTime).Duration().TotalSeconds;</pre>
<pre class="alt"><span class="lnum">  29:  </span>}</pre>
</p></div>
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
<p>Essentially, line 11 is compiling the code into an instance variable called compileQuery.&#160; Using this instance variable, you can now execute the&#160; LINQ query in a compiled form while still passing in variable data such as fileNameToSearch.&#160; Again, the important thing to note is that one line 24 compiledQuery is already compiled so the IOrderedQueryable result is obtained without having to recompile the LINQ statement.</p>
<h2>Conclusions</h2>
<p>So, from this, it seems that you should always compile your LINQ to SQL queries.&#160; Well, that’s not quite true.&#160; What I’m recommending is that if you have a reason to execute the same query over and over you should strongly consider compiling.&#160; If for example, you are just making a LINQ to SQL call once, there is no benefit because you have to compile it anyway.&#160; Call it ten times?&#160; Well, you will have to decide for yourself.</p>
<p>Forewarned is forearmed!&#160; good luck and hope this helps.</p>
