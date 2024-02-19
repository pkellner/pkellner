---
status: publish
published: true
pubDatetime: 2011-03-21T20:00:00.000Z
title: MVC3 Unable To Return Large JSON Even with Web Config Patch, Using LargeJsonResult
  Instead
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1450
wordpress_url: https://peterkellner.net/2011/03/21/mvc3-unable-to-return-large-json-even-with-web-config-patch-using-largejsonresult-instead/
date: '2011-03-21 11:11:25 -0700'
date_gmt: '2011-03-21 18:11:25 -0700'
categories:
- MVC
- JSON
- Visual Studio 2010
- ASP.NET 4.0
tags: []
---
<p>I’m trying to download a base64 encoded image that is about 4 Megabytes embedded inside a <a href="http://json.org/">JSON</a> object.  When I first tried this from my <a href="http://www.asp.net/mvc/mvc3">MVC3 Web application</a>, I got the error:</p>
<blockquote>
<h4><em>Error during serialization or deserialization using the JSON JavaScriptSerializer. The length of the string exceeds the value set on the maxJsonLength property.</em></h4>
</blockquote>
<p><!--more--></p>
<p>I then tried to set the web.config property that everyone seems to reference on the web as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">system.web.extensions</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">scripting</span><span style="color: #0000ff;">&gt;</span>
        <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">webServices</span><span style="color: #0000ff;">&gt;</span>
            <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">jsonSerialization</span> <span style="color: #ff0000;">maxJsonLength</span><span style="color: #0000ff;">="2147483645"</span> <span style="color: #ff0000;">recursionLimit</span><span style="color: #0000ff;">="100"</span><span style="color: #0000ff;">&gt;</span>
            <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">jsonSerialization</span><span style="color: #0000ff;">&gt;</span>
        <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">webServices</span><span style="color: #0000ff;">&gt;</span>
        <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">scripting</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">system.web.extensions</span><span style="color: #0000ff;">&gt;</span></pre>
</div>
<p>However, I kept getting the same error over and over.  So, I used the technique suggested in this article</p>
<p><a title="http://thoughtfulcode.wordpress.com/2011/01/03/custom-jsonresult-class-for-asp-net-mvc-to-avoid-maxjsonlength-exceeded-exception/" href="http://thoughtfulcode.wordpress.com/2011/01/03/custom-jsonresult-class-for-asp-net-mvc-to-avoid-maxjsonlength-exceeded-exception/">http://thoughtfulcode.wordpress.com/2011/01/03/custom-jsonresult-class-for-asp-net-mvc-to-avoid-maxjsonlength-exceeded-exception/</a></p>
<p>by <a href="http://brianreiter.org/about/">Brian Reiter</a> to create an override of the JsonResult class.  That actually worked for me, however unfortunately, it does not show the shape of the data that is currently being returned by MVC3.  That is, MVC3 currently returns a JsonResult as follows:</p>
<div>
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">return</span> Json(<span style="color: #0000ff;">new</span>
{
    total = blobs.Count,
    data = blobs.ToList()
}, JsonRequestBehavior.AllowGet);</pre>
</div>
<div>Brian suggest in his article to return his LargeJsonResult, do the following:</div>
<div>
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">return</span> <span style="color: #0000ff;">new</span> LargeJsonResult() { Data = output, MaxJsonLength = <span style="color: #0000ff;">int</span>.MaxValue };</pre>
</div>
<div>This does not quite work for what I want.  For my result to work, I needed to modify the result a little and return it as follows:</div>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">return</span>
   <span style="color: #0000ff;">new</span> LargeJsonResult
       {
           MaxJsonLength = 20000000,
           JsonRequestBehavior = JsonRequestBehavior.AllowGet,
           Data = <span style="color: #0000ff;">new</span>
                      {
                          total = blobs.Count,
                          data = blobs.ToList()
                      }
       };</pre>
</div>
<div>Not much different, but does solve my problem.</div>
<div>Thanks Brian for the nice contribution!</div>
