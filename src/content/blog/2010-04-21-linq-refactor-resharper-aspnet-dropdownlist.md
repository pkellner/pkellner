---
status: publish
published: true
pubDatetime: 2010-04-21T20:00:00.000Z
title: ReSharper 5.0&rsquo;s LINQ Refactoring Continues to be Amazing!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1274
wordpress_url: https://peterkellner.net/2010/04/21/linq-refactor-resharper-aspnet-dropdownlist/
date: '2010-04-21 17:46:00 -0700'
date_gmt: '2010-04-22 00:46:00 -0700'
categories:
- ASP.NET 3.5
- LINQ
- ReSharper
tags: []
---
<p>&#160;</p>
<p>In this post, we’ll take a straight forward procedure based set of code and convert it to <a href="http://msdn.microsoft.com/en-us/netframework/aa904594.aspx">LINQ</a> using a <a href="http://www.jetbrains.com/resharper/whatsnew/">ReSharper</a> from <a href="http://www.jetbrains.com/index.html">JetBrains</a> suggestion.&#160;&#160; I’ve found that in general, when I do things with foreach syntax, there is often a better way in Linq to do this.&#160; The better does not jump out at me sometimes, however with ReSharper, it is often a button click away.</p>
<p> <!--more-->
<p>The initial code is as follows:</p>
<pre class="csharpcode"><span class="kwrd">int</span> selectedIndex = 0;
<span class="kwrd">foreach</span> (var rec <span class="kwrd">in</span> codeCampStringDictionary)
{
    <span class="kwrd">if</span> (rec.Key == codeCampYear)
    {
        <span class="kwrd">break</span>;
    }
    selectedIndex++;
}</pre>
<p>And, <a href="http://www.jetbrains.com/resharper/">ReSharper</a> is going to suggest turning it into:</p>
<pre class="csharpcode"><span class="kwrd">int</span> selectedIndex = codeCampStringDictionary.TakeWhile(rec =&gt; rec.Key != codeCampYear).Count();</pre>
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
<p>Simply Amazing!&#160; <a href="http://www.hookedonlinq.com/TakeWhileOperator.ashx">TakeWhile</a> had not even occurred to me.</p>
<p>(All while getting the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> Site Ready for our V5 Event, October 9th and 10th, 2010)</p>
<p>So, to explain the problem a little better, on the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> web site (which, by the way is scheduled for October 9th and 10th, 2010 this year), we have an ASP.NET <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.dropdownlist.aspx">DropDownList</a> in the upper right hand corner that the user can switch between different years. That is, say they want to see all the sessions in 2008’s code camp, they can simply change the dropdown and the site completely updates.&#160; When they do this, we don’t want to re-read the data table that contains the code camp years, we simply want to process the data that has already been stored in the <a href="http://msdn.microsoft.com/en-us/library/ms972976.aspx">ViewState</a> of the DropDownList and use that to figure out the key value of the table entry for the code camp year they selected.</p>
<p><a href="/FilesForWebDownload/ReS.0sLINQRefactoringContinuestobeAmazin_F9C9/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/ReS.0sLINQRefactoringContinuestobeAmazin_F9C9/image_thumb.png" width="632" height="172" /></a> </p>
<p>OK, if you didn’t follow all that, it really doesn’t matter.&#160; This blog post is simply about how clever ReSharper is and how much I enjoy what the tool does.&#160; It’s nice to have a tool teach me things!</p>
<p>The complete commented code is below that includes some comments about how it actually works.&#160; I’m looking forward to several people posting comments letting me know that there is even a simpler way to do this.&#160;&#160; I love my job!</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #008000">// Create a dictionary out of values in a DropDownList.  That is,</span><br /><span style="color: #008000">// the DropDownList has a Key Value which is it's primary key</span><br /><span style="color: #008000">// and a text value which is the Code Camp Year.</span><br />Dictionary&lt;<span style="color: #0000ff">int</span>, <span style="color: #0000ff">string</span>&gt; codeCampStringDictionary =<br />    DropDownListCodeCampYearID.Items.Cast&lt;ListItem&gt;().<br />        OrderBy(a =&gt; a.Value).<br />        ToDictionary(itemdd =&gt; Convert.ToInt32(itemdd.Value),<br />                     itemdd =&gt; itemdd.Text);<br /><br /><span style="color: #008000">// Then, loop through the values in the dictionary and figure out</span><br /><span style="color: #008000">// the offset of a particular value.  That is, if there are 3 values</span><br /><span style="color: #008000">// in the list of 2008,2009,2010 which have primary keys of 3,4,5</span><br /><span style="color: #008000">// we want to know, that given codeCampYear is 4, then selectedIndex </span><br /><span style="color: #008000">// is the second value and should be 2.</span><br /><span style="color: #0000ff">int</span> selectedIndex = codeCampStringDictionary.TakeWhile<br />    (rec =&gt; rec.Key != codeCampYear).Count();<br /><br /><span style="color: #0000ff">string</span> dateString = Utils.GetCodeCampDateStringByCodeCampYearId(codeCampYear);<br />DropDownListCodeCampYearID.SelectedIndex = selectedIndex;<br />HeaderId1.Text = String.Format(<span style="color: #006080">&quot;Saturday and Sunday, {0}&quot;</span>, dateString);<br /></pre>
<p></div>
<p>Let the comments roll! </p>
