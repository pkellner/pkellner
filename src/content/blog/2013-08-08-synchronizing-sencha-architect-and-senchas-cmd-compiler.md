---
status: publish
published: true
pubDatetime: 2013-08-08T20:00:00.000Z
title: Synchronizing Sencha Architect and Sencha&rsquo;s CMD Compiler
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3701
wordpress_url: https://peterkellner.net/?p=3701
date: '2013-08-08 10:20:53 -0700'
date_gmt: '2013-08-08 17:20:53 -0700'
categories:
- ASP.NET 2.0
- Sencha
- Sencha
- Sencha Architect 2
- ExtJS
tags: []
---
<p>Phil Strong has an <a href="http://www.sencha.com/forum/showthread.php?246508-Architect-Sencha-Cmd">excellent article</a> on how to update an existing <a href="http://www.sencha.com/products/architect">Sencha Architect</a> (SA) project so that it will work with Sencha’s CMD compiler.  Basically, the problem is that SA and CMD do not agree on where the app.js should be by default.  This article will give you a recipe to do a file/save as from SA and then turn that new directory with the SA project into a place where you can, from the command prompt say: “sencha app build production” or “sencha app build testing” to generate a completely optimized version of your web app for deployment.</p>
<p>For those that don’t know what either is, Sencha Architect is an awesome tool that Sencha started working on literally 4 years ago and finally released about a year ago.  It’s a beautiful tool (not free, but not crazy expensive) that allows you to visually design and build your Sencha applications (both ExtJS and Sencha Touch).</p>
<p><a href="/wp/wp-content/uploads/2013/08/image3.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb3.png" width="276" height="189" border="0" /></a></p>
<p>CMD is a standalone command line tool that allows you to build your Sencha apps and basically do all the JavaScript optimizations and minimizations along with doing the same for CSS.  It takes you Sencha App and basically makes it load with a minimal number of files being downloaded over the wire.</p>
<p><a href="/wp/wp-content/uploads/2013/08/image4.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb4.png" width="287" height="188" border="0" /></a></p>
<h2></h2>
<h2>The Steps</h2>
<ul>
<li>Open your SA project and do a File SaveAs to a new empty directory</li>
<li>CD (change directory) from a DOS prompt into your Sencha Source route directory such as “C:\VCProject\SVCodeCampWeb\WebAPI\ext-4.2.1.883”</li>
<li>Tricky Step:  Following <a href="http://www.sencha.com/forum/showthread.php?246508-Architect-Sencha-Cmd">Phil’s article</a> find the sencha.cfg file in your new SA project directory (in my case …\DashboardDev\.sencha\app\sencha.cfg and fix the line that points to app.js in the /app directory to point at the file in the root of your project directory.  In other words "app.classpath=${app.dir}/app,${app.dir}/app.js” becomes  “app.classpath=${app.dir}/app.js,${app.dir}/app”.</li>
<li>Remove the app.js file inside the app directory</li>
<li>Make sure your index.html reference app.js and not app/app.js</li>
<li>Execute the command from the DOS prompt “sencha generate app App C:\VCProject\SVCodeCampWeb\WebAPI\ExtJsAppsSrc\DashboardDev” where the directory name at the end is where you did the file Save As in the first step and “App” (not app) is the name of your application as found in the app.js file attribute name:</li>
</ul>
<p>&nbsp;</p>
<p>That's it.  Now, you should be able to continue to develop with SA and CMD.</p>
