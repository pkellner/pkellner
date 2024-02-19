---
status: publish
published: true
pubDatetime: 2011-03-05T20:00:00.000Z
title: Hosting The Same Windows Azure Web Project With Two Different Configurations
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1437
wordpress_url: https://peterkellner.net/2011/03/05/hosting-the-same-windows-azure-web-project-with-two-different-configurations/
date: '2011-03-05 11:50:22 -0800'
date_gmt: '2011-03-05 18:50:22 -0800'
categories:
- hosting
- Azure
- Azure Web Role
- Azure Deployment
tags: []
---
<h2>The Problem</h2>
<p>In my scenario, I have the same web project that I want to host in two different <a href="http://www.microsoft.com/windowsazure/">Windows Azure</a> Data Centers (BTW, <a href="http://blog.smarx.com/">Steve Marx</a> let me know it’s “Windows Azure” and not “Azure” at MVP Summit so I’ll try and keep my terminology right as much as I can).&#160; Each <a href="http://www.computerworld.com/s/article/9118207/Microsoft_to_support_Windows_Azure_with_massive_data_center_investments">Windows Azure Data Center</a> has it’s own azure account (Azure Credential).&#160; It resolves to a different domain name and as part of that scenario, has different properties in the ServiceConfiguration.csfg file.</p>
<p>&#160;</p>
<p>  <!--more-->
<p>&#160;</p>
<h2>What Happens By Default</h2>
<p>When you create a new Azure WebRole, the wizard automatically creates a web project for you.&#160; In my case, that is fine for the first datacenter deployment, but what about the second?&#160; In this post (hopefully, as I’m blogging as I’m doing it), I will show you how to create multiple deployments of the same web project.&#160; Below is a screen shot of what my project looks like out of the box.</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb.png" width="339" height="206" /></a></p>
<p>&#160;</p>
<h2>Adding Another Web Role Pointing At Same Web Project</h2>
<p>So, here we go.</p>
<p>First, add a new cloud project / web role as follows:</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_3.png" width="340" height="155" /></a></p>
<p>&#160;</p>
<p>Add the project:</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_4.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_4.png" width="349" height="284" /></a></p>
<p>Add the Web Role</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_5.png" width="346" height="226" /></a></p>
<p>Now, associate this role with the original web project “Web” and notice that a new web site has been created by the previous step. Our plan will be to delete the one that just go created.</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_6.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_6.png" width="415" height="271" /></a></p>
<p>That seems to have worked, so now let’s remove the WebRole1 project and then delete it from the directory.</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_7.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_7.png" width="265" height="561" /></a></p>
<p>Now, I believe we have what we want as shown below.</p>
<p><a href="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_8.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Hosting-The-Same-Azure-Web-Project-With-_9409/image_thumb_8.png" width="303" height="248" /></a></p>
<p>The final thing I need to do is simply update my ServiceConfiguration and ServiceDefinition files with what I want that is specific to AzureWebRoleConnectionRoadCom.</p>
<p>My plan is to do this for all my different deployments of the same project.&#160; If things don’t continue to go swimmingly, I’ll add some notes to this post to indicate that maybe this wasn’t the best possible plan, but for now, I’m keeping my fingers crossed that this will work.</p>
