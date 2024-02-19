---
status: publish
published: true
pubDatetime: 2007-06-18T20:00:00.000Z
title: Integrating Web Services and Silverlight with .Net 1.1 Alpha
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This article gives you a step by step of how to build a Silverlight .net
  Alpha 1.1 project that includes a web service.  Its real goal is to help you set
  up an environment that lets you debug in spite of the cross domain security issues
  you will ultimately run into.</p>"
wordpress_id: 65
wordpress_url: https://peterkellner.net/2007/06/18/silverlightdebugwebservicedotnet/
date: '2007-06-18 18:18:25 -0700'
date_gmt: '2007-06-19 01:18:25 -0700'
categories:
- Silverlight
tags: []
---
<h2>The Short Story:</h2>
<p>So, I'm working on a Silverlight .net project where the main source of data is a webservice.&#160; It's not a huge amount of data, but it is not small either. In general it's about 20K to 50K per download.&#160; My original plan was to use the <a href="http://www.silverlight.net/QuickStarts/Remote/default.aspx">quickstart method</a> (POX) and basically parse the xml using the XMLReader classes that are available on Silverlight.&#160; That didn't work so well for     <br />me, so I switched to the proxy classes and did not have much more luck. The primary problem is I could not figure out how to debug the code on the Silverlight side.&#160; Ultimately, I ended up figuring out how to do debugging and in the next few paragraphs I'll go through the steps including screen shots showing how to do it.</p>
<p> <!--more--><br />
<h2>The Details</h2>
<h3>The Solution</h3>
<p>So, let's start from the beginning.&#160; First thing to do is create an empty solution.&#160; In my case, I'm going to call that solution SearchLightMain.&#160; I'm going to use Orcas rather than vs2005 because that is required for Silverlight. Ultimately, the web services project will deploy on .net 2.0 but the development envirnoment is still Orcas.&#160; (File/New Project/Other Project Types/Empty Solution)</p>
<h3>The Silverlight Side</h3>
<p>Next, right mouse on the solution explorer and choose Add/New Project/C#/Silverlight.&#160; Leave your solutions directory in the Location textbox and put the name of your silverlight project in the name field.&#160; In my case, the name will be SearchLight.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug1.jpg" />&#160;</p>
<p>After the project is created, my preference is to add a textblock to the page.xaml file and some color to the background so when I run it I can tell it is actually working.&#160; Here is what it looks like now&#160; after I've done that if right mouse and run TestPage.html.&#160; This is what you get.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug2.jpg" /></p>
<p>And the Xaml looksl like this:</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug3.jpg" /></p>
<p>Now you have the silverlight project done.&#160; Let's create the Web Service Project now inside of the same solution we made first.</p>
<h3>The Web Service</h3>
<p>On the solution explorer, right click on the top of the tree (solution) and say &quot;Add/New Website&quot;.&#160; Choose ASP.NET web site.&#160; (remember, this is Orcas we are still in).&#160; Make it a &quot;File System&quot;, &quot;C#&quot; project. and for the location put the directory where you have your empty solution followed by the name WebService.&#160; In my case, the name is: C:UserspkellnerDocumentsVisual Studio Codename OrcasProjectsSearchLightMainWebService&#160; Also, change the framework to .NET Framework 2.0 in the upper right hand corner of the screen &quot;Add New Website&quot;.</p>
<p>Now, your solution explorer should look like this:</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug4.jpg" /></p>
<p>And, the layout on your hard disk will look like this:</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug5.jpg" /></p>
<p>Now, we need to make the web service.&#160; The easiest thing to do is grab the code from the quickstart and paste it into a webservice if you don't have your own.&#160; The URL where you can grab the code is:&#160; <br /><a href="http://www.silverlight.net/QuickStarts/Remote/UsingJSON.aspx">     <br />http://www.silverlight.net/QuickStarts/Remote/UsingJSON.aspx</a></p>
<p>One thing I found was that if you downgrade to .net 2.0 from .net 3.5 as we did earlier, the webservices that use the tag [System.Web.Script.Services.ScriptService] do not work. My solution was to create an Ajax enabled web site with vs2005 and copy that web.config into this project.</p>
<p>Continuing on, the next thing I did was to copy the files TestPage.html, TestPage.html.js and Silverlight.js from the SearchLight project into the WebService project.&#160; This is because we will actually be running the project from the webservices project.</p>
<p>Finally, to complete the linking, right click on the webservice project and select &quot;Add Silverlight Link...&quot; (not sure what the ... means).&#160; Here is what it looks like.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug6.jpg" /></p>
<p>&#160;</p>
<p>Now, do a Build/Rebuild all and the xaml files from your silverlight project as well as the ClientBin directory will be imported (copied) into your web services project.&#160; Here is what we have now.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug7.jpg" /></p>
<p>Now, verify that your web service actually works by right mousing on the asmx file and pressing browse.&#160; If it's working, you should be able to run it and get a screen something like this.</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug8.jpg" /></p>
<p>The next step is not what you are expecting.&#160; The quickstart says go ahead and create a web reference and run that.&#160; That's great as long as you don't want to run this project on a real server (port 80).&#160; Best I can tell, it hardwires the port to whatever the debugger is set to.&#160; I tried without much luck to change the property in the localhost control created but    <br />without much luck.&#160; I believe a better solution is to run the tool called slwsdl.exe which is part of the orcas distribution.&#160; essentially, you run it with the /SilverlightClient option and point it at your web service. for example, when I ran mine, the command was:</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebug9.jpg" /></p>
<p>This created a file called WebService.cs which I put in my silverlight project.&#160; It becomes my proxy.&#160; The nice thing is I can modify the line that reaches out to the webservice to be whatever I want.&#160; By default it is the local server with the debug port set, but when I deploy to a real server I can change that address to the real name.&#160; Here is the code you    <br />change:</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebuga.jpg" /></p>
<p>Finally, now you can debug.</p>
<p>Go to your SearchLight project and add some code to the Page.xaml.cs file.&#160; then, run the project from the webservice/testpage.html and vwala!&#160; You can debug.&#160; Here is proof (really, not bull).</p>
<p><img src="/wp/wp-content/uploads/2007/06/sldebugb.jpg" /></p>
<h2>Final thoughts</h2>
<p>So, why go through all this trouble?&#160; It think I forgot to mention that it's to avoid the dreaded Cross-Domain issue.&#160; That is, your Silverlight client can not call a webservice that is not in the same root domain and running on the same port as your silverlight app.&#160; Also, while I was writing this article to help others avoid some of the pain I've been through, I put a project    <br />together from scratch.&#160; A couple things I noticed along the way.</p>
<ul>
<li>When you copy xaml files from one project to another, you can no longer run them.&#160; You need to change their property from Silverlight Page to Embedded Property or the page can not be read in it's codebehind. </li>
<li>It's very important to go to debug/exceptions and turn on all exceptions, otherwise you will not know what is killing your app (see      <br />previous item). </li>
<li>It's a cold cruel world out there on the bleeding edge. </li>
</ul>
<p>Good luck with your Silverlight development.&#160; There are lots of opportunities out there.&#160; Indeed, a target rich environment.</p>
