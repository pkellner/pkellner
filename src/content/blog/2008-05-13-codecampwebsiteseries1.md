---
status: publish
published: true
pubDatetime: 2008-05-13T20:00:00.000Z
title: Best Practices for Building an asp.net quality web siteBuilding the New Code
  Camp Web Site (Part 1)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>In this article, the first steps for building a professional web site
  are documented.  These steps include building requirements, working with a designer
  and starting the process to hire a css/html person</p>"
wordpress_id: 111
wordpress_url: https://peterkellner.net/2008/05/13/codecampwebsiteseries1/
date: '2008-05-13 11:06:25 -0700'
date_gmt: '2008-05-13 18:06:25 -0700'
categories:
- Atlas/AJAX
- Code Camp Web Site Series
- Community
- ASP.NET 2.0
tags: []
---
<p>(That's right, Code Camp is coming!&#160; 11/8 and 11/9 again at Foothill College)</p>
<h2>Article Series</h2>
<table border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="100">Article 1:</td>
<td valign="top" width="600"><a href="/2008/05/13/codecampwebsiteseries1/">Best Practices for Building an ASP.NET quality web site</a></td>
</tr>
<tr>
<td>Article 2:</td>
<td><a href="/2008/05/19/codecampwebsiteseries2/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters</a></td>
</tr>
<tr>
<td>Article 3:</td>
<td><a href="/2008/05/25/codecampwebsiteseries3/">Creating a Theme For Each Year of Code Camp Using Skins in ASP.NET</a></td>
</tr>
<tr>
<td>Article 4:</td>
<td><a href="/2008/06/29/sv-code-camp-web-site-series4/">Creating a Modal Login Window Using the Telerik Modal RadWindow Component</a></td>
</tr>
<tr>
<td>Article 5:</td>
<td><a href="/2008/07/03/combine-email-lists-with-linq/">Using LINQ to Merge Mailing Lists and Filter Opt Outs</a></td>
</tr>
<tr>
<td>Article 6:</td>
<td><a href="/2009/03/27/codecampwebsiteseries6-cssfriendly-adapters-aspnet-menu/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters (The Source Code!)</a></td>
</tr>
</tbody>
</table>
<p> 
<p>So, first, a little background.&#160; As many of you know, I've been the ring leader of <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> here in northern California for the past 2 years.&#160; Since Code Camp is a limited budget, 100% volunteer effort, the most important thing is to have efficient communications between everyone.&#160; Attendees, Speakers, Organizer, Sponsors and everyone else involved in the event.&#160; To that end, the first code camp web site was created.&#160; It was based on CSS provided by Microsoft.&#160; Check out the post I made two years ago about it titled <a href="/2006/08/28/msprofcsshowto/">&quot;Zero to Professional Web Site in Two Days&quot;</a>.</p></p>
<p> <!--more--></p>
<p>This year, we are planning on a different format.&#160; I don't want to give too much away because we have not formally announced the changes, but if you look carefully at the designs, you might get an idea what these changes are going to be.&#160; I'm getting slightly off topic.&#160; The purpose of this series of articles to take you with me, step by step through building the web site.&#160; This time,    <br />we are going to do it right.&#160; Professional Designer (volunteer) and Professional CSS Implementer (not me, but we do have some budget for this from last year).</p>
<p>So, here are the steps.</p>
<ol>
<li>Decide on what changes need to be made </li>
<li>Work with a professional designer to make mock ups (photoshop, fireworks, etc.) </li>
<li>Create css and html pages from the designers work </li>
<li>Implement the css and html in asp.net </li>
<li>Test </li>
<li>Publish </li>
</ol>
<p>So far, we have done steps 1,2 and are working on step 3.&#160; I've alluded to the requirements above, but don't want to spoil too many surprises.&#160; Suffice to say, that is done already.&#160; Step 2 is also now complete.&#160; The professional designer gave us very detailed PSD files that we can turn over to a css wizard.&#160; First, let me show you some of the designs and peek into fireworks to see what is actually under the covers.</p>
<p>First, here are some screen shots of what pages will look like (png files created from the PSD files)</p>
<table border="0" cellspacing="0" cellpadding="2" width="400">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2008/05/svc-home2.png">           <br /><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="svc_home[2]" src="/wp/wp-content/uploads/2008/05/svc-home2-thumb.png" width="244" height="224" /></a>           </td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2008/05/svc-news.png">           <br /><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="svc_news" src="/wp/wp-content/uploads/2008/05/svc-news-thumb.png" width="244" height="224" /></a>           </td>
</tr>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2008/05/svc-reg.png">           <br /><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="svc_reg" src="/wp/wp-content/uploads/2008/05/svc-reg-thumb.png" width="244" height="224" /></a>           </td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2008/05/svc-sessions.png">           <br /><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="svc_sessions" src="/wp/wp-content/uploads/2008/05/svc-sessions-thumb.png" width="244" height="224" /></a>           </td>
</tr>
</tbody>
</table>
<p>Include is also a PDF file.&#160; It allows the person doing the css and html to really do a good job of pulling the pieces apart to make great web content.</p>
<p><a href="/wp/wp-content/uploads/2008/05/fw.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="fw" src="/wp/wp-content/uploads/2008/05/fw-thumb.jpg" width="376" height="445" /></a></p>
<p>(notice the detailed names for all the layers!&#160; this kind of consistency makes it much easier to implement in html and css).</p>
<p>Step 3 is to hand this over to a designer.&#160; I did not have someone to use locally, so I decided to take a shot at using <a href="http://www.rentacoder.com">rentacoder</a>.&#160; I posted a detailed specification which you can see on that site if you navigate to this url:&#160; <a title="http://www.rentacoder.com./RentACoder/misc/BidRequests/ShowBidRequest.asp?lngBidRequestId=924960" href="http://www.rentacoder.com./RentACoder/misc/BidRequests/ShowBidRequest.asp?lngBidRequestId=924960">     <br />http://www.rentacoder.com./RentACoder/misc/BidRequests/ShowBidRequest.asp?lngBidRequestId=924960</a>&#160; </p>
<p>Notice the detailed specifications as well as the 13 bids that have been made ranging from $100 to $1000.&#160; I posted a question on the forums asking if anyone had used any of these services and the response was yes, but don't take the lowest bid and also make sure you use someone with lots of experience.&#160; I haven't decided next steps yet (that is who to choose), but I will keep posting as I build this web site.</p>
<p>Stay tuned!</p>
