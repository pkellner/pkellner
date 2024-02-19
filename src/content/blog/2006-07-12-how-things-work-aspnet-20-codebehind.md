---
status: publish
published: true
pubDatetime: 2006-07-12T20:00:00.000Z
title: How Things Work - ASP.NET 2.0 - CodeBehind
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>In this article, a simple asp.net 2.0 page will be taken apart and shown
  how the actual page class is put together. As we know, when an http request comes
  into asp.net through the http pipeline that is destined to be a page (file type
  aspx), the objective of asp.net 2.0 is to create a complete class that encapsulates
  that page request. That page class is an httpHandler of course.</p>"
wordpress_id: 24
wordpress_url: https://peterkellner.net/?p=38
date: '2006-07-12 08:36:41 -0700'
date_gmt: '2006-07-12 15:36:41 -0700'
categories:
- How Things Work
- ASP.NET 2.0
tags: []
---
<h2>Series Theme</h2>
<p>This how-to series is my personal exploration into figuring out not just how to make things work, but how they actually work. The theme behind this series is: &quot;If it's not broken, take it apart and try and figure out why&quot;. I plan on covering many issues in ASP.NET 2.0. If you are interested in a particular part of ASP.NET 2.0 that I have not covered, please <a href="/contact/">contact me</a> and time permitting, I'll see if I can figure out how it works.</p>
<h2>Abstract</h2>
<p>In this article, a simple asp.net 2.0 page will be taken apart and shown how the actual page class is put together. As we know, when an http request comes into asp.net through the http pipeline that is destined to be a page (file type aspx), the objective of asp.net 2.0 is to create a complete class that encapsulates that page request. That page class is an httpHandler of course.</p>
<p> <!--more--><br />
<h2>Example Page</h2>
<p>The Example Page simply has three Labels and one Button. The Labels and buttons will be as follows:</p>
<ul>
<li>Label1 - Gets Date and Time set in Page_Load event </li>
<li>Label2 - Gets Date and Time using databinding </li>
<li>Label3 - Gets Date and Time when button is pressed </li>
<li>Button1 - Puts Date and Time in Label3 as well as executes DataBind on control Label2 </li>
</ul>
<p>Here is the page code below. (CodeBehindSample1.aspx)</p>
<p> 
<pre class="csharpcode"><span class="kwrd">&lt;</span> %@ Page Language=&quot;C#&quot; AutoEventWireup=&quot;true&quot; CodeFile=&quot;CodeBehindSample1.aspx.cs&quot; Inherits=&quot;CodeBehindSample1&quot; <span class="asp">%&gt;</span>
 
<span class="kwrd">&lt;</span> !DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;<span class="kwrd">&gt;</span>
 
<span class="kwrd">&lt;</span><span class="html">html</span> <span class="attr">xmlns</span><span class="kwrd">=&quot;http://www.w3.org/1999/xhtml&quot;</span> <span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Untitled Page<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">form</span> <span class="attr">id</span><span class="kwrd">=&quot;form1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Label</span> <span class="attr">ID</span><span class="kwrd">=&quot;Label1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="kwrd">&gt;&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Label</span> <span class="attr">ID</span><span class="kwrd">=&quot;Label2&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
          <span class="attr">Text</span><span class="kwrd">='&lt;%# DateTime.Now.ToLongTimeString() %&gt;'</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Label</span> <span class="attr">ID</span><span class="kwrd">=&quot;Label3&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Label&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Button</span> <span class="attr">ID</span><span class="kwrd">=&quot;Button1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Button&quot;</span> <span class="attr">OnClick</span><span class="kwrd">=&quot;Button1_Click&quot;</span> <span class="kwrd">/&gt;</span>
 
    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">form</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>And the codebehind file itself. ((CodeBehindSample1.aspx.cs)</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Data;
<span class="kwrd">using</span> System.Configuration;
<span class="kwrd">using</span> System.Collections;
<span class="kwrd">using</span> System.Web;
<span class="kwrd">using</span> System.Web.Security;
<span class="kwrd">using</span> System.Web.UI;
<span class="kwrd">using</span> System.Web.UI.WebControls;
<span class="kwrd">using</span> System.Web.UI.WebControls.WebParts;
<span class="kwrd">using</span> System.Web.UI.HtmlControls;
 
