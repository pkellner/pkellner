---
status: publish
published: true
pubDatetime: 2006-01-08T20:00:00.000Z
title: 'Microsoft ASP.NET 2.0 Member/Role Management with IISPart 1: Security and
  Configuration Overview'
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This article is the first of two articles describing the secure use and
  setup   of a three tier solution for managing ASP.NET Membership and Roles. This
  first   article will focus on configuring, using, and, most importantly, securing
  this   solution, as well as providing an overview of how it can be implemented in
  a   typical Microsoft ASP.NET 2.0 Web solution. The <strong>Membership</strong>
  and <strong>Roles</strong> objects will be treated as working without delving into
  their   internal structures. Managing Members and Roles will seem no different than
  \  managing data from a simple data source. In the second article, the internals
  of   these controls and objects will be explained in enough detail so developers
  \  would be able to build their own using similar techniques.</p>"
wordpress_id: 13
wordpress_url: https://peterkellner.net/?p=23
date: '2006-01-08 15:07:10 -0800'
date_gmt: '2006-01-08 22:07:10 -0800'
categories:
- ".Net 2.0"
- MSDN Articles
- ASP.NET 2.0
tags: []
---
<p><span style="font-size: large;"><strong>Also published on Microsoft's MSDN Network at</strong></span></p>
<p class="style4"><a title="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnaspp/html/ASPMemManSec.asp" href="http://msdn.microsoft.com/en-us/library/aa478958.aspx">http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnaspp/html/ASPMemManSec.asp</a></p>
<p>Applies to:</p>
<ul>
<li>Microsoft ASP.NET 2.0</li>
<li>Microsoft Visual Studio 2005</li>
<li>Microsoft Internet Information Services</li>
</ul>
<p><!--more--></p>
<p>Link To Part 2: Implementation</p>
<h4>Contents</h4>
<p><a href="#aspmemmansec_topic1" target="_self">Abstract</a><br />
<a href="#aspmemmansec_topic2" target="_self">Introduction</a><br />
<a href="#aspmemmansec_topic3" target="_self">Security Considerations</a><br />
<a href="#aspmemmansec_topic4" target="_self">Role-Based Security in a ASP.NET 2.0 Web Site</a><br />
<a href="#aspmemmansec_topic5" target="_self">Conclusion</a></p>
<p><a id="aspmemmansec_topic1" name="aspmemmansec_topic1"></a></p>
<h2>Abstract</h2>
<p>This article is the first of two articles describing the secure use and setup of a three tier solution for managing ASP.NET Membership and Roles. This first article will focus on configuring, using, and, most importantly, securing this solution, as well as providing an overview of how it can be implemented in a typical Microsoft ASP.NET 2.0 Web solution. The <strong>Membership</strong> and <strong>Roles</strong> objects will be treated as working without delving into their internal structures. Managing Members and Roles will seem no different than managing data from a simple data source. In the second article, the internals of these controls and objects will be explained in enough detail so developers would be able to build their own using similar techniques.</p>
<h2>Introduction</h2>
<p>ASP.NET 2.0 extends user authentication directly into the application programming domain. Using a standard .NET Library reference (<strong>system.web.security</strong>), developers can build full authentication into their application with very little extra work. With this in mind, it is important to remember that a certain level of due diligence is necessary to minimize the possibility that the application being built will not have its security compromised during use.</p>
<p>This article provides an overview of the security mechanisms and shows example security settings that are an essential part of creating a secure environment for Web applications. ASP.NET 2.0 provides many different configuration options that may or may not be deemed necessary, depending on security requirements. Throughout this article, the pros and cons of these configuration options will be discussed.</p>
<p>&nbsp;</p>
<h2>Security Considerations<a id="aspmemmansec_topic3" name="aspmemmansec_topic3"></a></h2>
<h3>Securing the Physical Environment</h3>
<p>It is often said that a computer's security ends at the computer's front panel power switch. No matter how well the system is secured from an OS level, physical protection is essential. It must be assumed that anyone who has physical access to the computer will always be able to compromise its integrity in one way or another.</p>
<p>For further information on recommended best practices for securing a computer's physical environment, please review <a href="http://www.microsoft.com/technet/archive/community/columns/security/5min/5min-203.mspx">this article</a> on Microsoft TechNet.</p>
<h3>Securing the Domain Environment</h3>
<p>Best practices for setting up user accounts, passwords, and privileges must be followed. If, for example, a user without privilege is able to directly access the database containing secure data used by the Web application, the application can become compromised.</p>
<p>For further information on securing a computer's domain environment, <a href="http://www.microsoft.com/security/default.mspx">the following articles</a> on the Microsoft Security Home Page give a lot of very helpful recommendations and tips.</p>
<h3>Securing the .NET Environment</h3>
<p>The .NET environment allows the setting of code access security. This means that individual system and application libraries can be associated with different trust levels. This can be very important in, for example, a shared hosting environment where multiple Web applications may be running. Each Web application that is potentially owned by different users may require isolation and protection from each other. In addition, without this isolation, each Web application could potentially impact critical system functions.</p>
<p>In this article, it will be assumed that the ASP.NET user (the user that IIS runs on behalf of) is running with the highest trust level. This would likely be the case when a Web application is running in a dedicated environment. For further information on how code level security could be used to enhance the security of a Web server, see the MSDN article Using Code Access Security with ASP.NET.</p>
<h3>ASP.NET's Relationship with IIS</h3>
<p>ASP.NET supports three authentication providers when working with IIS: Forms Authentication, which uses application specific logic; Passport authentication, which is a centralized authentication service provided by Microsoft; and Windows authentication, which uses the authentication provided directly through IIS. The default authentication for ASP.NET projects, Forms Authentication, is used in this article. The authentication mode is specified in the web.config file. The syntax choices are as follows.</p>
<pre  class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">authentication</span> <span class="attr">mode</span> = <span class="kwrd">"{Windows|Forms|Passport|None}"</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">authentication</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<p class="codelisting">The flow that is followed when a user logs in from a Web client is depicted in the flow chart in this article.</p>
<p>Keep in mind that this article was written in 2001 and is current with the flow of IIS 5.1, not the currently shipping IIS 6.0 or later.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membsec_fig01.gif" alt="Security Flow between IIS and ASP.NET" /></p>
<p><strong>Figure 1. Security Flow between IIS and ASP.NET</strong></p>
<h2><a id="aspmemmansec_topic4" name="aspmemmansec_topic4"></a>Role-Based Security in an ASP.NET 2.0 Web Site</h2>
<h3>Initial Setup and Configuration</h3>
<p>Certain parameters that affect the overall running of an ASP.NET 2.0 Web application are set in the web.config file. Example parameters include a reference to the membership Provider (or database), the strength of the password required, and whether an e-mail is required to register. The relevant section of the web.config file is shown below with sample values for a minimalist security configuration. More details can be found by accessing Visual Studio 2005 help and looking up "Membership Members." Each security parameter is explained there in detail.</p>
<p>&nbsp;</p>
<pre class="csharpcode ignore:true"> 
<span class="kwrd">&lt;</span><span class="html">providers</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">remove</span> <span class="attr">name</span><span class="kwrd">="AspNetSqlMembershipProvider"</span><span class="kwrd">/&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="AspNetSqlMembershipProvider"</span>
   <span class="attr">type</span><span class="kwrd">="System.Web.Security.SqlMembershipProvider,
   System.Web, Version=2.0.0.0, Culture=neutral,
   PublicKeyToken=b03f5f7f11d50a3a"</span>
   <span class="attr">connectionStringName</span><span class="kwrd">="LocalSqlServer"</span>
   <span class="attr">enablePasswordRetrieval</span><span class="kwrd">="false"</span>
   <span class="attr">enablePasswordReset</span><span class="kwrd">="true"</span>
   <span class="attr">requiresQuestionAndAnswer</span><span class="kwrd">="true"</span>
   <span class="attr">applicationName</span><span class="kwrd">="/"</span>
   <span class="attr">requiresUniqueEmail</span><span class="kwrd">="false"</span>
   <span class="attr">minRequiredPasswordLength</span><span class="kwrd">="1"</span>
   <span class="attr">minRequiredNonalphanumericCharacters</span><span class="kwrd">="0"</span>
   <span class="attr">passwordFormat</span><span class="kwrd">="Hashed"</span>
   <span class="attr">maxInvalidPasswordAttempts</span><span class="kwrd">="5"</span>
   <span class="attr">passwordAttemptWindow</span><span class="kwrd">="10"</span>
   <span class="attr">passwordStrengthRegularExpression</span><span class="kwrd">=""</span>
   <span class="attr">commentTimeout</span><span class="kwrd">=""</span><span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">providers</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<p>In addition to the web.config section shown above, the machine.config contains the default connection string to the database associated with Membership. A different connection string can be configured in web.config. To add additional security the connection string can be encoded and the Membership database password can be encrypted. Many articles have been written discussing these tradeoffs. Microsoft's quick start guides give good examples of how to use encryption in your web.config file.</p>
