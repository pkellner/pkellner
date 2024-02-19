---
status: publish
published: true
pubDatetime: 2011-11-27T20:00:00.000Z
title: Using The DataContext In EntityFramework To Retrieve Nested Objects
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1709
wordpress_url: https://peterkellner.net/2011/11/27/using-the-datacontext-in-entityframework-to-retrieve-nested-objects/
date: '2011-11-27 11:41:22 -0800'
date_gmt: '2011-11-27 18:41:22 -0800'
categories:
- C#
- Visual Studio 2010
- Entity Framework
- CodeFirst
tags: []
---
<p>I’m always somewhat amazed when I read something from documentation that is not straight forward and it actually works.&#160; So amazed and excited that I often feel the need to blog about it.</p>
<p>So, here is the problem.&#160; I created a <a href="http://blogs.msdn.com/b/adonet/archive/2011/03/15/ef-4-1-code-first-walkthrough.aspx">CodeFirst</a> implementation of <a href="http://msdn.microsoft.com/en-us/data/aa937723">EntityFramework</a> in <a href="http://msdn.microsoft.com/en-us/vstudio/aa718325">Visual Studio</a> and created a simple hierarchy in my data model.&#160; That is, without showing all the code, here is what I have:</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> Person<br />{<br />    [Key]<br />    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Id { get; set; }<br /><br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">virtual</span> List&lt;EmailAddressInfo&gt; EmailAddressInfoList { get; set; }<br />    ..<br />}<br /><br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> EmailAddressInfo<br />{<br />    [Key]<br />    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Id { get; set; }<br /><br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> EmailAddress { get; set; }<br /><br />}<br /></pre>
<p></div>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> EmailAccount<br />{<br />    [Key]<br />    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]<br />    <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Id { get; set; }<br />    ...<br />}</pre>
<p></div>
<p>Now, if you execute a LINQ command like the following:</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">var recs = (from data <span style="color: #0000ff">in</span> db.Persons<br />                            select data);<br />                <span style="color: #0000ff">foreach</span> (var rec <span style="color: #0000ff">in</span> recs)<br />                {<br />                    <span style="color: #0000ff">foreach</span> (var email <span style="color: #0000ff">in</span> rec.EmailAddressInfoList)<br />                    {<br />                        Console.WriteLine(email);<br />                    }<br />                }</pre>
<p></div>
<p>You get the error:</p>
<blockquote>
<p><b>Exception Details: </b><em>System.InvalidOperationException: There is already an open DataReader associated with this Command which must be closed first.</em></p>
</blockquote>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2011/11/image17.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/11/image_thumb16.png" width="579" height="181" /></a></p>
<p>&#160;</p>
<p>To solve this, you need to tell EntityFramework/CodeFirst to include the EmailAddressInfoList in the query.&#160; All you need to do is change the db.Persons to db.Persons.Include(&quot;EmailAddressInfoList&quot;) as follows:</p>
<p>&#160;</p>
<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">var recs = (from data <span style="color: #0000ff">in</span> db.Persons.Include(<span style="color: #006080">&quot;EmailAddressInfoList&quot;</span>)<br />            select data);</pre>
<p></div>
<p>&#160;</p>
<p>Then, it all works!</p>
<p>Hope this helps.</p>
