---
status: publish
published: true
pubDatetime: 2010-11-24T20:00:00.000Z
title: Efficiently Generating SHA256 Checksum For Files Using C#
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1414
wordpress_url: https://peterkellner.net/2010/11/24/efficiently-generating-sha256-checksum-for-files-using-csharp/
date: '2010-11-24 11:01:00 -0800'
date_gmt: '2010-11-24 18:01:00 -0800'
categories:
- C#
- ".NET 4.0"
- Cryptography
- SHA256
tags: []
---
<p><font style="background-color: #ffff00">* I just added another post on similar topic and added more details on performance and a case where buffered memory usage really did matter:&#160; </font><a title="https://peterkellner.net/2010/12/03/using-sha256managed-to-generate-sha256-hash/" href="/2010/12/03/using-sha256managed-to-generate-sha256-hash/"><font style="background-color: #ffff00">https://peterkellner.net/2010/12/03/using-sha256managed-to-generate-sha256-hash/</font></a></p>
<p>I’m building a <a href="http://connectionroad.com/">file synchronization</a> with the cloud application and I want to store a checksum with the file so that I can verify later that the file is what I think it is. I’m not a crypto guy so I searched around the internet for a solution.&#160;&#160; I found lots of examples and settled on this one that uses <a href="http://msdn.microsoft.com/en-us/library/system.security.cryptography.sha256.aspx">SHA256</a> for the job.&#160; I also found some comments saying that it would be more efficient to wrap it in a <a href="http://msdn.microsoft.com/en-us/library/system.io.bufferedstream.aspx">BufferedStream</a> rather than processing the entire file at once.</p>
<p>Example Links: <a title="http://efreedom.com/Question/1-1345851/MD5-File-Processing" href="http://efreedom.com/Question/1-1345851/MD5-File-Processing">http://efreedom.com/Question/1-1345851/MD5-File-Processing</a> ; <a title="http://stackoverflow.com/questions/1177607/what-is-the-fastest-way-to-create-a-checksum-for-large-files-in-c/1177744#1177744" href="http://stackoverflow.com/questions/1177607/what-is-the-fastest-way-to-create-a-checksum-for-large-files-in-c/1177744#1177744">http://stackoverflow.com/questions/1177607/what-is-the-fastest-way-to-create-a-checksum-for-large-files-in-c/1177744#1177744</a></p>
<p>My intention for this post was to show how much more efficient it would be to use BufferedStream, however my results don’t show that.&#160; I’m guessing that somehow, the efficiency is happening under the covers in a place I don’t see.</p>
<p>If anyone knows this space well, please feel free to comment and suggest a better method.&#160; I’m publishing my source below for the test and my surprisingly similar results whether I used buffering or not.</p>
<p>Looking forward to the responses.</p>
<p>  <!--more-->
<p>&#160;</p>
<table border="1" cellspacing="0" cellpadding="2" width="599">
<tbody>
<tr>
<td valign="top" width="158">File Size In Megabytes</td>
<td valign="top" width="152">Non-Buffered</td>
<td valign="top" width="168">Buffered</td>
<td valign="top" width="119">Max Memory</td>
</tr>
<tr>
<td valign="top" width="158">.8 MB</td>
<td valign="top" width="152">.088 Seconds</td>
<td valign="top" width="168">.082 Seconds</td>
<td valign="top" width="119">&#160;</td>
</tr>
<tr>
<td valign="top" width="158">851 MB (buffer not set)</td>
<td valign="top" width="152">30.3 Seconds</td>
<td valign="top" width="168">30.4 Seconds</td>
<td valign="top" width="119">1700MB</td>
</tr>
<tr>
<td valign="top" width="158">851 MB (buffer 1MB)</td>
<td valign="top" width="160">29.2 Seconds</td>
<td valign="top" width="189">29.6 Seconds</td>
<td valign="top" width="152">1450MB</td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">using</span> System;<br /><span style="color: #0000ff">using</span> System.Diagnostics;<br /><span style="color: #0000ff">using</span> System.IO;<br /><span style="color: #0000ff">using</span> System.Security.Cryptography;<br /><br /><span style="color: #0000ff">namespace</span> ConsoleApplicationMD5test<br />{<br />    <span style="color: #0000ff">internal</span> <span style="color: #0000ff">class</span> Program<br />    {<br />        <span style="color: #0000ff">private</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> Main(<span style="color: #0000ff">string</span>[] args)<br />        {<br />            <span style="color: #008000">//const string fileName = @&quot;g:\tempjunk\BlobSyncClient.zip&quot;;</span><br />            <span style="color: #0000ff">const</span> <span style="color: #0000ff">string</span> fileName = <br />            <span style="color: #006080">@&quot;g:\msdn\en_visual_studio_2008_service_pack_1_x86_dvd_x15-12962.iso&quot;</span>;<br /><br />            var stopwatch1 = <span style="color: #0000ff">new</span> Stopwatch();<br />            stopwatch1.Start();<br />            <span style="color: #0000ff">string</span> str1 = <span style="color: #006080">&quot;&quot;</span>; <span style="color: #008000">// GetChecksum(fileName);</span><br />            stopwatch1.Stop();<br /><br />            var stopwatch2 = <span style="color: #0000ff">new</span> Stopwatch();<br />            stopwatch2.Start();<br />            var fileStream = <span style="color: #0000ff">new</span> FileStream(fileName, FileMode.OpenOrCreate,<br />                FileAccess.Read);<br />            <span style="color: #0000ff">string</span> str2 = GetChecksumBuffered(fileStream);<br />            stopwatch2.Stop();<br /><br />            Console.WriteLine(str1 + <span style="color: #006080">&quot; &quot;</span> + stopwatch1.ElapsedMilliseconds);<br />            Console.WriteLine(str2 + <span style="color: #006080">&quot; &quot;</span> + stopwatch2.ElapsedMilliseconds);<br /><br />            Console.ReadLine();<br />        }<br /><br />        <span style="color: #0000ff">private</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">string</span> GetChecksum(<span style="color: #0000ff">string</span> file)<br />        {<br />            <span style="color: #0000ff">using</span> (FileStream stream = File.OpenRead(file))<br />            {<br />                var sha = <span style="color: #0000ff">new</span> SHA256Managed();<br />                <span style="color: #0000ff">byte</span>[] checksum = sha.ComputeHash(stream);<br />                <span style="color: #0000ff">return</span> BitConverter.ToString(checksum).Replace(<span style="color: #006080">&quot;-&quot;</span>, String.Empty);<br />            }<br />        }<br /><br />        <span style="color: #0000ff">private</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">string</span> GetChecksumBuffered(Stream stream)<br />        {<br />            <span style="color: #0000ff">using</span> (var bufferedStream = <span style="color: #0000ff">new</span> BufferedStream(stream, 1024 * 32))<br />            {<br />                var sha = <span style="color: #0000ff">new</span> SHA256Managed();<br />                <span style="color: #0000ff">byte</span>[] checksum = sha.ComputeHash(bufferedStream);<br />                <span style="color: #0000ff">return</span> BitConverter.ToString(checksum).Replace(<span style="color: #006080">&quot;-&quot;</span>, String.Empty);<br />            }<br />        }<br />    }<br />}</pre>
<p></div>
