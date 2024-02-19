---
status: publish
published: true
pubDatetime: 2012-02-17T20:00:00.000Z
title: EntityFramework 4.3 CodeFirst Trivial One File Example &ndash; Part 1
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1841
wordpress_url: https://peterkellner.net/?p=1841
date: '2012-02-17 11:47:26 -0800'
date_gmt: '2012-02-17 18:47:26 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>&#160;</p>
<h2>Introduction</h2>
<p>This three part series demonstrates a very simple example of using <a href="http://www.asp.net/entity-framework">Entity Framework</a> <a href="http://msdn.microsoft.com/en-us/data/aa937723">Code First</a> (<a href="http://blogs.msdn.com/b/adonet/archive/2012/02/09/ef-4-3-released.aspx">Version 4.3</a>) to create a <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">SqlServer</a> Table and populate it with data (that is part 1).&#160; Part 2 adds two new columns to the table a populates the data conditionally (while migrating from a non migration enabled project), and Part 3 adds a new column with a default value to a migration enabled code first project.</p>
<p>As it happens, I watched President Obama drive by me in San Francisco yesterday so he will be the star of the post.&#160; The table we will use is called Presidents, and the columns we will add are Year Elected and Current.&#160; We will obviously only have one current president so we will have to have our migration conditionally set CurrentPresident to true for Obama.</p>
<p>&#160;</p>
<p>&#160;</p>
<div>
<div style="float: right">
<p align="center"><a href="/wp/wp-content/uploads/2012/02/image_thumb4_thumb2.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image_thumb4_thumb2" border="0" alt="image_thumb4_thumb2" src="/wp/wp-content/uploads/2012/02/image_thumb4_thumb2_thumb.png" width="244" height="176" /></a>         <br /><em>I need practice with my cell phone camera (obviously)</em>&#160; </p>
</p></div>
<div>
<table border="1" cellspacing="0" cellpadding="2" width="360">
<tbody>
<tr>
<td valign="top" width="224"><strong><a href="/2012/02/17/entityframework-4-3-codefirst-trivial-one-file-example-part-1">Part 1</a></strong></td>
<td valign="top" width="234"><strong><a href="/2012/02/17/entityframework-4-3-codefirst-trivial-one-file-example-part-1">Building a 1 File Console App That Creates a SqlServer Table and Populates it With Data</a></strong></td>
</tr>
<tr>
<td valign="top" width="243"><strong><a href="/2012/02/17/entityframework-codefirst-4-3-adding-data-migration-to-simple-example-part-2">Part 2</a></strong></td>
<td valign="top" width="244"><strong><a href="/2012/02/17/entityframework-codefirst-4-3-adding-data-migration-to-simple-example-part-2">Adding Two New Columns To the Customer Table and Populating Data Conditionally using New Migrations Feature (With Upgrade To Code Migrations from Project Without Code Migrations)</a></strong></td>
</tr>
<tr>
<td valign="top" width="243"><strong><a href="/2012/02/17/entityframework-code-first-4-3-adding-a-single-default-column-to-a-migration-enabled-project-part-3">Part 3</a></strong></td>
<td valign="top" width="244"><strong><a href="/2012/02/17/entityframework-code-first-4-3-adding-a-single-default-column-to-a-migration-enabled-project-part-3">Changing your CodeFirst DataModel with Migrations Enabled</a></strong></td>
</tr>
</tbody>
</table></div>
<div>&#160;</div>
<div>For those wanting the real code, the final visual studio solution after part 3, includes parts 1 and 2 information is here:&#160;
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:1592ae0a-feab-473c-a58f-1002482b399d" class="wlWriterSmartContent">
<p><a href="file:///C:/Users/pkellner/AppData/Local/Temp/WindowsLiveWriter1286139640/supfiles11F36BE/ConApp[2].zip" target="_blank">VS Solution</a></p>
</p></div>
</p></div>
</p></div>
<div>&#160;</div>
<div>&#160;</div>
<h2>
<p>&#160;</p>
<p>What To Do</p>
</h2>
<div>We simply create a console version with Visual Studio 2010 in c#.&#160; Using nuget package manager console we say “Install-Package EntityFramework”, then replace the primary Program.cs with the following file (you should add a connection string with the name SiteDB also if you want it to create a SqlServer Database.</div>
<div>&#160;</div>
<div>Here is the code:</div>
<div>&#160;</div>
<pre class="csharpcode"><span class="kwrd">namespace</span> ConApp
{
    <span class="kwrd">internal</span> <span class="kwrd">class</span> Program
    {
        <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> Main()
        {
            Database.SetInitializer&lt;SiteDB&gt;(<span class="kwrd">new</span> SiteDBInitialize());
            <span class="kwrd">using</span> (var myContext = <span class="kwrd">new</span> SiteDB())
            {
                var x = myContext.Presidents.ToList();
            }
        }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> SiteDB : DbContext
    {
        <span class="kwrd">public</span> DbSet&lt;Presidents&gt; Presidents { get; set; }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> Presidents
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">string</span> LastName { get; set; }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> SiteDBInitialize :
        DropCreateDatabaseIfModelChanges&lt;SiteDB&gt;
    {
        <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Seed(SiteDB context)
        {
            context.Presidents.Add(<span class="kwrd">new</span> Presidents { LastName = <span class="str">&quot;Reagan&quot;</span> });
            context.Presidents.Add(<span class="kwrd">new</span> Presidents { LastName = <span class="str">&quot;Bush&quot;</span> });
            context.Presidents.Add(<span class="kwrd">new</span> Presidents { LastName = <span class="str">&quot;Obama&quot;</span> });
            context.SaveChanges();
        }
    }

}</pre>
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
<p>I won’t go into details of all the steps because this is all very well documented on the EF site at this url among others:</p>
<p><a href="http://msdn.microsoft.com/en-us/library/gg696189(v=vs.103).aspx">http://msdn.microsoft.com/en-us/library/gg696189(v=vs.103).aspx</a></p>
<p>What is interesting to note is that I am implementing the interface DropCreateDatabaseIfModelChanges.&#160; What stumped me for a while was that in my main console, we always call new SiteDBInitialize), however what that class implments determines the action on creation.&#160; There are three choices.</p>
<ol>
<li><a href="http://msdn.microsoft.com/en-us/library/gg679604(v=vs.103).aspx">DropCreateDatabaseIfModelChanges</a> </li>
<li><a href="http://msdn.microsoft.com/en-us/library/gg679506(v=vs.103).aspx">DropCreateDatabaseAlways</a> </li>
<li><a href="http://msdn.microsoft.com/en-us/library/gg679221(v=vs.103).aspx">CreateDatabaseIfNotExists</a> </li>
</ol>
<p>The meaning is self explanatory, you just need to derive from the appropriate class depending on what your intention is.&#160; All the calls can be seen here in the MSDN documentation:&#160; <a href="http://msdn.microsoft.com/en-us/library/gg696142(v=vs.103).aspx">http://msdn.microsoft.com/en-us/library/gg696142(v=vs.103).aspx</a></p>
<p>Hope this helps, read on to part 2 to find out how to add some columns and conditionally populate them.</p>
<p>&#160;</p>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
