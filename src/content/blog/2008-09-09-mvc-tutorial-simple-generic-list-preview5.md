---
status: publish
published: true
pubDatetime: 2008-09-09T20:00:00.000Z
title: View a Generic List with ASP.NET MVC. Step by Step With Preview 5
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 158
wordpress_url: https://peterkellner.net/2008/09/09/mvc-tutorial-simple-generic-list-preview5/
date: '2008-09-09 13:35:28 -0700'
date_gmt: '2008-09-09 18:35:28 -0700'
categories:
- ASP.NET 3.5
- Best Practices
- C#
- web
- MVC
tags: []
---
<p>I've just started (within the past 2 days) learning and building a prototype with <a href="http://forums.asp.net/">Microsoft's new MVC platform</a>.&#160; It's really just another project type in <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2008</a>, but it changes the way you write asp.net applications.&#160; So far I like it, but I'm still on the honeymoon.&#160; I have not really tried to do anything complex yet, and because it's new to me, the simple things are still hard.&#160; <a href="http://weblogs.asp.net/scottgu/archive/2008/09/02/asp-net-mvc-preview-5-and-form-posting-scenarios.aspx">Scott Guthrie's</a> posts posts have been helpful, as well as reading a pre-release of Manning's upcoming book <a href="http://manning.com/palermo/">ASP.NET MVC In Action</a> by <a href="http://jeffreypalermo.com/">Jeffrey Palermo</a>, <a href="http://www.flux88.com/">Ben Scheirman</a> and <a href="http://grabbagoft.blogspot.com/">Jimmy Bogard</a>.</p>
<p> <!--more-->
<p>So, as is normal, when I learn something new, the most obvious things just don't seem to work.&#160; In this case, I'm just trying to make a web page that shows a list of data on a page.&#160; I'm not going to try and teach MVC here, but if you are like me and struggled with this, this should help you get through some of the tough spots. My plan is to start a new MVC project with Visual Studio and show you what is necessary to generate the list.&#160; Instead of going after a database, I'm going to use an simple business object class so you can run this without connecting to a database.&#160; Not sure about you, but I never seem to be able to get the databases from example code working.&#160; Scott Guthrie uses the Northwind databases Product table, and after spending about 15 minutes searching, all I could find was a <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=06616212-0356-46A0-8DA2-EEBC53A68034&amp;displaylang=en">Northwind database from sqlserver 2000</a> that does not have a Product table.&#160; With my demo, you won't have to worry about that.&#160; By the way, here is the project if you want to download it in action.</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px" id="scid:18d43e01-4549-4fde-8ca6-c7b4b7385fac:176475a3-eab9-41db-8107-c37ea0c2a70b" class="wlWriterSmartContent">
<p>Download Solution - <a href="/wp/wp-content/uploads/2008/09/Solution.zip">Solution.zip</a></p>
</p></div>
<p>So, Here we go.&#160; First thing, Open Visual Studio 2008 and create a new MVC Project (not a web site, this will give you a csproj type file)</p>
<p>&#160;<a href="/wp/wp-content/uploads/2008/09/image1.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb1.png" width="535" height="424" /></a></p>
<p>Answer the next question YES because of course you want a Test Project.</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_31.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_31.png" width="424" height="284" /></a></p>
<p>You should get a Solution that looks like this:</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_4.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_4.png" width="197" height="330" /></a></p>
<p>Now, Add the business object that I will be using for this rest of this demonstration.&#160; It's in the project file, our you just download it here (put this in your Models Directory).</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:73729366-c7a7-43f3-a538-5ec829978430" class="wlWriterSmartContent">
<p>BusinessObjectClass.cs <a href="/FilesForWebDownload/ViewaLINQListwith.StepbyStepWithPreview5_7BE7/BusinessObjectClass.cs" target="_blank">BusinessObjectClass.cs</a></p>
</p></div>
<p>Now, let's create the MVC Controller.&#160; Highlight the Controller's Folder and say Add Item (TMI if I show you that).&#160; Here is the dialog.&#160; Create the name of your controller with the syntax {Name}Controller.&#160; In my case, the name is EmailListControler.cs.</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_5.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_5.png" width="424" height="293" /></a></p>
<p>Add the following code to your EmailListController.cs file to retrieve some data and return it as a View (which will be processed by the View Page coming up).</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre><span class="kwrd">using</span> System.Linq;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Web.Mvc;</pre>
<pre>&#160;</pre>
<pre class="alt"><span class="kwrd">namespace</span> Solution.Controllers</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">class</span> EmailListController : Controller</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">public</span> ActionResult Index()</pre>
<pre>        {</pre>
<pre class="alt">            var businessObject = <span class="kwrd">new</span> BusinessObject();</pre>
<pre>            List&lt;BusinessObjectItem&gt; members = </pre>
<pre class="alt">                businessObject.GetMembers();</pre>
<pre>            <span class="kwrd">return</span> View(<span class="str">&quot;Index&quot;</span>, members);</pre>
<pre class="alt">        }</pre>
<pre>    }</pre>
<pre class="alt">}<span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre><span class="kwrd">using</span> System.Linq;</pre>
<pre class="alt"><span class="kwrd">using</span> System.Web.Mvc;</pre>
<pre>&#160;</pre>
<pre class="alt"><span class="kwrd">namespace</span> Solution.Controllers</pre>
<pre>{</pre>
<pre class="alt">    <span class="kwrd">public</span> <span class="kwrd">class</span> EmailListController : Controller</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">public</span> ActionResult Index()</pre>
<pre>        {</pre>
<pre class="alt">            var businessObject = <span class="kwrd">new</span> BusinessObject();</pre>
<pre>            List&lt;BusinessObjectItem&gt; members = </pre>
<pre class="alt">                businessObject.GetMembers();</pre>
<pre>            <span class="kwrd">return</span> View(<span class="str">&quot;Index&quot;</span>, members);</pre>
<pre class="alt">        }</pre>
<pre>    }</pre>
<pre class="alt">}</pre>
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
<p>Then, create a new folder called EmailList under the Views folder.</p>
<p>&#160;<a href="/wp/wp-content/uploads/2008/09/image_6.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_6.png" width="244" height="142" /></a></p>
<p>Then, create a MVCViewPage in the EmailList folder called Index.aspx.</p>
<p>&#160;<a href="/wp/wp-content/uploads/2008/09/image_7.png"><img alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_7.png" width="612" height="360" /></a></p>
<p>(Actually, choose MVC View Content Page, not MVC View Page)</p>
<p>Then, chose the Master Page to use as follows (there is only one):</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_8.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_8.png" width="579" height="354" /></a></p>
<p>The View will be referring to the ViewData.Model which somehow is associated with how the code behind is implemented. Make sure you have the ViewPage look like the following and the data type specified as below.&#160; This is the file Index.aspx.cs which is in your email directory.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">using</span> System.Collections.Generic;</pre>
<pre><span class="kwrd">using</span> System.Web.Mvc;</pre>
<pre class="alt">&#160;</pre>
<pre><span class="kwrd">namespace</span> Solution.Views.EmailList</pre>
<pre class="alt">{</pre>
<pre>    <span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> Index :</pre>
<pre class="alt">        ViewPage&lt;IEnumerable&lt;BusinessObjectItem&gt;&gt;</pre>
<pre>    {</pre>
<pre class="alt">    }</pre>
<pre>}</pre>
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
<p>Now, for the Index.aspx file which is also in your Views/EmailList directory, enter the following between the content tags.</p>
<p>&#160;</p>
<div class="csharpcode">
<pre class="alt">&lt;table border=<span class="str">&quot;1&quot;</span>&gt;</pre>
<pre>    &lt;tr&gt;</pre>
<pre class="alt">        &lt;td&gt;</pre>
<pre>            &lt;strong&gt;Name&lt;/strong&gt;</pre>
<pre class="alt">        &lt;/td&gt;</pre>
<pre>        &lt;td&gt;</pre>
<pre class="alt">            &lt;strong&gt;&lt;strong&gt;Email Address&lt;/strong&gt;</pre>
<pre>        &lt;/td&gt;</pre>
<pre class="alt">    &lt;/tr&gt;</pre>
<pre>    &lt;% <span class="kwrd">foreach</span> (var emailItem <span class="kwrd">in</span> ViewData.Model)</pre>
<pre class="alt">       { %&gt;</pre>
<pre>    &lt;tr&gt;</pre>
<pre class="alt">        &lt;td&gt;</pre>
<pre>            &lt;%= emailItem.Name %&gt;</pre>
<pre class="alt">        &lt;/td&gt;</pre>
<pre>        &lt;td&gt;</pre>
<pre class="alt">            &lt;%=emailItem.Email %&gt;</pre>
<pre>        &lt;/td&gt;</pre>
<pre class="alt">    &lt;/tr&gt;</pre>
<pre>    &lt;% } %&gt;</pre>
<pre class="alt">&lt;/table&gt;</pre>
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
<p>Notice that you have intellisense working on your foreach items.</p>
<p>&#160;<a href="/wp/wp-content/uploads/2008/09/image_9.png"><img alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_9.png" width="554" height="141" /></a></p>
<p>Finally, go to your Master Page and add a link for this new EmailList as follows.&#160; That is, change the file /Views/Shared/Site.Master</p>
<div class="csharpcode">
<pre class="alt">&lt;ul id=<span class="str">&quot;menu&quot;</span>&gt;              </pre>
<pre>    &lt;li&gt;&lt;%= Html.ActionLink(<span class="str">&quot;Home&quot;</span>, <span class="str">&quot;Index&quot;</span>, <span class="str">&quot;Home&quot;</span>)%&gt;&lt;/li&gt;</pre>
<pre class="alt">    &lt;li&gt;&lt;%= Html.ActionLink(<span class="str">&quot;About Us&quot;</span>, <span class="str">&quot;About&quot;</span>, <span class="str">&quot;Home&quot;</span>)%&gt;&lt;/li&gt;</pre>
<pre>    &lt;li&gt;&lt;a href=<span class="str">&quot;/EmailList&quot;</span>&gt;Email List&lt;/a&gt;&lt;/li&gt;</pre>
<pre class="alt">&lt;/ul&gt;</pre>
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
<p>As you can see, I don't quite grock the ActionLinke parameters so I just put in a standard anchor tag.&#160; Please comment below on what it should be to be able to reference /EmailList and I will update the article.&#160; For now, lunch is coming and I need to run.</p>
<p>When you finally run that app, you get this for your new output.&#160; Notice the New Email List Tab.</p>
<p><a href="/wp/wp-content/uploads/2008/09/image_10.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb_10.png" width="625" height="382" /></a></p>
<p>That's it for now.&#160; Hope this helps!</p>
