---
status: publish
published: true
pubDatetime: 2010-07-04T20:00:00.000Z
title: Another Nice DevExpress CodeRush Refactoring
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1337
wordpress_url: https://peterkellner.net/2010/07/04/coderush-factorings-introduce-lambda-using-statements/
date: '2010-07-04 09:42:26 -0700'
date_gmt: '2010-07-04 16:42:26 -0700'
categories:
- Visual Studio
- Refactor
- Visual Studio 2010
- CodeRush
tags: []
---
<p>For the last few days, I’ve been using <a href="http://devexpress.com/">DevExpress</a> <a href="http://devexpress.com/Products/Visual_Studio_Add-in/Coding_Assistance/">CodeRush</a> and am finding some very useful refactorings.&#160; Many I’m not blogging about, but there are a few that I really like.&#160; In this post, I’m going to show just two of those refactorings that have been making my code much nicer and easier to write.&#160; One is the “Introduce Using” refactoring, and the other is “Convert to Lambda Expression”.</p>
<p>Before I go into the details, I’d just like to disclose that when I was first writing the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> web site, I was an asp.net and c# newby.&#160; I’m not claiming wizard status now, but I have to admit that when I go back and look at some of the code I wrote back then (including what I’m showing below before the refactoring), it’s a little embarrassing.&#160; Silicon Valley Code Camp for me as “when I’m not doing real work” web site so I don’t really have the time to go back and clean things up.&#160; Now, with CodeRush, it’s easy to clean things up when I see them with very little effort.</p>
<p> <!--more--><br />
<h2>Introduce Using Statement Refactoring</h2>
<p>Here is the code I wrote 5+ years ago:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">SqlConnection conn = <span style="color: #0000ff">new</span> SqlConnection(connectionString);<br />conn.Open();<br /><br /><span style="color: #008000">// First, make a quick list of counts for each id that is unavailable and show</span><br /><span style="color: #008000">// not be shown</span><br /><span style="color: #0000ff">string</span> selectCount = <span style="color: #006080">@&quot;select VistaSlotsId FROM attendees <br />                     WHERE VistaSlotsId &gt;= 2 AND VistaSlotsId &lt;= 5 Group By VistaSlotsId <br />                     HAVING COUNT(*) &gt;= @MaxPerSlot  &quot;</span>;<br />List&lt;<span style="color: #0000ff">int</span>&gt; unavailableSlotsList = <span style="color: #0000ff">new</span> List&lt;<span style="color: #0000ff">int</span>&gt;();<br />SqlDataReader readerUnavailable = <span style="color: #0000ff">null</span>;<br />SqlCommand cmdUnAvailable = <span style="color: #0000ff">new</span> SqlCommand(selectCount, conn);<br />cmdUnAvailable.Parameters.Add(<span style="color: #006080">&quot;@MaxPerSlot&quot;</span>, SqlDbType.Int).Value = maxPerSlot;<br />readerUnavailable = cmdUnAvailable.ExecuteReader();<br /><span style="color: #0000ff">try</span><br />{<br />    <span style="color: #0000ff">while</span> (readerUnavailable.Read())<br />    {<br />        <span style="color: #0000ff">int</span> id = readerUnavailable.GetInt32(0);<br />        unavailableSlotsList.Add(id);<br />    }<br />}<br /><span style="color: #0000ff">finally</span><br />{<br />    <span style="color: #0000ff">if</span> (readerUnavailable != <span style="color: #0000ff">null</span>) readerUnavailable.Close();<br />}</pre>
<p></div>
<p>By placing the cursor over the “conn” on the top line of the code above, CodeRush gives us the following result:</p>
<p><a href="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image_thumb.png" width="507" height="233" /></a> </p>
<p>There are actually quite a few things happening here.</p>
<ol>
<li>It is showing us in the top textbox what the using syntax will be </li>
<li>It is crossing out the lines of code it will change </li>
<li>It is teaching us a little about the using statement </li>
</ol>
<p>If I accept the changes, I get a nice refactoring.&#160; I can continue doing this with “using” for SqlCommand and SqlReader.&#160; I did need to move the SqlReader declaration inside the SqlCommand codeblock for this to work.&#160; Here is the final refactored code that took about 10 seconds.&#160; By hand, I’d say it would have taken me 3 minutes and I may have gotten it wrong which is why I would never do it before.&#160; Now, I’m confident I did not break my code.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">using</span> (SqlConnection conn = <span style="color: #0000ff">new</span> SqlConnection(connectionString))<br />{<br />    conn.Open();<br />    <span style="color: #008000">// First, make a quick list of counts for each id that is unavailable and show</span><br />    <span style="color: #008000">// not be shown</span><br />    <span style="color: #0000ff">string</span> selectCount = <span style="color: #006080">@&quot;select VistaSlotsId FROM attendees <br />                                 WHERE VistaSlotsId &gt;= 2 AND VistaSlotsId &lt;= 5 Group By VistaSlotsId <br />                                 HAVING COUNT(*) &gt;= @MaxPerSlot  &quot;</span>;<br />    List&lt;<span style="color: #0000ff">int</span>&gt; unavailableSlotsList = <span style="color: #0000ff">new</span> List&lt;<span style="color: #0000ff">int</span>&gt;();<br />    <span style="color: #0000ff">using</span> (SqlCommand cmdUnAvailable = <span style="color: #0000ff">new</span> SqlCommand(selectCount, conn))<br />    {<br />        cmdUnAvailable.Parameters.Add(<span style="color: #006080">&quot;@MaxPerSlot&quot;</span>, SqlDbType.Int).Value = maxPerSlot;<br />        <span style="color: #0000ff">using</span> (SqlDataReader readerUnavailable = cmdUnAvailable.ExecuteReader())<br />        {<br />            <span style="color: #0000ff">try</span><br />            {<br />                <span style="color: #0000ff">while</span> (readerUnavailable.Read())<br />                {<br />                    <span style="color: #0000ff">int</span> id = readerUnavailable.GetInt32(0);<br />                    unavailableSlotsList.Add(id);<br />                }<br />            }<br />            <span style="color: #0000ff">finally</span><br />            {<br />                <span style="color: #0000ff">if</span> (readerUnavailable != <span style="color: #0000ff">null</span>)<br />                    readerUnavailable.Close();<br />            }<br />        }<br />    }</pre>
<p>&#160; </p></div>
<div>
  </div>
