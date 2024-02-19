---
status: publish
published: true
pubDatetime: 2015-03-26T20:00:00.000Z
title: Routing and State (The AngularJS Discussions)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4214
wordpress_url: https://peterkellner.net/?p=4214
date: '2015-03-26 12:45:41 -0700'
date_gmt: '2015-03-26 19:45:41 -0700'
categories:
- JavaScript
- AngularJS
- Angular
tags: []
---
<p>I’m a big fan of the <a href="http://devchat.tv/adventures-in-angular/">Adventures in Angular</a> podcasts.&#160; At a <a href="http://devchat.tv/adventures-in-angular/034-aia-live-from-ng-conf-2015">recent podcast</a> that happened at <a href="http://www.ng-conf.org/">ng-conf</a> in Salt Lake City, there was a lively discussion around the topic of routing and URL’s.&#160; Specifically, one side of the discussion was that a URL defines a state of an application.&#160; The other side said that is not true.</p>
<p>Personally, I think it’s ridiculous to think that a URL can define that state of applications.&#160; My first proof is that there is a huge amount of discussion around it.&#160; If it was clear and true, there would not need to be discussions about it.</p>
<p>I believe that URL’s are simply pointers to places in web sites.&#160; That’s it.&#160; Any more than will breed confusion.&#160; The most trivial example is that a web page is different when the user is authenticated (logged in) versus not.&#160; That by itself should close the discussion.</p>
<p>On a more constructive note, I think it’s reasonable to map application states to URLs. For Example, their might be three states while viewing an employee record on a web site, all at the same URL. The states might be as follows:</p>
<ul>
<li>State 1:&#160; Not Logged In (show error)</li>
<li>State 2: Logged in as Employee</li>
<li>State 3: Logged in as Manager</li>
</ul>
<p>All three states would show different data and allow for different interactions.&#160; All different, all on the same URL.</p>
<p>Bottom line, we as engineers should not get confused with things we do for convenience and start thinking that there is some science behind that.&#160; Recognize it for what it is.</p>
