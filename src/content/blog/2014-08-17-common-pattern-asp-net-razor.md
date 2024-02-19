---
status: publish
published: true
pubDatetime: 2014-08-17T20:00:00.000Z
title: Common Pattern in ASP.NET Razor For Clean cshtml Pages
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4061
wordpress_url: https://peterkellner.net/?p=4061
date: '2014-08-17 19:24:19 -0700'
date_gmt: '2014-08-18 02:24:19 -0700'
categories:
- ASP.NET MVC
- ASP.NET 4.5
- Razor
tags: []
---
<p>I’ve been doing a lot of work over the past year in Microsoft’s <a href="http://www.asp.net/mvc">ASP.NET</a> <a href="http://www.asp.net/web-pages/tutorials/basics/2-introduction-to-asp-net-web-programming-using-the-razor-syntax">Razor</a>.  I’m not an html wizard and definitely a razor syntax wizard, but I have figured out a way that saves me time over and over.  It’s basically the same pattern of thinking that has me often do things in 2 or 3 steps instead of one just to make sure the logic is overly clear.</p>
<p>In this case, I often find myself trying to create complex Razor syntax to output data.  That is, say I want to output a link that combines a static URL with a dynamic one coming from a model.  My first work is almost always trying to do it all at once and I’m guessing at least someone is going to tell me how I could have done.  That is, I want something like (in non-working syntax):</p>
<pre class="csharpcode">&lt;div <span class="kwrd">class</span>=<span class="str">"more"</span>&gt;
  &lt;a href=<span class="str">'"http://codestarssummit.com/"@(session.SessionUrl)"'</span>&gt;
          Read more&lt;/a&gt;
&lt;/div&gt;</pre>
<p>So, the above does not work, but by sticking in some real C# code the following does (of course).</p>
<pre class="csharpcode"> &lt;div <span class="kwrd">class</span>=<span class="str">"more"</span>&gt;
   @{
      var workshopUrl = <span class="str">"http://codestarssummit.com"</span> +
            session.SessionUrl;
    }
   &lt;a href=<span class="str">"@(workshopUrl)"</span> target=<span class="str">"_blank"</span> &gt;Read more&lt;/a&gt;
 &lt;/div&gt;</pre>
<p>In production, I’ve added a little more error checking but you get the idea.  When I first started using Razor, my thinking was I did not liking using @{} type syntax because if felt like I was putting code in views.  Now, I’m not fooled anymore.  It is.</p>
<p>Feel free to add some comments here and let me know your thoughts. I'm always trying to figure out a better way to build razor pages that is both clear and correct.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img alt="" /></p>
<p><img src="/images/link1.png" alt="The running program" /></p>
