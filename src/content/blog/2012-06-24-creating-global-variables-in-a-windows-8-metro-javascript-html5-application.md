---
status: publish
published: true
pubDatetime: 2012-06-24T20:00:00.000Z
title: Creating Global Variables In a Windows 8 Metro JavaScript / HTML5 Application
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2058
wordpress_url: https://peterkellner.net/?p=2058
date: '2012-06-24 07:24:15 -0700'
date_gmt: '2012-06-24 14:24:15 -0700'
categories:
- JavaScript
- Windows 8 Store
tags: []
---
<p>The title of this seems ominous and potentially dangerous.&#160; For those that are ready to comment, first think about Globals as Constants, then post away!&#160; The idea is that sometimes you have things in an app that you may want to change system wide.&#160; I just ran into one of those which is the base url of all my services.&#160; To do this, I added to default.js a simple annoymous function that executes.&#160; First, it creates a namespace and assigns the value. It uses <a href="http://msdn.microsoft.com/en-us/library/windows/apps/br212667.aspx">WinJS.Namespace.define</a> for this and is as follows:</p>
<pre class="csharpcode">  app.oncheckpoint = <span class="kwrd">function</span> (args) {
        <span class="rem">// TODO: This application is about to be suspended. Save any state</span>
        <span class="rem">// that needs to persist across suspensions here. If you need to </span>
        <span class="rem">// complete an asynchronous operation before your application is </span>
        <span class="rem">// suspended, call args.setPromise().</span>
        app.sessionState.history = nav.history;
    };

    WinJS.Namespace.define(<span class="str">&quot;AE.Constants&quot;</span>, {
        baseUrl: <span class="str">&quot;http://localhost:24008/&quot;</span>
    });

    app.start();</pre>
<p>
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
<p>I’ve included the app.oncheckpoint just so you can see where I put this. Now, when I want to use baseUrl, here is all I need:</p>
<p>&#160;</p>
<pre class="csharpcode">WinJS.xhr({
                type: <span class="str">&quot;post&quot;</span>,
                url: AE.Constants.baseUrl +  <span class="str">&quot;EmailDetail/GetEmailByPerson&quot;</span>,
                headers: { <span class="str">&quot;Content-type&quot;</span>: <span class="str">&quot;application/x-www-form-urlencoded&quot;</span> },
                data: formParams
                
            }).then(<span class="kwrd">function</span> (xhr) {</pre>
<p>
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>That’s it!&#160; Hope this helps.</p>
