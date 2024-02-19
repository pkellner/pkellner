---
status: publish
published: true
pubDatetime: 2008-02-18T20:00:00.000Z
title: How to Get the DataItem out of a ListView in Asp.Net 3.5 (compared to Repeater)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>See how to get the DataItem out of a ListView Control which is part of
  asp.net 3.5.  Compare ListView to repeater in this regard.</p>"
wordpress_id: 101
wordpress_url: https://peterkellner.net/2008/02/18/listviewrepeaternotes/
date: '2008-02-18 06:51:48 -0800'
date_gmt: '2008-02-18 13:51:48 -0800'
categories:
- ASP.NET 3.5
- Visual Studio
tags: []
---
<p>So, you are a Repeater wizard like me and now you want more.&#160; Remember that in Repeater, the templates you can use are as follows:</p>
<p><a href="/wp/wp-content/uploads/2008/02/listview1.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="listview1" src="/wp/wp-content/uploads/2008/02/listview1-thumb.jpg" width="244" height="145" /></a></p>
<p>With the new ListView, you have lots more choices as follows:</p>
<p> <!--more-->
<p><a href="/wp/wp-content/uploads/2008/02/listview2.jpg"><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="listview2" src="/wp/wp-content/uploads/2008/02/listview2-thumb.jpg" width="244" height="201" /></a></p>
<p>Lots of reasons to start using the ListView.&#160; Just having EditItemTemplate is enough for me.</p>
<p>So, the first problem is you want to grab the DataItem equivalent from ListView.&#160; That is, in the DataBind event of the repeater, you get the DataItem as follows:</p>
<pre class="csharpcode"><span class="kwrd">protected</span> <span class="kwrd">void</span> RepeaterProjects_ItemDataBound(<span class="kwrd">object</span> sender, RepeaterItemEventArgs e)
    {
        RepeaterItem ri = e.Item;
        <span class="kwrd">if</span> (ri.DataItem != <span class="kwrd">null</span>)
        {
            DropDownList ddl = (DropDownList) ri.FindControl(<span class="str">&quot;DropDownListVersions&quot;</span>);
            Label labelVersion = (Label) ri.FindControl(<span class="str">&quot;LabelCurrentVersionRunning&quot;</span>);</pre>
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
<p>Now, how to you do the same thing for the ListView?</p>
<pre class="csharpcode">   <span class="kwrd">protected</span> <span class="kwrd">void</span> ListViewProjects_ItemDataBound(<span class="kwrd">object</span> sender, ListViewItemEventArgs e)
    {
        <span class="kwrd">using</span> (ListViewDataItem listViewDataItem = (ListViewDataItem) e.Item)
        {
            <span class="kwrd">if</span> (listViewDataItem != <span class="kwrd">null</span>)
            {
                DropDownList ddl = (DropDownList)listViewDataItem.FindControl(<span class="str">&quot;DropDownListVersions&quot;</span>);
                Label labelVersion = (Label)listViewDataItem.FindControl(<span class="str">&quot;LabelCurrentVersionRunning&quot;</span>);</pre>
<p>One thing I also noticed that for the ListViewProjects_ItemDataBound to be called, I must call DataBind() on ListViewProjects. Seems Repeater calls it on every postback but I would not swear to that. One Final thing. In this process, I realized I had to create a LayoutTemplate. Very cool. I wondered why Header and Footer templates were gone.</p>
<pre class="csharpcode"><p>&lt;asp:ListView ID=<span class="str">&quot;ListViewProjects&quot;</span> runat=<span class="str">&quot;server&quot;</span> DataSourceID=<span class="str">&quot;SqlDataSourceWebSites&quot;</span>
                OnItemDataBound=<span class="str">&quot;ListViewProjects_ItemDataBound&quot;</span>&gt;
                &lt;EmptyDataTemplate&gt;
                    &lt;b&gt;Not Web Sites Defined&lt;/b&gt;
                &lt;/EmptyDataTemplate&gt;
                &lt;LayoutTemplate&gt;
                    &lt;ul&gt;
                        &lt;asp:PlaceHolder ID=<span class="str">&quot;itemPlaceholder&quot;</span> runat=<span class="str">&quot;server&quot;</span> /&gt;
                    &lt;/ul&gt;
                &lt;/LayoutTemplate&gt;</p></pre>
<pre class="csharpcode"><font face="Verdana">Hope this Helps you.</font></pre>
<pre class="csharpcode">&#160;</pre>
<p>
  </p>
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
