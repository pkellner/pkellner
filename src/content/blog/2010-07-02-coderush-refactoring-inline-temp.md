---
status: publish
published: true
pubDatetime: 2010-07-02T20:00:00.000Z
title: A Handy Refactoring with CodeRush (InLine Temp)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1335
wordpress_url: https://peterkellner.net/2010/07/02/coderush-refactoring-inline-temp/
date: '2010-07-02 07:34:56 -0700'
date_gmt: '2010-07-02 14:34:56 -0700'
categories:
- C#
- Visual Studio
- Refactor
- Visual Studio 2010
- CodeRush
tags: []
---
<p>I’ve recently started using <a href="http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/">CodeRush</a> with <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2010</a> and am so far very impressed with the convenience it adds to coding.&#160; One thing that is very clear is that the creators of <a href="http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/">CodeRush</a> are real programmers and look very hard for patterns that us developers are constantly doing.&#160; As I run into these things that get my attention, I plan on blogging them.&#160; Some are just earth shattering, and others, just nice to have.&#160; This particular one is a nice to have.</p>
<p>So, say you have code like this:</p>
<p>&#160;</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">var sessionAttendeeOds = <br />  <span style="color: #0000ff">new</span> SessionAttendeeODS();<br />listSessionAttendees = <br />  sessionAttendeeOds.GetByUsername(Context.User.Identity.Name);</pre>
</div>
<div>&#160;</div>
<p><!--more--></p>
<div>When I first wrote code, I often do it like this thinking that I may have more methods I’m going to call against the instantiated object.&#160; In this case, many years later, I’m looking at the code and want to condense it.&#160; With <a href="http://www.devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/">CodeRush</a>, it show me three little dots under the variable sessionAttendeeOds as follows.&#160; When I click on these three dots, I get the following screen.</div>
<p><a href="/FilesForWebDownload/AHandyRefactoringwithCodeRushInLineTemp_6A97/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AHandyRefactoringwithCodeRushInLineTemp_6A97/image_thumb.png" width="405" height="156" /></a> </p>
<p>When I chose “InlineTemp”, the code changes to the following, make it easier to read.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">listSessionAttendees = <br />                <span style="color: #0000ff">new</span> SessionAttendeeODS().GetByUsername(Context.User.Identity.Name);</pre>
<p></div>
<p>Again, this is not a huge deal, but small fixes like this will add up over time and make my code cleaner and more readable.&#160; CodeRush makes it so easy that I’m sure I’ll do this kind of thing more and more.</p>
<p>HTH’s.</p>
