---
status: publish
published: true
pubDatetime: 2010-06-18T20:00:00.000Z
title: 'A VS2010 Project Made From Post: How to: Host a WCF Service in a Managed Windows
  Service'
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1332
wordpress_url: https://peterkellner.net/2010/06/18/wcf-service-in-managed-windows-service-vs2010-2/
date: '2010-06-18 07:37:33 -0700'
date_gmt: '2010-06-18 14:37:33 -0700'
categories:
- Visual Studio
- WCF
- Visual Studio 2010
- VS2010
- ASP.NET 4.0
- Windows Service
tags: []
---
<p><a href="http://msdn.microsoft.com/en-us/library/ms733069.aspx" target="_blank">MSDN has a very nice article</a> on how to create a windows service that hosts a <a href="http://msdn.microsoft.com/en-us/netframework/aa663324.aspx" target="_blank">Windows Communication Foundation (WCF)</a> service.&#160; It explains all the details of doing this in a step by step fashion.&#160; One thing that I often find missing from these articles is the actual Visual Studio project that I can download and play with.&#160; What I usually do is put that together myself (which I’m sure is the author’s intent).</p>
<p>To save anyone some time who wants to do the same thing, I’ve created a VS2010 project from the example, added a very simple Windows C# console application that consumes the service, as well as made some small changes in a very nice Windows Presentation Foundation (WPF) <a href="http://code.google.com/p/wpf-mvvm-calculator/" target="_blank">calculator project</a> so that the calculator does it operations inside the windows service rather than in the calculator itself.</p>
<p>In this article, I’ve attached the source code (with my small changes and additions) for you to work with and change as you like.</p>
<p> <!--more-->
<p>First, here is the project: </p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:d3a970ab-d487-417a-bf52-fd64c206e6d2" class="wlWriterEditableSmartContent">
<p>Visual Studio 2010 Project <a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/WCFServiceInManagedWindowsService_3.zip" target="_blank">Project Zip Here</a></p>
</div>
<p>Now, let’s talk about the details</p>
<p>&#160;</p>
<h2>The Visual Studio 2010 Solution Itself</h2>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_9.png" width="490" height="381" /></a> </p>
<p>There are three projects in this solution.&#160; The service itself which is called WCFServiceInmanagedWindowsService, Console Application and Calculator.</p>
<p>&#160;</p>
<h3>WCFServiceInManagedWindowsService Project</h3>
<p>&#160;</p>
<p>This project is really what is taken from the <a href="http://msdn.microsoft.com/en-us/library/ms733069.aspx" target="_blank">MSDN article</a>. It’s got almost no change and is primarily created by following the directions in the article.&#160; There are a couple batch files added for creating and deleting the service itself in the root of that project directory, but that’s about it.&#160; All the code is in a file called service.cs.</p>
<p>To Add the service, go to the “Service Reference”/”Add Service” Dialog and enter the address of the service (you can find it in the app.config file).</p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_10.png" width="408" height="337" /></a> </p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_11.png" width="395" height="85" /></a> </p>
<p>http://localhost:8000/ServiceModelSamples/service</p>
<p>Notice that the methods exposed are Add/Divide/Multiple and Subtract.</p>
<p>To start the actual service, after rebuilding the project, execute the bat file InstallService.bat in the root directory.&#160; Make sure you build the release version because this script installs the service from the release directory. Once started, you will see it in the services application as follows:</p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_12.png" width="354" height="178" /></a> </p>
<p>Then, start the service by running the command: “net start WCFWindowsServiceSample”&#160; If you get the error: <em>“No connection could be made because the target machine actively refused it 127.0.0.1:8000”,</em> this likely means you did not start your service.</p>
<p>&#160;</p>
<h3>The Console Application</h3>
<p>The Console application is new and very simple. All you have to do is create a new windows c# console project, use the “Add Service” DialWCFWindowsServiceSampleog and point it at&#160; ( http://localhost:8000/ServiceModelSamples/service ) as follows:</p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_15.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_13.png" width="288" height="317" /></a> </p>
<p>Now, you can simply write a console app with the following code and you will be calling the service correctly.&#160; Here is the code:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">class</span> Program<br />    {<br />        <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> Main(<span style="color: #0000ff">string</span>[] args)<br />        {<br />            var calculatorClient = <span style="color: #0000ff">new</span> CalculatorClient();<br /><br />            var answer = calculatorClient.Add(5, 4);<br />            Console.WriteLine(<span style="color: #006080">&quot;Answer to Adding 5 + 4: {0}&quot;</span>, answer);<br />            Console.ReadKey();<br /><br /><br />            <br />        }<br />    }</pre>
<p></div>
<p>And, when we run it, now surprise, we get 9!</p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_16.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_14.png" width="244" height="120" /></a> </p>
<p>…</p>
<h3>The Calculator Application</h3>
<p>Just to show a real life use of the service, I grabbed the codeplex project <a title="http://code.google.com/p/wpf-mvvm-calculator/" href="http://code.google.com/p/wpf-mvvm-calculator/">http://code.google.com/p/wpf-mvvm-calculator/</a>.</p>
<p><a href="http://code.google.com/p/wpf-mvvm-calculator/"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_17.png" width="372" height="157" /></a> </p>
<p>Then, modifying a small section of code inside (after adding the service reference of course, just like we did in the above console project, we now have a calculator that adds by calling a service for the answer.&#160; Here is the modified code:</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">try</span><br />           {<br />               <span style="color: #008000">// Establish the connection to the Service</span><br />               var calculatorClient = <span style="color: #0000ff">new</span> CalculatorClient();<br />               var firstOperand = Convert.ToDouble(FirstOperand);<br />               var secondOperand = Convert.ToDouble(SecondOperand);<br /><br /><br /><br />               var stopwatch = <span style="color: #0000ff">new</span> Stopwatch();<br />               stopwatch.Start();<br /><br />               <span style="color: #0000ff">switch</span> (Operation)<br />               {<br />                   <span style="color: #0000ff">case</span> (<span style="color: #006080">&quot;+&quot;</span>):<br />                       result = calculatorClient.Add(firstOperand, secondOperand).ToString();<br />                       <span style="color: #0000ff">break</span>;<br /><br />                   <span style="color: #0000ff">case</span> (<span style="color: #006080">&quot;-&quot;</span>):<br />                       result = calculatorClient.Subtract(firstOperand, secondOperand).ToString();<br />                       <span style="color: #0000ff">break</span>;<br /><br />                   <span style="color: #0000ff">case</span> (<span style="color: #006080">&quot;*&quot;</span>):<br />                       result = calculatorClient.Multiply(firstOperand, secondOperand).ToString();<br />                       <span style="color: #0000ff">break</span>;<br /><br />                   <span style="color: #0000ff">case</span> (<span style="color: #006080">&quot;/&quot;</span>):<br />                       result = calculatorClient.Divide(firstOperand, secondOperand).ToString();<br />                       <span style="color: #0000ff">break</span>;<br />               }<br /><br />               stopwatch.Stop();</pre>
<p></div>
<p>And, when we run the calculator, it looks like this:</p>
<p><a href="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_18.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/AVS2010ProjectMadeFromPostHowtoHostaWCFS_C58D/image_thumb_15.png" width="333" height="232" /></a>&#160;</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>In this post, we simply implemented the source as a <a href="http://www.microsoft.com/visualstudio/en-us">Visual Studio 2010</a> project from the MSDN article on how to build a windows service using WCF.&#160; It’s been pointed out that we are better off using named pipes for this kind of application for better performance, but our purpose here was just to elaborate on the existing application.</p>
<p>Hope this helps.</p>
