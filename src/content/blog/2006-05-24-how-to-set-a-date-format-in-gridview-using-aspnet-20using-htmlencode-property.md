---
status: publish
published: true
pubDatetime: 2006-05-24T20:00:00.000Z
title: How To Set a Date Format In GridView Using ASP.NET 2.0(Using HtmlEncode Property)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 22
wordpress_url: https://peterkellner.net/?p=36
date: '2006-05-24 11:57:48 -0700'
date_gmt: '2006-05-24 18:57:48 -0700'
categories:
- ".Net 2.0"
- ASP.NET 2.0
tags: []
---
<h2 align="left">(AKA, the DataFormatString="{0:M-dd-yyyy}" Problem)</h2>
<p>&nbsp;</p>
<div>
<div>
<p>A very common desire is to set a column of a <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.gridview.aspx">GridView</a> to display just the month, day and year of a DateTime type. The problem is the by default, the <a href="http://msdn.microsoft.com/en-us/library/system.web.httpserverutility.htmlencode.aspx">HtmlEncode</a> property of the <a href="http://msdn.microsoft.com/en-us/library/e6f329ah(v=VS.100).aspx">BoundField</a> attribute ( &lt;asp:BoundField ...) is set to True. The reason for this (<a href="http://msdn2.microsoft.com/en-us/library/system.web.ui.webcontrols.boundfield.htmlencode.aspx">as pointed out in the documentation of this attribute</a>) is that this helps prevent cross-site scripting attacks and malicious content from being displayed. Microsoft recommends that the <a href="http://msdn.microsoft.com/en-us/library/system.web.httpserverutility.htmlencode.aspx">HtmlEncode</a> attribute be enabled whenever possible.</p>
<div class="peterkellnerpromo"><a href="/contact" target="_blank">If you have a problem like this involving ASP.NET WebForms or MVC, consulting services are available. This is quite an old post, but still relevant even as we head into 2012 with the next Visual Studio coming soon and an updated WebForms model! Contact Peter Kellner and his associates here</a>.</div>
</div>
</div>
<p> [wp_ad_camp_1]<br />
<!--more--></p>
<p>The problem is that if this field is enabled, you can not pass format information to the boundfield control. That is, if you try the following code, you will not get the desired result.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span>
  <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">headertext</span><span style="color: #0000ff;">="CreationDate"</span> <span style="color: #ff0000;">dataformatstring</span><span style="color: #0000ff;">="{0:M-dd-yyyy}"</span> 
       <span style="color: #ff0000;">datafield</span><span style="color: #0000ff;">="CreationDate"</span> <span style="color: #ff0000;">:BoundField</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">asp</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p align="left">You have two choices to make this work as you would expect. The first choice is to simply set HtmlEncode to false as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="GridView1"</span> <span style="color: #ff0000;">runat</span><span style="color: #0000ff;">="server"</span> <span style="color: #ff0000;">:GridView</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #0000ff;">&lt;</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span>
  <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">headertext</span><span style="color: #0000ff;">="CreationDate"</span> <span style="color: #ff0000;">dataformatstring</span><span style="color: #0000ff;">="{0:M-dd-yyyy}"</span> 
       <span style="color: #ff0000;">datafield</span><span style="color: #0000ff;">="CreationDate"</span> <span style="color: #ff0000;">:BoundField</span> <span style="color: #ff0000;">HtmlEncode</span><span style="color: #0000ff;">="false"</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p>The second choice is to make the column a template and simply set the format string directly in the Label or Text Fields as follows.</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="GridView3"</span> <span style="color: #ff0000;">runat</span><span style="color: #0000ff;">="server"</span> <span style="color: #ff0000;">:GridView</span><span style="color: #0000ff;">&gt;</span>
 <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span>
  <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">headertext</span><span style="color: #0000ff;">="CreationDate"</span> <span style="color: #ff0000;">:TemplateField</span><span style="color: #0000ff;">&gt;</span>
   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">edititemtemplate</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="Label1"</span> <span style="color: #ff0000;">runat</span><span style="color: #0000ff;">="server"</span> <span style="color: #ff0000;">Label</span>.<span style="color: #ff0000;">Text</span><span style="color: #0000ff;">='&lt;%# Eval("CreationDate", "{0:M-dd-yyyy}") %&gt;'</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">asp</span><span style="color: #0000ff;">&gt;</span>
   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">edititemtemplate</span><span style="color: #0000ff;">&gt;</span>
   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">itemtemplate</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">asp</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="Label1"</span> <span style="color: #ff0000;">runat</span><span style="color: #0000ff;">="server"</span> <span style="color: #ff0000;">Label</span>.<span style="color: #ff0000;">Text</span><span style="color: #0000ff;">='&lt;%# Bind("CreationDate", "{0:M-dd-yyyy}") %&gt;'</span><span style="color: #0000ff;">&gt;</span>;
    <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">asp</span><span style="color: #0000ff;">&gt;</span>
   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">itemtemplate</span><span style="color: #0000ff;">&gt;</span>
  <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">asp</span><span style="color: #0000ff;">&gt;</span>
 <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">columns</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">asp</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p>Below is a screen shot of what the three scenarios discussed above look like.</p>
<p align="left"><img alt="Output of all three scenarios" src="/wp/wp-content/uploads/2006/05/screenshot.jpg" width="684" height="485" border="1" /></p>
<p align="left">Good luck with your coding and hopefully, this will be one nasty you can put behind you.</p>
