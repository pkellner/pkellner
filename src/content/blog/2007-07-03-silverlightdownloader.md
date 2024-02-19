---
status: publish
published: true
pubDatetime: 2007-07-03T20:00:00.000Z
title: Display Images with the Silverlight Downloader in Alpha 1.1
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br /><p>This article gives you a way to download images from remote servers
  on different domains using the downloader object of Silverlight.  Without this,
  you can not easily keep track of when images are downloaded to your Silverlight
  Application and deal with that event.  You simply can set the source tag and the
  image arrives when it arrives.</p>"
wordpress_id: 67
wordpress_url: https://peterkellner.net/2007/07/03/silverlightdownloader/
date: '2007-07-03 21:38:34 -0700'
date_gmt: '2007-07-04 04:38:34 -0700'
categories:
- Page Handlers
- Silverlight
- ASP.NET 2.0
tags: []
---
<p><strong>From Non-Local Servers Asynchronously</strong></p>
<p>This issue has come up several times for me.&#160; That is, you have an image&#160; url you want to display in your silverlight .net 1.1 application that comes from&#160; some foreign server.&#160; That is, you want this to work:&#160; (and of course    <br />it does not).</p>
<h2>The Problem</h2>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader1.jpg" /></p>
<p> <!--more-->
<p>Even though, you can do this:</p>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader2a.jpg" /></p>
<p>There seems to be a subtle difference having to do with cross domain security&#160; that I just don't get but since it's there, we have to deal with it.</p>
<h2>The Solution</h2>
<p>So first, why do you even care.&#160; Why not just do the one that works?&#160; Well, the answer is that you want to be able to deal with what happens while an image is being downloaded.&#160; My particular problem has to do with what happens when you bring up a picture in a modal dialog type thing.&#160; That is, you click on a small thumbnail, and a larger ones comes up.&#160; In my case, I'm getting the image url from a web service so I don't have the luxury of opening it locally.&#160; I have to use a foreign (remote) url.&#160; And, the reason I don't want to open it by simply setting the source tag is that I'm    <br />reusing a control.&#160; This means that I'm simply hiding it and unhiding it. If I just set the source and unhide it, the wrong image comes up.&#160; That is, the one from the previous request. Then, a few seconds later, the correct image     <br />comes up.&#160; Bad.</p>
<p>We really want to use the Downloader object.&#160; A very cool control, but not if it doesn't work cross domain IMHO.</p>
<p>The work around for this is to write a http handler that runs in your local asp.net project that you pass the url you want to display. Then, that web service turns around, calls the cross domain server, gets the image and returns it to your Downloader object.&#160; Simple in concept, but the devil is in the details.&#160; How, for example to you pass a url (that may include all kinds of stuff like &amp;'s to a local web service.&#160; The answer is encode it!&#160; Then decode it at the web service.&#160; I'm sure you all can whip that up quickly, but since I did already, why bother.&#160; I'm going to paste the code below with brief explanations to help.&#160; Here goes:</p>
<h3>The Silverlight UserControl That Calls the web service</h3>
<p>The way I did the code in the silverlight control is to encode the real URL I want.&#160; That is the one cross domain.&#160; I think build a URL that calls my local web service passing the parameter encoded as a base64 value as one of    <br />the url parameters.&#160; I'm using a property in my usercontrol to set this value just because that's kind of convenient.&#160; Here is what the code looks like:</p>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader3.jpg" /></p>
<p>Just to give you a hint of what the might look like, in my case, this is what it is:</p>
<p>http://localhost:49803/WebService/DisplayImage.ashx?URL=aHR0cDov...NDE0NzU2LkpQRw==&amp;Width=400</p>
<p>(I put a bunch of ...'s in the middle, but it was longer than that originally)</p>
<p>Silverlight is kind of limited on conversion functions so I had to write this little one called EncodeTo64 which is pasted below.&#160; I'm sure there are better ways to do it, but this one works.</p>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader5.jpg" /></p>
<p>And, don't forget that you need to have the completed event code in your silverlight side to handle setting the source tag when the image is fully downloaded.&#160; Here is that function.</p>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader6a.jpg" /></p>
<h3>The Http Handler (DisplayImage.ashx file)</h3>
<p>To make all this come to live, you need an http handler that will make the call to the cross domain server.&#160; Below is that code.&#160; I added an extra parameter for width so that if you know the image you need is smaller than the one across the internet, you can just get downloaded what you need.&#160; Here is the code for the handler:</p>
<p><img alt="does not work" src="/wp/wp-content/uploads/2007/07/downloader7.jpg" /></p>
<p>&#160;</p>
<h2>Conclusion</h2>
<p>I'm guessing that this problem will go away in the next alpha or beta release of Silverlight .net.&#160; In the mean time, this works very well for me and hopefully will for you also.&#160; I don't have this in a good sample application and really just wanted to get it posted because I know others were having the same problems.&#160; If someone goes through and makes a good demo of this, please post a comment with the code for others to download.</p>
<p>Thanks for reading, and best of luck with your Silverlight Development!</p>
