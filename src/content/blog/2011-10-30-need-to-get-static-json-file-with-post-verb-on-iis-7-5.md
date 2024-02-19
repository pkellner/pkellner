---
status: publish
published: true
pubDatetime: 2011-10-30T20:00:00.000Z
title: Need To Get Static JSON File with POST verb on IIS 7.5?
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1617
wordpress_url: https://peterkellner.net/2011/10/30/need-to-get-static-json-file-with-post-verb-on-iis-7-5/
date: '2011-10-30 18:36:18 -0700'
date_gmt: '2011-10-31 01:36:18 -0700'
categories:
- C#
- ".NET 4.0"
- ASP.NET 4.0
- Web.Config
- Handler
tags: []
---
<p>Normally, when we stick a JSON file up on an IIS web server, all we have to do to get to is is to set the Mime type.&#160; One easy way to do it is to add to your web.config the following:</p>
<p>&#160;</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">&lt;</span><span style="color: #800000">system.webServer</span><span style="color: #0000ff">&gt;</span><br />    <span style="color: #0000ff">&lt;</span><span style="color: #800000">validation</span> <span style="color: #ff0000">validateIntegratedModeConfiguration</span><span style="color: #0000ff">=&quot;false&quot;</span> <span style="color: #0000ff">/&gt;</span><br />    <span style="color: #0000ff">&lt;</span><span style="color: #800000">modules</span> <span style="color: #ff0000">runAllManagedModulesForAllRequests</span><span style="color: #0000ff">=&quot;true&quot;</span> <span style="color: #0000ff">/&gt;</span><br />    <span style="color: #0000ff">&lt;</span><span style="color: #800000">staticContent</span><span style="color: #0000ff">&gt;</span><br />      <span style="color: #0000ff">&lt;</span><span style="color: #800000">mimeMap</span> <span style="color: #ff0000">fileExtension</span><span style="color: #0000ff">=&quot;.json&quot;</span> <span style="color: #ff0000">mimeType</span><span style="color: #0000ff">=&quot;application/json&quot;</span>  <span style="color: #0000ff">/&gt;</span><br />    <span style="color: #0000ff">&lt;/</span><span style="color: #800000">staticContent</span><span style="color: #0000ff">&gt;</span><br />    ...</pre>
<p></div>
<p>&#160;</p>
<p>This works great as long as the GET verb is used (or just enter the on the url like http://mysite.com/myfile.json).</p>
<p>So, what if you &quot;need” to use the POST keyword.&#160; Say for example, you can not change the JavaScript file to use GET instead of POST to get the file.&#160; I was hoping to find some simple web.config parameter to set but I had no luck.&#160; I even <a href="http://stackoverflow.com/questions/7943270/how-to-serve-json-files-from-iis7-when-request-is-post">posted to StackOverflow</a> and so far, the answers have been less than helpful.&#160; Who knows, maybe by the time you read this, there will be a better answer then my solution which is to write a simple asp.net handler and register it to type <a href="http://json.org">json</a>.</p>
<p>&#160;</p>
<p>So, here is the simpler handler that does the trick:</p>
<p>&#160;</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> JSONHandler : IHttpHandler<br />    {<br /><br />        <span style="color: #0000ff">public</span> <span style="color: #0000ff">void</span> ProcessRequest(HttpContext context)<br />        {<br />            context.Response.ContentType = <span style="color: #006080">&quot;application/json&quot;</span>;<br />            <span style="color: #0000ff">string</span> output = System.IO.File.ReadAllText(context.Request.PhysicalPath);<br />            context.Response.Write(output);<br /><br />        }<br /><br />        <span style="color: #0000ff">public</span> <span style="color: #0000ff">bool</span> IsReusable<br />        {<br />            get<br />            {<br />                <span style="color: #0000ff">return</span> <span style="color: #0000ff">false</span>;<br />            }<br />        }<br />    }</pre>
<p></div>
<p>&#160;</p>
<p>and the associated web.config entries</p>
<p>&#160;</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">&lt;httpHandlers&gt;<br />     &lt;add verb=<span style="color: #006080">&quot;*&quot;</span> path=<span style="color: #006080">&quot;*.json&quot;</span> validate=<span style="color: #006080">&quot;false&quot;</span> type=<span style="color: #006080">&quot;JSONHandler&quot;</span> /&gt;<br />   &lt;/httpHandlers&gt;<br /> &lt;/system.web&gt;<br /><br /> &lt;system.webServer&gt;<br />   &lt;validation validateIntegratedModeConfiguration=<span style="color: #006080">&quot;false&quot;</span> /&gt;<br />   &lt;modules runAllManagedModulesForAllRequests=<span style="color: #006080">&quot;true&quot;</span> /&gt;<br />   &lt;staticContent&gt;<br />     &lt;mimeMap fileExtension=<span style="color: #006080">&quot;.json&quot;</span> mimeType=<span style="color: #006080">&quot;application/json&quot;</span>  /&gt;<br />   &lt;/staticContent&gt;<br />   &lt;handlers&gt;<br />     &lt;add verb=<span style="color: #006080">&quot;*&quot;</span> path=<span style="color: #006080">&quot;*.json&quot;</span> name=<span style="color: #006080">&quot;JSONHandler&quot;</span> type=<span style="color: #006080">&quot;JSONHandler&quot;</span>/&gt;<br />   &lt;/handlers&gt;<br /> &lt;/system.webServer&gt;</pre>
<p></div>
<p>I’m assuming there is a simple way, but for now, this works for me.&#160; Please post a better solution and reference it or just tell me in the comments.</p>
