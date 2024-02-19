---
status: publish
published: true
pubDatetime: 2010-02-09T20:00:00.000Z
title: How To Fix Windows 7 Boot Loader (Boot.ini) When Goes Awry
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 523
wordpress_url: https://peterkellner.net/2010/02/09/fix-windows7-bootloader/
date: '2010-02-09 22:06:46 -0800'
date_gmt: '2010-02-10 05:06:46 -0800'
categories:
- Windows 7
tags: []
---
<p>I got this tip from the <a href="http://kb.acronis.com/content/1507">Acronis Knowledgebase</a> which is very helpful.&#160; Basically, you can boot off of your original windows 7 DVD, chose repair, chose a DOS prompt, then enter the two commands:</p>
<blockquote><p><strong>Bootrec.exe /FixMbr</strong>      <br /> <strong>Bootrec.exe /FixBoot</strong></p>
<p>That’s it!&#160; Good as new.</p>
</blockquote>
