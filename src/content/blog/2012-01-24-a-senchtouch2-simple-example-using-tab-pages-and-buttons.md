---
status: publish
published: true
pubDatetime: 2012-01-24T20:00:00.000Z
title: A SenchTouch2 Simple Example Using Tab Pages and Buttons
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1799
wordpress_url: https://peterkellner.net/2012/01/24/a-senchtouch2-simple-example-using-tab-pages-and-buttons/
date: '2012-01-24 22:47:41 -0800'
date_gmt: '2012-01-25 05:47:41 -0800'
categories:
- JavaScript
- Sencha
- SenchaTouch
tags: []
---
<p>Again, I find myself going back to basics when trying to make my SenchaTouch2 Project work.&#160; Today, I updated my framework to <a href="http://www.sencha.com/">Sencha’s</a> latest alpha release of the tools (p4).&#160; I often make these examples because I’m trying to prove there is a <a href="http://www.sencha.com/products/touch/">SenchaTouch</a> bug and usually find out it’s my bug somehow.&#160; So, since I went to the trouble of making a simple example of two stand alone buttons that switch between <a href="http://docs.sencha.com/touch/2-0/#!/api/Ext.tab.Panel">tab</a> pages, I thought I’d blog it.</p>
<p>Here is what we get ultimately.&#160; When clicking on b1 or b2, the home and the contact tab are selected automatically (same as clicking on those two items in the tab bar).</p>
<p>One thing I find a little odd, is that to create the class, you say Ext.TabPanel and not Ext.tab.Panel. (OK, I just tested that and both work)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image14.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb12.png" width="244" height="233" /></a></p>
<p>And, here is the code:</p>
<pre class="csharpcode"><span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span><span class="kwrd">&gt;</span>

<span class="rem">&lt;!-- Auto Generated with Sencha Designer --&gt;</span>
<span class="rem">&lt;!-- Modifications to this file will be overwritten. --&gt;</span>
<span class="kwrd">&lt;</span><span class="html">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">meta</span> <span class="attr">http-equiv</span><span class="kwrd">=&quot;Content-Type&quot;</span> <span class="attr">content</span><span class="kwrd">=&quot;text/html; charset=utf-8&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>AgelessST2<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">link</span> <span class="attr">rel</span><span class="kwrd">=&quot;stylesheet&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;text/css&quot;</span> <span class="attr">href</span><span class="kwrd">=&quot;sencha-touch-2.0.0-pr3/resources/css/sencha-touch.css&quot;</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span> <span class="attr">src</span><span class="kwrd">=&quot;sencha-touch-2.0.0-pr3/sencha-touch-all-debug.js&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
    
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span>  &gt;

        Ext.setup({
            onReady: <span class="kwrd">function</span> () {

                <span class="kwrd">var</span> pan = Ext.create(<span class="str">'Ext.TabPanel'</span>, {
                    height: 150,
                    defaults: {
                        styleHtmlContent: <span class="kwrd">true</span>
                    },
                    items: [
                        {

                            title: <span class="str">'Home'</span>,
                            html: <span class="str">'Home Screen'</span>
                        },
                        {

                            title: <span class="str">'Contact'</span>,
                            html: <span class="str">'Contact Screen'</span>
                        }
                    ]
                });

                <span class="kwrd">var</span> buttonPannel = Ext.create(<span class="str">'Ext.Panel'</span>, {
                    layout: <span class="str">'hbox'</span>,
                    items: [
                            {
                                xtype: <span class="str">'button'</span>,
                                text: <span class="str">'b1'</span>,
                                handler: <span class="kwrd">function</span> (button) {
                                    pan.setActiveItem(0);
                                }
                            },
                            {
                                xtype: <span class="str">'button'</span>,
                                text: <span class="str">'b2'</span>,
                                handler: <span class="kwrd">function</span> (button) {
                                    pan.setActiveItem(2);
                                }
                            }
                ]
                });

                Ext.Viewport.add({
                    fullscreen: <span class="kwrd">true</span>,
                    layout: <span class="str">'vbox'</span>,
                    items: [buttonPannel, pan]
                });
            }
        });

      
    
    
    <span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
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
<p>Hope this helps.</p>
