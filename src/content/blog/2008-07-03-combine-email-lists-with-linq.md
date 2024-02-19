---
status: publish
published: true
pubDatetime: 2008-07-03T20:00:00.000Z
title: Using LINQ to Merge Mailing Lists and Filter Opt OutsBuilding the Code Camp
  Web Site (Article 5)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  <br />
  <p>Combining two mailing lists with LINQ, then removing a third is demonstrated in this post.  Using C# 3.0 with .Net 3.5 allows us to leverage LINQ to make this an easy process.  This post shows and explains the LINQ code to do this</p>
  <br />
wordpress_id: 122
wordpress_url: https://peterkellner.net/?p=321
date: '2008-07-03 08:33:39 -0700'
date_gmt: '2008-07-03 15:33:39 -0700'
categories:
- ASP.NET 3.5
- Code Camp Web Site Series
- How Things Work
- LINQ
- ASP.NET 2.0
tags: []
---
<h2>Article Series</h2>
<table border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="100">Article 1:</td>
<td valign="top" width="600"><a href="/2008/05/13/codecampwebsiteseries1/" target="_blank">Best Practices for Building an ASP.NET quality web site</a></td>
</tr>
<tr>
<td>Article 2:</td>
<td><a href="/2008/05/19/codecampwebsiteseries2/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters</a></td>
</tr>
<tr>
<td>Article 3:</td>
<td><a href="/2008/05/25/codecampwebsiteseries3/">Creating a Theme For Each Year of Code Camp Using Skins in ASP.NET</a></td>
</tr>
<tr>
<td>Article 4:</td>
<td><a href="/2008/06/29/sv-code-camp-web-site-series4/">Creating a Modal Login Window Using the Telerik Modal RadWindow Component</a></td>
</tr>
<tr>
<td>Article 5:</td>
<td><a href="/2008/07/03/combine-email-lists-with-linq/">Using LINQ to Merge Mailing Lists and Filter Opt Outs</a></td>
</tr>
<tr>
<td>Article 6:</td>
<td><a href="/2009/03/27/codecampwebsiteseries6-cssfriendly-adapters-aspnet-menu/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters (The Source Code!)</a></td>
</tr>
</tbody>
</table>
<p> <br />
<h2>The Problem</h2>
<p>For the third year in a row, <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley's Code Camp</a> is happening.&#160; The way I've organized the data is that each year I make a fresh new sql server 2005 database catalog.&#160; this means that I have one for 2006, one for 2007 and a new one for 2008.&#160; I want to do a mailing to all people who have registered to previous code camps and who have not registered yet for this code camp.&#160; This way, I can do multiple mailings without worrying about sending to people that who have registered (which would make me look silly for not knowing they registered already).&#160; I do not like when people say things like &quot;Ignore this message if you have registered...&quot;.&#160; In addition we will maintain an opt out list so that people who do not want additional emails sent can request that and not worry about us sending more emails.</p></p>
<p> <!--more--></p>
<h2>The Givens</h2>
<p>So, since this article is about how to solve the problem with LINQ, I will not go into details of how to create the generic lists of email addresses.&#160; Let's assume we have methods that give us these 4 lists. They are:</p>
<ul>
<li>2006 Registered Attendees </li>
<li>2007 Registered Attendees </li>
<li>2008 Registered Attendees </li>
<li>Opt Out Email List </li>
</ul>
<p>&#160;</p>
<h2>The Code</h2>
<p>Below is the C# version 3.0 (.Net 3.5 and asp.net 3.5) that performs this function described in the problem above.&#160; The next section &quot;The Explanation&quot; gives more details on what i s happening.</p>
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span><span class="kwrd">using</span> System.Linq;</pre>
<pre><span class="lnum">   2:  </span>&#160;</pre>
<pre class="alt"><span class="lnum">   3:  </span><span class="rem">/// &lt;summary&gt;</span></pre>
<pre><span class="lnum">   4:  </span><span class="rem">/// shows all non registered users by going </span></pre>
<pre class="alt"><span class="lnum">   5:  </span><span class="rem">/// through past years and making a</span></pre>
<pre><span class="lnum">   6:  </span><span class="rem">/// unique query.</span></pre>
<pre class="alt"><span class="lnum">   7:  </span><span class="rem">/// &lt;/summary&gt;</span></pre>
<pre><span class="lnum">   8:  </span><span class="rem">/// &lt;returns&gt;List of all non-registered </span></pre>
<pre class="alt"><span class="lnum">   9:  </span><span class="rem">/// code campers form previous years&lt;/returns&gt;</span></pre>
<pre><span class="lnum">  10:  </span><span class="kwrd">public</span> <span class="kwrd">static</span> List&lt;ListItem&gt; LoadAllUnRegisteredCodeCampUsers()</pre>
<pre class="alt"><span class="lnum">  11:  </span>{</pre>
<pre><span class="lnum">  12:  </span>&#160;</pre>
<pre class="alt"><span class="lnum">  13:  </span>    List&lt;<span class="kwrd">string</span>&gt; codeCampersCurrentYear = </pre>
<pre><span class="lnum">  14:  </span>        GetEmailsFromPreviousYear(<span class="str">&quot;CodeCampSV06&quot;</span>);</pre>
<pre class="alt"><span class="lnum">  15:  </span>&#160;</pre>
<pre><span class="lnum">  16:  </span>    List&lt;<span class="kwrd">string</span>&gt; emailOptOut2008 = </pre>
<pre class="alt"><span class="lnum">  17:  </span>        GetDoNotRemoveList(<span class="str">&quot;CodeCampSV06&quot;</span>);</pre>
<pre><span class="lnum">  18:  </span>&#160;</pre>
<pre class="alt"><span class="lnum">  19:  </span>    List&lt;<span class="kwrd">string</span>&gt; codeCampers2007 = </pre>
<pre><span class="lnum">  20:  </span>        GetEmailsFromPreviousYear(<span class="str">&quot;PASTSV07&quot;</span>);</pre>
<pre class="alt"><span class="lnum">  21:  </span>&#160;</pre>
<pre><span class="lnum">  22:  </span>    List&lt;<span class="kwrd">string</span>&gt; codeCampers2006 = </pre>
<pre class="alt"><span class="lnum">  23:  </span>        GetEmailsFromPreviousYear(<span class="str">&quot;PASTSV06&quot;</span>);</pre>
<pre><span class="lnum">  24:  </span>&#160;</pre>
<pre class="alt"><span class="lnum">  25:  </span>    <span class="rem">// Make Combined List of 06 and 07 and unique it </span></pre>
<pre><span class="lnum">  26:  </span>    <span class="rem">// (duplicates are removed in Union)</span></pre>
<pre class="alt"><span class="lnum">  27:  </span>    IEnumerable&lt;<span class="kwrd">string</span>&gt; uniqueNamesQuery =</pre>
<pre><span class="lnum">  28:  </span>        codeCampers2006.Union(codeCampers2007).OrderBy(s =&gt; s);</pre>
<pre class="alt"><span class="lnum">  29:  </span>&#160;</pre>
<pre><span class="lnum">  30:  </span>    var emailListBeforeOptOut = </pre>
<pre class="alt"><span class="lnum">  31:  </span>        uniqueNamesQuery.Except(codeCampersCurrentYear);</pre>
<pre><span class="lnum">  32:  </span>&#160;</pre>
<pre class="alt"><span class="lnum">  33:  </span>    var emaiListAfterOptOut = </pre>
<pre><span class="lnum">  34:  </span>        emailListBeforeOptOut.Except(emailOptOut2008);</pre>
<pre class="alt"><span class="lnum">  35:  </span>&#160;</pre>
<pre><span class="lnum">  36:  </span>    List&lt;ListItem&gt;  finalList = <span class="kwrd">new</span> List&lt;ListItem&gt;();</pre>
<pre class="alt"><span class="lnum">  37:  </span>    <span class="kwrd">foreach</span> (<span class="kwrd">string</span> s <span class="kwrd">in</span> emaiListAfterOptOut)</pre>
<pre><span class="lnum">  38:  </span>    {</pre>
<pre class="alt"><span class="lnum">  39:  </span>        finalList.Add(<span class="kwrd">new</span> ListItem(s,s));</pre>
<pre><span class="lnum">  40:  </span>    }</pre>
<pre class="alt"><span class="lnum">  41:  </span>    <span class="kwrd">return</span> finalList;</pre>
<pre><span class="lnum">  42:  </span>}</pre>
<pre class="alt"><span class="lnum">  43:  </span>&#160;</pre>
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
<p>&#160;</p>
<h2>The Explanation</h2>
<p>The first line (1) is required because all the LINQ methods we are using are static extension methods.&#160; This means, that without referencing the LINQ namespace, the methods OrderBy,Except and Union would not be available to us.</p>
<p>Lines 13 to 23 call methods that populate our generic lists of strings.&#160; The reason this is done is because each of these lists come from different <a href="http://www.microsoft.com/SQL/default.mspx">SQL Server 2005</a> database catalogs. This can probably be done in <a href="http://msdn.microsoft.com/en-us/netframework/aa904594.aspx">LINQ</a> but I thought it was easier to do it this way.</p>
<p>Line 27 creates a list of unique names.&#160; The Union method has the added benefit of eliminating duplicates.&#160; OrderBy(s=&gt;s) simply creates an annonymous delegate that takes in a string and returns a string so that is what gets sorted.&#160; After giving this some thought, I'm not sure the OrderBy really helps us in anyway but this is a tutorial type article so I'm leaving it in.</p>
<p>Line 33 removes all the people who have asked to be opted out of the email.&#160; It uses the static extension method Except.</p>
<p>Finally, line 36 to 40 creates a generic list of ListItems which is what is returned by the method.&#160; ListItem's are returned primarily because the calling method shows a list of checkboxes and this makes it easy.</p>
<p>&#160;</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>LINQ is a great tool for managing collections.&#160; In this case we demonstrated how to take 4 generic lists of strings (collections), do some simple set operations (union,except,orderby) and produce a list of emails we want to send.&#160; Not only is it simple to code, it's easy to maintain because the method names are so descriptive.&#160;&#160; Hopefully, this will help with your similar programming efforts.&#160; Best of luck.</p>
