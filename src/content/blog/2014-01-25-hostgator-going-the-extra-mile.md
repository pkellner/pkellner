---
status: publish
published: true
pubDatetime: 2014-01-25T20:00:00.000Z
title: Hostgator Going The Extra Mile
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3900
wordpress_url: https://peterkellner.net/?p=3900
date: '2014-01-25 09:04:22 -0800'
date_gmt: '2014-01-25 16:04:22 -0800'
categories:
- hosting
tags: []
---
<p>While no hosting company is perfect, I’ve found <a href="http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=pkellner">Hostgator</a> one of the best I’ve worked with for Linux type hosting.&#160; I host this blog (<a href="https://peterkellner.net">https://peterkellner.net</a>) at <a href="http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=pkellner">Hostgator</a> and have recently noticed the site has been kind of slow.&#160; I emailed them to ask them to look into it and the email below was there response.</p>
<p>As far as I’m concerned, this is <u>way above and beyond</u> what I should expect from a pretty low cost <a href="http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=pkellner">wordpress hoster</a>.&#160; They could have just said it’s slow but it’s your software and you need to figure it out but they did not.&#160; Below was their response which I consider <strong>excellent</strong>!</p>
<hr />
<p>Hello there!    <br />Firstly, I'd like to apologize for the delay in our responses. Ticket queues are much longer than we'd like right now, but we still try to answer each ticket diligently. Thank you so much for your patience!     <br />I looked into the server logs and found no evidence of a server-wide performance problem on 24 January 2014.     <br />Then, I performed two separate tests and found that it's actually your site itself with the performance problem:     <br />- <a href="http://tools.pingdom.com/fpt/df/chDGBB/peterkellner.net">http://tools.pingdom.com/fpt/df/chDGBB/peterkellner.net</a>     <br />- <a href="http://www.webpagetest.org/result/140fddf125_NC_FMP/">http://www.webpagetest.org/result/140fddf125_NC_FMP/</a>     <br />Both show that there is a significant delay between 2 and 3 seconds on &lt;<a href="/wp/index.php?wordtube-js=true&amp;ver=2.0">https://peterkellner.net/&amp;ver=2.0</a>&gt;.     <br />This means that your plugin WordTube is being slow on EVERY page load, regardless of caching. If you disable it, your site should should perform that much faster.     <br />The Follow Button for Jetpack plugin is incompatible with your unusual WordPress directory structure. (You have WordPress installed in a subdirectory, `~/public_html/wp`.)     <br />This plugin tries to fetch a file from a location it expects, but the file isn't actually there; it's in the subdirectory `wp`.     <br />To fix the problem, you'd have to contact the developers of both plugins, as this is now a coding issue outside the scope of HostGator support.     <br />Nevertheless, I hope this information has been helpful in pointing you to the right direction. Please don't hesitate to follow up if you have any more questions or concerns.     <br />Sincerely,&#160; <br />Linux Systems Administrator     <br />HostGator.com, LLC     </p>
