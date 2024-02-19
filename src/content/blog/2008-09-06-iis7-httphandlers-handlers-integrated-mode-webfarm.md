---
status: publish
published: true
pubDatetime: 2008-09-06T20:00:00.000Z
title: How to User HttpHandler such as .ashx file with IIS7 Integrated Mode, Webfarm
  Environment
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 147
wordpress_url: https://peterkellner.net/2008/09/06/iis7-httphandlers-handlers-integrated-mode-webfarm/
date: '2008-09-06 10:20:06 -0700'
date_gmt: '2008-09-06 15:20:06 -0700'
categories:
- ASP.NET 3.5
- Best Practices
- IIS7
- WebFarm
tags: []
---
<p>Recently, we've moved our hosting for the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> to <a href="http://mosso.com">MOSSO</a>, which is a hosted web farm.&#160; In order to run modules and handlers, it seems it's necessary to run in <a href="http://www.iis.net/">IIS7's</a> <a href="http://weblogs.asp.net/mschwarz/archive/2008/04/14/ajax-net-and-iis-7-integrated-mode.aspx">integrated mode</a>.&#160; Once this is set, other small issues creep up like for example you can no longer run <a href="http://msdn.microsoft.com/en-us/library/ms998532.aspx">HttpHandler's</a> from the standard HttpHandler's section in your <a href="http://msdn.microsoft.com/en-us/library/aa719558.aspx">web.config</a> file (see below)</p>
<div class="csharpcode">
<pre class="alt">&lt;httpHandlers&gt;</pre>
<pre>            &lt;remove verb=<span class="str">&quot;*&quot;</span> path=<span class="str">&quot;*.asmx&quot;</span>/&gt;</pre>
<pre class="alt">            &lt;add verb=<span class="str">&quot;*&quot;</span> path=<span class="str">&quot;*.asmx&quot;</span> validate=<span class="str">&quot;false&quot; ...</span></pre>
<pre>            &lt;add verb=<span class="str">&quot;*&quot;</span> path=<span class="str">&quot;*_AppService.axd&quot;</span> validate=<span class="str">&quot;false&quot;</span> ...</pre>
<pre class="alt">            &lt;add verb=<span class="str">&quot;GET,HEAD&quot;</span> path=<span class="str">&quot;ScriptResource.axd&quot;</span> type=<span class="str">&quot;System.Web.Handlers.ScriptResourceHandler,..</span></pre>
<pre>            &lt;add type=<span class="str">&quot;PeterKellner.Utils.CaptchaTypeHandler&quot;</span> verb=<span class="str">&quot;GET&quot;</span> path=<span class="str">&quot;CaptchaType.ashx&quot;</span>/&gt;</pre>
<pre class="alt">&lt;/httpHandlers&gt;</pre>
</div>
<p>&#160;</p>
<p><!--more--></p>
<p>In order to make this work, you have to do two things.&#160; First, as MOSSO suggest on their web site http://help.mosso.com/article.php?id=260 you need to set a section in your <a href="http://msdn.microsoft.com/en-us/magazine/cc163453.aspx">&lt;system.webServer&gt;</a> section called &lt;staticContent&gt;.&#160; Second, you need to add to the the same handler you defined in the old section to the &lt;handlers&gt; section of the &lt;system.webServer&gt; section.&#160; Make sure you add a name tag because that's required in this section, where as it's not required in the &lt;HttpHandlers&gt; section.</p>
<div class="csharpcode">
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">validation</span> <span class="attr">validateIntegratedModeConfiguration</span><span class="kwrd">=&quot;false&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">staticContent</span><span class="kwrd">&gt;</span></pre>
<pre>      <span class="kwrd">&lt;</span><span class="html">mimeMap</span> <span class="attr">fileExtension</span><span class="kwrd">=&quot;.ashx&quot;</span> <span class="attr">mimeType</span><span class="kwrd">=&quot;text/html&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">staticContent</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">modules</span>  <span class="attr">runAllManagedModulesForAllRequests</span><span class="kwrd">=&quot;true&quot;</span>  <span class="kwrd">&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptModule&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptModule&quot;</span> <span class="attr">preCondition</span><span class="kwrd">=&quot;managedHandler&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;System.Web.Handlers....</span></pre>
<pre class="alt">      <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">type</span><span class="kwrd">=&quot;HealthMonitor.GeneralErrorModule,HealthMonitor&quot;</span> <span class="attr">name</span><span class="kwrd">=&quot;GeneralErrorModule&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">modules</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">handlers</span><span class="kwrd">&gt;</span></pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">=&quot;WebServiceHandlerFactory-Integrated&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptHandlerFactory&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptHandlerFactoryAppServices&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptResource&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptHandlerFactory&quot;</span> <span class="attr">verb</span><span class="kwrd">=&quot;*&quot;</span> <span class="attr">path</span><span class="kwrd">=&quot;*.asmx&quot;</span> <span class="attr">preCondition</span><span class="kwrd">=&quot;integratedMode&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;System....</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptHandlerFactoryAppServices&quot;</span> <span class="attr">verb</span><span class="kwrd">=&quot;*&quot;</span> <span class="attr">path</span><span class="kwrd">=&quot;*_AppService.axd&quot;</span> <span class="attr">preCondition</span><span class="kwrd">=&quot;integratedMode&quot;</span>...</pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;ScriptResource&quot;</span> <span class="attr">preCondition</span><span class="kwrd">=&quot;integratedMode&quot;</span> <span class="attr">verb</span><span class="kwrd">=&quot;GET,HEAD&quot;</span> <span class="attr">path</span><span class="kwrd">=&quot;ScriptResource.axd&quot;</span> <span class="attr">...</span></pre>
<pre class="alt">      <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;CapthaTypeHandler&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;PeterKellner.Utils.CaptchaTypeHandler&quot;</span> <span class="attr">verb</span><span class="kwrd">=&quot;GET&quot;</span> <span class="attr">path</span><span class="kwrd">=&quot;CaptchaType.ashx&quot;</span><span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">handlers</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">runtime</span><span class="kwrd">&gt;</span></pre>
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
<p>Hope this saves you some time!</p>
