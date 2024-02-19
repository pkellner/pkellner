---
status: publish
published: true
pubDatetime: 2010-10-18T20:00:00.000Z
title: A Refactoring I Should Have Been Doing for Years but Forgot, AppSettings
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1384
wordpress_url: https://peterkellner.net/2010/10/18/refactoring-for-c-appsettings-configurationmanager/
date: '2010-10-18 10:30:25 -0700'
date_gmt: '2010-10-18 17:30:25 -0700'
categories:
- C#
tags: []
---
<p>So, It’s always annoyed me that when I want to check an AppSettings variable from app.config or web.config I’ve had to go through code like the following:</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">&lt;</span><span style="color: #800000">appSettings</span><span style="color: #0000ff">&gt;</span><br />  <span style="color: #0000ff">&lt;</span><span style="color: #800000">add</span> <span style="color: #ff0000">key</span><span style="color: #0000ff">=&quot;AccountStorageURL&quot;</span> <span style="color: #ff0000">value</span><span style="color: #0000ff">=&quot;http://testit.blob.core.windows.net/&quot;</span>  <span style="color: #0000ff">/&gt;</span></pre>
</div>
<div>&#160;</div>
<div>
  </div>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> GetStorageURLOld(<span style="color: #0000ff">string</span> username, <span style="color: #0000ff">string</span> password)<br />{<br />   var accountStorageURL = <span style="color: #0000ff">string</span>.Empty;<br />   <span style="color: #0000ff">if</span> (ConfigurationManager.AppSettings[<span style="color: #006080">&quot;AccountStorageURL&quot;</span>] != <span style="color: #0000ff">null</span>)<br />   {<br />       accountStorageURL = ConfigurationManager.AppSettings.Get(<span style="color: #006080">&quot;AccountStorageURL&quot;</span>);<br />   }<br />   <span style="color: #0000ff">return</span> accountStorageURL;<br />}</pre>
<p></div>
<p>I should have realized a long time ago that this code is equivalent to:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> GetStorageURL(<span style="color: #0000ff">string</span> username, <span style="color: #0000ff">string</span> password)<br />{<br />  <span style="color: #0000ff">return</span> ConfigurationManager.AppSettings[<span style="color: #006080">&quot;AccountStorageURL&quot;</span>] ?? <span style="color: #0000ff">string</span>.Empty;<br />}</pre>
<p></div>
<div>Just thought I’d share in case someone else had forgot this also.</div>
<div>&#160;</div>
<div>HTH’s.<br />
  </div>
