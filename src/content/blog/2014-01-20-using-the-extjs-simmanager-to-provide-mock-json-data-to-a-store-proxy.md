---
status: publish
published: true
pubDatetime: 2014-01-20T20:00:00.000Z
title: Using the ExtJS SimManager To Provide Mock JSON Data To a Store Proxy
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3895
wordpress_url: https://peterkellner.net/?p=3895
date: '2014-01-20 18:37:34 -0800'
date_gmt: '2014-01-21 01:37:34 -0800'
categories:
- JavaScript
- ExtJS
tags: []
---
<p>I’ve got an ExtJS Store defined as follows:</p>
<pre class="csharpcode">Ext.create(<span class="str">'Ext.data.Store'</span>, {
                    storeId: <span class="str">'testStore'</span>,
                    fields: [<span class="str">'codeCampYearId'</span>, <span class="str">'title'</span>],
                    autoLoad: <span class="kwrd">true</span>,
                    pageSize: 9999,
                    proxy: {
                        type: <span class="str">'rest'</span>,
                        url: <span class="str">'/rest/SessionExt'</span>,
                        reader: {
                            type: <span class="str">'json'</span>,
                            root: <span class="str">'data'</span>
                        }
                    }
                });</pre>
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
<p>I have some JSON data in a local file that I want to use and I don’t want to change the URL.&#160; Using the <a href="http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.ux.ajax.SimManager">ExtJS SimManager</a>, I can make some simple code changes and my ExtJS ajax request will get redirected for me.&#160; Below is the code that takes care of it.</p>
<pre class="csharpcode">Ext.application({
    requires: [
        <span class="str">'Ext.container.Viewport'</span>,
        <span class="str">'Ext.grid.column.Date'</span>,
        <span class="str">'Ext.ux.ajax.SimManager'</span>,
        <span class="str">'Ext.ux.ajax.Simlet'</span>,
        <span class="str">'Ext.data.proxy.Proxy'</span>,
        <span class="str">'Ext.data.proxy.Ajax'</span>,
        <span class="str">'Ext.layout.container.Fit'</span>,
        <span class="str">'Ext.grid.Panel'</span>,
        <span class="str">'Ext.data.Store'</span>,
        <span class="str">'Ext.data.reader.Json'</span>
    ],
    name: <span class="str">'Fiddle'</span>,

    getJsonData: <span class="kwrd">function</span> (dataLocation, whenFinishedExecuteThis) {
        <span class="rem">//return [{ id: 10, title: 'title1', codeCampYearId: 101 }, { id: 20, title: 'title2', codeCampYearId: 101 }];</span>
        Ext.Ajax.request({
            url: dataLocation,
            success: <span class="kwrd">function</span> (response) {
                whenFinishedExecuteThis(Ext.JSON.decode(response.responseText));
            }
        });

    },

    launch: <span class="kwrd">function</span> () {


        <span class="kwrd">this</span>.getJsonData(<span class="str">'/Data/sessionext.json'</span>, <span class="kwrd">function</span> (theData) {
            <span class="kwrd">var</span> myData = theData.data;
            Ext.ux.ajax.SimManager.init({
                delay: 600
            }).register({
                <span class="str">'/rest/SessionExt'</span>: {
                    stype: <span class="str">'json'</span>, <span class="rem">// use JsonSimlet (stype is like xtype for components)</span>
                    data: myData
                }
            });

            Ext.create(<span class="str">'Ext.container.Viewport'</span>, {
                layout: <span class="str">'fit'</span>,
                items: [
                    {
                        xtype: <span class="str">'sessions'</span>
                    }
                ]
            });
        });

        Ext.create(<span class="str">'Ext.data.Store'</span>, {
            storeId: <span class="str">'testStore'</span>,
            fields: [<span class="str">'codeCampYearId'</span>, <span class="str">'title'</span>],
            autoLoad: <span class="kwrd">true</span>,
            pageSize: 9999,
            proxy: {
                type: <span class="str">'rest'</span>,
                url: <span class="str">'/rest/SessionExt'</span>,
                reader: {
                    type: <span class="str">'json'</span>,
                    root: <span class="str">'data'</span>
                }
            }
        });

        <span class="kwrd">var</span> myPanel = Ext.create(<span class="str">'Ext.grid.Panel'</span>, {
            title: <span class="str">'Session Data'</span>,
            store: Ext.data.StoreManager.lookup(<span class="str">'testStore'</span>),
            scroll: <span class="kwrd">true</span>,
            columns: [
                { text: <span class="str">'title'</span>, dataIndex: <span class="str">'title'</span>, flex: 1 },
                { text: <span class="str">'codeCampYearId'</span>, dataIndex: <span class="str">'codeCampYearId'</span> },
                { text: <span class="str">'id'</span>, dataIndex: <span class="str">'id'</span> },
            ]
        });

        Ext.create(<span class="str">'Ext.container.Viewport'</span>, {
            layout: <span class="str">'fit'</span>,
            items: [
                myPanel
            ]
        });

    }
});</pre>
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
<p>Hope this helps!</p>
