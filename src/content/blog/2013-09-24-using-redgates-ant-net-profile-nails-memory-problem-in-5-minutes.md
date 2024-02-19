---
status: publish
published: true
pubDatetime: 2013-09-24T20:00:00.000Z
title: Using Redgate&rsquo;s ANT .net Profile, Nails Memory Problem in 5 Minutes!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3742
wordpress_url: https://peterkellner.net/?p=3742
date: '2013-09-24 14:07:44 -0700'
date_gmt: '2013-09-24 21:07:44 -0700'
categories:
- SQL Server
- Redgate
tags: []
---
<p>I recently added a cool new feature to our Silicon Valley Code Camp web site that lets attendees authenticate their accounts with the <a href="http://www.meetup.com/meetup_api/">meetup OAuth api</a> and then we track the meetups that add us (SVCC) as a sponsor.&#160; We then do a nice aggregation on the bottom of all our web pages, and one dedicated meetup page (<a href="http://www.siliconvalley-codecamp.com/meetup">http://www.siliconvalley-codecamp.com/meetup</a>) of all those sponsors.&#160; After adding this new feature (and sending out 10,000 emails announcing it), our web site started running out of memory.&#160; Ouch!</p>
<p>With 5 minutes of installation and setup, I skipped reading the tutorials, just said launch the site with my IIS Express.&#160; I pointed <a href="http://www.red-gate.com/products/dotnet-development/ants-performance-profiler/?utm_source=google&amp;utm_medium=brand&amp;utm_content=brand_aware&amp;utm_campaign=antsperformanceprofiler&amp;gclid=CJn3jtP35LkCFUQ6QgodC0QA8A">ANT</a> at the base of my web site, told ANT I was using IIS Express and then simply said “Start Profiling Memory”.&#160; It launch a browser and showed me a graph showing my memory climbing past a gig.&#160;&#160; pushed the “take snapshot” button and instantly I could see where all my memory was going.&#160; </p>
<p>Bottom line is I was databasing the raw JSON file which is really unnecessary and it was getting quite large.&#160; I’m going to stop doing that and I’m betting my problem goes away.</p>
<p>You can see the graph ANT created for me with the offending memory allocation.&#160; Nailed it!&#160; Nice job Redgate.&#160; Jus what I’ve come to expect from those guys.</p>
<p><a href="/wp/wp-content/uploads/2013/09/image2.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/09/image_thumb1.png" width="609" height="110" /></a> </p>
<p>That’s it for now!</p>
