---
status: publish
published: true
pubDatetime: 2009-06-16T20:00:00.000Z
title: In ASP.NET, How To Create a DropDownList from an ENUM
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 326
wordpress_url: https://peterkellner.net/2009/06/16/in-aspnet-how-to-create-a-dropdownlist-from-an-enum/
date: '2009-06-16 16:05:14 -0700'
date_gmt: '2009-06-16 23:05:14 -0700'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- C#
tags: []
---
<p> So, you have an enum defined as follows:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">enum</span> CompanyAddressType
    {
        Unknown = 0,
        Primary = 1,
        Warehouse = 2,
        Distribution_Center = 3,
        Cross_Dock = 4
    }</pre>
<p>You want to iterate through the list and put the data into an asp.net dropdownlist.</p>
<p><!--more--></p>
<p>Here is the simple code:</p>
<pre class="csharpcode"><span class="kwrd">protected</span> <span class="kwrd">void</span> Page_Load(<span class="kwrd">object</span> sender, EventArgs e)
        {
            <span class="kwrd">if</span> (!IsPostBack)
            {
                <span class="kwrd">string</span>[] names = Enum.GetNames(<span class="kwrd">typeof</span>(CompanyAddressType));
                var values = (CompanyAddressType[])Enum.GetValues(<span class="kwrd">typeof</span>(CompanyAddressType));
                <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i &lt; names.Length; i++)
                {
                    DropDownListCompanyAddressType.Items.Add(<span class="kwrd">new</span> ListItem(names[i], values.ToString()));
                }
            }
        }</pre>
<p>&#160;</p>
<p>There are probably easier ways to do it, but this works.</p>
<p>and…</p>
<p><a href="/wp/wp-content/uploads/2009/06/image5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/06/image_thumb3.png" width="246" height="154" /></a></p>
<p>HTH’s.</p>
