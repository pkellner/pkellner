---
status: publish
published: true
pubDatetime: 2012-08-13T20:00:00.000Z
title: Building a Login Screen With Xamarin&rsquo;s MonoTouch and XCode StoryBoard
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2138
wordpress_url: https://peterkellner.net/?p=2138
date: '2012-08-13 19:02:40 -0700'
date_gmt: '2012-08-14 02:02:40 -0700'
categories:
- C#
- Mono
- MonoTouch
- Xamarin
- IPhone
- IPad
- Apple
- IOS
tags: []
---
<p>&#160;</p>
<table cellspacing="0" cellpadding="2" width="400" border="1">
<tbody>
<tr>
<td valign="top" width="198"><strong>Part 1</strong></td>
<td valign="top" width="200"><strong>The Video and Introduction (this)</strong></td>
</tr>
<tr>
<td valign="top" width="198"><strong>Part 2</strong></td>
<td valign="top" width="201"><strong><a href="/2012/08/13/building-a-login-screen-with-xamarins-monotouch-and-xcode-storyboard-part-2/">In Blog Format with words and screen shots</a></strong></td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>&#160;</p>
<h2>Introduction</h2>
<p>I’ve been hard at work learning the <a href="http://xamarin.com/monotouch/">MonoTouch</a> framework from <a href="http://xamarin.com/">Xamarin</a> recently.&#160; For those that don’t know, MonoTouch is a framework that runs on top of the Apple <a href="https://developer.apple.com/technologies/tools/">XCode</a> development environment that allows you to essentially use the .net framework as your programming language of choice instead of objective C (I hope I got that right).&#160; Since it has been a while since I’ve used C, and I have so much stuff I’ve done in C# I can leverage, this seems like a good fit.</p>
<p>I’m about a good solid week of programming into this and I have to admit I’ve gotten pretty frustrated all around.&#160; My frustration is not with MonoTouch or XCode specifically, but I have had some unpleasant thoughts about both as I go through this struggle.&#160; Simple things like creating a button and having an action from it can seem almost impossible for the most trivial of reasons (as it turns out).</p>
<p>&#160;</p>
<h2>The Mono Project</h2>
<p>So, here is the project that you can run yourself.&#160; I find often, bloggers don’t include working code which can be very frustrating.&#160; I try and avoid that if I can.&#160; This project is actually the one I built from scratch while doing the 13 minute demo.&#160; </p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:cdac92d2-8e6d-414f-b2c5-b0d241e82db1" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<p>Visual Studio Project   <a href="/wp/wp-content/uploads/2012/08/LoginProjectVideoPeterKellner1.zip" target="_blank">LoginProjectVideoPeterKellner.zip</a></p>
</div>
<p>Basically, we are building an application whose final screen looks like this:</p>
<p><a href="/wp/wp-content/uploads/2012/08/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/08/image_thumb.png" width="162" height="301" /></a> </p>
<p>&#160;</p>
<h2>The Video</h2>
<p><object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/mJxmiRKViZQ&amp;hl=en&amp;fs=1"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/mJxmiRKViZQ&amp;hl=en&amp;fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object></p>
