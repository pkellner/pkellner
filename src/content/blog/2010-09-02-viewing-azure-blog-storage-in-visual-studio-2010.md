---
status: publish
published: true
pubDatetime: 2010-09-02T20:00:00.000Z
title: How To View Your Blob Storage in Windows Azure
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1360
wordpress_url: https://peterkellner.net/2010/09/02/viewing-azure-blog-storage-in-visual-studio-2010/
date: '2010-09-02 06:20:35 -0700'
date_gmt: '2010-09-02 13:20:35 -0700'
categories:
- Visual Studio 2010
- Azure
- Azure Blob Storage
tags: []
---
<p>I’m just starting to use Windows Azure for a project and plan on using the <a href="http://msdn.microsoft.com/en-us/library/dd135733.aspx">Azure Blob Storage</a> part.&#160; I won’t go into the details here, but let’s say I figured it out far enough so that I have pushed some piles of data into the blog storage.&#160;&#160; Now, I want to see them.&#160; I assumed that from the Azure portal, there would be some interface where I could see what I actual did and am being billed from.&#160; I posted to the forums and basically was told that’s not really the case.&#160; Here is the post with the answer saying you need some other software to do it (details below).</p>
<p>My friend <a href="http://robindotnet.wordpress.com/">RobinDotNet</a> suggested I look at his <a href="http://blogs.msdn.com/b/jnak/archive/2010/06/10/windows-azure-storage-browser-in-the-visual-studio-server-explorer.aspx">article</a> about how to use Visual Studio 2010 to view the blob storage.&#160; Sure enough, in VS, I can set my account and key in server explorer and see the blob storage!&#160; Thanks Robin.</p>
<p><a href="/FilesForWebDownload/HowToViewYourBlobStorageinWindowsAzure_5925/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToViewYourBlobStorageinWindowsAzure_5925/image_thumb.png" width="283" height="232" /></a> </p>
<p> <!--more-->
<p>&#160;</p>
<p>Link to Thread with details below:</p>
<p><em>Reply:</em></p>
<p><em>The billing portal will give you a fairly detailed report on your storage consumption (it's about 4 hours behind realtime). You can get to this from the Azure portal (should be near the upper-right by your Live ID). This won't give you per-container breakdowns or anything that detailed though.</em></p>
<p><em>This Azure Storage Team </em><a href="http://blogs.msdn.com/b/windowsazurestorage/archive/2010/07/09/understanding-windows-azure-storage-billing-bandwidth-transactions-and-capacity.aspx"><em>blog post</em></a><em> gives a fairly detailed breakdown of how consumption is computed. Knowing this, you could create a more detailed storage consumption report than the billing report by enumerating your containers, then enumerating each blob within the containers and reading each blob's size (via CloudBlob.Properties.Length).</em></p>
<p><em>There's nothing I know of that will give you a bandwidth breakdown for each container. For that, you'd need to create some sort of service tier, where you could then retrieve the blob in question and accumulate your own stats within that service tier.</em></p>
