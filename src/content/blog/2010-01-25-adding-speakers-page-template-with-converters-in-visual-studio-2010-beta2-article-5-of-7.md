---
status: publish
published: true
pubDatetime: 2010-01-25T20:00:00.000Z
title: Adding Speakers Page Template With Converters In Visual Studio 2010 Beta2 (Article
  5 of 7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 481
wordpress_url: https://peterkellner.net/2010/01/25/adding-speakers-page-template-with-converters-in-visual-studio-2010-beta2-article-5-of-7/
date: '2010-01-25 16:20:35 -0800'
date_gmt: '2010-01-25 23:20:35 -0800'
categories:
- C#
- Visual Studio
- Visual Studio 2010
- RIA Services
- ".NET 4.0"
tags: []
---
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
<p>&#160;</p>
<p>[media id=6]</p>
<p>&#160;</p>
<p>This article will follow the previous article and go through the process of adding Converter’s for changing both the Id column and the Image column.&#160; Basically, what we saw in the previous article was a DataGrid that was created and looked as follows.&#160; (notice the Id column and the PKID columns which are highlighted.&#160; Then, we will add a a DisplayItemTemplate that will format the page and make it look good.</p>
<p> <!--more-->
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb.png" width="411" height="354" /></a></p>
<p>&#160;</p>
<p>What we are going to want to do is convert the Id column’s data from something that looks like “777” to “/Sessions?SpeakerId=777”.&#160; We also will change the PKID column to change from showing a value like “222f32f83-8811” to http://localhost:52879/DisplayImage.ashx?sizex=60&amp;PKID=222f32f83-8811”.&#160; Then, we will apply a template that will make the page look like the following:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_3.png" width="268" height="319" /></a></p>
<p>&#160;</p>
<p>So, let’s get started.</p>
<p>&#160;</p>
<p>First, we need to add two converters to the project.&#160; Both are straight forward and I will not give much explanation besides saying they do exactly what was mentioned in the paragraph below the above picture.</p>
<p><span style="text-decoration: underline"></span>&#160;</p>
<p><span style="text-decoration: underline">Image Converter:</span></p>
<p> 
<div class="csharpcode">
<pre class="alt"><span class="kwrd">namespace</span> BusinessApplicationSVCodeCamp</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">class</span> ImageConverter : IValueConverter</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">public</span> <span class="kwrd">object</span> ConvertBack(<span class="kwrd">object</span> <span class="kwrd">value</span>, Type targetType, <span class="kwrd">object</span> parameter, System.Globalization.CultureInfo culture)</pre>
<pre>        {</pre>
<pre class="alt">            <span class="kwrd">throw</span> <span class="kwrd">new</span> NotImplementedException();</pre>
<pre>        }</pre>
<pre class="alt">&#160;</pre>
<pre>        <span class="kwrd">public</span> <span class="kwrd">object</span> Convert(<span class="kwrd">object</span> <span class="kwrd">value</span>, Type targetType, <span class="kwrd">object</span> parameter, System.Globalization.CultureInfo culture)</pre>
<pre class="alt">        {</pre>
<pre>            <span class="kwrd">string</span> PKID = <span class="kwrd">value</span>.ToString();</pre>
<pre class="alt">&#160;</pre>
<pre>            var s = Application.Current.Host.Source;</pre>
<pre class="alt">            <span class="kwrd">int</span> horizontalSize = 60;</pre>
<pre>            <span class="kwrd">string</span> path = String.Format(<span class="str">&quot;{0}://{1}:{2}/DisplayImage.ashx?sizex={3}&amp;PKID={4}&quot;</span>,</pre>
<pre class="alt">                s.Scheme, s.Host, s.Port, horizontalSize, PKID);</pre>
<pre>&#160;</pre>
<pre class="alt">            <span class="kwrd">return</span> path;</pre>
<pre>        }</pre>
<pre class="alt">    }</pre>
<pre>}</pre>
</div>
<p></p>
<p><span style="text-decoration: underline">Hyperlink Converter:</span></p>
<pre class="csharpcode"><span class="kwrd"></span>&#160;</pre>
<pre class="csharpcode"><span class="kwrd">namespace</span> BusinessApplicationSVCodeCamp
{
    <span class="rem">/// &lt;summary&gt;</span>
    <span class="rem">/// NavigateUri=&quot;/Sessions?SpeakerId=2000&quot; is what we want</span>
    <span class="rem">/// &lt;/summary&gt;</span>
    <span class="kwrd">public</span> <span class="kwrd">class</span> HyperLinkSessionsFormatter : IValueConverter
    {
        <span class="kwrd">public</span> <span class="kwrd">object</span> ConvertBack(<span class="kwrd">object</span> <span class="kwrd">value</span>, Type targetType, <span class="kwrd">object</span> parameter, System.Globalization.CultureInfo culture)
        {
            <span class="kwrd">throw</span> <span class="kwrd">new</span> NotImplementedException();
        }

        <span class="kwrd">public</span> <span class="kwrd">object</span> Convert(<span class="kwrd">object</span> <span class="kwrd">value</span>, Type targetType, <span class="kwrd">object</span> parameter, System.Globalization.CultureInfo culture)
        {
            <span class="kwrd">string</span> sessionId = <span class="kwrd">value</span>.ToString();
            <span class="kwrd">string</span> path = String.Format(<span class="str">&quot;/Sessions?SpeakerId={0}&quot;</span>,sessionId);
            <span class="kwrd">return</span> path;
        }

    }
}</pre>
<pre class="csharpcode">&#160;</pre>
<p>Next, we need to add these converters to our Visual Studio 2010 Beta2 project as resources so we can use them in the DataGrid.&#160; To do this, we use a very cool new feature in VS2010.&#160; It’s a little indirect how we do this, but ultimately, it does make sense.&#160; Just not very discoverable.&#160; What we do is we bring up the properties editor for the DataGrid.&#160; Notice below we are showing an icon next to the word “(Collection)”.&#160; This is the icon you click that brings up the Collection Editors: Columns dialog.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_4.png" width="659" height="465" /></a></p>
<p>&#160;</p>
<p>How on the highlighted “Binding” property of the “idColumn”, you click the databinding icon and you will get the following binding dialog.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_5.png" width="407" height="244" /></a></p>
<p>&#160;</p>
<p>chose “Apply Data Binding” and you’ll get the following:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_6.png" width="404" height="257" /></a></p>
<p>&#160;</p>
<p>Nothing has to be done to the Source property.&#160; This is already set to the the DomainDataSourceView we want.&#160; The Path is already set to Id, which is also correct.&#160; This all happened when we did the “Connect the dots” databinding with RIA Services.&#160; That is, when we dragged the domain data service on top of the DataGrid.&#160; We will need to set the Converter though so click on the currently unexpanded “Converters&quot; control and you will see:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_7.png" width="464" height="311" /></a></p>
<p>&#160;</p>
<p>What this is telling us is that in the Presentation1 project, we have the two converters available to us.&#160; We will need to add these to the project.&#160; To do that, we have to do it one at a time.&#160; First, click on HyperLinkSessionFormatter and you will see the following dialog.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_8.png" width="462" height="304" /></a></p>
<p>&#160;</p>
<p>When you press “Create New”, you will get a choice of which xaml to put the resource in as follows:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_9.png" width="461" height="303" /></a></p>
<p>&#160;</p>
<p>By default, it will put it in your current Navigation Page (Speakers.xaml), however, if you look at the drop down:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_10.png" width="244" height="132" /></a></p>
<p>&#160;</p>
<p>you’ll see that you can also put in other xaml files that may make more sense.&#160; In our case, we are putting it in the Speakers.xaml file and when we press “OK”, it creates xaml as follows.</p>
<pre class="csharpcode"><span class="kwrd"></span>&#160;</pre>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">navigation:Page.Resources</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;</span><span class="html">my1:HyperLinkSessionsFormatter</span> <span class="attr">x:Key</span><span class="kwrd">=&quot;HyperLinkSessionsFormatter1&quot;</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">navigation:Page.Resources</span><span class="kwrd">&gt;</span></pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } --></p>
<p>or</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_11.png" width="399" height="269" /></a></p>
<p>&#160;</p>
<p>It also dropped in a namespace definition for us at the top of the file that looks like the following to reference the my1 prefix:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_12.png" width="402" height="317" /></a></p>
<p>&#160;</p>
<p>It seems like quite a few steps, however in practice, it’s very quick.&#160; I won’t go through the same steps again, but you need to add the ImageFormatter converter the same way (see busy screen shot below for all steps combined into one).</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_13.png" width="398" height="245" /></a></p>
<p>&#160;</p>
<p>Now, we’ve got xaml with two converters:</p>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode">&lt;navigation:Page.Resources&gt;
        &lt;my1:HyperLinkSessionsFormatter x:Key=<span class="str">&quot;HyperLinkSessionsFormatter1&quot;</span> /&gt;
        &lt;my1:ImageConverter x:Key=<span class="str">&quot;ImageConverter1&quot;</span> /&gt;
