---
status: publish
published: true
pubDatetime: 2006-06-07T20:00:00.000Z
title: Inserting Programmatically with ObjectDataSource in ASP.NET 2.0
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 23
wordpress_url: https://peterkellner.net/?p=37
date: '2006-06-07 13:21:02 -0700'
date_gmt: '2006-06-07 20:21:02 -0700'
categories:
- Uncategorized
- Membership
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<h2>( ObjectDataSource1.Insert(); )</h2>
<p>ObjectDataSource's are great for building your own middle tier between your aspx web page and your database (or any other datastore for that matter). By binding the datasource to a databound server control like detailsview, you auto-magically get the insert behavior you are looking for. If however, you just just want to insert to the ObjectDataSource you have included on your aspx page without using a databound control, you don't have a lot of fancy footwork to do. All you have to do is reference the insert parameter by name (or index offset) and assign it directly.</p>
<p> <!--more-->
<p>Below is an example of how to insert a Role into Membership using the ObjectDataSource developed in a my previous MSDN article <a href="/?p=24">Microsoft ASP.NET 2.0 Member/Role Management with IIS     <br />Part 2: Implementation</a>.</p>
<p> <!-- code formatted by http://manoli.net/csharpformat/ --><br />
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
<pre class="csharpcode"><span class="kwrd">&lt;</span> %@ Page Language=&quot;C#&quot; <span class="asp">%&gt;</span>
<span class="kwrd">&lt;</span> !DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;<span class="kwrd">&gt;</span>
 
<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">protected</span> <span class="kwrd">void</span> Button1_Click(<span class="kwrd">object</span> sender, EventArgs e)
{
  ObjectDataSource1.InsertParameters[<span class="str">&quot;roleName&quot;</span>].DefaultValue =
    TextBoxRole.Text;
  ObjectDataSource1.Insert();
}
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
 
<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>AddRoleWithODS.aspx<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSource1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
    <span class="attr">InsertMethod</span><span class="kwrd">=&quot;Insert&quot;</span>
    <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetRoles&quot;</span>
    <span class="attr">TypeName</span><span class="kwrd">=&quot;MembershipUtilities.RoleDataObject&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;roleName&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Button</span> <span class="attr">ID</span><span class="kwrd">=&quot;Button1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Add Role&quot;</span>
    <span class="attr">OnClick</span><span class="kwrd">=&quot;Button1_Click&quot;</span> <span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:TextBox</span> <span class="attr">ID</span><span class="kwrd">=&quot;TextBoxRole&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p>If you do not want to declaratively define the ObjectDataSource and just want to use it directly, you can do that also. You simply reference the ObjectDataSource by Type and call its insert method. An example of that is below.</p>
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
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Web.UI;
<span class="kwrd">using</span> MembershipUtilities;
 
<span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> Default3 : Page
{
  <span class="kwrd">protected</span> <span class="kwrd">void</span> Button1_Click(<span class="kwrd">object</span> sender, EventArgs e)
  {
    RoleDataObject.Insert(TextBox1.Text);
  }
}</pre>
