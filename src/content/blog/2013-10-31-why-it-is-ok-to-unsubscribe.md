---
status: publish
published: true
pubDatetime: 2013-10-31T20:00:00.000Z
title: Why It is OK to Unsubscribe
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3756
wordpress_url: https://peterkellner.net/?p=3756
date: '2013-10-31 08:33:33 -0700'
date_gmt: '2013-10-31 15:33:33 -0700'
categories:
- Mail Server
- SendGrid
tags: []
---
<p>&#160;</p>
<p>Having moved the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> mailing list to a professional emailing service this year (<a href="http://sendgrid.com/">SendGrid</a>) I have learned quite a bit about mailing.&#160; For the first 7 years, I did all my own SMTP mailing. That is, when I would send an email, I would go directly through my own SMTP mail server.&#160; This meant I had to deal with lots of issues including things like both Google and Yahoo throttling my email.&#160; By that I mean that when I would send too many emails (like more than 100 I think) to the Gmail or Yahoo domains, both sites would start bouncing saying I was sending to many.&#160; My solution was to throttle those myself so that when I would send an email, I’d trickle out emails to duplicate domains.&#160; SendGrid, among other things, takes care of that by retrying all bounced email for reasons like throttling tens of times until it finally gets through.&#160; Basically, I did not have to change anything on my side besides the smtp port of my send to smtp.sendgrid.com.</p>
<h2>The Unsubscribe is OK reason</h2>
<p>So, on to the reason for this post.</p>
<p>I’ve learned that if I send people junk mail when they’ve asked to unsubscribe that those people report me and I’m guessing that many servers will then block my other email.&#160; In other words, as a sender, it is in my best interest to honor unsubscribes, otherwise the hurt will be worse than the gain.&#160; Below is what I see when I go to my sendgrid control panel and ask for how many people have reported me as spam.&#160; Luckily, it’s only 52 and considering my list is 13,000+, I think this is probably OK.</p>
<p><a href="/wp/wp-content/uploads/2013/10/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/10/image_thumb.png" width="290" height="267" /></a></p>
