---
status: publish
published: true
pubDatetime: 2013-08-07T20:00:00.000Z
title: Using Compass With Visual Studio for SASS work
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3691
wordpress_url: https://peterkellner.net/?p=3691
date: '2013-08-07 09:36:27 -0700'
date_gmt: '2013-08-07 16:36:27 -0700'
categories:
- Visual Studio
- CSS3
- SASS
- CSS
tags: []
---
<p>CSS for me has always been somewhat of a mystery to use in medium to large projects.&#160; The idea of having to write individual classes and combine them in different ways to get affects seem to be beyond what I can keep in my head.&#160; That is, if you have an html page with a body, the body has some div’s, nested div’s, header tags, etc, it can get really confusing to try and figure out how to author the CSS in a way it makes sense.&#160; SASS comes to the rescue here.&#160; It allows you to create variables, it allows you to create hierarchies of styles and just provides lots of conveniences that are otherwise difficult in CSS.&#160; I won’t go into the details here, but simply provide a recipe of sorts for how to use it with Visual Studio.&#160; For more information on SASS and Compass, check out these links.</p>
<ul>
<li><a href="http://compass-style.org/help/">http://compass-style.org/help/</a></li>
<li><a href="http://sass-lang.com/tutorial.html">http://sass-lang.com/tutorial.html</a></li>
<li><a href="http://net.tutsplus.com/tutorials/other/mastering-sass-lesson-1/">http://net.tutsplus.com/tutorials/other/mastering-sass-lesson-1/</a></li>
</ul>
<ul>The way SASS works is you basically author your own SASS file (.scss) and then you run that file through a converter that generates the CSS for you.&#160; You can actually create a SASS file that is just CSS and when you compile that it will create the exact same file as a CSS file (but what’s the point then).&#160; There are several plugins you can find for visual studio that do this for you, however my preference is to use Compass outside of visual studio (in watching mode) and let the CSS file update everytime a change is made to your SASS file.</ul>
<p>To install Compass, you need to install ruby first, then compass from there.&#160; Here are the steps in this article:&#160; <a href="http://compass-style.org/install/">http://compass-style.org/install/</a></p>
<p>Now that you have compass installed, all you need to do is create a DOS prompt in your directory where you have your SASS file and type “compass watch”.</p>
<p>So, here is the workflow I recommend:</p>
<p>Create a directory structure in your <a href="http://www.microsoft.com/visualstudio/eng/2013-preview" target="_blank">Visual Studio</a> Project with a Content Directly like this:</p>
<p><a href="/wp/wp-content/uploads/2013/08/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb.png" width="198" height="283" /></a> </p>
<p>Then, from the command prompt in the Sass directory above, issue the command compass watch as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/08/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb1.png" width="437" height="170" /></a> </p>
<p>I also suggest that you&#160; create a config.rb file like the following in your Sass directory.</p>
<p><a href="/wp/wp-content/uploads/2013/08/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/08/image_thumb2.png" width="449" height="176" /></a> </p>
<p>By having output_style :expanded and environment :development, the css created will be readable and it will have line numbers that reference back to your Sass file for debugging.&#160; That is, when you look in your browser development tools css explorer, you will see the CSS file generated and not your SASS file.&#160; this will help you to make fixes to the SASS file directly without having to hunt.</p>
<p>HTH’s!</p>
