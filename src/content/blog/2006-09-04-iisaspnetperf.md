---
status: publish
published: true
pubDatetime: 2006-09-04T20:00:00.000Z
title: Rendering Images With IIS Verses an ASP.NET 2.0 Handler
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: This article will compare the difference between rendering images using an
  HttpHandler and IIS.  It will show the different request processing times for a
  small, medium and large bmp file.  It also discusses using the DefaultHttpHandler.
wordpress_id: 32
wordpress_url: https://peterkellner.net/2006/09/04/iisaspnetperf/
date: '2006-09-04 22:38:24 -0700'
date_gmt: '2006-09-05 05:38:24 -0700'
categories:
- Uncategorized
- ".Net 2.0"
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<h2>Performance Comparison</h2>
<p>Recently, I've been wondering what the difference is between rendering an image using IIS's built in file handling capabilities, or using the asp.net with a custom handler. I decided to do a little test program to simply see the difference in clock time for processing such requests. The results of this test clearly show that IIS is faster. Sometimes a little, and sometimes a lot. I decided to test three size images, and run them each 10 times. Often, there is a start up lag time so the iterations should wash that out.</p>
<p>The table below basically sums up the results pretty well. The resolution of my timer is not great so for small images (35KB), both IIS and the handler processed the image in under 15 milliseconds. There may be a difference but in   <br />my case, it was probably not measurable because of all the other time involved in the request. For Medium size images (550KB), difference is more consistent. Again, it's a timer resolution problem that makes 15 milliseconds probably something related to a CPU click of sorts. For large images (5.6MB) you can clearly see a difference. The time it takes for the handler to process the image is almost double that of IIS.</p>
<p> <!--more-->
<p><img src="/wp/wp-content/uploads/2006/09/IISASPNETPERF.jpg" width="609" height="497" /></p>
<p>Just for the fun of it, if you want to run a URL that has the program that generated these numbers, you can by going to the URL: <a href="http://livedemos.peterkellner.net/ASPNETIISTiming.aspx">http://livedemos.peterkellner.net/ASPNETIISTiming.aspx</a> and the numbers will recalculate live. A couple things to keep in mind here. First, the above URL is running on a hosted site with lots of other customers (specifically, it's hosted at <a href="http://ultimahosts.net/">http://ultimahosts.net/</a> whom I recommend highly and it's running with IIS 6.0.</p>
<p>If you want to experiment yourself with this, I've listed at the bottom of this article the class I associate with an ObjectDataSource to generate these numbers (as well as the HttpHandler and the aspx page). The tables are each GridView's with incoming parameters to the ODS class of number of iterations and the image name in the /Images directory to process. It's really very straight forward.</p>
<h2>Conclusions</h2>
<p>The conclusion is pretty obvious for large images. That is, IIS is better. There are times when you must use   <br />a handler such as when you want to watermark your images or do other custom rendering. If, however that is not    <br />necessary, better to rely on IIS to process the images. Something also to keep in mind is that if you use the    <br />Wild Card Forwarding Option in IIS (only available in IIS6, not IIS5.1), the DefaultHttpHandler will automatically    <br />get invoked for you on file types you do not specifically handle and those images will bounce back and get processed by    <br />IIS 6.0. Here is a good reference from Dominick Baier describing how that works.</p>
<p>(GetWebData.cs) This is the class the ObjectDataSource References.</p>
<div style="border-bottom: #cccccc 1pt solid; border-left: #cccccc 1pt solid; padding-bottom: 1pt; padding-left: 1pt; width: 100%; padding-right: 1pt; font-family: courier new; background: #f5f5f5; color: black; font-size: 10pt; overflow: auto; border-top: #cccccc 1pt solid; border-right: #cccccc 1pt solid; padding-top: 1pt">
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Collections.Generic;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.ComponentModel;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.IO;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Net;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Web;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> Summary description for GetWebData</span></p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span></p>
<p style="margin: 0px">[<span style="color: teal">DataObject</span>(<span style="color: blue">true</span>)] <span style="color: green">// This attribute allows the ObjectDataSource wizard to see this class</span></p>
<p style="margin: 0px"><span style="color: blue">public</span> <span style="color: blue">class</span> <span style="color: teal">GetWebData</span></p>
<p style="margin: 0px">{</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> This is the Select Method used with the class.</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> filename should be the name of the file that is in the images directory</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;iterations&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;fileName&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;returns&gt;&lt;/returns&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; [<span style="color: teal">DataObjectMethod</span>(<span style="color: teal">DataObjectMethodType</span>.Select, <span style="color: blue">true</span>)]</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: teal">List</span>&lt;<span style="color: teal">ResultData</span>&gt; GetWebResults(<span style="color: blue">int</span> iterations, <span style="color: blue">string</span> fileName)</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> absUri = <span style="color: teal">HttpContext</span>.Current.Request.Url.AbsoluteUri;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> absoluteUri = absUri.Substring(0, absUri.LastIndexOf(<span style="color: maroon">&quot;/&quot;</span>));</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">List</span>&lt;<span style="color: teal">ResultData</span>&gt; list = <span style="color: blue">new</span> <span style="color: teal">List</span>&lt;<span style="color: teal">ResultData</span>&gt;(iterations);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">for</span> (<span style="color: blue">int</span> i = 0; i &lt; iterations; i++)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">ResultData</span> rd = <span style="color: blue">new</span> <span style="color: teal">ResultData</span>();</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; rd.FromASPNET1 = ProcessWebRequest(absoluteUri + <span style="color: maroon">&quot;/DisplayBMP.ashx?filename=&quot;</span> + fileName);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; rd.FromIIS = ProcessWebRequest(absoluteUri + <span style="color: maroon">&quot;/Images/&quot;</span> + fileName);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; list.Add(rd);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">return</span> list;</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> This process the requestString passed in and returns</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> the number of ms it took to do that.&#160; It does nothing</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> with the results</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;requestString&quot;&gt;</span><span style="color: green">complete URL</span><span style="color: gray">&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;returns&gt;</span><span style="color: green">milliseconds in process</span><span style="color: gray">&lt;/returns&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">private</span> <span style="color: blue">double</span> ProcessWebRequest(<span style="color: blue">string</span> requestString)</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// used on each read operation (big, 1.5MB)</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// normally, one read is enough, but if it is</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// bigger than 1.5 MB, then it will simply to</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// multiple reads which should not affect timing</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// very much is my guess.</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">byte</span>[] buf = <span style="color: blue">new</span> <span style="color: blue">byte</span>[1500000];</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// prepare the web page we will be asking for</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">HttpWebRequest</span> request = (<span style="color: teal">HttpWebRequest</span>)</p>
<p>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">WebRequest</span>.Create(requestString);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">DateTime</span> startTime = <span style="color: teal">DateTime</span>.Now;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// execute the request</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">HttpWebResponse</span> response = (<span style="color: teal">HttpWebResponse</span>)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; request.GetResponse();</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// we will read data via the response stream</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">Stream</span> resStream = response.GetResponseStream();</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> count;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> bytesRead = 0;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">do</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// fill the buffer with data</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; count = resStream.Read(buf, 0, buf.Length);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// make sure we read some data</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">if</span> (count != 0)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bytesRead += count;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; } <span style="color: blue">while</span> (count &gt; 0); <span style="color: green">// any more data to read?</span></p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">DateTime</span> stopTime = <span style="color: teal">DateTime</span>.Now;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">TimeSpan</span> elapsedTime = stopTime - startTime;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">return</span> elapsedTime.TotalMilliseconds;</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">}</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> A simple class to be used with Generic List</span></p>
<p style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px"><span style="color: blue">public</span> <span style="color: blue">class</span> <span style="color: teal">ResultData</span></p>
<p style="margin: 0px">{</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">private</span> <span style="color: blue">double</span> FromASPNET;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">double</span> FromASPNET1</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">get</span> { <span style="color: blue">return</span> <span style="color: teal">Math</span>.Floor(FromASPNET); }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">set</span> { FromASPNET = <span style="color: blue">value</span>; }</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">private</span> <span style="color: blue">double</span> fromIIS;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">double</span> FromIIS</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">get</span> { <span style="color: blue">return</span> <span style="color: teal">Math</span>.Floor(fromIIS); }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">set</span> { fromIIS = <span style="color: blue">value</span>; }</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">}</p>
</p></div>
<p>&#160;</p>
<p>(DisplayBMP.ashx) The Handler I'm using for the comparison.</p>
<div style="border-bottom: #cccccc 1pt solid; border-left: #cccccc 1pt solid; padding-bottom: 1pt; padding-left: 1pt; width: 100%; padding-right: 1pt; font-family: courier new; background: #f5f5f5; color: black; font-size: 10pt; overflow: auto; border-top: #cccccc 1pt solid; border-right: #cccccc 1pt solid; padding-top: 1pt">
<p style="margin: 0px"><span style="background: yellow">&lt;%</span><span style="color: blue">@</span> <span style="color: maroon">WebHandler</span> <span style="color: red">Language</span><span style="color: blue">=&quot;C#&quot;</span> <span style="color: red">Class</span><span style="color: blue">=&quot;DisplayBMP&quot;</span>&#160; <span style="background: yellow">%&gt;</span></p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Web;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">public</span> <span style="color: blue">class</span> <span style="color: teal">DisplayBMP</span> : <span style="color: teal">IHttpHandler</span> {</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">void</span> ProcessRequest (<span style="color: teal">HttpContext</span> context) {</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">try</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> fileName = context.Server.MapPath(<span style="color: maroon">&quot;Images/medium.bmp&quot;</span>);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">if</span> (<span style="color: teal">HttpContext</span>.Current.Request.QueryString[<span style="color: maroon">&quot;filename&quot;</span>] != <span style="color: blue">null</span>)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; fileName = context.Server.MapPath(<span style="color: maroon">&quot;Images/&quot;</span> + <span style="color: teal">HttpContext</span>.Current.Request.QueryString[<span style="color: maroon">&quot;filename&quot;</span>]);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.Drawing.<span style="color: teal">Bitmap</span> bitMap = <span style="color: blue">new</span> System.Drawing.<span style="color: teal">Bitmap</span>(fileName);</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.IO.<span style="color: teal">MemoryStream</span> ms = <span style="color: blue">new</span> System.IO.<span style="color: teal">MemoryStream</span>();</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bitMap.Save(ms, System.Drawing.Imaging.<span style="color: teal">ImageFormat</span>.Bmp);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">byte</span>[] byteArray = <span style="color: blue">new</span> <span style="color: blue">byte</span>[ms.Length];</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ms.Position = 0;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ms.Read(byteArray, 0, <span style="color: teal">Convert</span>.ToInt32(ms.Length));</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ms.Close();</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ms.Dispose();</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; bitMap.Dispose();</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; context.Response.ContentType = <span style="color: maroon">&quot;image/bmp&quot;</span>;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; context.Response.BinaryWrite(byteArray);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">catch</span> (<span style="color: teal">Exception</span> ee)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">throw</span> <span style="color: blue">new</span> <span style="color: teal">ApplicationException</span>(ee.ToString());</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">finally</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">bool</span> IsReusable {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">get</span> {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">return</span> <span style="color: blue">false</span>;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">}</p>
</p></div>
<p>&#160;</p>
<p>(ASPNETIISTiming.aspx) The aspx page to pull it all together (nothing in the codebehind).</p>
<div style="border-bottom: #cccccc 1pt solid; border-left: #cccccc 1pt solid; padding-bottom: 1pt; padding-left: 1pt; width: 100%; padding-right: 1pt; font-family: courier new; background: #f5f5f5; color: black; font-size: 10pt; overflow: auto; border-top: #cccccc 1pt solid; border-right: #cccccc 1pt solid; padding-top: 1pt">
<p style="margin: 0px"><span style="background: yellow">&lt;%</span><span style="color: blue">@</span> <span style="color: maroon">Page</span> <span style="color: red">Language</span><span style="color: blue">=&quot;C#&quot;</span> <span style="color: red">MasterPageFile</span><span style="color: blue">=&quot;~/MasterPageNoHeadShot.master&quot;</span> <span style="color: red">AutoEventWireup</span><span style="color: blue">=&quot;true&quot;</span> <span style="color: red">CodeFile</span><span style="color: blue">=&quot;ASPNETIISTiming.aspx.cs&quot;</span> <span style="color: red">Inherits</span><span style="color: blue">=&quot;ASPNETIISTiming&quot;</span> <span style="color: red">Title</span><span style="color: blue">=&quot;Untitled Page&quot;</span> <span style="background: yellow">%&gt;</span></p>
<p style="margin: 0px"><span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Content</span> <span style="color: red">ID</span><span style="color: blue">=&quot;Content1&quot;</span> <span style="color: red">ContentPlaceHolderID</span><span style="color: blue">=&quot;ContentPlaceHolder1&quot;</span> <span style="color: red">Runat</span><span style="color: blue">=&quot;Server&quot;&gt;</span></p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">&lt;</span><span style="color: maroon">div</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">table</span> <span style="color: red">border</span><span style="color: blue">=&quot;1&quot;</span> <span style="color: red">cellpadding</span><span style="color: blue">=&quot;15&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">colspan</span><span style="color: blue">=&quot;3&quot;</span> <span style="color: red">style</span><span style="color: blue">=&quot;text-align: center&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; Time Shown is for comparing load time in milliseconds when loading an image from</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; IIS<span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; or using ASP.NET handler.<span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; For Further Discussion on this:<span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">HyperLink</span> <span style="color: red">ID</span><span style="color: blue">=&quot;HyperLink1&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">NavigateUrl</span><span style="color: blue">=&quot;https://peterkellner.net/IISASPNETPerf&quot;&gt;</span>https://peterkellner.net/IISASPNETPerf<span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">HyperLink</span><span style="color: blue">&gt;&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; Small Image (35KB)<span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; Medium Image (550KB)<span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; Large Image (5.6MB)<span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span> <span style="color: red">ID</span><span style="color: blue">=&quot;GridView1&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span><br />style=&quot;color: red;&quot;&gt;AutoGenerateColumns</span><span style="color: blue">=&quot;False&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">DataSourceID</span><span style="color: blue">=&quot;ObjectDataSourceSmall&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span> <span style="color: red">ID</span><span style="color: blue">=&quot;GridView2&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">AutoGenerateColumns</span><span style="color: blue">=&quot;False&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">DataSourceID</span><span style="color: blue">=&quot;ObjectDataSourceMedium&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">td</span> <span style="color: red">style</span><span style="color: blue">=&quot;width: 100px&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span> <span style="color: red">ID</span><span style="color: blue">=&quot;GridView3&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">AutoGenerateColumns</span><span style="color: blue">=&quot;False&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">DataSourceID</span><span style="color: blue">=&quot;ObjectDataSourceLarge&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromIIS&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">BoundField</span> <span style="color: red">DataField</span><span style="color: blue">=&quot;FromASPNET1&quot;       <br /></span><span style="color: red">HeaderText</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: red">SortExpression</span><span style="color: blue">=&quot;FromASPNET1&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">Columns</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">GridView</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">td</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">tr</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">table</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Button</span> <span style="color: red">ID</span><span style="color: blue">=&quot;Button1&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">Text</span><span style="color: blue">=&quot;Recalculate Times&quot;</span> <span style="color: red">Visible</span><span style="color: blue">=&quot;False&quot;</span> <span style="color: blue">/&gt;&lt;</span><span style="color: maroon">br</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">&amp;nbsp;&amp;nbsp;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span> <span style="color: red">ID</span><span style="color: blue">=&quot;ObjectDataSourceMedium&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">SelectMethod</span><span style="color: blue">=&quot;GetWebResults&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">TypeName</span><span style="color: blue">=&quot;GetWebData&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;10&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;iterations&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;Int32&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;medium.bmp&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;fileName&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;String&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span> <span style="color: red">ID</span><span style="color: blue">=&quot;ObjectDataSourceSmall&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">SelectMethod</span><span style="color: blue">=&quot;GetWebResults&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">TypeName</span><span style="color: blue">=&quot;GetWebData&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;10&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;iterations&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;Int32&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;small.bmp&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;fileName&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;String&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span> <span style="color: red">ID</span><span style="color: blue">=&quot;ObjectDataSourceLarge&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span> <span style="color: red">SelectMethod</span><span style="color: blue">=&quot;GetWebResults&quot;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">TypeName</span><span>=&quot;GetWebData&quot;&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;10&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;iterations&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;Int32&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Parameter</span> <span style="color: red">DefaultValue</span><span style="color: blue">=&quot;large.bmp&quot;</span> <span style="color: red">Name</span><span style="color: blue">=&quot;fileName&quot;</span> <span style="color: red">Type</span><span style="color: blue">=&quot;String&quot;</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">SelectParameters</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">ObjectDataSource</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: maroon">div</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">&lt;/</span><span style="color: maroon">asp</span><span style="color: blue">:</span><span style="color: maroon">Content</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px">&#160;</p>
</p></div>
