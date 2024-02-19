---
status: publish
published: true
pubDatetime: 2008-12-07T20:00:00.000Z
title: How to Retrieve a GridView Based on a CheckBoxList of Items with Asp.Net using
  ObjectDataSource with a little LINQ Thrown In
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 210
wordpress_url: https://peterkellner.net/?p=210
date: '2008-12-07 01:08:02 -0800'
date_gmt: '2008-12-07 06:08:02 -0800'
categories:
- ASP.NET 2.0
- ASP.NET 3.5
- C#
- GridView
- ObjectDataSource
tags: []
---
<p>So, the problem is you have a list that you want to retrieve from that contains multiple values.&#160; Say for example, you have a list of 5 cities and you want to retrieve a list of people in some combination of those cities.&#160; If you use the class SelectValue method with <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.gridview.aspx">GridView</a> you run out of steam because it's only one value.&#160; What you'd really like to do is pass the <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.checkboxlist.aspx">CheckBoxList</a> into the GridView as a selection parameter, but unfortunately, when you do that, you just get the one selected value from the CheckBoxList, not all the values.</p>
<p>I'm sure you can make a custom <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.controlparameter.aspx">ControlParameter</a> in <a href="http://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.objectdatasource.aspx">ObjectDataSource</a> to solve this, but I really don't have time for that.&#160; I just wanted something quick (which I now have and thought I'd share).</p>
<p> <!--more-->
<p>Basically, what I did was create an invisible label on my GridView that will get the string of values I want to retrieve, then, my ObjectDataSource gets one value (the string) and parses it into small values.&#160; My plan is to do a quick run through of the code here, but then also post the project so you can see for yourself how it works.</p>
<p>Here we go.</p>
<p>First, let's make a simple BusinessObject class that returns to us some data.&#160; The basic object that will be returned is the Person defined as follows:</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">public</span> <span class="kwrd">class</span> Person</pre>
<pre>    {</pre>
<pre class="alt">        <span class="kwrd">public</span> Person()</pre>
<pre>        {</pre>
<pre class="alt">        }</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="kwrd">public</span> Person(<span class="kwrd">string</span> _name, <span class="kwrd">int</span> _id)</pre>
<pre>        {</pre>
<pre class="alt">            <span class="kwrd">this</span>._name = _name;</pre>
<pre>            <span class="kwrd">this</span>._id = _id;</pre>
<pre class="alt">        }</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="kwrd">private</span> <span class="kwrd">string</span> _name;</pre>
<pre>        <span class="kwrd">private</span> <span class="kwrd">int</span> _id;</pre>
<pre class="alt">&#160;</pre>
<pre>        <span class="kwrd">public</span> <span class="kwrd">string</span> name</pre>
<pre class="alt">        {</pre>
<pre>            get { <span class="kwrd">return</span> _name; }</pre>
<pre class="alt">            set { _name = <span class="kwrd">value</span>; }</pre>
<pre>        }</pre>
<pre class="alt">&#160;</pre>
<pre>        <span class="kwrd">public</span> <span class="kwrd">int</span> id</pre>
<pre class="alt">        {</pre>
<pre>            get { <span class="kwrd">return</span> _id; }</pre>
<pre class="alt">            set { _id = <span class="kwrd">value</span>; }</pre>
<pre>        }</pre>
<pre class="alt">    }</pre>
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
<p><!-- .csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } --></p>
<p>Next, we need two methods, the first is the method that does the heavy lifting (that is, takes a list of integers and returns the final list of people who have those cities in them, then, we need the method that polymorphically calls (did I spell that wrong, live writer thinks so... sorry) that method whose input is a single string.&#160; That method parses the string (which was assembled in page_load of the calling page) and calls the first one.</p>
<p>So, here is the method ObjectDataSource actually calls to get it's view of the data (remember, ObjectDataSource only returns one view).</p>
<div class="csharpcode">
<pre class="alt"> <span class="kwrd">public</span> List&lt;Person&gt; GetPeopleByCityList(List&lt;<span class="kwrd">int</span>&gt; cityList)</pre>
<pre>        {</pre>
<pre class="alt">            List&lt;Person&gt; personList = <span class="kwrd">new</span> List&lt;Person&gt;</pre>
<pre>                                          {</pre>
<pre class="alt">                                              <span class="kwrd">new</span> Person(<span class="str">&quot;Peter_SanJose&quot;</span>, 1),</pre>
<pre>                                              <span class="kwrd">new</span> Person(<span class="str">&quot;Tom_Hartsdale&quot;</span>, 2),</pre>
<pre class="alt">                                              <span class="kwrd">new</span> Person(<span class="str">&quot;Eric_Chicago&quot;</span>, 3),</pre>
<pre>                                              <span class="kwrd">new</span> Person(<span class="str">&quot;Ron_SanJose&quot;</span>, 1),</pre>
<pre class="alt">                                              <span class="kwrd">new</span> Person(<span class="str">&quot;John_Chicago&quot;</span>, 3),</pre>
<pre>                                              <span class="kwrd">new</span> Person(<span class="str">&quot;Charly_Scarsdale&quot;</span>, 4)</pre>
<pre class="alt">                                          };</pre>
<pre>&#160;</pre>
<pre class="alt">            var personResult = from p <span class="kwrd">in</span> personList</pre>
<pre>                               <span class="kwrd">where</span> cityList.Contains(p.id)</pre>
<pre class="alt">                               orderby p.name</pre>
<pre>                               select p;</pre>
<pre class="alt">&#160;</pre>
<pre>            <span class="kwrd">return</span> personResult.ToList();</pre>
<pre class="alt">        }</pre>
<pre>&#160;</pre>
<pre class="alt">        <span class="kwrd">public</span> List&lt;Person&gt; GetPeopleByCityListString(<span class="kwrd">string</span> cityListString)</pre>
<pre>        {</pre>
<pre class="alt">            <span class="kwrd">if</span> (!String.IsNullOrEmpty(cityListString))</pre>
<pre>            {</pre>
<pre class="alt">                var values = cityListString.Split(<span class="str">';'</span>);</pre>
<pre>                var cityList = <span class="kwrd">new</span> List&lt;<span class="kwrd">int</span>&gt;();</pre>
<pre class="alt">                <span class="kwrd">foreach</span> (<span class="kwrd">string</span> s <span class="kwrd">in</span> values)</pre>
<pre>                {</pre>
<pre class="alt">                    cityList.Add(Convert.ToInt32(s));</pre>
<pre>                }</pre>
<pre class="alt">&#160;</pre>
<pre>                <span class="kwrd">return</span> GetPeopleByCityList(cityList);</pre>
<pre class="alt">            }</pre>
<pre>            <span class="kwrd">return</span> <span class="kwrd">null</span>;</pre>
<pre class="alt">        }</pre>
<pre>&#160;</pre>
<pre class="alt">    }</pre>
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
<p>Now, the method that actually does the work.&#160; Notice I'm using the C# 3.0 object initializer syntax to build it, but normally, you'd be calling a database or something like that here.&#160; Also notice the clever <a href="http://msdn.microsoft.com/en-us/library/bb308959.aspx">LINQ</a> that does the equivalent of an SQL IN clause.&#160; That is, we'd normally be doing something like &quot;Select .. From Person Where CityId IN (1,3..)).&#160; It seems a little backwards to me, but it does the job.</p>
<p>So, now we have the business object, let's put it to work.&#160; Let's build a simple aspx page that has a CheckBoxList, GridView,Label and a Button.&#160; I'll pre-populate the CheckBoxList just to keep my example simple.&#160; Normally, you'd be getting that data from another data source like a database.</p>
<p>So, Here is the aspx file we built.</p>
<div class="csharpcode">
<pre class="alt">&lt;%@ Page Language=<span class="str">&quot;C#&quot;</span> AutoEventWireup=<span class="str">&quot;true&quot;</span> CodeFile=<span class="str">&quot;Default.aspx.cs&quot;</span> Inherits=<span class="str">&quot;_Default&quot;</span> %&gt;</pre>
<pre>&lt;html xmlns=<span class="str">&quot;http://www.w3.org/1999/xhtml&quot;</span>&gt;</pre>
<pre class="alt">&lt;head runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre>    &lt;title&gt;&lt;/title&gt;</pre>
<pre class="alt">&lt;/head&gt;</pre>
<pre>&lt;body bgcolor=<span class="str">&quot;#00ccff&quot;</span>&gt;</pre>
<pre class="alt">    &lt;form id=<span class="str">&quot;form1&quot;</span> runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre>    &lt;div&gt;</pre>
<pre class="alt">        &lt;asp:Button ID=<span class="str">&quot;ButtonSearch&quot;</span> runat=<span class="str">&quot;server&quot;</span> Text=<span class="str">&quot;Retrieve&quot;</span> </pre>
<pre>            onclick=<span class="str">&quot;ButtonSearch_Click&quot;</span> /&gt;</pre>
<pre class="alt">        &lt;asp:Label ID=<span class="str">&quot;Label1&quot;</span> runat=<span class="str">&quot;server&quot;</span> Visible=<span class="str">&quot;false&quot;</span> Text=<span class="str">&quot;Label&quot;</span>&gt;&lt;/asp:Label&gt;</pre>
<pre>        &lt;asp:CheckBoxList ID=<span class="str">&quot;CheckBoxList1&quot;</span> runat=<span class="str">&quot;server&quot;</span>&gt;</pre>
<pre class="alt">            &lt;asp:ListItem Value=<span class="str">&quot;2&quot;</span>&gt;Hartsdale&lt;/asp:ListItem&gt;</pre>
<pre>            &lt;asp:ListItem Value=<span class="str">&quot;4&quot;</span>&gt;Scarsdale&lt;/asp:ListItem&gt;</pre>
<pre class="alt">            &lt;asp:ListItem Value=<span class="str">&quot;3&quot;</span>&gt;Chicago&lt;/asp:ListItem&gt;</pre>
<pre>            &lt;asp:ListItem Value=<span class="str">&quot;1&quot;</span>&gt;San Jose&lt;/asp:ListItem&gt;</pre>
<pre class="alt">        &lt;/asp:CheckBoxList&gt;</pre>
<pre>        &lt;asp:ObjectDataSource ID=<span class="str">&quot;ObjectDataSource1&quot;</span> runat=<span class="str">&quot;server&quot;</span> SelectMethod=<span class="str">&quot;GetPeopleByCityListString&quot;</span></pre>
<pre class="alt">            TypeName=<span class="str">&quot;BO.BusinessObject&quot;</span>&gt;</pre>
<pre>            &lt;SelectParameters&gt;</pre>
<pre class="alt">                &lt;asp:ControlParameter ControlID=<span class="str">&quot;Label1&quot;</span> Name=<span class="str">&quot;cityListString&quot;</span> PropertyName=<span class="str">&quot;Text&quot;</span></pre>
<pre>                    Type=<span class="str">&quot;String&quot;</span> /&gt;</pre>
<pre class="alt">            &lt;/SelectParameters&gt;</pre>
<pre>        &lt;/asp:ObjectDataSource&gt;</pre>
<pre class="alt">        &lt;asp:GridView ID=<span class="str">&quot;GridView1&quot;</span> runat=<span class="str">&quot;server&quot;</span> AutoGenerateColumns=<span class="str">&quot;False&quot;</span> </pre>
<pre>            DataSourceID=<span class="str">&quot;ObjectDataSource1&quot;</span>&gt;</pre>
<pre class="alt">            &lt;Columns&gt;</pre>
<pre>                &lt;asp:BoundField DataField=<span class="str">&quot;name&quot;</span> HeaderText=<span class="str">&quot;name&quot;</span> SortExpression=<span class="str">&quot;name&quot;</span> /&gt;</pre>
<pre class="alt">                &lt;asp:BoundField DataField=<span class="str">&quot;id&quot;</span> HeaderText=<span class="str">&quot;id&quot;</span> SortExpression=<span class="str">&quot;id&quot;</span> /&gt;</pre>
<pre>            &lt;/Columns&gt;</pre>
<pre class="alt">        &lt;/asp:GridView&gt;</pre>
<pre>    &lt;/div&gt;</pre>
<pre class="alt">    &lt;/form&gt;</pre>
<pre>&lt;/body&gt;</pre>
<pre class="alt">&lt;/html&gt;</pre>
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
<p>Notice that the asp controlparameter is passing the Label1 contents to the ObjectDataSource.&#160; To load that, we need to put some code in the Page_Load event that will set that line.&#160; Here is that code.&#160; It simply reads the checkboxlist and builds the string of numbers (3,5,7,9.).</p>
<p>I'm pretty sure that is it.&#160; Now, when you run the web site, you'll get a screen that you can click multiple checkboxes on and get all the results that correspond with that checkbox.&#160; Here is what it should look like:</p>
<p><a href="/wp/wp-content/uploads/2008/12/image_thumb1.png"><img border="0" alt="image_thumb1" src="/wp/wp-content/uploads/2008/12/image_thumb1_thumb.png" width="166" height="244" /></a></p>
<p>Hope this Helps!&#160; And, if you it the better way by making a custom ControlParameter, post it here and we can all ignore this article.&#160; <img alt="Smile" src="http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif" /></p>
<p>&#160;</p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px" id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:cce21702-3bbb-4f92-b1fd-70d9beb3879d" class="wlWriterSmartContent">
<p>The Code <a href="/wp/wp-content/uploads/2008/12/GridViewCheckBoxListExample1.zip" target="_blank">GridViewCheckBoxListExample1.zip</a></p>
</div>
