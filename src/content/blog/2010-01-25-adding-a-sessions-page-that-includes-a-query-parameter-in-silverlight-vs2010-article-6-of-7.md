---
status: publish
published: true
pubDatetime: 2010-01-25T20:00:00.000Z
title: Adding A Sessions Page That Includes a Query Parameter In Silverlight VS2010
  Beta2 (Article 6 of 7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 482
wordpress_url: https://peterkellner.net/2010/01/25/adding-a-sessions-page-that-includes-a-query-parameter-in-silverlight-vs2010-article-6-of-7/
date: '2010-01-25 16:22:47 -0800'
date_gmt: '2010-01-25 23:22:47 -0800'
categories:
- C#
- LINQ
- Presentations
- Silverlight
- Visual Studio 2010
- RIA Services
- VS2010
- ".NET 4.0"
- Entity Framework
tags: []
---
<p>&#160;</p>
<table width="90%">
<tbody>
<tr>
<td width="70">&#160;</td>
<td>Title Of Each Article</td>
<td style="width: 100px" width="150">Video Included With Each Post</td>
</tr>
<tr>
<td width="70">Part 1</td>
<td><a href="/2010/01/20/riaservices-silverlight-4-tutorial-svcc-part1of7-introduction/">Introduction To RIA Services In Silverlight (This Article)</a></td>
<td style="width: 100px" width="150">7 Minutes</td>
</tr>
<tr>
<td width="70">Part 2</td>
<td><a href="/2010/01/25/basic-ria-services-and-datagrid-with-vs-2010-tooling-article-2-of-7/">Basic RIA Services And DataGrid With&#160; VS 2010 Tooling</a></td>
<td style="width: 100px" width="150">14 Minutes</td>
</tr>
<tr>
<td width="70">Part 3</td>
<td><a href="/2010/01/23/adding-a-datagrid-with-connect-the-dots-databinding-in-vs-2010-article-3-of-7/">Adding A DataGrid With Connect The Dots DataBinding in VS 2010</a></td>
<td style="width: 100px" width="150">13 Minutes</td>
</tr>
<tr>
<td width="70">Part 4</td>
<td><a href="/2010/01/25/adding-a-navigation-page-to-a-silverlight-business-application-template-article-4-of-7/">Adding a Navigation Page to a Silverlight Business Application Template</a></td>
<td style="width: 100px" width="150">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 5</td>
<td><a href="/2010/01/25/adding-speakers-page-template-with-converters-in-visual-studio-2010-beta2-article-5-of-7/">Adding Speakers Page Template With Converters In Visual Studio 2010 Beta2</a></td>
<td style="width: 100px" width="150">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 6</td>
<td><a href="/2010/01/25/adding-a-sessions-page-that-includes-a-query-parameter-in-silverlight-vs2010-article-6-of-7/">Adding A Sessions Page That Includes a Query Parameter In Silverlight VS2010 Beta2</a></td>
<td style="width: 100px" width="150">10 Minutes</td>
</tr>
<tr>
<td width="70">Part 7</td>
<td><a href="/2010/01/25/authentication-and-authorization-using-ria-services-article-7-of-7/">Basic Authentication and Authorization In RIA Services</a></td>
<td style="width: 100px" width="150">5 Minutes</td>
</tr>
</tbody>
</table>
<p>[media id=7]</p>
<p>In this section, we will talk about what happens when the users presses the “Sessions” hyperlink from the speakers page.&#160; If you remember from the last article, we used a special converter on the Speakers.xaml page and bound that to the hyperlink titled sessions as shown below.</p>
<p> <!--more-->
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingASessionsPageThatIncludesaQueryPar_DF36/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingASessionsPageThatIncludesaQueryPar_DF36/image_thumb.png" width="376" height="323" /></a></p>
<p>&#160;</p>
<p>When this link is clicked, the navigation created is as follows:</p>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode">http://localhost:9951/Presentation1TestPage.aspx#/Sessions?SpeakerId=903</pre>
<p><!-- code formatted by http://manoli.net/csharpformat/ --></p>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: Consolas, "Courier New", Courier, Monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }<br />
</style>
<div class="csharpcode">
<pre class="alt"><span class="rem">// Executes when the user navigates to this page.</span></pre>
<pre><span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> OnNavigatedTo(NavigationEventArgs e)</pre>
<pre class="alt">{</pre>
<pre>    <span class="rem">//Handle SpeakerId</span></pre>
<pre class="alt">    var qs = NavigationContext.QueryString;</pre>
<pre>    <span class="kwrd">if</span> (qs.ContainsKey(<span class="str">"SpeakerId"</span>))</pre>
<pre class="alt">    {</pre>
<pre>        <span class="kwrd">this</span>.sessionsOverviewDomainDataSource.FilterDescriptors =</pre>
<pre class="alt">            <span class="kwrd">new</span> FilterDescriptorCollection();</pre>
<pre>        <span class="kwrd">this</span>.sessionsOverviewDomainDataSource.FilterDescriptors.Add(</pre>
<pre class="alt">              <span class="kwrd">new</span> FilterDescriptor(<span class="str">"AttendeeId"</span>,</pre>
<pre>                  FilterOperator.IsEqualTo, qs[<span class="str">"SpeakerId"</span>]));</pre>
<pre class="alt">    }</pre>
<pre>}</pre>
</div>
<p>This simply adds a filter to the current DomainDataSource that filters the column AttendeeId with the passed in query parameter SpeakerId.</p>
<p>&#160;</p>
<p>The resulting page looks as follows assuming <a href="http://www.siliconvalley-codecamp.com/Sessions.aspx?ForceSortBySessionTime=true&amp;id=151">Peter Kellner’s Session link</a> was clicked.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingASessionsPageThatIncludesaQueryPar_DF36/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingASessionsPageThatIncludesaQueryPar_DF36/image_thumb_3.png" width="523" height="207" /></a></p>
<p>&#160;</p>
<p>The video referenced in this article goes into building this page in more details, but fundamentally, the major point is just the query parameter.</p>