&lt;/navigation:Page.Resources&gt;</pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } --></p>
<p>And, the columns of the DataGrid are bound to them correctly.&#160; The xaml for that looks as follows:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_14.png" width="434" height="183" /></a></p>
<p>&#160;</p>
<p>This is hugely convenient, and not very error prone which as far as I’m concerned is very nice.</p>
<p>&#160;</p>
<p>So, now when we run the page, we get the following:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_15.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_15.png" width="829" height="293" /></a></p>
<p>&#160;</p>
<p>Ugly, but you can see where we are headed.&#160; Now, we create a DataTemplate (or we get Michael Scherotter to help us create one) that looks like the following:</p>
<pre class="csharpcode"><span class="kwrd"></span>&#160;</pre>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">DataTemplate</span> <span class="attr">x:Key</span><span class="kwrd">=&quot;SpeakersItemTemplate&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="kwrd">&gt;</span>
        <span class="rem">&lt;!--&lt;frameworkElement Margin=&quot;left,top,right,bottom  --&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">d:LayoutOverrides</span><span class="kwrd">=&quot;Height&quot;</span> <span class="attr">Margin</span><span class="kwrd">=&quot;68,5,5,5&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">=&quot;Horizontal&quot;</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">=&quot;FirstName&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;{Binding UserFirstName}&quot;</span>
                           <span class="attr">Margin</span><span class="kwrd">=&quot;0,0,6,0&quot;</span> <span class="attr">FontFamily</span><span class="kwrd">=&quot;Trebuchet MS&quot;</span> <span class="attr">FontSize</span><span class="kwrd">=&quot;16&quot;</span>
                           <span class="attr">FontWeight</span><span class="kwrd">=&quot;Bold&quot;</span><span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">=&quot;LastName&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;{Binding UserLastName}&quot;</span>
                           <span class="attr">FontFamily</span><span class="kwrd">=&quot;Trebuchet MS&quot;</span> <span class="attr">FontSize</span><span class="kwrd">=&quot;16&quot;</span> <span class="attr">FontWeight</span><span class="kwrd">=&quot;Bold&quot;</span><span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">HyperlinkButton</span>
                <span class="attr">NavigateUri</span><span class="kwrd">=&quot;{Binding Id, Converter={StaticResource HyperLinkSessionsFormatter1}}&quot;</span>
                <span class="attr">Content</span><span class="kwrd">=&quot;Sessions&quot;</span><span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">=&quot;Description&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;{Binding UserBio}&quot;</span>
                       <span class="attr">TextWrapping</span><span class="kwrd">=&quot;Wrap&quot;</span> <span class="attr">FontFamily</span><span class="kwrd">=&quot;Trebuchet MS&quot;</span> <span class="attr">FontSize</span><span class="kwrd">=&quot;12&quot;</span><span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">Image</span>  <span class="attr">HorizontalAlignment</span><span class="kwrd">=&quot;Left&quot;</span> <span class="attr">Width</span><span class="kwrd">=&quot;60&quot;</span> <span class="attr">VerticalAlignment</span><span class="kwrd">=&quot;Top&quot;</span>
                <span class="attr">Source</span><span class="kwrd">=&quot;{Binding Path=PKID, Converter={StaticResource ImagePathConverter1}}&quot;</span>  <span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">Image</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">HyperlinkButton</span>  <span class="attr">Content</span><span class="kwrd">=&quot;WebSite&quot;</span>  <span class="attr">TargetName</span><span class="kwrd">=&quot;_blank&quot;</span>
                          <span class="attr">NavigateUri</span><span class="kwrd">=&quot;{Binding UserWebSite}&quot;</span> <span class="attr">VerticalAlignment</span><span class="kwrd">=&quot;Top&quot;</span>
                          <span class="attr">HorizontalAlignment</span><span class="kwrd">=&quot;Right&quot;</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">DataTemplate</span><span class="kwrd">&gt;</span></pre>
<p>&#160;</p>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } -->Then, when we add a listbox, rather than the DataGrid and bind it the same</p>
<pre class="csharpcode"><span class="kwrd"></span>&#160;</pre>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">Height</span><span class="kwrd">=&quot;600&quot;</span>
         <span class="attr">ItemsSource</span><span class="kwrd">=&quot;{Binding ElementName=speakersShort2009DomainDataSource, Path=Data}&quot;</span>
         <span class="attr">ItemTemplate</span><span class="kwrd">=&quot;{StaticResource SpeakersItemTemplate}&quot;</span>
         <span class="attr">ScrollViewer</span>.<span class="attr">HorizontalScrollBarVisibility</span><span class="kwrd">=&quot;Disabled&quot;</span><span class="kwrd">/&gt;</span></pre>
<p><!--.csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } --></p>
<p>We get something that looks pretty nice:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_16.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AddingNavigationandImagesUsingVisualStud_C695/image_thumb_16.png" width="383" height="457" /></a></p>
<p>&#160;</p>
<p>That’s it for this article.&#160; In the next article we will actually talk about what happens when the Session hyperlink is pressed.&#160; We know it will take us to the Sessions page, but how it filters the Sessions is worth reading about.</p>
