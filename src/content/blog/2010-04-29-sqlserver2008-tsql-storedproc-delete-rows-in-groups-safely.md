---
status: publish
published: true
pubDatetime: 2010-04-29T20:00:00.000Z
title: Writing A Transact SQL (TSQL) Procedure For SQL Server 2008 To Delete Rows
  From Table Safely
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1285
wordpress_url: https://peterkellner.net/2010/04/29/sqlserver2008-tsql-storedproc-delete-rows-in-groups-safely/
date: '2010-04-29 16:54:21 -0700'
date_gmt: '2010-04-29 23:54:21 -0700'
categories:
- SQL Server
- Sql Server 2008
- TSQL
- Transaction
- SQL
tags: []
---
<p>In this post, we will show and explain a small <a href="http://msdn.microsoft.com/en-us/library/ms189826(SQL.90).aspx">TSQL</a> <a href="http://www.microsoft.com/sqlserver/2008/en/us/">Sql Server 2008</a> procedure that deletes all rows in a table that are older than some specified date.&#160; That is, say the table has 10,000,000 rows in it the accumulated over the past 2 years.&#160; </p>
<p>Say you want to delete all but the last 30 days of activity.&#160; If you just simply say <a href="http://msdn.microsoft.com/en-us/library/ms189835.aspx">DELETE</a> FROM table WHERE id&gt;10000, you will cause this to happen in one transaction and likely, you will get an error.&#160; That’s the best case.&#160; The worst case is your system tries to do this, eventually consumes all the resources in your computer and crashes your server.</p>
<p> <!--more-->
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">CREATE</span> <span style="color: #0000ff">PROCEDURE</span> dbo.DeleteRowsInGroupsBeforeNdaysLog4NetAll<br />@NoOfRowsToDelete <span style="color: #0000ff">int</span>,<br />@DaysBeforeTodayToDelete <span style="color: #0000ff">int</span><br /><span style="color: #0000ff">AS</span><br /><span style="color: #0000ff">BEGIN</span><br /><br />  <span style="color: #0000ff">DECLARE</span> @DateToDeleteBefore <span style="color: #0000ff">date</span>    <span style="color: #008000">-- Number Of Days To Delete Records From</span><br />  <span style="color: #0000ff">DECLARE</span> @DateToday datetime         <span style="color: #008000">-- To Hold Todays Date</span><br />  <span style="color: #0000ff">DECLARE</span> @PrintMessage <span style="color: #0000ff">varchar</span>(256)  <span style="color: #008000">-- To Hold Print Message        </span><br />  <span style="color: #0000ff">DECLARE</span> @CurrentRowCount <span style="color: #0000ff">int</span>        <span style="color: #008000">-- Scratch Var For Counting Rows</span><br />  <br />  <span style="color: #0000ff">SET</span> @DateToday = GetDate()<br />  <br />  <span style="color: #0000ff">SELECT</span> @CurrentRowCount =<br />         (<br />           <span style="color: #0000ff">SELECT</span> <span style="color: #0000ff">COUNT</span>(*)<br />           <span style="color: #0000ff">FROM</span> dbo.Log4NetAll<br />           <span style="color: #0000ff">WHERE</span> <span style="color: #0000ff">Date</span> &lt;(@DateToday - @DaysBeforeTodayToDelete)<br />         ) <br />  <br />  <span style="color: #0000ff">WHILE</span> (@CurrentRowCount &gt; 0) <span style="color: #0000ff">BEGIN</span><br />      <span style="color: #0000ff">DELETE</span> <span style="color: #0000ff">TOP</span> (@NoOfRowsToDelete)<br />      <span style="color: #0000ff">FROM</span> dbo.Log4NetAll<br />        <span style="color: #0000ff">WHERE</span> Id <span style="color: #0000ff">IN</span> (<br />        <span style="color: #0000ff">SELECT</span> <span style="color: #0000ff">TOP</span> (@NoOfRowsToDelete) Id <br />        <span style="color: #0000ff">FROM</span> Log4NetAll<br />        <span style="color: #0000ff">WHERE</span> <span style="color: #0000ff">Date</span> &lt; (@DateToday - @DaysBeforeTodayToDelete)<br />        <span style="color: #0000ff">ORDER</span> <span style="color: #0000ff">BY</span> Id <span style="color: #0000ff">ASC</span>)<br />      <br />       <span style="color: #008000">-- Count the records again</span><br />       <span style="color: #0000ff">SELECT</span> @CurrentRowCount =<br />         (<br />           <span style="color: #0000ff">SELECT</span> <span style="color: #0000ff">COUNT</span>(*)<br />           <span style="color: #0000ff">FROM</span> dbo.Log4NetAll<br />           <span style="color: #0000ff">WHERE</span> <span style="color: #0000ff">Date</span> &lt;(@DateToday - @DaysBeforeTodayToDelete)<br />         ) <br />       <span style="color: #0000ff">SET</span> @PrintMessage = N<span style="color: #006080">'Deleting This Many Rows: '</span><br />                            + (<span style="color: #0000ff">CAST</span>(@CurrentRowCount <span style="color: #0000ff">AS</span> nvarchar(10)));<br />       <span style="color: #0000ff">PRINT</span> @PrintMessage;<br />  <span style="color: #0000ff">END</span>  <br />END</pre>
<p></div>
<div>* Inspired by a <a href="http://www.sqlservercurry.com/2008/04/how-to-delete-records-from-large-table.html">blog post by Suprotim Agarwal</a> </div>
<div>&#160;</div>
<div id="codeSnippetWrapper">Basically, what is happening in the above code is first, we are testing to see if there are any records that meet our criteria to delete.&#160; That is, records older than a certain date.&#160; Next, we have a WHILE loop that continue until there are no more records that meet the criteria.&#160; The <a href="http://msdn.microsoft.com/en-us/library/ms189835.aspx">DELETE SQL command</a> uses TOP, which is very handy because it will delete up to that many.&#160; That way, you don’t have to worry about deleting the last few records with any special case code.</div>
<div>&#160;</div>
<div>The only thing a little tricky that I did was to actually delete the records with <a href="http://msdn.microsoft.com/en-us/library/ms189575.aspx">Subquery</a> that forces a sort of the records before deleting.&#160; That is, by asking for Id IN (Records sorted ascending), I’m forcing my TOP command to delete the oldest records first.&#160; This may not be necessary if your method runs to completion, but if you interrupt it, it might be convenient for the oldest records to be deleted first.</div>
<div>
  </div>
