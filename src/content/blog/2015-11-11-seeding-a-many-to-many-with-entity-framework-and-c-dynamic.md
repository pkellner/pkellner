---
status: publish
published: true
pubDatetime: 2015-11-11T20:00:00.000Z
title: Seeding a Many to Many With Entity Framework and C# Dynamic
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4350
wordpress_url: https://peterkellner.net/?p=4350
date: '2015-11-11 09:34:23 -0800'
date_gmt: '2015-11-11 16:34:23 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>In the previous post, we created a single table (speakers) with <a href="https://msdn.microsoft.com/en-us/data/aa937723">Entity Framework</a> Code First from a JSON file with <a href="https://www.visualstudio.com/en-us/products/vs-2015-product-editions.aspx">Visual Studio 2015</a>.&#160; Now we will add a sessions table that has a many to many relationship to the speakers table.&#160; That is, speakers can have multiple sessions and sessions can have multiple speakers.&#160; We do that but simply creating another entity (sessions) and add to it a List of speakers and then adding to the existing speakers table a list of sessions.&#160; The new table (models) look as follows.</p>
<p>GitHub Repo: <a title="https://github.com/pkellner/EntityFrameworkSeedFromJSON" href="https://github.com/pkellner/EntityFrameworkSeedFromJSON">https://github.com/pkellner/EntityFrameworkSeedFromJSON</a></p>
<pre lang="cs" class="class">public class Session
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string DescriptionShort { get; set; }
    public string Description { get; set; }

    public virtual List Speakers { get; set; }
}

public class Speaker
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ImageUrl { get; set; }
    public string WebSite { get; set; }
    public string Bio { get; set; }
    public bool AllowHtml { get; set; }
    public int PictureId { get; set; }

    public virtual List Sessions { get; set; }
}</pre>
<p>Then,&#160; we need to add sessions data (from the <a href="http://json.org">JSON</a> file) but when we add the sessions, we need to add the speakers records associated with each session.&#160; That is, we simply populate the List of sessions in the speaker model to make this happen.</p>
<p>One problem we ran into was that EF Code First really wants to control the Id of each record and since in our original data, the many to many relationship was maintained by original primary keys, we need to bring along the original speaker Id.&#160; We do this by simply adding an extra column to the speaker model called PictureId and set that as an attribute (column) of the speaker table.&#160; Then, we can use that to search the speakers table for the existing speakers.</p>
<p>The code below (and also in the <a href="https://github.com/pkellner/EntityFrameworkSeedFromJSON">GitHub repo</a>) basically does this for us.&#160; It again uses NewtonSoft.JSON as well as the dynamic type in c# to get the job done.</p>
<pre lang="cs" class="class">private void GetSessions(DbLocalContext context)
{
    var sessionJsonAll = 
        GetEmbeddedResourceAsString(&quot;EntityFrameworkSeedFromJSON.session.json&quot;);

    JArray jsonValSessions = JArray.Parse(sessionJsonAll) as JArray;
    dynamic sessionsData = jsonValSessions;
    foreach (dynamic session in sessionsData)
    {
        var sessionForAdd = new Session
        {
            Id = session.id,
            Description = session.description,
            DescriptionShort = session.descriptionShort,
            Title = session.title
        };

        var speakerPictureIds = new List();
        foreach (dynamic speaker in session.speakers)
        {
            dynamic pictureId = speaker.id;
            speakerPictureIds.Add((int)pictureId);
        }

        sessionForAdd.Speakers = new List();
        foreach (var speakerPictureId in speakerPictureIds)
        {
            var speakerForAdd = 
                context.Speakers.FirstOrDefault(a =&gt; a.PictureId == speakerPictureId);
            sessionForAdd.Speakers.Add(speakerForAdd);
        }

        context.Sessions.Add(sessionForAdd);
    }
}</pre>
<p>To test the results, in Program.cs we put some simple loops and Console Write's to show.</p>
<pre lang="cs" class="class">static void Main(string[] args)
{
    using (var context = new DbLocalContext())
    {
        Console.WriteLine(&quot;---SESSIONS---&quot;);
        var sessions = context.Sessions.ToList();
        foreach (var session in sessions)
        {
            Console.WriteLine(&quot;Session: &quot; + session.Title);
            foreach (var speaker in session.Speakers)
            {
                Console.WriteLine(&quot;---{0} {1} {2}&quot;,
                    speaker.FirstName, speaker.LastName, speaker.PictureId);
            }
        }
        Console.WriteLine(&quot;&quot;);
        Console.WriteLine(&quot;---SPEAKERS---&quot;);
        var speakers = context.Speakers.ToList();
        foreach (var speaker in speakers)
        {
            Console.WriteLine(&quot;{0} {1} {2}&quot;,
                speaker.FirstName, speaker.LastName, speaker.PictureId);
            foreach (var session in speaker.Sessions)
            {
                Console.WriteLine(&quot;---{0}&quot;,
                session.Title);
            }
        }

    }

}</pre>
<p>HTH's</p>
