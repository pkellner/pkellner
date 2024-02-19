---
status: publish
published: true
pubDatetime: 2010-07-29T20:00:00.000Z
title: A Cool / Unexpected Refactoring around .Net C# Locking Issue
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1347
wordpress_url: https://peterkellner.net/2010/07/29/resharper-refactor-locking-linq/
date: '2010-07-29 07:32:12 -0700'
date_gmt: '2010-07-29 14:32:12 -0700'
categories:
- LINQ
- Refactor
- ReSharper
- Lock
tags: []
---
<p>I’m constantly amazed by the insightfulness of <a href="http://www.jetbrains.com/resharper/index.html">ReSharper’s</a> suggested refactorings (ReSharper is a <a href="http://www.microsoft.com/visualstudio/en-us/visual-studio-2010-launch?WT.mc_id=SEARCH&amp;WT.srch=1">Visual Studio</a> Addin from <a href="http://www.jetbrains.com/index.html">JetBrains</a> I use with C#). Today, I’ve been working on a threading problem where I’m getting crashes based on what seems like not proper locking across threads (they usually show up as some type of ugly update object or enum error).</p>
<p>My code starts like this:</p>
<p>&#160;</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> List&lt;DbProgressReport&gt; DbProgressReportProperty { get; set; }</pre>
</div>
<div>&#160;</div>
<p><!--more--></p>
<div>
  </div>
<p>Then, I try wrapping the updates with a lock as follows (removing the set because I do it someplace else now)</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> List&lt;DbProgressReport&gt; DbProgressReportProperty<br />{<br />    get<br />    {<br />        <span style="color: #0000ff">lock</span> (lockDbProgressReportProperty)<br />        {<br />            <span style="color: #0000ff">return</span> _dbProgressReportList;<br />        }<br />    }<br />}</pre>
<p></div>
<p>&#160;</p>
<p>I then realize that I need to copy the data because it may change while the caller prints it so I decide to return a temporary copy of the data as follows:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> List&lt;DbProgressReport&gt; DbProgressReportProperty<br />{<br />    get<br />    {<br />        <span style="color: #0000ff">lock</span> (lockDbProgressReportProperty)<br />        {<br />            var dbProgressReportsNew = <span style="color: #0000ff">new</span> List&lt;DbProgressReport&gt;();<br />            <span style="color: #0000ff">if</span> (_dbProgressReportList != <span style="color: #0000ff">null</span>)<br />            {<br />                <span style="color: #008000">// make temp copy to avoid locking issues on read</span><br />                <span style="color: #0000ff">foreach</span> (var rec <span style="color: #0000ff">in</span> _dbProgressReportList)<br />                {<br />                    dbProgressReportsNew.Add(rec);<br />                }<br />            }<br />            <span style="color: #0000ff">return</span> dbProgressReportsNew;<br />        }<br />    }<br />}</pre>
<p></div>
<p>I then notice that ReSharper has a suggestion.</p>
<p><a href="/FilesForWebDownload/ACoolUnexpectedRefactor.NetCLockingIssue_69E6/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ACoolUnexpectedRefactor.NetCLockingIssue_69E6/image_thumb.png" width="512" height="268" /></a> </p></p>
<p>Taking the suggestion, Resharper changes the code to:</p>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">lock</span> (lockDbProgressReportProperty)<br />{<br />    <span style="color: #008000">// make temp copy to avoid locking issues on </span><br />    <span style="color: #0000ff">return</span> _dbProgressReportList.ToList();<br />}</pre>
</div>
<div>&#160;</div>
<div>I expected a bunch of AddRange type stuff, but ReSharper figured out that ToList() would do everything I needed!</div>
<div>&#160;</div>
<div>Very cool.</div>
<div>&#160;</div>
<div>Hope this helps.</div>
<div>
  </div>
