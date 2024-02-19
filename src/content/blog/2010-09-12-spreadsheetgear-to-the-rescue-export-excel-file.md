---
status: publish
published: true
pubDatetime: 2010-09-12T20:00:00.000Z
title: SpreadSheetGear Made My Life Easy Today For Creating Excel File In ASP.NET
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1363
wordpress_url: https://peterkellner.net/2010/09/12/spreadsheetgear-to-the-rescue-export-excel-file/
date: '2010-09-12 09:53:27 -0700'
date_gmt: '2010-09-12 16:53:27 -0700'
categories:
- SpreadSheetGear
- Excel
- Microsoft Office
tags: []
---
<p>&#160;</p>
<h2>A Little Background</h2>
<p>As we announced a couple days, <a href="http://siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> is going to have <a href="http://siliconvalley-codecamp.com/BadgeQRCodes.aspx">QR Codes on badges</a> this year.&#160; We are currently guessing we will have about 3000 people registered and 1500 attending which means that we need to have the entire badge printing process figured out long before the event (which is October 9th and 10th this year, just 4 weeks away).&#160; <a href="http://www.javaclimber.com/">Kevin Nilson</a> is leading the charge on this (another key organizer at code camp) and asked me for a spread sheet with some names in it so he could practice making the actual <a href="http://en.wikipedia.org/wiki/QR_Code">QR bar code</a>.</p>
<p>Kevin is a <a href="http://www.java.com/en/">Java</a> guy, and I’m a <a href="http://www.microsoft.com/net/">.Net</a> guy so we need a common format.&#160; The most simple thing seemed to be a <a href="http://en.wikipedia.org/wiki/Comma-separated_values">csv</a>.&#160; The plan for me is to build a simple <a href="http://en.wikipedia.org/wiki/ASP.NET">aspx</a> page in asp.net that created an <a href="http://office.microsoft.com/en-us/excel/">Excel</a> file, then I can simply say “Save As” and create the <a href="http://en.wikipedia.org/wiki/Comma-separated_values">csv</a> file.</p>
<p> <!--more-->
<p>&#160;</p>
<h2>SpreadSheetGeat to the Rescue</h2>
<p>I looked around for a really simple public domain program that would let me export an excel or csv file from an aspx page.&#160; Nothing jumped out as trivial to use.&#160; csv’s can be tricky to create because of punctuation rules, and there did not seem to be an easy .net solution to implement (by easy, I was thinking 10 minutes tops).&#160; </p>
<p>Then, in my searching the web, I found this post:&#160; <a title="http://stackoverflow.com/questions/151005/create-excel-xls-and-xlsx-file-from-c" href="http://stackoverflow.com/questions/151005/create-excel-xls-and-xlsx-file-from-c">http://stackoverflow.com/questions/151005/create-excel-xls-and-xlsx-file-from-c</a>.&#160; The part that got my attention was the post made by Joe Erickson saying:</p>
<blockquote><p><a href="http://www.spreadsheetgear.com/">SpreadsheetGear for .NET</a> will do it.<a href="http://stackoverflow.com/questions/151005/create-excel-xls-and-xlsx-file-from-c">StackOverflow Post By Joe Erickson</a></p>
<p>You can see live ASP.NET (C# and VB) samples <a href="http://www.spreadsheetgear.com/support/samples/">here</a> and download an evaluation version <a href="https://www.spreadsheetgear.com/downloads/register.aspx">here</a>.</p>
<p>Disclaimer: I own SpreadsheetGear LLC</p>
</blockquote>
<p>Then it occured to me I owned a copy of SpreadSheetGear from a much more complex project I worked on a while back.&#160; SpreadSheetGear is amazing in how it creates complex excel spread sheets with an amazingly little amount of code.&#160; That combined with it works every time is really nice.&#160; So, I grabbed the dll, put it in the bin directory of my Silicon Valley Code Camp web project, went into there sample code, copied a few lines (see below), and I was done!&#160; Totally amazing.&#160; Thanks SpreadSheetGear!</p>
<p>BTW, here is the code I needed to write to have SpreadSheetGear output my simple excel spreadsheet (all this code is simply in a button clicked event on an aspx page.&#160; Rec rec is simply defined as List&lt;Attendees&gt;. )</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #008000">// Create a new workbook.</span><br />SpreadsheetGear.IWorkbook workbook = SpreadsheetGear.Factory.GetWorkbook();<br />SpreadsheetGear.IWorksheet worksheet = workbook.Worksheets[<span style="color: #006080">&quot;Sheet1&quot;</span>];<br />SpreadsheetGear.IRange cells = worksheet.Cells;<br /><span style="color: #008000">// Set the worksheet name.</span><br />worksheet.Name = <span style="color: #006080">&quot;SiliconValleyCodeCamp5&quot;</span>;<br /><br />cells[0, 0].Value = <span style="color: #006080">&quot;Id&quot;</span>;<br />cells[0, 1].Value = <span style="color: #006080">&quot;FirstName&quot;</span>;<br />cells[0, 2].Value = <span style="color: #006080">&quot;LastName&quot;</span>;<br />cells[0, 3].Value = <span style="color: #006080">&quot;Website&quot;</span>;<br />cells[0, 4].Value = <span style="color: #006080">&quot;AddressLine1&quot;</span>;<br />cells[0, 5].Value = <span style="color: #006080">&quot;City&quot;</span>;<br />cells[0, 6].Value = <span style="color: #006080">&quot;State&quot;</span>;<br />cells[0, 7].Value = <span style="color: #006080">&quot;Zipcode&quot;</span>;<br />cells[0, 8].Value = <span style="color: #006080">&quot;Email&quot;</span>;<br />cells[0, 9].Value = <span style="color: #006080">&quot;PhoneNumber&quot;</span>;<br /><br /><br /><br /><span style="color: #0000ff">int</span> row = 1;<br /><span style="color: #0000ff">foreach</span> (var rec <span style="color: #0000ff">in</span> attendeesResults)<br />{<br />    cells[row, 0].Value = rec.Id;<br />    cells[row, 1].Value = rec.UserFirstName;<br />    cells[row, 2].Value = rec.UserLastName;<br />    cells[row, 3].Value = rec.UserWebsite;<br />    cells[row, 4].Value = rec.AddressLine1;<br />    cells[row, 5].Value = rec.City;<br />    cells[row, 6].Value = rec.State;<br />    cells[row, 7].Value = rec.UserZipCode;<br />    cells[row, 8].Value = rec.Email;<br />    cells[row, 9].Value = rec.PhoneNumber;<br />    row++;<br />}<br /><br />           <br />Response.Clear();<br />Response.ContentType = <span style="color: #006080">&quot;application/vnd.ms-excel&quot;</span>;<br />Response.AddHeader(<span style="color: #006080">&quot;Content-Disposition&quot;</span>, <span style="color: #006080">&quot;attachment; filename=svcc.xls&quot;</span>);<br />workbook.SaveToStream(Response.OutputStream, SpreadsheetGear.FileFormat.Excel8);<br />Response.End();</pre>
<p></div>
<h2>Conclusions</h2>
<p>I really like <a href="http://www.spreadsheetgear.com/company/contact.aspx">SpreadSheetGear</a>!&#160; It took longer for me to write this post than it did to get my code working.</p>
