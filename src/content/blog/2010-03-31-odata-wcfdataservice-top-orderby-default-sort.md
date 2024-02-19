---
status: publish
published: true
pubDatetime: 2010-03-31T20:00:00.000Z
title: OData Query Option top Forces Data To Be Sorted By Primary Key
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
description: This post show a simple WCF Data Service (Formerly known as ADO.NET Data
  Services) project that retrieves data using the Reflection Provider for accessing
  data.  It goes on to show that using $top forces a server side sort of the data
  by the data's primary key before sending the data out to the client program.
wordpress_id: 1165
wordpress_url: https://peterkellner.net/2010/03/31/odata-wcfdataservice-top-orderby-default-sort/
date: '2010-03-31 11:24:31 -0700'
date_gmt: '2010-03-31 18:24:31 -0700'
categories:
- ".Net 2.0"
- C#
- OData
- WCF Data Services
tags: []
---
<p>I’ve recently started using <a href="http://msdn.microsoft.com/en-us/data/aa937697.aspx">Microsoft’s WCF Data Services</a> which supports <a href="http://www.odata.org/developers">OData Services</a>.&#160; What this means is that we can access resources by simply specifying a <a href="http://en.wikipedia.org/wiki/Uniform_Resource_Identifier">URI</a>.&#160; This concept greatly simplified building an ORM layer on a web site, as well as creating the linkage between the server side data and the client side application, which in my case is usually a browser.</p>
<p>So, the issue this blog addresses is that if you form a URI with the parameter $top={anything}, your data will automatically be sorted.&#160; The documentation for OData on top basically says that, but it could be clearer.&#160; It says the following:</p>
<blockquote><p><a href="http://www.odata.org/developers/protocols/uri-conventions#TopSystemQueryOption">“If the data service URI contains a $top query option, but does not contain a $orderby option, then the Entries in the set needs to first be fully ordered by the data service.”</a></p>
</blockquote>
<p>What actually happens is when you use the orderby clause, the data will be sorted 100% of the time for you, whether you do it or not.</p>
<p> <!--more-->
<p>I put a small example together that shows that.&#160; I’ll briefly step through the parts of the code attached to this post that show that happening.&#160; First, the results:</p>
<p><a href="/FilesForWebDownload/ODataQueryOptiontopForcesDataToBeSortedB_9CBC/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ODataQueryOptiontopForcesDataToBeSortedB_9CBC/image_thumb.png" width="411" height="202" /></a></p>
<p>Here is the actual Visual Studio 2010 RC project you can run yourself:</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:3b91b815-24f9-4c84-aa5e-cf26654049f6" class="wlWriterSmartContent">
<div>Solution: <a href="/FilesForWebDownload/ODataQueryOptiontopForcesDataToBeSortedB_9CBC/WCFServicesWithODataExample.zip" target="_self">WCFServicesWithODataExample.zip</a></div>
</p></div>
<p>Notice that when $top=5 is called, the data returned is sorted by the primary key.</p>
<p>Now, here are the details of the project that shows this happening.</p>
<p>Below is the complete code for the WcfDataService.svc.&#160; Notice that the data is created in the SampleDataSource constructor and is created in non-key order.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System;</pre>
<pre><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Data.Services;</pre>
<pre><span class="kwrd">using</span> System.Data.Services.Common;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Linq;</pre>
<pre><span class="kwrd">using</span> System.ServiceModel.Web;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Web;</pre>
<pre>&#160;</pre>
<pre class="alt"><span class="kwrd">namespace</span> WebApp</pre>
<pre>{</pre>
<pre class="alt">    [EntityPropertyMappingAttribute(</pre>
<pre>        <span class="str">&quot;Title&quot;</span>, SyndicationItemProperty.Title,</pre>
<pre class="alt">        SyndicationTextContentKind.Plaintext, <span class="kwrd">true</span>)]</pre>
<pre>    [DataServiceKey(<span class="str">&quot;Id&quot;</span>)]</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">class</span> SampleInfo</pre>
<pre>    {</pre>
<pre class="alt">        <span class="rem">// The DataServiceKey attribute is necessary unless you name </span></pre>
<pre>        <span class="rem">// this ID</span></pre>
<pre class="alt">        <span class="kwrd">public</span> <span class="kwrd">int</span> Id { get; set; } </pre>
<pre>        <span class="kwrd">public</span> <span class="kwrd">string</span> Title { get; set; }</pre>
<pre class="alt">    }</pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">class</span> SampleDataSource</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">private</span> <span class="kwrd">readonly</span> List&lt;SampleInfo&gt; _sampleInfoList;</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="kwrd">public</span> SampleDataSource()</pre>
<pre>        {</pre>
<pre class="alt">            _sampleInfoList =</pre>
<pre>                <span class="kwrd">new</span> List&lt;SampleInfo&gt;()</pre>
<pre class="alt">                    {</pre>
<pre>                        <span class="kwrd">new</span> SampleInfo {Id = 3, Title = <span class="str">&quot;3&quot;</span>},</pre>
<pre class="alt">                        <span class="kwrd">new</span> SampleInfo {Id = 4, Title = <span class="str">&quot;4&quot;</span>},</pre>
<pre>                        <span class="kwrd">new</span> SampleInfo {Id = 1, Title = <span class="str">&quot;1&quot;</span>},</pre>
<pre class="alt">                        <span class="kwrd">new</span> SampleInfo {Id = 5, Title = <span class="str">&quot;5&quot;</span>},</pre>
<pre>                        <span class="kwrd">new</span> SampleInfo {Id = 2, Title = <span class="str">&quot;2&quot;</span>}</pre>
<pre class="alt">                    };</pre>
<pre>        }</pre>
<pre class="alt">&#160;</pre>
<pre>        <span class="kwrd">public</span> IQueryable&lt;SampleInfo&gt; SampleInfoData</pre>
<pre class="alt">        {</pre>
<pre>            get { <span class="kwrd">return</span> _sampleInfoList.AsQueryable(); }</pre>
<pre class="alt">        }</pre>
<pre>    }</pre>
<pre class="alt">&#160;</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">class</span> WcfDataService : DataService&lt;SampleDataSource&gt;</pre>
<pre class="alt">    {</pre>
<pre>        <span class="rem">// This method is called only once to initialize service-wide policies.</span></pre>
<pre class="alt">        <span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">void</span> InitializeService(DataServiceConfiguration config)</pre>
<pre>        {</pre>
<pre class="alt">            config.SetEntitySetAccessRule(<span class="str">&quot;*&quot;</span>, EntitySetRights.AllRead);</pre>
<pre>            config.SetServiceOperationAccessRule(<span class="str">&quot;*&quot;</span>, ServiceOperationRights.All);</pre>
<pre class="alt">            config.DataServiceBehavior.MaxProtocolVersion = </pre>
<pre>                DataServiceProtocolVersion.V2;</pre>
<pre class="alt">        }</pre>
<pre>    }</pre>
<pre class="alt">}</pre>
</div>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">I’ve created a very simple web page that includes some simple JavaScript to display the results of calling this WCF DataService with and without $top.&#160; The page code is below.</div>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Demonstration of OData Sort Based on Using $top<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">&#160;</pre>
<pre>     <span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">src</span><span class="kwrd">=&quot;http://ajax.microsoft.com/ajax/jquery/jquery-1.3.2.min.js&quot;</span>    </pre>
<pre class="alt">        <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>  </pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
<pre>    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> &gt;</pre>
<pre class="alt">        <span class="rem">// Display the data with and without $top with OData</span></pre>
<pre>        $(document).ready(<span class="kwrd">function</span> () {</pre>
<pre class="alt">            loadData(<span class="str">&quot;/WcfDataService.svc/SampleInfoData&quot;</span>,<span class="str">&quot;#resultTableNoODataParms&quot;</span>);</pre>
<pre>            loadData(<span class="str">&quot;/WcfDataService.svc/SampleInfoData?$top=5&quot;</span>, <span class="str">&quot;#resultTableWithODataParms&quot;</span>);</pre>
<pre class="alt">        });</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="rem">// Called after DOM is ready to call service and display table data</span></pre>
<pre>        <span class="kwrd">function</span> loadData(urlString,divName) {</pre>
<pre class="alt">            <span class="kwrd">var</span> url = urlString; <span class="rem">// &quot;/WcfDataService.svc/SampleInfoData&quot;;</span></pre>
<pre>            $.ajax({</pre>
<pre class="alt">                type: <span class="str">&quot;GET&quot;</span>,</pre>
<pre>                url: url,</pre>
<pre class="alt">                contentType: <span class="str">&quot;application/json; charset=utf-8&quot;</span>,</pre>
<pre>                dataType: <span class="str">&quot;json&quot;</span>,</pre>
<pre class="alt">                success: <span class="kwrd">function</span> (msg) {</pre>
<pre>                    loadTable(msg.d,divName);</pre>
<pre class="alt">                }</pre>
<pre>            });</pre>
<pre class="alt">        }</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="rem">// display data at a given ID</span></pre>
<pre>        <span class="kwrd">function</span> loadTable(results,divName) {</pre>
<pre class="alt">            <span class="kwrd">var</span> table = <span class="str">'&lt;table border=1&gt;&lt;tbody&gt;&lt;tr&gt;'</span>;</pre>
<pre>            <span class="kwrd">for</span> (<span class="kwrd">var</span> post <span class="kwrd">in</span> results) {</pre>
<pre class="alt">                <span class="kwrd">var</span> row = <span class="str">''</span>;</pre>
<pre>                row += <span class="str">'&lt;td&gt;'</span> + results[post].Id + <span class="str">'&lt;/td&gt;'</span>;</pre>
<pre class="alt">                table += row;</pre>
<pre>            }</pre>
<pre class="alt">            table += <span class="str">'&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;'</span>;</pre>
<pre>            $(divName).html(table);</pre>
<pre class="alt">        }</pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">h2</span><span class="kwrd">&gt;</span>/WcfDataService.svc/SampleInfoData<span class="kwrd">&lt;/</span><span class="html">h2</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">id</span><span class="kwrd">=&quot;resultTableNoODataParms&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">hr</span> <span class="kwrd">/&gt;</span></pre>
<pre>     <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">h2</span><span class="kwrd">&gt;</span>/WcfDataService.svc/SampleInfoData?$top=5<span class="kwrd">&lt;/</span><span class="html">h2</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">id</span><span class="kwrd">=&quot;resultTableWithODataParms&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
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
<p>As you can see, adding the $top=5 causes the data to be sorted.</p>
<p>Hope this helps!</p>
