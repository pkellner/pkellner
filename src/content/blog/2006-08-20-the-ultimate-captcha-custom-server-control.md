---
status: publish
published: true
pubDatetime: 2006-08-20T20:00:00.000Z
title: The Ultimate CAPTCHA Custom Server Control
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  <p>In this article, the basic usage of a CAPTCHA custom server control will be discussed. This control is for use in ASP.NET 2.0 only. It is provided in source as well as executable form which means you can use it in your app_code or bin directly. If you use the DLL version, it will support drag and drop from the Visual Studio 2005 Toolbox. The control supports templates which means you can customize it to work in your application giving a consistent look and feel. </p>
  <p>Below are two representations of the use of the CAPTCHA custom server control. One is simply using the control in it's default configuration with no template, and the other is after modifying the controls template with extra contact information.</p>
  <p><img src="/wp/Images/Captcha/Abstract_controlsamples.jpg" alt="" width="650" height="442" /></p>
wordpress_id: 28
wordpress_url: https://peterkellner.net/2006/08/20/the-ultimate-captcha-custom-server-control/
date: '2006-08-20 19:26:05 -0700'
date_gmt: '2006-08-21 02:26:05 -0700'
categories:
- ".Net 2.0"
- Custom Controls
- ASP.NET 2.0
tags: []
---
<p><a href="/wp/wp-content/uploads/2006/08/CaptchaUltimateCustomControl_Build13.zip"><strong>Download Source to this article</strong></a></p>
<table border="0" cellspacing="0" cellpadding="5" width="600">
<tbody>
<tr>
<td>Author:</td>
<td>Peter Kellner, 73rd Street Associates</td>
</tr>
<tr>
<td>Date:</td>
<td>August 20, 2006</td>
</tr>
<tr>
<td>Location:</td>
<td>San Jose, California USA</td>
</tr>
<tr>
<td>Topic:</td>
<td>Custom Server Control for CAPTCHA, Part 1 Usage</td>
</tr>
</tbody>
</table>
<h2>Background</h2>
<p>CAPTCHA stands for (<strong>C</strong>ompletely <strong>A</strong>utomated <strong>P</strong>ublic <strong>T</strong>uring test to tell <strong>C</strong>omputers and <strong>H</strong>umans <strong>A</strong>part). The technology was originally developed at Carnegy Mellon University to help tell the difference between a human entering data into a computer system and a machine. The process typically involves showing the user a distorted picture of text and numbers, then the user must interpret this, type what they see into a text field and the computer checks for correctness. Below is a picture of a typical CAPTCHA expression. <a href="http://en.wikipedia.org/wiki/Captcha">Wikipedia has a nice definition for CAPTCHA here</a>.</p>
<p><img alt="Typical Captcha Image" src="/wp/wp-content/uploads/2006/08/CaptchaType2.gif" width="140" height="50" /></p>
<p> <!--more--><br />
<h2>Abstract</h2>
<p>In this article, the basic usage of a CAPTCHA custom server control will be discussed. This control is for use in ASP.NET 2.0 only. It is provided in source as well as executable form which means you can use it in your app_code or bin directly. If you use the DLL version, it will support drag and drop from the Visual Studio 2005 Toolbox. The control supports templates which means you can customize it to work in your application giving a consistent look and feel.</p>
<p>Below are two representations of the use of the CAPTCHA custom server control. One is simply using the control in it's default configuration with no template, and the other is after modifying the controls template with extra contact information.</p>
<p><img src="/wp/wp-content/uploads/2006/08/Abstract_controlsamples.jpg" /></p>
<h2>Simple Usage Scenario</h2>
<p>Assuming you have installed the Ultimate CAPTCHA control correctly, you will see in your Visual Studio 2005 Toolbox the CAPTCHA Control. Below is a screen shot of this.</p>
<p><img src="/wp/wp-content/uploads/2006/08/DesignerWithControl.jpg" /></p>
<p>Notice the first entry in the toolbox is the CaptchaUltimateControl. This control was placed on the work surface by dragging and dropping it. What you are seeing is the default control with no template (we will learn more about that later). Then, after the control is dropped on the work surface, you can select it and you will see a list of properties in the properties dialog. These properties can be changed and the control will dynamically update on your work surface. Below is a more detailed list of the properties you can set and what they mean.</p>
<table border="0" cellspacing="5" width="680">
<tbody>
<tr>
<td width="470"><img align="left" src="/wp/wp-content/uploads/2006/08/propertylist.jpg" width="419" height="731" /></td>
<td style="vertical-align: text-top" width="193">There are several properties that are not quite self explanatory. Those are detailed below:
<p><u>CaptchaLength</u>: This is the number of characters to be displayed in the CAPTCHA message</p>
<p><u>CaptchaType</u>: There are two types of CAPTCHA that can be displayed. Type 1 looks like this:</p>
<p><img src="/wp/wp-content/uploads/2006/08/CaptchaType1.gif" width="200" height="50" /></p>
<p>and type 2 looks like this:</p>
<p><img src="/wp/wp-content/uploads/2006/08/CaptchaType2.gif" width="140" height="50" /></p>
<p><u>ShowRecalculateCaptchaButton</u>: This lets you display a button the user can press to show a different number. They may have trouble reading the first one.</p>
</td>
</tr>
</tbody>
</table>
<h2>Installation</h2>
<p>Since we have seen what it looks like to use the control, we now need to discuss the steps to install it for use. It is possible to use the control without a DLL, however because the control uses embedded resources (image files), you would need to make modifications to the source for this to work. In this article, I will only discuss using the control as a DLL. Using the DLL approach gives you the most flexibility as well.</p>
<h2>Extract the download to an empty directory</h2>
<p>First step is to extract the download associated with this article into an empty directory that Visual Studio 2005 can access. Basically, there are two projects in this download. The Class Library project called CaptchaUltimateCustomControl is the project that builds the DLL you will be using in either your C# or VB Web Application Project. The second project is called SampleApp is just simply a sample application built that uses the custom control.</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_twosolutions.jpg" width="383" height="417" /></p>
<p>In the sample project, there are three sample pages for demonstration. DefaultNoCustomTemplate.aspx shows building the CAPTCHA control without using a custom template. DefaulDefaultTemplate.aspx shows what happens when you enable a template and make no changes, and DefaultCustomTemplate.aspx shows a more elaborate custom template that can be used for collecting more details information such as name, website, comments, etc. More details will be presented below on these examples. You should be able to run all three sample pages directly now.</p>
<h2>Using the Custom CAPTCHA control in your own Project</h2>
<p>In order to use the CAPTCHA control in your own project you need to do two things. First, you need to reference the DLL created by the CaptchaUltimateCustomControl project, then you need to add a reference to it as an HttpHandler in your projects web.config.</p>
<h3>1. Adding the DLL reference</h3>
<p>First, open the project you want to add a reference to the DLL from. Next, go to the Solutions Explorer tab, right click and say &quot;Add Existing Project&quot; as is show below.</p>
<table border="1">
<tbody>
<tr>
<td><img src="/wp/wp-content/uploads/2006/08/vs2005_addexistingproject.jpg" width="580" height="548" /></td>
</tr>
</tbody>
</table>
<p>Choose the csproj file where you downloaded your CaptchaCustomControl as follows.</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_locationexistingfile.jpg" width="650" height="510" /></p>
<p>At this point, you should see the CAPCHA custom control on your ToolBox. If you don't, I've had the same problem and I understand Microsoft knows about it. Sometimes, exiting and reentering VS2005 clears it up, other times it doesn't and you may have to load your control by hand. <a href="http://forums.asp.net/thread/1181483.aspx">Here is a reference to the bug in vs2005</a> by an asp.net team member from Microsoft. If anyone find a solution to this, please let me know. It is a very frustrating problem if you are building custom controls and using the vs2005 designer.</p>
<p>If it worked correctly, you should see a reference to the control on the tool bar as is shown below.</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_toolboxexample.jpg" width="380" height="242" /></p>
<h3>2. Adding a Reference to the HttpHandler in Web.Config</h3>
<p>In order for the control to work correctly both in design and runtime mode, you must add the HttpHandler to your web.config file. If you do not do this, you will not see the actual CAPTCHA image appear in your control. The lines are already added to the SampleApp project's web.config file in the download so you can use that as a reference. Otherwise, just enter the below lines in your web.config file in the &lt;system.web&gt; section.</p>
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
<pre class="csharpcode">    <span class="kwrd">&lt;</span><span class="html">configuration</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">system.web</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">httpHandlers</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">type</span>=“<span class="attr">PeterKellner</span>.<span class="attr">Utils</span>.<span class="attr">CaptchaTypeHandler</span>“
            <span class="attr">verb</span>=“<span class="attr">GET</span>“ <span class="attr">path</span>=“<span class="attr">CaptchaType</span>.<span class="attr">ashx</span>“<span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">httpHandlers</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;!</span>–…–<span class="kwrd">&gt;</span></pre>
