---
status: publish
published: true
pubDatetime: 2014-02-13T20:00:00.000Z
title: ExtJS form cancel, Save Changes If Changes Have Been Made
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3926
wordpress_url: https://peterkellner.net/?p=3926
date: '2014-02-13 11:32:57 -0800'
date_gmt: '2014-02-13 18:32:57 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<p>&#160;</p>
<p>It seems like when a user cancels out of form after making changes, the obvious thing that should happen is:</p>
<ul>
<li>If Changes Have Been Made, Prompt User To Save </li>
<li>If No Changes Have Been Made Just Exit Pretty simple, but we still have to do it.</li>
</ul>
<ul>Without showing all the detail code, consider the code below which runs in the Sencha ExtJS MVC controller that gets executed when the user presses cancel on a running form like the following:</ul>
<p> <a href="/wp/wp-content/uploads/2014/02/image5.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb5.png" width="462" height="319" /></a>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2014/02/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb6.png" width="244" height="132" /></a> </p>
<p>The JavaScript Code is as follows:</p>
<pre class="csharpcode">onCancelbuttonsessionitemidClick: <span class="kwrd">function</span>(button, e, eOpts) {
        <span class="kwrd">var</span> form = button.up(<span class="str">'form'</span>).getForm(),
            formWindow = button.up(<span class="str">'window'</span>),
            session = form.getRecord(),
            store = <span class="kwrd">this</span>.getSessionsStore();

        <span class="kwrd">if</span> (form.isDirty()) {
             Ext.Msg.show({
               title:<span class="str">'Save Changes?'</span>,
               msg: <span class="str">'Save Your Changes Before Exiting?'</span>,
               buttons: Ext.Msg.YESNOCANCEL,
                 fn: <span class="kwrd">function</span>(text) {
                     <span class="kwrd">if</span> (text == <span class="str">'yes'</span>) {
                       form.updateRecord();
                       store.sync();
                       formWindow.destroy();
                     } <span class="kwrd">else</span> <span class="kwrd">if</span> (text === <span class="str">'no'</span>) {
                       formWindow.destroy();
                     } <span class="kwrd">else</span> <span class="kwrd">if</span> (text === <span class="str">'cancel'</span>) {
                        <span class="rem">// do nothing</span>
                     }
                 }
            });
        } <span class="kwrd">else</span> {
            formWindow.destroy();
        }
    },</pre>
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
.csharpcode .lnum { color: #606060; }</style>
