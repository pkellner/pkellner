---
status: publish
published: true
pubDatetime: 2014-11-19T20:00:00.000Z
title: Why Refactoring Support in a JavaScript IDE Is so Important
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4112
wordpress_url: https://peterkellner.net/?p=4112
date: '2014-11-19 10:35:51 -0800'
date_gmt: '2014-11-19 17:35:51 -0800'
categories:
- JavaScript
- Refactor
- IDE
tags: []
---
<p>As I’m building out a new version of the <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> web site in <a href="https://angularjs.org/">AngularJS</a>, I’m running into the very common case where I have not created my program files hierarchy optimally.&#160; What I have now (as seen from <a href="https://www.jetbrains.com/webstorm/">JetBrains WebStorm</a>) is the following:</p>
<p><a href="/wp/wp-content/uploads/2014/11/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2014/11/image_thumb1.png" width="215" height="273" /></a> </p>
<p>I realize now that I’m adding the login screen that I really should have an app folder account and registration should be a subfolder of that.&#160; To make that change without a good tool (like WebStorm), I would need to go into my file manager and copy the files I want, then go into my index.html file and manually change all those directory references.&#160; Likely (because I’m not that good at that kind of work) I’d make at least one mistake and have to come back and revisit the issue again.</p>
<p>With <a href="https://www.jetbrains.com/webstorm/">WebStorm</a>, I simply drag and drop the JavaScript files (after creating a new directory) and the index.html references are automatically cleaned up for me.</p>
<p>Just Sayin…</p>
