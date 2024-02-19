---
status: publish
published: true
pubDatetime: 2013-09-25T20:00:00.000Z
title: WebAPI with SPA (Single Page JavaScript) Specifically ExtJS and Sencha Touch
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3747
wordpress_url: https://peterkellner.net/?p=3747
date: '2013-09-25 18:14:04 -0700'
date_gmt: '2013-09-26 01:14:04 -0700'
categories:
- ASP.NET 4.5
- ExtJS
- WebAPI
- as
tags: []
---
<p>I’ve really gotten to like using Microsoft’s <a href="http://www.asp.net/web-api">ASP.NET WebAPI</a> with <a href="http://www.crockford.com/javascript/javascript.html">JavaScript</a>.&#160; No longer do I have to worry about the JSON conversion and error status.&#160; With a very simple pattern of what to return, it just works.</p>
<p>In this post, I’m just going to show the code for the controller itself.&#160; Not any kind of camelcase filters, error handling, security, or anything else.&#160; Just the simple controller.&#160; All those other things can be handled without touching the code I’m showing here.</p>
<p>Basically, all we have to do is create an <a href="http://msdn.microsoft.com/en-us/library/system.net.http.httpresponsemessage.aspx">HttpResponseMessage</a> and return that.&#160; The code I have below is actually production in <a href="siliconvalley-codecamp.com">Silicon Valley Code Camp</a> and just returns a list of all the session levels.&#160; It’s pretty self explanatory.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> SessionLevelController : ApiController<br />{<br />    <span style="color: #008000">/// &lt;summary&gt;</span><br />    <span style="color: #008000">/// if passed in with sessionId then set true or false along with tag. always get all tags</span><br />    <span style="color: #008000">/// &lt;/summary&gt;</span><br />    <span style="color: #008000">/// &lt;returns&gt;&lt;/returns&gt;</span><br />    <span style="color: #0000ff">public</span> HttpResponseMessage Get()<br />    {<br />        <span style="color: #0000ff">var</span> sessionLevels =<br />            SessionLevelsManager.I.GetAll();<br />        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK,<br />                                            <span style="color: #0000ff">new</span><br />                                            {<br />                                                data = sessionLevels,<br />                                                total = sessionLevels.Count,<br />                                                success = <span style="color: #0000ff">true</span><br />                                            });<br />        <span style="color: #0000ff">return</span> response;<br />    }<br />}</pre>
<p></div>
<p>What the data looks like to the JavaScript is as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">{<br />  <span style="color: #006080">&quot;data&quot;</span>: [<br />    {<br />      <span style="color: #006080">&quot;description&quot;</span>: <span style="color: #006080">&quot;Beginner&quot;</span>,<br />      <span style="color: #006080">&quot;id&quot;</span>: 1<br />    },<br />    {<br />      <span style="color: #006080">&quot;description&quot;</span>: <span style="color: #006080">&quot;Intermediate&quot;</span>,<br />      <span style="color: #006080">&quot;id&quot;</span>: 2<br />    },<br />    {<br />      <span style="color: #006080">&quot;description&quot;</span>: <span style="color: #006080">&quot;Advanced&quot;</span>,<br />      <span style="color: #006080">&quot;id&quot;</span>: 3<br />    }<br />  ],<br />  <span style="color: #006080">&quot;total&quot;</span>: 3,<br />  <span style="color: #006080">&quot;success&quot;</span>: <span style="color: #0000ff">true</span><br />}</pre>
<p></div></p>
<p>And, if you are curious, in ExtJS, the store definition and model definition follow.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">Ext.define(<span style="color: #006080">'SS.model.SessionLevelModel'</span>, {<br />    extend: <span style="color: #006080">'Ext.data.Model'</span>,<br /><br />    fields: [<br />        {<br />            name: <span style="color: #006080">'description'</span><br />        },<br />        {<br />            name: <span style="color: #006080">'id'</span><br />        }<br />    ],<br />    proxy: {<br />        type: <span style="color: #006080">'ajax'</span>,<br />        url: <span style="color: #006080">'/rest/SessionLevel'</span>,<br />        reader: {<br />            type: <span style="color: #006080">'json'</span>,<br />            root: <span style="color: #006080">'data'</span><br />        }<br />    }<br />});<br /><br />Ext.define(<span style="color: #006080">'SS.store.SessionLevelStore'</span>, {<br />    extend: <span style="color: #006080">'Ext.data.Store'</span>,<br />    <br />    <span style="color: #008000">//sorters: [{</span><br />    <span style="color: #008000">//    property: 'description',</span><br />    <span style="color: #008000">//    direction: 'ASC' // or 'ASC'</span><br />    <span style="color: #008000">//}],</span><br /><br />    requires: [<br />        <span style="color: #006080">'SS.model.SessionLevelModel'</span><br />    ],<br />    constructor: <span style="color: #0000ff">function</span>(cfg) {<br />        <span style="color: #0000ff">var</span> me = <span style="color: #0000ff">this</span>;<br />        cfg = cfg || {};<br />        me.callParent([Ext.apply({<br />            model: <span style="color: #006080">'SS.model.SessionLevelModel'</span>,<br />        }, cfg)]);<br />    }<br />});</pre>
<p></div></p>
<p>That’s it! very simple.</p>
<p>HTH’s.</p>
