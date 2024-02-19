---
status: publish
published: true
pubDatetime: 2006-01-09T20:00:00.000Z
title: 'Microsoft ASP.NET 2.0 Member/Role Management with IISPart 2: Implementation'
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: <p>With the release of Microsoft Visual Studio 2005, there is no "out of
  the box" solution for maintaining the Membership and Role databases in Microsoft
  IIS. This is a problem when you move your application from development to a production
  IIS server. The utility that Microsoft provides, ASP.NET Web Configuration, can
  be run only in a development, non-production environment. This article and its associated
  code solve this by implementing a three-tier solution to Member and Role management
  while using standard Microsoft ASP.NET tools. This means that it will run in any
  ASP.NET 2.0 environment, including IIS. The solution is flexible and very easy to
  add to any existing ASP.NET 2.0 website project.</p>
wordpress_id: 14
wordpress_url: https://peterkellner.net/?p=24
date: '2006-01-09 12:27:24 -0800'
date_gmt: '2006-01-09 19:27:24 -0800'
categories:
- ".Net 2.0"
- MSDN Articles
- ASP.NET 2.0
tags: []
---
<p class="style3">Also published on Microsoft's MSDN Network at <a title="http://msdn2.microsoft.com/en-us/library/aa478947.aspx" href="http://msdn2.microsoft.com/en-us/library/aa478947.aspx">http://msdn2.microsoft.com/en-us/library/aa478947.aspx</a></p>
<p class="style3"><a href="/wp/wp-content/uploads/2006/01/MembershipEditor7.zip">Click Here for Source Code Associated With This Article </a></p>
<p> Applies to:   <br /> 
<ul>
<li>Microsoft ASP.NET 2.0 </li>
<li>Microsoft Visual Studio 2005 </li>
<li>Microsoft Internet Information Services </li>
</ul>
<p> <!--more-->
<p class="style3"><a href="/2006/01/08/microsoft-aspnet-20-memberrole-management-with-iis-part-1-security-and-configuration-overview/">Link To Part 1: Security and Configuration</a></p>
<h2>Contents</h2>
<p> <a href="#asp2memroleman_topic1">Introduction</a>   <br /><a href="#asp2memroleman_topic2">Technologies Used</a>   <br /><a href="#asp2memroleman_topic3">The Application and Project</a>   <br /><a href="#asp2memroleman_topic4">The ObjectDataSource in Detail</a>   <br /><a href="#asp2memroleman_topic5">The Return Value of the Select Method (Type Collection)</a>   <br /><a href="#asp2memroleman_topic6">The Select Method Itself</a>   <br /><a href="#asp2memroleman_topic7">The Custom Sort Criteria</a>   <br /><a href="#asp2memroleman_topic8">ObjectDataSource In GridView (Data Control)</a>   <br /><a href="#asp2memroleman_topic9">Conclusion</a>   </p>
<h2 id="aspmemmansec_topic1">Introduction</h2>
<p><a href="/wp/wp-content/uploads/2006/01/membiis_fig01L.gif" target="_top"><img border="0" alt="Click here for larger image" src="/wp/wp-content/uploads/2006/01/membiis_fig01S.gif" /></a></p>
<p><strong>Figure 1. Membership Editor</strong></p>
<p>With the release of Microsoft Visual Studio 2005, there is no &quot;out of the box&quot; solution for maintaining the Membership and Role databases in Microsoft IIS. This is a problem when you move your application from development to a production IIS server. The utility that Microsoft provides, ASP.NET Web Configuration, can be run only in a development, non-production environment. This article and its associated code solve this by implementing a three-tier solution to Member and Role management while using standard Microsoft ASP.NET tools. This means that it will run in any ASP.NET 2.0 environment, including IIS. The solution is flexible and very easy to add to any existing ASP.NET 2.0 website project.</p>
<p>The tiers of this solution are defined as follows. The first tier, the ASP.NET page (also known as the presentation layer), interfaces with two business objects through the object data source. These business objects function as the middle tier, and they are wrappers for members and roles. The third tier, or back end, consists of the Membership and Role Manager APIs provided by ASP.NET. The middle tier objects can easily be dropped into any ASP.NET 2.0 project and used directly, with almost no changes.</p>
<p>This article explains in depth the implementation of the middle tier—that is, the data objects, as well as the ObjectDataSource that is associated with them. It then explains how to use these objects in an ASP.NET Web project that uses Microsoft SQL Server Express 2005, which comes bundled with Visual Studio 2005. However, the Membership API provided by Microsoft uses their provider technology; therefore, the solution presented here is database independent. Membership and role information could just as easily come from LDAP, SQL Server, or Oracle.</p>
<h2 id="asp2memroleman_topic2">Technologies Used</h2>
<h3>The ObjectDataSource</h3>
<p>There are two ObjectDataSource instances defined. One is for Membership Data (User Names, Creation Date, Approval, and so on), and the other is for Roles (Administrator, Friends, and so on). Both of these data sources are completely populated with all of the data access methods—that is, they both have Member functions that perform inserts, updates, deletes, and selects. Both ObjectDataSource instances return a Generic List type, which means that in the GridView, the column names are automatically set to the property value names of the ObjectDataSource. In addition, custom sorting is implemented so that users can click the column headers in the GridView in order to sort the data forwards or backwards, as desired.</p>
<h3>SQL Server Express 2005 and Web.Config</h3>
<p>The data provider source for the Membership and Role databases is SQL Server Express 2005. The appropriate entries are set in the web.config file in order to make this happen. A short discussion is given later in this article of how to set up a new project from scratch. The connection string for SQL Server Express 2005 is not mentioned in the web.config file, because it is already defined in the Machine.Config file that is included as a default part of the Microsoft .NET 2.0 Framework.</p>
<h3>IIS (5.1 and 6.0) Compatible</h3>
<p>The Web server can be either version 5.1 or 6.0. In order to do any testing of multiple users logged in to your Web app, you must use IIS. The built-in development Web server does not correctly maintain state of the different users who are logged in. Although the Asp.net Web config tool could be made to work with IIS, the additional security work necessary in order to enable this was not done.</p>
<h3>The GridView Control</h3>
<p>The GridView is used to present the data for both membership and roles. As mentioned earlier, because of the use of a Generic type for the ObjectDataSource, the column names of the GridView are automatically named after the property values of the ObjectDataSource. Without the use of Generics, the column names revert to meaningless default values and must each be edited by hand.</p>
<h2 id="asp2memroleman_topic3">The Application and Project</h2>
<p>The project necessary in order to run this utility is very simple and self-contained. The project files, which are available for download, contain a full working example. Because there is no direct database access to the users and roles, all that is needed is to grab the three data objects (<strong>MembershipDataObject.cs</strong>, <strong>MembershipUserSortable.cs</strong> and <strong>RoleDataObject.cs</strong>: see Figure 2).</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig02.gif" width="330" height="339" /></p>
<p><strong>Figure 2. Membership Editor project</strong></p>
<p>In the SamplePages folder there are several other samples that demonstrate the use of the previously mentioned modules. As one example, Membership.aspx is the example shown in Figure 1. It can be used for selecting, updating, inserting, and deleting Members and Roles, as well as for assigning roles to members.</p>
<p>With a working ASP.NET 2.0 application that already has a working membership module, these pages should need no external configuration beyond what has already been done. These files can be copied directly into a project and they will just work.</p>
<p>If this is the first implementation of Membership and Role Management in an application, the process to follow to create a solution using these objects is as follows:</p>
<ol type="1">
<li>Using Visual Studio 2005, create a new Web project of the type ASP.NET Web Site. </li>
<li>Click <strong>Website / ASP.NET Configuration</strong> on the menu. </li>
<li>Follow the wizard steps (1 to 7) to create some sample users and roles. This will effectively create a valid web.config file in the current project that has enough information to have Member Management up and running. By default, it will use SQL Server Express 2005 in its default configuration. </li>
<li>Include the three .cs files in the project, and then include the sample .aspx pages as samples. </li>
</ol>
<h2 id="asp2memroleman_topic4">The ObjectDataSource in Detail</h2>
<p>The ObjectDataSource technology enables the creation of a datasource that behaves very similarly to the SqlDataSource—that is, it exposes interfaces that allow for selecting, updating, inserting, and deleting records (or record-like objects) from a persistent data store (such as a database). The next several sections of this article will discuss the object (or class file) that the ObjectDataSource uses to manipulate membership. Its name in the project is <strong>MembershipUserODS.cs</strong>.</p>
<h3>The Class (MembershipUserODS)</h3>
<p>Because the data is retrieved from the Microsoft Membership API, an ObjectDataSource is used to solve the problem. The first step in doing this is to create a stand-alone class that wraps <strong>MembershipUser</strong> so that it can be associated with the ObjectDataSource. The example below shows a typical set of methods that need to be implemented, and the next several sections of this article will discuss the implementation of each member function. Many of the details are left out of the article, but they are included in the source code provided with this article. </p>
<p> 
<pre class="csharpcode ignore:true">[DataObject(<span class="kwrd">true</span>)
<span class="kwrd">public</span> <span class="kwrd">class</span> MembershipUserWrapper {
  [DataObjectMethod(DataObjectMethodType.Select, <span class="kwrd">true</span>)]
  <span class="kwrd">static</span> <span class="kwrd">public</span> Collection&lt;membershipuserwrapper&gt; GetMembers(<span class="kwrd">string</span>
       sortData) {
    <span class="kwrd">return</span> GetMembers(<span class="kwrd">true</span>, <span class="kwrd">true</span>, <span class="kwrd">null</span>, sortData);
  }
 
  [DataObjectMethod(DataObjectMethodType.Insert, <span class="kwrd">true</span>)]
  <span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Insert(<span class="kwrd">string</span> UserName, <span class="kwrd">bool</span> isApproved,
<span class="kwrd">string</span> comment, DateTime lastLockoutDate, ...) {
  }
 
  [DataObjectMethod(DataObjectMethodType.Delete, <span class="kwrd">true</span>)]
  <span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Delete(<span class="kwrd">object</span> UserName, <span class="kwrd">string</span> Original_UserName){
    Membership.DeleteUser(Original_UserName, <span class="kwrd">true</span>);
  }
 
  [DataObjectMethod(DataObjectMethodType.Update, <span class="kwrd">true</span>)]
  <span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Update(<span class="kwrd">string</span> original_UserName,<span class="kwrd">string</span> email,...){
  }
}
&lt;/membershipuserwrapper&gt;</pre>
<p></p>
<h3>The Class Declaration</h3>
<p>The class declaration shown above is special because of the attribute <strong>[(DataObject(true)]</strong>. This attribute tells the the Visual Studio 2005 ObjectDataSource Creation Wizard to look only for members with this special attribute when searching for DataObjects in the data class. See the example in the section showing where this class is assigned to a GridView component.</p>
<h3>The Insert Method</h3>
<p>The details of each section involve a very straightforward use of the Membership API provided by Microsoft. For example, here is what might be a typical <strong>Insert </strong>method in more detail. </p>
<p></p>
<pre class="csharpcode ignore:true">[DataObjectMethod(DataObjectMethodType.Insert,<span class="kwrd">true</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Insert(<span class="kwrd">string</span> userName, <span class="kwrd">string</span> password,)
{
   MembershipCreateStatus status;
      Membership.CreateUser(userName, password,);
}</pre>
<p></p>
<p>This class <strong>Insert</strong> is polymorphic, which means there can be multiple <strong>Insert</strong> methods used for different purposes. For example, it may be necessary to dynamically decide whether a created user should be approved depending on the circumstances. For example, a new user created in an admin screen may want to create users defaulted to approved, whereas a user register screen might default to not approved. To do this, another <strong>Insert</strong> method is needed, with an additional parameter. Here is what an <strong>Insert</strong> method that would achieve this goal might look like. </p>
<p></p>
<pre class="csharpcode ignore:true">[DataObjectMethod(DataObjectMethodType.Insert,<span class="kwrd">false</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Insert(<span class="kwrd">string</span> userName, <span class="kwrd">string</span> password, <span class="kwrd">bool</span> isApproved)
{
MembershipCreateStatus status;
   Membership.CreateUser(UserName, password,
      isApproved, <span class="kwrd">out</span> status);
}</pre>
<p></p>
<p>As with the other methods listed here, the examples shown are not what will actually be found in the accompanying source. The examples here are meant to be illustrations of typical uses. More complete and commented uses are included in the source.</p>
<h3>The Update Method</h3>
<p>The <strong>Update</strong> method is a very straightforward implementation of the Membership API. Just like the <strong>Insert</strong> method, there can be multiple implementations of <strong>Update</strong>. Only one implementation is shown here. In the code available for download, there are more polymorphic implementations of <strong>Update</strong>, including one that just sets the <strong>IsApproved</strong> property (shown in the following example).</p>
<p></p>
<pre class="csharpcode ignore:true">[DataObjectMethod(DataObjectMethodType.Update,<span class="kwrd">false</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Update(<span class="kwrd">string</span> UserName,<span class="kwrd">bool</span> isApproved)
{
   <span class="kwrd">bool</span> dirtyFlag = <span class="kwrd">false</span>;
   MembershipUser mu = Membership.GetUser(UserName);
   <span class="kwrd">if</span> (mu.isApproved != isApproved)
   {
      dirtyFlag = <span class="kwrd">true</span>;
      mu.IsApproved = isApproved;
   }
   <span class="kwrd">if</span> (dirtyFlag == <span class="kwrd">true</span>)
   {
      Membership.UpdateUser(mu);
   }
}</pre>
<p></p>
<h3>The Delete Method</h3>
<p><font face="verdana">The <strong>Delete</strong> method is the simplest, and it takes one parameters, <strong>UserName</strong>.</font></p>
<p></p>
<pre class="csharpcode ignore:true">&lt;h2&gt;The Delete Method&lt;/h2&gt;
<span class="kwrd">static</span> <span class="kwrd">public</span> <span class="kwrd">void</span> Delete(<span class="kwrd">string</span> UserName)
{
   Membership.DeleteUser(UserName,<span class="kwrd">true</span>);
}</pre>
<p></p>
<h3>The Select Method with a Sort Attribute</h3>
<p>The <strong>Select</strong> method—<strong>GetMembers</strong>, in this case—has multiple components, each of them worthy of discussion. First, what it returns is discussed, and then the actual method itself, and finally, how it sorts what it returns.</p>
<h2 id="asp2memroleman_topic5">The Return Value of the Select Method (Type Collection)</h2>
<p>The return value of the <strong>Select</strong> method (which also is referred to as <strong>Get</strong>) is a Generic Collection class. Generics are used because the ObjectDataSource ultimately associated with the class uses reflection to determine the column names and types. These names and types are associated with each row of data that is returned. This is the same way that a SqlDataSource uses the database metadata of a table or stored procedure to determine the column names of each row. Since the return type of the <strong>Select</strong> method is MembershipUserWrapper, which inherits from MembershipUser, most of the properties of this class are the same properties that are associated with MembershipUser. Those properties include:</p>
<ul type="disc">
<li><strong>ProviderUserKey </strong></li>
<li><strong>UserName </strong></li>
<li><strong>LastLockoutDate </strong></li>
<li><strong>CreationDate </strong></li>
<li><strong>PasswordQuestion </strong></li>
<li><strong>LastActivityDate </strong></li>
<li><strong>ProviderName </strong></li>
<li><strong>IsLockedOut </strong></li>
<li><strong>Email </strong></li>
<li><strong>LastLoginDate </strong></li>
<li><strong>IsOnline </strong></li>
<li><strong>LastPasswordChangedDate </strong></li>
<li><strong>Comment </strong></li>
</ul>
<p>Jumping ahead of ourselves a little, one very nice feature of property values is that they can be Read-only (no set method), Write-only (no read method), and of course, Read/Write. The ObjectDataSource Wizard recognizes this and builds the appropriate parameters so that when the datacontrol is rendered (using the ObjectDataSource), just the fields that are updatable (read/write) are enabled for editing. This means that you can not change the <strong>UserName</strong> property, for example. If this does not make sense now, it will later, when we discuss the ObjectDataSource and the data components in more detail.</p>
<h2 id="asp2memroleman_topic6">The Select Method Itself</h2>
<p>Just like <strong>Insert</strong> and <strong>Update</strong>, the <strong>Select</strong> method is polymorphic. There can be as many different <strong>Select</strong> methods as there are different scenarios. For example, it may be desiable to use the <strong>Select</strong> method to select users based on whether they are approved, not approved, or both. Typically, there is one <strong>Get</strong> method that has the most possible parameters associated with it, and the other <strong>Get</strong> methods call it. In our case, there are three <strong>Get</strong> methods: one to retrieve all records, one to retrieve based on approval, and one to retrieve an individual record based on a select string. In the following example, the method that returns all users is being called. By setting both Booleans to <strong>true</strong>, all users will be returned. </p>
<p></p>
<pre class="csharpcode">[DataObjectMethod(DataObjectMethodType.Select, <span class="kwrd">true</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> List&lt;membershipdata&gt; GetMembers(<span class="kwrd">string</span> sortData)
{
   <span class="kwrd">return</span> GetMembers(<span class="kwrd">true</span>,<span class="kwrd">true</span>,<span class="kwrd">null</span>,<span class="kwrd">null</span>);
}
&lt;/membershipdata&gt;</pre>
<p></p>
<p>The next example shows a more detailed <strong>Get</strong> method. This example shows only the beginning of the method. The details of the method not shown include finishing the property assignments, filtering for approval status and rejecting the records not meeting the criteria, and applying the sort criteria. Following this example is more discussion about the sort criteria. (Note that calling <strong>GetAllUsers</strong> on a database with more than a few hundred users [the low hundreds] is quickly going to become an expensive operation.)</p>
<p></p>
<pre class="csharpcode ignore:true">[DataObjectMethod(DataObjectMethodType.Select, <span class="kwrd">true</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> List&lt;membershipdata&gt; GetMembers(<span class="kwrd">bool</span> AllApprUsers,
    <span class="kwrd">bool</span> AllNotApprUsers, <span class="kwrd">string</span> UserToFind, <span class="kwrd">string</span> sortData)
{
   List&lt;/membershipdata&gt;&lt;membershipdata&gt; memberList = <span class="kwrd">new</span> List&lt;/membershipdata&gt;&lt;membershipdata&gt;();
   MembershipUserCollection muc = Membership.GetAllUsers();
   <span class="kwrd">foreach</span> (MembershipUser mu <span class="kwrd">in</span> muc)
   {
      MembershipData md = <span class="kwrd">new</span> MembershipData();
      md.Comment = mu.Comment;
      md.CreationDate = mu.CreationDate;
&lt;/membershipdata&gt;</pre>
<p></p>
<h2 id="aspmemmansec_topic7">The Custom Sort Criteria<a id="aspmemmansec_topic7" name="aspmemmansec_topic7"></a></h2>
<p>Notice that, in the preceding code, a parameter string named <strong>sortData</strong> is passed into <strong>GetMembers</strong>. If, in the ObjectDataSource declaration, a <strong>SortParameterName</strong> is specified as one of its attributes, this parameter will be passed automatically to all <strong>Select</strong> methods. Its value will be the name specified by the attribute <strong>SortExpression</strong> in the column of the datacontrol. In our case, the datacontrol is the GridView.</p>
<p>The <strong>Comparer</strong> method is invoked based on the parameter <strong>sortName</strong> coming into the <strong>GetMembers</strong> method. Since these ASP.NET Web pages are stateless, we have to assume that the direction of the current sort (either forward or backwards) is stored in the viewstate. Each call reverses the direction of the previous call. That is, it toggles between forward sort and reverse sort as the user clicks the column header.</p>
<p>Assuming that a GridView is used, the parameter that gets passed into <strong>GetMembers(sortData)</strong> has in it the data from the <strong>SortExpression</strong> attribute of the GridView column. If a request for sorting backwards is being made, the word &quot;DESC&quot; is appended to the end of the sort string. So, for example, the first time the user clicks on the column Email, the <strong>sortData</strong> passed into <strong>GetMembers</strong> is &quot;Email.&quot; The second time the user clicks on that column, the parameter <strong>sortData</strong> becomes &quot;Email DESC,&quot; then &quot;Email,&quot; then &quot;Email DESC,&quot; and so on. As a special note, the first time the page is loaded, the <strong>sortData</strong> parameter is passed in as a zero-length string (not null). Below is the guts of the <strong>GetMembers</strong> method that retrieves and sorts the data so that it is returned in the correct order.</p>
<p></p>
<pre class="csharpcode ignore:true">[DataObjectMethod(DataObjectMethodType.Select, <span class="kwrd">true</span>)]
<span class="kwrd">static</span> <span class="kwrd">public</span> List&lt;membershipdata&gt; GetMembers(<span class="kwrd">string</span> sortData)
{
  List&lt;/membershipdata&gt;&lt;membershipdata&gt; memberList = <span class="kwrd">new</span> List&lt;/membershipdata&gt;&lt;membershipdata&gt;();
  MembershipUserCollection muc = Membership.GetAllUsers();
  List&lt;membershipuser&gt; memberList = <span class="kwrd">new</span> List&lt;/membershipuser&gt;&lt;membershipuser&gt;(muc);
 
  <span class="kwrd">foreach</span> (MembershipUser mu <span class="kwrd">in</span> muc)
  {
    MembershipData md = <span class="kwrd">new</span> MembershipData(mu);
    memberList.Add(md);
  }
 
  ... Code that implements Comparison
 
  â�¦ memberList.Sort(comparison);
 
  <span class="kwrd">return</span> memberList;
}
&lt;/membershipuser&gt;&lt;/membershipdata&gt;</pre>
<p></p>
<p>In the next section, when this is incorporated into a GridView, it will become more clear.</p>
<h3>The ObjectDataSource Declaration </h3>
<p>The easiest way to declare an ObjectDataSource is to drag and drop one from the datacontrols on the toolbar, after first creating an empty ASP.NET page with the Visual Studio 2005 wizard. After creating the ObjectDataSource, a little tag in the upper-right corner of the newly created ObjectDataSource can be grabbed; then, clicking <strong>Configure Data Source</strong> opens a wizard saying &quot;Configure Data Source—ObjectDataSource1&quot; (see Figure 3).</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig03.gif" width="450" height="354" /></p>
<p><strong>Figure 3. Configuring ObjectDataSource</strong></p>
<p>At this point, two classes that are available for associating with an ObjectDataSource will be seen. <strong>MembershipUserODS</strong> is the primary subject of this article. <strong>RoleDataObject</strong> is basically the same thing, but it encapsulates Membership Roles. Also, remember that what is shown here are just the objects that are declared with the special class attribute <strong>[DataObject(true)]</strong> that was described in &quot;The Class Definition.&quot;</p>
<p>After choosing <strong>MembershipUserODS</strong>, a dialog box with four tabs appears. The methods to be called from the <strong>MembershipUserODS</strong> class will be defined on these tabs. Methods for <strong>Select</strong>, <strong>Update</strong>, <strong>Insert</strong>, and <strong>Delete</strong> will be associated with member functions in the <strong>MembershipUserODS</strong>. In many cases, there will be multiple methods available in the class for each of these. The appropriate one must be chosen, based on the data scenario desired. All four tabs are shown in Figure 4. By default, the members that are marked with the special attribute <strong>[DataObjectMethod(DataObjectMethodType.Select, false)]</strong> will be populated on the tabs. Of course, however, this particular attribute is the default for <strong>Select</strong>. Changing the expression <strong>DataObjectMethodType.Select</strong> to <strong>DataObjectMethodType.Insert</strong>, <strong>DataObjectMethodType.Update</strong>, and <strong>DataObjectMethodType.Delete</strong> will make the defaults appropriate for the different tabs. The second parameter, a Boolean, signifies that this method (remembering that it may be defined polymorphically) is the default method, and that it should be used in the tab control.</p>
<h3>The Select Method</h3>
<p>As mentioned earlier, in the section describing the <strong>MembershipUserODS</strong> class, the <strong>GetMembers</strong> function returns a Generic Collection class. This enables the <strong>ObjectDataSourceMembershipUser</strong> control defined here to use reflection and ascertain the calling parameters associated with this <strong>GetMembers</strong> call. In this case, the parameters used to call <strong>GetMembers</strong> are <strong>returnAllApprovedUsers</strong>, <strong>returnAllNotApprovedUsers</strong>, <strong>userNameToFind</strong>, and <strong>sortData</strong>. Based on this, the actual definition of the new ObjectDataSource will be as follows.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig04.gif" /></p>
<p><strong>Figure 4. Assigning the Select method</strong> </p>
<p></p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSourceMembershipUser&quot;</span><span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
    <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span><span class="attr">UpdateMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span>
    <span class="attr">SortParameterName</span><span class="kwrd">=&quot;SortData&quot;</span>
    <span class="attr">TypeName</span><span class="kwrd">=&quot;MembershipUtilities.MembershipDataObject&quot;</span>
    <span class="attr">DeleteMethod</span><span class="kwrd">=&quot;Delete&quot;</span> <span class="attr">InsertMethod</span><span class="kwrd">=&quot;Insert&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;userName&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;password&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;isApproved&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;Boolean&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span></pre>
<p></p>
<h3>The Insert Method</h3>
<p>The <strong>Insert</strong> method, in this case, is assigned to the member function <strong>Insert()</strong>. Notice that this method is called with only two parameters: <strong>UserName</strong> and <strong>Password</strong> (see Figure 5). The number of parameters must equal the number of parameters declared in the ObjectDataSource. The parameter declaration from the ObjectDataSource is shown below. There is a second <strong>Insert Member</strong> function defined that adds a third parameter: <strong>approvalStatus</strong>. If the functionality of this ObjectDataSource is to include inserting while setting the <strong>approvalStatus</strong>, then the other insert method should be chosen from the drop-down list. That would cause the following InsertParameters to be inserted into your .aspx page. If the one with two parameters is chosen, the block would not include the <strong>asp:Parameter</strong> with the name <strong>isApproved</strong> in it. Again, keep in mind that this example may not agree with the source code enclosed, and that it is here only as an example. The source enclosed is much more complete.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig05.gif" /></p>
<p><strong>Figure 5. Assigning the Insert method</strong> </p>
<p></p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSourceMembershipUser&quot;</span><span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
    <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span><span class="attr">UpdateMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span>
    <span class="attr">SortParameterName</span><span class="kwrd">=&quot;SortData&quot;</span>
    <span class="attr">TypeName</span><span class="kwrd">=&quot;MembershipUtilities.MembershipDataObject&quot;</span>
    <span class="attr">DeleteMethod</span><span class="kwrd">=&quot;Delete&quot;</span> <span class="attr">InsertMethod</span><span class="kwrd">=&quot;Insert&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;userName&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;password&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;isApproved&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;Boolean&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">insertparameters</span><span class="kwrd">&gt;</span>
    ...
<span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>Also, keep in mind that using an <strong>Insert</strong> method with minimal parameters will require a default password to be set in the method. In a production system, this would be a bad idea. See the attached source code for a better example of how to handle inserts. Specifically, see the page Membership.aspx for this functionality.</p>
<h2>The Update Method</h2>
<p>The <strong>Update</strong> method, in this case, is assigned to the member function <strong>Update()</strong>. Notice that this method is called with multiple parameters: <strong>UserName</strong>, <strong>Email</strong>, <strong>isApproved</strong>, and <strong>Comment</strong> (see Figure 6). In addition, there is another <strong>Update</strong> method that has all the updatable parameters. This is useful for creating a control that has the most possible update capabilities. Just like <strong>Insert</strong>, the appropriate <strong>Update</strong> method is chosen for this ObjectDataSource. When the wizard is finished, it will automatically create UpdateParameters, as shown below.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig06.gif" /></p>
<p><strong>Figure 6. Assigning the Update method</strong></p>
<p></p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSourceMembershipUser&quot;</span><span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
    <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span> <span class="attr">InsertMethod</span><span class="kwrd">=&quot;Insert&quot;</span>
    <span class="attr">SortParameterName</span><span class="kwrd">=&quot;SortData&quot;</span>
    <span class="attr">TypeName</span><span class="kwrd">=&quot;MembershipUtilities.MembershipUserODS&quot;</span>
    <span class="attr">UpdateMethod</span><span class="kwrd">=&quot;Update&quot;</span> <span class="attr">DeleteMethod</span><span class="kwrd">=&quot;Delete&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">updateparameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;Original_UserName&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;email&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;isApproved&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;Boolean&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Parameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;comment&quot;</span> <span class="attr">Type</span><span class="kwrd">=&quot;String&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">updateparameters</span><span class="kwrd">&gt;</span>
    ...
    ...</pre>
<p></p>
<h3>The Delete Method</h3>
<p>The <strong>Delete</strong> method, in this case, is assigned to the member function <strong>Delete()</strong>. There is, of course, only one <strong>Delete</strong> method necessary (see Figure 7). Below is the declaration of the ObjectDataSource that supports this <strong>Delete</strong> method.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig07.gif" /></p>
<p><strong>Figure 7. Assigning the Delete method</strong></p>
<p></p>
<pre class="csharpcode ignore:true"><span class="kwrd">&lt;</span><span class="html">asp:ObjectDataSource</span> <span class="attr">ID</span><span class="kwrd">=&quot;ObjectDataSource1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
    <span class="attr">SelectMethod</span><span class="kwrd">=&quot;GetMembers&quot;</span> <span class="attr">InsertMethod</span><span class="kwrd">=&quot;Insert&quot;</span>
    <span class="attr">SortParameterName</span><span class="kwrd">=&quot;SortData&quot;</span>
    <span class="attr">TypeName</span><span class="kwrd">=&quot;MembershipUtilities.MembershipUserODS&quot;</span>
    <span class="attr">UpdateMethod</span><span class="kwrd">=&quot;Update&quot;</span> <span class="attr">DeleteMethod</span><span class="kwrd">=&quot;Delete&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">deleteparameters</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:P</span> <span class="attr">arameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;UserName&quot;</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:P</span> <span class="attr">arameter</span> <span class="attr">Name</span><span class="kwrd">=&quot;Original_UserName&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">deleteparameters</span><span class="kwrd">&gt;</span>
    ...</pre>
<p></p>
<h3>The Class (RoleDataObject)</h3>
<p>Just like Membership, Roles are set up with their own DataObject. Since there is nothing special about Roles, there are no details regarding their setup in this article. An understanding of how the Membership DataObjects are set up is transferable to how Roles are set up. In Membership, the Microsoft C# object that encapsulates the Membership API is <strong>MembershipDataObject.cs</strong>. The analogous class for encapsulating the Role API is <strong>RoleDataObject.cs</strong>.</p>
<h2 id="asp2memroleman_topic8">ObjectDataSource In GridView (Data Control)</h2>
<p>Class declarations for Membership Users and Roles have been established in the previous sections of this article. Also, a complete <strong>ObjectDataSource</strong> object has been placed on an ASP.NET page. The final step is to create the user interface, also known as the user-facing tier of the application or the presentation layer. Because so much of the work is done by the objects created, all that is necessary is to create a simple GridView and associate it with the ObjectDataSource. The steps are as follows:</p>
<ol type="1">
<li>In visual mode of the ASP.NET page designer, drag and drop the GridView data component onto the page associated with the ObjectDataSource created earlier. </li>
<li>Enable selecting, deleting, updating, inserting, and sorting. </li>
</ol>
<p>Figure 8 shows the dialog box associated with configuring the Gridview.</p>
<p><img src="/wp/wp-content/uploads/2006/01/membiis_fig08.gif" /></p>
<p><strong>Figure 8. Configuring GridView</strong></p>
<p>A special mention should be made here that <strong>DataKeyNames</strong> in the <strong>GridView</strong> control shown below is automatically set. This is because the primary key has been tagged in the <strong>MembershipUserSortable</strong> class with the attribute <strong>[DataObjectField(true)]</strong><code>,</code> as shown below. Notice also that since <strong>UserName</strong> is a property of the <strong>MembershipUser</strong> class, it was necessary to provide a default property in the class extending <strong>MembershipUser</strong>. Since this is a Read-only property, only a <strong>Get</strong> method is declared. (<strong>UserName</strong> is public virtual on <strong>MembershipUser</strong>.)</p>
<pre ignore:true>[DataObjectField(true)]
public override string UserName {
  get { return base.UserName;
}</pre>
<p>There is one attribute in the GridView that must be set by hand: the primary key must be set in the control. To do this, associate the attribute <strong>DataKeyName</strong> with <strong>UserName</strong>. The GridView declaration is shown below.</p>
<pre class='ignore:true'>&lt;asp:GridView ID=&quot;GridView1&quot; DataKeyNames=&quot;UserName&quot; runat=&quot;server&quot; 
        AllowPaging=&quot;True&quot; AutoGenerateColumns=&quot;False&quot;
        DataSourceID=&quot;ObjectDataSourceMembershipUser&quot;
        AllowSorting=&quot;True&quot;&gt;
    &lt;Columns&gt;
    ...
    ...</pre>
<h2 id="asp2memroleman_topic9">Conclusion</h2>
<p>To wrap things up, you should now be familiar with how to build your own three-tier architected ASP.NET application. In addition, you now have two objects that you can freely use that encapsulate Members and Roles. You could now, for example, use the <strong>DetailView</strong> control, and in only a few minutes build a complete DetailView interface to Members that performs Navigation, Inserting, Updating, and Deleting of Members. Give it a try!</p>
<p>I have specifically not gone into the implementations of adding, updating, and deleting Members or Roles. If you look at the source code, you will find that I have used the APIs in a very straightforward way. Not much will be gained by describing those calls in much detail here, because I'm sure that if you are still reading this, you, like me, are probably learning this material as you go.</p>
<p>I was fortunate enough to be at MS TechEd in Orlando and PDC in LA this year, and was able to ask many questions of the ASP.NET team. In particular, I would like to thank Brad Millington and Stefan Schackow for putting up with my many questions during those weeks, and Jeff King and Brian Goldfarb for all their help in making this a better article. In some way, this article is payback, so that hopefully they won't have to answer as many questions in the future.</p>
<p><a href="/download-manager/"></a></p></p>
<hr />
<p><strong>About the author</strong> </p>
<p>Peter Kellner founded 73rd Street Associates in 1990, where he successfully delivered systems for university clinic scheduling, insurance company management, and turnkey physician office management to more than 500 customers nationwide. Ten years later, in 2000, 73rd Street Associates was purchased by a large insurance company, and Peter started a new career as an independent software consultant. Among the technologies he currently is involved with are ASP.NET, Oracle, Java, VOiP, and soon, SQL Server. When not working, Peter spends most his free time biking. He has ridden his bike across the globe. Most recently he and his wife, Tammy, rode across the U.S., from California to Georgia, in just 27 days.</p>
<p>His blog site is <a href="/">https://peterkellner.net</a>. You will find this article and the code posted in the download section.</p>
