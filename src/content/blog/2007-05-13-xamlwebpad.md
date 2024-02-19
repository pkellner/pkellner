---
status: publish
published: true
pubDatetime: 2007-05-13T20:00:00.000Z
title: XamlWebPad, View Your Raw Silverlight XAML without Blend or VS.
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  <p>XamlWebPad is a free tool build by Peter Kellner that allows you to see your own Silverlight Xaml rendered.  Because
  Blend does not give us an easy way to tell what tags are in the Silverlight WPF subset, this tool makes working with a
  Xaml designer much easier.  The designer can now check there work before sending it back to a developer.</p>
  <a href="/">
  <img src="/wp/Images/misc/xamlwebpadt.jpg" alt="https://peterkellner.net" class="style1" />
  </a>
wordpress_id: 61
wordpress_url: https://peterkellner.net/2007/05/13/xamlwebpad/
date: '2007-05-13 09:37:41 -0700'
date_gmt: '2007-05-13 16:37:41 -0700'
categories:
- Silverlight
tags: []
---
<h2>Introduction</h2>
<p><a href="http://silverlight.net/Default.aspx">Silverlight</a>, is the new name for WPF/E which was formally introduced at the&#160; <a href="http://www.visitmix.com/">MIX07</a> conference in Las Vegas a couple weeks ago.&#160; Basically, it's a stripped down version of full WPF Xaml that works on the web by installing a custom plug-in in them most popular browsers in a similar way to how flash works.&#160; The great thing about this technology is that it works cross platform.&#160; Mac's, Linux, etc.&#160; The other major announcement at MIX07&#160; was that it supports programming in .NET.&#160; This means that Silverlight applications can be developed in c#, my favorite programming language.&#160; I'm not that great a JavaScript so this is great news for me because I want to be able to build highly interactive applications, and so far, with asp.net and little JavaScript, this has&#160; been very limiting for me personally. <!--more--> </p>
<p><strike>For those not wanting to read on and just try it, here is the link:&#160; http://xamlwebpad.peterkellner.net/</strike></p>
<p>There is another application that you might try:&#160; <a href="http://blogs.msdn.com/silverlight_sdk/archive/2007/05/13/Using-Silverlight-Pad-to-Test-XAML-Content.aspx">Silverlight Pad</a>(Updated 4/19/2008 Peter Kellner)</p>
<h2>My First Production Silverlight Project</h2>
<p>Fast forwarding to now, I'm currently building my first production Silverlight application.&#160; Believe it or not, my JavaScript skills are significantly better than my actual design skills.&#160; Fortunately, XAML allows me to more easily work with a professional designer who can provide me with Xaml.&#160; I've been very fortunate in this current project to be working with an outstanding designer, who like me, is just learning the new Silverlight platform.&#160; We are of course using the latest beta of   </p>
<p>Blend which is very helpful.&#160; There is a problem however.&#160; While the May Beta of Blend provides help in using the correct subset of xaml for Silverlight, it does not give you any errors if you import Xaml from other sources (such as Adobe Illustrator exports).&#160; This means, you feel like you have good Xaml but you really don't.</p>
<h2>We are not in Kansas anymore</h2>
<p>So, how is this a problem?&#160; The problem shows up when the designer hands off code to the programmer (me in this case).&#160; The code doesn't work and when I send it back to the designer, he has no good way of fixing it.&#160; Microsoft has acknowledged this as a problem and my guess is that in an upcoming release (beta or production) of Blend, they will have something that shows errors if you set your xaml to &quot;Silverlight Mode&quot;.&#160; for now though, what do do?</p>
<h2>XamlWebPad to the rescue</h2>
<p>In comes the new <a href="https://peterkellner.net">XamlWebPad (obsolete)</a>! Though you can suggest to the designer that he or she review the <a href="http://msdn2.microsoft.com/en-us/library/bb188567.aspx">Silverlight SDK</a> for what tags to use, you will likely not be very popular. It would be very painful to go tag by tag and figure out what works and what doesn't.&#160; To make the designer's life easier, I've created a simple web app using asp.net 2.0 and Silverlight that lets the designer cut and paste their code into a textbox and then press the &quot;Process    <br />XAML&quot; button and see how it will render.&#160; If there are errors, a MessageBox will pop up showing the errors (one at a time, sorry) with the tags that did not work.</p>
<h2>Is XamlWebPad Perfect or even done?</h2>
<p>Most certainly it's not perfect, or even done (time permitting).&#160; I wrote it on a plane ride from Miami returning from my <a href="/2007/05/10/vslive06gadgets/">Gadget Presentation at VSLive in Orlando</a> last week.&#160; One glaring hole is that it does not support showing images.&#160; <br />That is because you are only uploading your Xaml, not your images.&#160; If you really want to see an image, you can of course point your image to a remote source as I've pasted below.&#160; Then you will see it working but you will have to change it to a relative image in your final Xaml most likely.&#160; It's not a very pretty app, but it does the job.&#160; Feel free to use it and certainly post suggestions to the comments of this blog post.</p>
<div class="csharpcode">
<pre class="alt"><span class="kwrd">&lt;</span><span class="html">canvas</span> <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/client/2007"</span></pre>
<pre>    <span class="attr">xmlns:x</span><span class="kwrd">="http://schemas.microsoft.com/winfx/2006/xaml"</span></pre>
<pre class="alt">    <span class="attr">Width</span><span class="kwrd">="640"</span> <span class="attr">Height</span><span class="kwrd">="480"</span><span class="kwrd">&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">textblock</span> <span class="attr">Width</span><span class="kwrd">="253"</span> <span class="attr">Height</span><span class="kwrd">="72"</span> <span class="attr">Canvas</span>.<span class="attr">Left</span><span class="kwrd">="28"</span> <span class="attr">Canvas</span>.<span class="attr">Top</span><span class="kwrd">="81"</span> <span class="attr">Text</span><span class="kwrd">="TextBlock"</span></pre>
<pre class="alt">     <span class="attr">TextWrapping</span><span class="kwrd">="Wrap"</span><span class="kwrd">/&gt;</span></pre>
<pre>    <span class="kwrd">&lt;</span><span class="html">path</span> <span class="attr">Fill</span><span class="kwrd">="#FFFFFFFF"</span> <span class="attr">Stretch</span><span class="kwrd">="Fill"</span> <span class="attr">Stroke</span><span class="kwrd">="#FF000000"</span> <span class="attr">Width</span><span class="kwrd">="205.027"</span></pre>
<pre class="alt">     <span class="attr">Height</span><span class="kwrd">="52.03"</span> <span class="attr">Canvas</span>.<span class="attr">Left</span><span class="kwrd">="45.5"</span></pre>
<pre>       <span class="attr">Canvas</span>.<span class="attr">Top</span><span class="kwrd">="98.47"</span> <span class="attr">Data</span><span class="kwrd">="M46,150 C257,73 250,106 250,106"</span><span class="kwrd">/&gt;</span></pre>
<pre class="alt">    <span class="kwrd">&lt;</span><span class="html">image</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span></pre>
<pre>      <span class="attr">Source</span><span class="kwrd">="https://peterkellner.net/wp/wp-content/themes/arzel_xt2/images/bearflag.jpg"</span></pre>
<pre class="alt">      <span class="attr">Stretch</span><span class="kwrd">="Fill"</span><span class="kwrd">/&gt;</span></pre>
<pre><span class="kwrd">&lt;/</span><span class="html">canvas</span><span class="kwrd">&gt;</span></pre>
</div>
<p>Feel free to use it as much as you want and good luck with your Silverlight projects.&#160; Look for my posts on the forums and I will of course be looking for yours.&#160; The crew at Silverlight asked me to be a moderator at the <a href="http://silverlight.net/forums/">Silverlight forums</a> I guess because they think because I'm a moderator on the <a href="http://forums.asp.net/">asp.net forums</a> I know what I'm doing.&#160; It's a great place to get answers, and the more of us that use it, the more useful it will be.</p>
<p>There is another application that you might try:&#160; <a href="http://blogs.msdn.com/silverlight_sdk/archive/2007/05/13/Using-Silverlight-Pad-to-Test-XAML-Content.aspx">Silverlight Pad</a>(Updated 4/19/2008 Peter Kellner) Happy coding.</p>
<p><a href="/"><br />
    <br /><img class="style1" alt="https://peterkellner.net" src="/wp/wp-content/uploads/2007/05/xamlwebpad.jpg" /></p>
<p></a></p>
<p>(Above is a screen shot of what the web page looks like.&#160; Click on it to be taken to the real deal)</p>
