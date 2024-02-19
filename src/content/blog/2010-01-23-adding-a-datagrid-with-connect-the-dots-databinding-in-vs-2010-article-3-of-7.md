---
status: publish
published: true
pubDatetime: 2010-01-23T20:00:00.000Z
title: Adding A DataGrid With Connect The Dots DataBinding in VS 2010 (Article 3 of
  7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 461
wordpress_url: https://peterkellner.net/?p=461
date: '2010-01-23 12:41:20 -0800'
date_gmt: '2010-01-23 19:41:20 -0800'
categories:
- ASP.NET 2.0
- C#
- Silverlight
- Visual Studio 2010
- RIA Services
- VS2010
- ".NET 4.0"
tags: []
---
<p><br><br />
<table width="90%">
<tbody>
<tr>
<td width="70">&nbsp;</td>
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
<td><a href="/2010/01/25/basic-ria-services-and-datagrid-with-vs-2010-tooling-article-2-of-7/">Basic RIA Services And DataGrid With&nbsp; VS 2010 Tooling</a></td>
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
<p><br>
<p>[media id=4]</p>
<p><br>
<p>In this article, we will use the the Visual Studio 2010 Beta2 Tooling to create a Sessions DataGrid.&nbsp; We will add a Pager to it as well as a Silverlight busy indicator which will show while the data is loading.&nbsp; In Article 1, we build a simple DataGrid with code behind, in this article, it will all be declarative in XAML built with the Visual Studio 2010 designer.</p>
<p><!--more-->
<p>First thing we need to do is add a new Silverlight Navigation Page to the Silverlight project (not the web project) in the Views folder.</p>
<p>&nbsp;<a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb.png" width="433" height="183"></a></p>
<p>Then, copy the code from the Home Page to get the top two default sections that appear on every page as follows:</p>
<p>&nbsp;<a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_3.png" width="437" height="163"></a></p>
<p>And the actual code:</p>
<p><!-- code formatted by http://manoli.net/csharpformat/ --><br />
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
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
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="ContentStackPanel"</span>
            <span class="attr">Style</span><span class="kwrd">="{StaticResource ContentStackPanelStyle}"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="HeaderText"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource HeaderTextStyle}"</span>
               <span class="attr">Text</span><span class="kwrd">="{Binding Path=ApplicationStrings.HomePageTitle,
               Source={StaticResource ResourceWrapper}}"</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="ContentText"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource ContentTextStyle}"</span>
               <span class="attr">Text</span><span class="kwrd">="Home page content"</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">Height</span><span class="kwrd">="393"</span> <span class="attr">Name</span><span class="kwrd">="image1"</span> <span class="attr">Stretch</span><span class="kwrd">="Uniform"</span> <span class="attr">Width</span><span class="kwrd">="467"</span>
               <span class="attr">Source</span><span class="kwrd">="/Presentation1;component/Images/IMG_1504.JPG"</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<p>Change text to “Speaker page content” and change the resource string to ApplicationString.SpeakerPageTitle and update the ApplicationStrings.resx file as follows:</p>
<p>&nbsp;<a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_4.png" width="405" height="286"></a></p>
<p>Then, drag a DataGrid to the Speaker.xaml design surface (after removing the image tag which was the picture on the home page we copied over).</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_5.png" width="549" height="213"></a></p>
<p>Now, we do what Microsoft calls “Connect the Dots DataBinding”.&nbsp; That is, we go to the Data Sources Tab</p>
<p>&nbsp;<a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_6.png" width="352" height="168"></a></p>
<p>Drag the SpeakersShort2009 box (shown in yellow below) to the DataGrid showing on the design surface.</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_7.png" width="348" height="149"></a></p>
<p>That automatically creates a bunch of xaml including the RIA Domain DataSource, which includes a reference to the correct query method and the correct Domain Context.&nbsp; Very nice!</p>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
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
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">riaControls:DomainDataSource</span> <span class="attr">AutoLoad</span><span class="kwrd">="True"</span> <span class="attr">Height</span><span class="kwrd">="0"</span>
                                      <span class="attr">LoadedData</span><span class="kwrd">="speakersShort2009DomainDataSource_LoadedData"</span>
                                      <span class="attr">Name</span><span class="kwrd">="speakersShort2009DomainDataSource"</span>
                                      <span class="attr">QueryName</span><span class="kwrd">="GetSpeakersShort2009Query"</span> <span class="attr">Width</span><span class="kwrd">="0"</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">riaControls:DomainDataSource.DomainContext</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">my:DomainServiceSVCC</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">riaControls:DomainDataSource.DomainContext</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">riaControls:DomainDataSource</span><span class="kwrd">&gt;</span></pre>
