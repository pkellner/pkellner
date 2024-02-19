---
status: publish
published: true
pubDatetime: 2011-09-05T20:00:00.000Z
title: Using ASP.NET Web Forms, Passing Primary Key to RowCommand Event
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1565
wordpress_url: https://peterkellner.net/2011/09/05/using-asp-net-web-forms-passing-primary-key-to-rowcommand-event/
date: '2011-09-05 08:01:54 -0700'
date_gmt: '2011-09-05 15:01:54 -0700'
categories:
- C#
- GridView
- ".NET 4.0"
- WebForms
- DataBinding
tags: []
---
<p>&#160;</p>
<p>I know this is old hat, but after recently having a conversation with one of the <a href="http://www.asp.net/">ASP.NET</a> Team guys about how easy <a href="http://www.asp.net/web-forms">Web Forms</a> is to use, I thought I’d just post a simple example of that.&#160; Here is the scenario.&#160; You have a simple <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.gridview.aspx">GridView</a> with just three columns (Select,Id,TagName).&#160; You want to be able to capture what happens when the user pressed the Select command and capture the Id.&#160; It looks like this:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/09/image1.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/09/image_thumb.png" width="196" height="244" /></a></p>
<p>&#160;</p>
<p>And has an aspx page like this:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:GridView</span> <span style="color: #ff0000">ID</span><span style="color: #0000ff">=&quot;GridViewNotSelected&quot;</span> <span style="color: #ff0000">runat</span><span style="color: #0000ff">=&quot;server&quot;</span> <span style="color: #ff0000">AllowSorting</span><span style="color: #0000ff">=&quot;True&quot;</span> <br />        <span style="color: #ff0000">AutoGenerateColumns</span><span style="color: #0000ff">=&quot;False&quot;</span> <br />        <span style="color: #ff0000">DataSourceID</span><span style="color: #0000ff">=&quot;SqlDataSourceTagsNotSelected&quot;</span> <br />        <span style="color: #ff0000">onrowcommand</span><span style="color: #0000ff">=&quot;GridViewNotSelected_RowCommand&quot;</span><span style="color: #0000ff">&gt;</span><br />    <span style="color: #0000ff">&lt;</span><span style="color: #800000">Columns</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:TemplateField</span> <span style="color: #ff0000">ShowHeader</span><span style="color: #0000ff">=&quot;False&quot;</span><span style="color: #0000ff">&gt;</span><br />            <span style="color: #0000ff">&lt;</span><span style="color: #800000">ItemTemplate</span><span style="color: #0000ff">&gt;</span><br />                <span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:LinkButton</span> <span style="color: #ff0000">ID</span><span style="color: #0000ff">=&quot;LinkButton1&quot;</span> <span style="color: #ff0000">runat</span><span style="color: #0000ff">=&quot;server&quot;</span> <br />                    <span style="color: #ff0000">CausesValidation</span><span style="color: #0000ff">=&quot;False&quot;</span> <span style="color: #ff0000">CommandArgument</span><span style="color: #0000ff">='&lt;%# Eval(&quot;Id&quot;) %&gt;'</span><br />                    <span style="color: #ff0000">CommandName</span><span style="color: #0000ff">=&quot;Select&quot;</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">=&quot;Select&quot;</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">asp:LinkButton</span><span style="color: #0000ff">&gt;</span><br />            <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ItemTemplate</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;/</span><span style="color: #800000">asp:TemplateField</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:TemplateField</span> <br />            <span style="color: #ff0000">HeaderText</span><span style="color: #0000ff">=&quot;&amp;amp;nbsp;&amp;amp;nbsp;&amp;amp;nbsp;&amp;amp;nbsp;&amp;amp;nbsp;&amp;amp;nbsp;&quot;</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;/</span><span style="color: #800000">asp:TemplateField</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:TemplateField</span><span style="color: #0000ff">&gt;</span><br />            <span style="color: #0000ff">&lt;</span><span style="color: #800000">ItemTemplate</span><span style="color: #0000ff">&gt;</span><br />                <span style="color: #0000ff">&lt;</span><span style="color: #800000">asp:Label</span> <span style="color: #ff0000">ID</span><span style="color: #0000ff">=&quot;Label1&quot;</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">='&lt;%# Eval(&quot;TagName&quot;) %&gt;'</span> <span style="color: #ff0000">runat</span><span style="color: #0000ff">=&quot;server&quot;</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">asp:Label</span><span style="color: #0000ff">&gt;</span><br />            <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ItemTemplate</span><span style="color: #0000ff">&gt;</span><br />        <span style="color: #0000ff">&lt;/</span><span style="color: #800000">asp:TemplateField</span><span style="color: #0000ff">&gt;</span><br />    <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Columns</span><span style="color: #0000ff">&gt;</span><br /><span style="color: #0000ff">&lt;/</span><span style="color: #800000">asp:GridView</span><span style="color: #0000ff">&gt;</span></pre>
<p></div>
<p></div>
<p>Notice that in the <a href="http://weblogs.asp.net/scottgu/archive/2006/06/04/Supporting-Templates-with-ASP.NET-User-Controls.aspx">TemplateField</a> there is LinkButton with a <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.button.commandargument.aspx">CommandArgument</a> that simply extracts the TagName with the current Id of the <a href="http://msdn.microsoft.com/en-us/library/dz12d98w.aspx">SqlDataSource</a>.&#160; Now, all you need is the <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.gridview.rowcommand.aspx">RowCommand</a> event and you are done.&#160; Here it is in <a href="http://msdn.microsoft.com/en-us/vcsharp/aa336706">C#.</a></p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">protected</span> <span style="color: #0000ff">void</span> GridViewNotSelected_RowCommand(<span style="color: #0000ff">object</span> sender, GridViewCommandEventArgs e)<br />{<br />    <span style="color: #0000ff">int</span> tagsId = Convert.ToInt32(e.CommandArgument);<br />}</pre>
<p></div>
<p>And finally, the proof!</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/09/image2.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/09/image_thumb1.png" width="627" height="118" /></a></p>
<p>&#160;</p>
<p>Very very simple.&#160; HTH’s.</p>
