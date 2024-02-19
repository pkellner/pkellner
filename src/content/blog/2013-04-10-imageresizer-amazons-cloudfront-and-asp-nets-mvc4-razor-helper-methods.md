---
status: publish
published: true
pubDatetime: 2013-04-10T20:00:00.000Z
title: ImageResizer, Amazon&rsquo;s CloudFront and ASP.NET&rsquo;s MVC4 Razor Helper
  Methods
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3579
wordpress_url: https://peterkellner.net/?p=3579
date: '2013-04-10 19:36:35 -0700'
date_gmt: '2013-04-11 02:36:35 -0700'
categories:
- C#
- WebAPI
- ImageResizer
- MVC4
tags: []
---
<p>&#160;</p>
<p>Well, the title is certainly a mouthful and hopefully a honey trap for SEO.&#160; The thing is, I’m really going to talk about all those things.&#160; I just went through a short exercise that I thought would be useful to share.</p>
<h2>Background</h2>
<p>For <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a>, I use the toolkit <a href="http://imageresizing.net/">ImageResizer</a> written by&#160; <a href="http://www.nathanaeljones.com/">Nathanael Jones</a>.&#160; For those of you that deal with any quantity of images on their web sites, I strongly recommend taking a look at this.&#160; Before I used this toolkit I written my own image handlers that did some similar things but not nearly as well or with so many features.&#160; One of the issues we have on code camp is that we try and show lots of pictures all the time.&#160; Sponsors and speakers are really what causes the glut of pictures.&#160; ImageResizer let’s me do things like create a URL as follows:</p>
<p><a href="http://www.siliconvalley-codecamp.com/attendeeimage/1124.jpg?format=jpg&amp;w=300&amp;h=300&amp;scale=both&amp;mode=pad&amp;bgcolor=green">http://www.siliconvalley-codecamp.com/attendeeimage/1124.jpg?format=jpg&amp;w=300&amp;h=300&amp;scale=both&amp;mode=pad&amp;bgcolor=green</a></p>
<p>What happens under the covers is that in my <a href="http://www.asp.net/web-api">ASP.NET WebAPI</a> site, I’ve got ImageResizer configured to do a select from my <a href="http://www.microsoft.com/en-us/sqlserver/default.aspx">SqlServer</a> Speakers table the record with id=1124.&#160; Then, ImageResizer scales the image to 200x200 pixels, pads the space so as not to distort the image, then it fill in any area that got did not make the pad with green.&#160; That is, it renders an image like this (but feel free and click yourself to see)</p>
<p><a href="/wp/wp-content/uploads/2013/04/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb.png" width="129" height="130" /></a> </p>
<h2>The How To</h2>
<p>I’m not going to make this a 20 page post.&#160; I’m just going to go through the highlights and drop a little code here and there.</p>
<p>Let’s start out with ImageResizer.&#160; For that, we want it to:</p>
<ul>
<li>Cache Images On Our Local Server</li>
<li>Cache Images Through Amazon’s Cloud Front</li>
<li>Size, Scale and Pad as Necessary</li>
<li>Read Data From SqlServer</li>
</ul>
<ul>To make that happen, I had to install the plugins listed in my web.config below (you can see more <a href="http://imageresizing.net/docs">doc’s</a> on the imageresizer site).</ul>
<p><a href="/wp/wp-content/uploads/2013/04/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb1.png" width="610" height="166" /></a> </p>
<p>Then, I need to setup an Amazon CloudFront instance from my <a href="https://console.aws.amazon.com/cloudfront/home">amazon console</a>.</p></p>
<p><a href="/wp/wp-content/uploads/2013/04/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb2.png" width="610" height="72" /></a> </p>
<p>Notice that I have a CName so that if someone does a view/source, they see cache.siliconvalley-codecamp.com and not 3984kasdflk.cloudfront.net.&#160; The idea here is that anytime someone goes to 3984kasdflk.cloudfront.net/Images/904.jpg, cloudfront redirects them to my site at siliconvalley-codecamp.com/904.jpg.&#160; The first time that site gets hit, cloudfront pulls the image from my server.&#160; After that, cloudfront has the image and does not have to ask for it again.&#160; That means my image is now scattered around the world and I don’t have to server it over and over.&#160; BTW, the actual link to that gets sent in our page looks more like this:&#160; </p>
<p><a href="http://cache.siliconvalley-codecamp.com/attendeeimage/1124.jpg;format=jpg;w=300;h=300;scale=both;mode=pad;bgcolor=green">http://cache.siliconvalley-codecamp.com/attendeeimage/1124.jpg;format=jpg;w=300;h=300;scale=both;mode=pad;bgcolor=green</a></p>
<p>If you look carefully, the link above has “;” instead of ? and &amp; characters.&#160; That is because ImageResizer supports cloudfront that way.&#160; I understand there is another way it could have been done, but for now, I’m going with what works.</p>
<p>So, the final step is fix the parameters in my actual razor page to convert from the normal parameter URL with ? and &amp; characters to one that has just ;’s.&#160; Rather than have to go through the code and surgically fix each reference, I thought it better to write a simple <a href="http://weblogs.asp.net/scottgu/archive/2010/01/10/asp-net-mvc-2-strongly-typed-html-helpers.aspx">HtmlHelper</a> in razor that does the work for me.</p>
<p>So, into my /Code directory of my WebAPI project and I wrote the following code:</p>
<p><a href="/wp/wp-content/uploads/2013/04/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb3.png" width="585" height="309" /></a> </p>
<p>Sprinkled a line of code in the web.config file IN the view directory as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/04/image4.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb4.png" width="462" height="315" /></a> </p>
<p>And then had my razor code look like this to “fix” the image parameters to be semicolons as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/04/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/04/image_thumb5.png" width="610" height="80" /></a> </p></p>
<p>That’s it!&#160; Now, I’m CloudFronted!&#160; </p>
