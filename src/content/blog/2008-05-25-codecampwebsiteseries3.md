---
status: publish
published: true
pubDatetime: 2008-05-25T20:00:00.000Z
title: Creating a Theme For Each Year of Code Camp Using Skins in ASP.NETBuilding
  the New Code Camp Web Site (Part 3)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>In this post, we discuss how to use themes and skins together in an ASP.NET
  web site.  A complete example is shown including the web.config, a master page and
  the theme.skin file.  This is an ongoing series of the trials and tribulations of
  building a new code camp web site.</p>"
wordpress_id: 114
wordpress_url: https://peterkellner.net/2008/05/25/codecampwebsiteseries3/
date: '2008-05-25 15:17:56 -0700'
date_gmt: '2008-05-25 22:17:56 -0700'
categories:
- ASP.NET 3.5
- Best Practices
- Code Camp Web Site Series
- ASP.NET 2.0
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
<p> <br />
<h2>Introduction</h2>
<p>Creating themes for ASP.NET 2.0 is very easy if you follow the standard guidelines Microsoft gives us.&#160; Microsoft gives a pretty good discussion in the MSDN article    <br /> <a href="http://msdn.microsoft.com/en-us/library/ykzx33wh.aspx">ASP.NET Themes and Skins Overview</a>.&#160; I've read it several times but since I don't do this very often I keep forgetting the simple things.&#160; Recently,     <br /> <a href="http://forums.asp.net/t/1265904.aspx">I posted a question on ASP.NET forums</a> asking how to have an image automatically come from the correct theme directory.&#160; As usual, Dave Sussman     <br /> gave me the perfect answer.</p>
<p><em>&quot;You should store the images under the themes and set the ImageUrl in the skin file. Give the control a SkinID in both the skin file and in the page. When the theme changes the appropriate image will be used.&quot;</em></p>
<p>In this article, I'll basically explain his answer with an example using the code camp web site.</p>
<p> <!--more--> </p>
<h2>Code Camp Site Structure</h2>
<p>The Code Camp project has a very standard directory setup.&#160; In Visual Studio 2008, the solution explorer looks like this:    <br /> <a href="/wp/wp-content/uploads/2008/05/solu.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="solu" src="/wp/wp-content/uploads/2008/05/solu-thumb.png" width="372" height="301" /></a></p>
<p>Notice that I have two themes defined, Gray2008 and Gray2009.&#160; The reason for this is so when 2009 comes along and we want to change certain images that contain things like the Code Camp Date and Year, we don't have to do surgery on the asp.net pages, but simply change to the new theme and update the files there.&#160; This also keeps the code base intact so we don't have to branch our code for next year.&#160; All in all, a very clean solution.</p>
<h2>The Mechanics of Theme Changing and the Skin Definitions</h2>
<p>First, you have simple mention in your web.config file the name of the default theme you will be using.&#160; By doing that, it references the correct App_Themes sub directory. Our web.config looks like the following for this year which means we will be using the Gray2009 theme directory.</p>
<p><a href="/wp/wp-content/uploads/2008/05/webconfigtheme.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="webconfigtheme" src="/wp/wp-content/uploads/2008/05/webconfigtheme-thumb.png" width="479" height="73" /></a></p>
<p>Second, you need to mention a SkinId in any control you may use.&#160; In our case, we want to have the image on the upper right side of the code camp web site display the correct year.&#160; That is, on the home page we have something like this:</p>
<p><a href="/wp/wp-content/uploads/2008/05/actualpngforcc.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="actualpngforcc" src="/wp/wp-content/uploads/2008/05/actualpngforcc-thumb.png" width="498" height="134" /></a></p>
<p>The tag in the master page looks like this:</p>
<p><a href="/wp/wp-content/uploads/2008/05/imagetag.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="imagetag" src="/wp/wp-content/uploads/2008/05/imagetag-thumb.png" width="577" height="100" /></a></p>
<p>Notice the SkinId circled in green.&#160; Also notice that there is no ImageUrl defined in this tag.&#160; What happens next is that web site will look in the default theme's SkinFile.skin file (see the solution explorer above for this).&#160; In the App_Themes/Gray2008/SkinFile.skin file there is a reference that finds the actual image file that will be used.&#160; It reference it from the App_THemes/Gray2008/Images directory as follows:</p>
<p><a href="/wp/wp-content/uploads/2008/05/skinfile.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="skinfile" src="/wp/wp-content/uploads/2008/05/skinfile-thumb.png" width="586" height="108" /></a></p>
<p>And, that's it!&#160; Just by changing the theme in the web.config file, the correct image file will be displayed in the master page.&#160; The other nice thing is that design time support works also.&#160; You will see in the Visual Studio 2008 Designer the correct image based on where your web.config points.</p>
<h2>Conclusion</h2>
<p>In this article, we've shown the details of how to have a flexible design that    <br /> supports multiple theme files.&#160; Something we will use for years and years with     <br /> the new Code Camp web site.&#160; We also may decide to have different themes for     <br /> different types of users.&#160; That is, admin's may have a different theme than     <br /> normal users.&#160; We could also let users pick there own color styles by having     <br /> different themes.&#160; Lots of possibilities.</p>
<p>I hope this helps you.</p>
<p>&#160;</p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre {<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre {<br />
	margin: 0em;<br />
}<br />
.csharpcode .rem {<br />
	color: #008000;<br />
}<br />
.csharpcode .kwrd {<br />
	color: #0000ff;<br />
}<br />
.csharpcode .str {<br />
	color: #006080;<br />
}<br />
.csharpcode .op {<br />
	color: #0000c0;<br />
}<br />
.csharpcode .preproc {<br />
	color: #cc6633;<br />
}<br />
.csharpcode .asp {<br />
	background-color: #ffff00;<br />
}<br />
.csharpcode .html {<br />
	color: #800000;<br />
}<br />
.csharpcode .attr {<br />
	color: #ff0000;<br />
}<br />
.csharpcode .alt {<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum {<br />
	color: #606060;<br />
}</style>
