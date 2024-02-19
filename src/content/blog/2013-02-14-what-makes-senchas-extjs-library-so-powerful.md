---
status: publish
published: true
pubDatetime: 2013-02-14T20:00:00.000Z
title: What Makes Sencha&rsquo;s ExtJS Library So Powerful
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3464
wordpress_url: https://peterkellner.net/?p=3464
date: '2013-02-14 16:33:06 -0800'
date_gmt: '2013-02-14 23:33:06 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<p>For those that don’t know much about <a href="http://www.sencha.com/products/extjs/">Sencha’s ExtJS</a> <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> library, let me just simply describe it as a toolkit that helps you design applications that run on the web with minimal <a href="http://en.wikipedia.org/wiki/HTML">HTML</a> knowledge (though a reasonable amount of JavaScript knowledge is important).</p>
<p>What is inspiring me to write this post right now is just how darn clever those guys are who architected the toolkit.&#160; I have not much used the forms part of ExtJS until now, I’ve primarily used the data grid and all the layout panels.</p>
<p>So, as I’m learning the form tools I keep running into things they have built in that just make so much sense.&#160; Let me describe just a few by example.&#160; Below, I’m going to paste my current form which I’m working on which is just a part of the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> new registration form.&#160; I’m going to number things of interest and just describe them one after another (without editorial).&#160; You judge.&#160; It just feels like they have thought of everything.</p>
<p>&#160;</p>
<ol>
<li>Notice that the email field is making it clear it is not good enough.&#160; I set the <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.form.field.VTypes">VType</a> (Validation Type) to <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.form.field.VTypes-method-email">Email</a> and validation just works.&#160; No hunting regular expressions necessary (1).</li>
<li>By setting <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.form.RadioGroup-cfg-allowBlank">AllowBlank</a> to false on the radio button group, a radio button is required to be chosen (2).</li>
<li>By setting the property <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Component-cfg-formBind">formBind</a> to true on the continue button, no need to register change events to figure out when to enable the button for selection.&#160; Because it is an Ext.form.Panel, the fields are children and all have their validation attributes set, everything works together (3).</li>
</ol>
<p>Just Sayin…</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/02/image17.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb16.png" width="350" height="374" /></a> </p>
<p><a href="/wp/wp-content/uploads/2013/02/image18.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb17.png" width="311" height="554" /></a> <a href="/wp/wp-content/uploads/2013/02/image19.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb18.png" width="310" height="279" /></a></p>
