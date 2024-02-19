---
status: publish
published: true
pubDatetime: 2014-10-30T20:00:00.000Z
title: AngularJS, the Digest Loop, Directives and jQuery
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4078
wordpress_url: https://peterkellner.net/?p=4078
date: '2014-10-30 09:26:17 -0700'
date_gmt: '2014-10-30 16:26:17 -0700'
categories:
- AngularJS
tags: []
---
<p>I've been struggling with understanding when and how to use <a href="http://jquery.com/">jQuery</a> inside an <a href="https://angularjs.org/">AngularJS</a> directive and have the data binding work as expected.  I've got a good example I put together that shows how to do this as well as shows when you need to use the scope.$apply().  As a developer who spends a lot of time working with Microsoft technology, it's become very clear to me that I need to know a lot about AngularJS. AngularJS is a technology that Microsoft (<a href="http://www.visualstudio.com/">Visual Studio</a>) is pushing as a defacto standard and I'm sure they will have a lot of offerings that either use Angular or are inspired by it.</p>
<p>You can see from the below example that in the directive, I am using AngularJS.  Because our DOM is being modified outside of what AngularJS can see, it does not have a watch assigned to it and therefore in the <a href="https://docs.angularjs.org/api/ng/type/$rootScope.Scope">AngularJS digest loop</a>, the scope.cntjQuery does not get updated.  As we know, the $scope contains the "truth" of this application but if the digest loop is not run then the truth never makes it to the browser.  Calling scope.$apply() causes the digest loop to be run.</p>
<p>I've also made a short video showing and talking about this particular example.  HTH's!</p>
<p>(inspired by the post http://angular-tips.com/blog/2013/08/watch-how-the-apply-runs-a-digest/)</p>
<p><iframe src="//www.youtube.com/embed/2lNJcn-D4iI?feature=player_detailpage" width="640" height="360" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
<p><iframe src="http://jsfiddle.net/pkellner99/5vnfzdof/3/embedded/" width="100%" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>
