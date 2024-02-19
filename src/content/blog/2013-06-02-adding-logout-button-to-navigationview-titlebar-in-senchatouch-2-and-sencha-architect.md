---
status: publish
published: true
pubDatetime: 2013-06-02T20:00:00.000Z
title: Adding Logout Button To NavigationView TitleBar in SenchaTouch 2 and Sencha
  Architect
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3633
wordpress_url: https://peterkellner.net/?p=3633
date: '2013-06-02 09:21:18 -0700'
date_gmt: '2013-06-02 16:21:18 -0700'
categories:
- Sencha
- Sencha
- SenchaTouch
- Sencha Architect 2
- ExtJS
tags: []
---
<p>&nbsp;</p>
<p>You would think this would be easy to do in <a href="http://www.sencha.com/">Sencha Touch</a>.  That is, you have something like what I have below, a conference presenter list, and you want a logout button on the title bar.</p>
<p><a href="/wp/wp-content/uploads/2013/06/image.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/06/image_thumb.png" width="357" height="173" border="0" /></a></p>
<p>It turns out it’s not obvious.  Thank goodness for a comment in the SenchaTouch Doc comment section from <a href="http://docs.sencha.com/touch/2.2.0/#!/api/Ext.navigation.View">@dgotty</a> the solution presents itself.</p>
<p>The actual class definition is as follows:</p>
<pre class="csharpcode">Ext.define(<span class="str">'CCApp.view.PresenterNavView'</span>, {
    extend: <span class="str">'Ext.navigation.View'</span>,
    alias: <span class="str">'widget.presenternavview'</span>,

    requires: [
        <span class="str">'CCApp.view.Presenter'</span>
    ],

    config: {
        autoDestroy: <span class="kwrd">false</span>,
        items: [
            {
                xtype: <span class="str">'presenterlist'</span>
            }
        ],
        navigationBar: {
            items: [
                {
                    xtype: <span class="str">'button'</span>,
                    text: <span class="str">'Logout'</span>,
                    align: <span class="str">'right'</span>,
                    handler: <span class="kwrd">function</span>() {
                         <span class="kwrd">var</span> mainPanel = Ext.ComponentQuery.query(<span class="str">"toppanel"</span>)[0];
                        mainPanel.animateActiveItem(0,{type: <span class="str">'flip'</span> });
                    }
                }
            ],
            docked: <span class="str">'top'</span>
        }
    }

});</pre>
<style type="text/css"><!--.csharpcode, .csharpcode pre<br />
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
.csharpcode .lnum { color: #606060; }<br />
--></style>
<p>Getting it into Sencha Architect is a little trickier.</p>
<p>What is needed it to create the items array, then past in the items code.  It looks like this.</p>
<p><a href="/wp/wp-content/uploads/2013/06/image1.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/06/image_thumb1.png" width="537" height="279" border="0" /></a></p>
<p>HTH’s!</p>
