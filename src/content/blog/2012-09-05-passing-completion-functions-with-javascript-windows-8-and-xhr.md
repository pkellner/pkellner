---
status: publish
published: true
pubDatetime: 2012-09-05T20:00:00.000Z
title: Passing Completion Functions With JavaScript (Windows 8 and XHR)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2232
wordpress_url: https://peterkellner.net/?p=2232
date: '2012-09-05 20:16:00 -0700'
date_gmt: '2012-09-06 03:16:00 -0700'
categories:
- JavaScript
- Windows 8
- Windows 8 Store
tags: []
---
<p>I recently did a post where I discovered a very cool trick done by the <a href="http://xamarin.com">xamarin</a> folks that had to do with executing an anonymous method in the call parameter list of a c# function call.&#160; Basically, the idea was that you call some method to do something, then at the end of that method instead of immediately returning, you execute the dynamic function that was passed in.&#160; That way, you can avoid all the gu involved with creating call back methods.&#160; You can read about it here:&#160; <a href="/2012/08/30/in-c-passing-delegate-as-parameter-then-executing-on-return/">https://peterkellner.net/2012/08/30/in-c-passing-delegate-as-parameter-then-executing-on-return/</a></p>
<p>So, as many of you know. I’m pretty good at getting c# to do what I want and finding tips like this is always a big surprise and fun to share.&#160; So, now I’m trying to finish up my first Windows 8 HTML5/JavaScript app and I run into exactly same problem.&#160; Since one of my readers pointed out that this technique is very common in JavaScript I figure I could try it here.&#160; I did, it did and I’m a happy camper.</p>
<p>So basically, I created a namespace and a very nice function in that name space to do an <a href="http://msdn.microsoft.com/en-us/library/windows/apps/br229787.aspx">XHR</a> request using promises and then on completion return.&#160; The problem is, on completion I want the caller to do something.&#160; So, let me give a concrete example of what my code kind of looks like.</p>
<p>Here is the definition of my function that does the xhr request.</p>
<pre class="csharpcode">(<span class="kwrd">function</span> () {
    <span class="str">&quot;use strict&quot;</span>;
    WinJS.Namespace.define(<span class="str">&quot;AE.Functions&quot;</span>, {
        fetchEmail: <span class="kwrd">function</span> (nav, searchString, action) {
            <span class="kwrd">var</span> that = <span class="kwrd">this</span>;
            WinJS.xhr({
                type: <span class="str">&quot;post&quot;</span>,
                url: AE.Constants.baseUrl + <span class="str">&quot;EmailDetail/GetPersonsWithEmailByEmailAccount&quot;</span>,
                headers: { <span class="str">&quot;Content-type&quot;</span>: <span class="str">&quot;application/x-www-form-urlencoded&quot;</span> },
                data: formParams,
                scope: that
            }).then(<span class="kwrd">function</span> (xhr) {
               
                AE.Logging.LogFetchEmail(<span class="str">&quot;fetchEmail:done&quot;</span>);
                action();
            });
        }
    });
})();</pre>
<p>Notice the third parameter of the function called “action”.&#160; Also notice after the AE.Logging. call that action is called.&#160; That means, when the xhr request finishes, the dynamic function in the caller is executed.</p>
<p>Something like this (ok, exactly like this):</p>
<pre class="csharpcode"><span class="kwrd">function</span> fetchEmail() {
 <span class="kwrd">if</span> (appView.value != appViewState.snapped) {
    AE.Functions.fetchEmail(nav, AE.Constants.Utils.emailSearchString,<span class="kwrd">function</span> () {
        <span class="kwrd">var</span> x = document.getElementById(<span class="str">'progresscontrolid'</span>);
        x.style.visibility = <span class="str">&quot;hidden&quot;</span>;
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
<p>What I’m actually doing is turning off a progress control when the xhr request is finished.</p>
<p>That’s it!&#160; Same trick, different language.</p>
<p>HTH’s</p>
