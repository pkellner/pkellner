---
status: publish
published: true
pubDatetime: 2013-08-18T20:00:00.000Z
title: Collection Form Post Parameters in WebAPI Controller
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3706
wordpress_url: https://peterkellner.net/?p=3706
date: '2013-08-18 16:20:29 -0700'
date_gmt: '2013-08-18 23:20:29 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- C#
- ASP.NET 2.0
- MVC
- ASP.NET 4.0
- ASP.net
- ASP.NET MVC
- ASP.NET 4.5
- WebAPI
- Visual Studio 2012
tags: []
---
<p>There are lots of ways using <a href="http://www.asp.net/">ASP.NET</a> <a href="http://www.asp.net/mvc/mvc4">MVC4</a> to collection passed in form parameters (POST) to the WebAPI Controller.&#160; I’m not wanting to create a Model, I’m not wanting to get involved with dynamic variables, I just want the values that are posted in.&#160; Say for example, my post looks like the following:</p>
<p><a href="/wp/wp-content/uploads/2013/08/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb5.png" width="402" height="170" /></a> </p>
<p>To capture both sessionId and trackId, I can have a <a href="http://www.asp.net/web-api">WebAPI</a> controller in <a href="http://www.microsoft.com/visualstudio/eng/2013-preview">Visual Studio</a> that looks just like this:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">namespace</span> WebAPI.Api<br />{<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> SessionRpcController : ApiController<br />    {<br />        [HttpPost]<br />        [ActionName(<span style="color: #006080">&quot;UpdateSessionTrack&quot;</span>)]<br />        [Authorize(Roles = <span style="color: #006080">&quot;admin&quot;</span>)]<br />        <span style="color: #0000ff">public</span> HttpResponseMessage<br />            PostUpdateSessionTrack(<br />            FormDataCollection formDataCollection)<br />        {<br />            var sessionId =<br />                Convert.ToInt32<br />                    (formDataCollection.<br />                        FirstOrDefault(a =&gt; a.Key == <span style="color: #006080">&quot;sessionId&quot;</span>).<br />                        Value);<br />            var trackId =<br />                Convert.ToInt32<br />                    (formDataCollection.<br />                        FirstOrDefault(a =&gt; a.Key == <span style="color: #006080">&quot;trackId&quot;</span>).<br />                        Value);<br /><br />            <span style="color: #008000">// do some real work here</span><br /><br />            HttpResponseMessage response =<br />                Request.CreateResponse(HttpStatusCode.OK);<br />            <span style="color: #0000ff">return</span> response;<br />        }<br />    }<br />}<br /></pre>
<p></div></p>
<p>Simple as that!&#160; HTH’s</p>
