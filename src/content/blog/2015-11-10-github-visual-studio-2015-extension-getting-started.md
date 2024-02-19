---
status: publish
published: true
pubDatetime: 2015-11-10T20:00:00.000Z
title: GitHub Visual Studio 2015 Extension, Getting Started
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4338
wordpress_url: https://peterkellner.net/?p=4338
date: '2015-11-10 18:51:36 -0800'
date_gmt: '2015-11-11 01:51:36 -0800'
categories:
- Visual Studio
- GIT
tags: []
---
<p>I’ve been using Git as my source control of choice for years now.  I’ve recently discovered the <a href="https://visualstudio.github.com/">GitHub Visual Studio extension</a> that takes some of the hassles away from this process.  Specifically, creating a new <a href="https://git-scm.com/">Git</a> Repository from a <a href="https://www.visualstudio.com/en-us/products/vs-2015-product-editions.aspx">Visual Studio 2015</a> project and publishing it to <a href="https://github.com/">GitHub</a> is always a small dance.  Now, it’s trivial and with this blog post, if I ever forget how (or you do), the simple steps and screen shots are here.</p>
<h4>Step 1 – Make sure you have the Visual Studio 2015 Git Extension installed.  To do that, simply go to Team/Manage Connections</h4>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2015/11/image.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb.png" alt="image" width="644" height="191" border="0" /></a></p>
<p>and then verify the extension is installed (or install it)</p>
<p><a href="/wp/wp-content/uploads/2015/11/image1.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb1.png" alt="image" width="632" height="484" border="0" /></a></p>
<p>&nbsp;</p>
<h4>Step 2 – Create a Visual Studio 2015 Project</h4>
<p>Just like any other project you would create with Visual Studio 2015, you simply say File/Project/New and choose a project type (I’m going to choose C# console project as shown below (make sure you choose create new Git Repository as shown by my red arrow).</p>
<p><a href="/wp/wp-content/uploads/2015/11/image2.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb2.png" alt="image" width="523" height="484" border="0" /></a></p>
<p>&nbsp;</p>
<h4>Step 3 – Check into GitHub</h4>
<p>You’ll then see the console project as follows:</p>
<p><a href="/wp/wp-content/uploads/2015/11/image3.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb3.png" alt="image" width="644" height="329" border="0" /></a></p>
<p>Now, from here, press the “HOME” path (little house icon on above screen shot near top left) and you will get the following screen:</p>
<p><a href="/wp/wp-content/uploads/2015/11/image4.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb4.png" alt="image" width="244" height="194" border="0" /></a></p>
<p>Then, click on “Changes” and create your first commit (after typing in your commit message as I have done, then pressing the commit button.</p>
<p><a href="/wp/wp-content/uploads/2015/11/image5.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb5.png" alt="image" width="657" height="772" border="0" /></a></p>
<p>You will get the message that the commit has been made as shown below.  This however does not actually push the changes to GitHub (remember, Git maintains the repo locally and you need to sync it to get it to GitHub).</p>
<p><a href="/wp/wp-content/uploads/2015/11/image6.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb6.png" alt="image" width="1028" height="582" border="0" /></a></p>
<p>To get the changes synchronized to GitHub you need to click on the blue “Sync” button in the commit message above and then you will get a dialog to push your changes to a new GitHub Repo as follows:</p>
<p>&nbsp;</p>
<h4>Step 4 – Create a GitHub Repo and Synchronize VS Project</h4>
<p><a href="/wp/wp-content/uploads/2015/11/image7.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb7.png" alt="image" width="644" height="386" border="0" /></a></p>
<p>You will be rewarded with the success message and if you look on GitHub you will see the repo with your project files.</p>
<p><a href="/wp/wp-content/uploads/2015/11/image8.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb8.png" alt="image" width="644" height="341" border="0" /></a></p>
<p><a href="/wp/wp-content/uploads/2015/11/image9.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb9.png" alt="image" width="644" height="420" border="0" /></a></p>
<p>&nbsp;</p>
<h4>Step 5 – Make a Source File Change and Commit and Push Changes</h4>
<p>The last thing to make this article somewhat complete is to make a simple change to a source file (Program.cs in my case) and commit that change to Git and push to GitHub.  You can do that in one step on the Team Explorer – Changes window.  Simply activate the chevron next to the commit button and select “Commit and Push” as follows:</p>
<p><a href="/wp/wp-content/uploads/2015/11/image10.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb10.png" alt="image" width="629" height="484" border="0" /></a></p>
<p>And of course the success message is always nice to see:</p>
<p><a href="/wp/wp-content/uploads/2015/11/image11.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb11.png" alt="image" width="644" height="435" border="0" /></a></p>
<p>Now, if we look at GitHub Repository, we can see the change made it!</p>
<p><a href="/wp/wp-content/uploads/2015/11/image12.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2015/11/image_thumb12.png" alt="image" width="644" height="478" border="0" /></a></p>
<p>&nbsp;</p>
<p>That’s it!  very easy.  You can still use other tools for managing your git files outside of Visual Studio.  Git is keeping track of the data (not VS) so all updates will be reflected every place.</p>
<p>HTH’s</p>
<p>&nbsp;</p>
<h4>Other Resources:</h4>
<table border="1" width="550" cellspacing="0" cellpadding="10">
<tbody>
<tr>
<td valign="top" width="275">Helpful Video by Phil Haack</td>
<td valign="top" width="275"><a title="https://channel9.msdn.com/Series/ConnectOn-Demand/217" href="https://channel9.msdn.com/Series/ConnectOn-Demand/217">https://channel9.msdn.com/Series/ConnectOn-Demand/217</a></td>
</tr>
<tr>
<td valign="top" width="275">GitHub</td>
<td valign="top" width="275"><a title="https://github.com/" href="https://github.com/">https://github.com/</a></td>
</tr>
<tr>
<td valign="top" width="275">Visual Studio GitHub Extension</td>
<td valign="top" width="275"><a title="https://visualstudio.github.com/" href="https://visualstudio.github.com/">https://visualstudio.github.com/</a></td>
</tr>
</tbody>
</table>