<p>I understand that having to add this to the web.config file is a rather unpleasant burden to place on the custom control user. Fritz Onion has proposed a very clever way of getting around this dependency by having the control actually call itself. I actually followed that pattern but then realized (as others including Fritz had pointed out) that if the page were used in a scenario where URL rewriting was happening, very unexpected and incorrect results would happen. Following the principle of &quot;least surprise&quot;, I decided against including this as part of the generic solution. If anyone can suggest a solution that does not involve having to register an HttpHandler, I'd be happy to include it.</p>
<h2>Custom Template Support</h2>
<p>Before talking about custom template support, it's worth briefly noting what happens when you drag the CAPTCHA custom server control on a page. Basically, two things happen. First a registration line is added to the page telling the aspx page about possible control references to a given tag, and second, the actual control with this special tag is added to the page. Below shows a typical aspx page where this drag and drop has happened.</p>
<pre class="csharpcode"><span class="asp">&lt;%@ Page Language=”C#” AutoEventWireup=”true” CodeFile=”DefaultNoTemplate.aspx.cs”
    Inherits=”_Default” %&gt;</span>
 
<span class="asp">&lt;%@ Register Assembly=”CaptchaUltimateCustomControl” Namespace=”PeterKellner.Utils”
    TagPrefix=”CAPTCHA” %&gt;</span>
