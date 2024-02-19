---
status: publish
published: true
pubDatetime: 2012-03-18T20:00:00.000Z
title: Test First Development Walk Through with Visual Studio 2011 Preview
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1893
wordpress_url: https://peterkellner.net/2012/03/18/test-first-development-walk-through-with-visual-studio-2011-preview/
date: '2012-03-18 16:14:10 -0700'
date_gmt: '2012-03-18 23:14:10 -0700'
categories:
- C#
- Visual Studio
- Visual Studio 2010
- Visual Studio 2011 Developer Preview
- Unit Testing
- VSTS
tags: []
---
<h2>Introduction</h2>
<p>Many of us know we should be using test first development, however it is hard to break old habits.&#160; I have to admit, I started to solve this particular problem I’m going to use an an example first without test first, then realized what a pickle I was going to be in proving to myself it worked.&#160; So, I thought, why not blog my experience as I do it.&#160; Using <a href="http://www.microsoft.com/visualstudio/en-us">Visual Studio</a>&#160;<a href="http://msdn.microsoft.com/en-us/library/ms379625(v=vs.80).aspx">unit testing</a> makes this pretty easy.</p>
<p>&#160;</p>
<h2>The Problem</h2>
<p>I’m currently building a multithreaded email processor and part of that process is I have to figure out, for any given use whether they are supposed to have there email server checked.&#160; So, the way I look at it, I need a method that takes in the following parameter.</p>
<ol>
<ol>
<li><strong>Now</strong> – This is actually todays date and time in UTC, but since this method need to be tested, I’m going to pass in now rather just use it directly. </li>
<li><strong>LastActivityOfUserDateTime</strong> – This is the last time we saw any activity for this user. </li>
<li><strong>LastEmailSession</strong> – This is when the email session was last run (server check).</li>
<li><strong>DefaultSecondsForLastActivityTreshold</strong> – This is used to determine weather the user last activity makes that user considered active or inactive.&#160; That is, say this is 60 seconds.&#160; Then, if the user has been active in the last 60 seconds, then this user is considered active. </li>
<li><strong>DefaultSecondsBetweenEmailRetryOutsideThreshold</strong> – If the user is<u> not active</u> (as defined by DefaultSecondsForLastActivityTreshold) then this is the number of seconds we should wait before we should try and contact the users email server again. </li>
<li><strong>DefaultSecondsBetweenEmailRetryInsideThreshold</strong> – If the user is <u>active</u> (as defined by DefaultSecondsForLastActivityTreshold) then this is the number of seconds we should wait before we should try and contact the users email server again. </li>
</ol>
</ol>
<p>Given these 4 parameters, we should write a method that returns a Boolean indicating weather the mail server needs to be rechecked for a given user.</p>
<p>&#160;</p>
<h2>The Method To Test</h2>
<p>So, let’s write a method signature.&#160; We will use this in our real project, then write some tests to see if it works correctly.&#160; We have not written the actual method yet, we are just defining what it does, then first, very important, writing the tests to prove it will work.&#160; This way, as we add all the corner cases, we can keep making sure the original cases we programmed have not broken.</p>
<p>So, here is how I see the class definition:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">bool</span> IsUserReadyToContactEmailServer(DateTime currentDateTime,
            DateTime lastActivityOfUserDateTime,
            DateTime lastEmailSession,
            <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold,
            <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold,
            <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold)
        {
            <span class="kwrd">bool</span> activeUser = IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                                      defaultSecondsForLastActivityTreshold);
            <span class="kwrd">int</span> thresholdForRetrySeconds =
                activeUser
                    ? defaultSecondsBetweenEmailRetryInsideThreshold
                    : defaultSecondsBetweenEmailRetryOutsideThreshold;

            <span class="rem">// this has to be a double because could be huge number if last email send very long ago</span>
            <span class="kwrd">double</span> timeSinceLastEmailSessionSeconds =
                currentDateTime.Subtract(lastEmailSession).TotalSeconds;

           <span class="kwrd">return</span> timeSinceLastEmailSessionSeconds &gt; thresholdForRetrySeconds;
        }</pre>
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
.csharpcode .lnum { color: #606060; }</style>
<h2>Creating a Test Project In Visual Studio 2011 Preview</h2>
<p>Now that we have our method we want to test, let’s create a test project.&#160; This is very straight forward.&#160; We first just say “File/New Project” then choose “Unit Test Project”.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/03/image11.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb11.png" width="432" height="255" /></a></p>
<p>&#160;</p>
<p>I’m going to simply create a method called TestMethodIsUserReadyToContactEmailServer().</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> Microsoft.VisualStudio.TestTools.UnitTesting;

<span class="kwrd">namespace</span> AEWeb.Tests
{
    [TestClass]
    <span class="kwrd">public</span> <span class="kwrd">class</span> UnitTest1
    {
        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> TestMethodIsUserReadyToContactEmailServer()
        {
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
<p>Now, we need to add some guts.&#160; There is an automated way to create the actual test stubs, but at the moment I can’t seem to find it.&#160; In this case, we really just need to test a bunch of corner cases so let’s code the tests up. Below are the tests I’ve come up with including comments that make them self explanatory.</p>
<p>So, as I’m creating my tests, I realize I need to create an extra class to help this one.&#160; That is specifically, I need to add a method that simply determines if the user is currently active.&#160; I’m going to call that IsCurrentlyActive and have it take three paramaters.&#160; currentDateTime, DefaultSecondsForLastActivityThreshold and usersLastActivityDate.&#160; I realized this because solving the full problem of figuring out if the user is ready to sync email is to complex in one step.</p>
<p>If I were developing this without unit tests, I would have figured the same thing out, but then as I built it, I would not be verifying it’s correctness with testing.</p>
<h2>Creating Stub Classes</h2>
<p>So, my new class I want to test will be this:</p>
<pre class="csharpcode"> <span class="rem">/// &lt;summary&gt;</span>
        <span class="rem">/// This really just a supporting method for the above IsUserReadyToContactEmailServer call</span>
        <span class="rem">/// &lt;/summary&gt;</span>
        <span class="rem">/// &lt;param name=&quot;currentDateTime&quot;&gt;Current datetime (for testing can be anything)&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;usersLastActivityDate&quot;&gt;time user was last seen &lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsForLastActivityTreshold&quot;&gt;our definition of what makes a user currently active&lt;/param&gt;</span>
        <span class="rem">/// &lt;returns&gt;&lt;/returns&gt;</span>
        <span class="kwrd">public</span> <span class="kwrd">bool</span> IsUserCurrentlyActive(DateTime currentDateTime,
            DateTime usersLastActivityDate,
            <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold
            )
        {

            <span class="kwrd">return</span> <span class="kwrd">true</span>;
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
<h2>The Unit Tests Themselves</h2>
<p>So, now is time to actually write the tests.&#160; I’m not going to explain here all the mechanics of testing.&#160; I assume you understand the basics are you right calls to methods, then make assertions for correctness.&#160; If the assertion is wrong, then print that message and of course the test fails.</p>
<p>So, Here are my test cases for just the helper method (IsUserCurrentlyActive).</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> AELib;
<span class="kwrd">using</span> Microsoft.VisualStudio.TestTools.UnitTesting;

<span class="kwrd">namespace</span> AEWeb.Tests
{
    [TestClass]
    <span class="kwrd">public</span> <span class="kwrd">class</span> UnitTestEmailReadyCheck
    {

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestRecentActivity()
        {
            {
                <span class="rem">// a long time ago</span>
                var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
                var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 2, 1, 12, 0, 0);
                <span class="rem">// last activity was a month ago, 2/1/2012 at noon</span>
                <span class="rem">// threshhold for calling a user active</span>
                <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
                <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                    IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                          defaultSecondsForLastActivityTreshold);
                Assert.IsFalse(isActive,
                               <span class="str">&quot;User Should Be Inactive because last activity was 1 month ago and threshhold is 15 minutes&quot;</span>);
            }
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestNoRecentActivity()
        {
            <span class="rem">// a just inside threshold</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 55, 0);
            <span class="rem">// last activity was 5 minutes before noon on 2/1/2012</span>
            <span class="rem">// threshhold for calling a user active</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
            <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                      defaultSecondsForLastActivityTreshold);
            Assert.IsTrue(isActive,
                          <span class="str">&quot;User Should Be active because last activity was 5 minutes ago and threshhold is 15 minutes&quot;</span>);
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestCurrentDateBehindActivity()
        {
            <span class="rem">// impossible cause of last activity being after current time. just need to</span>
            <span class="rem">// make sure it returns true and does not crash</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 18, 0, 0);
            <span class="rem">// last activity was 5 minutes after noon on 2/1/2012</span>
            <span class="rem">// threshhold for calling a user active</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
            <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                      defaultSecondsForLastActivityTreshold);
            Assert.IsTrue(isActive,
                          <span class="str">&quot;User Should Be active because last activity was 5 minutes after current time&quot;</span>);
        }
    }
}</pre>
<p>&#160;</p>
<p>Then, I write the actual method:</p>
<p>&#160;</p>
<pre class="csharpcode">       <span class="rem">/// &lt;summary&gt;</span>
        <span class="rem">/// This really just a supporting method for the above IsUserReadyToContactEmailServer call</span>
        <span class="rem">/// &lt;/summary&gt;</span>
        <span class="rem">/// &lt;param name=&quot;currentDateTime&quot;&gt;Current datetime (for testing can be anything)&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;usersLastActivityDate&quot;&gt;time user was last seen &lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsForLastActivityTreshold&quot;&gt;our definition of what makes a user currently active&lt;/param&gt;</span>
        <span class="rem">/// &lt;returns&gt;&lt;/returns&gt;</span>
        <span class="kwrd">public</span> <span class="kwrd">bool</span> IsUserCurrentlyActive(DateTime currentDateTime,
            DateTime usersLastActivityDate,
            <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold
            )
        {
            <span class="kwrd">int</span> secondsSinceLastActivity = Convert.ToInt32(currentDateTime.Subtract(usersLastActivityDate).TotalSeconds);
            <span class="kwrd">bool</span> activeStatus = defaultSecondsForLastActivityTreshold &gt; secondsSinceLastActivity;
            <span class="kwrd">return</span> activeStatus;
        }</pre>
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
.csharpcode .lnum { color: #606060; }</style>
<p>And finally, run the test (skipping a little debugging to make them all work)</p>
<p>Presto!</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/03/image12.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb12.png" width="338" height="263" /></a></p>
<p>&#160;</p>
<p>For completeness, I’m pasting the full unit test for the other main class I’m interested in testing below (as well as the class itself), however I won’t go into all the details.&#160; Everything is basically the same, just more of it</p>
<p>&#160;</p>
<h2>Conclusions and Observations</h2>
<p>Turns out, this was quite a bit of work to generate all these tests.&#160; At first pass, I can hear someone saying it seems like a lot to do just for two fairly simple methods.&#160; My answer is that I struggled trying to get it right until I finally decided to write the tests.&#160; Now, I’m confident it works correctly.&#160; What is more, if there is a bug in my algorithm, or something else comes up I need to include (which is very likely) I now have a great way to prove to myself (and others) that my class works.&#160; Also, this serves as great documentation for what expectations are for this very important function.</p>
<p>&#160;</p>
<h2>
<p>Appendex – Full Unit Test And Class Source</p>
<p>&#160;</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Collections.Generic;
<span class="kwrd">using</span> System.Linq;
<span class="kwrd">using</span> System.Text;

<span class="kwrd">namespace</span> AELib
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> MailServerReadyCheck
    {
        <span class="rem">/// &lt;summary&gt;</span>
        <span class="rem">/// </span>
        <span class="rem">/// &lt;/summary&gt;</span>
        <span class="rem">/// &lt;param name=&quot;currentDateTime&quot;&gt;This is actually todays date and time in UTC, but since </span>
        <span class="rem">///    this method need to be tested, I’m going to pass in now rather just use it directly&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;lastActivityOfUserDateTime&quot;&gt; This is used to determine weather the user last activity</span>
        <span class="rem">///      makes that user considered active or inactive.  That is, say this is 60 seconds.</span>
        <span class="rem">///      Then, if the user has been active in the last 60 seconds, then this user is considered active.&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;lastEmailSession&quot;&gt;When the last email completed for this user&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsForLastActivityTreshold&quot;&gt;This is used to determine weather the user last activity makes that </span>
        <span class="rem">///      user considered active or inactive.  That is, say this is 60 seconds.  Then, if the user has </span>
        <span class="rem">///      been active in the last 60 seconds, then this user is considered active.&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsBetweenEmailRetryOutsideThreshold&quot;&gt; If the user is not active (as defined by </span>
        <span class="rem">///      DefaultSecondsForLastActivityTreshold) then this is the number of seconds we should wait before </span>
        <span class="rem">///      we should try and contact the users email server again.&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsBetweenEmailRetryInsideThreshold&quot;&gt;If the user is active (as defined by </span>
        <span class="rem">///      DefaultSecondsForLastActivityTreshold) then this is the number of seconds we should wait </span>
        <span class="rem">///      before we should try and contact the users email server again.&lt;/param&gt;</span>
        <span class="rem">/// &lt;returns&gt;returns a boolean indicating weather the mail server needs to be rechecked for a given user.&lt;/returns&gt;</span>
        <span class="kwrd">public</span> <span class="kwrd">bool</span> IsUserReadyToContactEmailServer(DateTime currentDateTime,
            DateTime lastActivityOfUserDateTime,
            DateTime lastEmailSession,
            <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold,
            <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold,
            <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold)
        {
            <span class="kwrd">bool</span> activeUser = IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                                      defaultSecondsForLastActivityTreshold);
            <span class="kwrd">int</span> thresholdForRetrySeconds =
                activeUser
                    ? defaultSecondsBetweenEmailRetryInsideThreshold
                    : defaultSecondsBetweenEmailRetryOutsideThreshold;

            <span class="rem">// this has to be a double because could be huge number if last email send very long ago</span>
            <span class="kwrd">double</span> timeSinceLastEmailSessionSeconds =
                currentDateTime.Subtract(lastEmailSession).TotalSeconds;

           <span class="kwrd">return</span> timeSinceLastEmailSessionSeconds &gt; thresholdForRetrySeconds;
        }

        <span class="rem">/// &lt;summary&gt;</span>
        <span class="rem">/// This really just a supporting method for the above IsUserReadyToContactEmailServer call</span>
        <span class="rem">/// &lt;/summary&gt;</span>
        <span class="rem">/// &lt;param name=&quot;currentDateTime&quot;&gt;Current datetime (for testing can be anything)&lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;usersLastActivityDate&quot;&gt;time user was last seen &lt;/param&gt;</span>
        <span class="rem">/// &lt;param name=&quot;defaultSecondsForLastActivityTreshold&quot;&gt;our definition of what makes a user currently active&lt;/param&gt;</span>
        <span class="rem">/// &lt;returns&gt;&lt;/returns&gt;</span>
        <span class="kwrd">public</span> <span class="kwrd">bool</span> IsUserCurrentlyActive(DateTime currentDateTime,
            DateTime usersLastActivityDate,
            <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold
            )
        {
            <span class="kwrd">int</span> secondsSinceLastActivity = Convert.ToInt32(currentDateTime.Subtract(usersLastActivityDate).TotalSeconds);
            <span class="kwrd">bool</span> activeStatus = defaultSecondsForLastActivityTreshold &gt; secondsSinceLastActivity;
            <span class="kwrd">return</span> activeStatus;
        }
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
<p>And the tests…</p>
<p>&#160;</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> AELib;
<span class="kwrd">using</span> Microsoft.VisualStudio.TestTools.UnitTesting;

<span class="kwrd">namespace</span> AEWeb.Tests
{
    [TestClass]
    <span class="kwrd">public</span> <span class="kwrd">class</span> UnitTestEmailReadyCheck
    {

        <span class="rem">///////////////////// IsUserCurrentlyActive follows</span>


        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestRecentActivity()
        {
            {
                <span class="rem">// a long time ago</span>
                var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
                var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 2, 1, 12, 0, 0);
                <span class="rem">// last activity was a month ago, 2/1/2012 at noon</span>
                <span class="rem">// threshhold for calling a user active</span>
                <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
                <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                    IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                          defaultSecondsForLastActivityTreshold);
                Assert.IsFalse(isActive,
                               <span class="str">&quot;User Should Be Inactive because last activity was 1 month ago and threshhold is 15 minutes&quot;</span>);
            }
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestNoRecentActivity()
        {
            <span class="rem">// a just inside threshold</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 55, 0);
            <span class="rem">// last activity was 5 minutes before noon on 2/1/2012</span>
            <span class="rem">// threshhold for calling a user active</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
            <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                      defaultSecondsForLastActivityTreshold);
            Assert.IsTrue(isActive,
                          <span class="str">&quot;User Should Be active because last activity was 5 minutes ago and threshhold is 15 minutes&quot;</span>);
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestCurrentDateBehindActivity()
        {
            <span class="rem">// impossible cause of last activity being after current time. just need to</span>
            <span class="rem">// make sure it returns true and does not crash</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 18, 0, 0);
            <span class="rem">// last activity was 5 minutes after noon on 2/1/2012</span>
            <span class="rem">// threshhold for calling a user active</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60*15; <span class="rem">// let's call this 15 minute threshhold</span>
            <span class="kwrd">bool</span> isActive = <span class="kwrd">new</span> MailServerReadyCheck().
                IsUserCurrentlyActive(currentDateTime, lastActivityOfUserDateTime,
                                      defaultSecondsForLastActivityTreshold);
            Assert.IsTrue(isActive,
                          <span class="str">&quot;User Should Be active because last activity was 5 minutes after current time&quot;</span>);
        }

        <span class="rem">///////////////////// IsUserReadyToContactEmailServer follows</span>

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestIsUserReadyToContactEmailServerLongTimeAgoUserInActive()
        {
            <span class="rem">// let's use these parameters for every test</span>

            <span class="rem">// let's call this 30 minute threshhold. no contact within 30 minutes, than user is inactive</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60 * 30;

            <span class="rem">// if active user, check email every 2 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold = 60 * 2;

            <span class="rem">// if inactive user, check email every 20 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold = 60 * 20; 

            <span class="rem">// user checked email 5 hours ago and email has not been run for 3 hours</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastEmailSessionDateTime = <span class="kwrd">new</span> DateTime(2011,3,1,2, 0, 0); <span class="rem">// email session 2am of 1 year ago (very long ago)</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2011, 3, 1, 7, 0, 0); <span class="rem">// user checked email at 7am a year ago</span>
           
            <span class="kwrd">bool</span> emailSessionNeeded = <span class="kwrd">new</span> MailServerReadyCheck().IsUserReadyToContactEmailServer(currentDateTime,
                lastActivityOfUserDateTime,lastEmailSessionDateTime,defaultSecondsForLastActivityTreshold,
                defaultSecondsBetweenEmailRetryOutsideThreshold,
                defaultSecondsBetweenEmailRetryInsideThreshold);


            Assert.IsTrue(emailSessionNeeded,
                          <span class="str">&quot;user checked email 5 hours ago and email has not been run for 3 hours. Should have needed email session&quot;</span>);
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestIsUserReadyToContactEmailServerLongTimeAgoUserActive()
        {
            <span class="rem">// let's use these parameters for every test</span>
            <span class="rem">// let's call this 30 minute threshhold. no contact within 30 minutes, than user is inactive</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60 * 30;

            <span class="rem">// if active user, check email every 2 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold = 60 * 2;

            <span class="rem">// if inactive user, check email every 20 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold = 60 * 20;

            <span class="rem">// user checked email 1 minute ago and email has not been run for 3 hours</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastEmailSessionDateTime = <span class="kwrd">new</span> DateTime(2011, 3, 1, 2, 0, 0); <span class="rem">// email session 2am of 1 year ago (very long ago)</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 59, 0); <span class="rem">// user checked email 1 minute ago</span>

            <span class="kwrd">bool</span> emailSessionNeeded = <span class="kwrd">new</span> MailServerReadyCheck().IsUserReadyToContactEmailServer(currentDateTime,
                lastActivityOfUserDateTime, lastEmailSessionDateTime, defaultSecondsForLastActivityTreshold,
                defaultSecondsBetweenEmailRetryOutsideThreshold,
                defaultSecondsBetweenEmailRetryInsideThreshold);


            Assert.IsTrue(emailSessionNeeded,
                          <span class="str">&quot;user checked email  1 minute ago and email not been run for 1 year. should have run email again&quot;</span>);
        }

        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestIsUserReadyToContactEmailServerRecentlyUserActive()
        {
            <span class="rem">// let's use these parameters for every test</span>
            <span class="rem">// let's call this 30 minute threshhold. no contact within 30 minutes, than user is inactive</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60 * 30;

            <span class="rem">// if active user, check email every 2 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold = 60 * 2;

            <span class="rem">// if inactive user, check email every 20 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold = 60 * 20;

            <span class="rem">// user checked email 1 minute ago and email has not been run for 3 hours</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastEmailSessionDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 50, 0); <span class="rem">// email session 10 minutes ago</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 59, 0); <span class="rem">// user checked email 1 minute ago</span>

            <span class="kwrd">bool</span> emailSessionNeeded = <span class="kwrd">new</span> MailServerReadyCheck().IsUserReadyToContactEmailServer(currentDateTime,
                lastActivityOfUserDateTime, lastEmailSessionDateTime, defaultSecondsForLastActivityTreshold,
                defaultSecondsBetweenEmailRetryOutsideThreshold,
                defaultSecondsBetweenEmailRetryInsideThreshold);


            Assert.IsTrue(emailSessionNeeded,
                          <span class="str">&quot;active user, email checked 10 minutes ago but since active should check again&quot;</span>);
        }


        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestIsUserReadyToContactEmailServerRecentlyUserInActive()
        {
            <span class="rem">// let's use these parameters for every test</span>
            <span class="rem">// let's call this 30 minute threshhold. no contact within 30 minutes, than user is inactive</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60 * 30;

            <span class="rem">// if active user, check email every 2 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold = 60 * 2;

            <span class="rem">// if inactive user, check email every 20 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold = 60 * 20;

            <span class="rem">// user checked email 1 minute ago and email has not been run for 3 hours</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastEmailSessionDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 11, 50, 0); <span class="rem">// email session 10 minutes ago</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2011, 3, 1, 11, 59, 0); <span class="rem">// user checked email 1 year ago</span>

            <span class="kwrd">bool</span> emailSessionNeeded = <span class="kwrd">new</span> MailServerReadyCheck().IsUserReadyToContactEmailServer(currentDateTime,
                lastActivityOfUserDateTime, lastEmailSessionDateTime, defaultSecondsForLastActivityTreshold,
                defaultSecondsBetweenEmailRetryOutsideThreshold,
                defaultSecondsBetweenEmailRetryInsideThreshold);


            Assert.IsFalse(emailSessionNeeded,
                          <span class="str">&quot;inactive user, but email checked very recently so should not be checking again&quot;</span>);
        }


        [TestMethod]
        <span class="kwrd">public</span> <span class="kwrd">void</span> UnitTestIsUserReadyToContactEmailServerEmailLastSession10MinutesagoActive()
        {
            <span class="rem">// let's use these parameters for every test</span>
            <span class="rem">// let's call this 30 minute threshhold. no contact within 30 minutes, than user is inactive</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsForLastActivityTreshold = 60 * 30;

            <span class="rem">// if active user, check email every 2 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryInsideThreshold = 60 * 2;

            <span class="rem">// if inactive user, check email every 20 minutes</span>
            <span class="kwrd">const</span> <span class="kwrd">int</span> defaultSecondsBetweenEmailRetryOutsideThreshold = 60 * 20;

            <span class="rem">// user checked email 1 minute ago and email has not been run for 3 hours</span>
            var currentDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 12, 0, 0); <span class="rem">// assume current time is 3/1/2012 at noon</span>
            var lastEmailSessionDateTime = <span class="kwrd">new</span> DateTime(2012, 3, 1, 1, 11, 50); <span class="rem">// email session 10 minutes ago</span>
            var lastActivityOfUserDateTime = <span class="kwrd">new</span> DateTime(2011, 3, 1, 11, 59, 0); <span class="rem">// user checked email 5 minutes ago</span>

            <span class="kwrd">bool</span> emailSessionNeeded = <span class="kwrd">new</span> MailServerReadyCheck().IsUserReadyToContactEmailServer(currentDateTime,
                lastActivityOfUserDateTime, lastEmailSessionDateTime, defaultSecondsForLastActivityTreshold,
                defaultSecondsBetweenEmailRetryOutsideThreshold,
                defaultSecondsBetweenEmailRetryInsideThreshold);


            Assert.IsTrue(emailSessionNeeded,
                          <span class="str">&quot;active user, but email checked very recently so should be checking again&quot;</span>);
        }






    }
}</pre>
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
.csharpcode .lnum { color: #606060; }</style>
</h2>
<p>&#160;</p>
<p>And the results of all tests running <img class="wlEmoticon wlEmoticon-smile" style="border-top-style: none; border-bottom-style: none; border-right-style: none; border-left-style: none" alt="Smile" src="/wp/wp-content/uploads/2012/03/wlEmoticon-smile.png" /></p>
<p><a href="/wp/wp-content/uploads/2012/03/image13.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb13.png" width="463" height="279" /></a></p>
<p>&#160;</p>
<p>And, if you are still reading, I’ve got 100% of these two methods covered from these unit tests using <a href="http://msdn.microsoft.com/en-us/library/dd299398(v=vs.90).aspx">Code Coverage</a>.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/03/image14.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/03/image_thumb14.png" width="490" height="121" /></a></p>
<p>&#160;</p>
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
.csharpcode .lnum { color: #606060; }</style>
<p>&#160;</p>
<ul>
<li></li>
</ul>
