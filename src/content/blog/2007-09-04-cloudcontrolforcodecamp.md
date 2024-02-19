---
status: publish
published: true
pubDatetime: 2007-09-04T20:00:00.000Z
title: Silicon Valley Code Camp Integrates the DevExpress Cloud Control for Sessions
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: Using the DevExpress CloudControl in the ASP.NET 2.0 Silicon Valley Code
  Camp's web site was easy.  In this short post, you'll hear about the details and
  see some code.
wordpress_id: 74
wordpress_url: https://peterkellner.net/2007/09/04/cloudcontrolforcodecamp/
date: '2007-09-04 12:11:58 -0700'
date_gmt: '2007-09-04 19:11:58 -0700'
categories:
- Atlas/AJAX
- Best Practices
- Community
- ObjectDataSource
- Visual Studio
- ASP.NET 2.0
tags: []
---
<p>Recently, is seems that many web sites and blogs are starting to use a navigation technique where you have multiple hyperlinks grouped in a box, with size, color, or brightness giving some meaning.&#160; I like this very much and have been on the lookout for a while for a control to do this in ASP.NET.&#160; Turns out, DevExpress has one!&#160; It's called the CloudControl and you can read more about it at the following URL.</p>
<p> <!--more-->
<p>&#160;<a href="http://www.devexpress.com/Products/NET/WebForms/ASPxCloudControl/Index.xml">http://www.devexpress.com/Products/NET/WebForms/ASPxCloudControl/Index.xml</a></p>
<p>So, now, where to use it?&#160; Code Camp of course!&#160; Now, if you browse to the Sessions listing, you'll see the DevExpress Cloud Control in use.</p>
<p><img alt="Silicon Valley Code Camp Cloud Control" src="/wp/wp-content/uploads/2007/09/cloudcontrol.jpg" /></p>
<p>You can see this control in action at our web site here:&#160; <br /><a href="http://web.archive.org/web/20130403032050/http://www.siliconvalley-codecamp.com/Sessions.aspx">     <br />http://www.siliconvalley-codecamp.com/Sessions.aspx</a></p>
<p>My experience with using this control was great!&#160; Easy to setup.&#160; Below is all the code I needed on my asp page to make it happen.</p>
<p>&#160;<!--<br />
{rtf1ansiansicpglang1024noproof1252uc1 deff0{fonttbl{f0fnilfcharset0fprq1 Courier New;}}{colortbl;??red0green0blue255;red255green255blue255;red163green21blue21;red0green0blue0;red255green0blue0;}??fs20 cf1 &lt;cf3 dxcccf1 :cf3 ASPxCloudControlcf0  cf5 IDcf1 ="ASPxCloudControl1"cf0  cf5 runatcf1 ="server"cf0  par ??           cf5 DataSourceIDcf1 ="ObjectDataSourceCloudControl"cf0  cf5 ShowValuescf1 ="True"cf0  par ??           cf5 HorizontalAligncf1 ="NotSet"cf0  cf5 TextFieldcf1 ="TagName"cf0  cf5 ValueFieldcf1 ="TagCount"cf0  par ??           cf5 NavigateUrlFieldcf1 ="TagId"cf0  par ??           cf5 NavigateUrlFormatStringcf1 ="Sessions.aspx?sortby=title&amp;by=category&amp;tag={0}"cf0  par ??           cf5 ToolTipcf1 ="CloudControl Provided From DevExpress"&gt;par ??cf0                 cf1 &lt;cf3 RankPropertiescf1 &gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                     cf1 &lt;cf3 dxcccf1 :cf3 RankPropertiescf0  cf1 /&gt;par ??cf0                 cf1 &lt;/cf3 RankPropertiescf1 &gt;par ??cf0         cf1 &lt;/cf3 dxcccf1 :cf3 ASPxCloudControlcf1 &gt;par ??cf0         cf1 &lt;cf3 aspcf1 :cf3 ObjectDataSourcecf0  cf5 IDcf1 ="ObjectDataSourceCloudControl"cf0  cf5 runatcf1 ="server"cf0  par ??            cf5 SelectMethodcf1 ="GetAllTags"cf0  cf5 TypeNamecf1 ="CodeCampSV.SessionTagsODS"&gt;par ??cf0         cf1 &lt;/cf3 aspcf1 :cf3 ObjectDataSourcecf1 &gt;}<br />
--></p>
<div style="font-family: courier new; background: white; color: black; font-size: 10pt">
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 52</span>&#160;<span style="color: blue">&#160;&#160;&#160;&#160;&#160;&#160;&#160; &lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">ASPxCloudControl</span> <span style="color: red">ID</span><span style="color: blue">=&quot;ASPxCloudControl1&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 53</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">DataSourceID</span><span style="color: blue">=&quot;ObjectDataSourceCloudControl&quot;</span> <span style="color: red">ShowValues</span><span style="color: blue">=&quot;True&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 54</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">HorizontalAlign</span><span style="color: blue">=&quot;NotSet&quot;</span> <span style="color: red">TextField</span><span style="color: blue">=&quot;TagName&quot;</span> <span style="color: red">ValueField</span><span style="color: blue">=&quot;TagCount&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 55</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">NavigateUrlField</span><span style="color: blue">=&quot;TagId&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 56</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">NavigateUrlFormatString</span><span style="color: blue">=&quot;Sessions.aspx?sortby=title&amp;by=category&amp;tag={0}&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 57</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">ToolTip</span><span style="color: blue">=&quot;CloudControl Provided From DevExpress&quot;&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 58</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">RankProperties</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 59</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 60</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 61</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 62</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 63</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 64</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 65</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">RankProperties</span> <span style="color: blue">/&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 66</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: #a31515">RankProperties</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 67</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: #a31515">dxcc</span><span style="color: blue">:</span><span style="color: #a31515">ASPxCloudControl</span><span style="color: blue">&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 68</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;</span><span style="color: #a31515">asp</span><span style="color: blue">:</span><span style="color: #a31515">ObjectDataSource</span> <span style="color: red">ID</span><span style="color: blue">=&quot;ObjectDataSourceCloudControl&quot;</span> <span style="color: red">runat</span><span style="color: blue">=&quot;server&quot;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 69</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: red">SelectMethod</span><span style="color: blue">=&quot;GetAllTags&quot;</span> <span style="color: red">TypeName</span><span style="color: blue">=&quot;CodeCampSV.SessionTagsODS&quot;&gt;</span></p>
<p style="margin: 0px"><span style="color: #2b91af">&#160;&#160; 70</span>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <span style="color: blue">&lt;/</span><span style="color: #a31515">asp</span><span style="color: blue">:</span><span style="color: #a31515">ObjectDataSource</span><span style="color: blue">&gt;</span></p>
</p></div>
<p style="margin: 0px">&#160;</p>
<p style="margin: 0px">This is my first trip into the Developer Express toolbox and so far, I'm very impressed!</p>