<p><br>
<pre class="csharpcode"><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_8.png" width="599" height="195"></a></pre>
<pre class="csharpcode"></pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } -->Now, we do the same thing with the DataPager (which may have to add to the toolbox with “Choose Items” That gives us some xaml that looks like the following.</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_9.png" width="423" height="287"></a></p>
<p>&nbsp;</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_10.png" width="419" height="246"></a></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">data:DataPager</span> <span class="attr">Height</span><span class="kwrd">="26"</span>
                <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="720,325,0,0"</span>
                <span class="attr">Name</span><span class="kwrd">="dataPager1"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span>
                <span class="attr">Width</span><span class="kwrd">="200"</span>
                <span class="attr">PageSize</span><span class="kwrd">="10"</span><span class="kwrd">/&gt;</span></pre>
<pre class="csharpcode"><span class="kwrd"></span>&nbsp;</pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } --></p>
<p>Notice that I put PageSize in.&nbsp; That does not happen by default, and in my presentation, I forgot this and for a while could not figure out why the paging was not working.&nbsp; Try and not make the same mistake!</p>
<p>Then, drag the same DataSource as we dragged to the DataGrid and drop it on the Paging control as follows:</p>
<p>&nbsp;<a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_11.png" width="412" height="135"></a></p>
<p>That automatically binds the DataPager to the same DomainDataSource as the DataGrid’s DomainDataSource.&nbsp; Here is the XAML created.</p>
<pre class="csharpcode"> <span class="kwrd">&lt;</span><span class="html">data:DataPager</span> <span class="attr">Height</span><span class="kwrd">="26"</span> <span class="attr">Name</span><span class="kwrd">="dataPager1"</span> <span class="attr">Width</span><span class="kwrd">="200"</span>
   <span class="attr">Source</span><span class="kwrd">="{Binding ElementName=speakersShort2009DomainDataSource, Path=Data}"</span> <span class="kwrd">/&gt;</span></pre>
<pre class="csharpcode"></pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } -->The next thing is to use the new “Reset-All” for styling.&nbsp; It’s very simple.&nbsp; Right click on the design surface and simply click “Layout/Reset” as follows:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_12.png" width="244" height="176"></a></p>
<p>Now, when we run this, we get:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_13.png" width="380" height="366"></a></p>
<p>Finally, to put a “Busy Indicator” control on the page, we simply drag out the busy Indicator onto the design surface. It likely will not be in your toolbox, so like the DataPager, you will need to add it to the toolbar as follows:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_14.png" width="396" height="252"></a></p>
<p>Then, drag it from the toolbox right onto the DataGrid as follows:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_15.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_15.png" width="297" height="314"></a></p>
<p>Then, once it’s on the DataGrid (and in the XAML), you need to right click on it and change some of it’s properties.</p>
<p>First, set the “IsBusy” property by checking the checkbox, then resize the control itself so it shows the text and is a pleasant size.</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_16.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_16.png" width="428" height="280"></a></p>
<p>The next step is a little more tricky.&nbsp; You need to find the property in the BusyIndicator called DataContext. Right click on that as follows and press “Apply Data Binding”.</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_17.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_17.png" width="428" height="257"></a></p>
<p>Now, you are setting the Source so first select “ElementName”, then chose speakersShort2009DomainDataSource as follows:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_18.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_18.png" width="431" height="296"></a></p>
<p>Then, go to the “Path:” and set the property “DomainContext” and the method to “IsLoading” as follows:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_19.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_19.png" width="436" height="254"></a></p>
<p>What this has done is created a binding expression using a very nice Visual Studio 2010 Tool.&nbsp; It’s assigned that binding expression to the DataContext of the DomainDataSource.</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">riaControls:DomainDataSource</span> <span class="attr">AutoLoad</span><span class="kwrd">="True"</span> <span class="attr">Height</span><span class="kwrd">="0"</span>
         <span class="attr">LoadedData</span><span class="kwrd">="speakersShort2009DomainDataSource_LoadedData_2"</span>
                              <span class="attr">Name</span><span class="kwrd">="speakersShort2009DomainDataSource"</span>
                              <span class="attr">QueryName</span><span class="kwrd">="GetSpeakersShort2009Query"</span> <span class="attr">Width</span><span class="kwrd">="0"</span>
   <span class="attr">DataContext</span><span class="kwrd">="{Binding ElementName=speakersShort2009DomainDataSource, Path=DomainContext.IsLoading}"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">riaControls:DomainDataSource.DomainContext</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">my:DomainServiceSVCC</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">riaControls:DomainDataSource.DomainContext</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">riaControls:DomainDataSource</span><span class="kwrd">&gt;</span></pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } -->Now, when we finally run our program, we first get the busy indicator as the data is being asynchrously loaded which looks like this:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_20.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_20.png" width="514" height="180"></a></p>
<p>Then, when the data finally loads, looks like the following:</p>
<p><a href="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_21.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingDataGridWithVS2010ToolingArticle3o_E48C/image_thumb_21.png" width="523" height="449"></a></p>
<p>Notice the paging control at the bottom, and notice the BusyIndicator has gone away.</p>
<p>That’s it for this article.&nbsp; In the next article, we will style this page as well as add Converts to show the Speakers picture and add a hyperlink to the sessions associated with each speaker.</p>
