---
status: publish
published: true
pubDatetime: 2006-09-18T20:00:00.000Z
title: Get SqlDataSource To Retrieve DefaultValue of Current User (ExpressionBuilder
  with ASP.NET 2.0)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  <p>
  This article shows how to use Expression Builders in ASP.NET 2.0 to retrieve the current logged in user.  DataBinding will not work so Expression Builders is the ticket.  A small source file is created, the refernces to web.config are shown and a simple example is built.</p>
wordpress_id: 33
wordpress_url: https://peterkellner.net/2006/09/18/expressionbuilderidentity/
date: '2006-09-18 09:50:07 -0700'
date_gmt: '2006-09-18 16:50:07 -0700'
categories:
- How Things Work
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<h2>Abstract</h2>
<p>This article shows how to use Expression Builders in ASP.NET 2.0 to retrieve the current logged in user. DataBinding will not work so Expression Builders is the ticket. A small source file is created, the references to web.config are shown and a simple example is built.</p>
<h2>The Problem</h2>
<p>I recently was looking at unanswered posts in the asp.net forum, specifically this one: <a href="http://forums.asp.net/thread/1402259.aspx">http://forums.asp.net/thread/1402259.aspx</a>. I thought I     <br />understood how databinding and expressions worked, but just wanted to check myself. So, I made a simple example     <br />web page just like the post shows. (see below)</p>
<p> <!--more-->
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=”C#” AutoEventWireup=”true” CodeFile=”Default.aspx.cs” Inherits=”_Default” %&gt;</span>
<span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> “<span class="attr">-</span>//<span class="attr">W3C</span>//<span class="attr">DTD</span> <span class="attr">XHTML</span> <span class="attr">1</span>.<span class="attr">0</span> <span class="attr">Transitional</span>//<span class="attr">EN</span>” “<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">TR</span>/<span class="attr">xhtml1</span>/<span class="attr">DTD</span>/<span class="attr">xhtml1-transitional</span>.<span class="attr">dtd</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">1999</span>/<span class="attr">xhtml</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">id</span>=”<span class="attr">Head1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Untitled Page<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span>=”<span class="attr">form1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span>=”<span class="attr">GridView1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">AutoGenerateColumns</span>=”<span class="attr">False</span>” <span class="attr">DataSourceID</span>=”<span class="attr">SqlDataSource1</span>?<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span>=”<span class="attr">Username</span>” <span class="attr">HeaderText</span>=”<span class="attr">Username</span>” <span class="attr">SortExpression</span>=”<span class="attr">Username</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span>=”<span class="attr">SqlDataSource1</span>? <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ConnectionString</span>=”&amp;<span class="attr">lt</span>;%$ <span class="attr">ConnectionStrings:CodeCampSV06</span> %&amp;<span class="attr">gt</span>;“
                <span class="attr">SelectCommand</span>=”<span class="attr">SELECT</span> [<span class="attr">Username</span>], [<span class="attr">Email</span>] <span class="attr">FROM</span> [<span class="attr">Attendees</span>] <span class="attr">WHERE</span> ([<span class="attr">Username</span>] = @<span class="attr">Username</span>)”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">Username</span>” <span class="attr">Type</span>=”<span class="attr">String</span>” <span class="attr">DefaultValue</span>=”&amp;<span class="attr">lt</span>;% <span class="attr">User</span>.<span class="attr">Identity</span>.<span class="attr">Name</span> %&amp;<span class="attr">gt</span>;“  <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p>Then, I ran it through Lutz Roeder's .NET Reflector and got the following from the code.</p>
