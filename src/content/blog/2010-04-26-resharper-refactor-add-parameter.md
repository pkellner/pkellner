---
status: publish
published: true
pubDatetime: 2010-04-26T20:00:00.000Z
title: ReSharper 5.0 Adds New &ldquo;Add Parameter&rdquo; Refactoring
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1281
wordpress_url: https://peterkellner.net/2010/04/26/resharper-refactor-add-parameter/
date: '2010-04-26 11:38:40 -0700'
date_gmt: '2010-04-26 18:38:40 -0700'
categories:
- ".Net 2.0"
- C#
- Refactor
tags: []
---
<p>In this post, I’ll show a simple example of how when you add a parameter to C# method, <a href="http://www.jetbrains.com/resharper/whatsnew/">ReSharper</a> gives you a simple prompting to ask if you want to add a parameter to your method, or create an overloaded method that gives you the flexibility to maintain the old method signature and have the new method.</p>
<p> <!--more-->
<p>In my original code, I had the following code that called the method GetLoadResultsFromInterval.</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">List<span style="color: #0000ff">&lt;</span><span style="color: #800000">LoadResult</span><span style="color: #0000ff">&gt;</span> loadResultsForInterval =<br />    GetLoadResultsForInterval(rec.TimePoint,<br />                              rec.IntervalLengthInMs);</pre>
<p></div>
<p>Then, I simply added one more parameter (loadFtpArrivalTimeDictionary) and ReSharper prompted me with the following:</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/ReSharpe.0AddsNewAddParameterRefactoring_A3A1/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ReSharpe.0AddsNewAddParameterRefactoring_A3A1/image_thumb.png" width="627" height="203" /></a> </p>
<p>If I choose the first “Add Parameter, I get what I would expect, which is just the method with an extra parameter.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">/// <span style="color: #0000ff">&lt;/</span><span style="color: #800000">summary</span><span style="color: #0000ff">&gt;</span><br />/// <span style="color: #0000ff">&lt;</span><span style="color: #800000">param</span> <span style="color: #ff0000">name</span><span style="color: #0000ff">=&quot;timePoint&quot;</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">param</span><span style="color: #0000ff">&gt;</span><br />/// <span style="color: #0000ff">&lt;</span><span style="color: #800000">param</span> <span style="color: #ff0000">name</span><span style="color: #0000ff">=&quot;intervalLengthInMs&quot;</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">param</span><span style="color: #0000ff">&gt;</span><br />/// <span style="color: #0000ff">&lt;</span><span style="color: #800000">param</span> <span style="color: #ff0000">name</span><span style="color: #0000ff">=&quot;loadFtpArrivalTimeDictionary&quot;</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">param</span><span style="color: #0000ff">&gt;</span><br />/// <span style="color: #0000ff">&lt;</span><span style="color: #800000">returns</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">returns</span><span style="color: #0000ff">&gt;</span><br />private static List<span style="color: #0000ff">&lt;</span><span style="color: #800000">LoadResult</span><span style="color: #0000ff">&gt;</span> <br />   GetLoadResultsForInterval(DateTime timePoint, <br />   int intervalLengthInMs, <br />   Dictionary<span style="color: #0000ff">&lt;</span><span style="color: #800000">string</span>, <span style="color: #ff0000">DateTime</span><span style="color: #0000ff">&gt;</span> loadFtpArrivalTimeDictionary)<br />{<br />   throw new NotImplementedException();<br />}</pre>
<p></div>
<p>It even adds the param xml definition automatically.</p>
<p>However, I’m not quite as pleased with the second refactoring, that is, “Create Overload”.&#160; It does almost everything I would expect, but does not implement the method, which I think it could.&#160; Or, at least it could give it a try.&#160; What it does implement is the following:</p>
<p><a href="/FilesForWebDownload/ReSharpe.0AddsNewAddParameterRefactoring_A3A1/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ReSharpe.0AddsNewAddParameterRefactoring_A3A1/image_thumb_3.png" width="652" height="141" /></a> </p>
<p>I’m actually including a picture of it rather than the actual code because it created an error.&#160; It should have said DateTime instead of loadFtpArrivalTimeDictionary.&#160; Two other things of interest.</p>
<p>First, it did not add xml comments (which is probably because of the syntax error), and second, I would have expected it to have called the overloaded method as follows instead of what it did.</p>
<p>&#160;</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">private static List<span style="color: #0000ff">&lt;</span><span style="color: #800000">LoadResult</span><span style="color: #0000ff">&gt;</span> GetLoadResultsForInterval(DateTime timePoint,<br />    int intervalLengthInMs, <br />    Dictionary<span style="color: #0000ff">&lt;</span><span style="color: #800000">string</span>, <span style="color: #ff0000">DateTime</span><span style="color: #0000ff">&gt;</span> loadFtpArrivalTimeDictionary)<br />{<br />    // - put additional code here<br />    return GetLoadResultsForInterval(timePoint, intervalLengthInMs);<br />}</pre>
</div>
<div>&#160;</div>
<div>(before anyone points out this is the opposite of how you would normally overload a method call, I do know that.&#160; That is, typically, you would have a method with 2 incoming parameters that internally would call a method with 3 internal parameters, and you would simply default the third parameter.&#160; In my case, I’m going the other way, which is unusual, but not unheard of.)</div>
<div>
  </div>
<p>I began this post to brag about yet another awesome ReSharper refactoring because I really just wanted to add a parameter to an existing method call and it worked perfect.&#160; It was not until I decided to show the other refactoring for this blog post did I run into the problem.&#160; </p>
<p>I’m going to post this to the refactor dev’s and see if they can let me know where either I’ve gone astray, or there is a problem in their code.&#160; At any rate, I’m running this on vs2008 and have not tried it on vs2010.</p>
<p>Hope this helps!</p>