<p>Then, do Execute the Procedure, you would call it as follows assuming you wanted to delete the code in batches.</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet"><span style="color: #0000ff">DECLARE</span> @NoOfRowsToDelete <span style="color: #0000ff">int</span>;<br /><span style="color: #0000ff">DECLARE</span> @DaysBeforeTodayToDelete <span style="color: #0000ff">int</span>;<br /><br /><span style="color: #0000ff">SET</span> @NoOfRowsToDelete = 100;<br /><span style="color: #0000ff">SET</span> @DaysBeforeTodayToDelete = 30;<br /><br /><span style="color: #0000ff">EXEC</span> [dbo].[DeleteRowsInGroupsBeforeNdaysLog4NetAll] <br />  @NoOfRowsToDelete, @DaysBeforeTodayToDelete ;</pre>
<p></div>
<p>The output of calling this might be:</p>
<p>Query execution was canceled by user request.<br />
  <br />Deleting This Many Rows: 19199 </p>
<p>Deleting This Many Rows: 19099 </p>
<p>Deleting This Many Rows: 18999 </p>
<p>Deleting This Many Rows: 18899 </p>
<p>Deleting This Many Rows: 18799 </p>
<p>Deleting This Many Rows: 18699 </p>
<p>Deleting This Many Rows: 18599… (All the way until 0)</p>
<p>&#160;</p>
<p>Hope this helps!</p>
