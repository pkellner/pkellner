---
status: publish
published: true
pubDatetime: 2008-07-03T20:00:00.000Z
title: Refactoring With ReSharper, Some Very Nice C# fixes I often use
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br /><p>One of the really nice features I enjoy using in Resharper 4.0
  is the refactoring that converts inefficient (and unpleasant to read) syntax into
  nice efficient code.  In this post, I'll show some refactorings that Resharper (from
  JetBrains) gives us.  There are lots more, but the ones listed below seem to come
  up the most in my own c# code.</p><br />"
wordpress_id: 121
wordpress_url: https://peterkellner.net/2008/07/03/code-refactoring-with-resharper/
date: '2008-07-03 06:59:34 -0700'
date_gmt: '2008-07-03 13:59:34 -0700'
categories:
- Best Practices
- C#
- Tools
tags: []
---
<p>One of the really nice features I enjoy using in <a href="http://www.jetbrains.com/resharper/" target="_blank">Resharper 4.0</a> is the refactoring that converts inefficient (and unpleasant to read) syntax into nice efficient code.&#160; In this post, I'll show some refactorings that Resharper (from <a href="http://www.jetbrains.com/index.html" target="_blank">JetBrains</a>) gives us.&#160; There are lots more, but the ones listed below seem to come up the most in my own c# code.</p>
<p> <!--more--><br />
<h2>Creates String.Format in C# From &quot;a&quot; + &quot;b&quot; + &quot;c&quot; syntax</h2>
<p>From:</p>
<pre class="csharpcode">var url = wikiURL + <span class="str">&quot;/api/AddPage?apikey_v1=&quot;</span> + apiKey
                                + <span class="str">&quot;&amp;page=&quot;</span> + wikiPageName
                                + <span class="str">&quot;&amp;name=&quot;</span> + name
                                + <span class="str">&quot;&amp;email=&quot;</span> + email; </pre>
<p>
  </p>
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
<p>To:</p>
<pre class="csharpcode">var url =  <span class="kwrd">string</span>.Format(<span class="str">&quot;{0}/api/AddPage?apikey_v1={1}&amp;page={2}&amp;name={3}&amp;email={4}&quot;</span>,
                    wikiURL, apiKey, wikiPageName, name, email); </pre>
<p>
  </p>
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
<p>&#160;</p>
<h2>Create Simple Logical Assignments From my Overly Verbose Code</h2>
<p>From:</p>
<pre class="csharpcode"><span class="kwrd">if</span> (ConfigurationManager.AppSettings[<span class="str">&quot;ShowDinnerConfirmation&quot;</span>].ToLower().Equals(<span class="str">&quot;true&quot;</span>))
            {
                TableRowSaturdayDinner.Visible = <span class="kwrd">true</span>;
            }
            <span class="kwrd">else</span>
            {
                TableRowSaturdayDinner.Visible = <span class="kwrd">false</span>;
            } </pre>
<p>
  </p>
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
<p>&#160;</p>
<p>To:</p>
<pre class="csharpcode">TableRowSaturdayDinner.Visible = ConfigurationManager.AppSettings[<span class="str">&quot;ShowDinnerConfirmation&quot;</span>].ToLower().Equals(<span class="str">&quot;true&quot;</span>); </pre>
<p>
  </p>
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
<p>&#160;</p>
<h2>Use ?? When I've used Simple ? Operator Makes for Simpler Code</h2>
<p>From:</p>
<pre class="csharpcode"><span class="kwrd">string</span> s = context.Request.QueryString[<span class="str">&quot;Cache&quot;</span>] == <span class="kwrd">null</span> ? <span class="str">&quot;true&quot;</span> : context.Request.QueryString[<span class="str">&quot;Cache&quot;</span>];</pre>
<p>
  </p>
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
<p>To:</p>
<pre class="csharpcode"><span class="kwrd">string</span> s = context.Request.QueryString[<span class="str">&quot;Cache&quot;</span>] ?? <span class="str">&quot;true&quot;</span>;</pre>
<p>
  </p>
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
