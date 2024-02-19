---
status: publish
published: true
pubDatetime: 2015-02-18T20:00:00.000Z
title: ReSharper Continues to Make My Life Easier as a Programmer
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4182
wordpress_url: https://peterkellner.net/?p=4182
date: '2015-02-18 08:19:09 -0800'
date_gmt: '2015-02-18 15:19:09 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>Again, it happened.&#160; I was about go searching the web for the string format parameters to figure out how to format just the day of the week.&#160; I type some code like this:</p>
<pre lang="cs" title="C# Code" >
if (r.StartTime.HasValue)
{
    r.StartTimeFriendlyDay = r.StartTime.Value.DayOfWeek.ToString();
    r.StartTimeFriendlyTime = r.StartTime.Value.ToString(&quot;h:mm tt &quot;);
    r.StartTimeDayOfWeek = r.StartTime.Value.ToString(&quot;&quot;)
}
</pre>
<p>And up pops up the below screen from <a href="https://www.jetbrains.com/resharper/">JetBrains Resharper</a> giving my choices for ToString(). Very nice! Just sayin...</p>
<p><a href="/wp/wp-content/uploads/2015/02/image2.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/02/image_thumb2.png" width="610" height="274" /></a></p>
