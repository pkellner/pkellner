---
status: publish
published: true
pubDatetime: 2006-09-18T20:00:00.000Z
title: Integrating PBWiki with .Net Using the New PBWiki API, The Start of a .Net
  API
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: In this article we will demonstrate a technique used to automatically add
  Wiki Pages to PBWiki using the not quite released API provided by the peanut butter
  guys. The demonstration will involve integrating scheduled presentations at our
  Silicon Valley Code Camp on October 7th and 8th each with its own Wiki Page. Without
  the API, creating and linking the presentation to a Wiki page would have to be an
  ugly manual process involving the dreaded cut and pasting of URL's.
wordpress_id: 34
wordpress_url: https://peterkellner.net/2006/09/18/pbwikiapi/
date: '2006-09-18 12:04:10 -0700'
date_gmt: '2006-09-18 19:04:10 -0700'
categories:
- Uncategorized
- ".Net 2.0"
- Wiki
tags: []
---
<h2>Abstract</h2>
<p>In this article we will demonstrate a technique used to automatically add Wiki Pages to <a href="http://pbwiki.com/">PBWiki</a> using    <br />the not quite released API provided by the peanut butter guys. The demonstration will involve integrating scheduled presentations at our <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp on October 7th and 8th</a> each with its own Wiki Page. Without the API, creating and linking the presentation to a Wiki page would have to be an ugly manual process involving the dreaded cut and pasting of URL's.</p>
<h2>Background</h2>
<p>So, to begin with, I'm an enterprise database kind of guy and to be frank, Wiki's scare me a little. The   <br />idea of adhoc data being deposited by anyone onto a page with no real structures just makes me nervous. My    <br />smart friends tell me I should embrace the chaos so I'm trusting them and going for it.</p>
<p> <!--more-->
<p>That being said, the specific problem we want to address with the Wiki is to allow presenters and presentees at   <br />our codecamp to be able to interact with each other before and after their presentations. My experience is that    <br />discussion groups don't work that well for this and though lotus notes may have, that doesn't seem to be much of an    <br />option these days (Where is Ray?). The now obvious solution is to attach a Wiki Page to each presentation on our web    <br />site and let users and presenters have at it. The problem is that this event is free and we don't have an army    <br />of staffers ready to add Wiki Pages each time someone submits a new presentation.</p>
<h2>PBWiki To The Rescue</h2>
<p>Turns out the guys at PBWiki are just about to release an API for their software. One of the functions of this API allows us   <br />to create a new Wiki Page simply by building a request with post data as our page. Just what we need. So, lets just go through the steps with some fancy pictures and arrows of how we built this integration. (OK, no arrows, just pictures).</p>
<p>First, lets take a look at how we've enhanced our web site. (OK, this is in beta so depending on how fast you are at reading this article, the web site might not be quite to production yet. You will need to use your imagination.)</p>
<p><img src="/wp/wp-content/uploads/2006/09/ccwebsite.jpg" /></p>
<p>Notice the <u>Wiki</u> hyperlink next to the Session Titles. When this hyperlink is pressed, an API call is generated to the PBWiki API calling the AddPage function. If the Wiki Page exists, it simply quietly fails. Then after that, a redirect is processed that takes the user directly to the new Wiki Page. First time, the Wiki page is created with all kinds of information about the session as well as any other information we might want to transfer over. Below is what the Wiki Page looks like on our CodeCamp Wiki.</p></p>
<h2>The Plumbing</h2>
<p>So, how did we do this? First, we got an <a href="http://api.pbwiki.com/">API key from PBWiki</a>. this is a huge 15 character or so alpha string that identifies your wiki so that when you use it, pages and such will be created on your wiki. Then, we had to write some code. Basically, the way the API works is that you build a request that looks something like this to add a page.</p>
<p><u>http://YOURWIKI.pbwiki.com/api/AddPage?apikey_v1=12345&amp;page=SomeNewPage&amp;name=Some%20Guy&amp;email=someone@example.org</u></p>
<p>Then, you add some post data to the request (or for small pages you can use the data parameter). Execute the request and your response is that status of the request. It's returned in JSON format. Hopefully, you have your page now.</p>
<p>After that, you simply issue a redirect to the newly create page.</p>
<p><u>http://YOURWIKI.pbwiki.com/SomeNewPage</u></p>
<p>Now, you are probably wondering, where is the .Net API for doing this? OK, I'll put some code below to satisfy that   <br />wonderment. Basically, I created a very small API (1 call, AddPage), and a simple aspx page to run it. Here it is, and good    <br />luck. Overtime, I'm sure I'll fill out the API and add real error checking and better return type stuff. But, for now, here it is.</p>
<p> 
<div style="border-bottom: #cccccc 1pt solid; border-left: #cccccc 1pt solid; padding-bottom: 1pt; padding-left: 1pt; width: 100%; padding-right: 1pt; font-family: courier new; background: #f5f5f5; color: black; font-size: 10pt; overflow: auto; border-top: #cccccc 1pt solid; border-right: #cccccc 1pt solid; padding-top: 1pt">
<pre style="margin: 0px"><span style="color: blue">using</span> System;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Data;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Configuration;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.Security;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.WebControls;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.WebControls.WebParts;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.HtmlControls;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Text;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Net;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Text.RegularExpressions;</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></pre>
<pre style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> An API for calling the PBWiki's API.&#160; This is all C# and .NET 2.0</span></pre>
<pre style="margin: 0px"><span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></pre>
<pre style="margin: 0px"><span style="color: blue">public</span>&#160; <span style="color: blue">class</span> <span style="color: teal">PBWikiAPI</span></pre>
<pre style="margin: 0px">{</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">static</span> <span style="color: blue">string</span> AddPage(<span style="color: blue">string</span> wikiURL,<span style="color: blue">string</span> apiKey,<span style="color: blue">string</span> page, <span style="color: blue">string</span> email, </pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> name, <span style="color: blue">string</span> postData)</pre>
<pre style="margin: 0px">&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> responseReturn = <span style="color: blue">string</span>.Empty;</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">try</span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> wikiPageName = <span style="color: teal">Regex</span>.Replace(page, <span style="color: maroon">@&quot;[^w@-]&quot;</span>, <span style="color: maroon">&quot;&quot;</span>);</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">if</span> (!<span style="color: teal">String</span>.IsNullOrEmpty(wikiPageName))</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> url = wikiURL + <span style="color: maroon">&quot;/api/AddPage?apikey_v1=&quot;</span> + apiKey</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; + <span style="color: maroon">&quot;&amp;page=&quot;</span> + wikiPageName</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; + <span style="color: maroon">&quot;&amp;name=&quot;</span> + <span style="color: maroon">&quot;AutoGenerator&quot;</span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; + <span style="color: maroon">&quot;&amp;email=&quot;</span> + email;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">Uri</span> ourUri = <span style="color: blue">new</span> <span style="color: teal">Uri</span>(url);</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// Create a 'WebRequest' object with the specified url. </span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">WebRequest</span> myWebRequest = <span style="color: teal">WebRequest</span>.Create(url);</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; myWebRequest.Method = <span style="color: maroon">&quot;POST&quot;</span>;</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">byte</span>[] bytes = System.Text.<span style="color: teal">Encoding</span>.ASCII.GetBytes(page);</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; myWebRequest.ContentLength = bytes.Length;</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.IO.<span style="color: teal">Stream</span> os = myWebRequest.GetRequestStream();</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; os.Write(bytes, 0, bytes.Length);</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; os.Close();</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// Send the 'WebRequest' and wait for response.</span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: teal">WebResponse</span> myWebResponse = myWebRequest.GetResponse();</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">if</span> (myWebResponse != <span style="color: blue">null</span>)</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.IO.<span style="color: teal">StreamReader</span> sr1 = <span style="color: blue">new</span> System.IO.<span style="color: teal">StreamReader</span>(myWebResponse.GetResponseStream());</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; responseReturn = sr1.ReadToEnd().Trim();</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: green">// Rel
ease resources of response object.</span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; myWebResponse.Close();</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">else</span></pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">throw</span> <span style="color: blue">new</span> <span style="color: teal">ApplicationException</span>(<span style="color: maroon">&quot;PBWikiAPI: no Page Name Specified&quot;</span>);</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">catch</span> (<span style="color: teal">Exception</span> ex)</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">throw</span> <span style="color: blue">new</span> <span style="color: teal">ApplicationException</span>(<span style="color: maroon">&quot;PBWikiAPI: &quot;</span> + ex.ToString());</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">return</span> responseReturn;</pre>
<pre style="margin: 0px">&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">}</pre>
</div>
<p></p>
<p>The Sample ASP.NET aspx Page that calls this</p>
<p></p>
<div style="border-bottom: #cccccc 1pt solid; border-left: #cccccc 1pt solid; padding-bottom: 1pt; padding-left: 1pt; width: 100%; padding-right: 1pt; font-family: courier new; background: #f5f5f5; color: black; font-size: 10pt; overflow: auto; border-top: #cccccc 1pt solid; border-right: #cccccc 1pt solid; padding-top: 1pt">
<pre style="margin: 0px"><span style="color: blue">using</span> System;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Data;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Configuration;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Collections;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.Security;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.WebControls;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.WebControls.WebParts;</pre>
<pre style="margin: 0px"><span style="color: blue">using</span> System.Web.UI.HtmlControls;</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px"><span style="color: blue">public</span> <span style="color: blue">partial</span> <span style="color: blue">class</span> <span style="color: teal">Default12</span> : System.Web.UI.<span style="color: teal">Page</span></pre>
<pre style="margin: 0px">{</pre>
<pre style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">protected</span> <span style="color: blue">void</span> Page_Load(<span style="color: blue">object</span> sender, <span style="color: teal">EventArgs</span> e)</pre>
<pre style="margin: 0px">&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;</pre>
<pre style="margin: 0px">&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">protected</span> <span style="color: blue">void</span> Button1_Click(<span style="color: blue">object</span> sender, <span style="color: teal">EventArgs</span> e)</pre>
<pre style="margin: 0px">&#160;&#160;&#160; {</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> str = <span style="color: teal">PBWikiAPI</span>.AddPage(<span style="color: maroon">&quot;http://codecamp.pbwiki.com&quot;</span>,</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: maroon">&quot;cd884b9f9d3034598340958435093405834&quot;</span>,</pre>
<pre style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: maroon">&quot;TestPageFromAPI&quot;</span>, <span style="color: maroon">&quot;email&quot;</span>, <span style="color: maroon">&quot;name&quot;</span>, <span style="color: maroon">&quot;PostDataHere&quot;</span>);</pre>
<pre style="margin: 0px">&#160;&#160;&#160; }</pre>
<pre style="margin: 0px">}</pre>
</div>
<p></p>
<h2>Conclusions</h2>
<p>This is very cool stuff. It opens up a huge area of how to synchronize (or somewhat synchronize) blog data and more structured<br />
  <br />data from things like databases (what a concept!). I'm sure as time goes on, I'll do much more sophisticated integration with</p>
<p>Wiki data then is shown here. I'm totally jazzed by this.</p>
<p>&#160;</p>
<h2>References</h2>
<p><a href="http://api.pbwiki.com/">http://api.pbwiki.com/</a></p>
<p><a href="http://pbwiki.com/">http://pbwiki.com/</a></p>
<p><a href="http://www.siliconvalley-codecamp.com/">http://www.siliconvalley-codecamp.com/</a></p>
