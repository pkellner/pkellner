---
status: publish
published: true
pubDatetime: 2014-02-22T20:00:00.000Z
title: In Sencha ExtJS how not to Thrash Precious Memory with Popup Forms
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3956
wordpress_url: https://peterkellner.net/?p=3956
date: '2014-02-22 11:50:00 -0800'
date_gmt: '2014-02-22 18:50:00 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<p>Typically, in the callback of a button that opens a popup window, we just create the window, get access to it’s form and then show it.&#160; The code looks something like this:</p>
<pre class="csharpcode"><span class="kwrd">var</span> data = <span class="kwrd">this</span>.getSessionDetailPanel().data,                
    store = <span class="kwrd">this</span>.getSessionsStore(),                        
    session = store.getById(data.id),
    formWindow = Ext.create(<span class="str">'widget.sessionform'</span>),
    form = formWindow.down(<span class="str">'form'</span>).getForm();
<span class="rem">// do stuff...</span>
formWindow.show();</pre>
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
<p>Assuming the above code is in a <a href="http://www.sencha.com/products/extjs" target="_blank">Sencha ExtJS</a> button handler that brings up the form, the problem is that when the form gets close, the <a href="http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.form.Panel" target="_blank">form panel</a> gets deleted (destroyed) and the next time you use it, it all has to be created again.</p>
<p>A better solution is to add to the form panel definition <a href="http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.form.Panel-cfg-autoDestroy" target="_blank">autoDestroy: false</a> and then keep the created form even after it is closed, and reuse it the next time.&#160; That code might look like the following:</p>
<pre class="csharpcode"><span class="kwrd">var</span> data = <span class="kwrd">this</span>.getSessionDetailPanel().data,                
    store = <span class="kwrd">this</span>.getSessionsStore(),                        
    session = store.getById(data.id);
<span class="kwrd">if</span> (!<span class="kwrd">this</span>.formWindow) {
    <span class="kwrd">this</span>.formWindow = Ext.create(<span class="str">'widget.sessionform'</span>);
}
form = <span class="kwrd">this</span>.formWindow.down(<span class="str">'form'</span>).getForm();
<span class="kwrd">this</span>.formWindow.show();</pre>
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
<p>&#160;</p>
<p>Hope this helps!</p>