<p><!-- code formatted by http://manoli.net/csharpformat/ --><br />
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
<pre class="csharpcode"><span class="kwrd">private</span> Parameter __BuildControl__control6()
{
    Parameter parameter1 = <span class="kwrd">new</span> Parameter();
    parameter1.Name = “Username”;
    parameter1.Type = TypeCode.String;
    parameter1.DefaultValue = “&lt;% User.Identity.Name %&gt;”;
    <span class="kwrd">return</span> parameter1;
}</pre>
<p>It's pretty obvious that unless there is a username of the literal string &quot;&lt;% User.Identity.Name %&gt;&quot; no records will be find. This simply means that the build provider asp.net uses is not generating any code for us with sqldatasource that will help with the DefaultValue of parameters in a SqlDataSource.</p>
<h2>The Solution</h2>
<p>Expression Builder to the rescue!</p>
<p>To solve the problem, we need to build a simple expression builder. Without going into all the details of what an expression builder is, all you need to do is put the following code in your app_code directory and call it something like ExpressionBuilderIdentity.cs.</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Data;
<span class="kwrd">using</span> System.Configuration;
<span class="kwrd">using</span> System.Web;
<span class="kwrd">using</span> System.Web.Security;
<span class="kwrd">using</span> System.Web.UI;
<span class="kwrd">using</span> System.Web.UI.WebControls;
<span class="kwrd">using</span> System.Web.UI.WebControls.WebParts;
<span class="kwrd">using</span> System.Web.UI.HtmlControls;
<span class="kwrd">using</span> System.Web.Compilation;
<span class="kwrd">using</span> System.CodeDom;
 
<span class="kwrd">public</span> <span class="kwrd">class</span> ExpressionBuilderIdentity : ExpressionBuilder
{
    <span class="kwrd">public</span> <span class="kwrd">override</span> System.CodeDom.CodeExpression GetCodeExpression(
        BoundPropertyEntry entry, <span class="kwrd">object</span> parsedData, ExpressionBuilderContext context)
    {
        CodeTypeReferenceExpression targetClass =
            <span class="kwrd">new</span> CodeTypeReferenceExpression(<span class="kwrd">typeof</span>(ExpressionBuilderIdentity));
        <span class="kwrd">string</span> targetMethod = “GetIdentity”;
        CodeExpression methodParameter =
            <span class="kwrd">new</span> CodePrimitiveExpression(entry.Expression.Trim());
        <span class="kwrd">return</span> <span class="kwrd">new</span> CodeMethodInvokeExpression(
            targetClass, targetMethod, methodParameter);
    }
 
    <span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">object</span> GetIdentity(<span class="kwrd">string</span> param)
    {
        <span class="kwrd">string</span> returnString = <span class="kwrd">string</span>.Empty;
 
        <span class="kwrd">if</span> (param.ToLower().Equals(“name”))
        {
            returnString = HttpContext.Current.User.Identity.Name;
        }
 
        <span class="kwrd">return</span> returnString;
    }
}</pre>
<p>Then, you need to add a reference to it in your web.config as follows:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">compilation</span> <span class="attr">debug</span>=“<span class="attr">true</span>“<span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">expressionBuilders</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">expressionPrefix</span>=“<span class="attr">UserIdentity</span>“ <span class="attr">type</span>=“<span class="attr">ExpressionBuilderIdentity</span>, <span class="attr">__code</span>“<span class="kwrd">/&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">expressionBuilders</span><span class="kwrd">&gt;</span>
      …</pre>
<p>Then, specify the SqlDataSource as follows:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">asp:SqlDataSource</span> <span class="attr">ID</span>=”<span class="attr">SqlDataSource1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ConnectionString</span>=”&amp;<span class="attr">lt</span>;%$ <span class="attr">ConnectionStrings:CodeCampSV06</span> %&amp;<span class="attr">gt</span>;“ <span class="attr">SelectCommand</span>=”<span class="attr">SELECT</span> [<span class="attr">Username</span>], [<span class="attr">Email</span>] <span class="attr">FROM</span> [<span class="attr">Attendees</span>] <span class="attr">WHERE</span> ([<span class="attr">Username</span>] = @<span class="attr">Username</span>)”<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">asp:Parameter</span> <span class="attr">Name</span>=”<span class="attr">Username</span>” <span class="attr">Type</span>=”<span class="attr">String</span>”
                <span class="attr">DefaultValue</span>=”&amp;<span class="attr">lt</span>;%$ <span class="attr">UserIdentity:name</span> %&amp;<span class="attr">gt</span>;“ <span class="kwrd">/&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">SelectParameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">asp:SqlDataSource</span><span class="kwrd">&gt;</span></pre>
<p>And, Presto, it works!</p>
<h2>Summary</h2>
<p>Anytime you are using one of the new datasourceID controls, you need to use expressions rather than databinding if you want to reference outside variables. Creating the code is fairly straight forward and lends itself to lots of cool possibilities.</p>
