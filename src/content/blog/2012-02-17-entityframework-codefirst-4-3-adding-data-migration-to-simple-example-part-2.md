---
status: publish
published: true
pubDatetime: 2012-02-17T20:00:00.000Z
title: EntityFramework CodeFirst 4.3, Adding Data Migration To Simple Example (Part
  2)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1832
wordpress_url: https://peterkellner.net/?p=1832
date: '2012-02-17 11:41:25 -0800'
date_gmt: '2012-02-17 18:41:25 -0800'
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
<p align="center"><a href="/wp/wp-content/uploads/2012/02/image_thumb41.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image_thumb4" border="0" alt="image_thumb4" src="/wp/wp-content/uploads/2012/02/image_thumb4_thumb.png" width="272" height="195" /></a>         <br /><em>I need practice with my cell phone camera (obviously)</em>&#160; </p>
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
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:1592ae0a-feab-473c-a58f-1002482b399d" class="wlWriterEditableSmartContent">
<p> <a href="/wp/wp-content/uploads/2012/02/ConApp.zip" target="_blank">VS Solution</a></p>
</div>
</div></div>
<div>&#160;</div>
<div>&#160;</div>
<h2>Our Goal</h2>
<div>&#160;</div>
<div>We simply want to update the table “Presidents” which currently has two columns, Id and LastName.&#160; We want to add the columns “YearElected” and “Current”.&#160; If the president (LastName) is Obama, we want to set CurrentPresident to true, if not false.</div>
<div>&#160;</div>
<div>&#160;</div>
<div><a href="/wp/wp-content/uploads/2012/02/image6.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb6.png" width="244" height="108" /></a></div>
<div>&#160;</div>
<h2>Here We Go</h2>
<div>&#160;</div>
<div>First thing, let’s make sure that our SiteDBInitialize (see part 1) is set to implement CreateDatabaseIfNotExists.&#160; That code should look like the following:</div>
<div>&#160;</div>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> SiteDBInitialize :
        CreateDatabaseIfNotExists&lt;SiteDB&gt;
    {</pre>
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
<div>&#160;</div>
<div>Next, let’s add the columns to both our Seed method as well as the Presidents class.&#160; For clarity, I’m pasting the complete program below (remember, this is it!)</div>
<div>&#160;</div>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Collections.Generic;
<span class="kwrd">using</span> System.ComponentModel.DataAnnotations;
<span class="kwrd">using</span> System.Linq;
<span class="kwrd">using</span> System.Text;
<span class="kwrd">using</span> System.Data.Entity;

<span class="kwrd">namespace</span> ConApp
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

        <span class="rem">// New Columns:</span>
        <span class="kwrd">public</span> <span class="kwrd">int</span> YearElected { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">bool</span> CurrentPresident { get; set; }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> SiteDBInitialize :
        CreateDatabaseIfNotExists&lt;SiteDB&gt;
    {
        <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Seed(SiteDB context)
        {
            context.Presidents.Add(<span class="kwrd">new</span> Presidents
                                       {
                                           LastName = <span class="str">&quot;Reagan&quot;</span>,
                                           CurrentPresident = <span class="kwrd">false</span>,
                                           YearElected = 1984
                                       });
            context.Presidents.Add(<span class="kwrd">new</span> Presidents
                                       {
                                           LastName = <span class="str">&quot;Bush&quot;</span>,
                                           CurrentPresident = <span class="kwrd">false</span>,
                                           YearElected = 1992
                                       });
            context.Presidents.Add(<span class="kwrd">new</span> Presidents
                                       {
                                           LastName = <span class="str">&quot;Obama&quot;</span>,
                                           CurrentPresident = <span class="kwrd">true</span>,
                                           YearElected = 2008
                                       });
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
<p>In our case, the initializer will only be called if the database does not exist.&#160; Let’s change the data in the database just so we know that our data has been migrated and not simply replaced.&#160; Here is a screen shot of what I’ve changed it to (notice I’ve added an “x” to the end of each LastName).</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image7.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb7.png" width="205" height="149" /></a></p>
<p>&#160;</p>
<p>Now, if I run this, I get an error that says I need to run migrations.&#160; The error is as follows:</p>
<blockquote>
<p>Unhandled Exception: System.InvalidOperationException: The model backing the 'Si<br />
    <br />teDB' context has changed since the database was created. Consider using Code Fi </p>
<p>rst Migrations to update the database (<a href="http://go.microsoft.com/fwlink/?LinkId=23">http://go.microsoft.com/fwlink/?LinkId=23</a> </p>
<p>8269). </p>
<p>&#160;&#160; at System.Data.Entity.CreateDatabaseIfNotExists`1.InitializeDatabase(TContext </p>
<p>context)</p>
</blockquote>
<p>This is great!&#160; It is telling me my model has changed and telling me where I need to go look to learn what to do.&#160; So, after looking there, I discover (with a little digging) that I need to –EnableAutomatic.</p>
<p>&#160;</p>
<p><a href="http://blogs.msdn.com/b/adonet/archive/2012/02/09/ef-4-3-code-based-migrations-walkthrough.aspx"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image8.png" width="433" height="70" /></a></p>
<p>&#160;</p>
<p>After doing this, I’m surprised to get this error (OK, I admit I’m learning this new feature, it just came out this week) as I’m writing this blog post.</p>
<blockquote>
<p>PM&gt; Enable-Migrations<br />
    <br />Detected database created with a database initializer. Scaffolded migration '201202171606443_InitialCreate' corresponding to current database schema. To use an automatic migration instead, delete the Migrations folder and re-run Enable-Migrations specifying the -EnableAutomaticMigrations parameter. </p>
<p>Code First Migrations enabled for project ConApp.</p>
</blockquote>
<p>What I see happened is that Enable-Migrations create a new folder structure as follows:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image9.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb8.png" width="244" height="188" /></a></p>
<p>&#160;</p>
<p>Basically, what has happened is “Enable-Migrations” did the following:</p>
<ol>
<li>Create a file Migrations/Configuration (determines how migrations behave for the current context, one in this case, DBSite). </li>
<li>201..443_InitialCreate.cs was created because our initial database was created before migrations were enabled.&#160; It represents just the table before the latest columns were added. </li>
</ol>
<p>Now, we run the package manager commanda:&#160; </p>
<blockquote>
<p><em>Add-Migration AddingNewColumnsElectedYearAndCurrentPresident</em></p>
</blockquote>
<p>And, from that we get the message:</p>
<blockquote>
<p>The Designer Code for this migration file includes a snapshot of your current Code First model. This snapshot is used to calculate the changes to your model when you scaffold the next migration. If you make additional changes to your model that you want to include in this migration, then you can re-scaffold it by running 'Add-Migration 201202171748276_AddingNewColumnsElectedYearAndCurrentPresident' again.</p>
</blockquote>
<p>Now, we have some new files in our Migrations folder as follows:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image10.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb9.png" width="459" height="108" /></a></p>
<p>This file: 201202171748276_AddingNewColumnsElectedYearAndCurrentPresident.cs has code in it that both upgrades and downgrades our database.&#160; Very nice Microsoft!</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> AddingNewColumnsElectedYearAndCurrentPresident : DbMigration
    {
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Up()
        {
            AddColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;YearElected&quot;</span>, c =&gt; c.Int(nullable: <span class="kwrd">false</span>));
            AddColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;CurrentPresident&quot;</span>, c =&gt; c.Boolean(nullable: <span class="kwrd">false</span>));
        }
        
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Down()
        {
            DropColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;CurrentPresident&quot;</span>);
            DropColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;YearElected&quot;</span>);
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
<p>Then, to the Up method, let’s add our custom datacolumn settings:</p>
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
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Up()
{
    AddColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;YearElected&quot;</span>, c =&gt; c.Int(nullable: <span class="kwrd">false</span>));
    AddColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;CurrentPresident&quot;</span>, c =&gt; c.Boolean(nullable: <span class="kwrd">false</span>));

    Sql(<span class="str">&quot;UPDATE Presidents SET CurrentPresident = 0,YearElected = 1980 WHERE LastName='ReaganX'&quot;</span>);
    Sql(<span class="str">&quot;UPDATE Presidents SET CurrentPresident = 1,YearElected = 1992 WHERE LastName='BushX'&quot;</span>);
    Sql(<span class="str">&quot;UPDATE Presidents SET CurrentPresident = 1,YearElected = 2008 WHERE LastName='ObamaX'&quot;</span>);
}</pre>
<p>Not forgetting, we need to enable automatic migrations as follows in the Configuration.cs file</p>
<pre class="csharpcode"><span class="kwrd">internal</span> <span class="kwrd">sealed</span> <span class="kwrd">class</span> Configuration : DbMigrationsConfiguration&lt;ConApp.SiteDB&gt;
    {
        <span class="kwrd">public</span> Configuration()
        {
            AutomaticMigrationsEnabled = <span class="kwrd">true</span>;
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
<p>&#160;</p>
<p>Now, Build your app (probably necessary) and run the update database package command: </p>
<blockquote>
<p>PM&gt; Update-Database -Verbose</p>
</blockquote>
<p>And you’ll get this nice output showing you the sql generated:</p>
<blockquote>
<p>Using NuGet project 'ConApp'.<br />
    <br />Using StartUp project 'ConApp'. </p>
<p>Target database is: 'agelessemail' (DataSource: ., Provider: System.Data.SqlClient, Origin: Configuration). </p>
<p>Applying explicit migrations: [201202171748276_AddingNewColumnsElectedYearAndCurrentPresident]. </p>
<p>Applying explicit migration: 201202171748276_AddingNewColumnsElectedYearAndCurrentPresident. </p>
<p>ALTER TABLE [Presidents] ADD [YearElected] [int] NOT NULL DEFAULT 0 </p>
<p>ALTER TABLE [Presidents] ADD [CurrentPresident] [bit] NOT NULL DEFAULT 0 </p>
<p>UPDATE Presidents SET CurrentPresident = 0,YearElected = 1980 WHERE LastName='ReaganX' </p>
<p>UPDATE Presidents SET CurrentPresident = 1,YearElected = 1992 WHERE LastName='Bush' </p>
<p>UPDATE Presidents SET CurrentPresident = 1,YearElected = 2008 WHERE LastName='ObamaX' </p>
<p>[Inserting migration history record]</p>
</blockquote>
<p>And when you look at the data, you will of course see:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image11.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb10.png" width="483" height="150" /></a></p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>OK, this was a little more involved than I thought it would be.&#160; Primarily because we were going from a project that did not have code migrations enabled to one that does (I am glad I went through the exercise though).&#160; In Part 3 (which I was not planning on doing) I’ll look at what it takes to add YAC (yet another column) to the Presidents Table now that we have Automatic Code Migrations enabled.</p>
<p>Hope this helps!&#160; Move on to part 3 now.</p>
