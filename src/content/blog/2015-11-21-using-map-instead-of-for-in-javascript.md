---
status: publish
published: true
pubDatetime: 2015-11-21T20:00:00.000Z
title: Using map instead of a for loop in ECMAScript 5 JavaScript
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4355
wordpress_url: https://peterkellner.net/?p=4355
date: '2015-11-21 11:46:37 -0800'
date_gmt: '2015-11-21 18:46:37 -0800'
categories:
- JavaScript
tags: []
---
<p>&nbsp;</p>
<p>Before</p>
<pre lang="javascript">for (i = 0; i &lt; speakers.length; i++) {
                speakers[i].speakerImageUrl = "https://www.siliconvalley-codecamp.com/attendeeimage/" +
                    speakers[i].id + ".jpg";
            }</pre>
<p>After</p>
<pre lang="javascript">            speakers.map(function(speaker){
               speaker.speakerImageUrl = "https://www.siliconvalley-codecamp.com/attendeeimage/" +
                    speaker.id + ".jpg";
            });
           
</pre>
<p>Just Sayin...</p>
