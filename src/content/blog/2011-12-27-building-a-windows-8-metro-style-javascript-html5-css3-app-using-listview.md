---
status: publish
published: true
pubDatetime: 2011-12-27T20:00:00.000Z
title: Building A Windows 8 Metro Style JavaScript / HTML5 / CSS3 App Using ListView
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1745
wordpress_url: https://peterkellner.net/2011/12/27/building-a-windows-8-metro-style-javascript-html5-css3-app-using-listview/
date: '2011-12-27 15:08:36 -0800'
date_gmt: '2011-12-27 22:08:36 -0800'
categories:
- JavaScript
- ".NET 4.5"
- Windows 8
- Windows 8 Store
- HTML
- HTML5
tags: []
---
<p>&#160;</p>
<h3>Background</h3>
<p>The new <a href="http://msdn.microsoft.com/en-us/library/windows/apps/">Windows 8 Developer environment</a> is seriously under documented at this point in it’s product life.&#160; <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft</a> released a “Developer Preview” at the <a href="http://www.buildwindows.com/">Build Conference</a> in September, than has not done any noticeable updates or improvement on those bits.&#160; The Video’s online from build are very helpful because you can go through them in slow motion and see how to make things work.&#160; In this article, I’m going to go through the steps necessary in a lot of detail to build a simple list read-only list viewer of US Congress legislators in California.&#160; At the end, we’ll have something like the following working:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/12/image10.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/12/image_thumb9.png" width="343" height="226" /></a></p>
<p>(actual tablet from build running the app)</p>
<p>&#160;</p>
<p>and the completed solution from Visual Studio 2011 (it’s always nice to have source)</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:1e923b73-d9ba-469f-ad29-75379fe3c99f" class="wlWriterSmartContent">
<p><a href="/wp/wp-content/uploads/2011/12/CongressApp.zip" target="_blank">Visual Studio Project</a></p>
</p></div>
<p>&#160;</p>
<h3>Getting Visual Studio 2011 Going To Create The Project</h3>
<p>First, launch <a href="http://msdn.microsoft.com/en-us/vstudio/hh127353">Visual Studio 2011</a> and give the standard File/New Project choice and chose JavaScript / Windows Metro Style / Fixed Layout Application as follows:</p>
<p><a href="/wp/wp-content/uploads/2011/12/image11.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/12/image_thumb10.png" width="428" height="320" /></a></p>
<p>&#160;</p>
<p>Notice, there are two files we will primary work with, default.js and default.html. </p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/12/image12.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/12/image_thumb11.png" width="244" height="237" /></a></p>
<p>The default.html is a very classic html page with just the standard html doctype, some JavaScript includes, a style sheet and a simple div container.&#160; The default.js is actually what gives this page life.</p>
<p>One thing you’ll quickly discover if you have done much web development before (particularly JavaScript) is that unlike XAML in Visual Studio, there is no design view.&#160; This shouldn’t be an entire surprise because in Microsoft’s ASP.NET MVC, there also is know design view for html files.&#160; However, there is a really big difference here that I don’t see people pointing out clearly enough.&#160; I’m going to say it twice for emphasis.&#160; When you run your Metro App, there is no IE Debug, Firebug or Chrome Developer Tools to look at what are running (OK, I’ll spare saying it again, but this is really critical).&#160; The way most of us do web development that depends on a lot of JavaScript is to launch the application in the browser, then dive into the browser’s debugger and do all there debugging from there (that is by running the Visual Studio project outside the Visual Studio debugger.</p>
<p>Blend to the rescue! (more like fire, and without <a href="http://msdn.microsoft.com/en-us/windows/apps/br229516.aspx">Expression Blend</a>, the house would burn down).&#160; When you right click on the HTML file (as shown below) and open in blend, you will now see the page as if it were being run.&#160; I’ve noticed that if I load my JavaScript data stores from local arrays, those actually render, but if I try to pull data from a live data source they do not.&#160; I’m guessing that’s my misunderstanding for how to do it, rather than a product short coming.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/12/image13.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/12/image_thumb12.png" width="244" height="203" /></a></p>
<p>&#160;</p>
<h3>Putting Down the ListView in HTML</h3>
<p>Let’s get down to some real work here.&#160; First, let’s open the default.html and put down a listview.&#160; Before though, let’s look at what the template gives us (it’s very simple and boring).</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">data-win-control</span><span class="kwrd">=&quot;WinJS.UI.ViewBox&quot;</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;fixed-layout&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">p</span><span class="kwrd">&gt;</span>Content goes here<span class="kwrd">&lt;/</span><span class="html">p</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<p>We’ll add all our stuff to the “Content goes here”.&#160; Fist, let’s add the listview control as follows:</p>
<pre class="csharpcode">&lt;div id=<span class="str">&quot;listview&quot;</span>
   <span class="kwrd">class</span>=<span class="str">&quot;flipView&quot;</span>
   data-win-control=<span class="str">&quot;WinJS.UI.ListView&quot;</span> 
   data-win-options=<span class="str">&quot;{dataSource: itemDataSource, itemRenderer: personTemplate,
       layout: {type: WinJS.UI.GridLayout, maxRows:2}}&quot;</span>
     style=<span class="str">&quot;margin: 15px 15px 15px 15px; left: -3px; top: 10px; height: 100%;width: 100%&quot;</span>&gt;