<span class="kwrd">&lt;!</span><span class="html">DOCTYPE</span> <span class="attr">html</span> <span class="attr">PUBLIC</span> “<span class="attr">-</span>//<span class="attr">W3C</span>//<span class="attr">DTD</span> <span class="attr">XHTML</span> <span class="attr">1</span>.<span class="attr">0</span> <span class="attr">Transitional</span>//<span class="attr">EN</span>” “<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">TR</span>/<span class="attr">xhtml1</span>/<span class="attr">DTD</span>/<span class="attr">xhtml1-transitional</span>.<span class="attr">dtd</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">www</span>.<span class="attr">w3</span>.<span class="attr">org</span>/<span class="attr">1999</span>/<span class="attr">xhtml</span>”<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">id</span>=”<span class="attr">Head1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Default Simple Template<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span>=”<span class="attr">form1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">CAPTCHA:CaptchaUltimateControl</span> <span class="attr">ID</span>=”<span class="attr">CaptchaUltimateControl1</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">CAPTCHA:CaptchaUltimateControl</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p>If you look at this page shown above in source, in design view, and single click on the smart tag on the controls upper right hand corner, you will get a menu with three choices: Convert to Template; Reset; and Edit Templates. Below is a picture of these three choices.</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_templatemenu.jpg" width="622" height="239" /></p>
<p>If you choose &quot;Convert to template&quot;, the lines:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">CAPTCHA:CaptchaUltimateControl</span> <span class="attr">ID</span>=”<span class="attr">CaptchaUltimateControl1</span>″  <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;/</span><span class="html">CAPTCHA:CaptchaUltimateControl</span><span class="kwrd">&gt;</span></pre>
<p>Become:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">CAPTCHA:CaptchaUltimateControl</span> <span class="attr">ID</span>=”<span class="attr">CaptchaUltimateControl1</span>″  <span class="attr">runat</span>=”<span class="attr">server</span>”  <span class="attr">ButtonRedisplayCaptchaText</span>=”<span class="attr">Generate</span> <span class="attr">New</span> <span class="attr">Display</span> <span class="attr">Number</span>”
    <span class="attr">CaptchaBackgroundColor</span>=”<span class="attr">White</span>” <span class="attr">CaptchaBorder</span>=”<span class="attr">1</span>″ <span class="attr">CaptchaLength</span>=”<span class="attr">4</span>″ <span class="attr">CaptchaType</span>=”<span class="attr">2</span>″
    <span class="attr">CommandArg1</span>=”<span class="kwrd">&quot; CommandArg2=”&quot;</span> <span class="attr">CommandArg3</span>=”<span class="kwrd">&quot; CommandArg4=”&quot;</span> <span class="attr">CommandArg5</span>=”<span class="kwrd">&quot; EncryptedValue=”&quot;</span>
    <span class="attr">FontFamilyString</span>=”<span class="attr">Courrier</span> <span class="attr">New</span>” <span class="attr">HeightCaptchaPixels</span>=”<span class="attr">50</span>″ <span class="attr">InvalidCaptchaMessage</span>=”***”
    <span class="attr">PlainValue</span>=”&quot; <span class="attr">ShowPromo</span>=”<span class="attr">True</span>” <span class="attr">ShowRecalculateCaptchaButton</span>=”<span class="attr">True</span>” <span class="attr">ShowTitle</span>=”<span class="attr">True</span>”
    <span class="attr">Title</span>=”<span class="attr">Captcha</span> <span class="attr">Control</span>” <span class="attr">WidthCaptchaPixels</span>=”<span class="attr">140</span>″<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">bgcolor</span>=”<span class="attr">Aqua</span>” <span class="attr">border</span>=”<span class="attr">1</span>″<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">center</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Label</span> <span class="attr">ID</span>=”<span class="attr">TitleID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>Captcha Control<span class="kwrd">&lt;/</span><span class="html">asp:Label</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">VerificationID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:CustomValidator</span> <span class="attr">ID</span>=”<span class="attr">CustomValidatorID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>***<span class="kwrd">&lt;/</span><span class="html">asp:CustomValidator</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">center</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Image</span> <span class="attr">ID</span>=”<span class="attr">CaptchaImageID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ImageUrl</span>=”~/<span class="attr">CaptchaType</span>.<span class="attr">ashx</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span> <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">center</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Button</span> <span class="attr">ID</span>=”<span class="attr">ButtonDisplayNextID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">Text</span>=”<span class="attr">Generate</span> <span class="attr">New</span> <span class="attr">Display</span> <span class="attr">Number</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">CAPTCHA:CaptchaUltimateControl</span><span class="kwrd">&gt;</span></pre>
