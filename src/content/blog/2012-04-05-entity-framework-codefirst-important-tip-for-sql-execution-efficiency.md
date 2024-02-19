---
status: publish
published: true
pubDatetime: 2012-04-05T20:00:00.000Z
title: Entity Framework CodeFirst Important Tip For SQL Execution Efficiency
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1920
wordpress_url: https://peterkellner.net/2012/04/05/entity-framework-codefirst-important-tip-for-sql-execution-efficiency/
date: '2012-04-05 11:24:27 -0700'
date_gmt: '2012-04-05 18:24:27 -0700'
categories:
- SQL Server
- Sql Server 2008
- Entity Framework
- CodeFirst
tags: []
---
<p>&#160;</p>
<h2>Introduction</h2>
<p>&#160;</p>
<p>I’ve now been using <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft’s</a>&#160;<a href="http://msdn.microsoft.com/en-us/library/bb399572.aspx">Entity Framework</a> <a href="http://blogs.msdn.com/b/adonet/archive/tags/code+first/">CodeFirst</a> for a month or two and am very impressed with how easily it is to access data in a type safe way.&#160; I also have noticed that I need to be extra careful about how I form my LINQ or I can accidentally cause the <a href="http://www.microsoft.com/sqlserver/en/us/default.aspx">Sql Server</a> to do tons of extra work (tons meaning lots, not actually tons).</p>
<p>I’ll basically explain this with actual code snippets to demonstrate my point and help you understand what I’m talking about. Let’s say you have a set of classes representing your model that basically have a master record and an associated detail record that contains an reference to a table that hold images.&#160; That is, basically, something like this:</p>
<p>&#160;</p>
<pre class="csharpcode"> <span class="kwrd">public</span> <span class="kwrd">class</span> User
    {
        [Key] 
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">string</span> FirstName { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">string</span> LastName { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">virtual</span> ICollection&lt;AddressBookEntry&gt; 
                        AddressBookEntries { get; set; } 
     }

 <span class="kwrd">public</span> <span class="kwrd">class</span>    AddressBookEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
        <span class="kwrd">public</span> ImageDetail ImageDetail { get; set; }
    }

<span class="kwrd">public</span> <span class="kwrd">class</span> ImageDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }

        [Required(ErrorMessage = <span class="str">&quot;Image Without Data Means Nothing&quot;</span>)]
        [Column(TypeName = <span class="str">&quot;image&quot;</span>)]
        <span class="kwrd">public</span> <span class="kwrd">byte</span>[] ImageDataBytes { get; set; }
    }</pre>
<h2>The Goal For Your Query</h2>
<p>The goal for your <a href="http://msdn.microsoft.com/en-us/data/aa937723">EF</a> query is you want to create a simple image viewer web page.&#160; That is, you want to get the following information from your query that will list the address book of a given person.&#160; The columns you want back for each address book entry (of a given user) are as follows:</p>
<ul>
<ul>
<li>AddressBookEntry.Id</li>
<li>ImageDetail.Id</li>
</ul>
</ul>
<p>You don’t actually want the blob data itself because you will let the html img tag actually get the data for you.</p>
<p>&#160;</p>
<h2>The Wrong Way</h2>
<p>You are probably tempted to write a query that looks something like this:</p>
<pre class="csharpcode">var userAccount =
       db.Users.Where(a =&gt; a.Id == userIdIWant).
               Include(p =&gt; p.addressBookEntries.Select(o =&gt; o.ImageDetail).
                            FirstOrDefault();</pre>
<p>
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
<p>The problem with this is if you have 4MB image in your ImageDetail table, it will all come down when you materialize your query.</p>
<p>&#160;</p>
<p>&#160;</p>
<h2>The Right Way</h2>
<p>&#160;</p>
<p>The correct way is to create a resulting anonymous object something like this:</p>
<pre class="csharpcode">var userAccount =
      db.Users.Where(a =&gt; a.Id == userIdIWantd).
              Include(p =&gt; AddressBookEntries.Select(o =&gt; o.ImageDetails).Select(p=&gt;<span class="kwrd">new</span> {
                 p.Id,
                 p.ImageDetails.Id
              }));</pre>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>&#160;</p>
<p>Sorry if the syntax here is not perfect.&#160; I did not actually use these tables, my problem is a little different, but I just wanted to get my point across about how important making anonymous (or staticly typed) result sets are for performance and how easily you can make code that will kill the performance of your server.</p>
