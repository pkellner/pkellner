---
status: publish
published: true
pubDatetime: 2012-08-13T20:00:00.000Z
title: Building a Login Screen With Xamarin&rsquo;s MonoTouch and XCode StoryBoard
  (Part 2)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2165
wordpress_url: https://peterkellner.net/?p=2165
date: '2012-08-13 20:26:18 -0700'
date_gmt: '2012-08-14 03:26:18 -0700'
categories:
- Mono
- MonoTouch
- Xamarin
- XCode
tags: []
---
<p>&nbsp;</p>
<table width="400" border="1" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="198"><strong>Part 1</strong></td>
<td valign="top" width="200"><strong><a href="/2012/08/13/building-a-login-screen-with-xamarins-monotouch-and-xcode-storyboard/">The Video and Introduction</a></strong></td>
</tr>
<tr>
<td valign="top" width="198"><strong>Part 2</strong></td>
<td valign="top" width="201"><strong>In Blog Format with words and screen shots (this)</strong></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>In Part 1, the app described in this post is built and shown with a video.  Because XCode is hard to portray in words, sometimes seeing it is better.  This post is screen shot by screen shot. It will probably take you 10% of the time to read, but if you get stuck, take a look at the video in Part 1.</p>
<p>&nbsp;</p>
<h2>Building the App, Screen by Screen</h2>
<p>&nbsp;</p>
<p>Start out by making a brand new <a href="http://xamarin.com/monotouch/">MonoTouch</a> project.  File/New/Project/C#/MonoTouch/IPad StoryBoard/MasterDetai</p>
<p><a href="/wp/wp-content/uploads/2012/08/image1.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb1.png" alt="image" width="406" height="340" border="0" /></a></p>
<p>Then double click on the storyboard object in the project:</p>
<p><a href="/wp/wp-content/uploads/2012/08/image2.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb2.png" alt="image" width="244" height="205" border="0" /></a></p>
<p>Which will take you to <a href="https://developer.apple.com/xcode/">XCode</a> (Apple’s development environment for building IOS apps)</p>
<p><a href="/wp/wp-content/uploads/2012/08/image3.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb3.png" alt="image" width="400" height="212" border="0" /></a></p>
<p>Then, modify your master and detail pages to look like the following (rather than stepping you through this, please refer to the video in the first post of this series).</p>
<p><a href="/wp/wp-content/uploads/2012/08/image4.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb4.png" alt="image" width="430" height="309" border="0" /></a></p>
<p>Click on the button pointed at below to bring up the “definitions” file so we can associate the username and password text fields and the login button to code which we will fill in.</p>
<p><a href="/wp/wp-content/uploads/2012/08/image5.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb5.png" alt="image" width="388" height="270" border="0" /></a></p>
<p>Then, do the funny control click from these fields to the includes file so that the definitions are brought in (again, see the video for how to do that).  The include file now should look like what is below.  Notice my arrows pointing to the definitions from the actual UI elements.</p>
<p><a href="/wp/wp-content/uploads/2012/08/image6.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb6.png" alt="image" width="545" height="309" border="0" /></a></p>
<p>Then, click on the “Segue” which tied the login page to the detail page and name that segue’s identifier “LoginToDetail”.</p>
<p><a href="/wp/wp-content/uploads/2012/08/image7.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb7.png" alt="image" width="560" height="218" border="0" /></a></p>
<p>Then, go back into the MonoDevelop project (after exiting XCode) and add the code below to the RootViewController.cs file with our logic around the “ViewDidLoad” method.  This is essentially our login logic.  In the real world, instead of checking to see if username and password are the same, you would really check to make sure the users credentials are valid.</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/08/image8.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb8.png" alt="image" width="579" height="172" border="0" /></a></p>
<p>That’s basically it!  When you run the app, you will get:</p>
<p><a href="/wp/wp-content/uploads/2012/08/image9.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb9.png" alt="image" width="127" height="244" border="0" /></a></p>
<p>And if you log in correctly you will get the “Details” page which looks like this:</p>
<p><a href="/wp/wp-content/uploads/2012/08/image10.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb10.png" alt="image" width="127" height="244" border="0" /></a></p>
<p>And if you log in incorrectly you will get:</p>
<p><a href="/wp/wp-content/uploads/2012/08/image11.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb11.png" alt="image" width="127" height="244" border="0" /></a></p>
<p>Again, the source and video are in the previous post (see the link at the top).</p>
<p>&nbsp;</p>
<p>I’m by no means a MonoTouch expert so there could be a much better way to do this.  Feel free to comment and let me and everyone else know. I promise not to take it personally.</p>
<p>HTH’s!</p>
