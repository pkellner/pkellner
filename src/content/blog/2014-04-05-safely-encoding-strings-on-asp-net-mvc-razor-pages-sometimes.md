---
status: publish
published: true
pubDatetime: 2014-04-05T20:00:00.000Z
title: Safely Encoding Strings On ASP.NET MVC Razor Pages (sometimes)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3975
wordpress_url: https://peterkellner.net/?p=3975
date: '2014-04-05 08:34:02 -0700'
date_gmt: '2014-04-05 15:34:02 -0700'
categories:
- MVC3
- ASP.net
- ".NET 4.5"
- ASP.NET MVC
- ASP.NET 4.5
- MVC4
- Visual Studio 2013
- MVC5
tags: []
---
<p>&#160;</p>
<h2>Background</h2>
<p>Sometimes, we want to let html tags come through our web pages from user defined content.&#160; If for example, you have a workflow that requires approval before publishing, there are times when you want to let the author put through html, links, etc.&#160; </p>
<h2>Solution</h2>
<p>In <a href="http://msdn.microsoft.com/en-US/vstudio//" target="_blank">Visual Studio</a> write a simple HtmlHelper method that allows for a flag you can pass through.&#160; In my case, I have a database table with a boolean column “allowhtml”.&#160; If this is set, then instead of using <a href="http://msdn.microsoft.com/en-us/library/gg480740(v=vs.118).aspx" target="_blank">Html.Raw</a>(…) I can use my own helper method, pass in the allowHtml value and if it is set true, then allow the not encoded Html to flow through.</p>
<p>Here is that helper method:</p>
<pre class="csharpcode"><span class="kwrd">namespace</span> WebAPI.Code.Helpers
{
    <span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">class</span> SvccHtmlHelperExtension
    {
        <span class="kwrd">public</span> <span class="kwrd">static</span> MvcHtmlString SafeEncodeSvcc
            (<span class="kwrd">this</span> HtmlHelper helper, <span class="kwrd">string</span> inString, 
            <span class="kwrd">bool</span>? allowHtml = <span class="kwrd">false</span>)
        {
            <span class="kwrd">string</span> s =
                allowHtml.HasValue &amp;&amp; allowHtml.Value
                    ? inString
                    : HttpUtility.HtmlEncode(inString);
            <span class="kwrd">return</span> <span class="kwrd">new</span> MvcHtmlString (s);
        }</pre>
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
<p>Then, in the razor page (.cshtml)</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;sessionDescription&quot;</span> <span class="attr">id</span><span class="kwrd">=&quot;sessionDescription_@session.Id&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">p</span><span class="kwrd">&gt;</span>@Html.SafeEncodeSvcc(session.Description,session.AllowHtml)<span class="kwrd">&lt;/</span><span class="html">p</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<p>
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
<p>This way, the syntax is tight and I just use this instead of Html.Raw all the time.</p>
<p>Here is a good reference: <a title="http://www.dotnetperls.com/htmlencode-htmldecode" href="http://www.dotnetperls.com/htmlencode-htmldecode">http://www.dotnetperls.com/htmlencode-htmldecode</a></p>
<p>HTH’s.</p>
