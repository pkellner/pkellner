---
status: publish
published: true
pubDatetime: 2009-11-06T20:00:00.000Z
title: How To View JSON in a Pretty Way
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 378
wordpress_url: https://peterkellner.net/2009/11/06/formatting-json-best-tool/
date: '2009-11-06 09:49:04 -0800'
date_gmt: '2009-11-06 16:49:04 -0800'
categories:
- JavaScript
- MVC
- JSON
tags: []
---
<p>Cutting to the chase, I choose <a href="http://blog.bodurov.com/Formatter-and-colorer-of-raw-JSON-code">Vladimir Bodurov’s Color Formatter!</a></p>
<p>For the past year or so, I’ve been working on a project that uses Microsoft’s <a href="http://www.asp.net/mvc/">ASP.NET MVC</a> for providing data to our pure JavaScript application.&#160; That is, there are no web forms, no dynamic HTML generation, just 100% JavaScript running on the client.&#160; I’m using a library called <a href="http://extjs.com">ExtJS</a> which gives us high quality “forms like” user interactions and MVC for getting the data.&#160; That is, the Application looks like this:</p>
<p><a href="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_thumb.png" width="231" height="283" /></a></p>
<p>The data retrieval URL used by the JavaScript look like:</p>
<p> <!--more-->
<p>http://www.mycompany.com/data/Company/Get</p>
<p>And, the JSON that comes back using either FireBug or Fiddler looks like this:</p>
<p><a href="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_thumb_3.png" width="244" height="170" /></a></p>
<p>Problem is that it’s hard to read the JSON data.&#160; <a href="http://getfirebug.com/">Firebug</a> does a reasonable job of formatting, but it’s still not perfect.&#160; Up until now, the way I always have formatted the data is to type into <a href="http://www.bing.com/search?q=format+json&amp;form=QBLH&amp;qs=n">bing</a> or <a href="http://www.google.com/search?hl=en&amp;source=hp&amp;q=json+format&amp;rlz=1R2GGLL_enUS341&amp;aq=f&amp;oq=&amp;aqi=g-p2g4g-s1g3">Google</a> “format json” and the first reasonable choice has been <a title="http://jsonformat.com/" href="http://jsonformat.com/">http://jsonformat.com/</a>.&#160; Cutting and pasting my data into it shows:</p>
<p><a href="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_thumb_4.png" width="244" height="241" /></a></p>
<p>However, my new favorite JSON Formatter&#160; makes the data look like this:</p>
<p>( <a title="http://www.bodurov.com/JsonFormatter/" href="http://www.bodurov.com/JsonFormatter/">http://www.bodurov.com/JsonFormatter/</a> )</p>
<p>(more information at: <a title="http://blog.bodurov.com/Formatter-and-colorer-of-raw-JSON-code" href="http://blog.bodurov.com/Formatter-and-colorer-of-raw-JSON-code">http://blog.bodurov.com/Formatter-and-colorer-of-raw-JSON-code</a>)</p>
<p>And, it’s available as simple html you can run on your own server here at codeplex:</p>
<p><a title="http://www.codeplex.com/QuickJsonFormatter/Release/ProjectReleases.aspx?ReleaseId=10136" href="http://www.codeplex.com/QuickJsonFormatter/Release/ProjectReleases.aspx?ReleaseId=10136">http://www.codeplex.com/QuickJsonFormatter/Release/ProjectReleases.aspx?ReleaseId=10136</a></p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToViewJSONinaPrettyWay_741F/image_thumb_5.png" width="305" height="393" /></a></p>
<p>IMHO, much cleaner, shows me the data both before and after, as well as colorizes it which always makes me happy.</p>
