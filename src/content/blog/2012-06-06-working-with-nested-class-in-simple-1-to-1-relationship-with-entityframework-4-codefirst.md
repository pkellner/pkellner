---
status: publish
published: true
pubDatetime: 2012-06-06T20:00:00.000Z
title: Working With Nested Class In Simple 1 to 1 Relationship with EntityFramework
  4 CodeFirst
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2023
wordpress_url: https://peterkellner.net/?p=2023
date: '2012-06-06 06:47:56 -0700'
date_gmt: '2012-06-06 13:47:56 -0700'
categories:
- Database
- Entity Framework
- CodeFirst
tags: []
---
<p>Surprisingly, (and happily) it’s not hard to reference all data inside a class using <a href="http://msdn.microsoft.com/en-us/data/ef.aspx">EF’s</a>&#160;<a href="http://weblogs.asp.net/scottgu/archive/2010/07/16/code-first-development-with-entity-framework-4.aspx">codefirst</a> in a 1 to 1 type relationship.&#160; Let’s take as an example a very simple relationship where we have a customer who has a detail record.&#160; The model definition for this is as follows:</p>
<pre class="csharpcode"><span class="kwrd">namespace</span> Con1
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> SiteDB : DbContext
    {
        <span class="kwrd">public</span> DbSet&lt;Detail&gt; Details { get; set; }
        <span class="kwrd">public</span> DbSet&lt;Customer&gt; Customers { get; set; }
    }


    <span class="kwrd">public</span> <span class="kwrd">class</span> Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }

        <span class="kwrd">public</span> <span class="kwrd">string</span> Name { get; set; }

    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> Detail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }

        [ForeignKey(<span class="str">&quot;CustomerId&quot;</span>)]
        <span class="kwrd">public</span> Customer Customer { get; set; }

        <span class="kwrd">public</span> <span class="kwrd">long</span> CustomerId { get; set; }


        <span class="kwrd">public</span> <span class="kwrd">string</span> DetailDescription { get; set; }
    }
}</pre>
<p>The idea is that we want to be able to get to a Customer Name by traversing a Detail record in one step.&#160; We need to use the “Include” feature of codefirst to do this.&#160; Below is the code that successfully works:</p>
<pre class="csharpcode"><span class="kwrd">class</span> Program
{
    <span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)
    {
        Database.SetInitializer(<span class="kwrd">new</span> SiteDBInitializer());

        <span class="kwrd">using</span> (var context = <span class="kwrd">new</span> SiteDB())
        {
            Console.WriteLine(context.Customers.Count());

            var details = context.Details.Include(o =&gt; o.Customer);
            <span class="kwrd">foreach</span> (var detail <span class="kwrd">in</span> details)
            {
                Console.WriteLine(
                    String.Format(
                    <span class="str">&quot;DetailId: {0}   CustomerId: {1}   Customer.Name: {2}&quot;</span>,
                    detail.Id,detail.CustomerId,detail.Customer.Name));
            }


        }
    }
}

<span class="kwrd">internal</span> <span class="kwrd">class</span> SiteDBInitializer : CreateDatabaseIfNotExists&lt;SiteDB&gt;
{
    <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> Seed(SiteDB context)
    {

        context.Details.Add(<span class="kwrd">new</span> Detail
            {
                Customer = <span class="kwrd">new</span> Customer {Name = <span class="str">&quot;pkellner&quot;</span>},
                DetailDescription = <span class="str">&quot;descr1&quot;</span>
            });

        context.SaveChanges();   
    }
}</pre>
<p>When we run this code we get:</p>
<p><a href="/wp/wp-content/uploads/2012/06/image.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/06/image_thumb.png" width="439" height="102" /></a></p>
<p>&#160;</p>
<p>Seems simple but it took me a while before I finally decided to make a simple example to prove to myself that this really works.</p>
<p>HTH’s.</p>
