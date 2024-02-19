---
status: publish
published: true
pubDatetime: 2013-12-12T20:00:00.000Z
title: Hunting For And Finding The IIS Express Settings File
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3847
wordpress_url: https://peterkellner.net/?p=3847
date: '2013-12-12 13:00:02 -0800'
date_gmt: '2013-12-12 20:00:02 -0800'
categories:
- ASP.NET 4.5
- Visual Studio 2012
- IIS Express
- Visual Studio 2013
tags: []
---
<h2>Problem</h2>
<p>If you are like me, you use IIS Express for all your <a href="http://www.visualstudio.com/">Visual Studio 2013</a> (or 2012) Web Development (<a href="http://www.asp.net/">ASP.NET</a>).&#160; It’s always a pain when you need to change the config because the config file is buried in some very far away non-intuitive directory.</p>
<h2>Solution</h2>
<p>Now, if you look in your tray icon holding <a href="http://www.iis.net/learn/extensions/introduction-to-iis-express/iis-express-overview">IIS Express</a>, you’ll see an option that says Config and points to the file you need.&#160; If you click on the hyperlink, it opens the file!</p>
<p><a href="/wp/wp-content/uploads/2013/12/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb.png" width="419" height="372" /></a></p>
<p>Now, you can do things like remove a problem website (see details below) and let Visual Studio recreate it for you. I’m not sure how long this has been here but I like it!</p>
<pre class="lang:xhtml decode:true ">	&lt;application path=&quot;/&quot; applicationPool=&quot;Clr4IntegratedAppPool&quot;&gt;
		&lt;virtualDirectory path=&quot;/&quot; physicalPath=&quot;C:\_c\ModelBinding\DataBinding\DataBinding&quot; /&gt;
	&lt;/application&gt;
	&lt;bindings&gt;
		&lt;binding protocol=&quot;http&quot; bindingInformation=&quot;*:50060:localhost&quot; /&gt;
	&lt;/bindings&gt;
&lt;/site&gt;
&lt;site name=&quot;Application1LS.Server&quot; id=&quot;57&quot;&gt;
	&lt;application path=&quot;/&quot; applicationPool=&quot;Clr4IntegratedAppPool&quot;&gt;
		&lt;virtualDirectory path=&quot;/&quot; physicalPath=&quot;C:\_d\Application1LS\bin\Debug&quot; /&gt;
	&lt;/application&gt;
	&lt;bindings&gt;
		&lt;binding protocol=&quot;http&quot; bindingInformation=&quot;*:1344:localhost&quot; /&gt;
	&lt;/bindings&gt;
&lt;/site&gt;</pre>
<p>HTH’s!</p>
