---
status: publish
published: true
pubDatetime: 2014-12-03T20:00:00.000Z
title: Debugging SendGrid&rsquo;s Parsing Incoming Messages
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4130
wordpress_url: https://peterkellner.net/?p=4130
date: '2014-12-03 15:15:00 -0800'
date_gmt: '2014-12-03 22:15:00 -0800'
categories:
- Fiddler
- ASP.NET 4.5
tags: []
---
<p>SendGrid has a nice feature available to it’s Silver Level Subscribers and above (currently $79/month) that let’s you have incoming message to a domain parsed and forwarded through a web service.&#160; This is great if it works but if it does not debugging is tricky because the web service is running on your production server.</p>
<p><a href="/wp/wp-content/uploads/2014/12/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/12/image_thumb.png" width="328" height="276" /></a> </p>
<p>Here are some steps to debug the service.</p>
<p>Go to the URL:&#160; <a title="http://requestb.in/" href="http://requestb.in/">http://requestb.in/</a> and then use the URL given to you as the email forwarding URL inside of the SendGrid Control panel.</p>
<p><a href="/wp/wp-content/uploads/2014/12/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/12/image_thumb1.png" width="330" height="228" /></a> </p>
<p><a href="/wp/wp-content/uploads/2014/12/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/12/image_thumb2.png" width="330" height="463" /></a> </p>
<p>Then, send an email to your domain you want to parse (siliconvalley-codecamp.net in my case).</p>
<p>Head back to the requestdb.in page and look at the request.</p>
<p>Copy the headers into the fiddler compose request page, then the body into the data area.&#160; You can now post this to your real web server running locally to see what happens.</p>
<p><a href="/wp/wp-content/uploads/2014/12/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/12/image_thumb3.png" width="613" height="396" /></a> </p>
<p>For some details on what the web service might look like in ASP.NET WebAPI check out this post:&#160; <a title="http://www.altifysoftware.com/receiving-emails-using-sendgrid-inbound-parse-c-webapi2/" href="http://www.altifysoftware.com/receiving-emails-using-sendgrid-inbound-parse-c-webapi2/">http://www.altifysoftware.com/receiving-emails-using-sendgrid-inbound-parse-c-webapi2/</a>.&#160; I’d do a little more error checking than done here and also remove some extra code.&#160; Otherwise, it works great.</p>
<p>HTH’s!</p>
