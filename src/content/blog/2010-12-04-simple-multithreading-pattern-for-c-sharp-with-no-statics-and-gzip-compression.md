---
status: publish
published: true
pubDatetime: 2010-12-04T20:00:00.000Z
title: A Simple MultiThreading Pattern For C# With No Statics.  Shows Compressing
  A File With GZip
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1418
wordpress_url: https://peterkellner.net/2010/12/04/simple-multithreading-pattern-for-c-sharp-with-no-statics-and-gzip-compression/
date: '2010-12-04 08:09:03 -0800'
date_gmt: '2010-12-04 15:09:03 -0800'
categories:
- C#
- Visual Studio 2010
- VS2010
- ".NET 4.0"
- threading
- gzip
tags: []
---
<h2>Background</h2>
<p>This post shows a very simple technique for processing a <a href="http://msdn.microsoft.com/en-us/library/system.io.compression.gzipstream.aspx">gzip</a> compression on a background <a href="http://msdn.microsoft.com/en-us/library/aa645740(VS.71).aspx">thread</a> using <a href="http://msdn.microsoft.com/en-us/vcsharp/default.aspx">c#</a> with <a href="http://msdn.microsoft.com/en-us/vstudio/default.aspx">Visual Studio 2010</a>.&#160; What is unique here is we are using no statics to do it.&#160; I’m not totally against using statics, but in general, it is best to avoid them.&#160; I’ve heard the notorious <a href="http://www.neverindoubtnet.blogspot.com/">Ward Bell</a> say <a href="http://msdn.microsoft.com/en-us/library/98f28cdx.aspx">statics</a> are evil and have had many cases where they have bitten me.&#160; Since I heard Ward say this, I’ve been trying to avoid them where I can.</p>
<p>&#160;</p>
<h2>The Simple Problem</h2>
<p>The problem is to simply compress a file to bytes and return to us the compressed, uncompressed and byte array of the result.&#160; We can pass parameters into a thread, however we can not return them (when I say thread, I mean the anonymous method that processes our data).</p>
<p>  <!--more--><br />
<h2>Some Code</h2>
<p>So, to that end, Let’s create a main method as below.&#160; Notice that it creates a very simple anonymous method which executes the code cryptoCopress.CompressFile(…), then simply starts that thread.&#160; Once the thread starts, it simply waits for the thread to end by looping every 50 milliseconds on the thread.IsAlive method.&#160; Finally, when it returns, it simply looks at the cryptCompress object for the results.&#160; No Statics!</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:8eb9d37f-1541-4f29-b6f4-1eea890d4876:dd5555c2-7bcc-4715-9cc2-b94a7ef4604b" class="wlWriterEditableSmartContent">
<div>Code:<a href="/FilesForWebDownload/A-Simple-MultiThreading-Pattern-For-C_6021/MultiThreadingInCSharpSimple.zip" target="_self">MultiThreadingInCSharpSimple.zip</a></div></p>
</div>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">private</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> Main(<span style="color: #0000ff">string</span>[] args)<br />{<br />    var cryptCompress =<br />        <span style="color: #0000ff">new</span> CryptCompress();<br />    var thread =<br />        <span style="color: #0000ff">new</span> Thread(<br />            () =&gt;<br />            cryptCompress.CompressFile<br />                (<span style="color: #006080">@&quot;G:\NoBackup\ext-3.2.1\ext-all-debug-w-comments.js&quot;</span>));<br />    thread.Start();<br /><br />    <span style="color: #0000ff">int</span> cnt = 0;<br />    <span style="color: #0000ff">while</span> (thread.IsAlive)<br />    {<br />        cnt++;<br />        Console.WriteLine(<span style="color: #006080">&quot;Waiting... &quot;</span> + cnt);<br />        Thread.Sleep(50);<br />    }<br />    Console.WriteLine(<span style="color: #006080">&quot;Before Compression KBytes: {0}&quot;</span>,<br />                        cryptCompress.BeforeCompressionBytes/1000);<br />    Console.WriteLine(<span style="color: #006080">&quot;After Compression KBytes: {0}&quot;</span>,<br />                        cryptCompress.AfterCompressionBytes/1000);<br />}</pre>
<p></div>
<p>Now, Lets look at the CryptCompress class.&#160; Notice that it’s basically got one public method (CompressFile) and 3 public properties that will be used to hold the return values.&#160; This way, the main method that started the thread can get the results.&#160; Again, notice that there is no word static any place in this project.</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> CryptCompress<br />{<br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">byte</span>[] CompressedBytes { get; set; }<br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">long</span> BeforeCompressionBytes { get; set; }<br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">long</span> AfterCompressionBytes { get; set; }<br /><br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">void</span> CompressFile(<span style="color: #0000ff">string</span> fileName)<br />{<br />    <span style="color: #0000ff">using</span> (var fileStream = <br />        <span style="color: #0000ff">new</span> FileStream(fileName, FileMode.Open, FileAccess.Read))<br />    {<br />        var uncompressedBytes = <span style="color: #0000ff">new</span> <span style="color: #0000ff">byte</span>[fileStream.Length];<br />        fileStream.Read(uncompressedBytes, 0, <br />            (<span style="color: #0000ff">int</span>) fileStream.Length);<br />        CompressedBytes = CompressGzip(uncompressedBytes);<br />        BeforeCompressionBytes = fileStream.Length;<br />        AfterCompressionBytes = CompressedBytes.Length;<br />        fileStream.Close();<br />    }<br />}<br /><br /><span style="color: #008000">/// &lt;summary&gt;</span><br /><span style="color: #008000">/// Take a simple stream of uncompressed bytes and compress them</span><br /><span style="color: #008000">/// &lt;/summary&gt;</span><br /><span style="color: #008000">/// &lt;param name=&quot;uncompressedBytes&quot;&gt;&lt;/param&gt;</span><br /><span style="color: #008000">/// &lt;returns&gt;&lt;/returns&gt;</span><br /><span style="color: #0000ff">public</span> <span style="color: #0000ff">byte</span>[] CompressGzip(<span style="color: #0000ff">byte</span>[] uncompressedBytes)<br />{<br />    <span style="color: #0000ff">using</span> (var memory = <span style="color: #0000ff">new</span> MemoryStream())<br />    {<br />        <span style="color: #0000ff">using</span> <br />            (var gZipStream = <br />                <span style="color: #0000ff">new</span> GZipStream(memory, CompressionMode.Compress, <span style="color: #0000ff">true</span>))<br />        {<br />            gZipStream.Write<br />                (uncompressedBytes, 0, uncompressedBytes.Length);<br />        }<br />        <span style="color: #0000ff">return</span> memory.ToArray();<br />    }<br />}<br />}</pre>
</div>
<p>&#160;</p>
<h2>The Results</h2>
<p>When we run this, notice that it takes 3 iterations (or 150 milliseconds) to complete. I’m only compressing a small file so no surprise.&#160; The file is actually 2.7 Megabytes and compress to .7 Megabytes.</p>
<p><a href="/FilesForWebDownload/A-Simple-MultiThreading-Pattern-For-C_6021/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/A-Simple-MultiThreading-Pattern-For-C_6021/image_thumb.png" width="244" height="116" /></a></p>
<p>&#160;</p>
<p>That’s it for now! Hope this helps.</p>
