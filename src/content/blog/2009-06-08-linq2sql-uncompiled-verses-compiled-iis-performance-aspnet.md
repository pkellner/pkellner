---
status: publish
published: true
pubDatetime: 2009-06-08T20:00:00.000Z
title: 780 Requests Per Second Verses 110, You Really Need to Compile your LINQ to
  SQL (LINQ2SQL) Queries
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 318
wordpress_url: https://peterkellner.net/2009/06/08/linq2sql-uncompiled-verses-compiled-iis-performance-aspnet/
date: '2009-06-08 22:21:49 -0700'
date_gmt: '2009-06-09 05:21:49 -0700'
categories:
- ASP.NET 2.0
- C#
- LINQ
- LINQ to SQL
tags: []
---
<p><font style="background-color: #ffff00">*Note 10/22/2011 (2+ years later):&#160; Microsoft is fixing this problem in EntityFramework 4.5!&#160; See my post here about it:</font> <a href="/2011/10/22/microsoft-to-add-auto-compiled-linq-queries-to-entity-framework-v-next/"><font style="background-color: #ffff00">https://peterkellner.net/2011/10/22/microsoft-to-add-auto-compiled-linq-queries-to-entity-framework-v-next/</font></a></p>
<p>&#160;</p>
<div>
<div class="peterkellnerpromo"> <a href="/contact" target="_blank">If you have a problem like this involving ASP.NET, LINQ, EF, etc., consulting services are available.  We love these kind of problems.  Contact Peter Kellner and his associates <span>here</span></a>. </div>
<div>
<p>So, I’ve been on kind of a rant lately about how slow <a href="http://weblogs.asp.net/scottgu/archive/2007/05/19/using-linq-to-sql-part-1.aspx">LINQ2SQL</a> is if you don’t compile your queries before executing them.&#160; To be fair, if you are doing Windows Forms Programming, WPF or <a href="http://silverlight.net/">Silverlight</a> it really does not have much impact.&#160; The reason is that a very complex LINQ query may take 50 milliseconds (1/20th of a second).&#160; No big deal if you just have a dozen or so of them to do.&#160; The story changes though if you are using LINQ2SQL in a web environment that has limited CPU resources.&#160; That is, unless you have unlimited money, if it takes more than one web server to handle your load, your throwing away money by using uncompiled LINQ2SQL.</p>
<p>So, to put some more substance behind my claims, I’ve written a small test application using Visual Studio 2008 that compares the performance of using LINQ2SQL compiled verses non-compiled on a trivial web page.</p>
</div>
</div>
<p><!--more--></p>
<p>Here are some assumptions:</p>
<ul>
<li>My Notebook Computer Simulates a real world web server (Lenovo W500, Vista64, IIS7) </li>
<li>All Web Pages do 7 LINQ2SQL executions (Heading speak at&#160; VSLive in Vegas so 7 seemed right) </li>
<li>All Web Requests Do Only LINQ2SQL, no images, css, JavaScript or anything else </li>
</ul>
<p>OK, maybe my assumptions are not so good, but I believe overall I’m making a good point so I’m going to keep going rather than just say “take my word for it, trust me”.&#160; So, I’m attaching the web project here that let’s you recreate all this so you can do your own tests.&#160; I think you’ll need Visual Studio Team Suite to do these tests.&#160; If you don’t have that, you can at least look at the code.&#160; The guts are in LINQUtils.cs.&#160; I’m going to show the relevant code below.</p>
<p>But before that, here is the Visual Studio 2008 Project Code if you want to try it yourself: </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:b2b30af6-cfd4-413d-abeb-71e63d4120bf" class="wlWriterSmartContent">
<p>Download: <a href="/wp/wp-content/uploads/2009/06/LINQ2SQL_CompiledQueryWebTest.zip" target="_blank">Project Zip File</a></p>
</p></div>
<p>First, The Results</p>
<table border="0" cellspacing="0" cellpadding="2" width="400">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2009/06/notcompiled.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="notcompiled" border="0" alt="notcompiled" src="/wp/wp-content/uploads/2009/06/notcompiled_thumb.png" width="412" height="237" /></a> </td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2009/06/notcompiled1.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="notcompiled1" border="0" alt="notcompiled1" src="/wp/wp-content/uploads/2009/06/notcompiled1_thumb.png" width="250" height="236" /></a> </td>
</tr>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2009/06/compiled.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="compiled" border="0" alt="compiled" src="/wp/wp-content/uploads/2009/06/compiled_thumb.png" width="411" height="219" /></a> </td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2009/06/image1.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/06/image_thumb1.png" width="247" height="221" /></a> </td>
</tr>
</tbody>
</table>
<p>The code is very straight forward.&#160; Below is the code for the LINQ2SQL Not Compiled Test:</p>
<pre style="border-bottom: #cecece 1px solid; border-left: #cecece 1px solid; padding-bottom: 5px; background-color: #fbfbfb; min-height: 40px; padding-left: 5px; width: 90%; padding-right: 5px; overflow: auto; border-top: #cecece 1px solid; border-right: #cecece 1px solid; padding-top: 5px"><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  1: <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> ProcessLinqQueryNotCompiled()
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  2: {
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  3:     <span style="color: #0000ff">if</span> (meta == <span style="color: #0000ff">null</span>)
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  4:     {
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  5:         meta = <span style="color: #0000ff">new</span> DataClassesDataContext();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  6:     }
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  7: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  8:     Stopwatch stopWatch = <span style="color: #0000ff">new</span> Stopwatch();
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  9:     stopWatch.Start();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 10: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 11:     <span style="color: #0000ff">int</span> retCnt = 0;
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 12:     <span style="color: #0000ff">for</span> (<span style="color: #0000ff">int</span> i = 0; i &lt; iterations; i++)
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 13:     {
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 14:         <span style="color: #0000ff">const</span> <span style="color: #0000ff">int</span> companyTypeIdToFind = 1;
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 15:         var q3 = from dataCo <span style="color: #0000ff">in</span> meta.Companies
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 16:                  where (from dataCt <span style="color: #0000ff">in</span> meta.CompanyCompanyTypes
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 17:                         where dataCt.CompanyTypeId == companyTypeIdToFind
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 18:                         select dataCt.CompanyId).Contains(dataCo.Id)
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 19:                  select dataCo;
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 20: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 21:         var newList = q3.ToList();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 22:         retCnt = newList.Count;
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 23:     }
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 24:     stopWatch.Stop();
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 25:     <span style="color: #0000ff">double</span> milliSecondsPerIteration = Convert.ToDouble(stopWatch.ElapsedMilliseconds)/Convert.ToDouble(iterations);
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 26:     <span style="color: #0000ff">return</span> <span style="color: #0000ff">string</span>.Format(&quot;<span style="color: #8b0000">Return Cnt: {0} LINQ Executions: {1}      Milliseconds Per Iteration: {2}</span>&quot;, retCnt, iterations,
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 27:                          String.Format(&quot;<span style="color: #8b0000">{0:0.00}</span>&quot;, milliSecondsPerIteration));
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 28: }</pre>
<p>And, the Compiled LINQ2SQL Code:</p>
<pre style="border-bottom: #cecece 1px solid; border-left: #cecece 1px solid; padding-bottom: 5px; background-color: #fbfbfb; min-height: 40px; padding-left: 5px; width: 90%; padding-right: 5px; overflow: auto; border-top: #cecece 1px solid; border-right: #cecece 1px solid; padding-top: 5px"><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  1: <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> ProcessLinqQueryCompiled()
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  2: {
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  3:     var stopWatch = <span style="color: #0000ff">new</span> Stopwatch();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  4:     stopWatch.Start();
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  5: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  6:     <span style="color: #0000ff">int</span> retCnt = 0;
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  7:     <span style="color: #0000ff">for</span> (<span style="color: #0000ff">int</span> i = 0; i &lt; iterations; i++)
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  8:     {
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  9:         <span style="color: #0000ff">const</span> <span style="color: #0000ff">int</span> companyTypeIdToFind = 1;
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 10: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 11:         <span style="color: #0000ff">if</span> (meta == <span style="color: #0000ff">null</span>)
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 12:         {
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 13:             meta = <span style="color: #0000ff">new</span> DataClassesDataContext();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 14:         }
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 15: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 16:         <span style="color: #0000ff">if</span> (_compiledQuery == <span style="color: #0000ff">null</span>)
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 17:         {
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 18:             _compiledQuery =
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 19:                 CompiledQuery.Compile((DataClassesDataContext metax, <span style="color: #0000ff">int</span> myQuery) =&gt;
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 20:                                       (from dataCo <span style="color: #0000ff">in</span> metax.Companies
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 21:                                        where (from dataCt <span style="color: #0000ff">in</span> metax.CompanyCompanyTypes
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 22:                                               where dataCt.CompanyTypeId == companyTypeIdToFind
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 23:                                               select dataCt.CompanyId).Contains(dataCo.Id)
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 24:                                        select dataCo)
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 25:                     );
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 26:         }
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 27: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 28:         
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 29:         var query =
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 30:             (IOrderedQueryable&lt;Company&gt;)
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 31:             _compiledQuery(meta, 1);
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 32:         var newList = query.ToList();
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 33:         retCnt = newList.Count;
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 34:     }
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 35:     stopWatch.Stop();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 36:     <span style="color: #0000ff">double</span> milliSecondsPerIteration = Convert.ToDouble(stopWatch.ElapsedMilliseconds) / Convert.ToDouble(iterations);
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 37:     <span style="color: #0000ff">return</span> <span style="color: #0000ff">string</span>.Format(&quot;<span style="color: #8b0000">Return Cnt: {0} LINQ Executions: {1}      Milliseconds Per Iteration: {2}</span>&quot;, retCnt, iterations,
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 38:                          String.Format(&quot;<span style="color: #8b0000">{0:0.00}</span>&quot;, milliSecondsPerIteration));
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 39: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 40: }</pre>
<p>Bottom line, You need to compile your LINQ2SQL!</p>
