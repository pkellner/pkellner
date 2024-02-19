---
status: publish
published: true
pubDatetime: 2011-03-29T20:00:00.000Z
title: DevConnections Presentation Orlando, How To Make Your Browser fly
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1453
wordpress_url: https://peterkellner.net/2011/03/29/devconnections-presentation-orlando-how-to-make-your-browser-fly/
date: '2011-03-29 14:08:27 -0700'
date_gmt: '2011-03-29 21:08:27 -0700'
categories:
- Community
- Presentations
- MVC
tags: []
---
<p>(About 100 People)</p>
<p>The Presentation was broken down into three parts.&#160; </p>
<h2>Part 1</h2>
<p>Created a windows razor project that cached in image on a web site using best practices for threading and locking.&#160; The code and project to do this are below:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">var downloadByteArray = HttpContext.Current.Cache[cacheName] <span style="color: #0000ff">as</span> <span style="color: #0000ff">byte</span>[];<br /> <span style="color: #0000ff">if</span> (downloadByteArray == <span style="color: #0000ff">null</span>)<br /> {<br />     <span style="color: #008000">// make sure multiple requestors are not filling up the cache</span><br />     <span style="color: #0000ff">lock</span> (LockVal)<br />     {<br />         downloadByteArray = HttpContext.Current.Cache[cacheName] <span style="color: #0000ff">as</span> <span style="color: #0000ff">byte</span>[];<br />         <span style="color: #0000ff">if</span> (downloadByteArray == <span style="color: #0000ff">null</span>)<br />         {<br />             Thread.Sleep(sleep * 1000);<br /><br />             <span style="color: #0000ff">string</span> imageLocation = HttpContext.Current.Server.MapPath(<span style="color: #006080">&quot;~&quot;</span>) + imageUrl;<br /><br />             downloadByteArray = File.ReadAllBytes(imageLocation);<br />             <span style="color: #0000ff">if</span> (cacheExpiresSeconds &gt; 0)<br />             {<br />                 HttpContext.Current.Cache.Insert(cacheName, downloadByteArray,<br />                                                  <span style="color: #0000ff">null</span>,<br />                                                  DateTime.Now.Add(<span style="color: #0000ff">new</span> TimeSpan(0, 0, 0, cacheExpiresSeconds)),<br />                                                  TimeSpan.Zero, CacheItemPriority.NotRemovable, <span style="color: #0000ff">null</span>);<br />                 CacheInsertCounter = 9999; <span style="color: #008000">// any touch of this increments the global counter</span><br />             }<br />         }<br />     }<br /> }</pre>
<p></div>
<p>&#160;</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:2267f0db-4ee6-46f0-8cec-12de6f76545d" class="wlWriterEditableSmartContent">
<div><a href="/FilesForWebDownload/DevConnections-Presentation_EE06/WebFormsPreSprite.zip" target="_self">WebFormsPreSprite.zip</a></div></p>
</div>
<p>&#160;</p>
<h2>Part 2</h2>
<p>Tips from Steve Souders</p>
<p>&#160;</p>
<h2>Part 3</h2>
<p>Sprite Library from Microsoft Example:&#160;
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:62dccea0-5635-435b-b07a-d12f2bec4e7e" class="wlWriterEditableSmartContent">
<div><a href="/FilesForWebDownload/DevConnections-Presentation_EE06/WebFormsPreSprite_3.zip" target="_self">WebFormsPreSprite.zip</a></div></p>
</div>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/DevConnections-Presentation_EE06/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/DevConnections-Presentation_EE06/image_thumb.png" width="312" height="451" /></a><a href="/FilesForWebDownload/DevConnections-Presentation_EE06/IMAG0174.jpg"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="IMAG0174" border="0" alt="IMAG0174" src="/FilesForWebDownload/DevConnections-Presentation_EE06/IMAG0174_thumb.jpg" width="148" height="244" /></a><a href="/FilesForWebDownload/DevConnections-Presentation_EE06/IMAG0177.jpg"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="IMAG0177" border="0" alt="IMAG0177" src="/FilesForWebDownload/DevConnections-Presentation_EE06/IMAG0177_thumb.jpg" width="244" height="148" /></a></p>
