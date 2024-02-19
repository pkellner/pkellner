---
status: publish
published: true
pubDatetime: 2008-08-06T20:00:00.000Z
title: Assigning a Custom Label Value in a ASP.NET GridView Using ObjectDataSource
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 129
wordpress_url: https://peterkellner.net/2008/08/06/assign-label-in-aspdotnet-to-gridview-in-objectdatasource/
date: '2008-08-06 07:10:07 -0700'
date_gmt: '2008-08-06 14:10:07 -0700'
categories:
- GridView
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<p>In my previous post, <a href="/2008/08/05/assign-dropdownlist-in-aspdotnet-to-gridview-in-objectdatasource/">Assigning a DropDownList Value in a ASP.NET GridView Using ObjectDataSource</a>, I discussed how to put a <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.dropdownlist(VS.80).aspx">DropDownList</a> value in a <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.gridview(VS.80).aspx">GridView</a>.&#160; As I explained, my motivation was to answer a common question that appears on often on the forums.&#160; If you are wondering what my process is for deciding what to answer, there really is no process besides I see yet another question on the forum about this, and rather than answer it again, I write a post explaining it, then point my answer to the question at the post.&#160; This is what I did yesterday and below is the response to this <a href="http://forums.asp.net/p/1300497/2540027.aspx#2540027">forum post</a>.</p>
<p><a href="/wp/wp-content/uploads/2008/08/x2.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="x" src="/wp/wp-content/uploads/2008/08/x-thumb2.png" width="540" height="208" /></a></p>
<p> <!--more-->
<p>So, I have to say one of my main motivations for doing posts is I enjoy helping others through problems.&#160; It gives me a certain satisfaction to know that I have knowledge others may not at any give time and I have a great way to share that knowledge.&#160; It also makes me feel good when others go out of their way to appreciate the effort.&#160; I know when I post questions on forums and get good answers how happy I am, it's good to know others appreciate my efforts.</p>
<p>So, continuing down that path, Here is the code necessary to answer Zimbran's last question.</p>
<p> <!-- code formatted by http://manoli.net/csharpformat/ --><br />
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<div class="csharpcode">
<pre class="alt"><span class="asp">&lt;%@ Page Language=&quot;C#&quot; %&gt;</span></pre>
<pre><span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> <span class="kwrd">&quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;</span> </pre>
<pre class="alt"><span class="kwrd">&quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>ODS DDL Example<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSource1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> </pre>
<pre>            <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span></pre>
<pre class="alt">            <span class="attr">TypeName</span><span class="kwrd">=&quot;BusinessObject&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:ObjectDataSource</span><span class="kwrd">&gt;</span></pre>
<pre>        <span class="kwrd">&lt;</span><span class="html">asp:GridView</span> <span class="attr">ID</span><span class="kwrd">=&quot;GridView1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoGenerateColumns</span><span class="kwrd">=&quot;False&quot;</span> </pre>
<pre class="alt">               <span class="attr">DataKeyNames</span><span class="kwrd">=&quot;Id&quot;</span></pre>
<pre>            <span class="attr">DataSourceID</span><span class="kwrd">=&quot;ObjectDataSource1&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">Columns</span><span class="kwrd">&gt;</span></pre>
<pre>                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Id&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Id&quot;</span> <span class="attr">ReadOnly</span><span class="kwrd">=&quot;True&quot;</span> </pre>
<pre class="alt">                   <span class="attr">SortExpression</span><span class="kwrd">=&quot;Id&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre>                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Name&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Name&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;Name&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">                <span class="kwrd">&lt;</span><span class="html">asp:BoundField</span> <span class="attr">DataField</span><span class="kwrd">=&quot;Email&quot;</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Email&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;Email&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre>                <span class="kwrd">&lt;</span><span class="html">asp:TemplateField</span> <span class="attr">HeaderText</span><span class="kwrd">=&quot;Approved&quot;</span> <span class="attr">SortExpression</span><span class="kwrd">=&quot;Approved&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                    <span class="kwrd">&lt;</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span></pre>
<pre>                        <span class="kwrd">&lt;</span><span class="html">asp:Label</span> <span class="attr">ID</span><span class="kwrd">=&quot;LabelYesOrNo&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> </pre>
<pre class="alt">                           <span class="attr">Text</span><span class="kwrd">='&lt;%# (bool) Eval(&quot;Approved&quot;) ? &quot;Yes&quot; : &quot;No&quot;  %&gt;'</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:Label</span><span class="kwrd">&gt;</span></pre>
<pre>                    <span class="kwrd">&lt;/</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">                <span class="kwrd">&lt;/</span><span class="html">asp:TemplateField</span><span class="kwrd">&gt;</span></pre>
<pre>            <span class="kwrd">&lt;/</span><span class="html">Columns</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;/</span><span class="html">asp:GridView</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
</div>
