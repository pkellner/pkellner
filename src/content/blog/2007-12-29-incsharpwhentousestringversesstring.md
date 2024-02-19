---
status: publish
published: true
pubDatetime: 2007-12-29T20:00:00.000Z
title: In C#, When to use String verses string
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>Just a short ramble on when to use string verses use String in C#.  Basically
  they compile to the same IL code</p>"
wordpress_id: 96
wordpress_url: https://peterkellner.net/2007/12/29/incsharpwhentousestringversesstring/
date: '2007-12-29 11:12:41 -0800'
date_gmt: '2007-12-29 18:12:41 -0800'
categories:
- ".Net 2.0"
- Best Practices
tags: []
---
<p>So, technically, String and string mean exactly the same thing in C#.&#160; string, is an alias for String (aka a shorthand) for System.String.&#160; So, when should use which?&#160; It seems that the convention is to use string when you are referring to an object and String when you are referring specifically to the string class.</p>
<p>This is basically what is said at this URL:&#160; <a title="http://en.csharp-online.net/CSharp_String_Theory%E2%80%94string_versus_String" href="http://en.csharp-online.net/CSharp_String_Theory%E2%80%94string_versus_String">http://en.csharp-online.net/CSharp_String_Theory%E2%80%94string_versus_String</a></p>
<p>Juval Lowy has some coding standards at <a href="http://www.idesign.net">http://www.idesign.net</a> that says basically the same thing.&#160; From the document on IDesign's web site the following examples show what is best practices (which I completely agree with).</p>
<p><a href="/wp/wp-content/uploads/2007/12/idesign1.jpg"><img style="border-right: 0px; border-top: 0px; border-left: 0px; border-bottom: 0px" height="96" alt="idesign1" src="/wp/wp-content/uploads/2007/12/idesign1-thumb.jpg" width="244" border="0" /></a>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <a href="/wp/wp-content/uploads/2007/12/idesign2.jpg"><img style="border-right: 0px; border-top: 0px; border-left: 0px; border-bottom: 0px" height="144" alt="idesign2" src="/wp/wp-content/uploads/2007/12/idesign2-thumb.jpg" width="244" border="0" /></a></p>
<p>That's it for now.&#160;</p>
