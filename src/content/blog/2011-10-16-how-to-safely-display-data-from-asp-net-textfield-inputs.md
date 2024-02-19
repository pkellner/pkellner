---
status: publish
published: true
pubDatetime: 2011-10-16T20:00:00.000Z
title: How To Safely Display Data From ASP.NET TextField Inputs
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1607
wordpress_url: https://peterkellner.net/2011/10/16/how-to-safely-display-data-from-asp-net-textfield-inputs/
date: '2011-10-16 16:35:00 -0700'
date_gmt: '2011-10-16 23:35:00 -0700'
categories:
- Best Practices
- ASP.NET 4.0
tags: []
---
<p>Let’s say you have a user input field that you want the user to type data into which will be later displayed back to the user.&#160; You don’t want the user putting in their own html or other things (like javascript tags) because that could cause bad things to happen on your page.&#160; </p>
<p>The easiest thing to do is to set the page attribute to not do request validation</p>
<div id="codeSnippetWrapper">&#160;</div>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="background-color: #ffff00">&lt;%@ Page Title=&quot;&quot; Language=&quot;C#&quot; MasterPageFile=&quot;~/DefaultNoColumns.master&quot; AutoEventWireup=&quot;true&quot; ValidateRequest=&quot;false&quot;<br />    CodeFile=&quot;SponsorInformationEdit.aspx.cs&quot; Inherits=&quot;SponsorInformationEdit&quot; %&gt;</span></pre>
<p></div>
<div id="codeSnippetWrapper">
  </div>
<p>Then, store whatever the user types in the textbox including the nasty things like &lt;script …</p>
<p>When you get around to displaying the data back, simply encode it like this:</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">LabelShortDescription.Text = HttpUtility.HtmlEncode(rec.CompanyDescriptionShort);</pre>
<p></div>
<p>Then, if the user put a bold tag in the html, they will get this displayed back:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/10/image5.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/10/image_thumb2.png" width="402" height="104" /></a></p>
<p>and no harm will occur.</p>
