---
status: publish
published: true
pubDatetime: 2012-04-07T20:00:00.000Z
title: Gaining Some Control Back From Microsoft&rsquo;s Entity Framework Code First,
  Name Your Own Foreign Keys!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1921
wordpress_url: https://peterkellner.net/2012/04/07/gaining-some-control-back-from-microsofts-entity-framework-code-first-name-your-own-foreign-keys/
date: '2012-04-07 18:32:18 -0700'
date_gmt: '2012-04-08 01:32:18 -0700'
categories:
- SQL Server
- Entity Framework
- Microsoft
- CodeFirst
tags: []
---
<p>Being a relative newbie to <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft’s</a> <a href="http://msdn.microsoft.com/en-us/data/aa937723">Entity Framework</a> <a href="http://msdn.microsoft.com/en-us/data/hh134698">Code First</a>, there are things that I don’t like, things that I don’t understand, and well, just things that really bug me.&#160; The problem is I often find out that the things that I don’t like and bug me are often lack of knowledge and not lack of product (at least not easily discoverable in the product).&#160; One of those things is that Code First makes up names for foreign keys that don’t happen to be the same name as I would use.&#160; Since there are times when you will need to look at these names (and possibly code with them (for another post)), I would like those names to be my names.</p>
<p>Let’s say you have a simple relationship between two tables.&#160; Let’s call it User and Address.&#160; Let’s just say for simplicity a user has one address.&#160; In CodeFirst, you would model it with tables like the following:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> User
{
        [Key] 
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">virtual</span> Address Address { get; set; } 
       <span class="rem">// more details about user, name, etc.</span>
}

<span class="kwrd">public</span> <span class="kwrd">class</span> Address
{
       [Key] 
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">string</span> City {get;set;}
        <span class="rem">// more details about address, state,zip,etc.</span>
}</pre>
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
.csharpcode .lnum { color: #606060; }</style>
<p>Now, you will end up with an Address table that has a column named something like User_Id.&#160;&#160; YUC!!!&#160; Who puts underscores in column names anymore (well, certainly I don’t.</p>
<p>You may think all you need to do to solve this is put a foreign key column and attribute in the Address table as follows:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> Address
{
     [Key]
     <span class="kwrd">public</span> <span class="kwrd">long</span> Id {get;set;}
     
     [ForeignKey]
     <span class="kwrd">public</span> <span class="kwrd">long</span> UserId {get;set;}

     <span class="kwrd">public</span> <span class="kwrd">string</span> City {get;set;}
}</pre>
<p>But, when you do that, you will be greeted with an error that looks like the following:</p>
<blockquote>
<h4><i>System.Data.Entity.Edm.EdmAssociationEnd: : Multiplicity is not valid in Role 'EmailAccount_User_Source' in relationship 'EmailAccount_User'. Because the Dependent Role properties are not the key properties, the upper bound of the multiplicity of the Dependent Role must be '*'.</i></h4>
</blockquote>
<p>or</p>
<blockquote>
<h4><i>The ForeignKeyAttribute on property 'UserId' on type 'EFCodeFirstLib.CodeFirstModels.EmailAccount' is not valid. The navigation property 'User' was not found on the dependent type 'EFCodeFirstLib.CodeFirstModels.EmailAccount'. The Name value should be a valid navigation property name.</i></h4>
</blockquote>
<p>&#160;</p>
<p>Pretty clear what to do, huh?</p>
<p>Well, I suppose if you know EF EDMX and a whole bunch of other acronyms, you probably will figure it out, but if you don’t I’ll tell you.&#160; You basically need to include the User property in your Address class.&#160; It should then look like:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> Address
{
  [Key]
  <span class="kwrd">public</span> <span class="kwrd">long</span> Id {get;set}

  <span class="kwrd">public</span> User User {get;set;}  <span class="rem">// important!</span>
  [ForeignKey]
  <span class="kwrd">public</span> <span class="kwrd">long</span> UserId {get;set;}

  <span class="kwrd">public</span> <span class="kwrd">string</span> City {get;set;}
}</pre>
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
.csharpcode .lnum { color: #606060; }</style>
<p>And now, you will have a “properly” named foreign key column “UserId” with no underscores!</p>
<p>My 2Cents.</p>
