---
status: publish
published: true
pubDatetime: 2012-06-06T20:00:00.000Z
title: Extending CodeFirst (EntityFramework) to Multiple Levels of 1 to 1 Relationships
  (Strongly Typed)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2030
wordpress_url: https://peterkellner.net/?p=2030
date: '2012-06-06 07:15:31 -0700'
date_gmt: '2012-06-06 14:15:31 -0700'
categories:
- Database
- Entity Framework
- CodeFirst
tags: []
---
<p>In my <a href="/2012/06/06/working-with-nested-class-in-simple-1-to-1-relationship-with-entityframework-4-codefirst/">previous post</a>, I showed how to take a simple relationship between Customers and an one Detail per customer build that into a relationship that eagerly loaded the customer record when retrieving a Detail record with CodeFirst in <a href="http://msdn.microsoft.com/en-us/library/aa697427(v=vs.80).aspx">EntityFramework.</a>&#160; Now, let’s extend that so that a customer has an Address associated with them. This means, the relationship is as follows:</p>
<p>Detail</p>
<p>&#160;&#160;&#160; Customer</p>
<p>&#160;&#160;&#160;&#160;&#160;&#160;&#160; Address</p>
<p>Or, using my favorite Sql Manager Tool <a href="http://www.sqlmanager.net/">http://www.sqlmanager.net/</a> from EMS Database Management Solutions:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/06/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/06/image_thumb1.png" width="308" height="211" /></a></p>
<p>&#160;</p>
<p>The model is now as follows:</p>
<pre class="csharpcode"><span class="kwrd">namespace</span> Con1
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> SiteDB : DbContext
    {
        <span class="kwrd">public</span> DbSet&lt;Detail&gt; Details { get; set; }
        <span class="kwrd">public</span> DbSet&lt;Customer&gt; Customers { get; set; }
        <span class="kwrd">public</span> DbSet&lt;CustomerAddress&gt; CustomerAddresss { get; set; }

        <span class="kwrd">public</span> SiteDB(DbConnection connection)
            : <span class="kwrd">base</span>(connection, <span class="kwrd">true</span>)
        {
            <span class="rem">//ctor uses for tracing </span>
        }

        <span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> OnModelCreating(DbModelBuilder modelBuilder)
        {
        }


        <span class="kwrd">public</span> SiteDB()
        {
        }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> CustomerAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }

        <span class="kwrd">public</span> <span class="kwrd">string</span> City { get; set; }
    }

    <span class="kwrd">public</span> <span class="kwrd">class</span> Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        <span class="kwrd">public</span> <span class="kwrd">long</span> Id { get; set; }

        [ForeignKey(<span class="str">&quot;CustomerAddressId&quot;</span>)]
        <span class="kwrd">public</span> CustomerAddress CustomerAddress { get; set; }

        <span class="kwrd">public</span> <span class="kwrd">long</span> CustomerAddressId { get; set; }

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
<p>And the code to actually retrieve the data is now as follows (notice the type safe and non type safe include syntax.&#160; Both work, but of course I prefer the type safe.</p>
<pre class="csharpcode"> <span class="kwrd">internal</span> <span class="kwrd">class</span> Program
    {
        <span class="kwrd">private</span> <span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)
        {
            Database.SetInitializer(<span class="kwrd">new</span> SiteDBInitializer());

            <span class="kwrd">using</span> (var context = <span class="kwrd">new</span> SiteDB())
            {
                Console.WriteLine(context.Customers.Count());

                <span class="rem">//var details = context.Details.Include(&quot;Customer.CustomerAddress&quot;);</span>

                var details = context.Details.Include(o=&gt;o.Customer.CustomerAddress);

                <span class="kwrd">foreach</span> (var detail <span class="kwrd">in</span> details)
                {
Console.WriteLine(
    String.Format(
        <span class="str">&quot;DetailId: {0}   CustomerId: {1}   Customer.Name: {2}  Customer.Customeraddress.City: {3}&quot;</span>,
        detail.Id, detail.CustomerId, detail.Customer.Name, detail.Customer.CustomerAddress.City));
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
                    Customer =
                        <span class="kwrd">new</span> Customer {Name = <span class="str">&quot;pkellner&quot;</span>, CustomerAddress = <span class="kwrd">new</span> CustomerAddress {City = <span class="str">&quot;Hartsdale&quot;</span>}},
                    DetailDescription = <span class="str">&quot;descr1&quot;</span>
                });

            context.SaveChanges();
        }
    }</pre>
<p>And the result running it is now:</p>
<p><a href="/wp/wp-content/uploads/2012/06/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/06/image_thumb2.png" width="512" height="93" /></a></p>
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
<p>HTH’s.</p>
