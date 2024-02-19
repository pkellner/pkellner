---
status: publish
published: true
pubDatetime: 2012-02-02T20:00:00.000Z
title: HTML5 Media Queries, Tablet Verses Phone, Anything but Intuitive
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1806
wordpress_url: https://peterkellner.net/2012/02/02/html5-media-queries-tablet-verses-phone-anything-but-intuitive/
date: '2012-02-02 19:57:22 -0800'
date_gmt: '2012-02-03 02:57:22 -0800'
categories:
- HTML5
- CSS3
- HTML5 Media Query
tags: []
---
<p>&#160;</p>
<p>&#160;</p>
<h2>Background and Introduction</h2>
<p>I’m building a mobile touch application that uses <a href="http://www.sencha.com/products/touch/">SenchaTouch 2</a> on the client and <a href="http://msdn.microsoft.com/en-us/data/aa937723">Microsoft’s ASP.NET EF Code First</a> on the server.&#160; Things have been moving along pretty quickly because both of these toolkit’s are awesome.&#160; I got stuck for about 2 hours on what I thought should be a very simple problem.&#160; I’ve basically got a two panel application where on the left panel I want to be able to show a “display second panel” button if I’m on a small screen, and if I’m on a big screen I don’t want to show that button, but I do want to show the second panel.&#160; Basically, here is what I want my app to look like using <a href="http://www.w3schools.com/html5/default.asp">HTML5</a> <a href="http://www.css3.info/preview/media-queries/">Media Queries</a>.</p>
<p>&#160;</p>
<table border="2" cellspacing="0" cellpadding="10" width="548">
<tbody>
<tr>
<td valign="top" width="286">
<h3>Tablet Mode</h3>
</td>
<td valign="top" width="258">
<h3>Phone Mode</h3>
</td>
</tr>
<tr>
<td valign="top" width="283"><a href="/wp/wp-content/uploads/2012/02/image2.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb2.png" width="268" height="68" /></a></td>
<td valign="top" width="258"><a href="/wp/wp-content/uploads/2012/02/image3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb3.png" width="206" height="62" /></a></td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>Notice that the Tablet Mode is wider than 480 pixels and the Phone Mode is narrower (OK, take my word for it).&#160; As you collapse the browser you will see it automatically change.</p>
<p>&#160;</p>
<h2>How It Works</h2>
<p>Basically, an HTML5 media query is no more than letting you have CSS that only gets run under certain circumstances.&#160; That is, the browser window is less than a certain width (or great than), or even something like printing.&#160; I first got introduced to media queries a while back when at our code camp (Silicon Valley Code Camp), we had people complaining that when they printed their schedules, it included all our “junk” on the left and right margins.&#160; The solution was to use a media query that said “if printing, add a special css to those columns telling them not to show”.</p>
<p>&#160;</p>
<h2>My Problem and Solution Today</h2>
<p>The media query itself that you put in your css looks like the following:</p>
<p>
<pre class="csharpcode">@media only screen and (max-width:480px) {
           .showOnTablet {
               display: none;
           }
       }</pre></p>
<p>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<p>It’s actually pretty simple.&#160; It says anything you assign the class “showOnTablet” to, will render it invisible.&#160; If you think about it, you could order the problem I outlined above lots of ways.&#160; The “if” statements are very stragiht forward (or so I thought).&#160; It may be (OK, likely is) my lack of understanding of CSS, but at the end of the day, to make the Media Query work, this is what I had to do in my css (style) file.</p>
<p>1.&#160; Set all my DOM elements I want to display to visible.</p>
<p>2.&#160; Create a media query for each item I want to make invisible.</p>
<p>&#160;</p>
<p>Sound simple right?</p>
<p>So, here is what does not work.</p>
<p>1) Have one media query for each object (div or span) that sets one item visible and one item invisible</p>
<p>2) Set both objects (div or span) to invisible, then have the media query make them visible</p>
<p>I would not 100% swear to what does not work, but I can promise if you follow what I show does work, that will work for you also.</p>
<p>&#160;</p>
<h2>The HTML Page (finally)</h2>
<p><pre class="csharpcode"><span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">meta</span> <span class="attr">charset</span><span class="kwrd">=&quot;utf-8&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Brain Bashing With HTML5 Media Queries<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">style</span> <span class="attr">type</span><span class="kwrd">=&quot;text/css&quot;</span><span class="kwrd">&gt;</span>

        .floatRight {
            float: right;
            margin-top: 10px;
            padding: 5px;
            background: Yellow;
            border-radius: 22px;
        }

        .left {
            margin-top: 10px;
            padding: 5px;
            background: red;
            border-radius: 10px;
        }

        .showOnTablet {
            display: visible;
        }

        .showOnMobile {
            display: visible;
        }

        @media only screen and (max-width:480px) {
            .showOnTablet {
                display: none;
            }
        }

        @media only screen and (min-width:481px) {
            .showOnMobile {
                display: none;
            }
        }
    <span class="kwrd">&lt;/</span><span class="html">style</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;showOnTablet floatRight&quot;</span><span class="kwrd">&gt;</span>
        RIGHT PANEL
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;left&quot;</span><span class="kwrd">&gt;</span>
        LEFT PANEL  
        <span class="kwrd">&lt;</span><span class="html">button</span> <span class="attr">type</span><span class="kwrd">=&quot;button&quot;</span> <span class="attr">class</span><span class="kwrd">=&quot;showOnMobile&quot;</span><span class="kwrd">&gt;</span>
            Show Panel Info (not really)<span class="kwrd">&lt;/</span><span class="html">button</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>


<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style></p>
