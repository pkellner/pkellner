---
status: publish
published: true
pubDatetime: 2012-10-27T20:00:00.000Z
title: Using Fiddler To Replay an AJAX (xmlhttp) Request
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2291
wordpress_url: https://peterkellner.net/?p=2291
date: '2012-10-27 10:48:03 -0700'
date_gmt: '2012-10-27 17:48:03 -0700'
categories:
- ASP.NET 4.0
- Debugging
- Fiddler
- ASP.NET MVC
- AJAX
tags: []
---
<p>&#160;</p>
<h2>The Problem</h2>
<p>I use to spend a lot of time writing throw away <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> code to test AJAX (<a href="http://en.wikipedia.org/wiki/XMLHttpRequest">XMLHttpRequest</a> or Asynchronous JavaScript and XML) type requests to my hosted web services.&#160; that is, on my ASP.NET server, I have services that look like the following (<a href="http://www.asp.net/mvc">Microsoft ASP.NET MVC</a> projects):</p>
<pre class="csharpcode">[HttpPost]
[NoCache]
<span class="kwrd">public</span> JsonResult GetEmailByPerson(<span class="kwrd">long</span> addressBookEntryId, 
    <span class="kwrd">string</span> existingEmailDetailIds, <span class="kwrd">int</span>? start, <span class="kwrd">int</span>? limit,
    <span class="kwrd">bool</span>? emailNotViewed = <span class="kwrd">null</span>, <span class="kwrd">bool</span>? emailNotDeleted = <span class="kwrd">null</span>,
    <span class="kwrd">bool</span>? forceDataToHtmlBody = <span class="kwrd">false</span>)
{
    Utils.AuthorityLevel userAuthorityLevel = Utils.GetUserAuthorityLevel();
    <span class="kwrd">if</span> (userAuthorityLevel == Utils.AuthorityLevel.None)
    {
        <span class="kwrd">return</span> Json(<span class="kwrd">new</span>
        {
            Message = <span class="str">&quot;Requires Authentication&quot;</span>,
            Success = <span class="kwrd">false</span>
        }, JsonRequestBehavior.DenyGet);
    }</pre>
<p>&#160;</p>
<p>The problem is that when things don’t quite work as I expect, I need to write little JavaScript snippets of code to execute and write little error catching routines to see what is broken.</p>
<p>&#160;</p>
<h2>Fiddler Makes This Easy With No Hand Coding</h2>
<p>Now, instead of having to make little snippets of code, here is all I have to do in Fiddler.</p>
<p>1.&#160; Install Fiddler from <a href="https://twitter.com/ericlaw">Eric Lawrence</a> (Pretty obvious)&#160; <a href="http://www.fiddler2.com/fiddler2/">http://www.fiddler2.com/fiddler2/</a></p>
<p>2.&#160; Run Fiddler (by default, it captures your web traffic).&#160; You’ll see a screen like the following after you have run Fiddler, then browse to your web site that captures this traffic.</p>
<p><a href="/wp/wp-content/uploads/2012/10/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/10/image_thumb.png" width="520" height="285" /></a> </p>
<p>Notice we have selected the http Ajax call (see the status bar) of the call I want to replay.</p>
<p>3.&#160; Select on the right side the “Composer” tab (it will show you your current request)</p>
<p><a href="/wp/wp-content/uploads/2012/10/image1.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/10/image_thumb1.png" width="549" height="303" /></a><br />
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>4. Now, for that not so intuitive part, but the past part.&#160; Select the request on the left by holding the mouse down on that request and drag it to the right side. There is a big hint below the composer tab label about this, but somehow I never noticed it before.</p>
<p><a href="/wp/wp-content/uploads/2012/10/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/10/image_thumb2.png" width="567" height="313" /></a> </p>
<p>5. Now, change the sub tab on the right tot the “RAW” sub tab&#160; as follows and you can change any of the parameter values you want and simply press “Execute”.</p>
<p><a href="/wp/wp-content/uploads/2012/10/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/10/image_thumb3.png" width="449" height="278" /></a> </p>
<p>&#160;</p>
<p>That’s it!&#160; the Ajax request is replayed with your new parameters and you can look at the new result in fiddler just like always.</p>
<p>&#160;</p>
<p>HTH’s!</p>
