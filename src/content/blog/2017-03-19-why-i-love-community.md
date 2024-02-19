---
status: publish
published: true
pubDatetime: 2017-03-19T20:00:00.000Z
title: Why I Love the Community and How It Helps Me
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4444
wordpress_url: https://peterkellner.net/?p=4444
date: '2017-03-19 09:13:38 -0700'
date_gmt: '2017-03-19 16:13:38 -0700'
categories:
- ASP.NET 2.0
- Community
- stackoverflow
- Microsoft MVP Program
tags:
- MVP
- Community
---
<h3>Some History</h3>
<p>For much of my career, I’ve worked at home as a team of one.  Many years ago, I learned that <strong>it takes a community</strong>.  I’ve always felt one of my strengths is to both reach out when I need help, and offer help when it’s needed.  In about 2005, I started doing a lot of work with the .Net stack and discovered the forums <a title="https://forums.asp.net/" href="https://forums.asp.net/">https://forums.asp.net/</a>.</p>
<p>As I was learning ASP.NET, I found myself asking a lot of questions in <a href="https://forums.asp.net/">that forum</a>.  The group was unbelievably helpful and supportive.  Having done a lot of Unix work previously, I’d had a lot of reprimands for incorrect questions so it was very uplifting for me. As I became more proficient in the .Net stack I started answering questions also.  My personal goal was to answer one question for every one I asked.</p>
<p>Though I’ve not been active in that forum for a while, it’s still a great place, and I’m proud to ultimately have been asked to be a moderator as well as achieving All-Star status, which I’m sure is based on the my 15,384 points which included my answers being marked as correct 10,200 times.</p>
<p>[caption id="" align="alignnone" width="352"]<a href="https://forums.asp.net/members/pkellner.aspx"><img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="forums1" src="/wp/wp-content/uploads/2017/03/forums1.png" alt="forums.asp.net profile" width="352" height="255" border="0" /></a> My Forums.ASP.NET Profile[/caption]</p>
<p>&nbsp;</p>
<p>Eleven years ago, the <a href="https://www.mvp.microsoft.com/en-us/">Microsoft MVP Program</a> must have noticed my activity here, as well as an event I’ve been the primary organizer for the past 11 years called <a href="https://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp</a>, where we have hundreds of speakers from the community, hundreds of volunteers, many corporate sponsors and thousands of attendees all coming together to learn and share.  I believe it’s been the biggest and longest running free technology focused community event in the world.</p>
<h3>So, what motivated me to write this post today?</h3>
<p>I’m in the midst of building my upcoming <a href="https://app.pluralsight.com/profile/author/peter-kellner">Pluralsight </a>video course (my 5th) on <a href="https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/authoring">ASP.NET Core Tag Helpers</a>.  I’m trying to explain how the HtmlTargetElement’s query selector parameter works, and I needed an example of a car model name that is shared by two manufacturers.  I found a csv file that had 9000 car makes and models but could not (based on visual scanning) figure out a model that met what I needed.</p>
<p>I posted my question on <a href="http://stackoverflow.com/questions/42888139/need-query-to-figure-out-when-car-model-name-shared-by-two-makes/42888254?noredirect=1#comment72878755_42888254">StackOverflow</a></p>
<p>[caption id="" align="alignnone" width="397"]<a href="http://stackoverflow.com/questions/42888139/need-query-to-figure-out-when-car-model-name-shared-by-two-makes/42888254?noredirect=1#comment72878755_42888254"><img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border: 0px;" title="forum2" src="/wp/wp-content/uploads/2017/03/forum2.png" alt="My StackOverflow post that inspired this article" width="397" height="229" border="0" /></a> My StackOverflow post that inspired this article[/caption]</p>
<p>&nbsp;</p>
<p>Literally within 5 minutes a user with the handle <a href="http://stackoverflow.com/users/2333499/sqlzim">@SqlZim</a> gave me almost the perfect answer.  After a short comment exchange, I got the perfect answer, learned something new, and had my problem solved.  Plymouth and Ford both made a model named Laser. (among about 80 other matches).</p>
<pre lang="sql">select make, model
from t
where exists (
  select 1
  from t as i
  where i.model=t.model
    and i.make&lt;&gt;t.make
)</pre>
<p>&nbsp;</p>
<p>Well, back to my Pluralsight course script writing.  Thanks for listening, and most of all, thanks for being part of <strong>my community</strong> this early Sunday morning in March.</p>
