---
status: publish
published: true
pubDatetime: 2011-05-22T20:00:00.000Z
title: Nasty Problem With OCZ Vertex 3 SSD on Lenovo W520 Solved
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1486
wordpress_url: https://peterkellner.net/2011/05/22/nasty-problem-with-ocz-vertex-3-ssd-on-lenovo-w520-solved/
date: '2011-05-22 17:14:29 -0700'
date_gmt: '2011-05-23 00:14:29 -0700'
categories:
- SSD
- Windows 7
- Lenovo
tags: []
---
<p>Recently, I <a href="/2011/05/12/moving-to-super-fast-ssd-ocz-vertex-3-for-my-lenovo-w520/">posted about the new SSD drive</a> I have for my <a href="http://shop.lenovo.com/SEUILibrary/controller/e/web/LenovoPortal/en_US/catalog.workflow:category.details?current-catalog-id=12F0696583E04D86B9B79B0FEC01C087&amp;current-category-id=E369A2C7D3B0DE2213695476685EE22B">Lenovo W520</a> Core-I7 smokin’ fast notebook computer (<a href="http://www.amazon.com/exec/obidos/ASIN/B004QJM1HG/petkelsblo-20">OCZ Vertex 3</a>)&#160; Clearly I was in the honey moon period because everything seemed blazingly fast. However, reality set in and the computer started hanging, refusing to boot all the way, have pregnant pauses, etc.&#160; I called OCZ tech support and they suggest reload a fresh version of windows (now that’s a big help!).&#160; I then posted to the Lenovo forums asking for advice on anything special I need to do when reloading. Instead, I got what seems to be the answer to my problem from a user by the name of “<a href="http://forums.lenovo.com/t5/user/viewprofilepage/user-id/23102">Gan</a>” from Norway.</p>
<p><a title="http://forums.lenovo.com/t5/W-Series-ThinkPad-Laptops/Need-to-Repave-my-W520-with-Windows-7-Ultimate-Use-Vanilla/td-p/439787" href="http://forums.lenovo.com/t5/W-Series-ThinkPad-Laptops/Need-to-Repave-my-W520-with-Windows-7-Ultimate-Use-Vanilla/td-p/439787">http://forums.lenovo.com/t5/W-Series-ThinkPad-Laptops/Need-to-Repave-my-W520-with-Windows-7-Ultimate-Use-Vanilla/td-p/439787</a></p>
<p><a href="http://forums.lenovo.com/t5/W-Series-ThinkPad-Laptops/Need-to-Repave-my-W520-with-Windows-7-Ultimate-Use-Vanilla/td-p/439787"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/05/image4.png" width="654" height="298" /></a></p>
<p>&#160;</p>
<p>I finally got home from a long week of travel, did a full backup of my computer just in case the registry hack failed, and applied the registry fix discussed in the article here:&#160; <a title="http://geekmontage.com/texts/ocz-vertex-3-freezes-locks-up-stutters-and-crashes/" href="http://geekmontage.com/texts/ocz-vertex-3-freezes-locks-up-stutters-and-crashes/">http://geekmontage.com/texts/ocz-vertex-3-freezes-locks-up-stutters-and-crashes/</a>.</p>
<p>I can say, after using the computer for a few hours, I have not had one hickup.&#160; I’m hoping it stays that way.&#160; For anyone else who thinks they have the same problem, here are some of the issues I was having:</p>
<ol>
<li>W520 would boot slowly and about 1 out of 5 times hang forever after reaching the logged in screan (wait cursor when hovering over startbar)</li>
<li>Outlook would hang in the middle of typing messages, often for more than a minute</li>
<li>Eventlog errors referring to location iaStor</li>
<li>Visual Studio 2010 would get really slow and hang</li>
<li>Many others</li>
</ol>
<p>Here is what my current stats look like.&#160; This is a newer version of CrystalDiskMark so it may not be comparable to the previous version I ran.</p>
<p><a href="/wp/wp-content/uploads/2011/05/image5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/05/image_thumb4.png" width="244" height="226" /></a></p>
<p>For the moment, I’m a happy camper.</p>
