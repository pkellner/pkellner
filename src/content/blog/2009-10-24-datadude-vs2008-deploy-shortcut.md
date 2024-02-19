---
status: publish
published: true
pubDatetime: 2009-10-24T20:00:00.000Z
title: How to Automate a Simple Deploy Using DataDude (Visual Studio 2008 Database
  Edition)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 372
wordpress_url: https://peterkellner.net/2009/10/24/datadude-vs2008-deploy-shortcut/
date: '2009-10-24 08:38:15 -0700'
date_gmt: '2009-10-24 15:38:15 -0700'
categories:
- Visual Studio
- Database
tags: []
---
<p>Not sure why this was hard, but I wanted to make a trivial command file to deploy my database (or any change to it).&#160; For those of you that don’t know the <a href="/2009/01/17/visual-studio-database-edition-review-sqlserver2008/">DataDude project</a>, I have to say it’s one of the coolest tools that has come out the Microsoft Visual Studio Team for a while.&#160; Basically, in a nutshell, what it does is split’s your database into hundreds of little files.&#160; One for each table, key, foreign key, user, role, etc.&#160; Then, since it is a standard <a href="http://www.microsoft.com/visualstudio/en-us/products/teamsystem/default.mspx">VS2008</a> project, you can keep those files and the project under source control.&#160; The big benefit is that multiple team members can change files and check them in, and everyone’s schema is kept up to date.</p>
<p> <!--more-->
<p>So, how does the up to date work?&#160; the way it works is when you get the latest from your version control, you simply right click on the vs2008 project and say “Deploy”.</p>
<p><a href="/FilesForWebDownload/HowtoAutomateaSimpleDeployUsingDataDudeV_777E/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowtoAutomateaSimpleDeployUsingDataDudeV_777E/image_thumb.png" width="358" height="277" /></a></p>
<p>It’s kind of a hassle though because you have to open the project first, the don this.</p>
<p>Here is a simple one line cmd file that you can use to do this task for you.</p>
<pre class="csharpcode">C:\Windows\Microsoft.NET\Framework\v3.5\MSBuild.exe /t:Deploy 
  /p:Configuration=<span class="str">&quot;Debug&quot;</span>;Platform=<span class="str">&quot;Any CPU&quot;</span> /v:normal /m 
  <span class="str">&quot;data\ThreePLogicDatabase\ThreePLogicDatabase.dbproj&quot;</span>
pause</pre>
<p>
  </p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<pre class="csharpcode">That’s it!  hope this helps.</pre>
<p>
  </p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