<span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> CodeBehindSample1 : System.Web.UI.Page
{
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
    {
        Label1.Text = DateTime.Now.ToLongTimeString();
    }
 
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Button1_Click(<span class="kwrd">object</span> sender, EventArgs e)
    {
        Label3.Text = DateTime.Now.ToLongTimeString();
        Label2.DataBind();
    }
}</pre>
<p></p>
<p>When the project is built that includes this page above, an .net assembly is created that represents the above page. The files are stored in a directory called something like <i>C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files\pagecache\6b6b75e0\f0cbf892</i>. There are two files that are worth looking at.</p>
<p>App_Web_qlh7npdn.1.cs and App_Web_qlh7npdn.0.cs (I will refer to them as 1.cs and 0.cs from here on out).</p>
<p>0.cs has two classes of interest to talk about.</p>
<p>The first one, (1.cs) declared as &quot;public partial class CodeBehindSample1 : System.Web.SessionState.IRequiresSessionState {&quot; includes a definition for each of the controls declared on the aspx page. It gives us a reference to Profile and ApplicationInstance from the Context of the application (originally created when the request came in).</p>
<p>The second one, (0.cs) which is created in the namespace ASP, (in our case is called ASP.codebehindsample1_aspx which is because of what is defined in the Page tag Inherits) is the full page that represents this request. It has a method that builds each control including databinding. Notice that this class actually inherits from the first one mentioned (1.cs). The actual declaration is as follows: &quot;public class codebehindsample1_aspx : global::CodeBehindSample1, System.Web.IHttpHandler {&quot;</p>
<p>There are several things to notice about this generated code. Here is a list to pay attention to.</p>
<ul>
<li>In the code generated for the button (private global::System.Web.UI.WebControls.Button @__BuildControlButton1() {<br />
    <br />global::System.Web.UI.WebControls.Button @__ctrl;) notice that the text is set to &quot;Button&quot; and the ID is set to Button1. This is the code created from the attribute definition in the aspx file. </li>
<li>Notice how the event handler Button1_Click is created in code. @__ctrl.Click += new System.EventHandler(this.Button1_Click); </li>
<li>For databinding on Label2, notice that the member &quot;public void @__DataBindingLabel2(object sender, System.EventArgs e) {&quot;. You can see how the datacontainer is created, then the dataBindingExpressionBuilderTarget.Text is set to the current data and time.<br />
    </li>
</ul>
<h2>Conclusion</h2>
<p>In conclusion, you can see that at the end of the day, one class is created (ASP.codebehindsample1_aspx) that fully represents the page. Attributes that are set declaratively in the page are turned into code in the 0.cs file, and databinding is performed using a artificially generated event. Below, I've pasted both the code for 0.cs and 1.cs which should be helpful and instructive</p>
<h2>0.cs</h2>
<p></p>
<pre class="csharpcode"><span class="rem">//------------------------------------------------------------------------------</span>
<span class="rem">// &lt;auto -generated&gt;</span>
<span class="rem">//     This code was generated by a tool.</span>
<span class="rem">//     Runtime Version:2.0.50727.42</span>
<span class="rem">//</span>
<span class="rem">//     Changes to this file may cause incorrect behavior and will be lost if</span>
<span class="rem">//     the code is regenerated.</span>
<span class="rem">// &lt;/auto&gt;</span>
<span class="rem">//------------------------------------------------------------------------------</span>
 
 
 
<span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> CodeBehindSample1 : System.Web.SessionState.IRequiresSessionState {
 
 
    <span class="kwrd">protected</span> global::System.Web.UI.WebControls.Label Label1;
    <span class="kwrd">protected</span> global::System.Web.UI.WebControls.Label Label2;
    <span class="kwrd">protected</span> global::System.Web.UI.WebControls.Label Label3;
    <span class="kwrd">protected</span> global::System.Web.UI.WebControls.Button Button1;
    <span class="kwrd">protected</span> global::System.Web.UI.HtmlControls.HtmlForm form1;
 
    <span class="kwrd">protected</span> System.Web.Profile.DefaultProfile Profile {
 
        get {
            <span class="kwrd">return</span> ((System.Web.Profile.DefaultProfile)(<span class="kwrd">this</span>.Context.Profile));
        }
    }
 
    <span class="kwrd">protected</span> System.Web.HttpApplication ApplicationInstance {
        get {
            <span class="kwrd">return</span> ((System.Web.HttpApplication)(<span class="kwrd">this</span>.Context.ApplicationInstance));
        }
    }
}
<span class="kwrd">namespace</span> ASP {
 
 
    <span class="kwrd">using</span> System.Web.Profile;
    <span class="kwrd">using</span> System.Text.RegularExpressions;
    <span class="kwrd">using</span> System.Web.Caching;
    <span class="kwrd">using</span> System.Configuration;
    <span class="kwrd">using</span> System.Collections.Specialized;
    <span class="kwrd">using</span> System.Web.UI.HtmlControls;
    <span class="kwrd">using</span> System.Web.UI.WebControls
    <span class="kwrd">using</span> System.Web.UI;
    <span class="kwrd">using</span> System.Collections;
    <span class="kwrd">using</span> System;
    <span class="kwrd">using</span> System.Web.Security;
    <span class="kwrd">using</span> System.Web;
    <span class="kwrd">using</span> System.Web.SessionState;
    <span class="kwrd">using</span> System.Text;
 
 
 
    [System.Runtime.CompilerServices.CompilerGlobalScopeAttribute()]
    <span class="kwrd">public</span> <span class="kwrd">class</span> codebehindsample1_aspx : global::CodeBehindSample1,
           System.Web.IHttpHandler {
 
        <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">bool</span> @__initialized;
 
        <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">object</span> @__fileDependencies;
 
        <span class="kwrd">public</span> codebehindsample1_aspx() {
            <span class="kwrd">string</span>[] dependencies;
 
            ((System.Web.UI.Page)(<span class="kwrd">this</span>)).AppRelativeVirtualPath =
            <span class="str">&quot;~/CodeBehindSample1.aspx&quot;</span>;
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
            <span class="kwrd">if</span> ((global::ASP.codebehindsample1_aspx.@__initialized == <span class="kwrd">false</span>)) {
                dependencies = <span class="kwrd">new</span> <span class="kwrd">string</span>[2];
                dependencies[0] = <span class="str">&quot;~/CodeBehindSample1.aspx&quot;</span>;
                dependencies[1] = <span class="str">&quot;~/CodeBehindSample1.aspx.cs&quot;</span>;
                global::ASP.codebehindsample1_aspx.@__fileDependencies =
                <span class="kwrd">this</span>.GetWrappedFileDependencies(dependencies);
                global::ASP.codebehindsample1_aspx.@__initialized = <span class="kwrd">true</span>;
            }
            <span class="kwrd">this</span>.Server.ScriptTimeout = 30000000;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.HtmlControls.HtmlTitle
             @__BuildControl__control3() {
            global::System.Web.UI.HtmlControls.HtmlTitle @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.HtmlControls.HtmlTitle();
 
 
            System.Web.UI.IParserAccessor @__parser =
            ((System.Web.UI.IParserAccessor)(@__ctrl));
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;Untitled Page&quot;</span>));
 
 
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.HtmlControls.HtmlHead @__BuildControl__control2() {
            global::System.Web.UI.HtmlControls.HtmlHead @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.HtmlControls.HtmlHead(<span class="str">&quot;head&quot;</span>);
 
 
            global::System.Web.UI.HtmlControls.HtmlTitle @__ctrl1;
 
 
            @__ctrl1 = <span class="kwrd">this</span>.@__BuildControl__control3();
 
 
            System.Web.UI.IParserAccessor @__parser =
               ((System.Web.UI.IParserAccessor)(@__ctrl));
 
 
            @__parser.AddParsedSubObject(@__ctrl1);
 
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.WebControls.Label @__BuildControlLabel1() {
            global::System.Web.UI.WebControls.Label @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.WebControls.Label();
 
 
            <span class="kwrd">this</span>.Label1 = @__ctrl;
            @__ctrl.ApplyStyleSheetSkin(<span class="kwrd">this</span>);
 
 
            @__ctrl.ID = <span class="str">&quot;Label1&quot;</span>;
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.WebControls.Label @__BuildControlLabel2() {
            global::System.Web.UI.WebControls.Label @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.WebControls.Label();
 
 
            <span class="kwrd">this</span>.Label2 = @__ctrl;
            @__ctrl.ApplyStyleSheetSkin(<span class="kwrd">this</span>);
 
 
            @__ctrl.ID = <span class="str">&quot;Label2&quot;</span>;
 
 
            @__ctrl.DataBinding += <span class="kwrd">new</span> System.EventHandler(<span class="kwrd">this</span>.@__DataBindingLabel2);
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">public</span> <span class="kwrd">void</span> @__DataBindingLabel2(<span class="kwrd">object</span> sender, System.EventArgs e) {
            System.Web.UI.WebControls.Label dataBindingExpressionBuilderTarget;
            System.Web.UI.Page Container;
            dataBindingExpressionBuilderTarget =
            ((System.Web.UI.WebControls.Label)(sender));
            Container =
            ((System.Web.UI.Page)(dataBindingExpressionBuilderTarget.BindingContainer));
 
 
            dataBindingExpressionBuilderTarget.Text =
            System.Convert.ToString( DateTime.Now.ToLongTimeString() ,
             System.Globalization.CultureInfo.CurrentCulture);
 
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.WebControls.Label @__BuildControlLabel3() {
            global::System.Web.UI.WebControls.Label @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.WebControls.Label();
 
 
            <span class="kwrd">this</span>.Label3 = @__ctrl;
            @__ctrl.ApplyStyleSheetSkin(<span class="kwrd">this</span>);
 
 
            @__ctrl.ID = <span class="str">&quot;Label3&quot;</span>;
 
 
            @__ctrl.Text = <span class="str">&quot;Label&quot;</span>;
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.WebControls.Button @__BuildControlButton1() {
            global::System.Web.UI.WebControls.Button @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.WebControls.Button();
 
 
            <span class="kwrd">this</span>.Button1 = @__ctrl;
            @__ctrl.ApplyStyleSheetSkin(<span class="kwrd">this</span>);
 
 
            @__ctrl.ID = <span class="str">&quot;Button1&quot;</span>;
 
 
            @__ctrl.Text = <span class="str">&quot;Button&quot;</span>;
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
 
 
            @__ctrl.Click += <span class="kwrd">new</span> System.EventHandler(<span class="kwrd">this</span>.Button1_Click);
 
 
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> global::System.Web.UI.HtmlControls.HtmlForm @__BuildControlform1() {
            global::System.Web.UI.HtmlControls.HtmlForm @__ctrl;
 
 
            @__ctrl = <span class="kwrd">new</span> global::System.Web.UI.HtmlControls.HtmlForm();
 
 
            <span class="kwrd">this</span>.form1 = @__ctrl;
 
 
            @__ctrl.ID = <span class="str">&quot;form1&quot;</span>;
 
 
            System.Web.UI.IParserAccessor @__parser =
            ((System.Web.UI.IParserAccessor)(@__ctrl));
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n    &lt;div&gt;\r\n    &quot;</span>));
 
 
            global::System.Web.UI.WebControls.Label @__ctrl1;
 
 
            @__ctrl1 = <span class="kwrd">this</span>.@__BuildControlLabel1();
 
 
            @__parser.AddParsedSubObject(@__ctrl1);
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n        &quot;</span>));
 
 
            global::System.Web.UI.WebControls.Label @__ctrl2;
 
 
            @__ctrl2 = <span class="kwrd">this</span>.@__BuildControlLabel2();
 
 
            @__parser.AddParsedSubObject(@__ctrl2);
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n        &quot;</span>));
 
 
            global::System.Web.UI.WebControls.Label @__ctrl3;
 
 
            @__ctrl3 = <span class="kwrd">this</span>.@__BuildControlLabel3();
 
 
            @__parser.AddParsedSubObject(@__ctrl3);
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n        &quot;</span>));
 
 
            global::System.Web.UI.WebControls.Button @__ctrl4;
 
 
            @__ctrl4 = <span class="kwrd">this</span>.@__BuildControlButton1();
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
 
 
            @__parser.AddParsedSubObject(@__ctrl4);
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n       \r\n    &lt;/div&gt;\r\n    &quot;</span>));
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
            <span class="kwrd">return</span> @__ctrl;
        }
 
        <span class="kwrd">private</span> <span class="kwrd">void</span> @__BuildControlTree(codebehindsample1_aspx @__ctrl) {
 
 
            <span class="kwrd">this</span>.InitializeCulture();
 
 
            System.Web.UI.IParserAccessor @__parser = ((System.Web.UI.IParserAccessor)(@__ctrl));
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl
            (<span class="str">&quot;\r\n\r\n&lt; !DOCTYPE html
            PUBLIC \&quot;-//W3C//DTD XHTML 1.0 Transitional//EN\&quot;
             \&quot;http://www.w3&quot;</span> +
                        <span class="str">&quot;.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\&quot;&gt;
                        \r\n\r\n&lt;html xmlns=\&quot;http://www.w3.org/1&quot;</span> +
                        <span class="str">&quot;999/xhtml\&quot; &gt;\r\n&quot;</span>));
 
 
            global::System.Web.UI.HtmlControls.HtmlHead @__ctrl1;
 
 
            @__ctrl1 = <span class="kwrd">this</span>.@__BuildControl__control2();
 
            <span class="preproc">#line</span> <span class="kwrd">default</span>
            <span class="preproc">#line</span> hidden
 
 
            @__parser.AddParsedSubObject(@__ctrl1);
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n&lt;body&gt;\r\n    &quot;</span>));
 
 
            global::System.Web.UI.HtmlControls.HtmlForm @__ctrl2;
 
 
            @__ctrl2 = <span class="kwrd">this</span>.@__BuildControlform1();
 
 
            @__parser.AddParsedSubObject(@__ctrl2);
 
 
 
            @__parser.AddParsedSubObject(<span class="kwrd">new</span> System.Web.UI.LiteralControl(<span class="str">&quot;\r\n&lt;/body&gt;\r\n&lt;/html&gt;\r\n&quot;</span>));
 
 
        }
 
 
 
        <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> FrameworkInitialize() {
            <span class="kwrd">base</span>.FrameworkInitialize();
            <span class="kwrd">this</span>.@__BuildControlTree(<span class="kwrd">this</span>);
            <span class="kwrd">this</span>.AddWrappedFileDependencies(global::ASP.codebehindsample1_aspx.@__fileDependencies);
            <span class="kwrd">this</span>.Request.ValidateInput();
        }
 
 
 
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">int</span> GetTypeHashCode() {
            <span class="kwrd">return</span> -956737817;
        }
 
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> ProcessRequest(System.Web.HttpContext context) {
            <span class="kwrd">base</span>.ProcessRequest(context);
        }
    }
}</pre>
<p></p>
<h2>1.cs</h2>
<p></p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Data;
<span class="kwrd">using</span> System.Configuration;
<span class="kwrd">using</span> System.Collections;
<span class="kwrd">using</span> System.Web;
<span class="kwrd">using</span> System.Web.Security;
<span class="kwrd">using</span> System.Web.UI;
<span class="kwrd">using</span> System.Web.UI.WebControls;
<span class="kwrd">using</span> System.Web.UI.WebControls.WebParts;
<span class="kwrd">using</span> System.Web.UI.HtmlControls;
 
<span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> CodeBehindSample1 : System.Web.UI.Page
{
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
    {
        Label1.Text = DateTime.Now.ToLongTimeString();
    }
 
    <span class="kwrd">protected</span> <span class="kwrd">void</span> Button1_Click(<span class="kwrd">object</span> sender, EventArgs e)
    {
        Label3.Text = DateTime.Now.ToLongTimeString();
        Label2.DataBind();
    }
}
 
 
<span class="preproc">#line</span> <span class="kwrd">default</span>
<span class="preproc">#line</span> hidden</pre>
