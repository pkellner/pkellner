---
status: publish
published: true
pubDatetime: 2009-01-17T20:00:00.000Z
title: First Experience with Visual Studio 2008 Database Edition, I love it!!!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 235
wordpress_url: https://peterkellner.net/2009/01/17/visual-studio-database-edition-review-sqlserver2008/
date: '2009-01-17 15:06:11 -0800'
date_gmt: '2009-01-17 22:06:11 -0800'
categories:
- Best Practices
- Visual Studio
- SQL Server
- Database
tags: []
---
<p>As a developer who has spent much of my life doing DBA type work, I really appreciate the simplicity and elegance of what Microsoft Visual Studio Team has put together with the <a href="http://blogs.msdn.com/gertd/archive/2007/11/21/visual-studio-team-system-2008-database-edition.aspx">Database Edition</a> and can be seen for sale here as the </p>
<p><a href="http://click.linksynergy.com/fs-bin/click?id=cLhVEJVzoSE&offerid=166833.737&type=2&subid=0">Microsoft Visual Studio 2010 Premium with MSDN Download - Download Direct from Microsoft</a><IMG border=0 width=1 height=1 src="http://ad.linksynergy.com/fs-bin/show?id=cLhVEJVzoSE&bids=166833.737&type=2&subid=0" ></p>
<p> I'll first try and explain in a nutshell what it is.&#160; Then I'll go through an example of creating a Visual Studio Database Project out of a site I've been working on to show the steps.&#160; Finally, I'll give a short summary reliving the experience and giving you some other pointers that may help you get through the experience.</p>
<h3>What is VS2008 Database Edition?</h3>
<p>Basically, what VS2008 does is to first process your existing schema into hundreds (maybe thousands) of little files.&#160; That is, each file is one database thing. That thing might be a table definition, a stored procedure, a trigger, a constraint, a foreign key, etc.&#160; The beauty of this is that now, each thing can be tracked separately.&#160; Say for example, you want to update just one table and someone else on your team wants to update another table in the same schema.&#160; Since the files are now separate files, it's no problem.&#160; When you grab the latest changes from source control, you will get your friends changes and he will get yours.&#160; Very very clean!</p>
<div id='extendedEntryBreak' name='extendedEntryBreak'></div>
<p>Also, it has a very powerful comparison engine.&#160; Say you update your data outside of this project.&#160; VS2008 Database Edition will compare your definitions in all these little files with either a sql script you generate, or it will connect to an external database and compare to that.&#160; Me personally, I like to use a tool called <a href="http://www.sqlmanager.net/en/products/studio/mssql">SqlManager</a> to manage my data.&#160; I can continue to do that, then when I've made my changes, I can simply connect VS2008 Database Edition to my updated development database and it will automatically figure out the changes.</p>
<p>So, you may ask, what version do I need to run this of Visual Studio?&#160; The answer is in this link:&#160; <a title="http://msdn.microsoft.com/en-us/vs2008/products/cc149003.aspx" href="http://msdn.microsoft.com/en-us/vs2008/products/cc149003.aspx">http://msdn.microsoft.com/en-us/vs2008/products/cc149003.aspx</a></p>
<h3>Here We Go, Let's do an Example</h3>
<p>So, first, I will open my existing solution which has a web project in it, a data access project as well as other projects.&#160; Then, I create the new Database solution by saying File/Open/New Project/Database Project.</p>
<p><a href="/wp/wp-content/uploads/2009/01/image.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb.png" width="395" height="208" /></a></p>
<p>Then, we follow the wizard...</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_3.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_3.png" width="244" height="182" /></a></p>
<p>Taking defaults...</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_4.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_4.png" width="244" height="182" /></a></p>
<p><a href="/wp/wp-content/uploads/2009/01/image_5.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_5.png" width="244" height="182" /></a></p>
<p>Now, I choose my schema.</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_6.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_6.png" width="244" height="182" /></a></p>
<p>Press Start...</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_7.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_7.png" width="244" height="182" /></a></p>
<p>Once you've done that, you'll now have your schema spread out across your project in little files.&#160; Below is what the &quot;file based&quot; view of your schema looks like.</p>
<p><a href="/wp/wp-content/uploads/2009/01/image_8.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_8.png" width="412" height="295" /></a></p>
<p>Notice that the file we are looking at also includes comments for both the table and the columns using the standard extended property documentation format as follows:</p>
<pre class="csharpcode"><span class="kwrd">GO</span>
<span class="kwrd">EXECUTE</span> sp_addextendedproperty @name = N<span class="str">'MS_Description'</span>, 
@<span class="kwrd">value</span> = N<span class="str">'tracks all changes from each camp

