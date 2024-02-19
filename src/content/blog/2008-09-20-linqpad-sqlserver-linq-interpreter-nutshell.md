---
status: publish
published: true
pubDatetime: 2008-09-20T20:00:00.000Z
title: LINQPad is Totally Awesome at Testing and Writing LINQ Queries
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 162
wordpress_url: https://peterkellner.net/2008/09/20/linqpad-sqlserver-linq-interpreter-nutshell/
date: '2008-09-20 21:25:56 -0700'
date_gmt: '2008-09-21 02:25:56 -0700'
categories:
- ASP.NET 3.5
- LINQ
- Tools
- Visual Studio
- SQL Server
tags: []
---
<p><a title="http://www.linqpad.net/" href="http://www.linqpad.net/">http://www.linqpad.net/</a> - Use with Microsoft .Net for building Query type expressions with LINQ</p>
<p>I'm not a wizard at writing <a href="http://msdn.microsoft.com/en-us/netframework/aa904594.aspx">LINQ</a> expressions so I often find myself in <a href="http://google.com">Google</a> looking for something similar to what I want, then I put it into my application and run it. This has worked pretty well, but it takes a couple iterations to get it right. It occured to me that someone probably has written a LINQ interpreter so I just guessed the name, <a href="http://www.linqpad.net/">LINQPad</a>, typed it into search, and I find the authors of the book C# 3.0 in a nutshell, <a href="http://www.technosis.com.au/Training.aspx">Joseph Albahari</a> and <a href="http://www.oreillynet.com/pub/au/465">Ben Albahari</a>, (which I like a lot) have written it.</p>
<p> <!--more-->
<p>I download it (it's an exe file), run it (OK, I trust you guys somehow), and presto, I get a very nice interface that not only has tons of examples built into it with a nice tree view, but lets me make a connection to my database and run LINQ queries against it. It even cancels them when you create one that will run forever (very nice guys!).</p>
<p>So, the query I was going after is I have a huge list of cities that includes states. From that, I just want a unique list of states (this list does not have all the states so I want just the ones contained in it). Below is a screen shot of the <a href="http://www.linqpad.net/">LINQPad</a> with my Query in it. I simply pressed the green triangle (trained by <a href="http://msdn.microsoft.com/en-us/library/aa174466(SQL.80).aspx">Sql Server Enterprise Manager</a>), and presto, my list! Could not be much easier. This tool will be in my box for a long time.</p>
<p>&#160;</p>
<table border="0" cellspacing="0" cellpadding="5" width="400">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2008/09/image3.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2008/09/image_thumb3.png" width="436" height="462" /></a></td>
<td valign="top" width="200">
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:7dc1bd33-94bd-46fd-a20b-0131235bcd47:f6c31e3c-c91c-488b-9956-0209b5fc625f" class="wlWriterSmartContent">
<table border="0" cellspacing="0" cellpadding="2" width="400">
<tbody>
<tr>
<td valign="top" width="400">
<p><a title="Amazon.com: C# 3.0 in a Nutshell" href="http://www.amazon.com/exec/obidos/ASIN/0596527578/petkelsblo-20"><img border="0" align="left" src="http://images.amazon.com/images/P/0596527578.01.MZZZZZZZ.jpg" />Amazon.com: C# 3.0 in a Nutshell</a></p>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>Grab this now!&#160; It's a winner, believe me.</p>
