---
status: publish
published: true
pubDatetime: 2014-05-08T20:00:00.000Z
title: Tuples In C#, A Useful Example
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4004
wordpress_url: https://peterkellner.net/?p=4004
date: '2014-05-08 07:08:32 -0700'
date_gmt: '2014-05-08 14:08:32 -0700'
categories:
- C#
- Visual Studio
- Visual Studio 2012
- Visual Studio 2013
tags: []
---
<h2>Background</h2>
<p>Last year I worked consulted with a company that had an engineer that used tuples in C# and tried to explain to me how they were useful.&#160; To be honest, I never quite saw the value proposition (until today).&#160; I remember he kept saying they were kind of like key value pairs but could go beyond that.&#160; I remember those words but never internalized that.</p>
<h2>The Example</h2>
<p>My example is a simple one.&#160; I’m currently working on providing data to an external application that will provide business intelligence (help with session selection) to the <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> web site.&#160; The data I’m providing is every mark of interest and plan to attend for every session ever given at code camp (that’s 220,000 records).&#160; I also want to add to those records the session evaluation results for those people.&#160; For example, one of those 220,000 records looks like this:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> SessionAttendeeRec
{
    <span class="kwrd">public</span> <span class="kwrd">string</span> Id { get; set; } <span class="rem">// because ST sends up strings on new records</span>
    <span class="kwrd">public</span> <span class="kwrd">int</span> AttendeeId { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">int</span> SessionId { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">bool</span> Interested { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">bool</span> WillAttend { get; set; }
    <span class="kwrd">public</span> DateTime LastUpdatedDate { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">int</span> HoveredOverCount { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">bool</span> EvalDone { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">int</span> EvalCourseAsWhole { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">int</span> EvalOverallCodeCamp { get; set; }
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
<p>I can get most of this data from one table (SessionAttendee) which is defined as follows:</p>
<pre class="csharpcode"><span class="kwrd">CREATE</span> <span class="kwrd">TABLE</span> [dbo].[SessionAttendee] (
  [Id] <span class="kwrd">int</span> <span class="kwrd">IDENTITY</span>(1, 1) <span class="kwrd">NOT</span> <span class="kwrd">NULL</span>,
  [SessionsId] <span class="kwrd">int</span> <span class="kwrd">NOT</span> <span class="kwrd">NULL</span>,
  [AttendeesId] int<span class="kwrd">NOT</span> <span class="kwrd">NULL</span>,
  [Interestlevel] <span class="kwrd">int</span> <span class="kwrd">NOT</span> <span class="kwrd">NULL</span>,
  [LastUpdatedDate] datetime <span class="kwrd">NULL</span>,
  [UpdateByProgram] nvarchar(64) <span class="kwrd">NULL</span>,
  [Cnt] <span class="kwrd">int</span> <span class="kwrd">NULL</span>,
  [SignupDate] datetime <span class="kwrd">NULL</span>,
  [SignUpCancelByDate] datetime <span class="kwrd">NULL</span>,
  [PayDate] datetime <span class="kwrd">NULL</span>,
  [PayAmount] <span class="kwrd">decimal</span>(19, 4) <span class="kwrd">NULL</span>,
  [PayComment] <span class="kwrd">varchar</span>(1024)  <span class="kwrd">NULL</span>,
  [Note] <span class="kwrd">varchar</span>(1024)  <span class="kwrd">NULL</span>,
  [ChargeAmount] <span class="kwrd">decimal</span>(19, 4) <span class="kwrd">NULL</span>,
  <span class="kwrd">PRIMARY</span> <span class="kwrd">KEY</span> <span class="kwrd">CLUSTERED</span> ([Id])
)</pre>
<p>However, I have two extra fields (EvalCourseAsWhole and EvalOverallCodeCamp) I need to fill in from another table (SessionEvals).</p>
<pre class="csharpcode">CREATE TABLE [dbo].[SessionEvals] (
  [Id] <span class="kwrd">int</span> IDENTITY(1, 1) NOT NULL,
  [SessionId] <span class="kwrd">int</span> NOT NULL,
  [AttendeeId] <span class="kwrd">int</span> NOT NULL,
  [CourseAsWhole] <span class="kwrd">int</span> NULL,
  [OverallCodeCamp] <span class="kwrd">int</span> NULL,
  PRIMARY KEY CLUSTERED ([Id])
)</pre>
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
<p>I could use an outer join for this but in this case I chose to do two selects, one of the first table in it’s entirety</p>
<pre class="csharpcode"><span class="rem">// create the dictionary that will hold the tuples</span>
var sessionEvals = SessionEvalsManager.I.GetAll();
dict = <span class="kwrd">new</span> Dictionary&lt;Tuple&lt;<span class="kwrd">int</span>, <span class="kwrd">int</span>&gt;, SessionEvalsResult&gt;();
<span class="kwrd">foreach</span> (var s <span class="kwrd">in</span> sessionEvals)
{
    var tuple = <span class="kwrd">new</span> Tuple&lt;<span class="kwrd">int</span>,<span class="kwrd">int</span>&gt;(s.sessionId,s.attendeeId);
    dict.Add(tuple, s);
}</pre>
<pre class="csharpcode"><span class="kwrd">foreach</span> (var r <span class="kwrd">in</span> sessionAttendeeRecs)
{
        var tuple = <span class="kwrd">new</span> Tuple&lt;<span class="kwrd">int</span>, <span class="kwrd">int</span>&gt;(r.sessionId, r.attendeeId);
        <span class="kwrd">if</span> (dict.ContainsKey(tuple))
        {
            var sessionEval = dict[tuple];
            r.EvalCourseAsWhole = sessionEval.CourseAsWhole ?? -1;
            r.EvalOverallCodeCamp = sessionEval.OverallCodeCamp ?? -1;
            r.EvalDone = <span class="kwrd">true</span>;
        }
}</pre>
<p>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
.csharpcode .lnum { color: #606060; }</style></p>
