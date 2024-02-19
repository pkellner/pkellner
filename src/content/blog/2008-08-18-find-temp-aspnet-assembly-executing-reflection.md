---
status: publish
published: true
pubDatetime: 2008-08-18T20:00:00.000Z
title: How to find your temporary asp.net executing assemblies location
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 136
wordpress_url: https://peterkellner.net/2008/08/18/find-temp-aspnet-assembly-executing-reflection/
date: '2008-08-18 12:22:46 -0700'
date_gmt: '2008-08-18 19:22:46 -0700'
categories:
- C#
- Visual Studio
- ASP.NET 2.0
tags: []
---
<p>Seems, I keep forgetting where the temporary files <a href="http://www.asp.net/">asp.net</a> uses. The reason it's nice to know is sometimes you may want to open them with <a href="http://www.aisto.com/roeder/dotnet/">Reflector</a> to see the generated code.&#160; Also, sometimes, you want to delete those files because asp.net is confused and is reusing old ones.&#160; So, here is the magic lines of code you need.</p>
<p> <!--more-->
<div class="csharpcode">
<pre class="alt">&lt;%@ Page Language=<span class="str">&quot;C#&quot;</span> %&gt;</pre>
<pre>&#160;</pre>
<pre class="alt">&lt;!DOCTYPE html PUBLIC <span class="str">&quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;</span> <span class="str">&quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;</span>&gt;</pre>
<pre>&#160;</pre>
<pre class="alt">&lt;script runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<pre>    {</pre>
<pre class="alt">        LabelWhere.Text = System.Reflection.Assembly.GetExecutingAssembly().Location.ToString();</pre>
<pre>    }</pre>
<pre class="alt">&lt;/script&gt;</pre>
<pre>&#160;</pre>
<pre class="alt">&lt;html xmlns=<span class="str">&quot;http://www.w3.org/1999/xhtml&quot;</span>&gt;</pre>
<pre>&lt;head runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre class="alt">    &lt;title&gt;&lt;/title&gt;</pre>
<pre>&lt;/head&gt;</pre>
<pre class="alt">&lt;body&gt;</pre>
<pre>    &lt;form id=<span class="str">&quot;form1&quot;</span> runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre class="alt">    &lt;div&gt;</pre>
<pre>        &lt;asp:Label ID=<span class="str">&quot;LabelWhere&quot;</span> runat=<span class="str">&quot;server&quot;</span> Text=<span class="str">&quot;Label&quot;</span>&gt;&lt;/asp:Label&gt;</pre>
<pre class="alt">    &lt;/div&gt;</pre>
<pre>    &lt;/form&gt;</pre>
<pre class="alt">&lt;/body&gt;</pre>
<pre>&lt;/html&gt;</pre>
</div>
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
<p>Hope this Helps!</p>
