---
status: publish
published: true
pubDatetime: 2014-02-22T20:00:00.000Z
title: How To Properly Dynamically Load a Store With Data in Sencha ExtJS
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3953
wordpress_url: https://peterkellner.net/?p=3953
date: '2014-02-22 09:43:39 -0800'
date_gmt: '2014-02-22 16:43:39 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<h2>Introduction</h2>
<p>For <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a>, I’m busy rewriting the session submission and editor module so that we can very soon begin to accept new session submissions.&#160; For those that had the pleasure of submitting sessions last year, you all know that I did not make your lives very easy.&#160; As <a href="http://codestarssummit.com/Workshop/2014/fun-with-functions-in-javascript-full-day" target="_blank">Douglas Crockford</a> said to me, “I puzzled my way through it”.&#160; Not a ringing endorsement.</p>
<h2>My Latest Learning</h2>
<p>The step I’m working on now is showing the session submitter what session tags are associated with the session they are working on.&#160; I could do this by making a separate query (rest call) to a tags store, or, since I have already pulled in a full session record (from my session rest service) that has the tags in it, I’m better off using that.&#160; This means, I need to iterate through an array of session tags, and load the store.&#160; For those that know <a href="http://www.sencha.com/products/extjs/" target="_blank">ExtJS</a>, you know that I will be easily able to associate this store with a grid panel and the user will see all these sessions.</p>
<p>The wrong way to do this would be to create a loop through the tags array and call session add.&#160; That is, in Pseudo code, it would be something like this:</p>
<pre class="csharpcode">tagStore.removeAll(<span class="kwrd">true</span>);  <span class="rem">// clear store without firing events</span>
<span class="kwrd">for</span> (<span class="kwrd">var</span> i=0;i&lt;datas.sessionTags.length;i++) {
  tagStore.add({ ..datas.sessionTags[i]..});
}</pre>
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
<p>A better way to do this is to first create a native JavaScript Array and then load that array in one step with the store’s loadData method (store.loadData(..) is for loading data arrays and store.load(..) is used when you have a proxy associated with the store.&#160; So, the better way is listed below.&#160; I hope the code details are obvious as to what I’m doing.</p>
<pre class="csharpcode"><span class="kwrd">var</span> bulkAddArray = [];
<span class="kwrd">for</span> (<span class="kwrd">var</span> tagCnt=0;tagCnt&lt;datas.sessionTags.length;tagCnt++) {
  bulkAddArray.push({
     id: datas.sessionTags[tagCnt].id,
     tagName: datas.sessionTags[tagCnt].name,
   });
}
<span class="rem">// false causes the data to be not appended</span>
tagsStore.loadData(bulkAddArray,<span class="kwrd">false</span>); </pre>
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>Then, the final app looks something like this (still a work in progress)</p>
<p><a href="/wp/wp-content/uploads/2014/02/image15.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb15.png" width="443" height="324" /></a> </p>
<p>Hope this helps!</p>
