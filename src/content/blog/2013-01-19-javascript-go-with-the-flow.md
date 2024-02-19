---
status: publish
published: true
pubDatetime: 2013-01-19T20:00:00.000Z
title: JavaScript, Go With the Flow!
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3394
wordpress_url: https://peterkellner.net/?p=3394
date: '2013-01-19 18:00:06 -0800'
date_gmt: '2013-01-20 01:00:06 -0800'
categories:
- JavaScript
- Sencha
- SenchaTouch
tags: []
---
<p>As a technologist gluten, I probably spend too much time on different technologies and not enough time on any one particular one.&#160; It does find me often frustrated with seemingly basic things that should take little time to solve.&#160; Recently, a friend sent me a quote which sadly applies to me too much.</p>
<blockquote><p>To be successful as a programmer, you, first and foremost, have to be a nerd.&#160; You were probably born that way, but in any case, you already know if you are.&#160; You are the kind of person who can stare at a screen for 14 hours puzzling over why the damn call to xref = malloc(len); is not accompanied by the appropriate call to free(xref); about 1 out of 100,000 times, and that’s why the frigin fuel injector hangs up on the new Mazda – and feel refreshed, energized, and dying for more.&#160; Not everyone can – or wants – to do this. </p>
</blockquote>
<p>Anyhow, where was I.&#160; Oh yeah, <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> and going with the flow.&#160; I’m pushing to get a <a href="http://www.sencha.com/products/touch">SenchaTouch</a> app done right now so I can make the January 21st deadline for putting a Blackberry 10 app together and getting it into there store.&#160; I’m close! (I think).&#160; I find myself staring at the following code that I’ve written.&#160; Basically, I’m taking data that I got from a web service and updating a screen full of fields.&#160; First, I DeRef all the data into local variables, then I set that data in the panel (form).</p>
<pre class="csharpcode"><span class="kwrd">var</span> customerFullName = obj.Data.CustomerFullName;
<span class="kwrd">var</span> cumulativeStarBalance = obj.Data.CumulativeStarBalance;
<span class="kwrd">var</span> cardDollarBalance = obj.Data.CardDollarBalance;
<span class="kwrd">var</span> numStarsTillNextDrink = obj.Data.NumStarsTillNextDrink;
<span class="kwrd">var</span> numUnredeemedRewards = obj.Data.NumUnredeemedRewards;

<span class="kwrd">var</span> goldCardPanel = Ext.getCmp(<span class="str">&quot;GoldCardPanelId&quot;</span>); 
goldCardPanel.setData({
    customerFullName: customerFullName,
    cumulativeStarBalance: cumulativeStarBalance,
    cardDollarBalance: cardDollarBalance,
    numStarsTillNextDrink: numStarsTillNextDrink,
    numUnredeemedRewards: numUnredeemedRewards
});</pre>
<p>I start to notice that I’m repeating myself kind of so I’m thinking maybe I only need to do this once and I can half the size of the code.&#160; Then I say to myself, Self: does it really matter that our template uses lower case and not upper case variables? (obvious answer is no, I often talk to myself in rhetorical questions).</p>
<p>So, the rewrite is this:</p>
<pre class="csharpcode">Ext.getCmp(<span class="str">&quot;GoldCardPanelId&quot;</span>).
    setData(Ext.decode(response.responseText).Data);</pre>
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
<p>Just Sayin…</p>
