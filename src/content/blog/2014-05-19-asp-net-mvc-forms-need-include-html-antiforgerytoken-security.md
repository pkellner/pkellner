---
status: publish
published: true
pubDatetime: 2014-05-19T20:00:00.000Z
title: All ASP.NET MVC Forms Need To Include Html.AntiForgeryToken() For Security
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4015
wordpress_url: https://peterkellner.net/?p=4015
date: '2014-05-19 09:31:48 -0700'
date_gmt: '2014-05-19 16:31:48 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- ASP.NET 2.0
- Security
- ".NET 4.0"
- ASP.NET 4.0
- ".NET 4.5"
- ".NET 5.0"
- ASP.NET MVC
- ASP.NET 4.5
tags: []
---
<p>Having recently been implementing many new form pages in ASP.NET MVC, I’ve found myself over and over again adding the following two things to every form.</p>
<ul>
<li>After Html.BeginForm() I Put @Html.AntiForgeryToken()</li>
<li>Add the Attribute [ValidateAntiForgeryToken] To Every Post Action Method</li>
</ul>
<p>Before I was doing so much ASP.NET MVC, I would often see in Channel 9 videos, the presenter add the AntiForgeryToken() after the BeginForm() method on the cshtml razor page and say something like “you should always add this”.  I never saw them say “and don’t forget to add the attribute ValidateAntiForgeryToken to the controller POST method.</p>
<p>Just to be clear, below is what I’m talking about:</p>
<p><a href="/wp/wp-content/uploads/2014/05/image9.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb9.png" width="404" height="280" border="0" /></a></p>
<p><a href="/wp/wp-content/uploads/2014/05/image10.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb10.png" width="404" height="156" border="0" /></a></p>
<p>What this does is to make sure that the trusted browser that go the original GET page is the same one that is delivering the POST message.  Basically, this is all assuming that the end user is running a trusted browser.  It’s more about protecting the end user and not the server.  The idea is that a user who is using a browser they know is good (and trustworthy) will not be posting bad code back to the server.  You can read more details here:</p>
<p><a title="http://blog.stevensanderson.com/2008/09/01/prevent-cross-site-request-forgery-csrf-using-aspnet-mvcs-antiforgerytoken-helper/" href="http://blog.stevensanderson.com/2008/09/01/prevent-cross-site-request-forgery-csrf-using-aspnet-mvcs-antiforgerytoken-helper/">http://blog.stevensanderson.com/2008/09/01/prevent-cross-site-request-forgery-csrf-using-aspnet-mvcs-antiforgerytoken-helper/</a></p>
<p><a title="https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet" href="https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet">https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet</a></p>
<p>If you look at the traffic in Chrome debug tools, you’ll notice an extra parameter on your form that the controller checks for as follows:</p>
<p><a href="/wp/wp-content/uploads/2014/05/image11.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb11.png" width="404" height="117" border="0" /></a></p>
<p>Hope this helps!</p>
