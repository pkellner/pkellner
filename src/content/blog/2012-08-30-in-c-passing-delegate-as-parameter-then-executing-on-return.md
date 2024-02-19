---
status: publish
published: true
pubDatetime: 2012-08-30T20:00:00.000Z
title: In C# Passing Delegate As Parameter, Then Executing on Return
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2218
wordpress_url: https://peterkellner.net/?p=2218
date: '2012-08-30 15:40:21 -0700'
date_gmt: '2012-08-30 22:40:21 -0700'
categories:
- C#
- Microsoft
- Lambda
tags: []
---
<p>I did not know that it is possible to have a delegate as a call to a method, then have that method actually execute that delegate at it’s convenience.&#160; I’m busy converting a <a href="http://xamarin.com/">Xamarin</a> conference application for the IPad and am wrangling getting it to show <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a> data rather than <a href="http://blog.xamarin.com/2012/02/24/mwc_2012/">MWC</a> (Mobile World Conference data).</p>
<p>So, here is the method I ran into:</p>
<pre class="csharpcode">var siteParser = <span class="kwrd">new</span> MWC.SAL.MWCSiteParser();
siteParser.GetConference (Constants.ConferenceDataUrl,
                            () =&gt;
                                {
                                    var c = siteParser.ConferenceData;

                                    <span class="kwrd">if</span> (c == <span class="kwrd">null</span>)
                                    {
                                        WriteLine(<span class="str">&quot;xxx No conference data downloaded, skipping&quot;</span>);
                                    }
                                    <span class="kwrd">else</span>
                                    {
                                        <span class="kwrd">if</span> (SaveToDatabase(c))
                                        {
                                            ea.Success = <span class="kwrd">true</span>;
                                        }
                                    }
                                    UpdateFinished(<span class="kwrd">null</span>, ea);
                                    isUpdating = <span class="kwrd">false</span>;
                                }
    );</pre>
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
<p>And the method that calls it:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">void</span> GetConference (<span class="kwrd">string</span> url, Action action)
{
    var webClient = <span class="kwrd">new</span> WebClient ();
    Debug.WriteLine (<span class="str">&quot;Get remote data for conference&quot;</span>);
    webClient.DownloadStringCompleted += (sender, e) =&gt;
    {
        <span class="kwrd">try</span> 
        {
            var r = e.Result;
            ConferenceData = DeserializeConference (r);
        } <span class="kwrd">catch</span> (Exception ex) {
            Debug.WriteLine (<span class="str">&quot;ERROR deserializing downloaded conference XML: &quot;</span> + ex);
        }
        action();
    };
    webClient.Encoding = System.Text.Encoding.UTF8;
    webClient.DownloadStringAsync (<span class="kwrd">new</span> Uri (url));
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>I noticed the “action();” call and could not figure out where that was coming from until I noticed it was the second paramter of GetConference().&#160; Then, I looked at the call (first chunk of code) and there was a delegate!</p>
<p>Very cool.&#160; I feel like I should have know this but none the less, I do know.</p>
