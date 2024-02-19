---
status: publish
published: true
pubDatetime: 2009-03-27T20:00:00.000Z
title: Multi Level ASP.NET Menu with CSS Friendly Control Adapters (The Source Code!)
  Part 6
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 275
wordpress_url: https://peterkellner.net/2009/03/27/codecampwebsiteseries6-cssfriendly-adapters-aspnet-menu/
date: '2009-03-27 12:40:23 -0700'
date_gmt: '2009-03-27 19:40:23 -0700'
categories:
- ASP.NET 3.5
- C#
- Code Camp Web Site Series
- CSS Adapters
tags: []
---
<h2>Article Series</h2>
<table border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="100">Article 1:</td>
<td valign="top" width="600"><a href="/2008/05/13/codecampwebsiteseries1/" target="_blank">Best Practices for Building an ASP.NET quality web site</a></td>
</tr>
<tr>
<td>Article 2:</td>
<td><a href="/2008/05/19/codecampwebsiteseries2/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters</a></td>
</tr>
<tr>
<td>Article 3:</td>
<td><a href="/2008/05/25/codecampwebsiteseries3/">Creating a Theme For Each Year of Code Camp Using Skins in ASP.NET</a></td>
</tr>
<tr>
<td>Article 4:</td>
<td><a href="/2008/06/29/sv-code-camp-web-site-series4/">Creating a Modal Login Window Using the Telerik Modal RadWindow Component</a></td>
</tr>
<tr>
<td>Article 5:</td>
<td><a href="/2008/07/03/combine-email-lists-with-linq/">Using LINQ to Merge Mailing Lists and Filter Opt Outs</a></td>
</tr>
<tr>
<td>Article 6:</td>
<td><a href="/2009/03/27/codecampwebsiteseries6-cssfriendly-adapters-aspnet-menu/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters (The Source Code!)</a></td>
</tr>
</tbody>
</table>
<p> 
<p>I always intended to put the source code for this project online, however I just kept not getting around to it.&#160; In this article, I’m attaching a Visual Studio 2008 Solution that includes both the modified CSS Friendly Control Adapter as well as a sample application that demonstrates the technique in this series.&#160; I’m actually using the Code Camp CSS since that is the site that this solution was written for.&#160; I’ve created a much abbreviated version of the Code Camp Site Project for this demonstration.&#160; Below is the source code (finally).</p>
<p>Visual Studio 2008 Solution <a href="/wp/wp-content/uploads/2009/03/CSSFriendlyMenu.zip" target="_blank">CSSFriendlyCustomMenu</a></p>
<p>The solution is load out as follows:</p></p>
<p> <!--more--></p>
<p><a href="/wp/wp-content/uploads/2009/03/image1.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/03/image_thumb1.png" width="238" height="148" /></a></p>
<p>There are two projects (actually, one class library and a web site).&#160; The class library really is just the CSS Friendly Controls library with small modifications to the menu class.&#160; The WebSample web project is just a stripped down version of the code camp site to demonstrate the techniques used.&#160; When you run the web site, you should see results like the following.</p>
<p><a href="/wp/wp-content/uploads/2009/03/image_31.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/03/image_thumb_31.png" width="671" height="240" /></a></p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2009/03/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/03/image_thumb_4.png" width="676" height="239" /></a></p>
<p>Notice that when the speakers page is shown, the Program menu stays highlighted. </p>
<p>And, the sitemap is as follows:</p>
<div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; max-height: 200px; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">
<div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: white; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMap</span> <span style="color: #ff0000">xmlns</span><span style="color: #0000ff">=&quot;http://schemas.microsoft.com/AspNet/SiteMap-File-1.0&quot;</span> <span style="color: #0000ff">&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   2:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;Default.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;HOME&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;Silicon Valley CodeCamp 08&quot;</span><span style="color: #0000ff">&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: white; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   3:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;Register.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;REGISTER&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;&quot;</span>  <span style="color: #0000ff">/&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   4:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;Program.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;PROGRAM&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;&quot;</span><span style="color: #0000ff">&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: white; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   5:</span>       <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;SessionsOverview.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;Session Overview&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;Session Overview&quot;</span> <span style="color: #0000ff">/&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   6:</span>       <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;Speakers.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;Speakers&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;&quot;</span> <span style="color: #0000ff">/&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: white; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   7:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">siteMapNode</span><span style="color: #0000ff">&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   8:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">siteMapNode</span> <span style="color: #ff0000">url</span><span style="color: #0000ff">=&quot;News.aspx&quot;</span> <span style="color: #ff0000">title</span><span style="color: #0000ff">=&quot;NEWS&quot;</span>  <span style="color: #ff0000">description</span><span style="color: #0000ff">=&quot;&quot;</span> <span style="color: #0000ff">/&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: white; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   9:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">siteMapNode</span><span style="color: #0000ff">&gt;</span></pre>
<pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, &#39;Courier New&#39;, courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  10:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">siteMap</span><span style="color: #0000ff">&gt;</span></pre>
</p></div>
</div>
<p>That’s it!</p>
<p>Good luck with this.</p>
