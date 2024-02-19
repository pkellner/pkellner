---
status: publish
published: true
pubDatetime: 2011-08-01T20:00:00.000Z
title: With ASP.NET WebForms, How to Keep / Stop a Data Control Like GridView From
  Retrieving Data
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1529
wordpress_url: https://peterkellner.net/2011/08/01/with-asp-net-webforms-how-to-keep-stop-a-data-control-like-gridview-from-retrieving-data/
date: '2011-08-01 14:35:00 -0700'
date_gmt: '2011-08-01 21:35:00 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- C#
- ObjectDataSource
- ASP.NET 4.0
- WebForms
tags: []
---
<h2>The What and Where</h2>
<p>Something that may not be obvious is if are creating an asp.net <a href="http://msdn.microsoft.com/en-us/library/ms973868.aspx">WebForms</a> project and you put a datasource such as <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.sqldatasource.aspx">SqlDataSource</a> or <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.objectdatasource.aspx">ObjectDataSource</a> for example on the page, how can you prevent the SqlSelect associated with that datasource from being triggered.</p>
<p>The answer is to set the control’s visible property to false.&#160; That’s it!</p>
<p>  <!--more-->
<p>&#160;</p>
<h2>The Why</h2>
<p>The reason you might want to do this is for a case where you have a public facing web page that might be easily subjected to a denial of service attach.&#160; If that web page is always causing some SqlDataSource to fire, you could easily find your <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">SqlServer</a> overloaded.&#160; At least by checking to see a user is logged in before firing the sql statement, you buy yourself a little bit of protection.</p>
<p>&#160;</p>
<h2>The Code</h2>
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=&quot;C#&quot; %&gt;</span>

<span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> <span class="kwrd">&quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;</span> 
<span class="kwrd">&quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>

    <span class="kwrd">protected</span> <span class="kwrd">void</span> 
        GridView1_SelectedIndexChanged(<span class="kwrd">object</span> sender, EventArgs e)
    {

    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Init(<span class="kwrd">object</span> sender, EventArgs e)
    {
        <span class="kwrd">if</span> (!Context.User.Identity.IsAuthenticated)
        {
            GridView1.Visible = <span class="kwrd">false</span>;
        }
    }
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;SqlDataSource1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> 
            <span class="attr">ConnectionString</span><span class="kwrd">=&quot;&lt;%$ ConnectionStrings:CodeCampSV06 %&gt;&quot;</span> 
            <span class="attr">SelectCommand</span>=
            <span class="kwrd">&quot;SELECT [Id], [Username], [Email] FROM [Attendees] ORDER BY [Id] DESC&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span><span class="kwrd">=&quot;GridView1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoGenerateColumns</span><span class="kwrd">=&quot;False&quot;</span> 
            <span class="attr">DataKeyNames</span><span class="kwrd">=&quot;Id&quot;</span> <span class="attr">DataSourceID</span><span class="kwrd">=&quot;SqlDataSource1&quot;</span> 
            <span class="attr">onselectedindexchanged</span><span class="kwrd">=&quot;GridView1_SelectedIndexChanged&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Id&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Id&quot;</span> <span class="attr">InsertVisible</span><span class="kwrd">=&quot;False&quot;</span> 
                    <span class="attr">ReadOnly</span><span class="kwrd">=&quot;True&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;Id&quot;</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Username&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Username&quot;</span> 
                    <span class="attr">SortExpression</span><span class="kwrd">=&quot;Username&quot;</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Email&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Email&quot;</span> 
                <span class="attr">SortExpression</span><span class="kwrd">=&quot;Email&quot;</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
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
.csharpcode .lnum { color: #606060; }</style>
