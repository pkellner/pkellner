---
status: publish
published: true
pubDatetime: 2012-05-08T20:00:00.000Z
title: How To Add Paging With a Filter Using Sencha Architect with ExtJS4
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2005
wordpress_url: https://peterkellner.net/?p=2005
date: '2012-05-08 16:38:24 -0700'
date_gmt: '2012-05-08 23:38:24 -0700'
categories:
- Sencha
- ASP.NET 4.0
- Sencha
- Sencha Architect 2
tags: []
---
<p>&#160;</p>
<p>Sometimes,the simplest things can seem complicated.&#160; Well, in this case, after struggling for a while, it turns out the simplest things can actually be pretty simple.&#160; The application I’m building right now (with <a href="http://www.sencha.com/">Sencha’s</a> <a href="http://www.sencha.com/products/extjs/">ExtJS</a> and <a href="http://www.asp.net/">ASP.NET</a>) is a simple log viewer.&#160; My server base app uses <a href="http://nlog-project.org/">NLog</a> which does a great job of logging the errors, but the errors are all on my server and I need to see them.&#160; So, hence I need a simple log viewer.&#160; Here is what it looks like once it’s all done.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/05/image.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/05/image_thumb.png" width="528" height="460" /></a></p>
<p>&#160;</p>
<p>Notice that we have a toolbar that we can check a box in as well as a field to type some text into.&#160; I’m going to assume that creating the windows, the grid, dropping the toolbars on the page (both paging and top toolbar) are something that you know how to do.&#160; The only thing I’m really going to mention is how you go from a grid panel that pages correctly to one that pages correctly with some parameters being sent to the server.</p>
<p>So, it turns out all you have to do is assign an id to each of the controls on your top toolbar, create a <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.AbstractStore-event-beforeload">beforeload</a> store event where you retrieve the values from your toolbar, then set the store’s proxy <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.Connection-cfg-extraParams">extraParams</a> values to be the filter parameters you want passed.&#160; OK, that’s a mouthful so let me show it in steps.</p>
<p>1.&#160; Assign id’s to the toolbar parameters. (screen shot of the checkbox below)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/05/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/05/image_thumb1.png" width="428" height="302" /></a></p>
<p>&#160;</p>
<p>2.&#160; Create a beforeload event in your store for the gridview and get the components you want</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/05/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/05/image_thumb2.png" width="261" height="341" /></a></p>
<p>&#160;</p>
<p>3.&#160; Put some code in the beforeload even that gets these components, then sets the ExtraParams value associated with the stores proxy.</p>
<pre class="csharpcode"><span class="kwrd">var</span> checkboxerroronly = Ext.getCmp(<span class="str">'checkboxerroronlyid'</span>);
<span class="kwrd">var</span> usernamefilter = Ext.getCmp(<span class="str">'usernamefilterid'</span>).getValue();

<span class="kwrd">var</span> displayErrorOnly = checkboxerroronly.<span class="kwrd">checked</span>;
store.proxy.extraParams.errorsOnly = displayErrorOnly;
store.proxy.extraParams.username = usernamefilter;</pre>
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
<p>4. And just run it!&#160; If you look at your network traffic, you will see both the errorsOnly and username parameters passed on every page refresh and page forward and back.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/05/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/05/image_thumb3.png" width="536" height="204" /></a></p>
<p>&#160;</p>
<p>Hope this helps!</p>
<p>(sorry, no source code for this one, just some tips in the middle of a project I’m doing)</p>
