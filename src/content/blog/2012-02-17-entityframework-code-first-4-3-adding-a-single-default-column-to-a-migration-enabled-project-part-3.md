---
status: publish
published: true
pubDatetime: 2012-02-17T20:00:00.000Z
title: EntityFramework Code First 4.3, Adding a Single Default Column to a Migration
  Enabled Project, Part 3
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1838
wordpress_url: https://peterkellner.net/?p=1838
date: '2012-02-17 11:46:04 -0800'
date_gmt: '2012-02-17 18:46:04 -0800'
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
<p align="center"><a href="/wp/wp-content/uploads/2012/02/image_thumb4_thumb21.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image_thumb4_thumb2" border="0" alt="image_thumb4_thumb2" src="/wp/wp-content/uploads/2012/02/image_thumb4_thumb2_thumb1.png" width="244" height="176" /></a>         <br /><em>I need practice with my cell phone camera (obviously)</em>&#160; </p>
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
<h2>Goal</h2>
<p>In this post, we will show the steps necessary to add a single column (Party) to the Presidents table.&#160; Because in Part 2 we enabled Code Migrations, this will be a lot simpler than in Part 2.&#160; </p>
<p>&#160;</p>
<h2>Let’s Do it!</h2>
<p>Now, we have a stable project that is running correctly with the database table Presidents defined as follows:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image12.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb11.png" width="390" height="121" /></a></p>
<p>We want to add a new column “Party” so let’s update the model file (it’s in our original programs.cs file).&#160; It will now be changed as follows:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> Presidents
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> LastName { get; set; }

    <span class="rem">// New Columns for first migration</span>
    <span class="kwrd">public</span> <span class="kwrd">int</span> YearElected { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">bool</span> CurrentPresident { get; set; }

    <span class="rem">// New Column for second migration</span>
    <span class="kwrd">public</span> <span class="kwrd">string</span> Party { get; set; }
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
<p>We now have to create the .cs files in the MIgration folder that will know about this change.&#160; So, we simply execute the command from the package manager Add-Migration AddNewColumnParty and we get the following results:</p>
<blockquote>
<p>PM&gt; Add-Migration AddNewColumnParty<br />
    <br />Scaffolding migration 'AddNewColumnParty'. </p>
<p>The Designer Code for this migration file includes a snapshot of your current Code First model. This snapshot is used to calculate the changes to your model when you scaffold the next migration. If you make additional changes to your model that you want to include in this migration, then you can re-scaffold it by running 'Add-Migration 201202171832107_AddNewColumnParty' again.</p>
</blockquote>
<p>Now, we want to add some customization because we know that Bush and Reagan are republicans and Obama is a democrat.&#160; So, we add to the “Up()” method the following:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Up()
{
    AddColumn(<span class="str">&quot;Presidents&quot;</span>, <span class="str">&quot;Party&quot;</span>, c =&gt; c.String());

    Sql(<span class="str">&quot;UPDATE Presidents SET Party = 'Republican' WHERE LastName='ReaganX'&quot;</span>);
    Sql(<span class="str">&quot;UPDATE Presidents SET Party = 'Republican' WHERE LastName='BushX'&quot;</span>);
    Sql(<span class="str">&quot;UPDATE Presidents SET Party = 'Democrat' WHERE LastName='ObamaX'&quot;</span>);
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
<p>Now, we run the package manager command: Update-Database –Verbose and the work is done for us.</p>
<blockquote>
<p>PM&gt; Update-Database -Verbose<br />
    <br />Using NuGet project 'ConApp'. </p>
<p>Using StartUp project 'ConApp'. </p>
<p>Target database is: 'agelessemail' (DataSource: ., Provider: System.Data.SqlClient, Origin: Configuration). </p>
<p>Applying explicit migrations: [201202171832107_AddNewColumnParty]. </p>
<p>Applying explicit migration: 201202171832107_AddNewColumnParty. </p>
<p>ALTER TABLE [Presidents] ADD [Party] [nvarchar](max) </p>
<p>UPDATE Presidents SET Party = 'Republican' WHERE LastName='ReaganX' </p>
<p>UPDATE Presidents SET Party = 'Republican' WHERE LastName='BushX' </p>
<p>UPDATE Presidents SET Party = 'Democrat' WHERE LastName='ObamaX' </p>
<p>[Inserting migration history record]</p>
</blockquote>
<p>Now, looking at the generated data we have:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/02/image13.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/02/image_thumb12.png" width="375" height="149" /></a></p>
<p>&#160;</p>
<p>Keep in mind that “Update-Database” figured out what database we were on and just did the appropriate update.&#160; The beauty of this is if some developer in the group is on a different version, all she has to do is say “Update-Database” and there database will be brought up to date along with whatever version was current at the time.</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>All I can say is <strong>“Congrats!”</strong> to the Microsoft engineers.&#160; I’ve been doing ORM’s for a long time and have my doubts along the way about some Microsoft has rolled out, but this time, I think they really have listened and done what we need.</p>
