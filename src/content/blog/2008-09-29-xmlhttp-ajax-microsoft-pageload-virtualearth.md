---
status: publish
published: true
pubDatetime: 2008-09-29T20:00:00.000Z
title: The Smallest xmlHttp I Could Do And Still Get It Wrong
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 172
wordpress_url: https://peterkellner.net/2008/09/29/xmlhttp-ajax-microsoft-pageload-virtualearth/
date: '2008-09-29 09:11:05 -0700'
date_gmt: '2008-09-29 14:11:05 -0700'
categories:
- Atlas/AJAX
- JavaScript
- web
tags: []
---
<p>I've just started my journey into the land of JavaScript for real and am learning things most of you already know.&#160; For example, as the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> coordinator and web site author, I just recently decided to add a Virtual Earth Map showing attendees and speakers (see the home page).&#160; I wrote a simple web response handler that returns all the data in <a href="http://www.json.org/">JSON</a> so I could plot the data.&#160; Then, after a couple searches on the web, I found a way to send a request to the service asynchronously and get the result. The code looks something like this:</p>
<p> <!--more-->
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">function</span> pageLoad() {</pre>
<pre>        req = <span class="kwrd">new</span> ActiveXObject(<span class="str">&quot;Msxml2.XMLHTTP&quot;</span>);</pre>
<pre class="alt">        <span class="kwrd">if</span> (req) {</pre>
<pre>            req.onreadystatechange = processStateChange;</pre>
<pre class="alt">            req.open(<span class="str">&quot;GET&quot;</span>, <span class="str">&quot;AttendeeZipCode.ashx&quot;</span>, <span class="kwrd">true</span>);</pre>
<pre>            req.send();</pre>
<pre class="alt">        }</pre>
<pre>    }</pre>
<pre class="alt">&#160;</pre>
<pre>    <span class="kwrd">function</span> processStateChange() {</pre>
<pre class="alt">        statusDiv = document.getElementById(<span class="str">&quot;stats&quot;</span>);</pre>
<pre>        <span class="kwrd">if</span> (req.readyState == 0) { statusDiv.innerHTML = <span class="str">&quot;UNINITIALIZED&quot;</span>; }</pre>
<pre class="alt">        <span class="kwrd">if</span> (req.readyState == 1) { statusDiv.innerHTML = <span class="str">&quot;LOADING&quot;</span>; }</pre>
<pre>        <span class="kwrd">if</span> (req.readyState == 2) { statusDiv.innerHTML = <span class="str">&quot;LOADED&quot;</span>; }</pre>
<pre class="alt">        <span class="kwrd">if</span> (req.readyState == 3) { statusDiv.innerHTML = <span class="str">&quot;INTERACTIVE&quot;</span>; }</pre>
<pre>        <span class="kwrd">if</span> (req.readyState == 4) {</pre>
<pre class="alt">            <span class="rem">//statusDiv.innerHTML = &quot;COMPLETE&quot;;</span></pre>
<pre>            GetMap();</pre>
<pre class="alt">            <span class="rem">//statusDiv.innerHTML = req.responseText;</span></pre>
<pre>            <span class="kwrd">var</span> dataObject = json_parse(req.responseText);</pre>
<pre class="alt">&#160;</pre>
<pre>            CreateLayerAttendees();</pre>
<pre class="alt">            CreateLayerSpeakers();</pre>
<pre>            <span class="kwrd">var</span> points = <span class="kwrd">new</span> Array();</pre>
<pre class="alt">            <span class="kwrd">for</span> (<span class="kwrd">var</span> i = 0; i &lt; dataObject.length; i++) {</pre>
<pre>                <span class="kwrd">var</span> lattitude = dataObject[i].lattitude;</pre>
<pre class="alt">                <span class="kwrd">var</span> longitude = dataObject[i].longitude;</pre>
<pre>                points[i] = <span class="kwrd">new</span> VELatLong(lattitude, longitude);</pre>
<pre class="alt">                <span class="kwrd">if</span> (dataObject[i].isSpeaker) {</pre>
<pre>                    AddOnePin(layerSpeaker, lattitude, longitude, <span class="str">&quot;x&quot;</span>, <span class="str">&quot;x&quot;</span>, <span class="kwrd">true</span>);</pre>
<pre class="alt">                }</pre>
<pre>                <span class="kwrd">else</span> {</pre>
<pre class="alt">                    AddOnePin(layerAttendee, lattitude, longitude, <span class="str">&quot;x&quot;</span>, <span class="str">&quot;x&quot;</span>, <span class="kwrd">false</span>);</pre>
<pre>                }</pre>
<pre class="alt">                AddOnePin(layerAttendee, lattitude, longitude, <span class="str">&quot;x&quot;</span>, <span class="str">&quot;x&quot;</span>,dataObject[i].isSpeaker);</pre>
<pre>            }</pre>
<pre class="alt">            map.SetMapView(points);</pre>
<pre>        }</pre>
<pre class="alt">    }</pre>
</div>
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
<p>Well, that worked great until I ran it on Firefox and Chrome.&#160; Basically, nothing happened.&#160; So, off to my smart friends at the local Java Users Group and they suggested I should use a JavaScript library because my solution only works for IE.&#160; With that hint, I grabbed my favorite AJAX book by <a href="/2007/11/26/ajaxinactionbookreview/">Alessandro Gallo, Ajax in Action</a> and started reading.&#160; Turns out, there is indeed a Microsoft Ajax Library solution to this and here it is.</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">function</span> pageLoad() {</pre>
<pre>            <span class="kwrd">var</span> request = <span class="kwrd">new</span> Sys.Net.WebRequest();</pre>
<pre class="alt">            request.set_url(<span class="str">&quot;AttendeeZipCode.ashx&quot;</span>);</pre>
<pre>            request.add_completed(onRequestCompleted);</pre>
<pre class="alt">            request.invoke();</pre>
<pre>        }</pre>
<pre class="alt">&#160;</pre>
<pre>        <span class="kwrd">function</span> onRequestCompleted(executor, args) {</pre>
<pre class="alt">            processResults(executor.get_responseData());</pre>
<pre>        }</pre>
</div>
<p>Now, Firefox, Chrome, and IE all work!&#160; and, look what a nice result we get.</p>
<p><a href="http://www.siliconvalley-codecamp.com/Default.aspx"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb4.png" width="232" height="244" /></a></p>
<p>Hope this helps!</p>
