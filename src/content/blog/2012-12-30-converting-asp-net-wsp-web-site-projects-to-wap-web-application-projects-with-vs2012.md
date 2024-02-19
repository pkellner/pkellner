---
status: publish
published: true
pubDatetime: 2012-12-30T20:00:00.000Z
title: Converting ASP.NET WSP (Web Site Projects) to WAP (Web Application Projects)
  with VS2012
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2422
wordpress_url: https://peterkellner.net/?p=2422
date: '2012-12-30 16:32:16 -0800'
date_gmt: '2012-12-30 23:32:16 -0800'
categories:
- ASP.NET 2.0
- Visual Studio
- ASP.NET 4.0
- ASP.NET MVC
tags: []
---
<p>&#160;</p>
<h2> Background</h2>
<p>There are quite a few articles written on the differences between WSP’s and WAP’s.&#160; In this article, I will not go into the details but just give you some clean mechanics necessary for converting pages using <a href="http://www.microsoft.com/visualstudio/eng/downloads">Visual Studio 2012</a>.&#160; Some of those articles are listed below.</p>
<p><a title="http://mitchelsellers.com/blogs/2008/01/02/wap-or-wsp-which-to-use-and-why.aspx" href="http://mitchelsellers.com/blogs/2008/01/02/wap-or-wsp-which-to-use-and-why.aspx">http://mitchelsellers.com/blogs/2008/01/02/wap-or-wsp-which-to-use-and-why.aspx</a></p>
<p><a title="http://vishaljoshi.blogspot.com/2009/08/web-application-project-vs-web-site.html" href="http://vishaljoshi.blogspot.com/2009/08/web-application-project-vs-web-site.html">http://vishaljoshi.blogspot.com/2009/08/web-application-project-vs-web-site.html</a></p>
<p><a title="http://aspnetresources.com/blog/web_site_vs_web_application_project_wap" href="http://aspnetresources.com/blog/web_site_vs_web_application_project_wap">http://aspnetresources.com/blog/web_site_vs_web_application_project_wap</a></p>
<p>When I was new to Visual Studio, I did choose WSP projects because it seemed easier. Now that I’ve done quite a bit more with <a href="http://www.asp.net/">ASP.NET</a>, I much prefer WAP projects.&#160; Actually, I hate WSP projects primarily because of the lack of a csproj file which makes building them in any kind of automated fashion a big problem.</p>
<p>&#160;</p>
<h2>How To Convert with VS2012</h2>
<p>For a more complete discussion, check out this post from Microsoft from 4 years ago.&#160; Most of it still applies, but for VS2012, the menus are a little different.</p>
<p><a title="http://blogs.msdn.com/b/webdev/archive/2009/10/29/converting-a-web-site-project-to-a-web-application-project.aspx" href="http://blogs.msdn.com/b/webdev/archive/2009/10/29/converting-a-web-site-project-to-a-web-application-project.aspx">http://blogs.msdn.com/b/webdev/archive/2009/10/29/converting-a-web-site-project-to-a-web-application-project.aspx</a></p>
<p>First, simply create a new Web Application Project.&#160; You do this by saying “Create New Project”, choose Web Site, then any of the choices remaining will create WAP’s.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/12/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/12/image_thumb1.png" width="427" height="303" /></a> </p>
<p>You need to add any special things you had with your WSA project’s Web.config to this new project (easier said then done, but necessary).&#160; Just make sure you don’t kill any of the modules or other important stuff in the new project.</p>
<p>Now, copy in all your web pages. You will just have two files from your WSA project.&#160; For example, Default.aspx and Default.aspx.cs</p>
<p><a href="/wp/wp-content/uploads/2012/12/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/12/image_thumb2.png" width="181" height="51" /></a> </p>
<p>Now, right click on “Default.aspx” and choose “Convert to Web Application”.</p>
<p><a href="/wp/wp-content/uploads/2012/12/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/12/image_thumb3.png" width="507" height="342" /></a> </p>
<p>You’ll get a prompt asking you if you want to convert to a Web Application Project:</p>
<p><a href="/wp/wp-content/uploads/2012/12/image4.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/12/image_thumb4.png" width="408" height="167" /></a> </p>
<p>You’ll of course say “Yes” and now you have the converted page with the extra Default.aspx.designer.cs which is needed for a WAP.</p>
<p><a href="/wp/wp-content/uploads/2012/12/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/12/image_thumb5.png" width="244" height="85" /></a> </p>
<p>Repeat this process on all your pages, be careful of things like user controls, and you are done!</p>
<p>HTH’s.</p>