<h3>The Web.Config File / .aspx Page Security</h3>
<p>Each Web page in the Web application can be assigned a security level. This is done by specifying what role is required to access the page. The syntax in the web.config file is very straightforward. For example, the following web.config snippet specifies that the MembershipGrid.aspx Web page will only be accessible by a user whose role is assigned as Administrator.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>The Web.Config File / Inside .aspx Page Security</h3>
<p>It is often necessary to provide more granular security than what is previously described. That is, it may be necessary to protect a control such as a button or an aspx page. To do this, it is necessary to programmatically change the attribute associated with the control to be affected. For example, if it is necessary to hide a delete button based on the user's role, there are two things that need to be done: first, a method called <strong>ShowButtonBasedOnRole</strong> should be added to the codebehind class of the Web page. It should return <strong>true</strong> if the user is permitted in the role requested, and <strong>false</strong> if the user is not included in the role requested.</p>
<p>&nbsp;</p>
<pre class="csharpcode ignore:true"><span class="kwrd">protected</span> <span class="kwrd">bool</span> ShowButtonBasedOnRole(<span class="kwrd">string</span> RoleOfInterest)
{
  <span class="kwrd">return</span> User.IsInRole(RoleOfInterest);
}</pre>
<p>&nbsp;</p>
<p>Then, in the actual aspx page the visibility attribute of the button should be set based on the code-behind method <strong>ShowButtonBasedOnRole</strong>. The actual declaration of the button looks like the following.</p>
<p>&nbsp;</p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Button</span>
 <span class="attr">ID</span><span class="kwrd">="Button1"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">Text</span><span class="kwrd">="Button"</span>
 <span class="attr">Visible</span><span class="kwrd">='&lt;%# (bool) ShowDeleteRowBasedOnRole("administrator") %&gt;'</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<p>If a button were to be based on any of multiple roles being set, the passed-in parameter could be changed to a string, and all those roles would be checked before returning with an answer of the whether the user is assigned to one of those roles.</p>
