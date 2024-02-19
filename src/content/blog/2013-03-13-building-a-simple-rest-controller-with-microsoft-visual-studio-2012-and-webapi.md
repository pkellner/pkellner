---
status: publish
published: true
pubDatetime: 2013-03-13T20:00:00.000Z
title: Building a Simple REST Controller with Microsoft Visual Studio 2012 and WebAPI
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3488
wordpress_url: https://peterkellner.net/?p=3488
date: '2013-03-13 08:32:19 -0700'
date_gmt: '2013-03-13 15:32:19 -0700'
categories:
- C#
- WebAPI
- REST
- Visual Studio 2012
tags: []
---
<h2>Three Part Series</h2>
<h3>(Part 1)</h3>
<p>&#160;</p>
<table cellspacing="20" cellpadding="2" width="400" border="1">
<tbody>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/building-a-simple-rest-controller-with-microsoft-visual-studio-2012-and-webapi/">Building a Simple REST Controller with Microsoft Visual Studio 2012 and WebAPI</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-and-sencha-architect-2-2-build-a-simple-rest-client-to-feed-webapi-server/">Using Sencha ExtJS 4.2 and Sencha Architect 2.2, Build a Simple REST client (to feed WebAPI server)</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-sencha-architect-2-2-add-crud-to-rest-client-for-calling-microsoft-webapi-server/">Add CRUD to REST client for calling Microsoft WebAPI server</a></td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>REST can be a very loaded term that brings up lots of discussions of what it means.&#160; Just to mention a few sites that define it take a look at this list:</p>
<ul>
<li><a title="http://kellabyte.com/2011/09/04/clarifying-rest/" href="http://kellabyte.com/2011/09/04/clarifying-rest/">http://kellabyte.com/2011/09/04/clarifying-rest/</a> </li>
<li><a title="http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven" href="http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven">http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven</a> </li>
<li><a title="http://stackoverflow.com/questions/3821663/querystring-in-rest-resource-url" href="http://stackoverflow.com/questions/3821663/querystring-in-rest-resource-url">http://stackoverflow.com/questions/3821663/querystring-in-rest-resource-url</a> </li>
</ul>
<p>What is abundantly clear is there is not one clear concise explanation.&#160; That said, I’m going to try and explain how to implement a <a href="http://www.asp.net/web-api">Microsoft WebAPI</a> REST controller that is written with <a href="http://www.microsoft.com/visualstudio/eng/downloads#d-2012-editions">Microsoft Visual Studio 2012</a>.</p>
<p>First, you need to create the WebAPI controller.&#160; I created a separate directory called “api” in my VS project for this purpose.&#160; The dialog comes up as follows: (I chose “API controller with empty read/write actions” and renamed it to be TagsRest Controller.&#160; My default url will now be <a href="http://mywebsite.com/api/TagsRest">http://mywebsite.com/api/TagsRest</a>.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/03/image2.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb.png" width="335" height="224" /></a></p>
<p>By default, the following controller class is made for me.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/03/image3.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb1.png" width="301" height="361" /></a></p>
<p>&#160;</p>
<p>Surprising, I’m going to end the post here because we are really done.&#160; There are empty methods, which is OK because I did not mean to define an implementation with this post, just show how to create a WebAPI REST controller which I’ve done.</p>
<p>In the next post, I’ll show how to create a simple <a href="http://www.sencha.com/">Sencha</a> ExtJS application that consumes this REST service.</p>
