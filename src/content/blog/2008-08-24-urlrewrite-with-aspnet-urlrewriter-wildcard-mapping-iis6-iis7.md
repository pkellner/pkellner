---
status: publish
published: true
pubDatetime: 2008-08-24T20:00:00.000Z
title: How to do URL Rewrites with ASP.NET 2.0 3.0 3.5 on IIS6 and IIS7 and What is
  Wild Card Mapping
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
description: "<p>A Step by step tutorial on how to use WildCard Mapping for processing
  URL requests.  It includes how to set it with IIS6 and IIS7.  It also discusses
  the theory behind how it works and talks about a great open source packaged called
  URLRewriter.Net.  Basically, how to resolve http://mydomain.com/Home to http://mydomain.com/HomeSite/Home.aspx
  which looks so much nicer.</p>"
wordpress_id: 142
wordpress_url: https://peterkellner.net/2008/08/24/urlrewrite-with-aspnet-urlrewriter-wildcard-mapping-iis6-iis7/
date: '2008-08-24 22:19:02 -0700'
date_gmt: '2008-08-25 03:19:02 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- Best Practices
- C#
- How Things Work
- Page Handlers
tags: []
---
<h2>The Problem</h2>
<p>Over the past several years I've found myself running into the same problem over and over so I thought I'd blog the solution so at least I don't waste time figuring it out again.&#160; So, when do you need this?&#160; The answer for me is that I want to be able reference a web site without having to expose the underlying site structure.&#160; For example, on the home page of my business, I want people to be able to type http://73rdstreet.com/Home and be taken to http://www.73rdstreet.com/HomeSite/Home.aspx. </p>
<h2>The Symptom</h2>
<p>You may see errors that say something like: </p>
<p>Server Error in Application ... HTTP Error 404.0 - Not Found</p>
<p> <!--more-->
<p><strong>The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.</strong></p>
<p><a href="http://msdn.microsoft.com/en-us/library/system.web.httpapplication.maprequesthandler.aspx">MapRequestHandler</a> StaticFile</p>
<p>And the screen may show something like this.</p>
<p><a href="/wp/wp-content/uploads/2008/08/x3.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="x" src="/wp/wp-content/uploads/2008/08/x_thumb.png" width="537" height="397" /></a></p>
<p>If this happens, read on. </p>
<h2>Theory</h2>
<p>The first thing to understand is that <a href="http://www.microsoft.com/WindowsServer2003/IIS/Default.mspx">IIS</a> by default will pass to the asp.net process only the requests that have a certain file extension.&#160; That is, <a href="http://www.eggheadcafe.com/articles/20030113.asp">aspx,ashx</a>,etc.&#160; Basically, only file extensions that have a handler defined for them to be processed by.&#160; Other URL's that don't meet the criteria are not passed to IIS.&#160; This includes no file extension at all.&#160; There is a good reason for this.&#160; One, it makes processing of things like images (jpg's, gif's, etc.) faster because they do not every have to be processed through the asp.net worker process.&#160; Secondly, it lowers the exposure of the asp.net worker process so that it is less likely to be compromised. </p>
<p>So, the first thing that has to be done is to tell IIS to pass all requests through using something called Wild Card Mapping.&#160; Then, once this is done, the request comes through to the asp.net worker process regardless of what it is.&#160; As we know, the place that we would have to process this is an <a href="http://msdn.microsoft.com/en-us/library/9b9dh535.aspx">HttpModule</a>.&#160; The reason is that since it's not a page yet, we have no idea what to do with it.&#160; Basically modules let you tap into the request at different stages.&#160; To do the rewrite from ../Home to ../HomeSite/Home.aspx we want to tap into the <a href="http://msdn.microsoft.com/en-us/library/ms227673.aspx">Application_BeginRequest</a> event.&#160; The Context.<a href="http://msdn.microsoft.com/en-us/library/ms223300.aspx">RewritePath</a> method is called at that point to force a new path based on what we want (hopefully not hard coded).</p>
<p>After the ReWritePath is set, the page is processed as if is going to the correct page.</p>
<h2>How To Set Wild Card Mapping in IIS6</h2>
<p>To Set Wild Care Mapping in IIS6 you need to do the following.</p>
<p>Run inetmgr and navigate to the Properties page of the website you want to set.</p>
<p><a href="/wp/wp-content/uploads/2008/08/test.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="test" src="/wp/wp-content/uploads/2008/08/test_thumb.jpg" width="272" height="332" /></a>&#160;</p>
<p>Then, from the properties page, click the Configuration button as shown below.</p>
<p><a href="/wp/wp-content/uploads/2008/08/t.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="t" src="/wp/wp-content/uploads/2008/08/t_thumb.jpg" width="280" height="281" /></a></p>
<p>Then, press the insert button on the configuration screen and see the following screen and then click on the insert button.</p>
<p><a href="/wp/wp-content/uploads/2008/08/t6.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="t[6]" src="/wp/wp-content/uploads/2008/08/t6_thumb.jpg" width="288" height="320" /></a></p>
<p>Now, insert your asp.net isapi dll.&#160; On my system, the file is here:&#160; C:WINDOWSMicrosoft.NETFrameworkv2.0.50727aspnet_isapi.dll.&#160; Make sure to uncheck the box &quot;Verify that file exists&quot;.</p>
<p><a href="/wp/wp-content/uploads/2008/08/t9.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="t[9]" src="/wp/wp-content/uploads/2008/08/t9_thumb.jpg" width="430" height="126" /></a></p>
<p>That's it! Now, all requests will be processed through you asp.net pipeline so you will be able to intercept anything on the URL you want.&#160; Be careful though, you may get more than you ask for! </p>
<h2>How To Set Wildcard Mapping in IIS7</h2>
<p>In IIS7 things are a little different.&#160; First thing you need to do is unlock the config section &quot;handlers&quot;. You do this by bring up a DOS prompt and entering the command: </p>
<p>C:WindowsSystem32inetsrv&gt;appcmd.exe unlock config /section:system.webserver/handlers</p>
<p>Then, you can set your wildcard handler in your web.config file as follows.</p>
<p>Now, the default handlers will be executed in your web.config file, and of course, all the defaults for that are in the chain of files that inherits from.&#160; For more details on that, see this FAQ: <a href="http://forums.asp.net/p/1117776/1736929.aspx">Configuration Files FAQs (web.config, machine.config...)</a>.</p>
<p>You may need to add the wildcard mapper handler to your web.config.&#160; To do this, you would put the following in your web.config</p>
<pre class="csharpcode"><span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">=&quot;1.0&quot;</span> <span class="attr">encoding</span><span class="kwrd">=&quot;UTF-8&quot;</span>?<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">configuration</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">handlers</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;WildCard&quot;</span> <span class="attr">path</span><span class="kwrd">=&quot;*&quot;</span> <span class="attr">verb</span><span class="kwrd">=&quot;*&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;sampletype&quot;</span> <span class="attr">resourceType</span><span class="kwrd">=&quot;Unspecified&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">handlers</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">configuration</span><span class="kwrd">&gt;</span></pre>
<p>Now, you should be set. See the next section for a good method for actually doing the remapping, which is why we went down this path in the first place.</p>
<h2>Implementing a URL ReWriter for Mapping ../Home to ../HomeSite/Home.aspx</h2>
<p>So, as discussed in the theory section above, you could write your own code to map what you want to where you want it.&#160; You could put in your global.asax some code for the Application_BeginRequest and make a big case statement for everything you want to do.&#160; Well, as we know, that would give your code a bad smell and we don't want that because soon, you will find yourself using cut and paste and other problematic crutches.</p>
<p>So, to avoid all that, and do what <a href="http://weblogs.asp.net/scottgu">Scott Guthrie</a> suggests, use the open source package <a href="http://urlrewriter.net/">UrlRewriter.NET</a>.&#160; It's light-weight and configurable through a small section in your web.config. Before putting in the what to do, here are the steps to make UrlRewriter work in a very simple way (the way I use it on my company home page.</p>
<p>In your &lt;System.web&gt; of your web.config place a definition for a new config section where you will put your rewrites</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">configuration</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">configSections</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">      <span class="kwrd">&lt;</span><span class="html">section</span> <span class="attr">name</span><span class="kwrd">=&quot;rewriter&quot;</span> <span class="attr">requirePermission</span><span class="kwrd">=&quot;false&quot;</span> </pre>
<pre>        <span class="attr">type</span><span class="kwrd">=&quot;Intelligencia.UrlRewriter.Configuration.RewriterConfigurationSectionHandler, Intelligencia.UrlRewriter&quot;</span><span class="kwrd">/&gt;</span></pre>
</div>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
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
<p>&#160;</p>
<p>Then, put the module that actually does the work of the rewrite as described in the theory section above</p>
<div class="csharpcode">
<pre class="alt">&lt;system.web&gt;</pre>
<pre>   &lt;httpModules&gt;</pre>
<pre class="alt">     &lt;add name=<span class="str">&quot;UrlRewriter&quot;</span> </pre>
<pre>           type=<span class="str">&quot;Intelligencia.UrlRewriter.RewriterHttpModule, Intelligencia.UrlRewriter&quot;</span> /&gt;</pre>
<pre class="alt">     &lt;/httpModules&gt;</pre>
<pre>       ..</pre>
</div>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
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
<p>Then, further down in your web.config put</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span></pre>
<pre>  <span class="kwrd">&lt;</span><span class="html">validation</span> <span class="attr">validateIntegratedModeConfiguration</span><span class="kwrd">=&quot;false&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt">  <span class="kwrd">&lt;</span><span class="html">modules</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span>add name=&quot;UrlRewriter&quot;</pre>
<pre class="alt">         type=&quot;Intelligencia.U</pre>
</div>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">And, Finally to actually do the redirect you need to put a new &lt;rewriter&gt; tag with a list of redirects in it.</div>
<div class="csharpcode">&#160;</div>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">rewriter</span><span class="kwrd">&gt;</span></pre>
<pre>  <span class="kwrd">&lt;</span><span class="html">rewrite</span> <span class="attr">url</span><span class="kwrd">=&quot;~/Home&quot;</span> <span class="attr">to</span><span class="kwrd">=&quot;~/pages/Home.aspx&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">rewriter</span><span class="kwrd">&gt;</span></pre>
</div>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
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
<p>That's it!&#160; You are done.&#160; Hope this helps, or at least helps me the next time I'm searching for the same problem (for the 4th time at least).</p>
<p>References:</p>
<ul>
<li>http://devtalk.dk/2007/03/19/Wildcard+Mapping+And+URL+Rewriting+On+IIS7.aspx </li>
<li><a title="http://weblogs.asp.net/scottgu/archive/2007/02/26/tip-trick-url-rewriting-with-asp-net.aspx" href="http://weblogs.asp.net/scottgu/archive/2007/02/26/tip-trick-url-rewriting-with-asp-net.aspx">http://weblogs.asp.net/scottgu/archive/2007/02/26/tip-trick-url-rewriting-with-asp-net.aspx</a> </li>
<li><a title="http://urlrewriter.net/" href="http://urlrewriter.net/">http://urlrewriter.net/</a> </li>
<li><a title="http://forums.asp.net/t/1240344.aspx" href="http://forums.asp.net/t/1240344.aspx">http://forums.asp.net/t/1240344.aspx</a> </li>
<li><a title="http://professionalaspnet.com/archive/2007/07/27/Configure-IIS-for-Wildcard-Extensions-in-ASP.NET.aspx" href="http://professionalaspnet.com/archive/2007/07/27/Configure-IIS-for-Wildcard-Extensions-in-ASP.NET.aspx">http://professionalaspnet.com/archive/2007/07/27/Configure-IIS-for-Wildcard-Extensions-in-ASP.NET.aspx</a> </li>
<li><a title="http://professionalaspnet.com/archive/2007/07/27/Create-an-HttpModule-to-Process-Wildcard-Extension-Mapping-in-ASP.NET.aspx" href="http://professionalaspnet.com/archive/2007/07/27/Create-an-HttpModule-to-Process-Wildcard-Extension-Mapping-in-ASP.NET.aspx">http://professionalaspnet.com/archive/2007/07/27/Create-an-HttpModule-to-Process-Wildcard-Extension-Mapping-in-ASP.NET.aspx</a> </li>
</ul>
