---
status: publish
published: true
pubDatetime: 2009-11-10T20:00:00.000Z
title: Combining JavaScript and CSS to Make Pages Load Faster
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 380
wordpress_url: https://peterkellner.net/2009/11/10/javascript-minify-csharp-css/
date: '2009-11-10 13:26:03 -0800'
date_gmt: '2009-11-10 20:26:03 -0800'
categories:
- C#
- JavaScript
tags: []
---
<p> We are in the process of “speeding up” our <a href="http://extjs.com">ExtJS</a> application.&#160; I’m just finally figuring out the rules of the road for doing this.&#160; Here are a couple of rules I believe to be true</p>
<ul>
<li>Combine and Minify All JavaScript </li>
<li>Combine All CSS that are in the same directory (because of relative paths) </li>
<li>Put the CSS above the <a href="http://www.javascript.com/">JavaScript</a> includes </li>
</ul>
<p>We are using a library <a title="http://atashbahar.com/post/Combine-minify-compress-JavaScript-files-to-load-ASPNET-pages-faster.aspx" href="http://atashbahar.com/post/Combine-minify-compress-JavaScript-files-to-load-ASPNET-pages-faster.aspx">http://atashbahar.com/post/Combine-minify-compress-JavaScript-files-to-load-ASPNET-pages-faster.aspx</a> and it’s working well for us.&#160; This project does a nice job of calling a minifier, gzipping and caching.</p>
<p>Hoe this helps!</p>
