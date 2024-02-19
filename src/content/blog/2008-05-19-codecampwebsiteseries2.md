---
status: publish
published: true
pubDatetime: 2008-05-19T20:00:00.000Z
title: Multi Level ASP.NET Menu with CSS Friendly Control AdaptersBuilding the New
  Code Camp Web Site (Part 2)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This article discusses the CSS Friendly Adapters and how they are integraged
  with the ASP.NET 2.0 menu control.  It shows the default html created by a sample
  menu control without the Friendly Adapters, as well as showing the html created
  using the Friendly Adapters.</p>"
wordpress_id: 112
wordpress_url: https://peterkellner.net/2008/05/19/codecampwebsiteseries2/
date: '2008-05-19 15:38:46 -0700'
date_gmt: '2008-05-19 22:38:46 -0700'
categories:
- Best Practices
- Code Camp Web Site Series
- CSS Adapters
- Visual Studio
- ASP.NET 2.0
tags: []
---
<h2>Article Series</h2>
<blockquote><p><strong><em>(Source Code Available in Article 6 Below - (Added March 2009))</em></strong></p></blockquote>
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
<p>&nbsp;</p>
<h2>Introduction</h2>
<div>
<div class="peterkellnerpromo">If you have complex styling issues involving ASP.NET we are experts and might be able to help. This technique is fairly old however newer methods could be used for similar results. Contact Peter Kellner and his associates <a href="/contact">here</a>.</div>
<div>
<p>It's often the case that brilliant designers will make interfaces that are hard to implement using standard frameworks like ASP.NET.  As Software engineers striving for consistency, we always want to do the best we can with the standard tool kits to take advantage for built in functionality.  <a href="http://asp.net/" target="_blank">ASP.NET 2.0's</a> built in menu system is a perfect example.  If you use that menu system, you get to make very simple declarative site maps by simply using the <a href="http://weblogs.asp.net/scottgu/archive/2005/11/20/431019.aspx">ASP.NET 2.0 Site Navigation Features.</a></p>
<p>The requirement faced today has to do with building the web site for our <a href="http://www.siliconvalley-codecamp.com/" target="_blank">third annual code camp</a>.  We have that brilliant designer I mentioned above, and he has made a design that just seems too perfect to compromise.  Here are some screen shots of how the designer envisions the sight looking and working after it is completed.</p>
</div>
<p><!--more--></p>
<table width="800" border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="800">
<a href="/wp/wp-content/uploads/2008/05/css1.jpg"></p>
<p><img style="border-width: 0px;" alt="css1" src="/wp/wp-content/uploads/2008/05/css1-thumb.jpg" width="740" height="133" border="0" /></a>&nbsp;</td>
</tr>
<tr>
<td valign="top" width="800">
<a href="/wp/wp-content/uploads/2008/05/css2.jpg"></p>
<p><img style="border-width: 0px;" alt="css2" src="/wp/wp-content/uploads/2008/05/css2-thumb.jpg" width="741" height="121" border="0" /></a>&nbsp;</td>
</tr>
<tr>
<td valign="top" width="800">
<a href="/wp/wp-content/uploads/2008/05/css3.jpg"></p>
<p><img style="border-width: 0px;" alt="css3" src="/wp/wp-content/uploads/2008/05/css3-thumb.jpg" width="740" height="136" border="0" /></a>&nbsp;</td>
</tr>
<tr>
<td valign="top" width="800">
<a href="/wp/wp-content/uploads/2008/05/css4.jpg"></p>
<p><img style="border-width: 0px;" alt="css4" src="/wp/wp-content/uploads/2008/05/css4-thumb.jpg" width="741" height="124" border="0" /></a>&nbsp;</td>
</tr>
<tr>
<td valign="top" width="800">
<a href="/wp/wp-content/uploads/2008/05/css5.jpg"></p>
<p><img style="border-width: 0px;" alt="css5" src="/wp/wp-content/uploads/2008/05/css5-thumb.jpg" width="748" height="134" border="0" /></a>&nbsp;</td>
</tr>
</tbody>
</table>
<p>Notice the interesting behavior of the top menu (REGISTER;PROGRAM;NEWS;ABOUT AND WIKI).  Unselected, the bottom line strip is the same as selected.  When selected, the background of the selection changes to a different shade of the same color as the bottom strip.</p>
<p>Also notice the interesting behavior of the secondary menu. that is, when ABOUT is selected from the top menu, notice that the secondary menu shows: Contact;Venue;Organizers;Sponsors and Previous.  As you can see above (on the bottom of the 5 pictures), when Venu is selected, it is highlighted to in bright white to indicate that you have selected that.  The really cool part here is that the ABOUT on the primary menu stays highlighted when you choose different  secondary menu choices.</p>
<h2>Why Go Through The Trouble, why not just do it with HTML and CSS directly</h2>
<p>So, a reasonable person might say that since you can't easily get this behavior with the asp:menu control and the site map provider (OK, at least I couldn't figure it out), why not just code this up with simple list items, button clicks and a pile of code to react to those things?  Well, the answer is you can certainly do that.  The problem is the next time you want to do something similar you will find yourself doing a lot of cut and pasting.  Personally, whenever I find myself cutting and pasting a lot I know I should probably think about how to refactor the code to make it more reusable and therefore more reliable.</p>
<h2>What Are the Benefits of Using asp:menu and the site map providers</h2>
<p>I mentioned that there are benefits to using the asp:menu and site map providers.  What are those benefits you might ask.  Well, let me first show you what you have to do to set up a simple menu system using these, then list the benefits of what comes out.</p>
<h3>The Web.SiteMap</h3>
<p>First, you need to create a web.sitemap file in your web directory.  Here is what a simple one looks like similar to what will create the pictures above.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span><span class="kwrd">="utf-8"</span> ?<span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>   <span class="kwrd">&lt;</span><span class="html">siteMap</span> <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/AspNet/SiteMap-File-1.0"</span> <span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">      <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="Default.aspx"</span> <span class="attr">title</span><span class="kwrd">="HOME"</span> <span class="attr">description</span><span class="kwrd">="Silicon Valley CodeCamp 08"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="Register.aspx"</span> <span class="attr">title</span><span class="kwrd">="REGISTER"</span>  <span class="attr">description</span><span class="kwrd">=""</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="News.aspx"</span> <span class="attr">title</span><span class="kwrd">="NEWS"</span>  <span class="attr">description</span><span class="kwrd">=""</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="About.aspx"</span> <span class="attr">title</span><span class="kwrd">="ABOUT"</span>  <span class="attr">description</span><span class="kwrd">=""</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="Contact.aspx"</span> <span class="attr">title</span><span class="kwrd">="Contact"</span>  <span class="attr">description</span><span class="kwrd">=""</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="Sponsors.aspx"</span> <span class="attr">title</span><span class="kwrd">="Sponsors"</span>  <span class="attr">description</span><span class="kwrd">=""</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">siteMapNode</span> <span class="attr">url</span><span class="kwrd">="Previous.aspx"</span> <span class="attr">title</span><span class="kwrd">="Previous"</span>  <span class="attr">description</span><span class="kwrd">=""</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre>         <span class="kwrd">&lt;/</span><span class="html">siteMapNode</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">      <span class="kwrd">&lt;/</span><span class="html">siteMapNode</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>   <span class="kwrd">&lt;/</span><span class="html">siteMap</span><span class="kwrd">&gt;</span></pre>
</div>
<h3>The Web.Config</h3>
<p>You need to declare which sitemap provider you are using. In our case, we are simply reading from a file.  Then, you should (do not have to) declare a section for each web page you want to provide role access to.  Here is an example of my web.config. This first part says give access to any logged in user for Sponsors.aspx</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">location</span> <span class="attr">path</span><span class="kwrd">="Sponsors.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;</span><span class="html">system.web</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">authorization</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">deny</span> <span class="attr">users</span><span class="kwrd">="?"</span><span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="kwrd">&lt;/</span><span class="html">authorization</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;/</span><span class="html">system.web</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">location</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre><span class="kwrd">&lt;/</span><span class="html">configuration</span><span class="kwrd">&gt;</span></pre>
</div>
<p>The Second part defines the Site Map Provider and sets securityTrimming to true to only show pages the user has access to.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">system.web</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;</span><span class="html">siteMap</span> <span class="attr">defaultProvider</span><span class="kwrd">="XmlSiteMapProvider"</span> <span class="attr">enabled</span><span class="kwrd">="true"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>        <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="XmlSiteMapProvider"</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="attr">description</span><span class="kwrd">="SiteMap provider which reads in .sitemap XML files."</span></pre>
<p>&nbsp;</p>
<pre>        <span class="attr">type</span><span class="kwrd">="System.Web.XmlSiteMapProvider, System.Web, Version=2.0.0.0,... </span></pre>
<p>&nbsp;</p>
<pre class="alt">        siteMapFile="<span class="attr">web</span>.<span class="attr">sitemap</span><span class="kwrd">" securityTrimmingEnabled="</span><span class="attr">true</span>"<span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;/</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">siteMap</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre></pre>
</div>
<h3>The Master Page</h3>
<p>In your master page, you need to define your primary menu.  In our case, it is the one that displays: REGISTER;NEWS and ABOUT.  Here is all you need for that.</p>
<div class="csharpcode">
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">asp:Menu</span> <span class="attr">ID</span><span class="kwrd">="mainMenu"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span></pre>
<p>&nbsp;</p>
<pre>        <span class="attr">DataSourceID</span><span class="kwrd">="SiteMapMain"</span> <span class="attr">CssClass</span><span class="kwrd">="headLinksBar"</span>  <span class="attr">CssSelectorClass</span><span class="kwrd">="SimpleEntertainmentMenu"</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="attr">MaximumDynamicDisplayLevels</span><span class="kwrd">="0"</span> <span class="attr">StaticItemFormatString</span><span class="kwrd">="// {0} &amp;nbsp;&amp;nbsp;&amp;nbsp; "</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;/</span><span class="html">asp:Menu</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:SiteMapDataSource</span> <span class="attr">ID</span><span class="kwrd">="SiteMapMain"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">ShowStartingNode</span><span class="kwrd">="False"</span> <span class="kwrd">/&gt;</span></pre>
</div>
<h3>The Inherited Page (About.aspx For Example)</h3>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:Content</span> <span class="attr">ID</span><span class="kwrd">="SublinksSessions"</span> <span class="attr">ContentPlaceHolderID</span><span class="kwrd">="Sublinks"</span> <span class="attr">runat</span><span class="kwrd">="server"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;</span><span class="html">asp:Menu</span> <span class="attr">ID</span><span class="kwrd">="subMenu"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">DataSourceID</span><span class="kwrd">="SiteMapAbout"</span> <span class="attr">SkinID</span><span class="kwrd">="subMenu"</span>  <span class="attr">CssClass</span><span class="kwrd">="headLinksBar"</span></pre>
<p>&nbsp;</p>
<pre class="alt">    <span class="attr">CssSelectorClass</span><span class="kwrd">="SimpleEntertainmentMenu"</span>     <span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;/</span><span class="html">asp:Menu</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">asp:Content</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre></pre>
</div>
<h3>And the Benefits...</h3>
<ul>
<li>You have no .net code to write!</li>
<li>Adding new menu items as Primary or Secondary is easy</li>
<li>Security is completely taken care of</li>
<li>Menu Entries Automatically come and go based on User Permission</li>
</ul>
<h2>Not Using the <a href="http://www.codeplex.com/cssfriendly" target="_blank">CSS Friendly Adapters</p>
<p>&nbsp;</p>
<p></a></h2>
<p>If you do not use the CSS Friendly Adapter library, the menu render using tables.<br />
Below is what the actual HTML looks like of the main menu if I remove the</p>
<p><a href="http://www.codeplex.com/cssfriendly" target="_blank">CSS Friendly Adapters</a>.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="#ctl00_mainMenu_SkipLink"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">alt</span><span class="kwrd">="Skip Navigation Links"</span> <span class="attr">src</span><span class="kwrd">="/WebStyleOnly%20-%20Copy/WebResource.axd?d=G5"</span> <span class="attr">width</span><span class="kwrd">="0"</span> <span class="attr">height</span><span class="kwrd">="0"</span> <span class="attr">style</span><span class="kwrd">="border-width: 0px;"</span> <span class="kwrd">/&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">id</span><span class="kwrd">="ctl00_mainMenu"</span> <span class="attr">class</span><span class="kwrd">="headLinksBar ctl00_mainMenu_2"</span> <span class="attr">cssselectorclass</span><span class="kwrd">="SimpleEntertainmentMenu"</span> <span class="attr">cellpadding</span><span class="kwrd">="0"</span> <span class="attr">cellspacing</span><span class="kwrd">="0"</span> <span class="attr">border</span><span class="kwrd">="0"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>        <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">onmouseover</span><span class="kwrd">="Menu_HoverStatic(this)"</span> <span class="attr">onmouseout</span><span class="kwrd">="Menu_Unhover(this)"</span> <span class="attr">onkeyup</span><span class="kwrd">="Menu_Key(this)"</span> <span class="attr">id</span><span class="kwrd">="ctl00_mainMenun0"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">cellpadding</span><span class="kwrd">="0"</span> <span class="attr">cellspacing</span><span class="kwrd">="0"</span> <span class="attr">border</span><span class="kwrd">="0"</span> <span class="attr">width</span><span class="kwrd">="100%"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">style</span><span class="kwrd">="white-space: nowrap;"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                            <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">class</span><span class="kwrd">="ctl00_mainMenu_1"</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly%20-%20Copy/Register.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                                // REGISTER</pre>
<p>&nbsp;</p>
<pre class="alt">                            <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">style</span><span class="kwrd">="width: 3px;"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">onmouseover</span><span class="kwrd">="Menu_HoverStatic(this)"</span> <span class="attr">onmouseout</span><span class="kwrd">="Menu_Unhover(this)"</span> <span class="attr">onkeyup</span><span class="kwrd">="Menu_Key(this)"</span> <span class="attr">id</span><span class="kwrd">="ctl00_mainMenun1"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">cellpadding</span><span class="kwrd">="0"</span> <span class="attr">cellspacing</span><span class="kwrd">="0"</span> <span class="attr">border</span><span class="kwrd">="0"</span> <span class="attr">width</span><span class="kwrd">="100%"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">style</span><span class="kwrd">="white-space: nowrap;"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">class</span><span class="kwrd">="ctl00_mainMenu_1"</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly%20-%20Copy/News.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                            // NEWS</pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">style</span><span class="kwrd">="width: 3px;"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">onmouseover</span><span class="kwrd">="Menu_HoverStatic(this)"</span> <span class="attr">onmouseout</span><span class="kwrd">="Menu_Unhover(this)"</span> <span class="attr">onkeyup</span><span class="kwrd">="Menu_Key(this)"</span> <span class="attr">id</span><span class="kwrd">="ctl00_mainMenun2"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">cellpadding</span><span class="kwrd">="0"</span> <span class="attr">cellspacing</span><span class="kwrd">="0"</span> <span class="attr">border</span><span class="kwrd">="0"</span> <span class="attr">width</span><span class="kwrd">="100%"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">style</span><span class="kwrd">="white-space: nowrap;"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                            <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">class</span><span class="kwrd">="ctl00_mainMenu_1"</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly%20-%20Copy/About.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                                // ABOUT</pre>
<p>&nbsp;</p>
<pre class="alt">                            <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                        <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;/</span><span class="html">span</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre><span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
</div>
<p>The same code, when using the <a href="http://www.codeplex.com/cssfriendly" target="_blank">CSS Friendly adapters</a>, plus some clever additions that will be discussed later, has the html code looking like the following.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>    <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">="AspNet-Menu-Horizontal"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>            <span class="kwrd">&lt;</span><span class="html">ul</span> <span class="attr">class</span><span class="kwrd">="AspNet-Menu"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">li</span> <span class="attr">class</span><span class="kwrd">="AspNet-Menu-TopLevel-register"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                    <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly - Copy/Register.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                      REGISTER</pre>
<p>&nbsp;</p>
<pre>                     <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                <span class="kwrd">&lt;/</span><span class="html">li</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                 <span class="kwrd">&lt;</span><span class="html">li</span> <span class="attr">class</span><span class="kwrd">="AspNet-Menu-TopLevel-news"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                    <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly - Copy/News.aspx"</span><span class="kwrd">&gt;</span>NEWS<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;/</span><span class="html">li</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">li</span> <span class="attr">class</span><span class="kwrd">="AspNet-Menu-TopLevel-about-Selected"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                    <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="/WebStyleOnly - Copy/About.aspx"</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">                      ABOUT<span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>                <span class="kwrd">&lt;/</span><span class="html">li</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">            <span class="kwrd">&lt;/</span><span class="html">ul</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre>         <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre class="alt">     <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<pre> <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span></pre>
</div>
<p>You can see that the CSS adapter code is not only much smaller, but easier to read and because of the inserted class names, much easier to customize.</p>
<h2>Conclusions</h2>
<p>We have not made clear yet how the CSS Friendly Adapters will make the menu's work the way we want it to. We have shown css classes created (AspNet-Menu-TopLevel-about-Selected for example) are create by the custom code written by us in the CSS Friendly Adapter Project.  We have however talked about the menu control and showed an example of how the html is actually rendered, and what is rendered based on.  That is, the web.sitemap defines the menu and we have shown that.  In the next article, we will show details of the custom code we have in the CSS Friendly Adapter that solves the problem of how to highlight the menu choices based on what is clicked.</p>
</div>
