---
status: publish
published: true
pubDatetime: 2011-03-02T20:00:00.000Z
title: Installing NuGet on VS2010 (first blood)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1436
wordpress_url: https://peterkellner.net/2011/03/02/installing-nuget-on-vs2010-first-blood/
date: '2011-03-02 17:11:34 -0800'
date_gmt: '2011-03-03 00:11:34 -0800'
categories:
- MVC
- ASP.NET 4.0
- NuGet
tags: []
---
<p>So, here are the steps necessary to install <a href="http://nuget.codeplex.com/">NuGet</a> on my windows laptop computer.&#160; I’ve got vs2010 (not sp1) installed, I’ve disabled both Resharper and .net Reflector just to be safe.</p>
<p>First step, is to go to the <a href="http://nuget.org/">NuGet.org</a> web site and click on Install.</p>
<p><a href="http://nuget.org/"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image.png" width="449" height="234" /></a></p>
<p>&#160;</p>
<p>Accept the default:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb.png" width="244" height="182" /></a></p>
<p>&#160;</p>
<p>Run Visual Studio 2010 again, then go into Tool/Extension Manager and select “Automatically check for updates to installed extensions” as follows:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_4.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_3.png" width="515" height="398" /></a></p>
<p>&#160;</p>
<p>Then, go to View / Other Windows / Package Manager and you will get the Nu-Get prompt.</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_4.png" width="466" height="401" /></a></p>
<p>&#160;</p>
<p>Now, you' have the NuGet prompt as follows.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_6.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_5.png" width="420" height="181" /></a></p>
<p>At the PM prompt, to install scaffolding, start typing the following:</p>
<p>Install-Package mvc&#160; {then press tab for auto expansion}</p>
<p>You’ll get a list of all packages that begin with mvc as follows:</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_7.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_6.png" width="498" height="323" /></a></p>
<p>I choose MvcScaffolding, press enter and.. you’ll get the error that you need to have a project open.&#160; Of course, because it wants to add it to your project.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_8.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_7.png" width="368" height="379" /></a></p>
<p>&#160;</p>
<p>Now, let me add a real project with a simple class called MyTeam</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> MyTeam<br />    {<br />        <br />        [Key]<br />        <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> ID { get; set; }<br /><br />        [Required]<br />        <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> Name { get; set; }<br />        <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> City { get; set; }<br />        <span style="color: #0000ff">public</span> DateTime Founded { get; set; }<br />    }</pre>
<p></div>
<p>Now, when I re-run the last command, I get all my Controllers and Views.</p>
<p><a href="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_9.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Installing-NuGet-on-VS2010-first-blood_D77F/image_thumb_8.png" width="610" height="251" /></a></p>
<p>Hope this helps, I have a lot more to learn now.</p>
