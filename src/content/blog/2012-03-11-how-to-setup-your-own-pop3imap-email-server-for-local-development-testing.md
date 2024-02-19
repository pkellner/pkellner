---
status: publish
published: true
pubDatetime: 2012-03-11T20:00:00.000Z
title: How To Setup Your Own Pop3/IMAP Email Server for Local Development Testing
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1882
wordpress_url: https://peterkellner.net/2012/03/11/how-to-setup-your-own-pop3imap-email-server-for-local-development-testing/
date: '2012-03-11 11:47:39 -0700'
date_gmt: '2012-03-11 18:47:39 -0700'
categories:
- imap
- Mail Server
- POP3
tags: []
---
<p>For the past few months, I’ve been working on building an <a href="http://en.wikipedia.org/wiki/HTML5">HTML5</a> email web client.&#160; It’s fundamentally server based for gathering email.&#160; That means, when I test, I need to connect my server software to both <a href="http://en.wikipedia.org/wiki/Post_Office_Protocol">POP3</a> and <a href="http://en.wikipedia.org/wiki/Internet_Message_Access_Protocol">IMAP</a> <a href="http://en.wikipedia.org/wiki/Message_transfer_agent">servers</a>.&#160; I’ve been abusing public email services (names not mentioned) and it has made life a little difficult.&#160; That is also not to mention that I often program away from my office which means I pay hotspot charges that can really mount up quickly.</p>
<p>So, I spent a couple hours this morning setting up a local POP3/IMAP mail server on my windows 7 (OK, actually Windows 8 Preview but the process is the same). </p>
<p>&#160;</p>
<h2>
<p>Install HMailServer</p>
</h2>
<p>Download and install the latest from <a href="http://www.hmailserver.com/index.php?page=download">http://www.hmailserver.com/index.php?page=download</a> (I used V5.4)</p>
<p>Add an entry in your c:\windows\system32\drivers\etc\hosts for your local mail server (127.0.0.1&#160; mail.local)</p>
<p>In hMailServer admin, add a domain called mail.local and make sure it is enabled</p>
<p><a href="/wp/wp-content/uploads/2012/03/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb2.png" width="244" height="99" /></a></p>
<p>Add some test accounts to hMailServer</p>
<p><a href="/wp/wp-content/uploads/2012/03/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb3.png" width="244" height="200" /></a></p>
<p>In settings, make sure to enable SMTP,POP3 and IMAP</p>
<p><a href="/wp/wp-content/uploads/2012/03/image4.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb4.png" width="244" height="137" /></a></p>
<p>On Advanced, put in your default domain</p>
<p><a href="/wp/wp-content/uploads/2012/03/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb5.png" width="244" height="161" /></a></p>
<p>In advanced smtp make sure to bind to 127.0.0.1</p>
<p><a href="/wp/wp-content/uploads/2012/03/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb6.png" width="244" height="112" /></a></p>
<p>In Advanced / IP Ranges Put in just your localhost range</p>
<p><a href="/wp/wp-content/uploads/2012/03/image7.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb7.png" width="244" height="144" /></a></p>
<p>Disable auto-ban in Advanced</p>
<p><a href="/wp/wp-content/uploads/2012/03/image8.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb8.png" width="244" height="182" /></a></p>
<p>&#160;</p>
<h2>Install Mozilla Thunderbird Email Client</h2>
<p>You need a local client to test with. You can use outlook, or in my case, I used Mozilla’s Thunderbird Email Client.&#160; You can download it from <a href="http://www.mozilla.org/en-US/thunderbird/">http://www.mozilla.org/en-US/thunderbird/</a>.</p>
<p>Simply install and go into account setup and put in your test email (in my case, <a href="mailto:test2@mail.local">test2@mail.local</a>, server mail.local)</p>
<p><a href="/wp/wp-content/uploads/2012/03/image9.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb9.png" width="244" height="190" /></a></p>
<p>By default, it puts .mail.local into the domain names.&#160; Simply get rid of the leading period for both smtp and pop3 as follows. Push re-test and you will show successful.</p>
<p><a href="/wp/wp-content/uploads/2012/03/image10.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb10.png" width="244" height="160" /></a></p>
<p>You can now send and receive mail locally in your mozilla thunderbird email client (or any other email client you install locally)</p>
<p>&#160;</p>
<p>That’s it!&#160; You’ve setup your own mail server that only listens on your localhost port.&#160; You may need to disable your firewall for local connections.&#160; I’m not sure if that is necessary.</p>
