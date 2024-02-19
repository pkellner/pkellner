---
status: publish
published: true
pubDatetime: 2013-02-04T20:00:00.000Z
title: Sencha&rsquo;s Architect&rsquo;s Perfect Storm, Easy To Use and Incorporates
  Hand Written Code Gracefully
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3432
wordpress_url: https://peterkellner.net/?p=3432
date: '2013-02-04 13:49:38 -0800'
date_gmt: '2013-02-04 20:49:38 -0800'
categories:
- Community
- JavaScript
- Sencha
- Sencha Architect 2
- comm
tags: []
---
<h3>Introduction</h3>
<p>Wednesday night this week, our local <a href="http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/100664592/">meetup</a> (happening at <a href="http://www.sencha.com/contact">Sencha’s headquarters in Redwood City</a>) is featuring the Sencha Architect engineers who are here from all over the world for a get together.&#160; Personally, I’ve been using <a href="http://www.sencha.com/products/architect/">Sencha Architect</a> (SA) for well over a year now and am hugely impressed.&#160; </p>
<p>Yesterday, for the first time I felt a need to go beyond what SA offered and for the first time decided to “override” an ExtJS object (store in this case) with my own code.&#160; It’s now a trick I own!&#160; Explanation of why we did it, what we did, and what to look out for if you do it yourself in the future.</p>
<p>&#160;</p>
<h3>Why We Did It</h3>
<p>As many of you know, in addition to being the primary organizer of Silicon Valley Code Camp, I’ve also built most of the web site <a title="http://www.siliconvalley-codecamp.com/" href="http://www.siliconvalley-codecamp.com/">http://www.siliconvalley-codecamp.com/</a>.&#160; Over the years, as we have gone from 55 sessions and 377 attendees to now, over 200 sessions and 2500 attendees, the web site has become quite constraining.&#160; The year, we are completely refreshing the web site.&#160; </p>
<p>Probably the most painful screen is the current sessions screen.&#160; Actually, it’s in about 5 places (most people only know 2 or 3 of them which is a big problem).&#160; So, to that end, the sessions screen we are redesigning needs to be not only drop dead gorgeous, it has to be performant, and it has to play well with SEO.&#160; Our strategy is two fold.&#160; First, we worked with professional UI folks to get some good requirements, second we hired a professional designer to create the art work, and finally, we need to implement it to be blazingly fast.&#160; </p>
<p>Our strategy is to let the user swap between gorgeous layout that shows sessions list (see below), and a high performance ExtJS grid to actually make it useful.&#160;&#160; See Screen shots below (we will make the ExtJS much prettier and more sophisticated later).</p>
<p>&#160;</p>
<table cellspacing="20" cellpadding="2" width="400" border="0">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2013/02/image.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb.png" width="225" height="244" /></a> </td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2013/02/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb1.png" width="211" height="244" /></a> </td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<h3>What We Did</h3>
<p>We did not want to download the data twice so what we do is let the DOM get full populated for display, then, to switch to Sencha’s <a href="http://www.sencha.com/products/extjs/">ExtJS</a> we do no data connectivity to the web and simply parse the DOM to a <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> array, then using ExtJS (built with Sencha Architect) running in an IFrame, we grab the JavaScript array and use it as the datasource for the <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.ArrayStore">ExtJS Array Store</a>.&#160; </p>
<p>&#160;</p>
<h4>Sencha Architect ArrayStore Integration</h4>
<p>I’m guessing someone will point out to me that we did not need to extend the ExtJS store to solve this problem, but none the less, that is how we solved it.&#160; The problem as I see it is that in SA, when you define the data associated with an Array Store, there seems no way to associate that with a function. Just static data.</p>
<p>To explain further, what I mean is that when you try and specify the data property of an ExtJS store to a function (as I have done in the below picture), you find that SA wraps the function in quotation marks.&#160; To define a function, you need to not have quotation marks.</p>
<table cellspacing="20" cellpadding="2" width="400" border="0">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2013/02/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb2.png" width="345" height="331" /></a></td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2013/02/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb3.png" width="244" height="217" /></a>          <br /><a href="/wp/wp-content/uploads/2013/02/image4.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb4.png" width="244" height="202" /></a> </td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>So, to solve this, my solution was to override the store and create my own function in that override.&#160; </p>
<p>&#160;</p>
<h4>Overriding a Store With Sencha Architect</h4>
<p>First step is to select the store you want to overwrite.&#160; In my case, the store is named SessionStore1. Then, you click the “Create Override” button as follows.</p>
<p><a href="/wp/wp-content/uploads/2013/02/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb5.png" width="450" height="202" /></a> </p>
<p>Then, in my case I wanted to create my own proxy and reader so I deleted the generated proxy and reader for that store (right mouse button on them and select delete).</p>
<p>Now, I’ve got my override created so I just need to switch to it.&#160; click the chevron on the “Generated Class” dropdown and switch to the override class.</p>
<p><a href="/wp/wp-content/uploads/2013/02/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb6.png" width="329" height="230" /></a> </p>
<p>&#160;</p>
<p>By default, you get a pretty thin implementation that does not change the behavior of your store. It looks like the following:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/02/image7.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb7.png" width="358" height="113" /></a> </p>
<p>&#160;</p>
<p>So, what we want to happen is that this class will add information (JavaScript config) to the underlying object (store in my case). Specifically, I’m wanting to create my own data associated with the store.&#160; So, here is what my revised code looks like:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2013/02/image8.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image_thumb8.png" width="420" height="323" /></a> </p>
<p>Things to notice here are that I’ve created a new constructor.&#160; That constructor sets properties (including the data property) to be what ever I want.&#160; Then, it simply calls the parent and continues on.&#160; </p>
<p>Another side benefit is that this override class is no under my complete control.&#160; SA does not claim to own it and best thing is I can use my own editor for working on this file (my editor of choice is <a href="http://www.microsoft.com/visualstudio/eng/team-foundation-service">Visual Studio</a> with <a href="http://www.jetbrains.com/resharper/">ReSharper</a> because of the really nice editing and lint capabilities.&#160; I never drop a comma any more).</p>
<p>&#160;</p>
<h3>Things To Look Out for</h3>
<p>One gotcha is that it’s critical that when you edit this override file outside of SA that you close SA.&#160; SA seems to want to overwrite your changes everytime you save.&#160; Ouch.</p>
<p>&#160;</p>
<h3>Conclusions</h3>
<p>I’ve not got the best of both worlds.&#160; I can build ExtJS and SenchaTouch apps quickly. I don’t need to remember a ton of options on every control, I’ve got great WSIWIG layout management, and best of all, when I need to get down and dirty with the code I can.</p>
<p>Don’t forget, Meetup with the Sencha Architect Design team Wednesday night this week! I hope you can make it.&#160; See you there.</p>
<p><a href="http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/100664592/"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/02/image9.png" width="244" height="116" /></a> </p>
<p><a title="http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/100664592/" href="http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/100664592/">http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/100664592/</a></p>
