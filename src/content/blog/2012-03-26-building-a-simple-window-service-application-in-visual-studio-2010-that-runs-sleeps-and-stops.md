---
status: publish
published: true
pubDatetime: 2012-03-26T20:00:00.000Z
title: Building a Simple Window Service Application in Visual Studio 2010 That Runs,
  Sleeps and Stops
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1918
wordpress_url: https://peterkellner.net/2012/03/26/building-a-simple-window-service-application-in-visual-studio-2010-that-runs-sleeps-and-stops/
date: '2012-03-26 11:24:46 -0700'
date_gmt: '2012-03-26 18:24:46 -0700'
categories:
- C#
- Visual Studio 2010
- VS2010
tags: []
---
<h2>Introduction</h2>
<p>The goal is to create a simple <a href="http://en.wikipedia.org/wiki/Windows_service">Service</a> in <a href="http://windows.microsoft.com/en-us/windows7/products/home">Windows 7</a> (or other similar OS’s) with <a href="http://www.microsoft.com/visualstudio/en-us">Visual Studio 2010</a> that simply starts, sleeps for 15 seconds, then stops.&#160; I realize this is not that useful, but basically, it covers the case of building a service that actually does something and when finished stops.&#160; In my personal case, my thread has a while(true) loop which keeps looking for new work and only completes when certain conditions are met (like a fatal error that is non recoverable).</p>
<p>Microsoft has given us a pretty good set of docs and walk through.&#160; You can find them all here:&#160; <a href="http://msdn.microsoft.com/en-us/library/y817hyb6.aspx">http://msdn.microsoft.com/en-us/library/y817hyb6.aspx</a></p>
<p>&#160;</p>
<h2>The Steps</h2>
<p>Create a new Visual Studio Project of type <a href="http://en.wikipedia.org/wiki/Windows_service">“Windows Service”</a></p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/03/image16.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb15.png" width="383" height="299" /></a></p>
<p>Once the project is created, make sure you have the design surface up for Service1 [Design] and right click on it and say “Add Installer”.</p>
<p><a href="/wp/wp-content/uploads/2012/03/image17.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb16.png" width="458" height="189" /></a></p>
<p>Now, you’ll get to “gear” icons that you can set properties for.&#160; They are “serviceProcessInstaller1” and “serviceInstaller1” as follows:</p>
<p><a href="/wp/wp-content/uploads/2012/03/image18.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb17.png" width="410" height="283" /></a></p>
<p>Select “serviceProcessInstaller1” and in it’s properties window change the account to “LocalSystem”.&#160; You should have a screen that looks like the following:</p>
<p><a href="/wp/wp-content/uploads/2012/03/image19.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb18.png" width="329" height="227" /></a></p>
<p>Then, on the other gear “serviceInstaller”, change the nanes as follows.&#160; I’m naming my service “MyDoNothingService”.</p>
<p><a href="/wp/wp-content/uploads/2012/03/image20.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb19.png" width="415" height="338" /></a></p>
<p>Now, rebuild your project and you’ll get an exe file in your /bin/Debug folder.&#160; Open that folder with the Visual Studio Command Prompt (elevated as admin).&#160; To install the service, enter the command:</p>
<p><strong>InstallUtil WindowsServiceCreateSample.exe</strong></p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/03/image21.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb20.png" width="603" height="79" /></a></p>
<p>You should get some messages that end with “The Commit phase completed successfully”, then “The Transaction install has completed”.</p>
<p>Now, you should see that you have the service in your services panel (you can get there by going to control panel / Administrative / Services or simple run “services” from your start button.</p>
<p><a href="/wp/wp-content/uploads/2012/03/image22.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb21.png" width="390" height="142" /></a></p>
<p>(sorry for the rename here to MyServiceTest, but I got distracted and had to come back and rename the project)</p>
<p>So, now we want to add something to this project.&#160; Let’s just add to the OnStart event of Service1.cs something that starts a thread that sleeps for 15 seconds, then stops the thread.&#160; Very simple code as follows:</p>
<pre class="csharpcode">  <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> OnStart(<span class="kwrd">string</span>[] args)
        {
            <span class="kwrd">new</span> Thread(()
                      =&gt;
            {
                Thread.Sleep(15000); <span class="rem">// sleep 15 seconds</span>
                <span class="kwrd">this</span>.Stop();
            }).Start();
        }</pre>
<p>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<p>Now, before we can install the service, we first need to uninstall it.&#160; Very easy, just add a /u to the end of your install command.</p>
<p><strong>InstallUtil WindowsServiceCreateSample.exe /u</strong></p>
<p>You should be greeted with “The uninstall has completed.”.</p>
<p>Now, when you try and reinstall, sadly, you might get this error: “<strong>Error 1001. The specified service has been marked for deletion”.&#160; </strong>If you do, thanks to a post by <a href="http://www.laxdal.org/node/30">Mr. Laxdel</a>, all you have to do is exit your services dialog and restart the service.</p>
<p>Assuming you left the default autoLog set to true as follows:</p>
<p><a href="/wp/wp-content/uploads/2012/03/image23.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb22.png" width="436" height="272" /></a></p>
<p>In your event viewer, you should see you service starting and stopping as follows:</p>
<p><a href="/wp/wp-content/uploads/2012/03/image24.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb23.png" width="593" height="193" /></a></p>
<p>&#160;</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>That was pretty straight forward.&#160; Hopefully, you can follow along and generate the same thing yourself.&#160; Here is the source code attached for a visual studio 2010 project if for some reason you have trouble recreating it yourself.&#160; HTH’s!</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:2e502815-6df7-416f-bba2-da664c6304ef" class="wlWriterEditableSmartContent">
<p>Visual Studio 2010 Project <a href="/wp/wp-content/uploads/2012/03/WindowsServiceCreateSample.zip" target="_blank">Project</a></p>
</div>
