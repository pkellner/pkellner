---
status: publish
published: true
pubDatetime: 2013-09-25T20:00:00.000Z
title: Why to declare JavaScript Variables On Top of Functions
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3745
wordpress_url: https://peterkellner.net/?p=3745
date: '2013-09-25 17:56:39 -0700'
date_gmt: '2013-09-26 00:56:39 -0700'
categories:
- JavaScript
tags: []
---
<p>I make this mistake over and over.&#160; It took me years to learn to declare variables NOT at the top of functions but to declare them close to where I use them.&#160; Well, not so much the case in JavaScript.&#160; Say for example you have two for loops that operate on the same variables.&#160;&#160; My expectation from years of experience is to do the following:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">for</span> (<span style="color: #0000ff">var</span> i = 1; i &lt;= 10; i++) {<br />        <span style="color: #0000ff">var</span> itemIdQuery = <span style="color: #006080">&quot;#col&quot;</span> + i;<br />        <span style="color: #0000ff">var</span> panel = Ext.ComponentQuery.query(itemIdQuery)[0];<br />        <span style="color: #0000ff">if</span> (panel.isVisible()) {<br />            visibleTimeColumns++;<br />        }<br />}<br /><br /><span style="color: #0000ff">for</span> (<span style="color: #0000ff">var</span> i = 1; i &lt;= 10; i++) {<br />    <span style="color: #0000ff">var</span> itemIdQuery = <span style="color: #006080">&quot;#col&quot;</span> + i;<br />    <span style="color: #0000ff">var</span> panel = Ext.ComponentQuery.query(itemIdQuery)[0];<br />}</pre>
<p></div>
<div id="codeSnippetWrapper">Well, I think it works but only by accident.&#160; Resharper reminds me that I’m reinstantiating an&#160; already existing variable (itemIdQuery and panel).&#160; What I really should do is the following:</div>
<div>&#160;</div>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: &#39;Courier New&#39;, courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span style="color: #0000ff">var</span> panel;<br /><span style="color: #0000ff">var</span> visibleTimeColumns = 0;<br /><span style="color: #0000ff">var</span> i;<br /><span style="color: #0000ff">for</span> (i = 1; i &lt;= 10; i++) {<br />        itemIdQuery = <span style="color: #006080">&quot;#col&quot;</span> + i;<br />        panel = Ext.ComponentQuery.query(itemIdQuery)[0];<br />        <span style="color: #0000ff">if</span> (panel.isVisible()) {<br />            visibleTimeColumns++;<br />        }<br />}<br /><br /><span style="color: #0000ff">for</span> (i = 1; i &lt;= 10; i++) {<br />    itemIdQuery = <span style="color: #006080">&quot;#col&quot;</span> + i;<br />    panel = Ext.ComponentQuery.query(itemIdQuery)[0];<br />}</pre>
<p></div>
<p>HTH’s.</p>
