---
status: publish
published: true
pubDatetime: 2014-05-30T20:00:00.000Z
title: A Simple Prompt Modal Dialog for JQuery JavaScript
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4022
wordpress_url: https://peterkellner.net/?p=4022
date: '2014-05-30 12:04:48 -0700'
date_gmt: '2014-05-30 19:04:48 -0700'
categories:
- JavaScript
tags: []
---
<p>Do you hate what the basic alert(‘hello there’) looks like in JavaScript to your viewing public?  All I want is a simple modal prompt dialog that works with JQuery.   For a long time, I’ve been looking for a simple to use replacement.  It seems like when I scour the internet, I run into lots of people telling you simple ways to use JQueryUI’s Dialog.  For example, when you search “jquery alert simple” you get tons of hits.  This one:</p>
<p><a title="http://stackoverflow.com/questions/5355178/jquery-ui-dialog-on-the-fly-without-div" href="http://stackoverflow.com/questions/5355178/jquery-ui-dialog-on-the-fly-without-div">http://stackoverflow.com/questions/5355178/jquery-ui-dialog-on-the-fly-without-div</a></p>
<p>It seems the highest voted one says do this:</p>
<pre class="csharpcode">$(<span class="str">"&lt;div&gt;My div content&lt;/div&gt;"</span>).dialog();</pre>
<p>Way down in the comments of the SO post, <a href="http://stackoverflow.com/users/423316/zod">zod</a> posts “What about prompt” with a links to</p>
<p><a href="http://trentrichardson.com/Impromptu/index.php">http://trentrichardson.com/Impromptu/index.php</a></p>
<p><a href="http://abeautifulsite.net/blog/2008/12/jquery-alert-dialogs/">http://abeautifulsite.net/blog/2008/12/jquery-alert-dialogs/</a></p>
<p>I’m glad one of the StackOverflow police did not remove that comment (I up voted it) because it is exactly what I was looking for (I’d post a note to zod saying thanks, but the SO police would get me for that also so zod, if you come buy my blog here, you have my thanks).</p>
<p>So now, all I need to do when I want to show a nice clean prompt is</p>
<pre class="csharpcode">$.Prompt(<span class="str">'My div content'</span>);</pre>
<p>That’s it! and I get a very nice modal dialog that looks like the following.</p>
<p><a href="http://www.siliconvalley-codecamp.com/"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/05/image12.png" alt="image" width="610" height="289" border="0" /></a></p>
<p>(of course I added a little more text).</p>
<p>HTH’s.</p>
