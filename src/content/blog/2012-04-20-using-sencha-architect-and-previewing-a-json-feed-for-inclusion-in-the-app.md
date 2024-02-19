---
status: publish
published: true
pubDatetime: 2012-04-20T20:00:00.000Z
title: Using Sencha Architect and Previewing a JSON feed For Inclusion In The App
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1971
wordpress_url: https://peterkellner.net/?p=1971
date: '2012-04-20 08:52:51 -0700'
date_gmt: '2012-04-20 15:52:51 -0700'
categories:
- JavaScript
- Sencha
- Sencha Architect 2
tags: []
---
<p>I’ve been on the beta testers for the new version of <a href="http://www.sencha.com/products/architect">Sencha Architect</a> (formerly Sencha Designer) for the past few months and have really enjoyed learning it and it’s features (both old and new).&#160; Much of the app is very discoverable (meaning you don’t really need directions to figure something out), however there are some parts that are quite hidden or not obvious.&#160; On of these is previewing a <a href="http://json.org/">JSON</a>
<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:08b7f6ed-c464-4887-868d-29d374167a98" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">Technorati Tags: Sencha Architect,<a href="http://technorati.com/tags/Sencha" rel="tag">Sencha</a>,JavaScript Designer</div>
<p>  feed that you will hook up to either a model or store.&#160; In this post, I’m going to show the steps to do that.&#160; I’m now hooked on it.</p>
<p>I’m using the “Contact&quot;s” example provided for download by <a href="http://www.sencha.com/">Sencha</a>.&#160; Notice that when you load the project, assuming you have your Project URL’s setup correctly (Preferences), the store is automatically loaded.&#160; </p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image11.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb9.png" width="360" height="322" /></a></p>
<p>&#160;</p>
<p>If the store does not automatically load, you can right mouse button on the store and choose “Load Data” as shown in the picture below.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image12.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb10.png" width="320" height="124" /></a></p>
<p>&#160;</p>
<p>This will refresh your JSON feed and show the new data.&#160; Finally, to preview the JSON feed itself, click on the icon of an eye as shown in the first picture.&#160; This is the “Preview Feed” command.&#160; When you do that, you will see the following:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image13.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb11.png" width="496" height="420" /></a></p>
<p>&#160;</p>
<p>I’m hoping Sencha takes the next step and gives us an option to “Auto Field” this data and simply create fields for every field in a record. That would complement the “Auto Column” feature (for another post) in the GridPanel Sencha Architect Design window.</p>
<p>&#160;</p>
<p>Hope this helps!</p>
