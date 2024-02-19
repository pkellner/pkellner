---
status: publish
published: true
pubDatetime: 2007-10-17T20:00:00.000Z
title: How to Set the Default Value of a DropDownList in an ASP.NET Page
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p> This article shows how to set the default Value of a DropDownList Control
  when using asp.net 2.0.  It uses the DataBound event to do it.  A full page example
  which can be cut and paste is included</p>"
wordpress_id: 80
wordpress_url: https://peterkellner.net/2007/10/17/dropdownlistdefaultsetting/
date: '2007-10-17 10:44:13 -0700'
date_gmt: '2007-10-17 17:44:13 -0700'
categories:
- ".Net 2.0"
- Membership
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<h2>(Using Membership ObjectDataSource From MSDN Article)</h2>
<p>I'm doing a project where I have lots of DropDownList's on a page and want a simple way to set the initial values based on some known value.&#160; The DropDownLists are retrieved using ObjectDataSource but I don't want the first value displayed.&#160; I wrestled some with how to do this using page_load or page_prerender but didn't come up with good solutions.&#160; I did finally    <br />decide that programming the databound event of the dropdownlist was probably the best way to go. </p>
<p>The solution is pasted below.&#160; The MembershipUtilities.MembershipODS c# code can be downloaded from MSDN or on my web site at the following location.&#160; </p>
<p> <!--more-->
<p><a href="/2006/01/09/microsoft-aspnet-20-memberrole-management-with-iis/">https://peterkellner.net/2006/01/09/microsoft-aspnet-20-memberrole-management-with-iis/</a>.</p>
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
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=”C#” %&gt;</span>
<span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> “<span class="attr">-</span>//<span class="attr">W3C</span>//<span class="attr">DTD</span> <span class="attr">XHTML</span> <span class="attr">1</span>.<span class="attr">0</span> <span class="attr">Transitional</span>//<span class="attr">EN</span>”

  “<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">TR</span>/<span class="attr">xhtml1</span>/<span class="attr">DTD</span>/<span class="attr">xhtml1-transitional</span>.<span class="attr">dtd</span>”<span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">protected</span> <span class="kwrd">void</span> DropDownListUser_DataBound(<span class="kwrd">object</span> sender, EventArgs e)

    {
        DropDownListUser.SelectedIndex =
          DropDownListUser.Items.IndexOf
          (DropDownListUser.Items.FindByValue(Context.User.Identity.Name));
    }
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
 
<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">1999</span>/<span class="attr">xhtml</span>” <span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>DropDownList Initialize<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span>=”<span class="attr">form1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:DropDownList</span> <span class="attr">ID</span>=”<span class="attr">DropDownListUser</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”
          <span class="attr">DataSourceID</span>=”<span class="attr">ObjectDataSourceUser</span>”
          <span class="attr">DataTextField</span>=”<span class="attr">UserName</span>” <span class="attr">DataValueField</span>=”<span class="attr">UserName</span>”
          <span class="attr">OnDataBound</span>=”<span class="attr">DropDownListUser_DataBound</span>”<span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:DropDownList</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span>=”<span class="attr">ObjectDataSourceUser</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”
          <span class="attr">SelectMethod</span>=”<span class="attr">GetMembers</span>”
          <span class="attr">TypeName</span>=”<span class="attr">MembershipUtilities</span>.<span class="attr">MembershipUserODS</span>”<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">sortData</span>” <span class="attr">Type</span>=”<span class="attr">String</span>” <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:ObjectDataSource</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
