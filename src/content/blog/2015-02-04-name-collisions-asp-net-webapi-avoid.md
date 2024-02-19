---
status: publish
published: true
pubDatetime: 2015-02-04T20:00:00.000Z
title: Name Collisions with Asp.Net Webapi and How to Avoid
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4170
wordpress_url: https://peterkellner.net/?p=4170
date: '2015-02-04 09:19:56 -0800'
date_gmt: '2015-02-04 16:19:56 -0800'
categories:
- C#
- Visual Studio
- ASP.net
- ASP.NET 4.5
- WebAPI
tags: []
---
<p>I love the simplicity of using ASP.NET WebAPI for building simple web rest services.&#160; No special calls to create JSON, simple REST conventions implemented with the methods GET,POST,PUT and DELETE and very straight forward interfaces.</p>
<p>The thing that annoys me is the naming convention.&#160; In my case, I’ve create a folder /rest on my web server and I put all my WebAPI controllers there.&#160; An example of a controller looks as follows:</p>
<pre lang="c#"> 
public class FaqController : ApiController
    {
        public HttpResponseMessage Get(int? id = null, string urlPart = null, int? arrayonly = null)
        {</pre>
<p>&#160;</p>
<p>The problems comes up when you decide you want to have a different FAQ controller for different parts of the web site.&#160; The obvious solution is to drop the REST services into sub directories.&#160; Unfortunately, since the class name above does not change, you have conflict.&#160; I’m guessing there is some attribute to solve this but it just feels clunky to me.</p>
