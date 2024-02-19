---
status: publish
published: true
pubDatetime: 2013-06-30T20:00:00.000Z
title: Display Load Mask (Waiting&hellip;) with Sencha Touch on Ajax Call
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3648
wordpress_url: https://peterkellner.net/?p=3648
date: '2013-06-30 09:51:46 -0700'
date_gmt: '2013-06-30 16:51:46 -0700'
categories:
- Sencha
- Sencha
- SenchaTouch
- ExtJS
tags: []
---
<p>&#160;</p>
<p>One of the nice features of using <a href="http://www.sencha.com/products/touch/" target="_blank">Sencha Touch</a> (and ExtJS for that matter) lists (<a href="http://docs.sencha.com/touch/2.2.1/#!/api/Ext.dataview.DataView" target="_blank">Ext.dataview.List</a>) is that you can simply set the parameter masked to true and when the store retrieves data, a nice “loading” make appears letting your user know that something is happening and the browser is just not frozen while we wait for data. (example follows):</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">Ext.create('Ext.List', {<br />    fullscreen: <span style="color: #0000ff">true</span>,<br />    itemTpl: '{title}',<br />    store: 'mystore',<br />    masked: { xtype: 'loadmask',message: 'loading' }<br />});</pre>
<p></div>
<p>If you want to get data using Sencha Touch and the <a href="http://docs.sencha.com/touch/2.2.1/#!/api/Ext.Ajax" target="_blank">Ext.Ajax</a> method, you don’t get this nice <a href="http://docs.sencha.com/touch/2.2.1/#!/api/Ext.LoadMask" target="_blank">masked</a> option so you have to do it yourself.</p>
<p>The strategy is basically this:</p>
<ol>
<li>Create a task that will put up a load mask when the task completes </li>
<li>run the task for some short time (like 1/2 a second) </li>
<li>Start your Ext.Ajax call (waiting for success or failure event) </li>
<li>On Success on Failure of Ext.Ajax cancel the task and remove the mask (if showing), the do appropriate action Since JavaScript is single threaded we don’t have to worry about concurrency issues like race conditions so this is guaranteed to work.&#160; Below is some sample code I’m using in the <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> web site mobile application to process login.&#160; (this is the code that gets executed when tapping on the login button).</li>
</ol>
<p>he below method is actually calling a <a href="http://www.asp.net/web-api" target="_blank">Microsoft ASP.NET WebAPI</a> server. I’ve put a Thread.Sleep(3000) in the service call so I can see the load mask happening in testing. </p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">var</span> basePanel = <br />    Ext.ComponentQuery.query(<span style="color: #006080">&quot;toppanel&quot;</span>)[0];<br /><span style="color: #0000ff">var</span> loginFormPanel = <br />    Ext.ComponentQuery.query(<span style="color: #006080">&quot;loginformpanel&quot;</span>)[0];<br /><br /><span style="color: #0000ff">var</span> task = Ext.create(<span style="color: #006080">'Ext.util.DelayedTask'</span>, <span style="color: #0000ff">function</span>() {<br />    Ext.Viewport.mask({ xtype: <span style="color: #006080">'loadmask'</span>,<br />                       message: <span style="color: #006080">&quot;Checking Credentials..&quot;</span> });<br />}, <span style="color: #0000ff">this</span>);<br /><br />task.delay(500);<br /><br /><span style="color: #008000">// do login and if success, </span><br /><span style="color: #008000">//   flip, otherwise show error</span><br />Ext.Ajax.request({<br />    url:<span style="color: #006080">'/rpc/Account/Login'</span>, <br />    <span style="color: #0000ff">params</span>: {<br />        Username: loginFormPanel.getValues().username,<br />        Password: loginFormPanel.getValues().password,<br />        RememberMe: loginFormPanel.getValues().rememberMe != <span style="color: #0000ff">null</span><br />    },<br />    success: <span style="color: #0000ff">function</span>(response){<br />        task.cancel(); <br />        Ext.Viewport.unmask(); <br />        basePanel.animateActiveItem(1,{type: <span style="color: #006080">'flip'</span> });<br />    },<br />    failure: <span style="color: #0000ff">function</span>() {<br />        task.cancel(); <br />        Ext.Viewport.unmask(); <br />        Ext.Msg.alert(<span style="color: #006080">&quot;Login Failed&quot;</span>);<br />    }<br />});</pre>
<p></div>
<p>HTH’s!</p>
