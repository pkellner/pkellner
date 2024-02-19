---
status: publish
published: true
pubDatetime: 2008-08-16T20:00:00.000Z
title: Convert Garmin 705 Navigator TCX Format using LINQ to XML and Data Objects
  - Article 1
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>In this post, we will discuss what is necessary to convert the file created
  from a Garmin 705 navigator to C# .net Data Objects.  We will use LINQ to XML to
  perform this function</p>"
wordpress_id: 130
wordpress_url: https://peterkellner.net/?p=353
date: '2008-08-16 16:51:35 -0700'
date_gmt: '2008-08-16 23:51:35 -0700'
categories:
- ASP.NET 3.5
- Garmin
- LINQ
- XML
tags: []
---
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:49a18748-824c-4841-930e-2404c7ac586c" class="wlWriterSmartContent">
<p>Solution File For VisualStudio 2008 <a href="/wp/wp-content/uploads/2008/08/garminwebconversiononly.zip" target="_blank">GarminWebConversionOnly.zip</a></p>
</p></div>
<p>Several months ago, I bought a <a href="https://buy.garmin.com/shop/shop.do?pID=10885&amp;locale=en_US">Garmin 705</a> Navigator for my bike.&#160; As a gadget junkie, I always want to have the latest stuff.&#160; For years, I've used Polar Heartrate monitors, but the idea of having maps on my handle bars was just to much to pass up.&#160; Since the Garmin's output is an XML file I figure I have an obligation to unravel it, and what better tool to do this than Microsoft's LINQ to XML.&#160; Many months ago I posted a <a href="/2008/01/18/tivospaceviewerwithlinq/">similar article using LINQ to XML for showing the amount of space that was used on my TIVO by category</a>.&#160; This article is not quite an end to end solution like that one.&#160; It's just a first step.&#160; What we will show is the steps necessary to convert the TCS file in data objects which we can use in future posts for display with technologies such as windows live maps.</p>
<p> <!--more-->
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:7dc1bd33-94bd-46fd-a20b-0131235bcd47:3a6f4041-2e11-4aa3-a554-1d4a8a352ccd" class="wlWriterSmartContent">
<table border="0" cellspacing="0" cellpadding="2" width="400">
<tbody>
<tr>
<td valign="top" width="400">
<p><a title="Amazon.com: Garmin Edge 705 Bicycle Computer and GPS Navigator with Heart Rate Monitor and Speed/Cadence Sensor" href="http://www.amazon.com/exec/obidos/ASIN/B000VREP8A/petkelsblo-20"><img border="0" align="left" src="http://images.amazon.com/images/P/B000VREP8A.01.MZZZZZZZ.jpg" />Amazon.com: Garmin Edge 705 Bicycle Computer and GPS Navigator with Heart Rate Monitor and Speed/Cadence Sensor</a></p>
</td>
</tr>
</tbody>
</table></div></p>
<p>So, let's begin.&#160; The first thing you need to do is plug your <a href="http://www.garmin.com/garmin/cms/site/us">Garmin</a>&#160; 705 into your USB port and you will see all the TCX files nicely arranged on the drive as follows.</p>
<p><a href="/wp/wp-content/uploads/2008/08/xxx.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="xxx" src="/wp/wp-content/uploads/2008/08/xxx-thumb.png" width="354" height="285" /></a></p>
<p>If you look at any of these files, you'll see an xml formatted file that begins like the following:</p>
<p><a href="/wp/wp-content/uploads/2008/08/ttt.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="ttt" src="/wp/wp-content/uploads/2008/08/ttt-thumb.png" width="360" height="426" /></a></p>
<p>You will notice it has a schema associated with it (xmlns=&quot;http://..&quot;).&#160; The schema docs can be found on Garmin's web site here:&#160; <a title="http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" href="http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd">http://www8.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd</a></p>
<p>Looking at the schema, it's clear that we need to build several c# classes to use that we will extract the xml data into.&#160; Below is a class diagram built with Visual Studio 2008 that shows the classes.</p>
<p><a href="/wp/wp-content/uploads/2008/08/z1.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="z1" src="/wp/wp-content/uploads/2008/08/z1-thumb.png" width="554" height="176" /></a></p>
<p>I don't quite know the tricks for using the associated relationships necessary with the class builder to make this look pretty, but what we have is an Activity class that holds Laps by using a generic list of the Lap.&#160; Lap's contain Track's, Track's contain many TrackPoint's which are the locations, and each Trackpoint represents a geographical position.</p>
<p>Here are what the classes look like.</p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre>&#160;</pre>
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">class</span> Activity</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">string</span> Id { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">string</span> Sport { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> List&lt;Lap&gt; Laps { set; get; }</pre>
<pre>}</pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">public</span> <span class="kwrd">class</span> Lap</pre>
<pre class="alt">{</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">double</span> TotalTimeSeconds { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">double</span> DistanceMeters { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">double</span> MaximumSpeed { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">int</span> Calories { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">string</span> TriggerMethod { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">int</span> AverageHeartRateBpm { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">int</span> MaximumHeartRateBpm { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">string</span> Intensity { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">int</span> Cadence { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">string</span> Notes { set; get; }</pre>
<pre>    <span class="kwrd">public</span> List&lt;Track&gt; Tracks { set; get; }</pre>
<pre class="alt">}</pre>
<pre> </pre>
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">class</span> Track</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> List&lt;TrackPoint&gt; TrackPoints { set; get; }</pre>
<pre>}</pre>
<pre class="alt"> </pre>
<pre><span class="kwrd">public</span> <span class="kwrd">class</span> TrackPoint</pre>
<pre class="alt">{</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">string</span> Timex { set; get; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">double</span> AltitudeMeters { get; set; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">double</span> DistanceMeters { get; set; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">int</span> HeartRateBpm { get; set; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">int</span> Cadence { get; set; }</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">string</span> SensorState { get; set; }</pre>
<pre>    <span class="kwrd">public</span> List&lt;Position&gt; Positionx { get; set; }</pre>
<pre class="alt">}</pre>
<pre> </pre>
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">class</span> Position</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">double</span> LatitudeDegrees { set; get; }</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">double</span> LongitudeDegrees { set; get; }</pre>
<pre class="alt">}</pre>
</div>
<p>And now, the LINQ that loads the Activity object which in turn references everything else.</p>
<h2>The LINQ To Data Object</h2>
<p>The first thing that needs to happen is that a XNamespace has to be declared and a root defined of the XML tree.&#160; Let's assume we have a filename of the tcx file already.&#160; Then, to do these things, we issue the following lines of code:</p>
<div class="csharpcode">
<pre class="alt">XElement root = XElement.Load(fileName);</pre>
<pre>&#160;</pre>
<pre class="alt">XNamespace ns1 = <span class="str">&quot;http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2&quot;</span>;</pre>
</div>
<p>The technique we will use to load these objects is borrowed from one of my favorite LINQ books, <a href="http://www.amazon.com/exec/obidos/ASIN/1933988169/petkelsblo-20">LINQ in Action</a>, page 391.&#160; Basically, we are creating an instance of the Activity class which in turns loads all the other classes.&#160; That is, we have a top level element named Activities and from that we create an instance of the Activity class.&#160; It begins like this:</p>
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span>IEnumerable&lt;Activity&gt; activities = from activityElement <span class="kwrd">in</span> root.Descendants(ns1 + <span class="str">&quot;Activities&quot;</span>)</pre>
<pre><span class="lnum">   2:  </span>    select <span class="kwrd">new</span> Activity</pre>
<pre class="alt"><span class="lnum">   3:  </span>        {</pre>
<pre><span class="lnum">   4:  </span>            Laps =</pre>
<pre class="alt"><span class="lnum">   5:  </span>                (from lapElement <span class="kwrd">in</span></pre>
<pre><span class="lnum">   6:  </span>                    activityElement.Descendants(ns1 + <span class="str">&quot;Lap&quot;</span>)</pre>
<pre class="alt"><span class="lnum">   7:  </span>                        select <span class="kwrd">new</span> Lap</pre>
<pre><span class="lnum">   8:  </span>                            {</pre>
<pre class="alt"><span class="lnum">   9:  </span>                                TotalTimeSeconds =</pre>
<pre><span class="lnum">  10:  </span>                                    lapElement.Element(ns1 +</pre>
<pre class="alt"><span class="lnum">  11:  </span>                                        <span class="str">&quot;TotalTimeSeconds&quot;</span>) != <span class="kwrd">null</span></pre>
<pre><span class="lnum">  12:  </span>                                        ? Convert.ToDouble( </pre>
<pre class="alt"><span class="lnum">  13:  </span>                                        (<span class="kwrd">string</span>) lapElement.Element(ns1 + <span class="str">&quot;TotalTimeSeconds&quot;</span>)</pre>
<pre><span class="lnum">  14:  </span>                                        .Value)</pre>
<pre class="alt"><span class="lnum">  15:  </span>                                        : 0.00,</pre>
<pre><span class="lnum">  16:  </span>                                DistanceMeters =</pre>
<pre class="alt"><span class="lnum">  17:  </span>                                    lapElement.Element(ns1 +</pre>
<pre><span class="lnum">  18:  </span>                                        <span class="str">&quot;DistanceMeters&quot;</span>) != <span class="kwrd">null</span></pre>
<pre class="alt"><span class="lnum">  19:  </span>                                        ? Convert.ToDouble(</pre>
<pre><span class="lnum">  20:  </span>                                        (<span class="kwrd">string</span>) lapElement.Element(ns1 + <span class="str">&quot;DistanceMeters&quot;</span>)</pre>
<pre class="alt"><span class="lnum">  21:  </span>                                        .Value)</pre>
<pre><span class="lnum">  22:  </span>                                        : 0.00,</pre>
<pre class="alt"><span class="lnum">  23:  </span>                                MaximumSpeed =</pre>
<pre><span class="lnum">  24:  </span>                                        lapElement.Element(ns1 + <span class="str">&quot;MaximumSpeed&quot;</span>) !=...</pre>
</div>
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
<p>&#160;</p>
<p>Line 1 creates an enumeration of activities.&#160; Since an activity inclues a generic list of Laps, we need to generate another enumeration of laps on line 4.&#160; Lines 9 through 23 basically pull the individual element values from the laps.&#160; What is not shown is there is similar details which drills down from Laps to Track's, then to TrackPoint's, then finally to position.&#160; Since what is stored in class instances is actually generic Lists, at the end of each select, there is the function ToList() called which in turn creates that generic list.&#160; The source code for this is all included at the top of the post.&#160; Take a close look at the file GarminUtils.cs for how this really works.&#160; It currently has minimal error checking, but for my cycling files, it seems to do the job.</p>
<h2>Looking Forward</h2>
<p>I'm planning on doing several more posts in this series to actually use this data.&#160; <a href="http://blogs.msdn.com/bethmassi/archive/2007/12/03/northwind-meets-virtual-earth-generate-ve-maps-with-linq.aspx">Beth Massi has examples</a> she has written that use Live Maps with <a href="http://msdn.microsoft.com/en-us/magazine/cc163400.aspx">LINQ</a>.&#160; I'm hoping I can do something similar to what she has done.</p>
<p>Feel free to add to this and let me know what you've done.&#160; Maybe we can even make this a <a href="http://www.codeplex.com/">codeplex</a> project at some point.</p>
<p>Bye for now.</p>
