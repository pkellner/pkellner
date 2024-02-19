---
status: publish
published: true
pubDatetime: 2008-11-24T20:00:00.000Z
title: Basic DomHelper with ExtJS Library, creating simple div tags and anchors
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 184
wordpress_url: https://peterkellner.net/2008/11/24/domhelper-extjs-tutorial/
date: '2008-11-24 10:48:25 -0800'
date_gmt: '2008-11-24 15:48:25 -0800'
categories:
- JavaScript
tags: []
---
<p>As I'm learning ExtJS I plan on publishing the things I figure out.&#160; For those that don't know, <a href="http://www.extjs.com">ExtJS</a> is a very rich JavaScript library that gives you all kinds of capabilities that work cross browsers.&#160; Trees, Grid's, Panels, Layouts and all kind of stuff.&#160; For an idea of the kinds of things you can do, check out the demos at there site at this URL:&#160; http://extjs.com/deploy/dev/examples/samples.html. </p>
<p>It's pretty amazing the kinds of things that can be done with just client side JavaScript.&#160; At the core of ExtJS are some very useful JavaScript methods.&#160; In order to take advantage of the more sophisticated features, it's helpful to know the basics first.&#160; In this article, I plan on going through a simple example that will ultimately product html that looks like the following.</p>
<p><a href="/wp/wp-content/uploads/2008/11/image.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/11/image_thumb.png" width="544" height="364" /></a></p>
<p> <!--more-->
<p>Notice that I'm showing this as a screen capture from firebug.&#160; If I were to do a view/source, this is what it would show.</p>
<p><a href="/wp/wp-content/uploads/2008/11/image_3.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/11/image_thumb_3.png" width="540" height="405" /></a></p>
<p>Welcome to JavaScript!&#160; The colors div is generated on the fly.&#160; I'm not 100% sure, but I think this has bad implications for SEO (Search Engine Optimization). More for another post later.&#160; I need to do some experiments.</p>
<p>So, let's dive into the code that is needed to generate this.&#160; My plan here is to show the code, then explain it line by line.&#160; ExtJS is very powerful and DomHelper is one of the cornerstone classes.</p>
<pre style="border-bottom: #cecece 1px solid; border-left: #cecece 1px solid; padding-bottom: 5px; background-color: #fbfbfb; min-height: 40px; padding-left: 5px; width: 650px; padding-right: 5px; overflow: auto; border-top: #cecece 1px solid; border-right: #cecece 1px solid; padding-top: 5px"><pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  1: Ext.onReady(<span style="color: #0000ff">function</span>() {
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  2: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  3:   Ext.BLANK_IMAGE_URL = 'Images/s.gif';
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  4: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  5:   Ext.QuickTips.init();
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  6: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  7:   <span style="color: #0000ff">var</span> colorArray = <span style="color: #0000ff">new</span> <span style="color: #0000ff">Array</span>('red', 'green', 'blue', 'orange');
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  8: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px">  9:   <span style="color: #0000ff">var</span> colorObject = [{
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 10:         id : 'pink',
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 11:         html : 'pink-HTML',
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 12:         tag : 'a',
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 13:         href : 'http:<span style="color: #008000">//www.mycolor.com/pink'</span>
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 14:       }];
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 15: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 16:   <span style="color: #0000ff">var</span> myColor = <span style="color: #0000ff">new</span> Object;
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 17:   myColor.id = 'purple';
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 18:   myColor.html = 'purple-HTML';
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 19:   myColor.tag = 'a';
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 20:   myColor.href = 'http:<span style="color: #008000">//www.mycolor.com/purple'</span>
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 21:   colorObject.push(myColor);
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 22: 
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 23:   <span style="color: #0000ff">for</span> (i = 0; i &lt; colorArray.<span style="color: #0000ff">length</span>; i++) {
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 24:     <span style="color: #0000ff">var</span> colorToAdd = <span style="color: #0000ff">new</span> Object;
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 25:     colorToAdd.id = colorArray[i];
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 26:     colorToAdd.html = colorArray[i] + '-HTML';
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 27:     colorToAdd.tag = 'a';
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 28:     colorToAdd.href = 'http:<span style="color: #008000">//www.mycolor.com/' + colorArray[i];</span>
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 29:     colorObject.push(colorToAdd);
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 30:   }
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 31: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 32:   <span style="color: #0000ff">var</span> colorsDivId = Ext.DomHelper.append(<span style="color: #0000ff">document</span>.body, [{
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 33:             id : 'colors'
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 34:           }]);
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 35: 
</pre>
<pre style="background-color: #ffffff; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 36:   Ext.DomHelper.append(colorsDivId, colorObject);
</pre>
<pre style="background-color: #fbfbfb; margin: 0em; width: 100%; font-family: consolas,&#39;Courier New&#39;,courier,monospace; font-size: 12px"> 37: });</pre>
<p>So, here is what is going on above.</p>
<p>Line 1 is the basic code that you use that tells the JavaScript to start executing after the browser DOM is completely constructed.&#160; if you don't do this, you will get errors when you try and access things like Document.body.</p>
<p>Line 3 does something important, but I don't quite understand what. If you don't do this, you'll find your ExtJS boxes and other graphics look funny.&#160; Hopefully, someone will put a comment on this blog post and then I'll update this comment.</p>
<p>Line 7 is where the fun begins.&#160; My plan is to add a bunch of color hyperlinks to the page using different methods.&#160; Here, I'm simply initializing a JavaScript array of colors.</p>
<p>Line 9-15 initalizes a JavaScript array with one object that has multiple properties.&#160; These will be all associated with one anchor tag.</p>
<p>Line 16-21 creates a simple JavaScript object and assigns the properties of the html anchor tag.</p>
<p>Lines 24-30 iterates through the colors array and builds and array of objects and adds them to the colorObject array.</p>
<p>Line 32 adds a div tag to the body of the page dynamically (id='colors')</p>
<p>line 36 adds the colection of hyperlinks to the just created tag (id='colors')</p>
<p>And, that's it.&#160; This created the html shown at the top.</p>
<p>Here's the code: </p>
<p><a href="/wp/wp-content/uploads/2008/11/ExtTutorial1.zip">ExtTutorial1.zip</a></p>
<p>Good luck!&#160; I'll try and keep publishing as I learn.&#160; ExtJS is awesome!&#160; The doc's are just a little lacking IMHO.</p>
