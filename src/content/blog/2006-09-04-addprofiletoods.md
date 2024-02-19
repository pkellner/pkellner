---
status: publish
published: true
pubDatetime: 2006-09-04T20:00:00.000Z
title: Fourth MSDN Article Published! &quot;Adding Personalization with Profiles to
  the ObjectDataSource&quot;
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: This article explains how the encapsulation of Membership can be extended
  to include Profile (personalization) information for users. The designers of Membership
  included a very basic set of attributes to associate with Members (logged in users).
wordpress_id: 31
wordpress_url: https://peterkellner.net/2006/09/04/addprofiletoods/
date: '2006-09-04 11:55:33 -0700'
date_gmt: '2006-09-04 18:55:33 -0700'
categories:
- ".Net 2.0"
- Membership
- ObjectDataSource
- ASP.NET 2.0
tags: []
---
<p>Microsoft just published my fourth article. This one is titled: &quot;<a href="http://msdn.microsoft.com/en-us/library/aa479399.aspx">Microsoft ASP.NET 2.0 Member/Role Management with IIS, Part 4: Adding Personalization with Profiles to the ObjectDataSource</a>&quot;.</p>
<p>You can find it on <a href="http://msdn.microsoft.com/en-us/library/aa479399.aspx">MSDN here</a>, or on <a href="/2006/03/13/adding-personalization-via-profiles-to-the-objectdatasource-in-aspnet-20/">my blog here</a>.</p>
<p>Here is the introduction.</p>
<p> <!--more--><br />
<h2>Introduction</h2>
<p>This article extends one of the web pages developed in <a href="http://msdn.microsoft.com/en-us/library/aa478947.aspx">Part II of this series</a> using Microsoft’s Profile feature. In Part II, the Membership API was encapsulated in an ObjectDataSource. This allowed the developer to have a drop in web page for the web site administrator to use in an web site project for editing membership. This tools allowed for similar capability to the the web site manager tool included in Visual Studio 2005 (VS2005). It is necessary because using that web configuration tool included with VS2005 is problematic and should not be used in a production web site.</p>
<p>This article explains how the encapsulation of Membership can be extended to include Profile (personalization) information for users. The designers of Membership included a very basic set of attributes to associate with Members (logged in users). The Profile API provided by Microsoft allows for additional information to be attached to each member. Typically, this information would include things like: first name, last name, home address, favorite color schemes or anything else the developer may want to associate with a logged in member. By personalizing the site to the member logged in, it likely increases the chance the user will return and be more comfortable while visiting.</p>
