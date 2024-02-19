---
status: publish
published: true
pubDatetime: 2010-10-15T20:00:00.000Z
title: Is My Azure Blob Storage Container Name Valid?
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
description: Learn what makes up a valid Azure Blob name
wordpress_id: 1378
wordpress_url: https://peterkellner.net/2010/10/15/is-my-azure-blog-storage-container-name-valid/
date: '2010-10-15 17:09:56 -0700'
date_gmt: '2010-10-16 00:09:56 -0700'
categories:
- Azure
- Azure Blob Storage
tags: []
---
<p>I just spend about 2 hours wrestling with what turned out to be an invalid blob storage container name.  I named a container “MyTest1” which did not meet the criteria.  For your information, the criteria is as follows:</p>
<ol>
<li>3 to 63 Characters<b></b></li>
<li>Starts With Letter or Number<b></b></li>
<li>Letters, Numbers, and Dash (-)<b></b></li>
<li>Every Dash (-) Must Be Immediately Preceded and Followed by a Letter or Number</li>
<li>Blob filenames must be lowercase (no uppercase letters are valid)</li>
</ol>
<p>So, I decided to hunt for a regular expression to do this and I found one on the web. I’m not sure if it’s correct, but here is what I found at <a title="http://social.msdn.microsoft.com/Forums/en-GB/windowsazuredata/thread/d364761b-6d9d-4c15-8353-46c6719a3392" href="http://social.msdn.microsoft.com/Forums/en-GB/windowsazuredata/thread/d364761b-6d9d-4c15-8353-46c6719a3392">http://social.msdn.microsoft.com/Forums/en-GB/windowsazuredata/thread/d364761b-6d9d-4c15-8353-46c6719a3392</a> from Gaurav Mantri (method that includes the regex).</p>
<p>&nbsp;</p>
<div id="codeSnippetWrapper">
<pre style="text-align: left; line-height: 12pt; background-color: #f4f4f4; margin: 0em; width: 100%; font-family: 'Courier New', courier, monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible; border-style: none; padding: 0px;" id="codeSnippet"><span style="color: #0000ff;">internal</span> <span style="color: #0000ff;">static</span> <span style="color: #0000ff;">bool</span> IsBlobContainerNameValid(<span style="color: #0000ff;">string</span> name)
    {
      <span style="color: #0000ff;">if</span> (name.Equals(<span style="color: #006080;">"$root"</span>))
      { 
        <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span>; 
      }
      <span style="color: #0000ff;">string</span> validBlobContainerNameRegex = <span style="color: #006080;">@"^([a-z]|\d){1}([a-z]|-|\d){1,61}([a-z]|\d){1}$"</span>;
      Regex reg = <span style="color: #0000ff;">new</span> Regex(validBlobContainerNameRegex);
      <span style="color: #0000ff;">if</span> (reg.IsMatch(name))
      {
        <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span>;
      }
      <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span>;
    }</pre>
<p>&nbsp;</p>
</div>
<p>Hope this helps!</p>
