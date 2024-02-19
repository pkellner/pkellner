---
status: publish
published: true
pubDatetime: 2010-01-25T20:00:00.000Z
title: Authentication and Authorization Using RIA Services (Article 7 of 7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 484
wordpress_url: https://peterkellner.net/2010/01/25/authentication-and-authorization-using-ria-services-article-7-of-7/
date: '2010-01-25 16:25:12 -0800'
date_gmt: '2010-01-25 23:25:12 -0800'
categories:
- C#
- Silverlight
- Visual Studio 2010
- RIA Services
- VS2010
- ".NET 4.0"
- Entity Framework
tags:
- RIA Services Bay.Net Presentation
- RIA Service Presentation
---
<p>
<table width="90%">
<tbody>
<tr>
<td width="70">&nbsp;</td>
<td>Title Of Each Article</td>
<td width="150" style="width: 100px;">Video Included With Each Post</td>
</tr>
<tr>
<td width="70">Part 1</td>
<td><a href="/2010/01/20/riaservices-silverlight-4-tutorial-svcc-part1of7-introduction/">Introduction To RIA Services In Silverlight (This Article)</a></td>
<td width="150" style="width: 100px;">7 Minutes</td>
</tr>
<tr>
<td width="70">Part 2</td>
<td><a href="/2010/01/25/basic-ria-services-and-datagrid-with-vs-2010-tooling-article-2-of-7/">Basic RIA Services And DataGrid With&nbsp; VS 2010 Tooling</a></td>
<td width="150" style="width: 100px;">14 Minutes</td>
</tr>
<tr>
<td width="70">Part 3</td>
<td><a href="/2010/01/23/adding-a-datagrid-with-connect-the-dots-databinding-in-vs-2010-article-3-of-7/">Adding A DataGrid With Connect The Dots DataBinding in VS 2010</a></td>
<td width="150" style="width: 100px;">13 Minutes</td>
</tr>
<tr>
<td width="70">Part 4</td>
<td><a href="/2010/01/25/adding-a-navigation-page-to-a-silverlight-business-application-template-article-4-of-7/">Adding a Navigation Page to a Silverlight Business Application Template</a></td>
<td width="150" style="width: 100px;">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 5</td>
<td><a href="/2010/01/25/adding-speakers-page-template-with-converters-in-visual-studio-2010-beta2-article-5-of-7/">Adding Speakers Page Template With Converters In Visual Studio 2010 Beta2</a></td>
<td width="150" style="width: 100px;">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 6</td>
<td><a href="/2010/01/25/adding-a-sessions-page-that-includes-a-query-parameter-in-silverlight-vs2010-article-6-of-7/">Adding A Sessions Page That Includes a Query Parameter In Silverlight VS2010 Beta2</a></td>
<td width="150" style="width: 100px;">10 Minutes</td>
</tr>
<tr>
<td width="70">Part 7</td>
<td><a href="/2010/01/25/authentication-and-authorization-using-ria-services-article-7-of-7/">Basic Authentication and Authorization In RIA Services</a></td>
<td width="150" style="width: 100px;">5 Minutes</td>
</tr>
</tbody>
</table>
<p> 
<p>[media id=8]</p>
<p>This article is very short.&#160; In the actual presentation, there was not much time to talk about this so a brief overview was done.&#160; Basically, it’s all standard WCF stuff.&#160; The idea is that the Silverlight Business Template adds logging in and supports Authentication just like an asp.net application does.&#160; It uses the DomainDataSource to do the bridging between the silverlight clientside app, and the web application.&#160; Authorization is built into the login module also so that you can assign attributes to your domainservice classes to restrict access.</p>
<p> <!--more-->
<p>That is, if you only want people who are logged in able to access one of your methods, you simply tag it as follows with the [RequiresAuthentication] attribute.</p>
<p><a href="/FilesForWebDownload/AuthenticationandAuthorizationUsingRIASe_E1CB/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AuthenticationandAuthorizationUsingRIASe_E1CB/image_thumb.png" width="694" height="222" /></a></p>
<p>If you only want a certain logged in user role to be able to access a certain method, you tag it as follows</p>
<p><a href="/FilesForWebDownload/AuthenticationandAuthorizationUsingRIASe_E1CB/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AuthenticationandAuthorizationUsingRIASe_E1CB/image_thumb_3.png" width="710" height="151" /></a></p>
<p>This of course solve the server side only.&#160; On the client side, you need to call methods that are exposed through the domain data.&#160; <a title="http://www.silverlightshow.net/items/Silverlight-3-with-Ria-Authentication-service.aspx" href="http://www.silverlightshow.net/items/Silverlight-3-with-Ria-Authentication-service.aspx">http://www.silverlightshow.net/items/Silverlight-3-with-Ria-Authentication-service.aspx</a> discusses much of this on the client side.</p>
