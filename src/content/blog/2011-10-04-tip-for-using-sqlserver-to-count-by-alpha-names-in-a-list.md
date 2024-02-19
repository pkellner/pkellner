---
status: publish
published: true
pubDatetime: 2011-10-04T20:00:00.000Z
title: Tip for Using SQLServer To Count By Alpha Names in a list
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1600
wordpress_url: https://peterkellner.net/2011/10/04/tip-for-using-sqlserver-to-count-by-alpha-names-in-a-list/
date: '2011-10-04 22:11:33 -0700'
date_gmt: '2011-10-05 05:11:33 -0700'
categories:
- SQL Server
- Sql Server 2008
- TSQL
tags: []
---
<p>&#160;</p>
<p>So, this is not a big tip, but worth at least 10 minutes to figure it out on your own.&#160; Here is to saving you 10 minutes:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">SELECT</span> <span style="color: #0000ff">LEFT</span> (userlastname, 1) <span style="color: #0000ff">as</span> alpha,<br />       <span style="color: #0000ff">count</span>(id)<br /><span style="color: #0000ff">FROM</span> attendees<br /><span style="color: #0000ff">WHERE</span> id <span style="color: #0000ff">IN</span> (<br />              <span style="color: #0000ff">SELECT</span> attendeesid<br />              <span style="color: #0000ff">FROM</span> AttendeesCodeCampYear<br />              <span style="color: #0000ff">WHERE</span> codecampyearid = 6<br />      )<br /><span style="color: #0000ff">GROUP</span> <span style="color: #0000ff">BY</span>  <span style="color: #0000ff">LEFT</span> (userlastname, 1)O<br /><span style="color: #0000ff">ORDER</span> <span style="color: #0000ff">BY</span> <span style="color: #0000ff">LEFT</span> (userlastname, 1)</pre>
<p></div>
<p>It’s pretty self explanatory.&#160; Our case is we have two tables that we track code camp attendees.&#160; One is the master list, and the other is a detail by year.&#160; (6 is this year)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/10/image3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/10/image_thumb.png" width="344" height="198" /></a></p>
<p><!--more--></p>
<p>And, the results:</p>
<p>&gt; NULL&#160;&#160;&#160; 1</p>
<p>&gt;&#160;&#160;&#160;&#160;&#160;&#160;&#160; 6</p>
<p>&gt; .&#160;&#160;&#160;&#160;&#160;&#160; 1</p>
<p>&gt; @&#160;&#160;&#160;&#160;&#160;&#160; 1</p>
<p>&gt; _&#160;&#160;&#160;&#160;&#160;&#160; 18</p>
<p>&gt; A&#160;&#160;&#160;&#160;&#160;&#160; 319</p>
<p>&gt; B&#160;&#160;&#160;&#160;&#160;&#160; 488</p>
<p>&gt; C&#160;&#160;&#160;&#160;&#160;&#160; 543</p>
<p>&gt; Ç&#160;&#160;&#160;&#160;&#160;&#160; 2</p>
<p>&gt; D&#160;&#160;&#160;&#160;&#160;&#160; 313</p>
<p>&gt; E&#160;&#160;&#160;&#160;&#160;&#160; 84</p>
<p>&gt; F&#160;&#160;&#160;&#160;&#160;&#160; 169</p>
<p>&gt; g&#160;&#160;&#160;&#160;&#160;&#160; 368</p>
<p>&gt; H&#160;&#160;&#160;&#160;&#160;&#160; 340</p>
<p>&gt; I&#160;&#160;&#160;&#160;&#160;&#160; 49</p>
<p>&gt; J&#160;&#160;&#160;&#160;&#160;&#160; 190</p>
<p>&gt; K&#160;&#160;&#160;&#160;&#160;&#160; 474</p>
<p>&gt; L&#160;&#160;&#160;&#160;&#160;&#160; 460</p>
<p>&gt; M&#160;&#160;&#160;&#160;&#160;&#160; 592</p>
<p>&gt; N&#160;&#160;&#160;&#160;&#160;&#160; 255</p>
<p>&gt; O&#160;&#160;&#160;&#160;&#160;&#160; 79</p>
<p>&gt; P&#160;&#160;&#160;&#160;&#160;&#160; 427</p>
<p>&gt; Q&#160;&#160;&#160;&#160;&#160;&#160; 14</p>
<p>&gt; R&#160;&#160;&#160;&#160;&#160;&#160; 336</p>
<p>&gt; S&#160;&#160;&#160;&#160;&#160;&#160; 776</p>
<p>&gt; T&#160;&#160;&#160;&#160;&#160;&#160; 302</p>
<p>&gt; u&#160;&#160;&#160;&#160;&#160;&#160; 27</p>
<p>&gt; V&#160;&#160;&#160;&#160;&#160;&#160; 191</p>
<p>&gt; w&#160;&#160;&#160;&#160;&#160;&#160; 296</p>
<p>&gt; X&#160;&#160;&#160;&#160;&#160;&#160; 21</p>
<p>&gt; y&#160;&#160;&#160;&#160;&#160;&#160; 176</p>
<p>&gt; Z&#160;&#160;&#160;&#160;&#160;&#160; 100</p>
