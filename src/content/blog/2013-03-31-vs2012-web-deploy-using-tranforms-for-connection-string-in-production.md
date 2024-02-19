---
status: publish
published: true
pubDatetime: 2013-03-31T20:00:00.000Z
title: VS2012 Web Deploy, Using Transforms For Connection String In Production (Web.Config)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3552
wordpress_url: https://peterkellner.net/?p=3552
date: '2013-03-31 12:10:44 -0700'
date_gmt: '2013-03-31 19:10:44 -0700'
categories:
- VS2010
- ASP.net
- ASP.NET 4.5
- Visual Studio 2012
- VS2012
- Deployment
tags:
- asp.net performance
---
<p>&nbsp;</p>
<h2>Introduction</h2>
<p>I should have learned this a long time ago.  I certainly have known about it since VS2010 when it was introduced, I’ve read about it multiple times, I just thought I did not have the time to learn it so for the past couple years, I’ve been making one <a href="http://msdn.microsoft.com/en-us/library/k8x4ket8(v=vs.80).aspx">web.config</a> change after another and of course making all the stupid little mistakes we all make (I think) when we do things manually.</p>
<p>So, in 25 minutes this morning, I updated my <a href="http://siliconvalley-codecamp.com">http://siliconvalley-codecamp.com</a> site with Web.Config transforms so now, when I “publish” with Visual Studio 2012 I just pick the correct profile (either beta4 or svccprod) and when I do the publish command, I get the correct database connection strings.  svcodecamptest for beta4 and svcodecamp for production.  Here is what I’ mean, then I will go into more details to show just how simple it really is.</p>
<table width="800" border="0" cellspacing="0" cellpadding="10">
<tbody>
<tr>
<td valign="top" width="400">Deploy To Production</td>
<td valign="top" width="400">Deploy To Test</td>
</tr>
<tr>
<td valign="top" width="400"><a href="/wp/wp-content/uploads/2013/03/image19.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb17.png" width="244" height="191" border="0" /></a></td>
<td valign="top" width="400"><a href="/wp/wp-content/uploads/2013/03/image20.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb18.png" width="244" height="192" border="0" /></a></td>
</tr>
<tr>
<td colspan="2" valign="top" width="400"><a href="/wp/wp-content/uploads/2013/03/image21.png"><img style="display: inline; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb19.png" width="400" height="172" border="0" /></a></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<h2>Nuts and Bolts</h2>
<p>To make the above a reality, it is really quite simple.  Here are the steps (and for a more complete description, read here:  <a href="http://msdn.microsoft.com/en-us/library/dd465318(v=vs.100).aspx">http://msdn.microsoft.com/en-us/library/dd465318(v=vs.100).aspx</a> (that is where I learned it in under 30 minutes).</p>
<p>First, create two new configuration profiles.  In my case I just used the nice wizard that says copy an existing profile.  I copied the release profile.  The screen shot is something like this:</p>
<p><a href="/wp/wp-content/uploads/2013/03/image22.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb20.png" width="347" height="251" border="0" /></a></p>
<p>In the “Active solution configuration” dropdown, the last choice is “create new” and from there you can create a new configuration copying an existing one.  My current one shown is “beta4”.</p>
<p>Then, go to your <a href="http://www.microsoft.com/visualstudio/eng/office-dev-tools-for-visual-studio">vs2012</a> solution explorer, right click on your real web.config and choose “Add Config Transform”.  It will be highlighted if you have a new one like you added above (I’ve already added my transforms).</p>
<p><a href="/wp/wp-content/uploads/2013/03/image23.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb21.png" width="494" height="347" border="0" /></a></p>
<p>Now, this next step is the really cool easy part if I had known about I would have done a long time ago.  All you have to do is copy the section you want in this particular configuration (and will be web deployment) your named config and add 2 attributes to that xml (for that named config).  Wow!, that’s it.  I feel so stupid for thinking this was going to be some XSLT transform learning party before I could use this.</p>
<p><a href="/wp/wp-content/uploads/2013/03/image24.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb22.png" width="452" height="194" border="0" /></a></p>
<p>Finally, you go to your publish wizard from your “Project” and say “Publish”, make sure you have a configuration set for each server you want to publish to as follows (I’m showing my production one)</p>
<p><a href="/wp/wp-content/uploads/2013/03/image25.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb23.png" width="445" height="349" border="0" /></a></p>
<p>And that is it!</p>
<p>&nbsp;</p>
<h2>Conclusions</h2>
<p>I’m annoyed I did not learn this 2 years ago.</p>
