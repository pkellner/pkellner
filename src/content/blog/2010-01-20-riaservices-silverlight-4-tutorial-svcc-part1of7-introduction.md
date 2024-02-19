---
status: publish
published: true
pubDatetime: 2010-01-20T20:00:00.000Z
title: Introduction To Using RIA Services In Silverlight (Article 1 of 7)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 405
wordpress_url: https://peterkellner.net/?p=405
date: '2010-01-20 12:12:09 -0800'
date_gmt: '2010-01-20 19:12:09 -0800'
categories:
- C#
- Silverlight
- web
- Speaking
- Visual Studio 2010
- RIA Services
- VS2010
- ".NET 4.0"
- Entity Framework
tags:
- XAML
---
<p>This series of video presentations goes through the process of building a Speaker and Sessions Viewer for Silicon Valley Code Camp’s data using <a href="http://blogs.msdn.com/brada/">Silverlight 4</a> and <a href="http://silverlight.net/getstarted/riaservices/">RIA Services</a> (Using Visual Studio 2010 Beta 2).&#160; It starts with a brief introduction of RIA Services and is followed by screen casts and blog posts the parallel each screen cast.</p>
<p>The actual <a href="/2010/01/13/baynet-presentation-riaservices/">presentation</a> was done at the Microsoft office in San Francisco. </p>
<p> <!--more--><br />
<table width="90%">
<tbody>
<tr>
<td width="70">&#160;</td>
<td>Title Of Each Article</td>
<td style="width: 100px" width="150">Video Included With Each Post</td>
</tr>
<tr>
<td width="70">Part 1</td>
<td><a href="/2010/01/20/riaservices-silverlight-4-tutorial-svcc-part1of7-introduction/">Introduction To RIA Services In Silverlight (This Article)</a></td>
<td style="width: 100px" width="150">7 Minutes</td>
</tr>
<tr>
<td width="70">Part 2</td>
<td><a href="/2010/01/25/basic-ria-services-and-datagrid-with-vs-2010-tooling-article-2-of-7/">Basic RIA Services And DataGrid With&#160; VS 2010 Tooling</a></td>
<td style="width: 100px" width="150">14 Minutes</td>
</tr>
<tr>
<td width="70">Part 3</td>
<td><a href="/2010/01/23/adding-a-datagrid-with-connect-the-dots-databinding-in-vs-2010-article-3-of-7/">Adding A DataGrid With Connect The Dots DataBinding in VS 2010</a></td>
<td style="width: 100px" width="150">13 Minutes</td>
</tr>
<tr>
<td width="70">Part 4</td>
<td><a href="/2010/01/25/adding-a-navigation-page-to-a-silverlight-business-application-template-article-4-of-7/">Adding a Navigation Page to a Silverlight Business Application Template</a></td>
<td style="width: 100px" width="150">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 5</td>
<td><a href="/2010/01/25/adding-speakers-page-template-with-converters-in-visual-studio-2010-beta2-article-5-of-7/">Adding Speakers Page Template With Converters In Visual Studio 2010 Beta2</a></td>
<td style="width: 100px" width="150">11 Minutes</td>
</tr>
<tr>
<td width="70">Part 6</td>
<td><a href="/2010/01/25/adding-a-sessions-page-that-includes-a-query-parameter-in-silverlight-vs2010-article-6-of-7/">Adding A Sessions Page That Includes a Query Parameter In Silverlight VS2010 Beta2</a></td>
<td style="width: 100px" width="150">10 Minutes</td>
</tr>
<tr>
<td width="70">Part 7</td>
<td><a href="/2010/01/25/authentication-and-authorization-using-ria-services-article-7-of-7/">Basic Authentication and Authorization In RIA Services</a></td>
<td style="width: 100px" width="150">5 Minutes</td>
</tr>
</tbody>
</table>
<p> 
<p>[media id=1]</p>
<p>I’ve heavily borrowed from Brad Abrams <a href="http://blogs.msdn.com/brada/archive/2009/11/19/pdc09-talk-building-amazing-business-applications-with-silverlight-4-ria-services-and-visual-studio-2010.aspx">PDC09 presentation</a> here and am very thankful for the help.&#160; I’m personally very excited about the opportunities <a href="http://silverlight.net/getstarted/riaservices/">RIA Services</a> gives us as developers to efficiently build powerful multi tier applications without compromise.</p>
<p>I’d recommend going to Brad Abrams PDC09 presentation mentioned above to get a better understanding of what Microsoft was thinking and its plans for RIA Services. The way I see it is RIA Services is built on the WCF Stack.&#160; It basically is a technology that let’s the developer create both client and server code at the same time.&#160; It essentially removes the middle layer form a development perspective, but keeps it there in a very physical way using all the power of WCF.&#160; For example, you create you logic on the server side and that code automatically gets migrated to the client for simplicity of calling.</p>
<p>For those interested where the motivation came from to to this, it’s an interesting story.&#160; Last week, <a href="http://blog.brandewinder.com/">Mathias Brandewinder</a>, the organizer of our local Bay.Net San Francisco user group emailed and asked if I could fill in last minute for the upcoming (actually today’s) bay.net meeting and, could I talk about RIA Services.&#160; Well, 2 years or so ago, I did a quite extensive Silverlight 1.1 project for Leverage Software using the first beta of the .CLR release of Silverlight (C#).&#160; I have to say, it was an awful experience.&#160; So, now at <a href="http://www.silverlight.net/">Silverlight</a> 4.0, RIA Services, I’m back and very excited. </p>
<p>By way of people that have helped me in the last week to get this far, just to name a few:&#160; <a href="http://blogs.msdn.com/brunoterkaly/default.aspx">Bruno Terkaly</a>, offering to do whatever he could and giving me tech tips, <a href="http://blogs.msdn.com/synergist/">Michael Scherotter</a> in “going to town” as he says to make the Speaker’s page look really nice in a live meeting, <a href="http://victorgaudioso.wordpress.com/">Victor Gaudioso</a> in taking time on his busy weekend to call me&#160; and offer help, <a href="http://blogs.msdn.com/brada/archive/2010/01/17/great-ria-services-overview-in-dr-dobbs.aspx">Brad Abrams</a> putting up with my list of naive questions and patiently responding, a slew of <a href="http://aspinsiders.com/default.aspx">ASPInsiders</a> who pointed me at an excellent place to host the videos, and <a href="http://hackingsilverlight.blogspot.com/">David Kelly</a> for giving me a nicely styled Silverlight player to show the videos on this blog.</p>
<p>I’m sitting in the mall below the <a href="http://www.microsoft.com/about/companyinformation/usaoffices/northwest/sanfrancisco.mspx">Microsoft Office in San Francisco</a> where the presentation will be in about 2 hours.&#160; Hopefully, I’ll finish all seven articles and get them posted to the internet very soon.&#160; I did the videos as just practice for my presentation.&#160; They are not polished or edited.&#160; I’m taking the chance of posting them in the hopes that they help someone struggling with all the new features like I have been during the last week.</p>
<p>Finally, this demo is built on live <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> Data that has been collected over the past 4 years.&#160; I can’t really publish that database along with the completed solution before I clean and randomize the attendee data.&#160; Meanwhile, I will post the project code but it will not work until I’ve had a chance to clean up the database.&#160; My thinking is that it’s all positive and better to release the code now rather than wait until I have the database cleaned up.</p>
<p>Below is what the end result of what we are building will look like (if you make it through all the articles and videos).</p>
<p><a href="/FilesForWebDownload/UsingRIAServicesWithVisualStudio2010Beta_94F1/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingRIAServicesWithVisualStudio2010Beta_94F1/image_thumb.png" width="414" height="494" /></a></p>
<p>Attached here is source that you can build with Visual Studio 2010 Beta 2 and it will work with No Database.&#160; The Domain Class is heavily modified from what is presented, but it will allow you to actually run and play with real data. </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:f125b32d-a630-4c3b-838b-1dc56760eeb7" class="wlWriterSmartContent">
<p><a href="/FilesForWebDownload/UsingRIAServicesWithVisualStudio2010Beta_94F1/RIAService_BayNet_NoDatabase.zip" target="_blank">Solution Zip File</a></p>
</p></div>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:758c6f86-44c4-4139-b6fe-133a4e6f71b4" class="wlWriterSmartContent">
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:758c6f86-44c4-4139-b6fe-133a4e6f71b4" class="wlWriterSmartContent"></div>
</p></div>
