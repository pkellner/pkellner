---
status: publish
published: true
pubDatetime: 2011-09-02T20:00:00.000Z
title: My First Experience With SqlServer CE 4.0
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1559
wordpress_url: https://peterkellner.net/2011/09/02/my-first-experience-with-sqlserver-ce-4-0/
date: '2011-09-02 08:57:43 -0700'
date_gmt: '2011-09-02 15:57:43 -0700'
categories:
- SQL Server
- Sql Server 2008
- ".NET 4.0"
- Sql Server CE
tags: []
---
<p>I have heard all the hype about how great <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">Sql Server CE 4.0</a> and that it is now standard with <a href="http://support.microsoft.com/kb/983509">Visual Studio 2010 SP1</a>.</p>
<p>&#160;</p>
<p><a href="http://weblogs.asp.net/scottgu/archive/2011/01/11/vs-2010-sp1-and-sql-ce.aspx"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/09/image.png" width="592" height="185" /></a></p>
<p>&#160;</p>
<p>I’ve got a small project (1 table) that I’d like to include in an asp.net website project so I decided to give it a try.&#160; For the most part, things have gone smoothly, however I did have a couple hiccups I’d like to mention.&#160; One cost me <a href="http://www.gogoair.com/gogo/splash.do">$9</a> because I was doing this implementation on an airplane and immediately, I had a failed connection with a confusing error that I needed Bing to lookup&#160; (more details below).</p>
<p>&#160;</p>
<p>  <!--more--><br />
<h2>Method Names Changed</h2>
<p>&#160;</p>
<p>I have to wonder why Microsoft decided to change the names of the methods in ADO.NET.&#160; Seems to me that all the names should be the same whether I’m using Sql Server, Sql Server Express or Sql Server CE.&#160; My expectation was that the statement:</p>
<div id="codeSnippetWrapper">&#160;</div>
<div>
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">using</span> (<span style="color: #0000ff">var</span> connection = <span style="color: #0000ff">new</span> SqlConnection(testDataContext.ConnectionString)) {..</pre>
</div>
<div>&#160;</div>
<div>would work correctly, however, I get the very misleading (or at least unhelpful) error:</div>
<div>&#160;</div>
<h4><i>A network-related or instance-specific error occurred while establishing a connection to SQL Server. The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections. (provider: SQL Network Interfaces, error: 26 - Error Locating Server/Instance Specified)</i></h4>
<div>&#160;</div>
<div>It turns out, you need to open the connection like this:</div>
<div>&#160;</div>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">using</span> (<span style="color: #0000ff">var</span> connection = <span style="color: #0000ff">new</span> SqlCeConnection(connectionString)) {...</pre>
<p></div>
<p>And things now work (my connection string is actually what I’ve pasted below).</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">&lt;</span><span style="color: #800000">connectionStrings</span><span style="color: #0000ff">&gt;</span><br />  <span style="color: #0000ff">&lt;</span><span style="color: #800000">add</span> <span style="color: #ff0000">name</span><span style="color: #0000ff">=&quot;ConnectionStringMxMessage&quot;</span> <span style="color: #ff0000">connectionString</span><span style="color: #0000ff">=&quot;Data Source=|DataDirectory|\MxMessageDb.sdf&quot;</span><br />       <span style="color: #ff0000">providerName</span><span style="color: #0000ff">=&quot;System.Data.SqlServerCe.4.0&quot;</span> <span style="color: #0000ff">/&gt;</span><br /><span style="color: #0000ff">&lt;/</span><span style="color: #800000">connectionStrings</span><span style="color: #0000ff">&gt;</span></pre>
<p></div>
<p>Bottomline, all ado.net commands need the Ce in them.</p>
<p>&#160;</p>
<p>&#160;</p>
<h2>Getting Identity Column After Insert Fails</h2>
<p>&#160;</p>
<p>My expectation is that what has worked for a very long time in Sql Server for me should work in Sql Server CE.&#160; The most simple pattern of inserting a row and getting back the value of the identity column does not work the same.&#160; My original code looks like this (which fails):</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">using (var connection = new SqlCeConnection(testDataContext.ConnectionString))<br />    {<br />        connection.Open();<br />        using (var sqlCeCommand =<br />            new SqlCeCommand(<br />                &quot;INSERT INTO message (Name, Subject, Header, Body, Footer) Values <br />                    (@Name);SELECT @@IDENTITY&quot;,<br />                connection))<br />        {<br />            sqlCeCommand.Parameters.Add(&quot;@Name&quot;, SqlDbType.NVarChar).Value = Name;<br />            // problem, need to do separate select to get this to work<br />            sqlCeCommand.Parameters.Add<br />                (new SqlCeParameter(&quot;@IDENTITY&quot;, SqlDbType.Int)<br />                                            {<br />                                                Direction =<br />                                                    ParameterDirection.Output<br />                                            });<br /><br />            using (var reader = sqlCeCommand.ExecuteReader())<br />            {<br />                while (reader.Read())<br />                {<br />                    message.Id = reader.IsDBNull(0) ? 0 : <br />                      Convert.ToInt32(reader.GetDecimal(0));<br />                }<br />            }<br />        }<br />    }<br />}</pre>
<p></div>
<p></div>
<p>To fix it, it seems that you can not send two sql commands on the same execution (separated by semicolon).&#160; That is, after the first command (without the SELECT @@IDENTITY) you need to do another SqlCeCommand as follows:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">using (var sqlCeCommand2 =<br />    new SqlCeCommand(<br />        &quot;SELECT @@IDENTITY&quot;,<br />        connection))<br />{<br />    message.Id = Convert.ToInt32(sqlCeCommand2.ExecuteScalar());<br />}</pre>
</div>
<h2>
<p>&#160;</p>
<p>Conclusions</p>
</h2>
<p>Well, things are working, but I have not done much and I’ve had a couple of stumbles.&#160; Hopefully I’m done with stumbling for now.</p>
<div>
  </div>
