---
status: publish
published: true
pubDatetime: 2010-11-09T20:00:00.000Z
title: If You Use BackgroundWorker in .Net, Make Sure You Wrap Your Worker Method
  In Try (or risk missing the exception thrown)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1404
wordpress_url: https://peterkellner.net/2010/11/09/if-you-use-backgroundworker-in-net-make-sure-you-wrap-your-worker-method-in-try-or-risk-missing-the-exception-thrown/
date: '2010-11-09 14:57:42 -0800'
date_gmt: '2010-11-09 21:57:42 -0800'
categories:
- C#
- ".NET 4.0"
- Debugging
- Exceptions
tags: []
---
<p>So, just a short post in case someone runs into the same problem I had today that cost me about 2 hours using <a href="http://www.microsoft.com/visualstudio/en-us/visual-studio-2010-launch?WT.mc_id=SEARCH&amp;WT.srch=1">Visual Studio 2010</a>.&#160; Basically, if you are using the <a href="http://msdn.microsoft.com/en-us/library/system.componentmodel.backgroundworker.aspx">BackgroundWorker</a> in a windows app (with visual studio) and find that the method is not finishing and seemingly not throwing exceptions, maybe it actually is and you are missing it.</p>
<p>That is, if you have code like this:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">private</span> <span style="color: #0000ff">void</span> backgroundWorker1_DoWork(<span style="color: #0000ff">object</span> sender, DoWorkEventArgs e)<br />{<br />    backgroundWorker1.ReportProgress(0,<span style="color: #006080">&quot;starting...&quot;</span>);<br />    <span style="color: #0000ff">for</span> (<span style="color: #0000ff">int</span> i = 0; i &lt; 10;i++ )<br />    {<br />        <span style="color: #0000ff">if</span> (i &gt; 5)<br />        {<br />            <span style="color: #0000ff">throw</span> <span style="color: #0000ff">new</span> ApplicationException(<span style="color: #006080">&quot;any error here&quot;</span>);<br />        }<br />        backgroundWorker1.ReportProgress(i, <span style="color: #006080">&quot;working...&quot;</span>);<br />    }<br />}</pre>
<p></div>
<p>and you run it in the debugger, it will not stop by default when the exception is thrown (like it would in single threaded code).</p>
<p>So, I recommend doing the following and setting a break point to see the error.</p>
<p><a href="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_thumb.png" width="497" height="251" /></a></p>
<p>&#160;</p>
<p>Another thing you can do is bump up where debug’s stops uisng the dialog:</p>
<p><a href="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_3.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_thumb_3.png" width="512" height="336" /></a></p>
<p>goes to:</p>
<p><a href="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_4.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_thumb_4.png" width="462" height="244" /></a></p>
<p>&#160;</p>
<p>Then, you will get an error you expect.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_5.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/If-You-Use-BackgroundThrea_BFD6/image_thumb_5.png" width="416" height="229" /></a></p>
<p>HTH’s!</p>
