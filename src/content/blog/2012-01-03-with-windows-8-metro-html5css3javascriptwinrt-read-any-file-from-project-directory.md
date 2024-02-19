---
status: publish
published: true
pubDatetime: 2012-01-03T20:00:00.000Z
title: With Windows 8 Metro HTML5/CSS3/JavaScript/WinRT, Read Any File From Project
  Directory
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1761
wordpress_url: https://peterkellner.net/2012/01/03/with-windows-8-metro-html5css3javascriptwinrt-read-any-file-from-project-directory/
date: '2012-01-03 14:25:23 -0800'
date_gmt: '2012-01-03 21:25:23 -0800'
categories:
- JavaScript
- Windows 8
- Windows 8 Store
- Visual Studio 2011 Developer Preview
tags: []
---
<p>One of the standard things we programmers do is to read static files from our project directory.&#160; That is, say you put a <a href="http://json.org">json</a> file such as /data/stats_data.json at the root of your <a href="http://msdn.microsoft.com/en-us/vstudio/hh127353">Visual Studio 2011 PreRelease Developer Edition</a> project and you want to read it and convert it to a JavaScript object using <a href="http://msdn.microsoft.com/en-us/library/windows/apps/br211377.aspx">WinRT</a> (JSON.parse(..)).&#160; This post explains how to do that using the <a href="http://msdn.microsoft.com/en-us/windows/apps">Metro App Development Framework with JavaScript.</a></p>
<p>&#160;</p>
<div>
<div style="width: 450px; float: right">
<p>By way of background, this post was motivated by two threads I had with a great support helper on the MSDN forums named Jeff Sanders.&#160; The links are here:&#160; <a href="http://social.msdn.microsoft.com/Forums/en-US/winappswithhtml5/thread/4f27f674-8952-4e4e-bb17-dcdff74d0790">Thread 1</a>&#160; and <a href="http://social.msdn.microsoft.com/Forums/en-US/winappswithhtml5/thread/6c989bba-0455-41db-b414-7a30fd6904b5">Thread 2</a>.</p>
</p></div>
<div>
<p><img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image2.png" width="184" height="244" /></p>
</p></div>
</p></div>
<p>&#160;</p>
<p>First, let’s look at the basic empty project by creating a Blank Application as follows:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb.png" width="394" height="370" /></a></p>
<p>&#160;</p>
<p>Then, drop some JavaScript into a new data directory which is what we plan on reading into our <a href="http://javascript.org">JavaScript</a>.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image7.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image7_thumb.png" width="266" height="261" /></a></p>
<p>&#160;</p>
<p>Now, let’s add some code to the default.js file and one function called ReadAllDataFile that actually does the heavy lifting.&#160; Add to the default.html just one div tag in the body so we can prove we did something good, and run it.&#160; Below is the project that has all this in it. </p>
<table cellspacing="0" cellpadding="2" width="400" border="1">
<tbody>
<tr>
<td width="114">Link To Download Project: </td>
<td valign="top" width="348">&#160;
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:80f27518-7944-460f-bd09-3c2747ae89e2" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<p> <a href="/wp/wp-content/uploads/2012/01/MetroJSApp1.zip" target="_blank">Visual Studio 2011 Project With Source</a></p>
</div>
</td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>And the explanation for the code pasted to the bottom with line numbers now (though it’s pretty self explanatory).&#160; If you feel the urge to cut and paste the code, you will get annoyed with my line numbers. I’d suggest grabbing the zip file of the project from above and using that code for pasting purposes.</p>
<ul>
<ul>
<li><u>Line 57</u> simple is the code that executes when the app launches. All it does is call our function ReadAllDataFile with the local path to the file we want.</li>
<li><u>Lines 4 and 5</u> get the location of our project. Remember, out deployment is actually copied some place totally different and packaged for running.&#160; It is not running in our local directory so it’s important that whatever file you reference be a part of your solution.</li>
<li><u>Lines 7 and 8</u> basically create a “promise” which when the file is accessed, will return and execute the anonymous function we are passing it (starting with ..(function(stream) {…).</li>
<li><u>Line 15</u> completes after the promise to read the file.</li>
<li><u>Line 19</u> should actually be enough, but I found that some json files have wide characters in them causing it to crash.&#160; The workaround is to read the bytes and convert them while stripping out the higher order characters.&#160; Remember, this is a simple example, you may want those high order characters.</li>
<li><u>Lines 36 and 37</u> grab the population of the state of New York (my home state) from the JSON file.</li>
<li><u>Line 40</u> displays it on the web page as follows:</li>
</ul>
</ul>
<p><a href="/wp/wp-content/uploads/2012/01/image1.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb1.png" width="244" height="150" /></a></p>
<p>(Tablet Simulator Screen Shot With Result Above)</p>
<p>default.js:</p>
<div class="csharpcode">
<pre><span class="lnum">   1:  </span><span class="rem">// read the file you want</span></pre>
<pre><span class="lnum">   2:  </span><span class="kwrd">function</span> ReadAllDataFile(fileNameInLocalTree) {</pre>
<pre><span class="lnum">   3:  </span>    </pre>
<pre><span class="lnum">   4:  </span>    <span class="kwrd">var</span> package = Windows.ApplicationModel.Package.current;</pre>
<pre><span class="lnum">   5:  </span>    <span class="kwrd">var</span> installedLocation = package.installedLocation;</pre>
<pre><span class="lnum">   6:  </span>&#160;</pre>
<pre><span class="lnum">   7:  </span>    installedLocation.createFileAsync(fileNameInLocalTree, Windows.Storage.CreationCollisionOption.openIfExists).then(<span class="kwrd">function</span> (dataFile) {</pre>
<pre><span class="lnum">   8:  </span>        dataFile.openAsync(Windows.Storage.FileAccessMode.read).then(<span class="kwrd">function</span> (stream) {</pre>
<pre><span class="lnum">   9:  </span>            <span class="kwrd">var</span> size = stream.size;</pre>
<pre><span class="lnum">  10:  </span>            <span class="kwrd">if</span> (size == 0) {</pre>
<pre><span class="lnum">  11:  </span>                <span class="rem">// Data not found</span></pre>
<pre><span class="lnum">  12:  </span>            }</pre>
<pre><span class="lnum">  13:  </span>            <span class="kwrd">else</span> {</pre>
<pre><span class="lnum">  14:  </span>                <span class="kwrd">var</span> inputStream = stream.getInputStreamAt(0);</pre>
<pre><span class="lnum">  15:  </span>                <span class="kwrd">var</span> reader = <span class="kwrd">new</span> Windows.Storage.Streams.DataReader(inputStream);</pre>
<pre><span class="lnum">  16:  </span>&#160;</pre>
<pre><span class="lnum">  17:  </span>                reader.loadAsync(size).then(<span class="kwrd">function</span> () {</pre>
<pre><span class="lnum">  18:  </span>&#160;</pre>
<pre><span class="lnum">  19:  </span>                    <span class="rem">//var contents = reader.readString(size); // fails with multibyte error if bad data (see legislators.getList.json)</span></pre>
<pre><span class="lnum">  20:  </span>&#160;</pre>
<pre><span class="lnum">  21:  </span>                    <span class="rem">// allocate the full array so readBytes can insert it in full</span></pre>
<pre><span class="lnum">  22:  </span>                    <span class="kwrd">var</span> array = <span class="kwrd">new</span> Array(size);</pre>
<pre><span class="lnum">  23:  </span>                    reader.readBytes(array);</pre>
<pre><span class="lnum">  24:  </span>                    </pre>
<pre><span class="lnum">  25:  </span>                    <span class="kwrd">var</span> newString = <span class="str">&quot;&quot;</span>;</pre>
<pre><span class="lnum">  26:  </span>                    <span class="kwrd">for</span> (<span class="kwrd">var</span> i = 0; i &lt; array.length; i++) {</pre>
<pre><span class="lnum">  27:  </span>                        <span class="rem">// only printable characters (include spaces because could be part of names) (very rough here)</span></pre>
<pre><span class="lnum">  28:  </span>                        <span class="rem">// http://www.csgnetwork.com/asciiset.html</span></pre>
<pre><span class="lnum">  29:  </span>                        <span class="kwrd">if</span> (array[i] &gt;= 32 &amp;&amp; array[i] &lt;= 126) {</pre>
<pre><span class="lnum">  30:  </span>                            <span class="kwrd">var</span> c = String.fromCharCode(array[i]);</pre>
<pre><span class="lnum">  31:  </span>                            newString += c;</pre>
<pre><span class="lnum">  32:  </span>                        }</pre>
<pre><span class="lnum">  33:  </span>                    }</pre>
<pre><span class="lnum">  34:  </span>&#160;</pre>
<pre><span class="lnum">  35:  </span>                    </pre>
<pre><span class="lnum">  36:  </span>                    <span class="kwrd">var</span> result = JSON.parse(newString);</pre>
<pre><span class="lnum">  37:  </span>                    <span class="kwrd">var</span> newYorkPopulation = result.NY.P001001;</pre>
<pre><span class="lnum">  38:  </span>&#160;</pre>
<pre><span class="lnum">  39:  </span>                    <span class="rem">// output to the screen</span></pre>
<pre><span class="lnum">  40:  </span>                    document.getElementById(<span class="str">'outputhere'</span>).innerHTML = <span class="str">&quot;New York Population: &quot;</span> + newYorkPopulation;</pre>
<pre><span class="lnum">  41:  </span>                    </pre>
<pre><span class="lnum">  42:  </span>                });</pre>
<pre><span class="lnum">  43:  </span>            }</pre>
<pre><span class="lnum">  44:  </span>        })</pre>
<pre><span class="lnum">  45:  </span>    });</pre>
<pre><span class="lnum">  46:  </span>}</pre>
<pre><span class="lnum">  47:  </span>&#160;</pre>
<pre><span class="lnum">  48:  </span>(<span class="kwrd">function</span> () {</pre>
<pre><span class="lnum">  49:  </span>    <span class="str">'use strict'</span>;</pre>
<pre><span class="lnum">  50:  </span>    <span class="rem">// Uncomment the following line to enable first chance exceptions.</span></pre>
<pre><span class="lnum">  51:  </span>    Debug.enableFirstChanceException(<span class="kwrd">true</span>);</pre>
<pre><span class="lnum">  52:  </span>&#160;</pre>
<pre><span class="lnum">  53:  </span>    WinJS.Application.onmainwindowactivated = <span class="kwrd">function</span> (e) {</pre>
<pre><span class="lnum">  54:  </span>        <span class="kwrd">if</span> (e.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {</pre>
<pre><span class="lnum">  55:  </span>            </pre>
<pre><span class="lnum">  56:  </span>            <span class="rem">// start of my insert code            </span></pre>
<pre><span class="lnum">  57:  </span>            ReadAllDataFile(<span class="str">&quot;\data\\states_data.json&quot;</span>);</pre>
<pre><span class="lnum">  58:  </span>            <span class="rem">// end of my insert code</span></pre>
<pre><span class="lnum">  59:  </span>        }</pre>
<pre><span class="lnum">  60:  </span>    }</pre>
<pre><span class="lnum">  61:  </span>&#160;</pre>
<pre><span class="lnum">  62:  </span>    WinJS.Application.start();</pre>
<pre><span class="lnum">  63:  </span>})();</pre>
</div>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<p>&#160;</p>
<p>Hope this Helps!&#160; Remember, these are pre-beta bits so things could change when production comes a long.&#160; Feel free to add comments to this post and let me know if it stops working.&#160; </p>
