---
status: publish
published: true
pubDatetime: 2013-05-05T20:00:00.000Z
title: Using IntelliTrace With Entity Framework In Visual Studio 2012
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3595
wordpress_url: https://peterkellner.net/?p=3595
date: '2013-05-05 19:15:14 -0700'
date_gmt: '2013-05-06 02:15:14 -0700'
categories:
- SQL Server
- Entity Framework
- Visual Studio 2012
tags: []
---
<p>This is not a big deal, but I have recently bumped into several people that did not know about it so I thought I’d do a blog post just to show what it is and how is just trivial to use for useful stuff.</p>
<p>The issue I’m showing is how to see the Sql generated from Entity Framework.&#160; My old habit use to be to stop the debugger and hover over the query variable in the code, grab it as a debug variable, then cut and paste to SqlServer enterprise.</p>
<p>Now, I just go to the DEBUG menu in VS, Windows / Intellitrace and I get a nice listing on the right side of all my ADO.NET calls.&#160; The last one is the one I just did.&#160; </p>
<p>My code below is pretty self explanatory.&#160; You can see I’ve just issued a db.SaveChanges().&#160; You can also see the Sql generated for the update.&#160; I was checking because I wanted to confirm it was just updating one column.&#160; It was!</p>
<p><a href="/wp/wp-content/uploads/2013/05/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb.png" width="479" height="390" /></a> </p>
<p>Hope this helps!</p>
