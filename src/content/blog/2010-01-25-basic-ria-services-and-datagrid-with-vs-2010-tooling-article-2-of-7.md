---
status: publish
published: true
pubDatetime: 2010-01-25T20:00:00.000Z
title: Basic RIA Services And DataGrid With VS 2010 Tooling (Article 2 of 7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 478
wordpress_url: https://peterkellner.net/2010/01/25/basic-ria-services-and-datagrid-with-vs-2010-tooling-article-2-of-7/
date: '2010-01-25 15:51:23 -0800'
date_gmt: '2010-01-25 22:51:23 -0800'
categories:
- ASP.NET 2.0
- C#
- Silverlight
- Visual Studio 2010
- RIA Services
- ".NET 4.0"
- Entity Framework
tags: []
---
<p> <br />
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
<p> 
<p>[media id=2]</p>
<p>&#160;</p>
<p>In this article, we will&#160; build from scratch, using Visual Studio 2010 Beta 2 a simple application that lets us view <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> Attendees that have authorized us to share their data.&#160; We will be using no special RIA Services Visual Studio 2010 design tools to do this.&#160; We will:</p>
<ul>
<li>Create the <a href="http://msdn.microsoft.com/en-us/library/aa697427(VS.80).aspx">Entity Framework</a> Repository </li>
<li>Create the Domain Service </li>
<li>Wire up an Appropriate Get Method that Returns in <a href="http://msdn.microsoft.com/en-us/library/system.linq.iqueryable.aspx">IQueryable</a> </li>
<li>Call From the Client Code the Domain Service </li>
<li>Show The Results </li>
<li>Observations </li>
</ul>
<p>First, we need to create a new Visual Studio Project.&#160; We do that by using the File/New Project and chose “Silverlight Business Application”.</p>
<p> <!--more-->
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb.png" width="441" height="246" /></a></p>
<h2>Create The Entity Framework</h2>
<p>Then, we need to create an Entity Framework Repository that will be the target of our Domain Service.&#160; We do that by adding to the web project (not the top, <a href="http://silverlight.net/">Silverlight</a> project), we just created and “ADO.NET Entity Data Model”.&#160; We’ll call it ModelSVCC for Model Silicon Valley Code Camp.</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_3.png" width="456" height="258" /></a></p>
<p>We use the option “Generate From Database” as follows:</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_4.png" width="320" height="284" /></a></p>
<p>Choose the appropriate connection (in our case svcodecamp on our local Sql Server 2008 database).</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_5.png" width="343" height="305" /></a></p>
<p>For simplicity, choose all tables and views as follows.</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_6.png" width="340" height="302" /></a></p>
<p>Do a Rebuild/All to make sure all the template code get’s generated and we are done with our first step.</p>
<h2>Create the Domain Service</h2>
<p>Next, create the Domain Service.&#160; This is done by adding again to the web project the Domain Service as follows.</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_7.png" width="372" height="211" /></a></p>
<p>Name it DomainServiceSVCC.cs again for Silicon Valley Code Camp.</p>
<p>Next check all tables and views, make sure “Enable Client Access” is checked and also “Generate associated classes for meta data”.&#160; Enable Client Access adds an attribute to the generated domain class which tell Visual Studio (on building) to generate the same domain classes on the client (Silverlight) side.&#160; This means that you are writing both your client and server code at the same time!&#160; Very convenient.</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_8.png" width="259" height="316" /></a> <a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_9.png" width="354" height="189" /></a></p>
<p>Now, to the method generated in the Domain Service class add an OrderBy Linq command so that the method GetAttendeesWithShare has an implicit order and Skip and Take LINQ will work and the total number of records can be easily obtained (notice the yellow highlighing is the code we added, the rest was there before).</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_10.png" width="623" height="166" /></a></p>
<p>Finally, Rebuild/All again and we are done creating the domain service class for this example.</p>
<h2>Wire up an Appropriate Get Method that Returns in IQueryable</h2>
<p>Now that we have our Domain Service built on the Server side (and of course it get’s exposed on the client side with Visual Studio 2010 template generating magic), we can go to one of the pages built in the default template, add a Silverlight DataGrid and assign our Domain Context to that. Let’s add the list of attendees to our Home Page.&#160; We do that by going to the View\Home.xaml file and simply add a DataGrid tag to the page (see below highlighted in yellow, we simply typed that in or could have dragged it from the toolbar if we are so included).</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_11.png" width="429" height="376" /></a></p>
<p>Then, we go to the code behind of this page and add the following code to the “OnNavigateTo” enent of the Home.xaml page.</p>
<pre class="csharpcode"> var context = <span class="kwrd">new</span> DomainServiceSVCC();
 dataGrid1.ItemsSource = context.AttendeesWithShares;
 context.Load(context.GetAttendeesWithSharesQuery());</pre>
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
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_12.png" width="502" height="147" /></a></p>
<p>Now, when we rebuild all and run, we get:</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_13.png" width="317" height="172" /></a></p>
<p>When we click on the Id’s column header, we get the data sorted in reverse Id order, even though we never code an event for that!</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_14.png" width="317" height="172" /></a></p>
<h2>Observations</h2>
<p>So, what have we done?&#160; Well, we’ve done a lot. first, we’ve create a Domain Service that uses WCF on the server side.&#160; We created code on the Silverlight client that called this domain service.&#160; We got databinding right through to our output.&#160; Be very clear that in our code we added to the OnNavigate Event (repeated here)</p>
<p><a href="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BasicRIAWithMinimalVS2010ToolingArticle2_DD97/image_thumb_12.png" width="322" height="96" /></a></p>
<p>we made a clear step across the network boundary.&#160; We created the DataService context and when we loaded it, all the async magic just happened for us.&#160; No wsdl’s, proxies to code, keep updated, etc.&#160; All that actually happens for us, but we don’t have to worry about it.&#160; I think I’m in love.</p>
