---
status: publish
published: true
pubDatetime: 2007-08-12T20:00:00.000Z
title: Logging From an ASP.NET 2.0 Application to a Local File
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br />In this article, a very simple method is demonstrated for logging
  text data in an asp.net 2.0 application.  It's safe, reliable, but not very elegant.
  \ Just what you need when you want to crank something out for testing or proof of
  concept.  It uses StreamWriter and MapPath to get it's job done."
wordpress_id: 72
wordpress_url: https://peterkellner.net/2007/08/12/aspnetsimplelogging/
date: '2007-08-12 17:54:36 -0700'
date_gmt: '2007-08-13 00:54:36 -0700'
categories:
- ".Net 2.0"
- ASP.NET 2.0
tags: []
---
<p><strong>(User MapPath and FileStream Together)</strong></p>
<p>A very common scenario we often run into is we need to log some information to a local text file on the web server.&#160; We know we can use all the health monitoring capabilities built in to asp.net for reasons like performance,   <br />standards, best practices, etc., but sometimes, you just want to log something right now and you don't want to spend a lot of time.</p>
<p> <!--more-->
<p>So, Here is a very very simple version that does that and is 100% reliable.&#160; Basically, say you wanted to simply log the useragent from a request to a file called ~/App_Data/UserAgents.txt.&#160; Here is some simple code to do that.</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 1</span>&#160;<span style="color: blue">using</span> System;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 2</span>&#160;<span style="color: blue">using</span> System.Data;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 3</span>&#160;<span style="color: blue">using</span> System.Configuration;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 4</span>&#160;<span style="color: blue">using</span> System.Collections;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 5</span>&#160;<span style="color: blue">using</span> System.Web;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 6</span>&#160;<span style="color: blue">using</span> System.Web.Security;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 7</span>&#160;<span style="color: blue">using</span> System.Web.UI;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 8</span>&#160;<span style="color: blue">using</span> System.Web.UI.WebControls;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160;&#160; 9</span>&#160;<span style="color: blue">using</span> System.Web.UI.WebControls.WebParts;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 10</span>&#160;<span style="color: blue">using</span> System.Web.UI.HtmlControls;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 11</span>&#160;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 12</span>&#160;<span style="color: blue">public</span> <span style="color: blue">partial</span> <span style="color: blue">class</span> <span style="color: #2b91af">Default2</span> : System.Web.UI.<span style="color: #2b91af">Page</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 13</span> {</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 14</span>&#160;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 15</span>&#160;&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">static</span> <span style="color: #2b91af">Object</span> synchronizeVariable = <span style="color: #a31515">&quot;locking&quot;</span>;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 16</span>&#160;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 17</span>&#160;&#160;&#160;&#160; <span style="color: blue">protected</span> <span style="color: blue">void</span> Page_Load(<span style="color: blue">object</span> sender, <span style="color: #2b91af">EventArgs</span> e)</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 18</span>&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 19</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #2b91af">String</span> fileName = Context.Server.MapPath(<span style="color: #a31515">&quot;~&quot;</span>) +</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 20</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #a31515">&quot;\\App_Data\\UserAgents.txt&quot;</span>;</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 21</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">lock</span> (synchronizeVariable)</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 22</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 23</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; StreamWriter sw = <span style="color: blue">new</span> StreamWriter(fileName, <span style="color: blue">true</span>);</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 24</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; sw.WriteLine(<span style="color: #2b91af">DateTime</span>.Now);</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 25</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; sw.WriteLine(Request.UserAgent);</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 26</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; sw.Close();</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 27</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 28</span>&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 29</span> }</p>
</p></div>
<p>Just to be safe, we added a lock around the file write code.&#160; This way, if two processes come in at the same time, they will both write out correctly. Again, this is very crude, not very efficient or elegant, but very clean and   <br />reliable.&#160; Just don't mention you got it from me!</p>
