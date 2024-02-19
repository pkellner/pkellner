---
status: publish
published: true
pubDatetime: 2009-01-23T20:00:00.000Z
title: Framework Scanner, Written in ExtJS by Mats Bryntse
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 237
wordpress_url: https://peterkellner.net/?p=237
date: '2009-01-23 09:55:37 -0800'
date_gmt: '2009-01-23 16:55:37 -0800'
categories:
- JavaScript
- Sencha
tags: []
---
<p><a href="http://mankzblog.wordpress.com/">Mats Bryntse</a>, a great web developer and <a href="http://extjs.com">ExtJS</a> expert has written a very cool utility that let's you see how well the different JavaScript frameworks play with each other.&#160; Specifically, he looks at many of the most popular frameworks and calculates how many globals each one uses.&#160; This is important because if you happen to have multiple frameworks in your application (which is completely reasonable to do), you may have problems.&#160; The URL is as follows and must be run in Firefox).</p>
<p><a title="http://mankz.com/code/GlobalCheck.htm" href="http://mankz.com/code/GlobalCheck.htm">http://mankz.com/code/GlobalCheck.htm</a></p>
<p>Here is an example result:</p>
<p> <!--more-->
<p><a href="/wp/wp-content/uploads/2009/01/image1.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb1.png" width="359" height="189" /></a></p>
<p>Don't forget to push the &quot;Start Analysis&quot; button on the tool bar and you will see a collision matrix.&#160; For me, this is of particular interest because I use both <a href="http://extjs.com">ExtJS</a> as well as <a href="http://www.asp.net/ajax/">Microsoft Ajax</a> and I have a collision between string.format which has caused me problems.&#160; Here is what that collision matrix looks like:</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_41.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_41.png" width="348" height="248" /></a></p>
<p>This is a great tool!&#160; Nice to have such smart guys looking to make the world more transparent.</p>
