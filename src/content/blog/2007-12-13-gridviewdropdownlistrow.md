---
status: publish
published: true
pubDatetime: 2007-12-13T20:00:00.000Z
title: Why can I not Bind to a value on a DropDownList in a GridView with ASP.NET
  2.0 or 3.5?
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>Learn how to bind a DropDownList in an asp.net 2.0/3.5 GridView Edit
  Row.  This will show you how to get the data back to the database and learn why
  Bind does not help you (hint:  SelectedValue is not our friend here).</p>"
wordpress_id: 90
wordpress_url: https://peterkellner.net/2007/12/13/gridviewdropdownlistrow/
date: '2007-12-13 17:26:44 -0800'
date_gmt: '2007-12-14 00:26:44 -0800'
categories:
- ASP.NET 3.5
- How Things Work
- ASP.NET 2.0
tags: []
---
<p>So, I guess I should have know the answer to why the following does not work.&nbsp; Basically, the scenario I have is that I have a foreign key column in my GridView that I want to show as a DropDownList of values.&nbsp; The code below shows me the values in the DropDownList, but when I update it with the "edit" of the GridView row, the value does not get saved.&nbsp; Here is the code and what it looks like running:</p>
<p> <!--more-->
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:TemplateField</span> <span class="attr">HeaderText</span><span class="kwrd">="TemplateUsersId"</span> <span class="attr">SortExpression</span><span class="kwrd">="TemplateUsersId"</span><span class="kwrd">&gt;</span>      <span class="kwrd">&lt;</span><span class="html">EditItemTemplate</span><span class="kwrd">&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">       <span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span><span class="kwrd">="DropDownListUser"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">AutoPostBack</span><span class="kwrd">="False"</span> <span class="attr">DataSourceID</span><span class="kwrd">="SqlDataSourceUser"</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">            <span class="attr">DataTextField</span><span class="kwrd">="Username"</span> <span class="attr">DataValueField</span><span class="kwrd">="id"</span> <span class="attr">SelectedValue</span><span class="kwrd">='&lt;%# Bind("TemplateUsersId") %&gt;'</span><span class="kwrd">&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">         <span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">         ..</pre>
</div>
<p>Notice that even though I'm using Bind rather than eval, the value does not stick.&nbsp; Well, we always have a reason so I believe it is not working because SelectedValue only has a Get (it's read only) and the value can not be put back.&nbsp; So, the solution that works for me is to program the GridView's Updating Row Event.&nbsp; That is, get the value from the dropdownlist, and set it in the event.&nbsp; Here is the code that is working for me.</p>
<div class="csharpcode">
<pre class="alt"> <span class="rem">/// &lt;summary&gt;    /// This Code Gets the value of the DropDownList in the EditItemTemplate.</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">    <span class="rem">/// &lt;/summary&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">    <span class="rem">/// &lt;param name="sender"&gt;&lt;/param&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">    <span class="rem">/// &lt;param name="e"&gt;&lt;/param&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt">    <span class="kwrd">protected</span> <span class="kwrd">void</span> GridViewIncomingUrls_RowUpdating(<span class="kwrd">object</span> sender, GridViewUpdateEventArgs e)</pre>
<pre>&nbsp;</pre>
<pre class="alt">    {</pre>
<pre>&nbsp;</pre>
<pre class="alt">        DropDownList dropDownListUser = GridViewIncomingUrls.Rows[e.RowIndex].FindControl(<span class="str">"DropDownListUser"</span>) <span class="kwrd">as</span> DropDownList;</pre>
<pre>&nbsp;</pre>
<pre class="alt">        e.NewValues[<span class="str">"TemplateUsersId"</span>] = dropDownListUser.SelectedValue;</pre>
<pre>&nbsp;</pre>
<pre class="alt">    }</pre>
</div>
<p>Yee Ha! it works. Hope you don't have to suffer like me and just bump into this solution</p>
