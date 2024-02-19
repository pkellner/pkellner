---
status: publish
published: true
pubDatetime: 2011-08-11T20:00:00.000Z
title: Connecting To SqlServer From Web.Config Without a Password (Trusted Connection)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1530
wordpress_url: https://peterkellner.net/2011/08/11/connecting-to-sqlserver-from-web-config-without-a-password-trusted-connection/
date: '2011-08-11 09:19:56 -0700'
date_gmt: '2011-08-11 16:19:56 -0700'
categories:
- SQL Server
- Sql Server 2008
- ".NET 4.0"
tags: []
---
<p>I often forget that the simplest way (IMHO) to connect to a <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft</a> <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">SqlServer 2008</a> database is to use the <a href="http://msdn.microsoft.com/en-us/library/aa306178.aspx">web.config</a> connection for making a Trusted connection.&#160; Basically, it keeps you from having to put a username and password in the web.config and also from having to keep track of different username and passwords on different systems (like where you deploy to for example).&#160; The simplest connection string I can think of looks like this:</p>
<div id="codeSnippetWrapper">&#160;</div>
<div>&#160;</div>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">&lt;add name=<span style="color: #006080">&quot;MyConnName&quot;</span> connectionString=<span style="color: #006080">&quot;Server=.;Database=mydbcatalogname;Trusted_Connection=True;&quot;</span> <br />    providerName=<span style="color: #006080">&quot;System.Data.SqlClient&quot;</span> /&gt;</pre>
<p></div>
<p>Notice that I’m using the “.” as the server name.&#160; This allows me to reference the local system where my sqlserver lives. Not necessarily a best practice, but often is the case.</p>
<h3>Upside</h3>
<p>One big benefit is if you fall victim to a <a href="http://www.imperva.com/products/wsc_web-application_attacks.html">disk scraping attack</a>, or someone gets a hold of your source (maybe from version control?), you don’t give up your passwords.</p>
<h3>Downside</h3>
<p>If you SqlSever is not on the system system as your web project or application, then this become more tricky because of the cross system authentication issues.&#160; If you have active directory installed on both systems, then this works also.</p>
