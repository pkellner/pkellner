---
status: publish
published: true
pubDatetime: 2009-09-18T20:00:00.000Z
title: Some Really Cool LINQ to Help Performance and Show Line Thickness
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 357
wordpress_url: https://peterkellner.net/2009/09/18/linq-groupby-grouplist-uniquesort-mapping/
date: '2009-09-18 10:49:55 -0700'
date_gmt: '2009-09-18 17:49:55 -0700'
categories:
- LINQ
- Visual Studio
tags: []
---
<p>I’ve done a bunch of Lat/Long type mapping programs over the years and one of the problems always ends up around performance.&#160; A common problem is that you keep redrawing the same line over and over and over.&#160; The pixels you are drawing don’t get any darker so all you are doing is wasting time.&#160; In my current project, we were drawing approximately 1500 lines when we really only had about 150 unique lines.&#160; I’ve always known how to solve this problem with a bunch of thrown together hacked up code, but now, <a href="http://www.hookedonlinq.com/LinqToSQL5MinuteOVerview.ashx">LINQ</a> gives me a very clean way to do it.</p>
<p>So, the problem is you have a record that looks like this:</p>
<pre class="csharpcode"> <span class="kwrd">public</span> <span class="kwrd">class</span> LoadSegmentInfoFlat
        {
            <span class="kwrd">public</span> <span class="kwrd">double</span>? OriginLattitude { get; set; }
            <span class="kwrd">public</span> <span class="kwrd">double</span>? OriginLongitude { get; set; }
            <span class="kwrd">public</span> <span class="kwrd">double</span>? DestinationLattitude { get; set; }
            <span class="kwrd">public</span> <span class="kwrd">double</span>? DestinationLongitude { get; set; }
            <span class="kwrd">public</span> <span class="kwrd">string</span> Color { get; set; }
        }</pre>
<p><!--more--></p>
<p>You’ve created a list of these and defined it as follows:</p>
<pre class="csharpcode">var loadSegmentInfoFlats = <span class="kwrd">new</span> List&lt;LoadController.LoadSegmentInfoFlat&gt;();</pre>
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
<p>Now, you want to create a unique list of Lattitude, Longitude Origins and Destinations by color.</p>
<p>The LINQ query that does the trick is a simple group by that creates an anonymous result (which is our answer).&#160; Here is the LINQ query (thanks to my friend in the <a href="http://social.msdn.microsoft.com/Forums/en-US/linqprojectgeneral/thread/3846fd8f-7616-4eb2-a024-7b5dda508a04">MSDN LINQ Forums</a>, Lignzhi Sun).</p>
<pre class="csharpcode">var segments = from a <span class="kwrd">in</span> loadSegmentInfoFlats
               group a by
                   <span class="kwrd">new</span>
                       {
                           a.OriginLattitude,
                           a.OriginLongitude,
                           a.DestinationLattitude,
                           a.DestinationLongitude,
                           a.Color
                       }
               into grouplist
                   select
                   <span class="kwrd">new</span>
                       {
                           grouplist.Key.OriginLattitude,
                           grouplist.Key.OriginLongitude,
                           grouplist.Key.DestinationLattitude,
                           grouplist.Key.DestinationLongitude,
                           grouplist.Key.Color,
                           Count = grouplist.Count()
                       };</pre>
<p>&#160;</p>
<p>The resulting segments in Visual Studio 2008 debugger are as follows:</p>
<p><a href="/FilesForWebDownload/SomeReallyCoolLINQtoHelpPerformanceandSh_931C/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/SomeReallyCoolLINQtoHelpPerformanceandSh_931C/image_thumb.png" width="492" height="321" /></a></p>
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
<p>Hope this helps!</p>
