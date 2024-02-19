---
status: publish
published: true
pubDatetime: 2009-11-08T20:00:00.000Z
title: Converting From System.Data.Linq.Binary to String and Back
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 379
wordpress_url: https://peterkellner.net/2009/11/08/csharp-linqbinary-tostring-andback/
date: '2009-11-08 10:49:58 -0800'
date_gmt: '2009-11-08 17:49:58 -0800'
categories:
- C#
- LINQ
- LINQ to SQL
tags: []
---
<p> Just a quick post in case anyone is wasting 10 minutes figuring out how to do this.&#160; For me, this came up because in <a href="http://www.microsoft.com/sqlserver/2008/en/us/overview.aspx">Sql Server 2008</a>, NVARCHAR(MAX) is 4000 characters and I needed more.&#160; The recommended datatype to use for more is VARBINARY.&#160; When I did that, LINQ2SQL converted that type to <a href="http://msdn.microsoft.com/en-us/library/system.data.linq.binary.aspx">Linq.Binary</a>. (using <a href="http://msdn.microsoft.com/en-us/library/system.text.asciiencoding.aspx">encoding</a>)</p>
<p>So, in my C# code, here is what you need to convert to the Linq.Binary:</p>
<p> <!--more-->
<p>Linq.Binary carrierMatrix =    <br />&#160;&#160; <span class="kwrd">new</span> ASCIIEncoding().GetBytes(myString);</p>
<pre class="csharpcode">And, to go back from Linq.Binary:</pre>
<pre class="csharpcode"><span class="kwrd">string</span> carrierMatrixString = Encoding.ASCII.GetString(carrierMatrix.ToArray());<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style></pre>
<p><font size="2" face="Consolas">Hope this help!</font></p>
<pre class="csharpcode">&#160;</pre>
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
