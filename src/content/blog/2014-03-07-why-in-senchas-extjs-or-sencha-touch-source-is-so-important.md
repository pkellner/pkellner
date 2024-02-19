---
status: publish
published: true
pubDatetime: 2014-03-07T20:00:00.000Z
title: Why In Sencha&rsquo;s ExtJS or Sencha Touch Source is so Important
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3969
wordpress_url: https://peterkellner.net/?p=3969
date: '2014-03-07 12:34:18 -0800'
date_gmt: '2014-03-07 19:34:18 -0800'
categories:
- Sencha
- SenchaTouch
- ExtJS
tags: []
---
<p>Right now, I’m trying to figure out how to turn grouping on and off in a <a href="http://www.sencha.com/products/extjs/" target="_blank">Sencha ExtJS</a> store. That is, I have a page that looks like the following where I want to have a checkbox to turn the grouping page on and off depending on how the user wants to see the display.</p>
<p><a href="/wp/wp-content/uploads/2014/03/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/03/image_thumb.png" width="521" height="254" /></a> </p>
<p>So, I look in the <a href="http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Store-method-isGrouped" target="_blank">help</a> and I don’t find a method in the “store” documentation that says enableGrouping or disableGrouping.&#160; I do find one that says “isGrouped” however.&#160; So, clicking on the view source for that I now see source as follows:</p>
<p><a href="/wp/wp-content/uploads/2014/03/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/03/image_thumb1.png" width="367" height="309" /></a> </p></p>
<p><a href="/wp/wp-content/uploads/2014/03/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/03/image_thumb2.png" width="368" height="198" /></a> </p>
<p>which tells me that if there are no “groupers” defined that my store is not grouped.</p>
<p>Just sayin…</p>
