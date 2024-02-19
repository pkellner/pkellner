---
status: publish
published: true
pubDatetime: 2011-06-06T20:00:00.000Z
title: With Visual Studio 2011, How To Add a Second Project To a Solution
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1499
wordpress_url: https://peterkellner.net/2011/06/06/with-visual-studio-2011-how-to-add-a-second-project-to-a-solution/
date: '2011-06-06 09:54:48 -0700'
date_gmt: '2011-06-06 16:54:48 -0700'
categories:
- VS2010
- Microsoft
tags: []
---
<p>&#160;</p>
<p>Say you have an existing <a href="http://www.microsoft.com/">Microsoft</a> Windows Forms Application and you want to create a class library for it to reference.&#160; For some reason, I’ve been stuck with this problem for a while now and I accidentally found the “unintuitive” button by accident of how to do this. My expectation was that when I created a new solution in Visual <a href="http://www.microsoft.com/visualstudio/en-us">Studio 2010</a>, that it would show 1 project in the solution and then to add more projects, I’d right mouse button on the solution and say “Add New Project”.&#160; Sadly, the solution explorer does not show me my solution, just the one project I have in it, regardless of whether I opened it directly (for which I think it creates it’s own solution) or I opened from my newly minted solution file.</p>
<p>That is, here is what I get when I create an empty solution, then add one project to it (no solution showing!)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb.png" width="244" height="168" /></a></p>
<p>  <!--more-->
<p>So, I just discovered that when you go and “create a new project”, you get a dropdown in the “Solution Name” that says either “Add to Solution” or “Create new solution”.&#160; Cleary, I want the first one.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image1.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb1.png" width="244" height="101" /></a></p>
<p><a href="/wp/wp-content/uploads/2011/06/image2.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb2.png" width="563" height="405" /></a></p>
<p>&#160;</p>
<p>Now, my solution is back and I can add more projects to it as I would expect.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/06/image3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/06/image_thumb3.png" width="244" height="179" /></a></p>
<p>&#160;</p>
<p>This is not a big deal, but it did have me confused for a while so I thought I’d blog about it.</p>
<p>HTH’s.</p>
