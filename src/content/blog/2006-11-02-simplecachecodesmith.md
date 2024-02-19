---
status: publish
published: true
pubDatetime: 2006-11-02T20:00:00.000Z
title: Implementing Simple Cache for CodeSmith and NetTiers (ASP.NET 2.0)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>In this article, I will show a simple way to implement Cache for a GetData
  type call in the SqlClient layer of the generated code. I won't go through all the
  details of getting to this point but will show the code and briefly explain how
  it works. I'm new to CodeSmith so I'm sure there is a better way to solve this problem,
  but for now, this is one technique that works.</p>"
wordpress_id: 40
wordpress_url: https://peterkellner.net/2006/11/02/simplecachecodesmith/
date: '2006-11-02 08:12:54 -0800'
date_gmt: '2006-11-02 15:12:54 -0800'
categories:
- CodeSmith
- ASP.NET 2.0
tags: []
---
<p>In this article, I will show a simple way to implement Cache for a GetData type call in the SqlClient layer of the generated code. I won't go through all the details of getting to this point but will show the code and briefly explain how it works. I'm new to CodeSmith so I'm sure there is a better way to solve this problem, but for now, this is one technique that works.</p>
<p> <!--more-->
<p>Just to give a lay of the land, my project is called peterkellnerblog and it has several subprojects that each create their own dll's. They are:</p>
<ul>
<li>c:\..\..\peterkellnerblog.Website </li>
<li>peterkellnerblog.Data </li>
<li>peterkellnerblog.Data.SqlClient </li>
<li>peterkellnerblog.Entities </li>
<li>peterkellnerblog.Web
<p>The project we are going to focus on is peterkelnerblog.Data.SqlClient. In this project, there already is a method that gets data with the following signature (this file is SqlWpCommentProviderBase.generate.cs).</p>
<p>&#160;<span style="color: blue">public</span> <span style="color: blue">override</span> peterkellnerblog.Entities.<span style="color: #2b91af">TList</span>&lt;<span style="color: #2b91af">WpComments</span>&gt;</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; GetByCommentPostID(</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #2b91af">TransactionManager</span> transactionManager,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.<span style="color: #2b91af">Int32</span> commentPostID, <span style="color: blue">int</span> start,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> pageLength, <span style="color: blue">out</span> <span style="color: blue">int</span> count)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
</p></div>
<p>&#160;</p>
<p>This file you are not meant to change (notice that is has the word &quot;generated&quot; in the name). The file you can modify, which is SqlWpCommentProvider.cs. What you essentially do is call the above file and add Cache to the end of the name. That way, if you want a Cached method, you use the new name instead. Here is the file below.</p>
<p>&#160;<span style="color: blue">#region</span> Using directives</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Data;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Collections;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Diagnostics;</p>
<p style="margin: 0px"><span style="color: blue">using</span> Microsoft.Practices.EnterpriseLibrary.Data;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.ComponentModel;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">using</span> peterkellnerblog.Entities;</p>
<p style="margin: 0px"><span style="color: blue">using</span> peterkellnerblog.Data;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Web.Caching;</p>
<p style="margin: 0px"><span style="color: blue">using</span> System.Web;</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">#endregion</span></p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">namespace</span> peterkellnerblog.Data.SqlClient</p>
<p style="margin: 0px">{</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///&lt;summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> This class is the SqlClient Data Access Logic Component implementation for the </span><span style="color: gray">&lt;see cref=&quot;WpComments&quot;/&gt;</span><span style="color: green"> entity.</span></p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: gray">///&lt;/summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160; [<span style="color: #2b91af">DataObject</span>]</p>
<p style="margin: 0px">&#160;&#160;&#160; [<span style="color: #2b91af">CLSCompliant</span>(<span style="color: blue">true</span>)]</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">partial</span> <span style="color: blue">class</span> <span style="color: #2b91af">SqlWpCommentsProvider</span>: <span style="color: #2b91af">SqlWpCommentsProviderBase</span></p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> Creates a new </span><span style="color: gray">&lt;see cref=&quot;SqlWpCommentsProvider&quot;/&gt;</span><span style="color: green"> instance.</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> Uses connection string to connect to datasource.</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;connectionString&quot;&gt;</span><span style="color: green">The connection string to the database.</span><span style="color: gray">&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;useStoredProcedure&quot;&gt;</span><span style="color: green">A boolean value that indicates if we use the stored procedures or embedded queries.</span><span style="color: gray">&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;providerInvariantName&quot;&gt;</span><span style="color: green">Name of the invariant provider use by the DbProviderFactory.</span><span style="color: gray">&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">public</span> SqlWpCommentsProvider(<span style="color: blue">string</span> connectionString, <span style="color: blue">bool</span> useStoredProcedure, <span style="color: blue">string</span> providerInvariantName): <span style="color: blue">base</span>(connectionString, useStoredProcedure, providerInvariantName){}</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;/summary&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;transactionManager&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;commentPostID&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;start&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;pageLength&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;param name=&quot;count&quot;&gt;&lt;/param&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: gray">///</span><span style="color: green"> </span><span style="color: gray">&lt;returns&gt;&lt;/returns&gt;</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">public</span> <span style="color: blue">override</span> peterkellnerblog.Entities.<span style="color: #2b91af">TList</span>&lt;<span style="color: #2b91af">WpComments</span>&gt;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; GetByCommentPostIDCache(<span style="color: #2b91af">TransactionManager</span> transactionManager,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; System.<span style="color: #2b91af">Int32</span> commentPostID, <span style="color: blue">int</span> start, <span style="color: blue">int</span> pageLength,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">out</span> <span style="color: blue">int</span> count)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> newCnt;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> cacheKey = <span style="color: #a31515">&quot;WpComments_GetByCommentPostID&quot;</span> +</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; commentPostID.ToString() + <span style="color: #a31515">&quot;_&quot;</span> +</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; start.To         <br />String() + <span style="color: #a31515">&quot;_&quot;</span> +</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; pageLength.ToString();</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #2b91af">TList</span>&lt;<span style="color: #2b91af">WpComments</span>&gt; tListWpComments = <span style="color: blue">null</span>;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">if</span> (<span style="color: #2b91af">HttpContext</span>.Current.Cache[cacheKey] != <span style="color: blue">null</span>)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; tListWpComments =</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; (<span style="color: #2b91af">TList</span>&lt;<span style="color: #2b91af">WpComments</span>&gt;)<span style="color: #2b91af">HttpContext</span>.Current.Cache[cacheKey];</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; count = tListWpComments.Count;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">else</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; tListWpComments = <span style="color: blue">base</span>.GetByCommentPostID</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; (transactionManager, commentPostID, start, pageLength,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">out</span> newCnt);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #2b91af">HttpContext</span>.Current.Cache.Insert(cacheKey, tListWpComments,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">null</span>, <span style="color: #2b91af">DateTime</span>.Now.AddSeconds(15), <span style="color: #2b91af">TimeSpan</span>.FromDays(0));</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; count = newCnt;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; count = tListWpComments.Count;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">return</span> tListWpComments;</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">}</p>
</p></div>
<p>The above method simply use the built in ASP.NET Cache class.</p>
</li>
</ul>
