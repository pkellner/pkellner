---
status: publish
published: true
pubDatetime: 2016-05-06T20:00:00.000Z
title: Using Type T for making C# Method Calls More Flexible
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4406
wordpress_url: https://peterkellner.net/?p=4406
date: '2016-05-06 11:12:06 -0700'
date_gmt: '2016-05-06 18:12:06 -0700'
categories:
- C#
- Visual Studio 2015
tags: []
---
<p>I often find myself getting lazy and making multiple entry points for a method when I really should spend an extra 30 seconds and use the Type T pattern in C#.&#160; Below are the two calls I had and when I started writing the one that returns int, I decided enough was enough.</p>
<pre lang="c#">private static bool GetWorkshopTopLevelPropertyBool(JToken jToken, string attr2)
{
    return jToken[&quot;workshopResults&quot;][attr2].Value<bool>();
}

private static string GetAttendeeInfoString(JToken jToken, string attr)
{
    return jToken[&quot;attendeeResults&quot;][attr].Value<string>();
}
</pre>
<p>Here is the generalized verison of the same code but only has to be written once.</p>
<pre lang="c#">private static T GetAttendeeInfo<t>(JToken jToken, string attr)
{
    return jToken[&quot;attendeeResults&quot;][attr].Value<t>();
}</pre>
<p><b>HTH's</b></p>
