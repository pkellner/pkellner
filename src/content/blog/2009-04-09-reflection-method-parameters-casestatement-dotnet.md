---
status: publish
published: true
pubDatetime: 2009-04-09T20:00:00.000Z
title: Using Method.Invoke to avoid a lengthy Case Statement in C# (Using Reflection)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 287
wordpress_url: https://peterkellner.net/2009/04/09/reflection-method-parameters-casestatement-dotnet/
date: '2009-04-09 15:02:56 -0700'
date_gmt: '2009-04-09 22:02:56 -0700'
categories:
- C#
- Reflection
tags: []
---
<p> So, I asked the following question in at <a title="http://forums.asp.net/t/1408631.aspx" href="http://forums.asp.net/t/1408631.aspx">http://forums.asp.net/t/1408631.aspx</a></p>
<p><a href="/wp/wp-content/uploads/2009/04/image1.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb1.png" width="693" height="274" /></a></p>
<p>The problem is, I’ve got 30 methods that all have the same signature, but have different implementations.&#160; Mike Banavige (the lead moderator at the forums) suggested I look at the following article on reflection:&#160; http://www.csharphelp.com/archives/archive200.html.&#160; Turns out, that helped my solve my problem exactly.&#160; Rather than go through a lengthy line by line explanation, I’m going to post some of my before and after code.&#160; It’s pretty clear what is happening, but I thought it would be nice to show a real example.</p>
<p> <!--more-->
<p>Before Code:</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> AddTemplateCode(<span class="kwrd">string</span> templateNumber, <span class="kwrd">int</span> indent, ICollection&lt;<span class="kwrd">string</span>&gt; newLines,FullMeta fullMetal)</pre>
<pre>        {</pre>
<pre class="alt">            <span class="kwrd">int</span> iTemplateNumber = Convert.ToInt32(templateNumber);</pre>
<pre>            var sb = <span class="kwrd">new</span> StringBuilder(indent);</pre>
<pre class="alt">            sb.Append(<span class="str">' '</span>, indent);</pre>
<pre>            <span class="kwrd">string</span> indentString = sb.ToString();</pre>
<pre class="alt">&#160;</pre>
<pre>&#160;</pre>
<pre class="alt">             <span class="rem">// be nice to get rid of this ugly case statement.  Using it because I want to have a way to separate</span></pre>
<pre>             <span class="rem">// methods associated with groups of methods.  that is, put Template11-15 in a separate file later.</span></pre>
<pre class="alt">            <span class="kwrd">switch</span> (iTemplateNumber)</pre>
<pre>            {</pre>
<pre class="alt">                <span class="kwrd">case</span> 11:</pre>
<pre>                    {</pre>
<pre class="alt">                        Template11(newLines, indentString,fullMetal);</pre>
<pre>                        <span class="kwrd">break</span>;</pre>
<pre class="alt">                    }</pre>
<pre>                <span class="kwrd">case</span> 12:</pre>
<pre class="alt">                    {</pre>
<pre>                        Template12(newLines, indentString,fullMetal);</pre>
<pre class="alt">                        <span class="kwrd">break</span>;</pre>
<pre>                    }</pre>
<pre class="alt">                <span class="kwrd">case</span> 13:</pre>
<pre>                    {</pre>
<pre class="alt">                        Template13(newLines, indentString, fullMetal);</pre>
<pre>                        <span class="kwrd">break</span>;</pre>
<pre class="alt">                    }</pre>
<pre>                <span class="kwrd">case</span> 14:</pre>
<pre class="alt">&lt;This goes on and on and on and on&gt;</pre>
</div>
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
<p>Then, After, following the sample above:</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> AddTemplateCode(<span class="kwrd">string</span> templateNumber, <span class="kwrd">int</span> indent, ICollection&lt;<span class="kwrd">string</span>&gt; newLines,FullMeta fullMetal)</pre>
<pre>        {</pre>
<pre class="alt">             </pre>
<pre>            <span class="kwrd">int</span> iTemplateNumber = Convert.ToInt32(templateNumber);</pre>
<pre class="alt">            var sb = <span class="kwrd">new</span> StringBuilder(indent);</pre>
<pre>            sb.Append(<span class="str">' '</span>, indent);</pre>
<pre class="alt">            <span class="kwrd">string</span> indentString = sb.ToString();</pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
<pre>&#160;</pre>
<pre class="alt">            var processTemplate = <span class="kwrd">new</span> ProcessTemplateDynamic();</pre>
<pre>            processTemplate.DoIt(iTemplateNumber, newLines, indentString, fullMetal);</pre>
<pre class="alt">&#160;</pre>
<pre>&lt;Then the <span class="kwrd">class</span> with DoIt <span class="kwrd">in</span> it...&gt;</pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">using</span> System;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre><span class="kwrd">using</span> System.Reflection;</pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">namespace</span> ThreePLogicAccessCodeGen.Code</pre>
<pre class="alt">{</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">class</span> ProcessTemplateDynamic</pre>
<pre class="alt">    {</pre>
<pre>        <span class="kwrd">internal</span> <span class="kwrd">void</span> DoIt(<span class="kwrd">int</span> iTemplateNumber, ICollection&lt;<span class="kwrd">string</span>&gt; newLines, <span class="kwrd">string</span> indentString, FullMeta fullMetal)</pre>
<pre class="alt">        {</pre>
<pre>            <span class="rem">// Template11(newLines, indentString, fullMetal);</span></pre>
<pre class="alt">            <span class="kwrd">string</span> templateMethodName = String.Format(<span class="str">&quot;Template{0}&quot;</span>, iTemplateNumber);</pre>
<pre>            var userParameters = <span class="kwrd">new</span> <span class="kwrd">object</span>[3];</pre>
<pre class="alt">            userParameters[0] = newLines;</pre>
<pre>            userParameters[1] = indentString;</pre>
<pre class="alt">            userParameters[2] = fullMetal;</pre>
<pre>&#160;</pre>
<pre class="alt">            <span class="kwrd">try</span></pre>
<pre>            {</pre>
<pre class="alt">                Type thisType = GetType();</pre>
<pre>                MethodInfo theMethod = thisType.GetMethod(templateMethodName);</pre>
<pre class="alt">&#160;</pre>
<pre>                <span class="rem">// that we have in this class that we don't want called.</span></pre>
<pre class="alt">                <span class="kwrd">if</span> (theMethod == <span class="kwrd">null</span> || (!CheckMethod(theMethod)))</pre>
<pre>                {</pre>
<pre class="alt">                    <span class="kwrd">throw</span> <span class="kwrd">new</span> ApplicationException(<span class="kwrd">string</span>.Format(<span class="str">&quot;[e] Command &lt;{0}&gt; not supported.&quot;</span>, templateMethodName));</pre>
<pre>                }</pre>
<pre class="alt">                <span class="rem">// Invoke the Method!</span></pre>
<pre>                theMethod.Invoke(<span class="kwrd">this</span>, userParameters);</pre>
<pre class="alt">            }</pre>
<pre>            <span class="kwrd">catch</span> (ArgumentNullException e)</pre>
<pre class="alt">            {</pre>
<pre>                <span class="rem">// This exception is from the user entering in a null string on the command line</span></pre>
<pre class="alt">                <span class="kwrd">throw</span> <span class="kwrd">new</span> ApplicationException(<span class="str">&quot;[e] Please enter in a non-null string. (&quot;</span> + e.Message + <span class="str">&quot;)&quot;</span>);</pre>
<pre>            }</pre>
<pre class="alt">            <span class="kwrd">catch</span> (TargetParameterCountException e)</pre>
<pre>            {</pre>
<pre class="alt">                <span class="rem">// This exception is thrown when the method is not passed the right number of parameters</span></pre>
<pre>                <span class="kwrd">throw</span> <span class="kwrd">new</span> ApplicationException(<span class="kwrd">string</span>.Format(<span class="str">&quot;[e] Command &lt;{0}&gt; requires parameters. ({1})&quot;</span>,</pre>
<pre class="alt">                                                             templateMethodName, e.Message));</pre>
<pre>            }</pre>
<pre class="alt">            <span class="kwrd">catch</span> (Exception e)</pre>
<pre>            {</pre>
<pre class="alt">                <span class="rem">// All other exceptions!</span></pre>
<pre>                <span class="kwrd">throw</span> <span class="kwrd">new</span> ApplicationException(<span class="kwrd">string</span>.Format(<span class="str">&quot;[e] General Exception:n{0}&quot;</span>, e));</pre>
<pre class="alt">            }</pre>
<pre>        }</pre>
<pre class="alt">&#160;</pre>
</div>
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
<p>Well, looking at it, seems maybe the Case statement is better, but the nice thing now is that each time I add a new template, I don’t have to make another case statement.&#160; That combined with it’s easier to make typos when you have a case statement so I’m sticking with my new solution here.</p>
<p>Hope this Helps!</p>
