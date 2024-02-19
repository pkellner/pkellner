---
status: publish
published: true
pubDatetime: 2012-10-19T20:00:00.000Z
title: Building .Net Libraries For Both Xamarin&rsquo;s MonoDevelop and Visual Studio
  2012
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2275
wordpress_url: https://peterkellner.net/?p=2275
date: '2012-10-19 01:38:19 -0700'
date_gmt: '2012-10-19 08:38:19 -0700'
categories:
- Mono
- MonoTouch
- Xamarin
- vmware
tags: []
---
<p>I’ve recently been experimenting doing native development with <a href="http://xamarin.com/">Xamarin’s</a> <a href="http://xamarin.com/monotouch">MonoTouch</a>.&#160; The idea is that I can leverage the C# code I’ve written for other projects as well as my knowledge of C# and the .Net framework to develop native IOS (IPhone and IPad) applications.&#160; To begin, I need some core data access layers and have decided to use SqlLite and a standard access layer wrapping.&#160; I plan on doing more posts on this, but for now, I thought I would post what I have found since it has taken me quite a while to figure out just the basics.</p>
<p>So, in list format, here are my findings</p>
<ol>
<li>Create Class Library Projects Only (csproj) and always create the with <a href="http://www.microsoft.com/visualstudio/eng">Visual Studio</a> (not <a href="http://monodevelop.com/">MonoDevelop</a>)</li>
<li>Use .net 4.0 as base</li>
<li>Using <a href="http://www.vmware.com/products/fusion/overview.html">VMWare</a> on the MAC, create the projects on a VMWare share (Z:\…)</li>
<li>Create a simple console project for testing on MonoDevelop</li>
<li>Create a unit test project for testing on Visual Studio</li>
<li>Choose “preserve line endings” when prompted in MonoDevelop</li>
<li>Solution Files to not share, just csproj files</li>
</ol>
<p>Just some tips here.&#160; More to come.</p>
