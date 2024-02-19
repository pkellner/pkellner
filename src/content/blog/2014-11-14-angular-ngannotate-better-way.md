---
status: publish
published: true
pubDatetime: 2014-11-14T20:00:00.000Z
title: Angular and ngAnnotate, a Better Way
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4104
wordpress_url: https://peterkellner.net/?p=4104
date: '2014-11-14 18:10:42 -0800'
date_gmt: '2014-11-15 01:10:42 -0800'
categories:
- JavaScript
- AngularJS
- Angular
tags: []
---
<p>I recently posted to <a href="http://stackoverflow.com/questions/26937970/not-understanding-why-this-angularjs-works-without-having-to-inject-service">StackOverflow</a> a question and example of how adding a dependency injection to my <a href="https://angularjs.org/">AngularJS</a> app did not seem to matter regarding my program running correctly.  The answer I got back was clear, but somewhat disconcerting.  Basically, the answer is that Angular takes care of the problem for me in development but when I move to production with minification, it will fail.  Well, that sucks on so many levels. Here is an example of code that shows the problem.</p>
<pre class="csharpcode">angular.module(<span class="str">'svccApp'</span>, []);

  angular.module(<span class="str">'svccApp'</span>).
  factory(<span class="str">'bareService'</span>, [

    <span class="kwrd">function</span>() {
      <span class="kwrd">var</span> myValue = {};
      myValue.str1 = <span class="str">'xyz'</span>;
      <span class="kwrd">return</span> myValue;
    }
  ]);

  angular.module(<span class="str">'svccApp'</span>)
    .controller(<span class="str">'MyController'</span>, MyController);

  <span class="rem">// WHY IS THIS NOT NECESSARY?</span>
  <span class="rem">//MyController.$inject = ['$scope', 'bareService'];</span>

  <span class="kwrd">function</span> MyController($scope, bareService) {
    $scope.testVal = bareService.str1;
  }</pre>
<p>As it turns out, there are actually 4 things I can see doing to help mitigate the issue of deploying buggy code you don’t know about. (answers included from my stackoverflow post mentioned above)</p>
<ul>
<li>Test Everything in minimized JavaScript</li>
<li>Add ng-strict-di to the div containing the ng-app tag</li>
<li>Add ngAnnotate to your build process to try and fix the error automagically</li>
<li>Force your gulp or grunt build process to fail if ngAnnotate find any issues</li>
</ul>
<p>I like number 4 best.  below is my poorly written gulp task that does that as well as a screen shot of it finding an error.  It basically gives me the code to put back into my application so it will not fail again.</p>
<pre class="csharpcode">gulp.task(<span class="str">'scripts'</span>, <span class="kwrd">function</span> (cb) {
    gulp.src([<span class="str">'public/app/**/*.js'</span>])
        .pipe(concat(<span class="str">'main.js'</span>))
        .pipe(gulp.dest(<span class="str">'scratchfiles'</span>));


    <span class="kwrd">return</span> gulp.src([<span class="str">'scratchfiles/main.js'</span>])
        .pipe(jshint(<span class="str">'.jshintrc'</span>))
        .pipe(jshint.reporter(<span class="str">'default'</span>))
        .pipe(ngAnnotate())
        .pipe(diff())
        .pipe(diff.reporter({fail: <span class="kwrd">true</span>}))
        .pipe(gulp.dest(<span class="str">'public/dist'</span>))
        .pipe(rename({suffix: <span class="str">'.min'</span>}))
        .pipe(uglify())
        .pipe(gulp.dest(<span class="str">'public/dist'</span>))
        .pipe(notify({message: <span class="str">'Scripts task complete'</span>}));
});</pre>
<p><a href="/wp/wp-content/uploads/2014/11/image.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/11/image_thumb.png" alt="image" width="553" height="205" border="0" /></a></p>
<p>When I run the task above, the gulp diff command stops and shows me what ngAnnotate added to my JavaScript.  Then, I can go and add that myself and then my gulp build will work and it will not generate any errors.</p>
<p>At the moment, I can’t figure out how to get this task to stop my gulp build process so I have to run this task by itself.  I’d love to hear how to fix that also.  This is all pretty new to me.</p>
