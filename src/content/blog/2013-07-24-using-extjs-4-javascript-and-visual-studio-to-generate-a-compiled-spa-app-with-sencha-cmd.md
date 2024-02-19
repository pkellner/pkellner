---
status: publish
published: true
pubDatetime: 2013-07-24T20:00:00.000Z
title: Using ExtJS 4, JavaScript, And Visual Studio to Generate a Compiled SPA App
  with Sencha CMD
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3683
wordpress_url: https://peterkellner.net/?p=3683
date: '2013-07-24 18:49:24 -0700'
date_gmt: '2013-07-25 01:49:24 -0700'
categories:
- Sencha
- SenchaMVC
- ExtJS
tags: []
---
<p>&#160;</p>
<p>Here are the simple steps to start a fresh <a href="https://www.sencha.com/" target="_blank">ExtJS</a> 4 MVC project and then use CMD to create a deployment package.&#160; I’m using <a href="https://en.wikipedia.org/wiki/Microsoft_Visual_Studio" target="_blank">Visual Studio</a> <a href="http://www.asp.net/web-api" target="_blank">WebAPI</a> as my server but you could use any for this.&#160; Here are the steps.</p>
<p>1.&#160; Expand out your ExtJS distribution into some directory.&#160; In my case, that directory is C:\VCProject\SVCodeCampWeb\WebAPI\ext-4.2.1.883</p>
<p>2.&#160; Create a Visual Studio WebAPI project and copy the path of the root of the project (web site) into some place you can pull it from (paste buffer is my suggestion).&#160; In my case, this is&#160; C:\VCProject\SVCodeCampWeb\WebAPI</p>
<p>3.&#160; Install Sencha’s CMD SDK from their web site and also make sure you have ruby and compass installed (directions on Sencha’s web site for this)</p>
<p>4.&#160; Navigate to your ExtJS distribution from step 1 above with your DOS prompt</p>
<p>5.&#160; From the DOS prompt in your ExtJS distribution directory, enter the following command:</p>
<p>C:\VCProject\SVCodeCampWeb\WebAPI\ext-4.2.1.883&gt;sencha generate app MyApp C:\VCP    <br />roject\SVCodeCampWeb\WebAPI\CMDBUG1</p>
<p>This will create a complete ExtJS MVC project in your directory mentioned above. You should have a directory now that looks something like this (in Visual Studio)</p>
<p><a href="/wp/wp-content/uploads/2013/07/image3.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/07/image_thumb3.png" width="200" height="409" /></a> </p>
<p>Then, if you browse to the index.html, you will get a sample extjs web site working (but not yet compiled) as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/07/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/07/image_thumb4.png" width="458" height="229" /></a> </p>
<p>Next, from a DOS prompt inside the web site folder root, do the command:</p>
<p>sencha app build testing</p>
<p><a href="/wp/wp-content/uploads/2013/07/image5.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/07/image_thumb5.png" width="420" height="92" /></a> </p>
<p>(replace the word testing with production to build a minified version)</p>
<p>When completed, you should see a screen something like this:</p>
<p><a href="/wp/wp-content/uploads/2013/07/image6.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/07/image_thumb6.png" width="423" height="259" /></a> </p>
<p>go ahead and run </p>
<p>Sencha app build production also.&#160; You now have two directories where your built files are.&#160; See the picture next:</p>
<p><a href="/wp/wp-content/uploads/2013/07/image7.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/07/image_thumb7.png" width="211" height="244" /></a> </p>
<p>You now can run index.html from either CMDBUG1\MYApp\production or from CMDBUG1\MYApp\testing</p>
<p>Go forth and start modifying files and remember to keep building often at least testing so that if you break anything in the process, you’ll know what you did.&#160; And, keep lots of revisions in version control (just sayin…).</p>
<p>HTH’s!</p>
