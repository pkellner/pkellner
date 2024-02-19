---
status: publish
published: true
pubDatetime: 2006-10-20T20:00:00.000Z
title: Moving From Casini to IIS, Login Fails. How come?
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: What to do when an web application you wrote worked fine in developement
  (VS2005) but when you move it to IIS, you can no longer login using the Membership
  Provider you configured under development.
wordpress_id: 38
wordpress_url: https://peterkellner.net/2006/10/20/moving-from-casini-to-iis-login-fails-how-come/
date: '2006-10-20 10:33:09 -0700'
date_gmt: '2006-10-20 17:33:09 -0700'
categories:
- Membership
- ASP.NET 2.0
tags: []
---
<h2>ASP.NET 2.0 Membership</h2>
<p>A very common question that comes up while using ASP.NET 2.0 Membership is that when moving a web application from the local developer environment with Visual Studio 2005 (VS2005) to IIS is that login no longer works. Almost everytime this happens, it comes down to the application name in the Membership Profile of Web.Config is set to / instead of the actual application name. That is, if you you were to look at your web.config, this is what you would see.</p>
<p> <!--more-->  <br /> 
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">roleManager</span> <span class="attr">enabled</span>=“<span class="attr">true</span>“<span class="kwrd">/&gt;</span></pre>
<pre>     <span class="kwrd">&lt;</span><span class="html">membership</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">          <span class="kwrd">&lt;</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<pre>          <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span>=“<span class="attr">AspNetSqlMembershipProvider</span>“<span class="kwrd">/&gt;</span></pre>
<pre class="alt">          <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span>=“<span class="attr">AspNetSqlMembershipProvider</span>“</pre>
<pre>               <span class="attr">type</span>=“…“</pre>
<pre class="alt">               <span class="attr">connectionStringName</span>=“<span class="attr">LocalSqlServer</span>“</pre>
<pre>               <span class="attr">enablePasswordRetrieval</span>=“<span class="attr">false</span>“</pre>
<pre class="alt">               <span class="attr">enablePasswordReset</span>=“<span class="attr">true</span>“</pre>
<pre>               <span class="attr">requiresQuestionAndAnswer</span>=“<span class="attr">true</span>“</pre>
<pre class="alt">               <span class="attr">applicationName</span>=“/“</pre>
<pre>               <span class="attr">requiresUniqueEmail</span>=“<span class="attr">false</span>“</pre>
<pre class="alt">               <span class="attr">minRequiredPasswordLength</span>=“<span class="attr">1</span>“</pre>
<pre>               <span class="attr">minRequiredNonalphanumericCharacters</span>=“<span class="attr">0</span>“</pre>
<pre class="alt">               <span class="attr">passwordFormat</span>=“<span class="attr">Hashed</span>“</pre>
<pre>               <span class="attr">maxInvalidPasswordAttempts</span>=“<span class="attr">5</span>“</pre>
<pre class="alt">               <span class="attr">passwordAttemptWindow</span>=“<span class="attr">10</span>“ <span class="attr">p</span>=“”</pre>
<pre>               <span class="attr">asswordStrengthRegularExpression</span>=“”<span class="kwrd">/&gt;</span></pre>
<pre class="alt">     <span class="kwrd">&lt;/</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">membership</span><span class="kwrd">&gt;</span></pre>
</div>
<p></p>
<p>Notice that the applicationName is set to just a &quot;/&quot;. To make the application work with IIS, you really need to set that to the name of your application. That is, the correct way to specify applicationName is something more like this:</p>
<p></p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">roleManager</span> <span class="attr">enabled</span>=“<span class="attr">true</span>“<span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">membership</span><span class="kwrd">&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<pre>            <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span>=“<span class="attr">AspNetSqlMembershipProvider</span>“<span class="kwrd">/&gt;</span></pre>
<pre class="alt">            <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span>=“<span class="attr">AspNetSqlMembershipProvider</span>“</pre>
<pre>                <span class="attr">type</span>=“…“</pre>
<pre class="alt">                <span class="attr">connectionStringName</span>=“<span class="attr">LocalSqlServer</span>“</pre>
<pre>                <span class="attr">enablePasswordRetrieval</span>=“<span class="attr">false</span>“</pre>
<pre class="alt">                <span class="attr">enablePasswordReset</span>=“<span class="attr">true</span>“</pre>
<pre>                <span class="attr">requiresQuestionAndAnswer</span>=“<span class="attr">true</span>“</pre>
<pre class="alt">                <span class="attr">applicationName</span>=“/<span class="attr">MyCoolApp1</span>“</pre>
<pre>                <span class="attr">requiresUniqueEmail</span>=“<span class="attr">false</span>“</pre>
<pre class="alt">                <span class="attr">minRequiredPasswordLength</span>=“<span class="attr">1</span>“</pre>
<pre>                <span class="attr">minRequiredNonalphanumericCharacters</span>=“<span class="attr">0</span>“</pre>
<pre class="alt">                <span class="attr">passwordFormat</span>=“<span class="attr">Hashed</span>“</pre>
<pre>                <span class="attr">maxInvalidPasswordAttempts</span>=“<span class="attr">5</span>“</pre>
<pre class="alt">                <span class="attr">passwordAttemptWindow</span>=“<span class="attr">10</span>“ <span class="attr">p</span>=“”</pre>
<pre>                <span class="attr">asswordStrengthRegularExpression</span>=“”<span class="kwrd">/&gt;</span></pre>
<pre class="alt">        <span class="kwrd">&lt;/</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;/</span><span class="html">membership</span><span class="kwrd">&gt;</span></pre>
</div>
<p></p>
<p>This also makes it so that you can share the same membership database across multiple applications.</p>