<h3>Using the Member/Role Manager aspx Page</h3>
<p>To use the aspx page included within this project (Membership.aspx) there are a few things that need to be done. First, the two data classes from the article project files need to be copied and included in the target project's app_code directory. These two files are MembershipDataObject.cs and RoleDataObject.cs. Then, the aspx file Membership.aspx and its codebehind page, Membership.aspx.cs need to be moved to the current project.</p>
<p>It is very important that this page be protected from being accessed by any user who is not assigned the administrator role. Otherwise, any user would be able to modify any other user's logon information. To do this, make sure that in the web.config file the Membership.aspx page is protected. Sample lines from a web.config file to accomplish this are as follows.</p>
<p>&nbsp;</p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">system</span> .<span class="attr">web</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">location</span> <span class="attr">path</span><span class="kwrd">="Membership.aspx"</span> <span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">system</span> .<span class="attr">web</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">authorization</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">allow</span> <span class="attr">roles</span><span class="kwrd">="Administrators"</span><span class="kwrd">/&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">authorization</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">system</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">location</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">system</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<p>Now that the page is protected, it will be impossible to access this page without having Administrator assigned as a role to the current logged-in user account.</p>
<p>The best way to get around this is to execute the code below one time, then remove that code from the Web server. It could, for example, be in the pageload event of an ASP.NET Web page. Then, after this page has been called, delete the page from the server. At that point, the Membership Management Page will only be accessible by logging into the account admin with the password.</p>
<p>&nbsp;</p>
<pre class="csharpcode ignore:true">Roles.CreateRole(<span class="str">"Administrator"</span>);
Roles.CreateRole(<span class="str">"User"</span>);
Roles.CreateRole(<span class="str">"Guest"</span>);
Membership.CreateUser(<span class="str">"admin"</span>, <span class="str">"some strong password here"</span>);
Roles.AddUserToRole(<span class="str">"admin"</span>, <span class="str">"Administrator"</span>);</pre>
<p>&nbsp;</p>
<h2>Conclusion<a id="aspmemmansec_topic5" name="aspmemmansec_topic5"></a></h2>
<p>When setting up any Web site, it is important to be cognizant of the users who will use it and understand their associated security requirements. If, for example, the Web site is to be used by an internal group in a company with no external access and no sensitive data, simple security may be sufficient. That is, no encryption, loose password constraints, and so on. Authentication can be used as a convenient method for tracking who is entering data. On the other hand, if the Web site is on the internet and handles confidential data, it is important to lockdown the site as much as possible and only allow authenticated users to access the site.</p>
<p>This article provided a brief introduction on what needs to be considered while setting up security for an ASP.NET Web site. It showed how to add a secure page for modifying Membership and Role information for users logging into the Web site. The next article in this two part series assumes that the security aspects of developing a Web site are understood. It will then describe in detail how the Membership Management page works.</p>
<p>&nbsp;</p>
