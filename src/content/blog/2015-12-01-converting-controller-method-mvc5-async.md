---
status: publish
published: true
pubDatetime: 2015-12-01T20:00:00.000Z
title: Converting a Controller Method in MVC5 to async
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4366
wordpress_url: https://peterkellner.net/?p=4366
date: '2015-12-01 10:49:11 -0800'
date_gmt: '2015-12-01 17:49:11 -0800'
categories:
- C#
- Visual Studio 2015
- async
tags: []
---
<p>I’m currently working on a Pluralsight course on ASP.NET and I have to admit I’m slow to adopt async methods in my code because it feels a little complex when non-async code is what I’m use to.  I’m feeling like since I’m doing this Pluralsight course I should really show best practices and clearly async controller methods is no doubt a best practice.</p>
<p>I’m surprised it was actually so easy.  First, let me show you the code that I had written that is not async that I’m sure you are all familiar with.</p>
<pre lang="c#">public ActionResult Index()
{
    using (var context = new MultiTenantContext())
    {
        var speakers = Utils.FilterSpeakersByTenant(context.Speakers.ToList(), Tenant.Name);

        foreach (var speaker in speakers)
        {
            speaker.ImageUrl = $"/Content/Images/Speakers/Speaker-{speaker.PictureId}-75.jpg";
            var sessions =
                speaker.Sessions.
                    Where(a =&gt; a.TenantName == Tenant.Name).
                    OrderBy(a =&gt; a.Title).ToList();
            speaker.Sessions = sessions;
        }
        return View("Index", "_Layout", speakers);
    }
}</pre>
<p>All I had to change (besides adding the async name space for Task) was to have speakers return a task with the ToListAsync method and change the signature of the method to return a task. Here is the updated code that is now fully async.</p>
<pre lang="c#">public async Task Index()
{
    using (var context = new MultiTenantContext())
    {
        var speakers = await context.Speakers.ToListAsync();
        foreach (var speaker in speakers)
        {
            speaker.ImageUrl = $"/Content/Images/Speakers/Speaker-{speaker.PictureId}-75.jpg";
            var sessions =
                speaker.Sessions.
                    Where(a =&gt; a.TenantName == Tenant.Name).
                    OrderBy(a =&gt; a.Title).ToList();
            speaker.Sessions = sessions;
        }
        return View("Index", "_Layout", speakers);
    }
}</pre>
