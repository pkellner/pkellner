---
status: publish
published: true
pubDatetime: 2013-03-13T20:00:00.000Z
title: Using Sencha ExtJS 4.2 and Sencha Architect 2.2, Build a Simple REST client
  (to feed WebAPI server)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3511
wordpress_url: https://peterkellner.net/?p=3511
date: '2013-03-13 10:07:09 -0700'
date_gmt: '2013-03-13 17:07:09 -0700'
categories:
- Sencha
- Sencha Architect 2
- ExtJS
- WebAPI
tags: []
---
<h2>Three Part Series</h2>
<h3>(Part 2)</h3>
<p>&#160;</p>
<table cellspacing="20" cellpadding="2" width="400" border="1">
<tbody>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/building-a-simple-rest-controller-with-microsoft-visual-studio-2012-and-webapi/">Building a Simple REST Controller with Microsoft Visual Studio 2012 and WebAPI</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-and-sencha-architect-2-2-build-a-simple-rest-client-to-feed-webapi-server/">Using Sencha ExtJS 4.2 and Sencha Architect 2.2, Build a Simple REST client (to feed WebAPI server)</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-sencha-architect-2-2-add-crud-to-rest-client-for-calling-microsoft-webapi-server/">Add CRUD to REST client for calling Microsoft WebAPI server</a></td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>Our goal here is to create a very simple <a href="http://www.sencha.com/products/extjs/">ExtJS</a> grid panel that works with the Microsoft Visual Studio 2012 <a href="http://www.asp.net/web-api">WebAPI</a> project build in the previous post.</p>
<p>So, first thing to do is fire up <a href="http://www.sencha.com/products/architect/">Sencha Architect 2.2</a> (SA 2.2).&#160; Choose for the project type ExtJS 4.2 and you will get a blank canvas.&#160; Drag a Viewport on to the canvas, then, in the Viewport drag a Grid Panel out.&#160; You should have something like this:</p>
<p><a href="/wp/wp-content/uploads/2013/03/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb2.png" width="409" height="296" /></a> </p>
<p>Next thing is to create a “Model”.&#160; In my case, the model will be simple 4 fields.&#160; A primary key and three others as follows:</p>
<ol>
<li>id </li>
<li>sessionId </li>
<li>tagName </li>
<li>taggedInSession </li>
</ol>
<p>In SA, I add this by dropping a model into the project inspector, renaming it TagsModel, adding the four fields by clicking “+” on the fields config in the properties editor of the model (or config as SA calls it), then entering the 4 properties separated by commas into that textbox as follows (then clicking “Finish”).</p>
<p><a href="/wp/wp-content/uploads/2013/03/image5.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb3.png" width="335" height="469" /></a> </p>
<p>The code it produces looks like this:</p>
<p><a href="/wp/wp-content/uploads/2013/03/image6.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb4.png" width="353" height="273" /></a> </p>
<p>Now, we create an ExtJS Store and associate the above model with the store.&#160; We will call the store TagsStore.&#160; Next, we want to add a simple REST proxy to the store.&#160; That is our simplest proxy IMHO.&#160; We then assoicate a URL with the REST proxy.&#160; Because we want this to work with the WebAPI server proxy we built on our previous post, the url will be /api/TagsRest.&#160; Once we do that, our store and project inspector look like this</p>
<p><a href="/wp/wp-content/uploads/2013/03/image7.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb5.png" width="371" height="254" /></a> </p>
<p>Now that we have our store built (TagsStore) we want to associate it with the ExtJS grid panel we built earlier in this post.&#160; </p>
<p><a href="/wp/wp-content/uploads/2013/03/image8.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb6.png" width="401" height="306" /></a> </p>
<p>We can execute the “auto column” feature and it will generate the appropriate columns for us as follows</p>
<p><a href="/wp/wp-content/uploads/2013/03/image9.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb7.png" width="270" height="330" /></a> </p>
<p>and we now have our grid the way we want it.&#160; I add a “flex” parameter to the TagName so that column automatically fills all available space, and here is what we now have.</p>
<p><a href="/wp/wp-content/uploads/2013/03/image10.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb8.png" width="331" height="228" /></a> </p>
<p>And the code for the grid panel</p>
<p><a href="/wp/wp-content/uploads/2013/03/image11.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb9.png" width="346" height="431" /></a> </p>
<p>Now, when I run the project, I get an empty grid panel (but with the correct columns).&#160;&#160; Notice also in my chrome developer tools that you can see the GET request generated for this REST client call (I did go back and set the store to autoload = true because I forgot that when I created the store, sorry about that).</p>
<p><a href="/wp/wp-content/uploads/2013/03/image12.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb10.png" width="430" height="261" /></a></p>
<p>&#160;</p>
<p>I did say this post was just about the client, but just so we get some data, let me slightly modify my WebAPI server class in <a href="http://www.microsoft.com/visualstudio/eng/products/visual-studio-overview">Visual Studio</a> (as follows below) to add some real data.&#160; All I’m doing is instead of returning a list of strings, I’m returning a List of TagItems as follows.&#160; You can imagine this would normally come from a database.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/03/image13.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb11.png" width="453" height="237" /></a> </p>
<p>and now, you can see that when we run our ExtJS project, we get real data.</p>
<p><a href="/wp/wp-content/uploads/2013/03/image14.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb12.png" width="463" height="417" /></a></p>
