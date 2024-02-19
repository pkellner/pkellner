---
status: publish
published: true
pubDatetime: 2012-08-31T20:00:00.000Z
title: Using LINQ ForEach To Populate Generic List in C# AND Enum to List
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2222
wordpress_url: https://peterkellner.net/?p=2222
date: '2012-08-31 07:00:50 -0700'
date_gmt: '2012-08-31 14:00:50 -0700'
categories:
- C#
- Visual Studio
- Lambda
tags: []
---
<p>A <a href="http://en.wikipedia.org/wiki/C_Sharp_(programming_language)">C#</a> trick I first had trouble wrapping my head around is using the LINQ ForEach operator to populate a list.  I was originally inspired by some source I found in the <a href="http://examples.ext.net/#/Miscellaneous/Icon/Icon_Summary/">EXT.NET Icon building sample</a>.   In addition to the ForEach <a href="http://en.wikipedia.org/wiki/Anonymous_function#C_lambda_expressions">lamda</a> trick they included a very nice pattern for converting a c# Enum to a List.  So, let’s get right to the code.</p>
<p>&nbsp;</p>
<pre class="csharpcode"><span class="kwrd">enum</span> Days { Sat = 1, Sun, Mon, Tue, Wed, Thu, Fri };
<span class="kwrd">static</span> <span class="kwrd">void</span> Main(<span class="kwrd">string</span>[] args)
{
    List&lt;<span class="kwrd">string</span>&gt; daysOfWeekList = Enum.GetNames(<span class="kwrd">typeof</span>(Days)).ToList();
    daysOfWeekList.ForEach(a =&gt; Console.WriteLine(a));
}</pre>
<p>&nbsp;</p>
<p>That’s it!   Just another two patterns of using c# which helps me live cleaner in c#!</p>
<p>HTH’s.</p>
