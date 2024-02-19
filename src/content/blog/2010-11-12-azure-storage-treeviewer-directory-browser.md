---
status: publish
published: true
pubDatetime: 2010-11-12T20:00:00.000Z
title: Building a Simple Azure Blob Tree Viewer With Azure StorageClient API
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1410
wordpress_url: https://peterkellner.net/2010/11/12/azure-storage-treeviewer-directory-browser/
date: '2010-11-12 18:36:30 -0800'
date_gmt: '2010-11-13 01:36:30 -0800'
categories:
- C#
- ".NET 4.0"
- Azure
- Azure Blob Storage
- StorageClient
tags: []
---
<p>Understanding how <a href="http://msdn.microsoft.com/en-us/windowsazure/cc974146.aspx">Azure</a> <a href="http://www.microsoft.com/windowsazure/storage/default.aspx">Blob Storage</a> can be used to simulate directory structures is a little tricky to say the least.&#160; I’ve got a long <a href="http://social.msdn.microsoft.com/Forums/en-US/windowsazuredata/thread/256cfc0f-bccc-4bf7-b7eb-cb7c7aca0c8a">forum thread</a> on the Windows Azure Community site&#160; now discussing the details.&#160; As always, <a href="http://blog.smarx.com/">Steve Marx</a> has been a big help here with a bunch of code. Steve’s got a great blog where he provides lots of examples and insights.&#160; Neil Mackenzie has also contributed here to getting to the answer.</p>
<p>Just so we now have an example, I’ve put together a simple windows form app that let’s you set a few variables in your app.config to point at your azure storage and container, let you view your app as a tree as well as see the code how it can be done.&#160; I have not commented the code much, just thought it would be good to get it out there.&#160; The running application shows you the data as follows.</p>
<p><a href="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/image.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/image_thumb.png" width="341" height="254" /></a></p>
<p>  <!--more-->
<p>So, for the details, I’m pasting below the meet of the code.&#160; Basically, it does what you would expect in terms of iterating through the directories recursively to build the list.&#160; Again, just set your parameters in your app.config as follows:</p>
<p><a href="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/image_3.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/image_thumb_3.png" width="281" height="115" /></a></p>
<p>and you can run it for yourself and see how it goes.</p>
<p>I’m pasting some code below, as well as including the project source code.&#160; The main reason I’m pasting the code is so that the search engines can find it better.&#160; It’s really just easier to download the project and load it into <a href="http://www.microsoft.com/visualstudio/en-us/visual-studio-2010-launch?WT.mc_id=SEARCH&amp;WT.srch=1">Visual Studio 2010</a> and run it yourself.</p>
<p>&#160;</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:40251c5f-e5d4-447d-80ca-5c6ba51b4cef" class="wlWriterEditableSmartContent">
<div>Visual Studio 2010   <a href="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/AzureBlobTreeViewer_3.zip" target="_self">AzureBlobTreeViewer.zip</a></div></p>
</div>
<p>&#160;</p>
<p>Good Luck, and hope this helps!</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:6a0a0214-7d94-482e-9b3f-436063c63866" class="wlWriterEditableSmartContent">
<div>Visual Studio 2010   <a href="/FilesForWebDownload/Building-a-Simple-Azure-Blob-Tree-Viewer_F37A/AzureBlobTreeViewer.zip" target="_self">AzureBlobTreeViewer.zip</a></div></p>
</div>
