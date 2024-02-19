---
status: publish
published: true
pubDatetime: 2012-01-15T20:00:00.000Z
title: When Using EF CodeFirst With Visual Studio, How to Live With Cannot drop database
  because it is in use error.
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1780
wordpress_url: https://peterkellner.net/2012/01/15/when-using-ef-codefirst-with-visual-studio-how-to-live-with-cannot-drop-database-because-it-is-in-use-error/
date: '2012-01-15 11:58:50 -0800'
date_gmt: '2012-01-15 18:58:50 -0800'
categories:
- SQL Server
- Entity Framework
- SQL
- Sql Server CE
- CodeFirst
tags: []
---
<h2>
<p>Problem</p>
</h2>
<p>So, if you have been doing development with <a href="http://www.microsoft.com/visualstudio/en-us/products/2010-editions">Visual Studio 2010</a>, <a href="http://www.microsoft.com/download/en/details.aspx?displaylang=en&amp;id=8363">Entity Framework</a> <a href="http://msdn.microsoft.com/en-us/data/aa937723">CodeFirst</a>, <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">SqlServer</a> or <a href="http://en.wikipedia.org/wiki/SQL_Server_Compact">SqlServerCE</a> for any amount of time, you’ll quickly run into the problem that the database can not be reinitialized because it is open.&#160; Basically, the scenario is this.</p>
<p>1)&#160; Put in your <a href="http://msdn.microsoft.com/en-us/library/2027ewzw.aspx">Global.asax.cs</a> file a line that always recreates the database (naturally because you are in a development mode and as you constantly change your model and seed data).&#160; The line is something like this:&#160; Database.SetInitializer(new <a href="http://msdn.microsoft.com/en-us/library/gg679506(v=vs.103).aspx">DropCreateDatabaseAlways</a>&lt;SiteDB&gt;());</p>
<p>2)&#160; Run your application with something like Debug/Run (All is fine)</p>
<p>3)&#160; Go into the database browser (either in Visual Studio or Enterprise Manager)&#160; and look at some data.</p>
<p>4)&#160; Run your application again and you will get this error: “[SqlException (0x80131904): Cannot drop database &quot;NewYorkTimesDb&quot; because it is currently in use.]”.&#160; This is because your database browser has a connection to the database and until it is dropped, you can not drop the catalog.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image9.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb7.png" width="574" height="199" /></a></p>
<p>&#160;</p>
<h2>Solutions</h2>
<p>&#160;</p>
<p>The easiest and guaranteed to work solution is just to restart your SqlServer database server (control panel, services).&#160; This is what I use to do but finally got tired of that because it takes about 20 seconds and, well, I’m very impatient.</p>
<p>The other solution <a href="http://stackoverflow.com/questions/11620/how-do-you-kill-all-current-connections-to-a-sql-server-2005-database">I found</a> in the forums (can’t find the link right now) is to execute the following script from the master database catalog:</p>
<pre class="csharpcode"><span class="kwrd">use</span> master
<span class="kwrd">ALTER</span> <span class="kwrd">DATABASE</span> NewYorkTimesDb 
   <span class="kwrd">SET</span> SINGLE_USER <span class="kwrd">WITH</span> <span class="kwrd">ROLLBACK</span> <span class="kwrd">IMMEDIATE</span> 
<span class="kwrd">ALTER</span> <span class="kwrd">DATABASE</span> NewYorkTimesDb <span class="kwrd">SET</span> MULTI_USER</pre>
<p>Basically, just switching from multi-user to single-user and back clears the connections.</p>
<p>HTH’s!<br />
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
.csharpcode .lnum { color: #606060; }</style></p>
