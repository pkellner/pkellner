---
status: publish
published: true
pubDatetime: 2006-10-14T20:00:00.000Z
title: How To Show All Items Using a DropDownList and a GridView Control in ASP.NET
  2.0 with VS2005
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: This article will show how to implement a showall item in a DropDownList
  using GridView with ASP.NET 2.0.  It does it by dynamically changing the SelectParameters
  associated with a SqlDataSource.
wordpress_id: 37
wordpress_url: https://peterkellner.net/2006/10/14/how-to-show-all-items-using-a-dropdownlist-and-a-gridview-control-in-aspnet-20-with-vs2005/
date: '2006-10-14 11:35:58 -0700'
date_gmt: '2006-10-14 18:35:58 -0700'
categories:
- ".Net 2.0"
- ASP.NET 2.0
tags: []
---
<p>We often want to have a gridview which selects items based on a dropdownlist. It's trivial to do this in the VS2005 designer by simply first creating an SqlDataSource with a where clause, then with the sqldatasource wizard, assign the SelectedValue of the dropdownlist to the GridView.</p>
<p>The application running looks like this:</p>
<p> <!--more-->
<p><img src="/wp/wp-content/uploads/2006/10/simpleapprunning.jpg" width="512" height="453" /></p>
<p>And the page source to do is simply this:</p>
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
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">1999</span>/<span class="attr">xhtml</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Simple GridView With DropDownList Selection<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span>=”<span class="attr">form1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span>=”<span class="attr">DropDownList1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">AutoPostBack</span>=”<span class="attr">True</span>”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>Ikura<span class="kwrd">&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>Konbu<span class="kwrd">&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span>=”<span class="attr">SqlDataSource1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ConnectionString</span>=”&amp;<span class="attr">lt</span>;%$ <span class="attr">ConnectionStrings:NorthWindConnectionString</span> %&amp;<span class="attr">gt</span>;“
                <span class="attr">SelectCommand</span>=”<span class="attr">SELECT</span> [<span class="attr">ProductName</span>], [<span class="attr">UnitsInStock</span>], [<span class="attr">UnitsOnOrder</span>] <span class="attr">FROM</span> [<span class="attr">Alphabetical</span> <span class="attr">List</span> <span class="attr">of</span> <span class="attr">Products</span>] <span class="attr">WHERE</span> ([<span class="attr">ProductName</span>] = @<span class="attr">ProductName2</span>)”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:ControlParameter</span> <span class="attr">ControlID</span>=”<span class="attr">DropDownList1</span>? <span class="attr">Name</span>=”<span class="attr">ProductName2</span>? <span class="attr">PropertyName</span>=”<span class="attr">SelectedValue</span>”
                        <span class="attr">Type</span>=”<span class="attr">String</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span>=”<span class="attr">GridView1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">AutoGenerateColumns</span>=”<span class="attr">False</span>” <span class="attr">DataSourceID</span>=”<span class="attr">SqlDataSource1</span>?<span class="kwrd">&gt;</span>
                 <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">ProductName</span>” <span class="attr">HeaderText</span>=”<span class="attr">ProductName</span>” <span class="attr">SortExpression</span>=”<span class="attr">ProductName</span>” <span class="kwrd">/&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">UnitsInStock</span>” <span class="attr">HeaderText</span>=”<span class="attr">UnitsInStock</span>” <span class="attr">SortExpression</span>=”<span class="attr">UnitsInStock</span>” <span class="kwrd">/&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">UnitsOnOrder</span>” <span class="attr">HeaderText</span>=”<span class="attr">UnitsOnOrder</span>” <span class="attr">SortExpression</span>=”<span class="attr">UnitsOnOrder</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p>However, what if you want to have a show all option in your DropDownList? My suggestion is to abandon (somewhat) the visual programming model (or at least that's the only way I can think of doing it) and add the SelectParameters in the Page_Load event of the page. In addition, to get all the rows to show, I suggest adding the Sql Injection trick which is add an OR to the sql. You can that make the OR always return true, or always return false. I do this by simply passing a 1=@CompareInteger to the Sql that always gets evaluated. Then dynamically set the CompareInteger to 1 or 999. 1 makes all the rows return, 999 forces the evaluation of the ProductName=@ProductName part of the Where clause.</p>
<p>Here is what the application looks like running:</p>
<p><img src="/wp/wp-content/uploads/2006/10/apprunning.jpg" width="576" height="583" /></p>
<p>And here is the code that actually does the job.</p>
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
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=&quot;C#&quot; %&gt;</span>

 <span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> <span class="kwrd">&quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;</span> <span class="kwrd">&quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>

    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
    {

        <span class="kwrd">if</span> (!IsPostBack)
        {
            ControlParameter cp =
                <span class="kwrd">new</span> ControlParameter(<span class="str">&quot;ProductName&quot;</span>,TypeCode.String,<span class="str">&quot;DropDownList1&quot;</span>,<span class="str">&quot;SelectedValue&quot;</span>);
            SqlDataSource1.SelectParameters.Add(cp);

            Parameter p = <span class="kwrd">new</span> Parameter(<span class="str">&quot;CompareInteger&quot;</span>, TypeCode.Int32);
            p.DefaultValue = <span class="str">&quot;1&quot;</span>;
            SqlDataSource1.SelectParameters.Add(p);
        }
    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> DropDownList1_SelectedIndexChanged(<span class="kwrd">object</span> sender, EventArgs e)
    {
        <span class="kwrd">if</span> (DropDownList1.SelectedValue.Equals(<span class="str">&quot;(All)&quot;</span>))
        {
            SqlDataSource1.SelectParameters[1].DefaultValue = <span class="str">&quot;1&quot;</span>;
        }
        <span class="kwrd">else</span>
        {
            SqlDataSource1.SelectParameters[1].DefaultValue = <span class="str">&quot;999&quot;</span>;  <span class="rem">// not one</span>
        }
    }

<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span> <span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>DropDownList and GridView with Show All Option<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span><span class="kwrd">=&quot;DropDownList1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoPostBack</span><span class="kwrd">=&quot;True&quot;</span> <span class="attr">OnSelectedIndexChanged</span><span class="kwrd">=&quot;DropDownList1_SelectedIndexChanged&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span> <span class="attr">Value</span><span class="kwrd">=&quot;(All)&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>Ikura<span class="kwrd">&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:</span> <span class="attr">pan</span> <span class="attr">style</span><span class="kwrd">=&quot;color: maroon;&quot;</span><span class="kwrd">&gt;</span>ListItem<span class="kwrd">&gt;</span>Konbu<span class="kwrd">&lt;/</span><span class="html">asp:ListItem</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span><span class="kwrd">=&quot;GridView1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoGenerateColumns</span><span class="kwrd">=&quot;False&quot;</span> <span class="attr">DataSourceID</span><span class="kwrd">=&quot;SqlDataSource1&quot;</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;ProductName&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;ProductName&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;ProductName&quot;</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;UnitsInStock&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;UnitsInStock&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;UnitsInStock&quot;</span> <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;SqlDataSource1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">ConnectionString</span><span class="kwrd">=&quot;&lt;%$ ConnectionStrings:NorthWindConnectionString %&gt;&quot;</span> <span class="attr">SelectCommand</span><span class="kwrd">=&quot;SELECT [ProductName], [UnitsInStock] FROM [Alphabetical List of Products] WHERE ([ProductName] = @ProductName OR 1 = @CompareInteger) ORDER BY [ProductName]&quot;</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p>Notice that autopostback is set on the dropdownlist as well as the select change event. That's it! Give it a try.</p>
