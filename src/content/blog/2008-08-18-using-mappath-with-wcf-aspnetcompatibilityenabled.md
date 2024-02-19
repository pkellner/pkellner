---
status: publish
published: true
pubDatetime: 2008-08-18T20:00:00.000Z
title: Using MapPath with WCF Service, Setting aspNetCompatibilityEnabled to true
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 135
wordpress_url: https://peterkellner.net/2008/08/18/using-mappath-with-wcf-aspnetcompatibilityenabled/
date: '2008-08-18 10:05:46 -0700'
date_gmt: '2008-08-18 17:05:46 -0700'
categories:
- C#
- JavaScript
- WCF
tags: []
---
<p>I'm just starting out using <a href="http://msdn.microsoft.com/en-us/netframework/aa663324.aspx">WCF</a> in an application for the first time.&#160; I'm using <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2008</a> sp1 and created an asp.net web site from the standard create project wizard.&#160; I then created a simple <a href="http://www.asp.net/ajax/default.aspx?wwwaspnetrdirset=1">AJAX</a>--enabled <a href="http://msdn.microsoft.com/en-us/library/ms733766.aspx">WCF Service</a> as follows:</p>
<p><a href="/wp/wp-content/uploads/2008/08/image.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/08/image-thumb.png" width="381" height="260" /></a></p>
<p>I then added some code to the service that looks like the following (using MapPath):</p>
<p> <!--more-->
<pre class="csharpcode">[ServiceContract(Namespace = <span class="str">&quot;&quot;</span>)]

[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]

<span class="kwrd">public</span> <span class="kwrd">class</span> TrackData

{
    <span class="rem">// Add [WebGet] attribute to use HTTP GET</span>
    [OperationContract]

    <span class="kwrd">public</span> List&lt;TrackDataList&gt; RetrieveTrackDataByLap(<span class="kwrd">int</span> excerciseId, <span class="kwrd">int</span> lapNumberToShow)

    {
        var listTrackData = <span class="kwrd">new</span> List&lt;TrackDataList&gt;();

        <span class="kwrd">string</span> fileName = HttpContext.Current.Server.MapPath(<span class="str">&quot;~/App_Data/sample.tcl&quot;</span>);

        Activity activity = GarminUtils.ConvertTCS(fileName);

I call it with JavaScript <span class="kwrd">as</span> follows:

<span class="rem">/// &lt;reference path=&quot;MapLive.aspx&quot; /&gt;</span>

<span class="rem">/// &lt;reference path=&quot;../VEJS/VeJavaScriptIntellisenseHelper.js&quot; /&gt;</span>

function pageLoad() {

    TrackData.RetrieveTrackDataByLap(0, 0, OnRetrieveTrackDataByLapComplete);

}

function OnRetrieveTrackDataByLapComplete(TrackDataList) {

    alert(<span class="str">'OnRetrieveTrackDataByLapComplete called'</span>);

}</pre>
<p>And, I'm surprised to find that I get a JavaScript error saying MapPath is undefined.&#160; So, after a little digging I discover that I need to set aspNetCompatibilityEnabled to true in my web.config as follows:</p>
<p><a href="/wp/wp-content/uploads/2008/08/xx.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="xx" src="/wp/wp-content/uploads/2008/08/xx-thumb.png" width="421" height="189" /></a></p>
<p>By default, it is set to false.&#160; Hope this Helps!</p>
