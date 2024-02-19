---
status: publish
published: true
pubDatetime: 2008-08-05T20:00:00.000Z
title: Assigning a DropDownList Value in a ASP.NET GridView Using ObjectDataSource
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 128
wordpress_url: https://peterkellner.net/2008/08/05/assign-dropdownlist-in-aspdotnet-to-gridview-in-objectdatasource/
date: '2008-08-05 16:57:14 -0700'
date_gmt: '2008-08-05 23:57:14 -0700'
categories:
- ASP.NET 3.5
- GridView
- ObjectDataSource
- web
tags: []
---
<p>As a moderator in the <a href="http://forums.asp.net/">asp.net forums</a>, I often see the same or similar questions.&nbsp; The answer to this question is pretty straight forward but not 100% obvious so I thought I'd do a post about in the hopes that with a couple key words, people will find the answer.&nbsp; The title basically says it all.&nbsp; We have a GridView that has a data column of type bool.&nbsp; We want to display in the GridView Yes or No depending on whether the data value is true or false.&nbsp; The example I'm showing does not help with making this an editable field (maybe a theme for another post if this one is popular) but simply shows yes or no.</p>
<p>The solution involves first dropping a <a href="http://msdn.microsoft.com/en-us/library/aa479339.aspx">GridView</a> and ObjectDataSource onto your design surface in Visual Studio.&nbsp; Then, using the little chevron on the GridView, choose edit columns and convert the column you are interested in making a <a href="http://www.w3schools.com/aspnet/control_dropdownlist.asp">DropDownList</a> into a template.&nbsp; From there replace the <a href="http://msdn.microsoft.com/en-us/library/aa479353.aspx">ItemTemplate</a> with the DropDownList code below.&nbsp; You get the code below.</p>
<p>&nbsp;</p>
<div class="csharpcode">
<pre class="alt"><span class="asp">&lt;%@ Page Language="C#" %&gt;</span></pre>
<pre>&nbsp;</pre>
<pre class="alt"><span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> <span class="kwrd">"-//W3C//DTD XHTML 1.0 Transitional//EN"</span> </pre>
<pre><span class="kwrd">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">&nbsp;</pre>
<pre><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span><span class="kwrd">="server"</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">&nbsp;</pre>
<pre><span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">&nbsp;</pre>
<pre><span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">="http://www.w3.org/1999/xhtml"</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">="server"</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>ODS DDL Example<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">="form1"</span> <span class="attr">runat</span><span class="kwrd">="server"</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">="ObjectDataSource1"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">SelectMethod</span><span class="kwrd">="GetMembers"</span></pre>
<pre>            <span class="attr">TypeName</span><span class="kwrd">="BusinessObject"</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:ObjectDataSource</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span><span class="kwrd">="GridView1"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">AutoGenerateColumns</span><span class="kwrd">="False"</span> <span class="attr">DataKeyNames</span><span class="kwrd">="Id"</span></pre>
<pre>            <span class="attr">DataSourceID</span><span class="kwrd">="ObjectDataSource1"</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span></pre>
<pre>                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">="Id"</span> <span class="attr">HeaderText</span><span class="kwrd">="Id"</span> <span class="attr">ReadOnly</span><span class="kwrd">="True"</span> <span class="attr">SortExpression</span><span class="kwrd">="Id"</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">="Name"</span> <span class="attr">HeaderText</span><span class="kwrd">="Name"</span> <span class="attr">SortExpression</span><span class="kwrd">="Name"</span> <span class="kwrd">/&gt;</span></pre>
<pre>                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">="Email"</span> <span class="attr">HeaderText</span><span class="kwrd">="Email"</span> <span class="attr">SortExpression</span><span class="kwrd">="Email"</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">asp:TemplateField</span> <span class="attr">HeaderText</span><span class="kwrd">="Approved"</span> <span class="attr">SortExpression</span><span class="kwrd">="Approved"</span><span class="kwrd">&gt;</span></pre>
<pre>                    <span class="kwrd">&lt;</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                        <span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span><span class="kwrd">="DropDownListUser"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">AutoPostBack</span><span class="kwrd">="False"</span> </pre>
<pre>                            <span class="attr">SelectedValue</span><span class="kwrd">='&lt;%# Bind("Approved") %&gt;'</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                            <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span> <span class="attr">Text</span><span class="kwrd">="Yes"</span> <span class="attr">Value</span><span class="kwrd">="True"</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span></pre>
<pre>                            <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span> <span class="attr">Text</span><span class="kwrd">="No"</span> <span class="attr">Value</span><span class="kwrd">="False"</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                        <span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;</span></pre>
<pre>                    <span class="kwrd">&lt;/</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                <span class="kwrd">&lt;/</span><span class="html">asp:TemplateField</span><span class="kwrd">&gt;</span></pre>
<pre>            <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre class="
alt"><span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
</div>
<style type="text/css">.csharpcode, .csharpcode pre<br />
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
</style>
<p>&nbsp;</p>
<p>And, when you run this code (assuming you have a simple business object that returns some data), you get this:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2008/08/x1.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="92" alt="x" src="/wp/wp-content/uploads/2008/08/x-thumb1.png" width="314" border="0"/></a> </p>
<p>Hope this helps!</p>
