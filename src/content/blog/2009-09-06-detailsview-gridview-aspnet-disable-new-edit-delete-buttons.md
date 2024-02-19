---
status: publish
published: true
pubDatetime: 2009-09-06T20:00:00.000Z
title: How to Disable Edit/Insert/New Buttons in DetailsView or GridView (ASP.NET
  2.0+)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 352
wordpress_url: https://peterkellner.net/2009/09/06/detailsview-gridview-aspnet-disable-new-edit-delete-buttons/
date: '2009-09-06 17:27:24 -0700'
date_gmt: '2009-09-07 00:27:24 -0700'
categories:
- ASP.NET 3.5
- GridView
- Visual Studio
- ASP.NET 2.0
- DetailsView
tags: []
---
<p>So, this is kind of embarrassing, that it took me a while to figure this out.&#160; I have not been doing pure asp.net server control programming for a while, but I figure since it took me a while, maybe there is someone else in the same boat.</p>
<p>So, you have a GridView or <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.detailsview(VS.80).aspx">DetailsView</a> that has standard “Edit” “Update” “New” type command buttons on them.&#160; The way they get there is by having the declaration something like this:</p>
<p> <!--more-->
<pre class="csharpcode"> &lt;asp:DetailsView ID=<span class="str">&quot;DetailsView1&quot;</span> runat=<span class="str">&quot;server&quot;</span> Height=<span class="str">&quot;50px&quot;</span> Width=<span class="str">&quot;125px&quot;</span> 
            AllowPaging=<span class="str">&quot;True&quot;</span> AutoGenerateRows=<span class="str">&quot;False&quot;</span> DataKeyNames=<span class="str">&quot;Id&quot;</span> 
            DataSourceID=<span class="str">&quot;SqlDataSource1&quot;</span>&gt;
            &lt;Fields&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;Id&quot;</span> HeaderText=<span class="str">&quot;Id&quot;</span> ReadOnly=<span class="str">&quot;True&quot;</span> 
                    SortExpression=<span class="str">&quot;Id&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;Name&quot;</span> HeaderText=<span class="str">&quot;Name&quot;</span> SortExpression=<span class="str">&quot;Name&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;CampStartDate&quot;</span> HeaderText=<span class="str">&quot;CampStartDate&quot;</span> 
                    SortExpression=<span class="str">&quot;CampStartDate&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;CampEndDate&quot;</span> HeaderText=<span class="str">&quot;CampEndDate&quot;</span> 
                    SortExpression=<span class="str">&quot;CampEndDate&quot;</span> /&gt;
                &lt;asp:CommandField ShowEditButton=<span class="str">&quot;True&quot;</span> ShowInsertButton=<span class="str">&quot;True&quot;</span> /&gt;
            &lt;/Fields&gt;
&lt;/asp:DetailsView&gt;</pre>
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
<p>What you want is to say something like:</p>
<p>“I only want admin’s to be able to add new rows so&#160; want to hide the “new” button based on that”</p>
<p>So, first thing is to convert the field to a template from the following menu.&#160; You do this by using the little helper in the upper right hand corner of the detailsview (in design mode), chose Edit Fields, CommandField, then convert to template (as in the picture below).</p>
<p><a href="/FilesForWebDownload/HowtoDisableEditInsertNewButtonsinDeta.0_F26A/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowtoDisableEditInsertNewButtonsinDeta.0_F26A/image_thumb.png" width="521" height="299" /></a></p>
<p>Then, you will have something like this:</p>
<pre class="csharpcode"> &lt;asp:DetailsView ID=<span class="str">&quot;DetailsView1&quot;</span> runat=<span class="str">&quot;server&quot;</span> Height=<span class="str">&quot;50px&quot;</span> Width=<span class="str">&quot;125px&quot;</span> 
            AllowPaging=<span class="str">&quot;True&quot;</span> AutoGenerateRows=<span class="str">&quot;False&quot;</span> DataKeyNames=<span class="str">&quot;Id&quot;</span> 
            DataSourceID=<span class="str">&quot;SqlDataSource1&quot;</span>&gt;
            &lt;Fields&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;Id&quot;</span> HeaderText=<span class="str">&quot;Id&quot;</span> ReadOnly=<span class="str">&quot;True&quot;</span> 
                    SortExpression=<span class="str">&quot;Id&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;Name&quot;</span> HeaderText=<span class="str">&quot;Name&quot;</span> SortExpression=<span class="str">&quot;Name&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;CampStartDate&quot;</span> HeaderText=<span class="str">&quot;CampStartDate&quot;</span> 
                    SortExpression=<span class="str">&quot;CampStartDate&quot;</span> /&gt;
                &lt;asp:BoundField DataField=<span class="str">&quot;CampEndDate&quot;</span> HeaderText=<span class="str">&quot;CampEndDate&quot;</span> 
                    SortExpression=<span class="str">&quot;CampEndDate&quot;</span> /&gt;
                &lt;asp:TemplateField ShowHeader=<span class="str">&quot;False&quot;</span>&gt;
                    &lt;ItemTemplate&gt;
                        &lt;asp:LinkButton ID=<span class="str">&quot;LinkButton1&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;False&quot;</span> 
                            CommandName=<span class="str">&quot;Edit&quot;</span> Text=<span class="str">&quot;Edit&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                        &amp;nbsp;&lt;asp:LinkButton ID=<span class="str">&quot;LinkButton2&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;False&quot;</span> 
                            CommandName=<span class="str">&quot;New&quot;</span> Text=<span class="str">&quot;New&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                    &lt;/ItemTemplate&gt;
                    &lt;EditItemTemplate&gt;
                        &lt;asp:LinkButton ID=<span class="str">&quot;LinkButton1&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;True&quot;</span> 
                            CommandName=<span class="str">&quot;Update&quot;</span> Text=<span class="str">&quot;Update&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                        &amp;nbsp;&lt;asp:LinkButton ID=<span class="str">&quot;LinkButton2&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;False&quot;</span> 
                            CommandName=<span class="str">&quot;Cancel&quot;</span> Text=<span class="str">&quot;Cancel&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                    &lt;/EditItemTemplate&gt;
                    &lt;InsertItemTemplate&gt;
                        &lt;asp:LinkButton ID=<span class="str">&quot;LinkButton1&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;True&quot;</span> 
                            CommandName=<span class="str">&quot;Insert&quot;</span> Text=<span class="str">&quot;Insert&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                        &amp;nbsp;&lt;asp:LinkButton ID=<span class="str">&quot;LinkButton2&quot;</span> runat=<span class="str">&quot;server&quot;</span> CausesValidation=<span class="str">&quot;False&quot;</span> 
                            CommandName=<span class="str">&quot;Cancel&quot;</span> Text=<span class="str">&quot;Cancel&quot;</span>&gt;&lt;/asp:LinkButton&gt;
                    &lt;/InsertItemTemplate&gt;
                &lt;/asp:TemplateField&gt;
            &lt;/Fields&gt;
