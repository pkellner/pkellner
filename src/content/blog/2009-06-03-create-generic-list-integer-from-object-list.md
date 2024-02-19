---
status: publish
published: true
pubDatetime: 2009-06-03T20:00:00.000Z
title: How to Create a Generic Integer List From a List of Objects Using LINQ
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 315
wordpress_url: https://peterkellner.net/2009/06/03/create-generic-list-integer-from-object-list/
date: '2009-06-03 10:02:13 -0700'
date_gmt: '2009-06-03 17:02:13 -0700'
categories:
- C#
- LINQ
tags: []
---
<p>So, this is very straight forward, but I sometimes forget it.&#160; I figure I’ll do a short blog post on it so next time I search for it, I’ll probably hit my own blog post.</p>
<p>So, say you have a list of objects as follows:</p>
<p> <!--more-->
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> CompanyAddressResult : ResultBase
    {
        <span class="kwrd">public</span> <span class="kwrd">int</span> Id {get;set;}
        <span class="kwrd">public</span> <span class="kwrd">string</span> Name { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">int</span> CompanyId { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">int</span> AddressId { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">int</span> CompanyAddressTypeId { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">string</span> Notes { get; set; }
        <span class="kwrd">public</span> <span class="kwrd">int</span>? ActiveFlag { get; set; }
}</pre>
<pre class="csharpcode">And, you want to create a list of AddressIds.  Here is all you have to do:</pre>
<pre class="csharpcode">List&lt;<span class="kwrd">int</span>&gt; AddressIds = retList.Select(a =&gt; a.AddressId).ToList();</pre>
<pre class="csharpcode">Hope this helps.</pre>
