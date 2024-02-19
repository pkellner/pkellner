---
status: publish
published: true
pubDatetime: 2010-05-31T20:00:00.000Z
title: In IE8, When File Download Completes, No Save Dialog Appears
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1324
wordpress_url: https://peterkellner.net/2010/05/31/ie8-file-save-not-showing-tools-options-advanced/
date: '2010-05-31 18:03:54 -0700'
date_gmt: '2010-06-01 01:03:54 -0700'
categories:
- IE8
tags: []
---
<p>For quite some time now, when I download file using <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">IE8</a>, the file finishes downloading and there is no pop up that allows me to open the containing folder, or open the file itself.&#160; I’ve had to navigate to the folder where I selected the download to go, then open it from there.&#160; This has been very annoying.&#160; I’ve looked around the internet for the reason for this with no luck.</p>
<p> <!--more-->
<p>Today, I finally figured it out.&#160; The answer is in <a href="http://msdn.microsoft.com/en-us/ie/cc405106.aspx?WT.srch=1">Tools/Internet Options/Advanced</a>, “Notify When Download Completes”.</p>
<p><a href="/FilesForWebDownload/InIE8WhenFileDownloadCompletesNoSaveDial_FE00/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InIE8WhenFileDownloadCompletesNoSaveDial_FE00/image_thumb.png" width="341" height="436" /></a> </p>
<p>When you have that checkbox selected, after the download completes, you get this dialog (which I believe was the default behavior before I must have changed it).</p>
<p><a href="/FilesForWebDownload/InIE8WhenFileDownloadCompletesNoSaveDial_FE00/image_3.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InIE8WhenFileDownloadCompletesNoSaveDial_FE00/image_thumb_3.png" width="244" height="194" /></a> </p>
<p>That’s all for now.&#160; I hope you found this before early in your search for this answer.</p>