title;link;guid;pubDate;category;description'</span>, @level0type = N<span class="str">'SCHEMA'</span>, 
@level0name = N<span class="str">'dbo'</span>, @level1type = N<span class="str">'TABLE'</span>, 
@level1name = N<span class="str">'CampFeed'</span>;


<span class="kwrd">GO</span>
<span class="kwrd">EXECUTE</span> sp_addextendedproperty @name = N<span class="str">'MS_Description'</span>, 
@<span class="kwrd">value</span> = N<span class="str">'if true, this is the main news feed from the site.  
there should only be one main news feed from any site.  this would 
not be feeds like twitter'</span>, @level0type = N<span class="str">'SCHEMA'</span>, 
@level0name = N<span class="str">'dbo'</span>, 
@level1type = N<span class="str">'TABLE'</span>, @level1name = N<span class="str">'CampFeed'</span>, 
@level2type = N<span class="str">'COLUMN'</span>, @level2name = N<span class="str">'PrimaryFeed'</span>;</pre>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode">Now, when you actually build the project as follows:</pre>
<pre class="csharpcode"><a href="/wp/wp-content/uploads/2009/01/image_9.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_9.png" width="242" height="244" /></a> </pre>
<p>it will generate the full script combining all the files back into one again. Here is where it puts it:</p>
<pre class="csharpcode">&#160;</pre>
<pre class="csharpcode"><a href="/wp/wp-content/uploads/2009/01/image_10.png"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2009/01/image_thumb_10.png" width="414" height="332" /></a> </pre>
<pre class="csharpcode">&#160;</pre>
<p>So, that's about it for now. I haven't gone into any of the ways to compare and update your schema based on external changes, but we can leave that for another post.</p>
<p>To see a great video by <a href="http://blog.hundhausen.com/">Richard Hundhausen</a>, President of <a title="http://www.accentient.com/" href="http://www.accentient.com/">Accentient</a>, a <a href="http://msdn.microsoft.com/en-us/vsts2008/aa718934.aspx">Team Systems</a> Consulting company, go to this link:&#160; <a title="http://msdn.microsoft.com/en-us/vsts2008/cc659682.aspx" href="http://msdn.microsoft.com/en-us/vsts2008/cc659682.aspx">http://msdn.microsoft.com/en-us/vsts2008/cc659682.aspx</a></p>
<p>Also, if you are using Sql Server 2008, make sure you install visual studio 2008 sp1, then go to this link and install the download:&#160; <a title="http://www.microsoft.com/downloads/details.aspx?FamilyID=bb3ad767-5f69-4db9-b1c9-8f55759846ed&amp;displaylang=en" href="http://www.microsoft.com/downloads/details.aspx?FamilyID=bb3ad767-5f69-4db9-b1c9-8f55759846ed&amp;displaylang=en">http://www.microsoft.com/downloads/details.aspx?FamilyID=bb3ad767-5f69-4db9-b1c9-8f55759846ed&amp;displaylang=en</a></p>
<h3>Conclusions</h3>
<p>From what I can tell, this Visual Studio Database Edition will be a huge help in building database schema's and database programs (sp's, triggers,etc.) in a collaborative environment.&#160;&#160; If you have the license to use this, I strongly recommend it.&#160; It is definitely going to be part of my tool kit for now on.&#160; Even if I'm the only author in the project.</p>
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
