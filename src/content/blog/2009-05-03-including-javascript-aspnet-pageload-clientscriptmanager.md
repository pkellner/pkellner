---
status: publish
published: true
pubDatetime: 2009-05-03T20:00:00.000Z
title: How to Set JavaScript Programmatically on a Page in ASP.NET with Parameters
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 300
wordpress_url: https://peterkellner.net/2009/05/03/including-javascript-aspnet-pageload-clientscriptmanager/
date: '2009-05-03 16:42:50 -0700'
date_gmt: '2009-05-03 23:42:50 -0700'
categories:
- ASP.NET 3.5
- JavaScript
- Sencha
tags: []
---
<p>Programmatically setting <a href="http://JavaScript.org">JavaScript</a> into an <a href="http://asp.net">ASP.NET</a> page is very straight forward when you do it in code.&#160; That is, in my case, I simply put it in the Page_Load event of the page and have it load from there.&#160; I’m currently working on an <a href="http://extjs.com">ExtJS</a> project that requires me to show some details on a page that I want to show with <a href="http://www.webopedia.com/TERM/J/JavaScript.html">JavaScript</a>.&#160; I’ve nicely modularized all the JavaScript into a name space so the code that I want to include on my ASP.NET Page looks like the following:</p>
<div class="csharpcode">
<pre class="alt">&lt;script type=<span class="str">&quot;text/javascript&quot;</span> language=<span class="str">&quot;javascript&quot;</span> &gt;</pre>
<pre>    ASPWeb.newsGrid.loadTypeId = 229490;</pre>
<pre class="alt">    ASPWeb.newsGrid.init();</pre>
<pre>&lt;/script&gt;</pre>
</div>
<p><!--more--></p>
<p>To put the same code in, but substitute the loadTypeId with something meanful, here is the C# code you need to put in your Page_Load C# code.</p>
<div class="csharpcode">
<pre class="alt">  <span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<pre>        {</pre>
<pre class="alt">            <span class="kwrd">if</span> (!IsPostBack)</pre>
<pre>            {</pre>
<pre class="alt">                LabelEntityType.Text = EntityTypeId.ToString();</pre>
<pre>                LabelEntityId.Text = EntityId.ToString();</pre>
<pre class="alt">            }</pre>
<pre>            <span class="rem">// The JavaScript needs to be registed on every post back.  Not just first time.</span></pre>
<pre class="alt">            <span class="rem">// Define the name and type of the client scripts on the page.</span></pre>
<pre>            <span class="kwrd">const</span> <span class="kwrd">string</span> csname1 = <span class="str">&quot;LoadDetailsGridScript&quot;</span>;</pre>
<pre class="alt">            Type cstype = <span class="kwrd">this</span>.GetType();</pre>
<pre>            <span class="rem">// Get a ClientScriptManager reference from the Page class.</span></pre>
<pre class="alt">            ClientScriptManager cs = Page.ClientScript;</pre>
<pre>            <span class="rem">// Check to see if the startup script is already registered.</span></pre>
<pre class="alt">            <span class="kwrd">if</span> (!cs.IsStartupScriptRegistered(cstype, csname1))</pre>
<pre>            {</pre>
<pre class="alt">                <span class="rem">//ASPWeb.newsGrid.loadTypeId = 229490;</span></pre>
<pre>                <span class="rem">//ASPWeb.newsGrid.init();</span></pre>
<pre class="alt">                <span class="kwrd">const</span> <span class="kwrd">string</span> cstext1 = </pre>
<pre>                    <span class="str">&quot;ASPWeb.newsGrid.EntityId = {0};ASPWeb.newsGrid.EntityTypeId = 1; ASPWeb.newsGrid.init();&quot;</span>;</pre>
<pre class="alt">                cs.RegisterStartupScript(cstype, csname1, String.Format(cstext1, LabelEntityId.Text), <span class="kwrd">true</span>);</pre>
<pre>            }</pre>
<pre class="alt">        }</pre>
</div>
<p>I found this code on line at this MSDN location.</p>
<p><a title="http://msdn.microsoft.com/en-us/library/z9h4dk8y.aspx" href="http://msdn.microsoft.com/en-us/library/z9h4dk8y.aspx">http://msdn.microsoft.com/en-us/library/z9h4dk8y.aspx</a></p>
<p>Hope this Helps!!!</p>
