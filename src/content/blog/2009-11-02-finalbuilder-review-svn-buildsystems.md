---
status: publish
published: true
pubDatetime: 2009-11-02T20:00:00.000Z
title: I Love FinalBuilder from VSoft Technologies!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 376
wordpress_url: https://peterkellner.net/2009/11/02/finalbuilder-review-svn-buildsystems/
date: '2009-11-02 17:47:51 -0800'
date_gmt: '2009-11-03 00:47:51 -0800'
categories:
- C#
- Visual Studio
- Sql Server 2008
- Version Control
- Build Products
tags: []
---
<p>&#160;</p>
<p>For the past couple years, I’ve used a product called FinalBuilder from <a href="http://www.finalbuilder.com/home.aspx">VSoft Technologies</a> to automate my build processes.&#160; Since I’ve been building web sites (about the past 5 years or so), one of the biggest hassles is maintaining them.&#160; That is, updating the databases, deploying the web site, automating backups, etc.&#160; I’ve used several products like <a href="http://www.finalbuilder.com/home.aspx">FinalBuilder</a> (including Cruise Control), and to be honest, none of them come close to the quality of FinalBuilder.</p>
<p>Basically, the way the product works is that you create a “project” file using the FinalBuilder IDE.&#160; That project file has “Actions” in it which do things like “ftp” files to servers, rename files, iterate over sql scripts, parse and update files, checkout from source control, as well as hundreds of other convenient functions.&#160; You then execute that “script” file and all the magic happens.</p>
<p><a href="/FilesForWebDownload/ILoveFinalBuilderfromVSoftTechnologies_11360/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ILoveFinalBuilderfromVSoftTechnologies_11360/image_thumb.png" width="244" height="181" /></a></p>
<p> <!--more-->
<p>Then, VSoft has another product called FinalBuilder Server, which is really an asp.net web site that you run on your server.&#160; That running web site can take one of your FinalBuilder scripts, and run it through a really nice dashboard (web page). </p>
<p><a href="/FilesForWebDownload/ILoveFinalBuilderfromVSoftTechnologies_11360/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ILoveFinalBuilderfromVSoftTechnologies_11360/image_thumb_3.png" width="244" height="140" /></a></p>
<p>In my current scenario, I have 5 different web sites I can publish simply by pushing a button.&#160; I log into the web page (dashboard), press “Start Build”, and behind the scenes this is what happens:</p>
<ul>
<li>A new temporary directory is created </li>
<li>All My source code is exported from <a href="http://subversion.org/">subversion</a> into that directory </li>
<li>All My Visual Studio Solutions are built </li>
<li>All the config files (web.config,app.config, etc.) are updated with appropriate parameters (connection strings, etc.) </li>
<li>The Web Site is copied to the correct location </li>
<li>A Backup of the source is created an zipped into an archive directory </li>
<li>The temporary directory and all it’s files are deleted </li>
</ul>
<p>Of course, I really do more than this, but you get the basic idea.&#160; It’s wonderful.&#160; It’s not free, but worth every penny (not to mention the support is awesome).</p>
<p>Hope you get a chance to try it.&#160; Here is a link to their site:</p>
<p><a title="http://www.finalbuilder.com/home.aspx" href="http://www.finalbuilder.com/home.aspx">http://www.finalbuilder.com/home.aspx</a></p>
