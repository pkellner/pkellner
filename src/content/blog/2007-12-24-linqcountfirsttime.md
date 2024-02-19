---
status: publish
published: true
pubDatetime: 2007-12-24T20:00:00.000Z
title: My first LINQ Experience. How to do a simple COUNT() with LINQ to SQL
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This post has some sample code using LINQ to do a simple SQL count function.
  \ It compares the code to a non-LINQ version.  It's my first actual LINQ code do
  don't expect much besides excitement</p>"
wordpress_id: 95
wordpress_url: https://peterkellner.net/2007/12/24/linqcountfirsttime/
date: '2007-12-24 11:12:41 -0800'
date_gmt: '2007-12-24 18:12:41 -0800'
categories:
- ASP.NET 3.5
- LINQ
tags: []
---
<p> So, nothing extraordinary here, but I've finally taken the dive into LINQ.&#160; I've got a great book that helping me a lot that I recently review called <a href="/2007/12/18/bookreview_proaspnet/">Pro LINQ by Joseph Rattz</a> (his humor is a little odd, but the book is great).&#160; At anyrate, moving right a long, all I did was right click on my web projects app_code directory, choose LINQ to SQL classes,</p>
<p><a href="/wp/wp-content/uploads/2007/12/appcode.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="appcode" src="/wp/wp-content/uploads/2007/12/appcode-thumb.jpg" width="244" height="123" /></a></p>
<p>Then, choose some tables from my database. Then, in my code, all I had to write was the class in my c# code (part of my database layer classes).&#160; Here is what the code looks like (sorry about the jpg, I'm still trying to figure out how to get Copy SourceAsHTML working in vs2008)</p>
<p> <!--more-->
<p><a href="/wp/wp-content/uploads/2007/12/linq1.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="linq1" src="/wp/wp-content/uploads/2007/12/linq1-thumb.jpg" width="461" height="231" /></a></p>
<p>And, without LINQ, this is what I would have had to do.&#160; No type safety and took 3 times as long to write.</p>
<p><a href="/wp/wp-content/uploads/2007/12/linq2.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="linq2" src="/wp/wp-content/uploads/2007/12/linq2-thumb.jpg" width="471" height="438" /></a></p>
<p>You can tell what I'll be doing for now on (climbing the curve!)</p>
