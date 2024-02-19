---
status: publish
published: true
pubDatetime: 2006-12-07T20:00:00.000Z
title: Have GridView Highlight Last Inserted Record in ASP.NET 2.0
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: A question that frequently comes up in the asp.net forums is how to have
  a gridview show the the last record added highlighted. This articles gives a technique
  for doing this. It only works with SqlServer but could could be modified for other
  databases.
wordpress_id: 43
wordpress_url: https://peterkellner.net/2006/12/07/gridviewhighlightlastinsertedrow/
date: '2006-12-07 16:41:04 -0800'
date_gmt: '2006-12-07 23:41:04 -0800'
categories:
- Uncategorized
- ".Net 2.0"
- Membership
- ASP.NET 2.0
tags: []
---
<h2>Introduction</h2>
<p>A question that frequently comes up in the asp.net forums is how to have a gridview show the the last record added highlighted. This articles gives a technique for doing this. It only works with SqlServer but could could be modified for other databases. </p>
<h2>What It Looks Like Running</h2>
<p>After pressing the insert button on the screen shot below, the bottom line was actually added and it is automatically highlighted. This is in a nutshell, what the code listed below and this article discusses.</p>
<p> <!--more-->
<p><img src="/wp/wp-content/uploads/2006/12/GridViewInsertHighlight.jpg" width="409" height="625" /></p>
<h2>The Code</h2>
<p>In order to run the code below, you must first set up Membership. The simplest way to do this is to simply add to your web.config a very small section enabling RoleManager. This will automatically create the membership database in sqlexpress. You should probably add a couple users just so your gridview is not empty from the start. The code you need to add to an empty asp.net 2.0 web site project is as follows (put it in the &lt;System.Web&gt; section).</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px"><span style="color: blue">&lt;</span><span style="color: #a31515">roleManager</span><span style="color: blue"> </span><span style="color: red">enabled</span><span style="color: blue">=</span>&quot;<span style="color: blue">true</span>&quot;<span style="color: blue">&gt;&lt;/</span><span style="color: #a31515">roleManager</span><span style="color: blue">&gt;</span> </p>
</p></div>
<p>Once you have done that, you can copy the code below to a new web page and simply run it.</p>
<p>Briefly, the way the code works is that when a row is inserted into the database the sqldatasource's Inserted event is called. In this event, we take a look at the return parameter which comes from the sql:</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px"><span style="color: red">InsertCommand</span><span style="color: blue">=&quot;INSERT INTO [Names] ([name]) VALUES (@name);SELECT @NewID = Scope_Identity()&quot;</span></p>
</p></div>
<p>NewId is actually a return parameter, so we can get that back in the inserted event. Once we get the value back, we store it in viewstate so that on the upcoming page_prerender, we can check and see which row has that id in it, and then highlight that row. The reason we do it in prerender and not load is because the inserted event is processed after load and it would not work if we put it there.</p>
<p>So, here is the code! Good luck.</p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=”C#” %&gt;</span>