&lt;/div&gt;</pre>
<p>and the template itself:</p>
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
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">id</span><span class="kwrd">=&quot;personTemplate&quot;</span> <span class="attr">data-win-control</span><span class="kwrd">=&quot;WinJS.Binding.Template&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">style</span><span class="kwrd">=&quot;width: 100%;height: 100%&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">style</span><span class="kwrd">=&quot;margin: 15px 15px 15px 15px&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">data-win-bind</span><span class="kwrd">=&quot;src: govtrack_id convertGovTrackIdToImgTag&quot;</span> 
        <span class="attr">alt</span><span class="kwrd">=&quot;Databound image&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">h3</span><span class="kwrd">&gt;</span>
        Rep <span class="kwrd">&lt;</span><span class="html">span</span> <span class="attr">class</span><span class="kwrd">=&quot;content&quot;</span> <span class="attr">data-win-bind</span><span class="kwrd">=&quot;innerText: firstname&quot;</span><span class="kwrd">&gt;</span>
         <span class="kwrd">&lt;/</span><span class="html">span</span><span class="kwrd">&gt;</span><span class="attr">&amp;nbsp;</span><span class="kwrd">&lt;</span><span class="html">span</span> <span class="attr">class</span><span class="kwrd">=&quot;letter&quot;</span>
            <span class="attr">data-win-bind</span><span class="kwrd">=&quot;innerText: lastname&quot;</span><span class="kwrd">&gt;</span>
         <span class="kwrd">&lt;/</span><span class="html">span</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">h3</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
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
<p>Remembering that any style that begins with data- is ignored by html and can be handled by the program for doing template type stuff, you see here that we have a windows control declared which is based in the WinRT runtime (WinJS.UI.ListView).&#160; We also have options set declaratively here in the data-win-options.&#160; All those can be set in the default.js file which is often easier because the intellisense helps us.</p>
<p>Explaining the options is as follows:</p>
<ol>
<ol>
<li>datasource:&#160; defined in the default.js and is what we refer to this listview’s data source with </li>
<li>itemRenderer: next, I’ll explain this. It points at the div that has the actual rendered template </li>
<li>layout: just says what kind of layout. in our case, GridLayout. </li>
<li>style: should really be set in a class but I got a little lazy since I’m not so good at the CSS stuff </li>
</ol>
</ol>
<p>And, don’t forget to update your depencies (namespaces for all your c# folks out there).&#160; Here are the ones you need to replace in your html file.</p>
<pre class="csharpcode">    <span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span> <span class="attr">src</span><span class="kwrd">=&quot;WinJS/js/base.js&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/ui.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/binding.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/controls.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/res.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/animations.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/uicollections.js&quot;</span>&gt;&lt;/script&gt;
    &lt;script type=<span class="str">&quot;text/javascript&quot;</span> src=<span class="str">&quot;WinJS/js/wwaapp.js&quot;</span>&gt;<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p>&#160;</p>
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
<p>&#160;</p>
<h3>JavaScript File Update</h3>
<p>Finally, let’s update the JavaScript file.&#160; First, we need to create a simple array that we will databind to.&#160; Then, we need to associate that array with the itemDataSource and finally execute.&#160; The only thing tricky we have here is a Converter that takes an Id and build an image src tag for the image control itself.&#160; Notice that the converter is called convertGovTrackIdToImgTag.&#160; It takes in a govTrackId and returns the full blown URL to tick in the image url.</p>
<p>All the source is below.</p>
<p>Hope this helps!</p>
<p>&#160;</p>
<p>&#160;</p>
<pre class="csharpcode">convertGovTrackIdToImgTag = WinJS.Binding.converter(<span class="kwrd">function</span> (govTrackId) {
    <span class="kwrd">var</span> retUrl = <span class="str">'http://www.govtrack.us/data/photos/'</span> + govTrackId + <span class="str">'-50px.jpeg'</span>;
    <span class="kwrd">return</span> retUrl;
});


<span class="kwrd">var</span> itemDataSource = {};

(<span class="kwrd">function</span> () {
    <span class="str">'use strict'</span>;
    <span class="rem">// Uncomment the following line to enable first chance exceptions.</span>
    Debug.enableFirstChanceException(<span class="kwrd">true</span>);

    <span class="rem">//allLegislatorsCreateFile();</span>


    WinJS.Application.onmainwindowactivated = <span class="kwrd">function</span> (e) {
        <span class="kwrd">if</span> (e.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {

            <span class="kwrd">var</span> items = [];
            <span class="kwrd">var</span> itemsFresh = [{
                firstname: <span class="str">&quot;Barack&quot;</span>,
                lastname: <span class="str">&quot;Obama&quot;</span>,
                govtrack_id: <span class="str">&quot;400629&quot;</span>
            },
            {
                firstname: <span class="str">&quot;Adam&quot;</span>,
                lastname: <span class="str">&quot;Smith&quot;</span>,
                govtrack_id: <span class="str">&quot;400379&quot;</span>
            },
            {
                firstname: <span class="str">&quot;Adrian&quot;</span>,
                lastname: <span class="str">&quot;Smith&quot;</span>,
                govtrack_id: <span class="str">&quot;412217&quot;</span>
            }];
            items.push(itemsFresh[0]);
            items.push(itemsFresh[1]);
            items.push(itemsFresh[2]);

            itemDataSource = <span class="kwrd">new</span> WinJS.UI.ArrayDataSource(items);
            WinJS.UI.processAll();
        }
    }
    WinJS.Application.start();
})();</pre>
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