<h2>Compress To Lambda Expression Refactoring</h2>
<p>A lot of the Silicon Valley Code Camp web site was written prior to the introduction of Lamba Expressions.&#160; If you recall, I wrote an MSDN article back in 2006 entitled <a href="/2006/03/13/adding-personalization-via-profiles-to-the-objectdatasource-in-aspnet-20/">Adding Personalization via Profiles to the ObjectDataSource in ASP.NET 2.0.</a>&#160; <a href="http://blogs.tedneward.com/">Ted Neward</a> inspired a construct to cleverly sort the result list using delegates as shown in the screen shot (form that above post).</p>
<p><a href="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image_thumb_3.png" width="569" height="353" /></a> </p>
<p>&#160;</p>
<p>The code below is similar to the above but not quite the same.&#160; This is how it looks before the refactoring:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">Comparison&lt;DataObjectSessionsOverview&gt; comparison = <span style="color: #0000ff">null</span>;<br />    <span style="color: #0000ff">switch</span> (sortDataBase)<br />    {<br />        <span style="color: #0000ff">case</span> <span style="color: #006080">&quot;Userfirstname&quot;</span>:<br />            comparison = <span style="color: #0000ff">new</span> Comparison&lt;DataObjectSessionsOverview&gt;(<br />               <span style="color: #0000ff">delegate</span>(DataObjectSessionsOverview lhs, DataObjectSessionsOverview rhs)<br />               {<br />                   <span style="color: #0000ff">return</span> lhs.Userfirstname.CompareTo(rhs.Userfirstname);<br />               }<br />             );<br />            <span style="color: #0000ff">break</span>;</pre>
<p></div>
<p>CodeRush suggests:</p>
<p><a href="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AnotherNiceDevExpressCodeRushRefactoring_8873/image_thumb_4.png" width="551" height="245" /></a> </p>
<p>Which then give us:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">switch</span> (sortDataBase)<br />{<br />   <span style="color: #0000ff">case</span> <span style="color: #006080">&quot;Userfirstname&quot;</span>:<br />       comparison = (lhs, rhs) =&gt; lhs.Userfirstname.CompareTo(rhs.Userfirstname);<br />       <span style="color: #0000ff">break</span>;</pre>
<p></div>
<p>I like it!</p>
