---
status: publish
published: true
pubDatetime: 2012-01-23T20:00:00.000Z
title: Create A Simple MVC Button Click Listener in SenchaTouch2
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1793
wordpress_url: https://peterkellner.net/2012/01/23/create-a-simple-mvc-button-click-listener-in-senchatouch2/
date: '2012-01-23 21:14:39 -0800'
date_gmt: '2012-01-24 04:14:39 -0800'
categories:
- Visual Studio 2010
- Sencha
- SenchaMVC
- visu
tags: []
---
<p>&#160;</p>
<p>I do not even want to admit how much time I spent today in a more complex application trying to get a <a href="http://www.sencha.com/learn/layout-faq/">button</a> to respond to a tap event in <a href="http://www.sencha.com/products/touch/">SenchaTouch 2.0 Beta</a>.&#160; I did notice several people like me on the forums with similar issues, but I did not find one concrete example that made the simple “click a <a href="http://miamicoder.com/2010/creating-sencha-touch-toolbar-buttons/">button application</a>”.&#160; Of course I’m building this in <a href="http://www.microsoft.com/visualstudio/en-us">Microsoft Visual Studio 2010</a> and debugging with <a href="https://chrome.google.com/">Chrome</a>.&#160; Let me start at the end.&#160; When you are done, you will have a simple two button page that you can click on either button and have your MVC controller react to either button as well as trap the button hit inside the actual Panel.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image12.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb10.png" width="431" height="255" /></a></p>
<p>&#160;</p>
<p>And for those of you that have read enough, here is the source:&#160;&#160;
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:6cf571a4-5052-4531-9334-dc07fcce1ced" class="wlWriterEditableSmartContent">
<p> <a href="/wp/wp-content/uploads/2012/01/Sencha2MVCButtons1.zip" target="_blank">ZIP File Of Project With 2 Buttons and Listeners</a></p>
</div>
<p>&#160;</p>
<p>&#160;</p>
<h2>The Nitty Gritty</h2>
<p>Creating an SenchaTouch project with MVC is a little tricky to setup.&#160; You need to get all the directories right.&#160; My favorite way to do this is to use the Sencha Designer to create the project, then abandon it if I want to strike out on my own.&#160; That is what I’ve done here.&#160; I don’t even think you can tell.</p>
<p>Here is the file layout as seen from Visual Studio:</p>
<p><a href="/wp/wp-content/uploads/2012/01/image13.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb11.png" width="213" height="170" /></a></p>
<p>5 Files and 3 directories.</p>
<p>Let’s first take a look at the Panel that contains the buttons.&#160; Here is the code:</p>
<pre class="csharpcode">Ext.define(<span class="str">'MyApp.view.MyPanel'</span>, {
    extend: <span class="str">'Ext.Panel'</span>,
    alias: <span class="str">'widget.mypanel'</span>,
    config: {
        items: [
            {
                xtype: <span class="str">'button'</span>,
                itemId: <span class="str">'mybutton1'</span>,
                text: <span class="str">'MyButton1'</span>,
                action: <span class="str">'b1'</span>
            },
            {
                xtype: <span class="str">'button'</span>,
                itemId: <span class="str">'mybutton2'</span>,
                text: <span class="str">'MyButton2'</span>,
                action: <span class="str">'b2'</span>
            }
        ],

        listeners: [
            {
                fn: <span class="str">'onMybutton1Tap'</span>,
                <span class="kwrd">event</span>: <span class="str">'tap'</span>,
                <span class="kwrd">delegate</span>: <span class="str">'#mybutton1'</span>
            }
        ]
    },
    onMybutton1Tap: <span class="kwrd">function</span> (button, e, options) {
        console.log(<span class="str">'tap from mybutton1'</span>);
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
.csharpcode .lnum { color: #606060; }</style>
<p>Just a couple things to notice.&#160; 1) I’m defining an itemId which we will only be using in the local event (onMybutton1Tap).&#160; If you notice the listener has a property delegate which looks for that.&#160; I’m not sure if this is the best way to do this.&#160; I’ve notice several forum people saying use the “on” syntax.&#160; I did not find an example of that so this is what we have and it works.&#160; Also notice the action property.&#160; If you try and look that up on the SenchaTouch doc’s you will not find it.&#160; I just made it up out of thin air (really!, well, I followed others examples).&#160; I actually asked about this in the forums and I was told that is OK.&#160; As a type safe language guy, it hurts, but I did it.</p>
<p>&#160;</p>
<p>That’s it for the view.&#160; Let’s move over to the controller.&#160; Here is the source for that:</p>
<pre class="csharpcode">Ext.define(<span class="str">'MyApp.controller.MyController'</span>, {
    extend: <span class="str">'Ext.app.Controller'</span>,

    views: [
        <span class="str">'MyPanel'</span>
    ],

    refs: [
        {
            <span class="kwrd">ref</span>: <span class="str">'MyPanel'</span>,
            selector: <span class="str">'mypanel'</span>
        }],

    init: <span class="kwrd">function</span> () {

        <span class="kwrd">this</span>.control({
            <span class="str">'button[action=b1]'</span>: {
                tap: <span class="kwrd">this</span>.onButtonTap1
            },
            <span class="str">'button[action=b2]'</span>: {
                tap: <span class="kwrd">this</span>.onButtonTap2
            }
        });
    },

    onLaunch: <span class="kwrd">function</span> () {
        console.log(<span class="str">'onLaunch'</span>);
    },

    onButtonTap1: <span class="kwrd">function</span> () {
        console.log(<span class="str">'controller: onButtonTap1'</span>);
    },

    onButtonTap2: <span class="kwrd">function</span> () {
        console.log(<span class="str">'controller: onButtonTap2'</span>);
    },

    config: {

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
.csharpcode .lnum { color: #606060; }</style>
<p>Basically, what this is doing is filtering all buttons, then looking at just the buttons that have an action of b1 or b2.&#160; If this was a large application, we’d probably want to do some more fancy component querying, but for now, this is OK.&#160; If you keep your controllers small, this should always work.</p>
<p>&#160;</p>
<p>That’s it for now.&#160; Download the source and run it.&#160; I hope it saves you a ton of time.&#160; </p>
<p>As always any experts want to comment and improve or correct what I’ve done, please feel free to comment.&#160; </p>
