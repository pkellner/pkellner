---
status: publish
published: true
pubDatetime: 2009-12-21T20:00:00.000Z
title: How to Get a Stack Trace from C# without throwing Exception
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 398
wordpress_url: https://peterkellner.net/2009/12/21/how-to-get-a-stack-trace-from-c-without-throwing-exception/
date: '2009-12-21 09:48:54 -0800'
date_gmt: '2009-12-21 16:48:54 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>Say you have some logging in your code that finds something unusual going on.&#160; In my case, I have a DataContext that I check to make sure it’s not already open before I open it.&#160; The method that I call the DataContext in is a utility method that is buried many layers down.&#160; When this problem is found, I don’t want to throw an exception, but I do want to log where I was.&#160; It does not help me to know that I’m in my utility method.&#160; I need to know the <a href="http://msdn.microsoft.com/en-us/library/system.environment.stacktrace.aspx">stack</a>.</p>
<p> <!--more-->
<p>Below is some simple code that lets me do this.&#160; Notice, it’s important to call <a href="http://msdn.microsoft.com/en-us/library/aa326974%28VS.71%29.aspx">StackTrace</a> with true, otherwise the line numbers don’t appear.</p>
<p>HTH’s!</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Collections.Generic;
<span class="kwrd">using</span> System.Diagnostics;
<span class="kwrd">using</span> System.Linq;
<span class="kwrd">using</span> System.Text;

<span class="kwrd">namespace</span> ConsoleApplication1
{
    <span class="kwrd">class</span> Program
    {
        <span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)
        {
            TestClass.GoNow();
        }
    }

    <span class="kwrd">class</span> TestClass
    {
        <span class="kwrd">public</span> <span class="kwrd">static</span> <span class="kwrd">void</span> GoNow()
        {
            var stackTrace = <span class="kwrd">new</span> StackTrace(<span class="kwrd">true</span>);
            <span class="kwrd">foreach</span> (var r <span class="kwrd">in</span> stackTrace.GetFrames())
            {
                Console.WriteLine(<span class="str">&quot;Filename: {0} Method: {1} Line: {2} Column: {3}  &quot;</span>,
                    r.GetFileName(),r.GetMethod(), r.GetFileLineNumber(),
                    r.GetFileColumnNumber() );
            }
        }
    }


}</pre>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
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
