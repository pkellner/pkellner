---
status: publish
published: true
pubDatetime: 2010-07-25T20:00:00.000Z
title: Creating New Overloaded Methods in Visual Studio C# is Really Easy with CodeRush
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1344
wordpress_url: https://peterkellner.net/2010/07/25/refactor-overload-coderush-visualstudio-2010/
date: '2010-07-25 18:48:35 -0700'
date_gmt: '2010-07-26 01:48:35 -0700'
categories:
- Visual Studio 2010
- DevExpress
- CodeRush
tags: []
---
<p>So, you want to add a couple extra parameters to an existing method in <a href="http://www.microsoft.com/visualstudio/en-us/">Visual Studio</a>, while not having to change all your existing code to call the new method signature?&#160; It’s easy with <a href="http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/">CodeRush</a> from <a href="http://www.devexpress.com/">Devexpress</a>.&#160; In this post, I’ll start with a simple method and add some parameters to it, then do the magic refactor.</p>
<p>Here is the starting code.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">int</span> SynchronizeScopesAsyncStart(<br />  <span style="color: #0000ff">int</span> dbSyncPairId, <span style="color: #0000ff">string</span> schemaName, <br />  <span style="color: #0000ff">string</span> connectionStringLeft,<br />  <span style="color: #0000ff">string</span> scopeLeft, <span style="color: #0000ff">string</span> connectionStringRight, <br />  <span style="color: #0000ff">string</span> scopeRight, <span style="color: #0000ff">bool</span> skipDbLogging)<br />    {...</pre>
<p></div>
<p><!--more--></p>
<p>So, We need to add a couple new parameters as follows.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">int</span> SynchronizeScopesAsyncStart<br />           (<span style="color: #0000ff">int</span> dbSyncPairId, <span style="color: #0000ff">string</span> schemaName,<br />            <span style="color: #0000ff">string</span> connectionStringLeft,<br />            <span style="color: #0000ff">string</span> scopeLeft, <span style="color: #0000ff">string</span> connectionStringRight,<br />            <span style="color: #0000ff">string</span> scopeRight, <span style="color: #0000ff">bool</span> skipDbLogging,<br />            <span style="color: #0000ff">int</span> pauseMsScopeLeft,<span style="color: #0000ff">int</span> pauseMsScopeRight)<br />        {</pre>
<p></div>
<p>So now, we want to create an overloaded method with the two new parameters (pauseMsScopeLeft and pauseMsScopeRight) left out.&#160; </p>
<p>The way we do this is first, hover the cursor over the method name (SynchronizeScopeAsynStart) as follows.</p>
<p><a href="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_thumb.png" width="491" height="166" /></a> </p>
<p>Notice the helper message telling us</p>
<blockquote>
<p>Create an overloaded method similar to this one with fewer parameters.</p>
</blockquote>
<p>This is exactly what we want to do so we chose this by pressing enter.&#160; CodeRush now gives us a red arrow pointer telling us where it will put the overloaded method by default as well as giving us some instructions on how to put the method someplace else.&#160; In our case, I’m happy to have it right below where the original method is, so I just press enter.</p>
<p><a href="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_3.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_thumb_3.png" width="519" height="375" /></a> </p>
<p>Now, is the really clever part.&#160; I can simply follow the little helper window and move through the parameter list and exclude parameters I don’t want in the parameter list of my new overloaded method.&#160; In my case, I want to get rid of the last two parameters.&#160; It highlights the last one to start, so I simply press “space” as it says, then I press Shift-Tab to get to the previous parameter, space bar again to exclude that one and I’m almost done.&#160; Here is the screen I’m now looking at.</p>
<p><a href="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_4.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_thumb_4.png" width="536" height="353" /></a> </p>
<p>Finally, I press enter to commit my changes and I have a new overloaded method that looks like the following.</p>
<p><a href="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_5.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/CreatingNewOverloadedMethodsinCisReallyE_1086D/image_thumb_5.png" width="562" height="227" /></a> </p>
<p>You can continue with the refactoring and tell CodeRush to “inline” your temporary variables, but I think this is enough for now.</p>
<p>Hope this helps!</p>
