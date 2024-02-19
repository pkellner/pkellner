---
status: publish
published: true
pubDatetime: 2008-09-14T20:00:00.000Z
title: Create a Simple WCF Web Service and Use In JavaScript With Visual Studio 2008
  and .Net 3.5
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 159
wordpress_url: https://peterkellner.net/2008/09/14/wcf-web-service-json-vs2008/
date: '2008-09-14 00:20:41 -0700'
date_gmt: '2008-09-14 05:20:41 -0700'
categories:
- ASP.NET 3.5
- C#
- XML
- WCF
tags: []
---
<p>Microsoft has made building a WCF Web Service to communicate with <a href="http://www.javascript.com/">JavaScript</a> very easy in <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2008</a>.&#160; In this post, I'll go through the basics of building this app and demonstrate it working.&#160; Included is the project file which might be a help so you can run it yourself.&#160; I have found a lot of other posts on the web about this same topic but have had little luck getting the code to work.&#160; Few authors post projects with actual working code.&#160; I try to as often as I can because I know how frustrating it can be to not be able to get something working. </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:7617170c-c77c-47bd-8690-065580975f5d" class="wlWriterSmartContent">
<p>Code Associated With this Article <a href="/wp/wp-content/uploads/2008/09/WebSite8.zip" target="_blank">Visual Studio Project</a></p>
</p></div>
<p>First, create an ASP.NET 3.5 Web site.&#160; That is, go into File / New Website and choose ASP.NET Web Site.</p>
<p>Then, Add a new Item to the root of the project called WCF Service and name it SimpleService.svc.</p>
<p> <!--more-->
<p><a href="/wp/wp-content/uploads/2008/09/image2.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb2.png" width="547" height="358" /></a></p>
<p>This will create the service for you in your project and also update your web.config by updating the&#160; <a href="http://msdn.microsoft.com/en-us/library/ms733932.aspx">&lt;system.serviceModel&gt;</a> section.&#160; I'm sure it's doing a stellar job, however I could not get the service to work with what it did so if you know more about it than I do, don't follow my advice here. However, if you replace what it generated with the following section, it will work (at least with <a href="http://msdn.microsoft.com/en-us/netframework/default.aspx">.Net 3.5sp1</a>, Visual Studio 2008 sp1).</p>
<div class="csharpcode">
<pre class="alt">  &lt;system.serviceModel&gt;</pre>
<pre>    &lt;behaviors&gt;</pre>
<pre class="alt">      &lt;endpointBehaviors&gt;</pre>
<pre>        &lt;behavior name=<span class="str">&quot;LoadDataAspNetAjaxBehavior&quot;</span>&gt;</pre>
<pre class="alt">          &lt;enableWebScript/&gt;</pre>
<pre>        &lt;/behavior&gt;</pre>
<pre class="alt">      &lt;/endpointBehaviors&gt;</pre>
<pre>    &lt;/behaviors&gt;</pre>
<pre class="alt">    &lt;serviceHostingEnvironment aspNetCompatibilityEnabled=<span class="str">&quot;true&quot;</span>&gt;</pre>
<pre>    &lt;/serviceHostingEnvironment&gt;</pre>
<pre class="alt">    &lt;services&gt;</pre>
<pre>      &lt;service name=<span class="str">&quot;LoadData&quot;</span>&gt;</pre>
<pre class="alt">        &lt;endpoint address=<span class="str">&quot;&quot;</span> </pre>
<pre>                  behaviorConfiguration=<span class="str">&quot;LoadDataAspNetAjaxBehavior&quot;</span> </pre>
<pre class="alt">                  binding=<span class="str">&quot;webHttpBinding&quot;</span> contract=<span class="str">&quot;LoadData&quot;</span>/&gt;</pre>
<pre>      &lt;/service&gt;</pre>
<pre class="alt">    &lt;/services&gt;</pre>
<pre>  &lt;/system.serviceModel&gt;</pre>
</div>
<p>So, Visual Studio 2008 created a nice interface and implemented that interface. I'm going to suggest (again, for the sake of getting this working for the first time) that you remove both of those files and replace it with the file below.&#160; That is, we will not no interface and no implementation of the interface, just the ordinary class (SimpleService.cs).</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre><span class="kwrd">using</span> System.Runtime.Serialization;</pre>
<pre class="alt"><span class="kwrd">using</span> System.ServiceModel;</pre>
<pre><span class="kwrd">using</span> System.ServiceModel.Activation;</pre>
<pre class="alt">&#160;</pre>
<pre>[ServiceContract(Namespace = <span class="str">&quot;&quot;</span>)]</pre>
<pre class="alt">[AspNetCompatibilityRequirements</pre>
<pre>    (RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]</pre>
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">class</span> SimpleService</pre>
<pre>{</pre>
<pre class="alt">    <span class="rem">// Add [WebGet] attribute to use HTTP GET</span></pre>
<pre>    [OperationContract]</pre>
<pre class="alt">    <span class="kwrd">public</span> List&lt;CityState&gt; RetrieveAll()</pre>
<pre>    {</pre>
<pre class="alt">        var listData = <span class="kwrd">new</span> List&lt;CityState&gt;</pre>
<pre>           {</pre>
<pre class="alt">               <span class="kwrd">new</span> CityState {city = <span class="str">&quot;Hartsdale&quot;</span>, state = <span class="str">&quot;NY&quot;</span>},</pre>
<pre>               <span class="kwrd">new</span> CityState {city = <span class="str">&quot;San Jose&quot;</span>, state = <span class="str">&quot;CA&quot;</span>},</pre>
<pre class="alt">               <span class="kwrd">new</span> CityState {city = <span class="str">&quot;Chicago&quot;</span>, state = <span class="str">&quot;IL&quot;</span>}</pre>
<pre>           };</pre>
<pre class="alt">        <span class="kwrd">return</span> listData;</pre>
<pre>    }</pre>
<pre class="alt">}</pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
<pre>[DataContract]</pre>
<pre class="alt"><span class="kwrd">public</span> <span class="kwrd">class</span> CityState</pre>
<pre>{</pre>
<pre class="alt">    [DataMember]</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">string</span> city { get; set; }</pre>
<pre class="alt">&#160;</pre>
<pre>    [DataMember]</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">string</span> state { get; set; }</pre>
<pre>}</pre>
</div>
<p>Now, Add to your default.aspx page the ScriptManager control and add the SimpleService.svc to it as well as the javascript file default.aspx.js you just created. Make sure to add ScriptManager after the &lt;form tag.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">asp:ScriptManager</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">ID</span><span class="kwrd">=&quot;SMP1&quot;</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">Services</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">asp:ServiceReference</span> <span class="attr">Path</span><span class="kwrd">=&quot;~/SimpleService.svc&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">Services</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">Scripts</span><span class="kwrd">&gt;</span></pre>
<pre>        <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">=&quot;~/Default.aspx.js&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;/</span><span class="html">Scripts</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">asp:ScriptManager</span><span class="kwrd">&gt;</span></pre>
</div>
<p>Now, what we have is a JavaScript file (Default.aspx.cs) that automatically will get included with running your Default.aspx page.&#160; Because <a href="http://www.asp.net/AJAX/Documentation/Live/overview/ScriptManagerOverview.aspx">ScriptManager</a> is running and we have included the SimpleService, JavaScript code will also be injected that gives us the plumbing to call the SimpleService web service.</p>
<p>Almost finally, we have a service defined and hopefully it is ready for the JavaScript.&#160; Add a new JavaScript file to your solution called Default.aspx.js.&#160; This will be the javascript that actually calls the service we built (SimpleService).</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_32.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_32.png" width="490" height="322" /></a></p>
<p>Put the following Javascript in the Default.aspx.js page.</p>
<div class="csharpcode">
<pre class="alt">function pageLoad() {</pre>
<pre>    SimpleService.RetrieveAll(OnRetrieveLoadData);</pre>
<pre class="alt">}</pre>
<pre>&#160;</pre>
<pre class="alt">function OnRetrieveLoadData(dataList) {</pre>
<pre>&#160;</pre>
<pre class="alt">    <span class="rem">// javascript kindly donated from x-format on this thread:</span></pre>
<pre>    <span class="rem">// http://forums.asp.net/p/1319775/2620025.aspx#2620025</span></pre>
<pre class="alt">    var divObj = document.getElementById(<span class="str">'myTable'</span>);</pre>
<pre>&#160;</pre>
<pre class="alt">    var city = <span class="str">'The City'</span>;</pre>
<pre>    var state = <span class="str">'The State'</span>;</pre>
<pre class="alt">&#160;</pre>
<pre>    var tableStart = </pre>
<pre class="alt">       <span class="str">'&lt;table cellspacing=&quot;5&quot; cellpadding=&quot;0&quot; border=&quot;1&quot;&gt;'</span> + </pre>
<pre>       <span class="str">'&lt;tbody&gt;&lt;tr&gt;&lt;th&gt;City&lt;/th&gt;&lt;th&gt;State&lt;/th&gt;&lt;/tr&gt;'</span>;</pre>
<pre class="alt">    var tableContent = <span class="str">''</span>;</pre>
<pre>    var tableEnd = <span class="str">'&lt;/tbody&gt;&lt;/table&gt;'</span>;</pre>
<pre class="alt">    <span class="kwrd">for</span> (var i = 0; i &lt; dataList.length; i++) {</pre>
<pre>        tableContent += <span class="str">'&lt;tr&gt;&lt;td&gt;'</span> + dataList[i].city </pre>
<pre class="alt">        + <span class="str">'&lt;/td&gt;&lt;td&gt;'</span> + dataList[i].state + <span class="str">'&lt;/td&gt;&lt;/tr&gt;'</span>;</pre>
<pre>    }</pre>
<pre class="alt">    divObj.innerHTML = tableStart + tableContent + tableEnd;</pre>
<pre>}</pre>
<pre class="alt">&#160;</pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
<pre>&#160;</pre>
<pre class="alt">&#160;</pre>
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
<p>(The above JavaScript was given to me by a kind user named x-format on forums.asp.net.&#160;&#160; Here is the thread with my request and the response)</p>
<p><a title="http://forums.asp.net/t/1319775.aspx" href="http://forums.asp.net/t/1319775.aspx">http://forums.asp.net/t/1319775.aspx</a></p>
<p>Then, when you run the example, this is what you get.</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_41.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_41.png" width="136" height="194" /></a></p>
<p>Several authors have mentioned that you can avoid all the WCF plumbing in the WCF file by using the following code in your svc file:</p>
<pre class="csharpcode">&lt;%@ ServiceHost 
Language=<span class="str">&quot;C#&quot;</span> 
Service=<span class="str">&quot;SimpleService&quot;</span> 
Factory=<span class="str">&quot;System.ServiceModel.Activation.WebScriptServiceHostFactory&quot;</span>
%&gt; </pre>
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
<p>In conclusion, I just want to say that this has been a particularly frustrating episode for me.&#160; I'm new to WCP and it sure does not feel good.&#160; I can do this over and over again I'm sure, but if the formula changes I'm stuck.&#160; It's not like Microsoft to make settings so cryptic and error prone with no good way to debug them that I know of.</p>
<p>Hope this post helps.</p>
<p><a title="http://odetocode.com/Blogs/scott/archive/2007/07/30/11171.aspx" href="http://odetocode.com/Blogs/scott/archive/2007/07/30/11171.aspx"></a></p>
