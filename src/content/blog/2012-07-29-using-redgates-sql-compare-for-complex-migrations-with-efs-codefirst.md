---
status: publish
published: true
pubDatetime: 2012-07-29T20:00:00.000Z
title: Using Redgates Sql Compare for Complex Migrations with EF&rsquo;s CodeFirst
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2127
wordpress_url: https://peterkellner.net/?p=2127
date: '2012-07-29 11:44:02 -0700'
date_gmt: '2012-07-29 18:44:02 -0700'
categories:
- Best Practices
- SQL Server
- Entity Framework
- SQL
- CodeFirst
tags: []
---
<h2>Introduction</h2>
<p>As many of you know, I’ve been quite the fan of <a href="http://msdn.microsoft.com/en-us/data/ef.aspx">Entity Framework</a> <a href="http://weblogs.asp.net/scottgu/archive/2010/07/16/code-first-development-with-entity-framework-4.aspx">CodeFirst</a> for quite some time.&#160; It does a great job of reducing the number of places I have to change thngs each time I have a database schema change and also brings a ton of type safety along with it.&#160; I’ve posted before about the benefits of the auto migrations features built into CodeFirst, however I have found when I make a lot of changes to my schema, I quickly get an error saying I will have data loss so the CodeFirst Migration will not take place.</p>
<p>In my realities, it is just too much time to go through with LINQ and try and make the perfect data migration.&#160; My reality is that I likely only have one or two databases that need sql updates and I can do those much more efficiently with <a href="http://www.red-gate.com/products/sql-development/sql-compare/?source=products-a-page">Redgates Sql Compare</a>.&#160; In this post, I’ll walk through the steps I follow.&#160; This is by no means a perfect solution but it is quick, solves my problem in both a reliable and robust way.</p>
<p>&#160;</p>
<h2>Steps</h2>
<h4>Step 1</h4>
<p>Backup your production database! (goes without saying but saying it anyhow)</p>
<h4>Step 2</h4>
<p>Run Sql Compare against your most up to date database that you want to ultimately be production (and choose compare).&#160; Below is a screen shot of what this looks like for me.</p>
<p><a href="/wp/wp-content/uploads/2012/07/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb6.png" width="340" height="226" /></a> </p>
<p>The resulting comparison looks like this graphically.&#160; I’m going to choose to do all the suggestions.</p>
<p><a href="/wp/wp-content/uploads/2012/07/image7.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb7.png" width="360" height="190" /></a> </p>
<h4>Step 3</h4>
<p>Now, I press the “Deploy Wizard” and I get a screen that tells me what it will do and gives me the script to do it.&#160; Notice that is telling me what data I will loose if any.&#160; In my case, the data that is being lost is OK because I can simply have my background email process refetch all the email and everything will be fine.&#160; You need to be very careful of this to make sure that it is what you want.</p>
<p><a href="/wp/wp-content/uploads/2012/07/image8.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb8.png" width="378" height="195" /></a> </p>
<h4>Step 4</h4>
<p>Now, if I say “Open Script Editor” it takes me to Sql Server Enterprise Manager, connects me to the correct database and gets my script ready to go.&#160; All I have to do is press “execute” and it will run!</p>
<p><a href="/wp/wp-content/uploads/2012/07/image9.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb9.png" width="407" height="281" /></a> </p>
<p>&#160;</p>
<p>Side Note:&#160; You may have to remove your migration custom sql tables for this to work.&#160; I did that and also used the implementation of create only when database does not exist for my code first now, not the migrations.</p>
<p>&#160;</p>
<h2>Conclusion</h2>
<p>And it’s hard not to love the results.</p>
<p><a href="/wp/wp-content/uploads/2012/07/image10.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2012/07/image_thumb10.png" width="435" height="337" /></a> </p>
<p>And of course, you have to just Love Redgate’s Sql tools.&#160; Sql Compare is just one of many.&#160; I highly recommend them for any sqlserver professional or developer.</p>
<p>That’s it!&#160; My production database is now the same as my CodeFirst local database.</p>
