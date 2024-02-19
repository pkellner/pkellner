---
status: publish
published: true
pubDatetime: 2013-05-22T20:00:00.000Z
title: Wrestling All Day With WebAPI, NewtonSoft and JSON Date Formats
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3610
wordpress_url: https://peterkellner.net/?p=3610
date: '2013-05-22 14:56:03 -0700'
date_gmt: '2013-05-22 21:56:03 -0700'
categories:
- JSON
- SenchaTouch
- WebAPI
- NewtonSoft
tags: []
---
<p>&#160;</p>
<p>Half to document what I now believe and half to share my findings, I’m going to do a short post that shows the implications of changing the DateTimeKind parameter of a DateTime field in a WebAPI controller.&#160; That is, a WebAPI controller can return it’s results as JSON and the data that is DateTime gets converted based on some rules that for me were not clear.</p>
<p>First, let me state my conclusion (for those with short attention spans), then I’ll show the data and include the visual studio 2012 project I used to make this.</p>
<table cellspacing="0" cellpadding="10" width="585" border="1">
<tbody>
<tr>
<td valign="top" width="149">DateTimeKind.Local</td>
<td valign="top" width="172">013-10-05T13:00:00-07:00</td>
<td valign="top" width="262">(Has Timezone)</td>
</tr>
<tr>
<td valign="top" width="149">DateTimeKind.Utc</td>
<td valign="top" width="172">2013-10-05T13:00:00Z</td>
<td valign="top" width="262">(Has Z)</td>
</tr>
<tr>
<td valign="top" width="149">DateTimeKind.Unspecifed</td>
<td valign="top" width="172">2013-10-05T13:00:00</td>
<td valign="top" width="262">No Timezone or Z</td>
</tr>
<tr>
<td valign="top" width="149">Not specified (default)</td>
<td valign="top" width="172">2013-10-05T13:00:00</td>
<td valign="top" width="262">No Timezone or Z</td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>In my case, if I left unspecified (or default) I get no timezone which my JavaScript library (SenchaTouch) seems to believe is UTC.&#160; That throws my times off by 7 hours!</p>
<p>Just to be more clear, here is what I have for my WebAPI Controller:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> DateTestRecord
{

    <span class="kwrd">public</span> <span class="kwrd">string</span> MessageString { get; set; }
    <span class="kwrd">public</span> DateTime DateTimeRightNow { get; set; }
    <span class="kwrd">public</span> DateTime DateTime1PmOctober5Th2013 { get; set; }
}



<span class="kwrd">public</span> <span class="kwrd">class</span> DateTestController : ApiController
{

    <span class="kwrd">public</span> <span class="kwrd">class</span> LogEntry
    {
        <span class="kwrd">public</span> <span class="kwrd">string</span> Details { get; set; }
        <span class="kwrd">public</span> DateTime LogDate { get; set; }
    }

    <span class="rem">// POST api/&lt;controller&gt;</span>
    <span class="kwrd">public</span> HttpResponseMessage Get()
    {
        <span class="kwrd">return</span> Request.CreateResponse(HttpStatusCode.OK, <span class="kwrd">new</span>
            {
                data = <span class="kwrd">new</span> List&lt;DateTestRecord&gt;()
                    {
                        <span class="kwrd">new</span> DateTestRecord
                            {
                                MessageString = <span class="str">&quot;First Line&quot;</span>,
                                DateTime1PmOctober5Th2013 = <span class="kwrd">new</span> DateTime(2013, 10, 5, 13, 0, 0,DateTimeKind.Local),
                                DateTimeRightNow = DateTime.Now
                            },
                        <span class="kwrd">new</span> DateTestRecord
                            {
                                MessageString = <span class="str">&quot;Second Line&quot;</span>,
                                DateTime1PmOctober5Th2013 = <span class="kwrd">new</span> DateTime(2013, 10, 5, 13, 0, 0,DateTimeKind.Utc),
                                DateTimeRightNow = DateTime.Now
                            },
                        <span class="kwrd">new</span> DateTestRecord
                            {
                                MessageString = <span class="str">&quot;Third Line&quot;</span>,
                                DateTime1PmOctober5Th2013 = <span class="kwrd">new</span> DateTime(2013, 10, 5, 13, 0, 0,DateTimeKind.Unspecified),
                                DateTimeRightNow = DateTime.Now
                            },
                                <span class="kwrd">new</span> DateTestRecord
                            {
                                MessageString = <span class="str">&quot;Third Line&quot;</span>,
                                DateTime1PmOctober5Th2013 = <span class="kwrd">new</span> DateTime(2013, 10, 5, 13, 0, 0),
                                DateTimeRightNow = DateTime.Now
                            }
                    },
                success = <span class="kwrd">true</span>,
                message = <span class="str">&quot;All Good&quot;</span>
            });
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
<p>The results of when I run this are as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/05/image5.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/05/image_thumb5.png" width="610" height="352" /></a></p>
