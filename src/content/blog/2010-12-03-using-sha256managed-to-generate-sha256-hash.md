---
status: publish
published: true
pubDatetime: 2010-12-03T20:00:00.000Z
title: Using SHA256Managed to Generate SHA256 Hash with Microsoft .Net Cryptography
  Namespace / Memory Usage Implications
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1415
wordpress_url: https://peterkellner.net/?p=1415
date: '2010-12-03 12:33:10 -0800'
date_gmt: '2010-12-03 19:33:10 -0800'
categories:
- C#
- Visual Studio 2010
- ".NET 4.0"
- Cryptography
- SHA256
tags: []
---
<p>&#160;</p>
<h2>Background And Conclusion</h2>
<p>In my <a href="/2010/11/24/efficiently-generating-sha256-checksum-for-files-using-csharp/">very last post</a> I talked about how using <a href="http://msdn.microsoft.com/en-us/library/d0hxa5e7.aspx">SHA256</a> seemed to not be affected by whether you use Buffered or Not Buffered streams.&#160; An astute reader (<a href="http://blog.functionalfun.net/">Samuel Jack</a>) referenced <a href="http://blogs.msdn.com/b/brada/archive/2004/04/15/114329.aspx">an article</a> by one of my favorite ex MIcrosoft employees (<a href="http://bradabrams.com/">Brad Abrams</a>) saying that almost all the .Net streams have buffering built in.</p>
<p>Well, I think SHA256Managed does not.&#160; One of the challenges I’ve been facing lately with my current project is to provide feedback while doing all kinds of byte piping (stream stuff).&#160; While figuring out how to do this, I inadvertently figured out that buffering makes a huge difference.&#160; Briefly, let me show my results first, then talk about the code that went into it.</p>
<p>Notice that when I use a 64MB Buffer, the memory used for the process is 77MB and when I use an 8MB buffer, the memory used is 17MB.&#160; Clearly the buffer allocated matters.&#160; Just for information, I’ve also included the code that does not break the SHA256 hash into blocks, and it has the same results based on the size of the Memory Buffer declared.&#160; That is, small buffer, small use, big buffer, big use.</p>
<p>  <!--more-->
<p><a href="/FilesForWebDownload/Using_9C01/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Using_9C01/image_thumb.png" width="402" height="220" /></a></p>
<p><a href="/FilesForWebDownload/Using_9C01/image_3.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/Using_9C01/image_thumb_3.png" width="405" height="276" /></a></p>
<h2>The Code</h2>
<p>The code that I wrote to do this basically does a nice job of splitting up the processing so that you can log progress as it runs. I’m attaching the <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2010</a> project here as well as pasting the relevant source code.&#160; It’s a good base to experiment with.&#160; Feel free to comment on interesting things you find experimenting with it.</p>
<p>Visual Studio 2010 Project:&#160;&#160;&#160;&#160;&#160;&#160;
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:3633437a-182a-48b1-90bc-e4ae3be04a84" class="wlWriterEditableSmartContent">
<div><a href="/FilesForWebDownload/Using_9C01/SHA512BufferedConsoleProject.zip" target="_self">SHA512BufferedConsoleProject.zip</a></div></p>
</div>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #008000">/// &lt;summary&gt;</span><br /><span style="color: #008000">/// Used so we can get MD5Hash and get progress on calculation</span><br /><span style="color: #008000">/// &lt;/summary&gt;</span><br /><span style="color: #008000">/// &lt;param name=&quot;streamIn&quot;&gt;&lt;/param&gt;</span><br /><span style="color: #008000">/// &lt;returns&gt;&lt;/returns&gt;</span><br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">string</span> GetSha512Buffered(Stream streamIn)<br />{<br />    Process process = Process.GetCurrentProcess();<br />    <span style="color: #0000ff">const</span> <span style="color: #0000ff">int</span> bufferSizeForMd5Hash = 1024*1024*8; <span style="color: #008000">// 8MB</span><br />    Console.WriteLine(<span style="color: #006080">&quot;-----------------------------------&quot;</span>);<br />    Console.WriteLine(<span style="color: #006080">&quot;Memory Buffer Size {0} MB&quot;</span>, bufferSizeForMd5Hash/1000);<br />    Console.WriteLine(<span style="color: #006080">&quot;-----------------------------------&quot;</span>);<br />    <span style="color: #0000ff">string</span> hashString;<br />    <span style="color: #0000ff">using</span> (var md5Prov = <span style="color: #0000ff">new</span> SHA256Managed())<br />    {<br />        <span style="color: #0000ff">int</span> readCount;<br />        <span style="color: #0000ff">long</span> bytesTransfered = 0;<br />        var buffer = <span style="color: #0000ff">new</span> <span style="color: #0000ff">byte</span>[bufferSizeForMd5Hash];<br />        <span style="color: #0000ff">while</span> ((readCount = streamIn.Read(buffer, 0, buffer.Length)) != 0)<br />        {<br />            <span style="color: #008000">// Need to figure out if this is final block</span><br />            <span style="color: #0000ff">if</span> (bytesTransfered + readCount == streamIn.Length)<br />            {<br />                md5Prov.TransformFinalBlock(buffer, 0, readCount);<br />            }<br />            <span style="color: #0000ff">else</span><br />            {<br />                md5Prov.TransformBlock(buffer, 0, bufferSizeForMd5Hash, buffer, 0);<br />            }<br />            bytesTransfered += readCount;<br />            Console.WriteLine(<span style="color: #006080">&quot;GetSha512Buffered:{0}MB/{1}MB.   Memory Used: {2}MB&quot;</span>,<br />                                bytesTransfered/1000000,<br />                                streamIn.Length/1000000,<br />                                process.PrivateMemorySize64/1000000);<br />        }<br />        hashString = BitConverter.ToString(md5Prov.Hash).Replace(<span style="color: #006080">&quot;-&quot;</span>, String.Empty);<br />        md5Prov.Clear();<br />    }<br />    <span style="color: #0000ff">return</span> hashString;<br />}</pre>
<p></div>
