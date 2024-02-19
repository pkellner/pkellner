---
status: publish
published: true
pubDatetime: 2008-06-29T20:00:00.000Z
title: Making the RSS Feed From the web site Discoverable
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br /><p>This post shows how to use a cool tool to making a RSS Feed Discoverable
  on a web page.  It involves creating an entry in the header tag of the page.</p>"
wordpress_id: 119
wordpress_url: https://peterkellner.net/2008/06/29/make-rss-discoverable-on-web-page/
date: '2008-06-29 09:09:58 -0700'
date_gmt: '2008-06-29 16:09:58 -0700'
categories:
- ASP.NET 3.5
- Code Camp Web Site Series
- RSS
- Tools
tags: []
---
<p>After adding the RSS feed to our <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp Web site</a> I noticed that the feed was not discoverable by Internet Explorer.&#160; That is, the little RSS Icon on the toolbar was not finding it. </p>
<p><a href="/wp/wp-content/uploads/2008/06/abcde.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="abcde" src="/wp/wp-content/uploads/2008/06/abcde-thumb.png" width="476" height="456" /></a></p>
<p> <!--more-->
<p>After a little searching around, I discovered that a header tag was needed.&#160; Further searching found a <a href="http://www.feedforall.com/autodiscovery.htm">nice web site that helped create this header tag for me</a>. </p>
<p>&#160;</p>
<p><a title="http://www.feedforall.com/autodiscovery.htm" href="http://www.feedforall.com/autodiscovery.htm">http://www.feedforall.com/autodiscovery.htm</a></p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2008/06/abcd.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="abcd" src="/wp/wp-content/uploads/2008/06/abcd-thumb.png" width="501" height="458" /></a></p>
<p>Then, all I had to do was add that tag to my master page and the page is now discoverable!</p>
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span><span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">   2:  </span><span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">id</span><span class="kwrd">=&quot;Head1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">   3:  </span>    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Silicon Valley Codecamp 2008<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">   4:  </span>    <span class="kwrd">&lt;</span><span class="html">link</span> <span class="attr">rel</span><span class="kwrd">=&quot;alternate&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;application/rss+xml&quot;</span> </pre>
<pre class="alt"><span class="lnum">   5:  </span>       <span class="attr">title</span><span class="kwrd">=&quot;Code Camp Rss Feed&quot;</span> </pre>
<pre><span class="lnum">   6:  </span>       <span class="attr">href</span><span class="kwrd">=&quot;http://www.siliconvalley-codecamp.com/Rss.aspx&quot;</span> <span class="kwrd">/&gt;</span> </pre>
<pre class="alt"><span class="lnum">   7:  </span><span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span></pre>
</div>
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
<p>Lines 4-6 are the header tag created by the autodiscovery tool listed above.</p>
<p>That's it. Hope this helps. I did not include it in my <a href="/category/code-camp-web-site-series/">series on building the code camp web site</a> because it seemed kind of a small point.</p>
