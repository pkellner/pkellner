---
status: publish
published: true
pubDatetime: 2013-09-21T20:00:00.000Z
title: Making Hyperlink colors specific to just one &lt;UL&gt; Unordered List with
  SASS and CSS
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3736
wordpress_url: https://peterkellner.net/?p=3736
date: '2013-09-21 12:04:40 -0700'
date_gmt: '2013-09-21 19:04:40 -0700'
categories:
- SASS
- CSS
tags: []
---
<p>&nbsp;</p>
<p>I’m having to do much of my own CSS for the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> which happens in just two short weeks.  I’ve never been very good at CSS and <a href="http://sass-lang.com/">SASS</a> but having been thrown into the first somewhat I’m learning quickly.  I’m not sure the original intent, but the default on the SV Code Camp site for hyperlinks is not to show them.  I think it might have to do with the menu structure but the person who made that decision is tens of thousands of miles away and not available.</p>
<p>What I want to do is create a new class I can use in my <a href="http://www.w3schools.com/tags/tag_ul.asp">unorder list</a> that just affects that one list and does not break the rest of the site.  Here is what I put in the SASS file to make this happen.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;">a<span style="color: #cc6633;">.myhyperlink</span> {
  <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#ce4dd6;</span>
  <span style="color: #006080;">&amp;</span>:hover { <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#ffb3ff;</span> }
  <span style="color: #006080;">&amp;</span>:visited { <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#c458cb;</span> }
}</pre>
<p>&nbsp;</p>
</div>
<p>Here is the CSS it compiles into:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;"><span style="color: #008000;">/* line 64, ../Sass/svcc.scss */</span>
a<span style="color: #cc6633;">.myhyperlink</span> {
  <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#ce4dd6;</span>
}
<span style="color: #008000;">/* line 66, ../Sass/svcc.scss */</span>
a<span style="color: #cc6633;">.myhyperlink</span>:hover {
  <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#ffb3ff;</span>
}
<span style="color: #008000;">/* line 67, ../Sass/svcc.scss */</span>
a<span style="color: #cc6633;">.myhyperlink</span>:visited {
  <span style="color: #0000ff;">color</span>: <span style="color: #006080;">#c458cb;</span>
}</pre>
<p>&nbsp;</p>
</div>
<p>And then, all I have to add to my Unorder list is a class definition as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">ul</span> <span style="color: #ff0000;">class</span><span style="color: #0000ff;">="myhyperlink"</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Identify and/or solicit speakers<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Registration (in advance and/or day of the event)<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Room Monitoring<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Parking <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Web Site Help<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Event Support (helping with setup, putting up signs, etc. just before the event)<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Food preparation<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>Getting raffle items<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">ul</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p>HTH’s.</p>