<p>When you look at the control in design view, it will look the same as before. That is because the template is layed out the same as the default configuration the control itself builds with dynamic controls. There are however some differences. First, in design mode, if you change the Captcha Type, the displayed image at design time does not change. If you don't have a template, changing CaptchaType will instantly change in the designer the type of CAPTCHA image you see. In addition, certain attributes on the &lt;CAPTCHA:CaptchaUltimateControl&gt; tag will no longer take precedence over what is actually in the template. An example of this is InvalidCaptchaString. You need to actually set the value in the template itself.</p>
<p>A discussion of templates would not be complete without mentioning the types of things that can be done with templates. Simply converting the default control to a template does not buy you anything. However, by enhancing the template to include things like Name, Email, Website, etc can add a lot of power to the control that would otherwise be difficult to encapsulate. Below is a sample template enhanced (called DefaultCustomTemplate.aspx in the download).</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_enhancedtemplate.jpg" width="650" height="656" /></p>
<p>And, the source view of this control is as follows:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">CAPTCHA:CaptchaUltimateControl</span> <span class="attr">ID</span>=”<span class="attr">CaptchaUltimateControl1</span>″  <span class="attr">runat</span>=”<span class="attr">server</span>”  <span class="attr">ButtonRedisplayCaptchaText</span>=”<span class="attr">Generate</span> <span class="attr">New</span> <span class="attr">Display</span> <span class="attr">Number</span>”
    <span class="attr">CaptchaBackgroundColor</span>=”<span class="attr">White</span>” <span class="attr">CaptchaBorder</span>=”<span class="attr">1</span>″ <span class="attr">CaptchaLength</span>=”<span class="attr">4</span>″ <span class="attr">CaptchaType</span>=”<span class="attr">2</span>″
    <span class="attr">CommandArg1</span>=”<span class="kwrd">&quot; CommandArg2=”&quot;</span> <span class="attr">CommandArg3</span>=”<span class="kwrd">&quot; CommandArg4=”&quot;</span> <span class="attr">CommandArg5</span>=”<span class="kwrd">&quot; EncryptedValue=”&quot;</span>
    <span class="attr">FontFamilyString</span>=”<span class="attr">Courrier</span> <span class="attr">New</span>” <span class="attr">HeightCaptchaPixels</span>=”<span class="attr">50</span>″ <span class="attr">InvalidCaptchaMessage</span>=”<span class="attr">Try</span> <span class="attr">Again</span>.”
    <span class="attr">PlainValue</span>=”<span class="kwrd">&quot; ShowPromo=”True” ShowRecalculateCaptchaButton=”True” ShowTitle=”True”
    Title=”&quot;</span> <span class="attr">WidthCaptchaPixels</span>=”<span class="attr">140</span>″ <span class="attr">OnVerified</span>=”<span class="attr">CaptchaUltimateControl1_Verified</span>” <span class="attr">OnVerifying</span>=”<span class="attr">CaptchaUltimateControl1_Verifying</span>”<span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">bgcolor</span>=”<span class="attr">Aqua</span>” <span class="attr">border</span>=”<span class="attr">1</span>″<span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">left</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">h3</span><span class="kwrd">&gt;</span>
                        Leave a Reply<span class="kwrd">&lt;/</span><span class="html">h3</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">TextBoxAuthor</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">literal</span><span class="kwrd">&gt;</span>  Name (required)<span class="kwrd">&lt;/</span><span class="html">literal</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">TextBoxEmail</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">literal</span><span class="kwrd">&gt;</span>  Email (will not be published) (required)<span class="kwrd">&lt;/</span><span class="html">literal</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">TextBoxWebsite</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">literal</span><span class="kwrd">&gt;</span>  Website (Optional)<span class="kwrd">&lt;/</span><span class="html">literal</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">TextBoxComment</span>” <span class="attr">TextMode</span>=”<span class="attr">multiLine</span>” <span class="attr">Rows</span>=”<span class="attr">10</span>″ <span class="attr">Columns</span>=”<span class="attr">60</span>″ <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">left</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:TextBox</span> <span class="attr">ID</span>=”<span class="attr">VerificationID</span>” <span class="attr">Style</span>=”<span class="attr">text-align:</span> <span class="attr">left</span>;” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;&lt;/</span><span class="html">asp:TextBox</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:CustomValidator</span> <span class="attr">ID</span>=”<span class="attr">CustomValidatorID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span>Try Again.<span class="kwrd">&lt;/</span><span class="html">asp:CustomValidator</span><span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Label</span> <span class="attr">ID</span>=”<span class="attr">TitleID</span>” <span class="attr">Style</span>=”<span class="attr">text-align:</span> <span class="attr">right</span>;” <span class="attr">runat</span>=”<span class="attr">server</span>”<span class="kwrd">&gt;</span> <span class="kwrd">&lt;/</span><span class="html">asp:Label</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
                <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">colspan</span>=”<span class="attr">2</span>″ <span class="attr">style</span>=”<span class="attr">text-align:</span> <span class="attr">left</span>;”<span class="kwrd">&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Image</span> <span class="attr">ID</span>=”<span class="attr">CaptchaImageID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">ImageUrl</span>=”~/<span class="attr">CaptchaType</span>.<span class="attr">ashx</span>” <span class="kwrd">/&gt;</span>
                    <span class="kwrd">&lt;</span><span class="html">asp:Button</span> <span class="attr">ID</span>=”<span class="attr">ButtonDisplayNextID</span>” <span class="attr">runat</span>=”<span class="attr">server</span>” <span class="attr">Text</span>=”<span class="attr">Show</span> <span class="attr">me</span> <span class="attr">another</span> <span class="attr">set</span> <span class="attr">of</span> <span class="attr">characters</span>” <span class="kwrd">/&gt;</span>
                <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">CAPTCHA:CaptchaUltimateControl</span><span class="kwrd">&gt;</span></pre>