&lt;/asp:DetailsView&gt;</pre>
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
<p>Now, you have standard &lt;asp:LinkButton&gt; so you can call the visible property from your codebehind like this:</p>
<pre class="csharpcode"> <span class="kwrd">&lt;</span><span class="html">asp:TemplateField</span> <span class="attr">ShowHeader</span><span class="kwrd">=&quot;False&quot;</span><span class="kwrd">&gt;</span>
                     <span class="kwrd">&lt;</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
                         <span class="kwrd">&lt;</span><span class="html">asp:LinkButton</span> <span class="attr">ID</span><span class="kwrd">=&quot;LinkButton1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">CausesValidation</span><span class="kwrd">=&quot;False&quot;</span> <span class="attr">Visible</span><span class="kwrd">='&lt;%# GetShowEditButton() %&gt;'</span>
                             <span class="attr">CommandName</span><span class="kwrd">=&quot;Edit&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Edit&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:LinkButton</span><span class="kwrd">&gt;</span>
                         <span class="attr">&amp;nbsp;</span><span class="kwrd">&lt;</span><span class="html">asp:LinkButton</span> <span class="attr">ID</span><span class="kwrd">=&quot;LinkButton2&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">CausesValidation</span><span class="kwrd">=&quot;False&quot;</span> <span class="attr">Visible</span><span class="kwrd">='&lt;%# GetShowInsertButton() %&gt;'</span>
                             <span class="attr">CommandName</span><span class="kwrd">=&quot;New&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;New&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp:LinkButton</span><span class="kwrd">&gt;</span>
                         <span class="attr">&amp;nbsp;</span><span class="kwrd">&lt;</span><span class="html">asp:LinkButton</span> <span class="attr">ID</span><span class="kwrd">=&quot;LinkButton3&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">CausesValidation</span><span class="kwrd">=&quot;False&quot;</span> 
                             <span class="attr">CommandName</span><span class="kwrd">=&quot;Delete&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Delete&quot;</span> <span class="attr">Visible</span><span class="kwrd">='&lt;%# GetShowDeleteButton() %&gt;'</span>     <span class="kwrd">&gt;&lt;/</span><span class="html">asp:LinkButton</span><span class="kwrd">&gt;</span>
                     <span class="kwrd">&lt;/</span><span class="html">ItemTemplate</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp:TemplateField</span><span class="kwrd">&gt;</span></pre>
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
<p>Then, in your codebehind, you have the following:</p>
<pre class="csharpcode"> <span class="kwrd">protected</span> <span class="kwrd">bool</span> GetShowEditButton()
    {
        <span class="kwrd">return</span> Roles.IsUserInRole(<span class="str">&quot;Admin&quot;</span>);
    }

    <span class="kwrd">protected</span> <span class="kwrd">bool</span> GetShowInsertButton()
    {
        <span class="kwrd">return</span> Roles.IsUserInRole(<span class="str">&quot;Admin&quot;</span>);
    }
    <span class="kwrd">protected</span> <span class="kwrd">bool</span> GetShowDeleteButton()
    {
        <span class="kwrd">return</span> Roles.IsUserInRole(<span class="str">&quot;Admin&quot;</span>);
    }
}</pre>
<p>Hope you find this before spending a bunch of time reading about more complicated solutions.</p>
