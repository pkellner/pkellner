---
status: publish
published: true
pubDatetime: 2014-02-11T20:00:00.000Z
title: Capturing SendGrid Events With ASP.NET WebAPI and Task async
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3919
wordpress_url: https://peterkellner.net/?p=3919
date: '2014-02-11 16:44:20 -0800'
date_gmt: '2014-02-11 23:44:20 -0800'
categories:
- ASP.net
- ".NET 4.5"
- ASP.NET 4.5
- Visual Studio 2013
tags: []
---
<h2>&#160;</h2>
<h2>Problem</h2>
<p>I’ve been using <a href="http://sendgrid.com/">SendGrid’s</a> API WebHooks to capture email events (Version 1).&#160; This version sends one event at a time which has always been a pretty bad idea.&#160; When I first did the integration a year or so ago, the only way to capture multiple events at once was to consume some proprietary non-JSON like protocol.&#160; I declined.&#160; They finally have upgraded the API to send standard JSON records and are going to obsolete version 1 so I need to change.&#160; Here goes…</p>
<h2>Send Grid Event Notification Configuration</h2>
<p>First, you need to go into Event Notification and change to (v3) of the config.&#160; Then, I pressed the “Test Your Integration” button while running fiddler to grab the JSON SendGrid generates (see screen shot)</p>
<p><a href="/wp/wp-content/uploads/2014/02/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb.png" width="386" height="340" /></a> </p>
<h2>Figure Out The JSON Structure</h2>
<p>The generated JSON looks like this:</p></p></p>
<p><a href="/wp/wp-content/uploads/2014/02/image1.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb1.png" width="331" height="453" /></a></p>
<p>At this point, there are lots of ways to decode the JSON.&#160; My choice is to us <a href="http://json2csharp.com">http://json2csharp.com</a>, paste in my json data and it generates the classes I need to encode the JSON data into.</p>
<p><a href="/wp/wp-content/uploads/2014/02/image2.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb2.png" width="476" height="562" /></a> </p>
<p>Next, I create a WebAPI controller in ASP.NET and simply have with one method for POST.&#160; I add the above classes and then unwind the data when it comes in as follows.</p>
<p>The controller I build (as a guess) looks like this: (I’m leaving out what I do with the data in the foreach.&#160; Reality is I’m going to stuff it in a database)</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Collections.Generic;
<span class="kwrd">using</span> System.Configuration;
<span class="kwrd">using</span> System.Data;
<span class="kwrd">using</span> System.Data.SqlClient;
<span class="kwrd">using</span> System.Data.SqlTypes;
<span class="kwrd">using</span> System.Linq;
<span class="kwrd">using</span> System.Net;
<span class="kwrd">using</span> System.Net.Http;
<span class="kwrd">using</span> System.Threading.Tasks;
<span class="kwrd">using</span> System.Web.Http;
<span class="kwrd">using</span> Microsoft.Ajax.Utilities;
<span class="kwrd">using</span> Newtonsoft.Json;
<span class="kwrd">using</span> Newtonsoft.Json.Linq;

<span class="kwrd">namespace</span> WebAPI.rest
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> SendGridController : ApiController
    {
        <span class="kwrd">public</span> async Task Post()
        {
            <span class="kwrd">string</span> jsonData = await Request.Content.ReadAsStringAsync();
            dynamic dataList = JArray.Parse(jsonData);

            <span class="kwrd">using</span> (
                var sqlConnection =
                    <span class="kwrd">new</span> SqlConnection(ConfigurationManager.ConnectionStrings[<span class="str">&quot;CodeCampSV06&quot;</span>].ConnectionString))
            {
                sqlConnection.Open();

                <span class="kwrd">foreach</span> (var rec <span class="kwrd">in</span> dataList)
                {

                    <span class="kwrd">string</span> eventName = (<span class="kwrd">string</span>) rec[<span class="str">&quot;event&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> email = (<span class="kwrd">string</span>) rec[<span class="str">&quot;email&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> category = <span class="str">&quot;&quot;</span>;
                    <span class="rem">//string category = rec.category != null &amp;&amp; rec.category.Count &gt; 0 ? rec.category[0] : &quot;&quot;;</span>
                    <span class="kwrd">string</span> url =  (<span class="kwrd">string</span>) rec[<span class="str">&quot;url&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> generalType =  (<span class="kwrd">string</span>) rec[<span class="str">&quot;type&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> reason =  (<span class="kwrd">string</span>) rec[<span class="str">&quot;reason&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> statusString = (<span class="kwrd">string</span>) rec[<span class="str">&quot;status&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> attempt =(<span class="kwrd">string</span>) rec[<span class="str">&quot;attempt&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> responseString = (<span class="kwrd">string</span>)rec[<span class="str">&quot;response&quot;</span>] ?? <span class="str">&quot;&quot;</span>;
                    <span class="kwrd">string</span> emailpkid = (<span class="kwrd">string</span>)rec[<span class="str">&quot;emailpkid&quot;</span>] ?? <span class="str">&quot;&quot;</span>;

                     <span class="rem">// do something with the data!</span>
                    
                }
            }
        }
    }
}</pre>
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
<h2>Testing The WebAPI Rest Controller</h2>
<p>To test the controller, I need to simulate a call that SendGrid will be issuing to me.&#160; I do that by using fiddler to compose a new query.&#160; Below is a screen shot of what that composed query looks like on my system.&#160; Notice I’ve set it to POST and I’ve pasted in the content JSON that SendGrid will be sending me (got it from the test post above)</p>
<p><a href="/wp/wp-content/uploads/2014/02/image3.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb3.png" width="610" height="501" /></a> </p>
<p>You can now see, when I press “Execute in fiddler” while <a href="http://www.visualstudio.com/">Visual Studio</a> is running in debug mode, my data is all coming in as I expect.</p>
<p><a href="/wp/wp-content/uploads/2014/02/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2014/02/image_thumb4.png" width="610" height="216" /></a> </p>
<p>&#160;</p></p></p>
<p>That’s it! basically we’ve done it.&#160; HTHs.&#160; We’ve build a <a href="http://www.asp.net/web-api">WebAPI</a> controller using <a href="http://msdn.microsoft.com/en-us/library/hh156513.aspx">async</a> to capture data coming in as a JSON payload.</p>