<p>Now that you have the control, the obvious thing to wonder is how to easily use it. For that, you really need event processing. That is what is discussed in the next section.</p>
<h2>Event Handling</h2>
<p>So, why do we need event handling? Well, I can think of two reasons. The first reason is to allow the CAPTCHA processing to be ignored, say in the case where an already authorized user is running the application, and second so that you can do something when a correct CAPTCHA is verified.</p>
<p>Lets take a look at both cases together for brevity. First thing you want to do is select the Custom CAPTCHA server control in the design mode, right click on properties, then switch the property viewer to events. You will see two events that can be programmed. They are as below, Verified, and Verifying.</p>
<p><img src="/wp/wp-content/uploads/2006/08/vs2005_eventlist.jpg" width="536" height="552" /></p>
<p>Just like the login control suppled with ASP.NET 2.0 (no coincidence), Verified is called after a correct CAPTCHA is processed, and Verifying is called just before the verify operation takes place. In the Verifying event (as shown below) you can override the event parameter ForceVerify to be true and say for example you check to see if the current user had admin rights, you could force the verify to succeed regardless of what the user typed into the text field. In the Verified event, you can do all sorts of things including capture information that was typed into template fields, and even redirect the user to a different page if that is what you want. Below is the complete codebehind page to show examples of this.</p>
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
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span>  DefaultCustomTemplate : System.Web.UI.Page
{
 
    <span class="kwrd">private</span> <span class="kwrd">string</span> captchaConfirmed = <span class="kwrd">string</span>.Empty;
    <span class="kwrd">private</span> <span class="kwrd">void</span> Page_PreRenderComplete(<span class="kwrd">object</span> sender, EventArgs e)
    {
        LabelVerified.Text = <span class="kwrd">this</span>.captchaConfirmed;
    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> CaptchaUltimateControl1_Verified(<span class="kwrd">object</span> sender, EventArgs e)
    {

        CaptchaUltimateControl captchaUltimateControl = (CaptchaUltimateControl)sender;
        TextBox textBoxAuthor = (TextBox)captchaUltimateControl.FindControl(“TextBoxAuthor”);
        <span class="kwrd">this</span>.captchaConfirmed = “CAPTCHA Confirmed Event Called with Author “ +
            textBoxAuthor.Text + “.”;
    }

    <span class="kwrd">protected</span> <span class="kwrd">void</span> CaptchaUltimateControl1_Verifying(<span class="kwrd">object</span> sender, VerifyingEventArgs e)
    {
        e.ForceVerify = <span class="kwrd">true</span>;
        <span class="kwrd">this</span>.captchaConfirmed = <span class="kwrd">string</span>.Empty;
    }
}</pre>
<h2>Summary and Conclusions</h2>
<p>In this first part of a series of articles (not written at the time of this first publication), we showed how to use the UltimateCaptchaControl. Currently, on the internet, you can find many CAPTCHA controls written for ASP.NET 2.0. None I could find have so much richness to be useful without a lot of modifications. I've attempted to make this control something you can actually use right away with no changes. The source is of course provided for both study and modifications so you can make changes if you see fit.</p>
<p>The plan for the rest of the series to break down the control into its intrinsic parts and explain those parts piece by piece. Building the control uncovered a lot of areas that are very interesting in the ASP.NET 2.0 environment. Feel free to contact me if you have suggestions for the control or feel you would like something better explained about how it works. I look forward to writing the next several articles on this.</p>
<h2>References</h2>
<p>Many many sources of information have been combined to create the Ultimate CAPTCHA server control. I'd like to briefly mention some of the sources that ideas and code were borrowed from (in no particular order).</p>
<p><a href="http://jason.diamond.name/weblog/">Jason Diamond</a> - Jason actually wrote the skeleton code of the designer portion of the control. Converting to and from a template is far from obvious and I could not glean how to do this on my own. Jason was huge help in contributing this.</p>
<p><a href="http://aspnet.4guysfromrolla.com/articles/082102-1.2.aspx">Scott Mitchell</a> - After many hours of wondering why templates were not working, it occured to me (after using reflector) that the controls in template were hierarchical and not linear. To parse all the controls, I used a short (but clever and recursive class) that <a href="http://www.4guysfromrolla.com/ScottMitchell.shtml">Scott Mitchell</a> published. In addition, <a href="http://www.4guysfromrolla.com/ScottMitchell.shtml">Scott's prolific writing</a> has been helpful in many ways.</p>
<p>Shanku Niyogi - Author of the Blog Starter Kit at Microsoft, Shanku published some very nice code for generating a CAPTCHA image including generating random bubbles on the image. Very nice touch! His code is what creates the Type2 CAPTCHA images</p>
<p>Mike Hall - Mike Hall, AKA BrainJar published work in 2004 on generating CAPTCHA images in asp.net. It was his work that the CAPTCHA type one presented here is derived from</p>
<p><a href="http://www.codeproject.com/aspnet/CaptchaControl.asp">Jeff Atwood</a> - Jeff took Mike Hall's work and extended to be a custom server control. It is from that work that I built the framework of a server control displaying a CAPTCHA image. A very clean implementation. (that hopefully I didn't over complicate too much)</p>
