---
status: publish
published: true
pubDatetime: 2012-01-09T20:00:00.000Z
title: Building a Simple 2 Card Carousel with SenchaTouch 2
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1770
wordpress_url: https://peterkellner.net/2012/01/09/building-a-simple-2-card-carousel-with-senchatouch-2/
date: '2012-01-09 14:58:01 -0800'
date_gmt: '2012-01-09 21:58:01 -0800'
categories:
- JavaScript
- Sencha
tags: []
---
<p>It was surprisingly difficult for me to build a very simple <a href="http://www.sencha.com/learn/touch">Carousel</a> application with <a href="http://www.sencha.com/products/touch/">SenchaTouch</a> 2.0 so I thought I’d make a short blog post with the example code in the hopes it saves someone else some time.&#160; Basically, since this runs from the <a href="http://www.sencha.com/">Sencha</a> CDN, you should be able to paste this code directly into your web site as an html page and it should run directly.</p>
<p>The fact that you have to have an items array inside an items array is a little confusing as well as having to specify the height or nothing comes out.&#160; I’m used to using flex: 1 to get the width right, but I had forgotten about height.</p>
<p>Here is what is created and the html and <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> code.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image4.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb3.png" width="244" height="175" /></a></p>
<p>&#160;</p>
<p>and the html:</p>
<p>&#160;</p>
<pre class="csharpcode"><span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">meta</span> <span class="attr">http-equiv</span><span class="kwrd">=&quot;Content-Type&quot;</span> <span class="attr">content</span><span class="kwrd">=&quot;text/html; charset=utf-8&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>SenchaTouch 2.0 Carousel Example From PeterKellner.net<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">link</span> <span class="attr">rel</span><span class="kwrd">=&quot;stylesheet&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;text/css&quot;</span> <span class="attr">href</span><span class="kwrd">=&quot;http://extjs.cachefly.net/touch/sencha-touch-designer-edition/resources/css/sencha-touch.css&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span> <span class="attr">src</span><span class="kwrd">=&quot;http://extjs.cachefly.net/touch/sencha-touch-designer-edition/sencha-touch-all-debug.js&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span>&gt;

        Ext.setup({
            fullscreen: <span class="kwrd">true</span>,
            onReady: <span class="kwrd">function</span> () {
                Ext.create(<span class="str">'Ext.Panel'</span>, {
                    fullscreen: <span class="kwrd">true</span>,
                    height: 200,
                    items: [{
                        xtype: <span class="str">'carousel'</span>,
                        height: 200,
                        items: [
                                {
                                    title: <span class="str">'title card 1'</span>,
                                    html: <span class="str">'card1'</span>,
                                    cls: <span class="str">'card1'</span>
                                },
                                {
                                    title: <span class="str">'title card 2'</span>,
                                    html: <span class="str">'card2'</span>,
                                    cls: <span class="str">'card2'</span>
                                }
                            ]
                    }]
                });
            }
        });
    <span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
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
<p>HTH’s</p>
