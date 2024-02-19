---
status: publish
published: true
pubDatetime: 2006-10-27T20:00:00.000Z
title: Improved Fast Access to Small Lists On ASPX Pages
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: 'The article below has a minor improvement to the previous article listed
  on this web site. Specifically, the previous article used the DropDownList as a
  mechanism to actually retrieve the data for the purposes of storing it in a local
  Dictionary. This article simply calls the ObjectDataSource directly to retrieve
  an IEnumerable type and iterates over that. Below is article with the updates.  (Original
  Article is: <a href="/2006/08/30/smalllistaccess/">https://peterkellner.net/2006/08/30/smalllistaccess/</a>)'
wordpress_id: 39
wordpress_url: https://peterkellner.net/2006/10/27/smalllistaccessimproved/
date: '2006-10-27 12:34:42 -0700'
date_gmt: '2006-10-27 19:34:42 -0700'
categories:
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<p align="left">The article below has a minor improvement to the previous article listed on this web site. Specifically, the previous article used the DropDownList as a mechanism to actually retrieve the data for the purposes of storing it in a local Dictionary. This article simply calls the ObjectDataSource directly to retrieve an IEnumerable type and iterates over that. Below is article with the updates. (Original Article is: <a href="/2006/08/30/smalllistaccess/">https://peterkellner.net/2006/08/30/smalllistaccess/</a>)</p>
<p align="left">Most data driven web sites have to manage lots of small lists. Examples include things like states, countries, levels, and even things like sex where you may only have two choices. (especially if you have internationalization issues). The simplest way to store this information is in static lists simply defined programatically. Below is an example of this.</p>
<p> <!--more-->
<div class="csharpcode">
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">string</span>[] MonthNames =</pre>
<pre>   <span class="kwrd">new</span> <span class="kwrd">string</span>[] { “January”,“February”,“March”,</pre>
<pre class="alt">       “April”,“May”,“June”,“July”,</pre>
<pre>       “August”,“September”,“October”,“November”,“December”};</pre>
</div>
<p align="left">This works, but requires you modify your code in order to update a list. Not good in my opinion.</p>
<p align="left">So, the other solution is to store the information in a database table. Many people will say that's overkill, but as long as you Cache the information, performance will not suffer and you gain lots of flexability.</p>
<h2>How to Cache Lists in a Database</h2>
<h3>Cache the List</h3>
<p>To cache the list I suggest using an ObjectDataSource with Cache set and then force a load of the ObjectDataSource by calling the Select Method, then using the IEnumerable type, iterate over the ObjectDataSource's assigned type.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span>=”<span class="attr">ObjectDataSource1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”</pre>
<pre>  <span class="attr">CacheDuration</span>=”<span class="attr">30</span>″ <span class="attr">EnableCaching</span>=”<span class="attr">True</span>”</pre>
<pre class="alt">  <span class="attr">SelectMethod</span>=”<span class="attr">GetData</span>”</pre>
<pre>  <span class="attr">TypeName</span>=”<span class="attr">DataSetLevelsTableAdapters</span>.<span class="attr">SessionLevelsTableAdapter</span>”<span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">asp:ObjectDataSource</span><span class="kwrd">&gt;</span></pre>
</div>
<p>The DataSource TypeName is simply a typed dataset which retrieves a resultset with a primary key and a description.</p>
<h3>Use the Cached List on an ASPX Page</h3>
<p>To use the cache list on the page, I first store what is in the DropDownList into a Dictionary which I can later reference on the page. Here is what I do in the Page_Load event.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">partial</span>  <span class="kwrd">class</span> Sessions : System.Web.UI.Page</pre>
<pre>{</pre>
<pre class="alt">   <span class="kwrd">protected</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt; SessionLevelsDictionary;</pre>
<pre>   <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<pre class="alt">   {</pre>
<pre>      SessionLevelsDictionary =</pre>
<pre class="alt">         <span class="kwrd">new</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt;();</pre>
<pre>         IEnumerable someData = ObjectDataSource1.Select();</pre>
<pre class="alt">         <span class="kwrd">foreach</span> (StuffData stuffData <span class="kwrd">in</span> someData)</pre>
<pre>         {</pre>
<pre class="alt">            SessionLevelsDictionary.Add</pre>
<pre>            (stuffData.Id,stuffData.Name);</pre>
<pre class="alt">         }</pre>
</div>
<p>Now, I have in the page class a reference to all the values I may want to use on the page. Say, for example I have a Repeater control that is going to display 200 rows of data that includes a foreign key to one of my small list tables. I want to show the data in a Label control but don't want to have any codebehind to set the data. Here is how I can access my dictionary to perform this trick.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:Label</span> <span class="attr">ID</span>=”<span class="attr">Label4</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">Width</span>=”<span class="attr">90</span>″</pre>
<pre> <span class="attr">Text</span>=’&amp;<span class="attr">lt</span>;%# (<span class="attr">string</span>) <span class="attr">SessionLevelsDictionary</span>[(<span class="attr">int</span>) <span class="attr">Eval</span>(<span class="kwrd">&quot;SessionLevel_id&quot;</span>)] %&amp;<span class="attr">gt</span>;‘<span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">asp:Label</span><span class="kwrd">&gt;</span></pre>
</div>
