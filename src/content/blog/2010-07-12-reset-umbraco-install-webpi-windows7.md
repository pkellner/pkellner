---
status: publish
published: true
pubDatetime: 2010-07-12T20:00:00.000Z
title: How To Clear the Data From an Umbraco to Start From Scratch
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1343
wordpress_url: https://peterkellner.net/2010/07/12/reset-umbraco-install-webpi-windows7/
date: '2010-07-12 11:08:24 -0700'
date_gmt: '2010-07-12 18:08:24 -0700'
categories:
- ".NET 4.0"
- Umbraco
- WebPI
tags: []
---
<p>In my previous post (<a title="https://peterkellner.net/2010/07/10/installing-umbraco-to-win7-step-by-step/" href="/2010/07/10/installing-umbraco-to-win7-step-by-step/">https://peterkellner.net/2010/07/10/installing-umbraco-to-win7-step-by-step/</a>), I detailed the steps to use <a href="http://www.microsoft.com/web/downloads/platform.aspx">WebPI</a> to install a fresh version of <a href="http://umbraco.org/">Umbraco</a> on a <a href="http://www.microsoft.com/windows/windows-7/compare/ultimate.aspx">Windows 7 Ultimate 64 bit system</a>.&#160; Now that I’ve done that, and played with it for a few hours, I’d like to start again with a fresh (no RunWay) set of data to play with.</p>
<p>I posted on the Umbraco forums and got some tips, but I thought I’d document the process here because I’m sure I’m going to be doing this again and thought it best to have some notes I can go back to (and that might help others newbie's to Umbraco while I’m at it).</p>
<p> <!--more-->
<p>So, let’s assume you have an Umbraco installation up and running.&#160; First thing you want to do is drop the sqlserver database you assigned to umbraceo (in my case umbracodb), re-add it and make sure you set the umbracoUser to have rights to that database.&#160; I’ll skip those steps because they don’t have much to do with umbraco.</p>
<p>Now, let’s assume you have done the above and now launch WebPI and chose Umbraco CMS again.</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb.png" width="415" height="322" /></a> </p>
<p>Continue to the first step after accepting the install options and make sure you select the name of your existing web site (mine is umbraco) and name the application name (which can be different than it was before).</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_3.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_3.png" width="416" height="311" /></a> </p>
<p>Ignore this warning by saying “Yes”</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_4.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_4.png" width="244" height="94" /></a> </p>
<p>Now, fill in the next page with your db details (same as before)</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_5.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_5.png" width="344" height="242" /></a> </p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_6.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_6.png" width="368" height="259" /></a> </p>
<p>I changed the default to “Use Existing Database” and updated my databasename correctly (as well as put the name of the server, W500, that has my sqlserver installed).</p>
<p>Saying continue, causes it to run for a few minutes (without much feedback or warning so be patient).</p>
<p>Then, Success!</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_7.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_7.png" width="349" height="246" /></a> </p>
<p>&#160;</p>
<p>For some reason, I need to go back to inetmgr (IIS Manager) and make the umbraco web site started and stop all the others running on port 80 (see my last post for this).&#160; Once you do that, I found that I need to go into the web.config and comment out the version number so that the umbracoConfigurationStatus line looks like this:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">&lt;</span><span style="color: #800000">add</span> <span style="color: #ff0000">key</span><span style="color: #0000ff">=&quot;umbracoConfigurationStatus&quot;</span> <span style="color: #ff0000">value</span><span style="color: #0000ff">=&quot;&quot;</span> <span style="color: #0000ff">/&gt;</span></pre>
<p></div>
<p>After doing that, I could browse to the URL:&#160; <a title="http://localhost/install/default.aspx" href="http://localhost/install/default.aspx">http://localhost/install/default.aspx</a></p>
<p>Get a screen:</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_8.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_8.png" width="273" height="323" /></a> </p>
<p>Chose Next and then go through the same screens as before.</p>
<p><a href="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_9.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToCleartheDataFromanUmbracotoStartFro_9A70/image_thumb_9.png" width="244" height="144" /></a> </p>
<p>etc., then finally get to a screen that correctly tells me I have work do do because I have not added any pages.</p>
<p>That’s it!&#160; Again, I’m still new to this and I’m sure making lots of mistakes.&#160; Please correct me if I’m wrong by making comments and make suggestions of the correct way to do it.</p>
<p>HTH’s!</p>
