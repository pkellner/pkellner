---
status: publish
published: true
pubDatetime: 2014-03-06T20:00:00.000Z
title: ExtJS Not Using autoLoad Best Practice
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3960
wordpress_url: https://peterkellner.net/?p=3960
date: '2014-03-06 08:45:20 -0800'
date_gmt: '2014-03-06 15:45:20 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<p>The typical usage pattern in <a href="http://www.sencha.com/" target="_blank">Sencha’s</a> <a href="http://www.sencha.com/products/extjs/" target="_blank">ExtJS</a> for loading data into a visual control such as a grid is to assign a grid to a store, then let the store have <a href="http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Store-cfg-autoLoad" target="_blank">autoLoad</a>: true which means that when the store is created, it will automatically be loaded and since it is assigned to a visual control (grid), the grid will be populated.&#160; I don’t like that pattern.&#160; I like to be more in control.&#160; There may be things I want to do before the grid is loaded.</p>
<p>So, what I do is in the application launch event I load my store first and in my store itself, I explicitly tell it not to autoLoad by setting autoLoad to false.&#160; Below is an example of the code I’m using at the moment to handle this.&#160; Notice that I cleverly show a load mask only if the the store takes more than 500 milliseconds to load.</p>
<pre class="csharpcode">launch: <span class="kwrd">function</span>() {
        <span class="kwrd">var</span> mask = <span class="kwrd">new</span> Ext.LoadMask(Ext.getBody(), {msg:<span class="str">&quot;Loading Data...&quot;</span>});
        <span class="kwrd">var</span> task = <span class="kwrd">new</span> Ext.util.DelayedTask(<span class="kwrd">function</span>(){
            mask.show();
        });
        task.delay(500); <span class="rem">// don't show mask for 500 milliseconds</span>
        <span class="kwrd">var</span> ccyStore = Ext.data.StoreManager.lookup(<span class="str">'CodeCampYear'</span>);
        ccyStore.load({
            scope: <span class="kwrd">this</span>,
            callback: <span class="kwrd">function</span>(records, operation, success) {
                <span class="rem">// do on success</span>
                <span class="kwrd">var</span> codeCampYearFirst = ccyStore.getById(8);
                <span class="kwrd">var</span> codeCampYearId = codeCampYearFirst.get(<span class="str">&quot;id&quot;</span>);
                <span class="kwrd">var</span> sessionsStore = Ext.data.StoreManager.lookup(<span class="str">'Sessions'</span>);
                sessionsStore.load({
                    <span class="kwrd">params</span>: {
                        codeCampYearId: codeCampYearId,
                        withNotApproved: <span class="kwrd">true</span>  <span class="rem">// always get all sessions and let filter deal with approved or not</span>
                    },
                    callback: <span class="kwrd">function</span>(records, operation, success) {
                        task.cancel(); <span class="rem">// make sure mask never shows since we are done</span>
                        mask.hide(); <span class="rem">// mask may or may not be showing but hide anyhow, no harm.</span>
                        Ext.create(<span class="str">'SessionEditor.view.MainView'</span>);
                    }
                });
            }
        });
    }</pre>
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
<p>Hope this helps.</p>
