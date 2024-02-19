---
status: publish
published: true
pubDatetime: 2006-08-30T20:00:00.000Z
title: Fast Access to Small Lists On ASPX Pages in ASP.NET 2.0
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: How to reference small lists of data on an aspx page in asp.net 2.0.  The
  proposed solution here demonstrates a technique taking advantage of the ObjectDataSource's
  Cache, DropDownLists and Data Dictionaries.  (not to mention a little databinding)
wordpress_id: 30
wordpress_url: https://peterkellner.net/2006/08/30/smalllistaccess/
date: '2006-08-30 07:13:05 -0700'
date_gmt: '2006-08-30 14:13:05 -0700'
categories:
- ".Net 2.0"
- ASP.NET 2.0
tags: []
---
<p align="left">Most data driven web sites have to manage lots of small lists. Examples include things like states, countries, levels, and even things like sex where you may only have two choices. (especially if you have internationalization issues). The simplest way to store this information is in static lists simply defined programatically. Below is an example of this.</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">string</span>[] MonthNames =
   <span class="kwrd">new</span> <span class="kwrd">string</span>[] { “January”,“February”,“March”,
       “April”,“May”,“June”,“July”,
       “August”,“September”,“October”,“November”,“December”};</pre>
<p align="left">&#160;</p>
<p align="left">This works, but requires you modify your code in order to update a list. Not good in my opinion.</p>
<p><!--more--></p>
<p align="left">So, the other solution is to store the information in a database table. Many people will say that's overkill, but as long as you Cache the information, performance will not suffer and you gain lots of flexability.</p>
<h2>&#160;</h2>
<h2>How to Cache Lists in a Database</h2>
<h3>Cache the List</h3>
<p>To cache the list I suggest using an ObjectDataSource with Cache set and a DropDownList server control to force the retrieval of the list on page load (looking for suggestions on how better to load the list). Below is some typical code I use to do this from an aspx page.</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span>=”<span class="attr">ObjectDataSource1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”
  <span class="attr">CacheDuration</span>=”<span class="attr">30</span>″ <span class="attr">EnableCaching</span>=”<span class="attr">True</span>”
  <span class="attr">SelectMethod</span>=”<span class="attr">GetData</span>”
  <span class="attr">TypeName</span>=”<span class="attr">DataSetLevelsTableAdapters</span>.<span class="attr">SessionLevelsTableAdapter</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp:ObjectDataSource</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span>=”<span class="attr">DropDownList1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”
 <span class="attr">DataSourceID</span>=”<span class="attr">ObjectDataSourceLevels</span>” <span class="attr">DataTextField</span>=”<span class="attr">description</span>”
 <span class="attr">DataValueField</span>=”<span class="attr">id</span>” <span class="attr">Visible</span>=”<span class="attr">False</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>The DataSource TypeName is simply a typed dataset which retrieves a resultset with a primary key and a description.</p>
<h3>Use the Cached List on an ASPX Page</h3>
<p>To use the cache list on the page, I first store what is in the DropDownList into a Dictionary which I can later reference on the page. Here is what I do in the Page_Load event.</p>
<p>
<pre class="csharpcode">
<span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> Sessions : System.Web.UI.Page
{
    <span class="kwrd">protected</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt; SessionLevelsDictionary;
 
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
    {
 
        <span class="rem">// get from Cache on load se we can use in page</span>
        DropDownListLevels.DataBind();
        SessionLevelsDictionary =
            <span class="kwrd">new</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt;(DropDownListLevels.Items.Count);
 
        <span class="kwrd">foreach</span> (ListItem listItem <span class="kwrd">in</span> DropDownListLevels.Items)
        {
            SessionLevelsDictionary.Add
                (Convert.ToInt32(listItem.Value), listItem.Text);
        }
</pre>
<p></p>
<p>Now, I have in the page class a reference to all the values I may want to use on the page. Say, for example I have a Repeater control that is going to display 200 rows of data that includes a foreign key to one of my small list tables. I want to show the data in a Label control but don't want to have any codebehind to set the data. Here is how I can access my dictionary to perform this trick.</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span>  Sessions : System.Web.UI.Page
{
    <span class="kwrd">protected</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt; SessionLevelsDictionary;
 
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
    {
        <span class="rem">// get from Cache on load se we can use in page</span>
        DropDownListLevels.DataBind();
        SessionLevelsDictionary =

        <span class="kwrd">new</span> Dictionary&lt;<span class="kwrd">int</span>, <span class="kwrd">string</span>&gt;(DropDownListLevels.Items.Count);
 
        <span class="kwrd">foreach</span> (ListItem listItem <span class="kwrd">in</span> DropDownListLevels.Items)
        {
            SessionLevelsDictionary.Add
                (Convert.ToInt32(listItem.Value), listItem.Text);
        }</pre>
<p>Now, I have in the page class a reference to all the values I may want to use on the page. Say, for example I have a Repeater control that is going to display 200 rows of data that includes a foreign key to one of my small list tables. I want to show the data in a Label control but don’t want to have any codebehind to set the data. Here is how I can access my dictionary to perform this trick.</p>
<pre class="csharpcode">
<span class="kwrd">&lt;</span><span class="html">asp:Label</span> <span class="attr">ID</span><span class="kwrd">="Label4"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">Width</span><span class="kwrd">="90"</span>
 <span class="attr">Text</span>=’&<span class="attr">lt</span>;%# (<span class="attr">string</span>) <span class="attr">SessionLevelsDictionary</span>[(<span class="attr">int</span>) <span class="attr">Eval</span>(<span class="kwrd">"SessionLevel_id"</span>)] %&<span class="attr">gt</span>;‘<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp:Label</span><span class="kwrd">&gt;</span>
</pre>
<p>I'm still looking for a better way to do this. If anyone has any ideas, please add them in the comments below.</p>
