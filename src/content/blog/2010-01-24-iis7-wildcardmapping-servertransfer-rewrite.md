---
status: publish
published: true
pubDatetime: 2010-01-24T20:00:00.000Z
title: How To Convert From Request With Parameter to No Parameter in ASP.NET (Server.Transfer)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 462
wordpress_url: https://peterkellner.net/2010/01/24/iis7-wildcardmapping-servertransfer-rewrite/
date: '2010-01-24 14:59:33 -0800'
date_gmt: '2010-01-24 21:59:33 -0800'
categories:
- C#
- IIS7
tags: []
---
<p>&#160;</p>
<p>The problem is that I’m trying to keep track of the exact URL a person selects including the request parameter.&#160; That is, I have a URLs that can be played as follows:</p>
<p>http://video.peterkellner.net/TestPage.html?src=P1_Intro.wmv</p>
<p>http://video.peterkellner.net/TestPage.html?src=P2_BasicRIANoTooling.wmv</p>
<p>&#160;</p>
<p>I’ve actually got 7 videos that I want people to be able to play.&#160; The problem is that my web statistics tracker is going to count all videos as coming from TestPage.html and I will not be able to tell which video is getting how much traffic.&#160; What I’d really like is have unique landing pages for each one that I can put links to on my blog, and then have those tracked separately.</p>
<p> <!--more-->
<p>So, here is what I would like:</p>
<p>http://video.peterkellner.net/P2_BasicRIANoTooling_wmv</p>
<p>http://video.peterkellner.net/P2_BasicRIANoTooling_wmv</p>
<p>Then, in my web stats, I will see the following</p>
<p><a href="/FilesForWebDownload/HowToConvertFromRequestWithPara.Transfer_B2D3/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToConvertFromRequestWithPara.Transfer_B2D3/image_thumb.png" width="485" height="311" /></a></p>
<p>To achieve this, the solution is to add a “<a href="http://learn.iis.net/page.aspx/508/wildcard-script-mapping-and-iis-7-integrated-pipeline/">WildCardMapper</a>” to IIS7 so that all requests, including those without extensions go through the <a href="http://www.west-wind.com/presentations/howaspnetworks/howaspnetworks.asp">asp.net pipeline</a>.&#160; Then, the requests can be trapped in either a <a href="http://msdn.microsoft.com/en-us/library/cc304803.aspx">asp.net module</a>, or simply in the global.asax.cs which is how I did it for simplicity.</p>
<p>To do this, the following code needs to be put in the web.config modules section:</p>
<pre class="csharpcode">    &lt;system.webServer&gt;    
        &lt;modules runAllManagedModulesForAllRequests=<span class="str">&quot;true&quot;</span>    &gt;</pre>
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
<p>Then, in the global.asax.cs file, you add the following code:</p>
<pre class="csharpcode">  <span class="kwrd">protected</span> <span class="kwrd">void</span> Application_BeginRequest(<span class="kwrd">object</span> sender, EventArgs e)
        {
            var incomingUrlFromRequest = HttpContext.Current.Request.Url;
            <span class="kwrd">if</span> (incomingUrlFromRequest != <span class="kwrd">null</span> &amp;&amp; incomingUrlFromRequest.Segments.Count() == 2 &amp;&amp;
                incomingUrlFromRequest.Segments[1].EndsWith(<span class="str">&quot;_wmv&quot;</span>))
            {
                <span class="kwrd">string</span> newPath = <span class="rem">//Context.Request.MapPath(&quot;~&quot;) +</span>
                    String.Format(<span class="str">&quot;TestPage.html?src={0}&quot;</span>, incomingUrlFromRequest.Segments[1]).Replace(<span class="str">&quot;_wmv&quot;</span>, <span class="str">&quot;.wmv&quot;</span>);

                Server.Transfer(newPath, <span class="kwrd">false</span>);
            }

        }</pre>
<p>
  </p>
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
<p>Now, the translation happens exactly as you would expect.&#160; That is, when you enter the URL: http://video.peterkellner.net/P2_BasicRIANoTooling_wmv invisibly, you are taken to http://video.peterkellner.net/TestPage.html?src=P1_Intro.wmv because Server.Transfer is used.&#160; The browser does not even know the transfer took place, and the URL stays the same in the top of the users browser.</p>
<p><a href="/FilesForWebDownload/HowToConvertFromRequestWithPara.Transfer_B2D3/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToConvertFromRequestWithPara.Transfer_B2D3/image_thumb_3.png" width="414" height="192" /></a></p>
<p>Hope this helps!</p>
