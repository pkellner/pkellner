---
status: publish
published: true
pubDatetime: 2007-10-29T20:00:00.000Z
title: Using Using in c# ado.net business classes used with ObjectDataSource in ASP.NET
  2.0
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: A short post and example on how to use the C# syntax Using.  The example
  is for an ado.net business object that can be used with an ObjectDataSource.  This
  saves you the trouble of disposing of your objects properly, as well as doing it
  at the right place.
wordpress_id: 83
wordpress_url: https://peterkellner.net/2007/10/29/usingusinghowto/
date: '2007-10-29 18:28:57 -0700'
date_gmt: '2007-10-30 01:28:57 -0700'
categories:
- ".Net 2.0"
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<p>So, I've been preaching for a long time that it's best to use the Using pattern when working with anything that implements IDisposable.&#160; That way, you don't have to worry about calling Dispose, or calling Close.&#160; The framework will just do it for you.&#160; I've answered this question on the forums several times so I thought I'd past some code I'm doing right now for simple ado.net stuff.&#160; It's actually code that is inside a business object that I hook up to an ObjectDataSource in asp.net 2.0. </p>
<p>The code is posted below.&#160; I think you'll get the idea.</p>
<p> <!--more-->
<p>[<span style="color: #2b91af">DataObjectMethod</span>(<span style="color: #2b91af">DataObjectMethodType</span>.Select, <span style="color: blue">false</span>)]</p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px"><span style="color: blue">public</span> <span style="color: #2b91af">List</span>&lt;<span style="color: #2b91af">DataObjectCategory</span>&gt; GetByPrimaryKey(<span style="color: blue">int</span> id)</p>
<p style="margin: 0px">{</p>
<p style="margin: 0px"><span style="color: blue">string</span> sqlWhere = <span style="color: #2b91af">String</span>.Format(<span style="color: #a31515">&quot; WHERE id={0} &quot;</span>, id);</p>
<p style="margin: 0px"><span style="color: blue">return</span> GetByRawSQL(<span style="color: blue">string</span>.Empty, sqlWhere);</p>
<p style="margin: 0px">}</p>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px"><span style="color: blue">private</span> <span style="color: #2b91af">List</span>&lt;<span style="color: #2b91af">DataObjectCategory</span>&gt; GetByRawSQL(<span style="color: blue">string</span> sortData, <span style="color: blue">string</span> sqlWhereClause)</p>
<p style="margin: 0px">{</p>
<p style="margin: 0px"><span style="color: blue">string</span> sqlBaseString = <span style="color: #a31515">&quot;SELECT ContentTypeId,Description,SortOrder,Id FROM Category &quot;</span>;</p>
<p style="margin: 0px"><span style="color: #2b91af">List</span>&lt;<span style="color: #2b91af">DataObjectCategory</span>&gt; DataTemplateODSList = <span style="color: blue">new</span> <span style="color: #2b91af">List</span>&lt;<span style="color: #2b91af">DataObjectCategory</span>&gt;();</p>
<p style="margin: 0px"><span style="color: blue">using</span> (<span style="color: #2b91af">SqlConnection</span> conn = <span style="color: blue">new</span> <span style="color: #2b91af">SqlConnection</span>(connectionString))</p>
<p style="margin: 0px">{</p>
<p style="margin: 0px">&#160;&#160;&#160; conn.Open();</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">if</span> (!<span style="color: #2b91af">String</span>.IsNullOrEmpty(sqlWhereClause))</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; sqlBaseString += sqlWhereClause;</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160; <span style="color: blue">using</span> (<span style="color: #2b91af">SqlCommand</span> cmd = <span style="color: blue">new</span> <span style="color: #2b91af">SqlCommand</span>(sqlBaseString, conn))</p>
<p style="margin: 0px">&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">using</span> (<span style="color: #2b91af">SqlDataReader</span> reader = cmd.ExecuteReader())</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">try</span></p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">while</span> (reader.Read())</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> contenttypeid = reader.IsDBNull(0) ? 0 : reader.GetInt32(0);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">string</span> description = reader.IsDBNull(1) ? <span style="color: #a31515">&quot;&quot;</span> : reader.GetString(1);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> sortorder = reader.IsDBNull(2) ? 0 : reader.GetInt32(2);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">int</span> id = reader.IsDBNull(3) ? 0 : reader.GetInt32(3);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: #2b91af">DataObjectCategory</span> td = <span style="color: blue">new</span> <span style="color: #2b91af">DataObjectCategory</span>(contenttypeid,</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; description, sortorder, id);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; DataTemplateODSList.Add(td);</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">catch</span> (<span style="color: #2b91af">Exception</span> ee)</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">throw</span> <span style="color: blue">new</span> <span style="color: #2b91af">ApplicationException</span>(ee.ToString());</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160;&#160;&#160;&#160;&#160; }</p>
<p style="margin: 0px">&#160;&#160;&#160; }</p>
<p style="margin: 0px">}</p>
</p></div>
<p>Hope this helps!</p>
