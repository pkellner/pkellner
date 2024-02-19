---
status: publish
published: true
pubDatetime: 2009-12-04T20:00:00.000Z
title: Most Amazing ReFactor Using ReSharper EAP 5.0 I&rsquo;ve Seen!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 392
wordpress_url: https://peterkellner.net/2009/12/04/refactor-csharp-linq/
date: '2009-12-04 11:27:56 -0800'
date_gmt: '2009-12-04 18:27:56 -0800'
categories:
- LINQ
- ReSharper
tags: []
---
<p>&#160;</p>
<p>This one is just to amazing to not blog about.&#160; I’ve been a die heart <a href="http://www.jetbrains.com/resharper/">ReSharper</a> user for quite a while and recently have started using their early access versions.&#160; Primarily because they seem to have added a lot of <a href="http://msdn.microsoft.com/en-us/netframework/aa904594.aspx">LINQ</a> support which I use heavily now.&#160; I had the following code before the refactor.&#160; I have to admit, it’s a little .Net 1.1/2.0 ish, but what can I say, I’m a production coder and it did the job.</p>
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">int</span> GetTransitTime(<span class="kwrd">string</span> parcelToCheck)
{
    <span class="kwrd">int</span> transitTime = 0;
    <span class="kwrd">foreach</span> (var parcelSCAC <span class="kwrd">in</span> Constant.UPS_SCAC_MAP)
    {
        <span class="kwrd">if</span> (parcelSCAC.Key.Equals(parcelToCheck))
        {
            transitTime = Constant.UPS_TRANSIT_TIME[parcelSCAC.Value];
            <span class="kwrd">break</span>;
        }
    }
    <span class="kwrd">return</span> transitTime;
}</pre>
<p><!--more--></p>
<p>I noticed the little helper icon making a suggestion (<a href="http://www.jetbrains.net/confluence/display/ReSharper/ReSharper+Early+Access+Program">ReSharper</a> Icon that is) so I hovered over to see what it wanted.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/MostAmazingReFactorUsingReSharp.0IveSeen_9324/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/MostAmazingReFactorUsingReSharp.0IveSeen_9324/image_thumb.png" width="438" height="282" /></a></p>
<p>And, I chose what it suggested, and wow!&#160; check this out.&#160;&#160; The way I should have coded it in the first place.</p>
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">int</span> GetTransitTime(<span class="kwrd">string</span> parcelToCheck)
{
    <span class="kwrd">return</span> (from parcelSCAC <span class="kwrd">in</span> Constant.UPS_SCAC_MAP
            <span class="kwrd">where</span> parcelSCAC.Key.Equals(parcelToCheck)
            select Constant.UPS_TRANSIT_TIME[parcelSCAC.Value]).FirstOrDefault();
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
<p>All I can say is I love it.&#160;&#160; If you don’t use ReSharper, drop what you are doing and go out and buy it!</p>