<span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> “<span class="attr">-</span>//<span class="attr">W3C</span>//<span class="attr">DTD</span> <span class="attr">XHTML</span> <span class="attr">1</span>.<span class="attr">0</span> <span class="attr">Transitional</span>//<span class="attr">EN</span>” “<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">TR</span>/<span class="attr">xhtml1</span>/<span class="attr">DTD</span>/<span class="attr">xhtml1-transitional</span>.<span class="attr">dtd</span>”<span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>

    <span class="rem">// simple table named: Names. Two columns:  id int, name varchar(64)</span>

    <span class="kwrd">protected</span> <span class="kwrd">void</span> ButtonInsert_Click(<span class="kwrd">object</span> sender, EventArgs e)
    {      
        SqlDataSource1.InsertParameters[<span class="str">&quot;name&quot;</span>].DefaultValue = DateTime.Now.ToString();
        <span class="kwrd">int</span> numInserted = SqlDataSource1.Insert();
        GridView1.DataBind();
    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> SqlDataSource1_Inserted(<span class="kwrd">object</span> sender, SqlDataSourceStatusEventArgs e)
    {
        <span class="kwrd">object</span> newId = e.Command.Parameters[<span class="str">&quot;@NewId&quot;</span>].Value;
        ViewState[<span class="str">&quot;NewId&quot;</span>] = Convert.ToInt32(newId);
    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_PreRender(<span class="kwrd">object</span> sender, EventArgs e)
    {
        <span class="kwrd">string</span> newIdLast = <span class="kwrd">string</span>.Empty;
        <span class="kwrd">if</span> (ViewState[<span class="str">&quot;NewId&quot;</span>] != <span class="kwrd">null</span>)
        {
            <span class="kwrd">int</span> newId = (<span class="kwrd">int</span>)ViewState[<span class="str">&quot;NewId&quot;</span>];
            newIdLast = newId.ToString();
            <span class="kwrd">int</span> rowCnt = 0;
            <span class="kwrd">foreach</span> (GridViewRow row <span class="kwrd">in</span> GridView1.Rows)
            {
               <span class="kwrd">string</span> newIdText = row.Cells[1].Text;
                <span class="kwrd">if</span> (newIdText.Equals(newIdLast))
                {
                    <span class="rem">//GridView1.EditIndex = rowCnt;</span>
                    <span class="rem">//GridView1.SelectedIndex = rowCnt;</span>
                    row.Attributes.Add(“bgcolor”, “Gray”);
                    <span class="kwrd">break</span>;
                }
                rowCnt++;
            }
        }
    }
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">1999</span>/<span class="attr">xhtml</span>” <span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">id</span>=”<span class="attr">Head1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Untitled Page<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span>=”<span class="attr">form1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">h2</span><span class="kwrd">&gt;</span>Example of GridView that shows highlighted last inserted row<span class="kwrd">&lt;/</span><span class="html">h2</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span>=”<span class="attr">GridView1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">AutoGenerateColumns</span>=”<span class="attr">False</span>” <span class="attr">DataKeyNames</span>=”<span class="attr">id</span>” <span class="attr">DataSourceID</span>=”<span class="attr">SqlDataSource1</span>? <span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:CommandField</span> <span class="attr">ShowEditButton</span>=”<span class="attr">True</span>” <span class="attr">ShowDeleteButton</span>=”<span class="attr">True</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">id</span>” <span class="attr">HeaderText</span>=”<span class="attr">id</span>” <span class="attr">InsertVisible</span>=”<span class="attr">False</span>” <span class="attr">ReadOnly</span>=”<span class="attr">True</span>”
                    <span class="attr">SortExpression</span>=”<span class="attr">id</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">name</span>” <span class="attr">HeaderText</span>=”<span class="attr">name</span>” <span class="attr">SortExpression</span>=”<span class="attr">name</span>” <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span>=”<span class="attr">SqlDataSource1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ConnectionString</span>=”&amp;<span class="attr">lt</span>;%$ <span class="attr">ConnectionStrings:ConnectionString</span> %&amp;<span class="attr">gt</span>;“
          <span class="attr">DeleteCommand</span>=”<span class="attr">DELETE</span> <span class="attr">FROM</span> [<span class="attr">Names</span>] <span class="attr">WHERE</span> [<span class="attr">id</span>] = @<span class="attr">id</span>”
          <span class="attr">InsertCommand</span>=”<span class="attr">INSERT</span> <span class="attr">INTO</span> [<span class="attr">Names</span>] ([<span class="attr">name</span>]) <span class="attr">VALUES</span> (@<span class="attr">name</span>);<span class="attr">SELECT</span> @<span class="attr">NewID</span> = <span class="attr">Scope_Identity</span>()”

          <span class="attr">SelectCommand</span>=”<span class="attr">SELECT</span> [<span class="attr">id</span>], [<span class="attr">name</span>] <span class="attr">FROM</span> [<span class="attr">Names</span>]“ <span class="attr">UpdateCommand</span>=”<span class="attr">UPDATE</span> [<span class="attr">Names</span>] <span class="attr">SET</span> [<span class="attr">name</span>] = @<span class="attr">name</span> <span class="attr">WHERE</span> [<span class="attr">id</span>] = @<span class="attr">id</span>” <span class="attr">OnInserted</span>=”<span class="attr">SqlDataSource1_Inserted</span>”<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">DeleteParameters</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">id</span>” <span class="attr">Type</span>=”<span class="attr">Int32</span>? <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">DeleteParameters</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">UpdateParameters</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">name</span>” <span class="attr">Type</span>=”<span class="attr">String</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">id</span>” <span class="attr">Type</span>=”<span class="attr">Int32</span>? <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">UpdateParameters</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">InsertParameters</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">name</span>” <span class="attr">Type</span>=”<span class="attr">String</span>” <span class="kwrd">/&gt;</span>
               <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Direction</span>=<span class="attr">Output</span> <span class="attr">Name</span>=”<span class="attr">NewId</span>” <span class="attr">Size</span>=<span class="attr">4</span> <span class="attr">Type</span>=<span class="attr">Int16</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">InsertParameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="attr">&amp;nbsp;</span><span class="kwrd">&lt;</span><span class="html">asp:Button</span> <span class="attr">ID</span>=”<span class="attr">ButtonInsert</span>” <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">OnClick</span>=”<span class="attr">ButtonInsert_Click</span>” <span class="attr">Text</span>=”<span class="attr">Insert</span> <span class="attr">Record</span>” <span class="kwrd">/&gt;&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<h2>About the Author </h2>
<p>Peter Kellner currently works as an asp.net enterprise consultant at <a href="http://www.73rdstreet.com">http://www.73rdstreet.com</a>. During the past year, Peter Kellner has authored four MSDN articles dealing with Membership and Profiles. He maintains a blog with more articles at <a href="https://peterkellner.net">https://peterkellner.net</a>. </p>
