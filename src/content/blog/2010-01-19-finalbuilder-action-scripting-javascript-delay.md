---
status: publish
published: true
pubDatetime: 2010-01-19T20:00:00.000Z
title: How To Set Arbitrary Delay Into FinalBuilder Script (Using Variable)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 403
wordpress_url: https://peterkellner.net/2010/01/19/finalbuilder-action-scripting-javascript-delay/
date: '2010-01-19 09:55:12 -0800'
date_gmt: '2010-01-19 16:55:12 -0800'
categories:
- Finalbuilder
tags: []
---
<p> I’ve <a href="/2009/11/02/finalbuilder-review-svn-buildsystems/">blogged</a> before about how much I like <a href="http://www.finalbuilder.com/finalbuilder.aspx">FinalBuilder</a> from <a href="http://www.finalbuilder.com/">VSoft Technologies</a>.&#160; One thing that I’m really happy with is how good there forum support is.&#160; They are down under which means that there is a timezone issue for me (I’m in California) which means that usually when I have a question they are sleeping.&#160; Almost always, when I get up, my answer is waiting for me.&#160; Sometimes, I think they assume I’m more clever than I actually am and will give me answer assuming I’m a finalbuilder expert.&#160; In this blog, I’m going to elaborate on a very simple answer they gave me with pictures and arrows.</p>
<p><a href="http://www.finalbuilder.com/forums.aspx?aff=1&amp;aft=9636&amp;afv=topic">The Question On Finalbuilder Forums</a></p>
<p><em>The Delay action does not seem to let me put a %delayseconds% type variable in the counter fields for setting.&#160; I want to set the delay to x number of minutes based on some variable.&#160; How can I do that?</em></p>
<p> <!--more-->
<p>What I’m asking is I want my Finalbuilder script to pause for an arbitrary amount of time that I specify in Finalbuilder variable.&#160; The reason I want this is I use Finalbuilder scripts running through <a href="http://www.finalbuilder.com/finalbuilder-server.aspx">Finalbuilder Server</a> and often, I want my script to start after an arbitrary amount of time.&#160; Finalbuilder server allows you to run scripts on a remote server without actually having to remote in which is very nice.&#160; It also provides the ability to “prompt” you for values so you can decide at the time you launch the script, what you want it to do.</p>
<p>So, back to the problem and all the details.</p>
<p>First, in finalbuilder, you need to define a variable which I’m going to call DelayNMinutes.&#160; You start with:</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb.png" width="297" height="176" /></a></p>
<p>Then, you create your new variable called DelayNMinutes with the Add Button on the right (I’m showing what happens after you do this (I defaulted the value to 1 minute).</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb_3.png" width="418" height="293" /></a></p>
<p>Now, in your Action script, I created an “If” statement where I say “If DelayNMinutes &gt; 0”, execute the delay action.</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb_4.png" width="397" height="374" /></a></p>
<p>Now, is where it gets a little tricky.&#160; The next action “Delay” gives you a prompt with rolling numbers that does not let you put in the typical variable name that you would usually use.&#160; That is %DelayNMinutes” which is how you would normally put in a variable in Finalbuilder.</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb_5.png" width="387" height="349" /></a></p>
<p>So, you need to revert to script (which until today, I’d never done before with Finalbuilder).&#160; I’ve used JavaScript quite a bit so that’s an obvious choice for me.&#160; What you do, is you go back to the ide and single click on the “DelayNMinutes” line, select the tab on the bottom called Script Editor, Set your language to JavaScript and add the line:</p>
<p>Action.Delay = DelayNMinutes * 1000 * 60;</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb_6.png" width="541" height="373" /></a></p>
<p>Which sets the dealy in MilliSeconds as you can see from the help is in MilliSeconds (there online help is pretty good, but does often assume a higher knowledge than I actually have.&#160; For example, in this help, it might be nice to see an example of using it in script.</p>
<p><a href="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/HowToSetArbitraryDelayIntoFinalBuilderSc_7D16/image_thumb_7.png" width="410" height="276" /></a></p>
<p>Well, that’s about it.&#160; I think this is about as long as I can make this simple explanation.</p>
<p>Hope this helps!!!</p>
