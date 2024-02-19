---
status: publish
published: true
pubDatetime: 2013-01-17T20:00:00.000Z
title: Using SASS and Compass to Solve 2 CSS files into 1 CSS File
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3391
wordpress_url: https://peterkellner.net/?p=3391
date: '2013-01-17 15:06:04 -0800'
date_gmt: '2013-01-17 22:06:04 -0800'
categories:
- Sencha
- ASP.net
- SenchaTouch
- SASS
tags: []
---
<p>I’m currently building a simple <a href="http://www.sencha.com/products/touch">SenchaTouch</a> app that includes a twitter stream.&#160; The example CSS that came with the app was global&#160; in nature.&#160; That is, it set styles on all image tags, h2 tags, etc.&#160; Here is what it looks like:</p>
<p>&#160;</p>
<pre class="csharpcode">h2 {
    font-weight: bold;
    padding-bottom: 3px;
}

img {
    border-radius: 5px;
    float: left;
}

.tweet {
    font-size: 70%;
    margin-left: 60px;
    color: #333;
    min-height: 50px;
}

.x-list-item {
    border-top: 1px solid white;
}

.posted {
    float: right;
}</pre>
<p>
  </p>
<style type="text/css">
<!--<br />
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
.csharpcode .lnum { color: #606060; }<br />
--></style>
<p>What this does is every img tag will get a float left.&#160; Very bad!&#160; So, I’ already using <a href="http://sass-lang.com/">Sass</a> (style with attitude) and <a href="http://compass-style.org/">compass</a> in my app so all I need to do is wrap the code that actually uses these tags in a div tag like &lt;div class=’tweetclassinapp’ &gt;..&lt;/div&gt; and then wrap the above css in a SASS construct as follows:</p>
<p></p>
<pre class="csharpcode">.tweetclassinapp {
    h2 {
        font-weight: bold;
        padding-bottom: 3px;
    }

    img {
        border-radius: 5px;
        float: left;
    }

    .tweet {
        font-size: 70%;
        margin-left: 60px;
        color: #333;
        min-height: 50px;
    }

    .x-list-item {
        border-top: 1px solid white;
    }

    .posted {
        float: right;
    }
}</pre>
<p>
  <br />Now, the generated CSS looks like this and my tweet stream works perfectly!</p>
<p></p>
<pre class="csharpcode">.tweetclassinapp h2 {
    font-weight: bold;
    padding-bottom: 3px;
}

.tweetclassinapp img {
    border-radius: 5px;
    float: left;
}

.tweetclassinapp .tweet {
    font-size: 70%;
    margin-left: 60px;
    color: #333;
    min-height: 50px;
}

.tweetclassinapp .x-list-item {
    border-top: 1px solid #fff;
}

.tweetclassinapp .posted {
    float: right;
}</pre>
<p>And of course, now my new StarSaver app looks like this (correctly)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/01/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/01/image_thumb.png" width="164" height="244" /></a></p>
<p>That’s it for now!&#160; Hope this helps</p>
