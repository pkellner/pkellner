---
status: publish
published: true
pubDatetime: 2015-11-10T20:00:00.000Z
title: Seed Entity Framework Code First With JSON Using C# Dynamic
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4346
wordpress_url: https://peterkellner.net/?p=4346
date: '2015-11-10 19:52:29 -0800'
date_gmt: '2015-11-11 02:52:29 -0800'
categories:
- Visual Studio
- Entity Framework
- GIT
tags: []
---
<p>If you just want the short version, go to the this <a href="https://github.com/pkellner/EntityFrameworkSeedFromJSON">GitHub Repository</a> and you’ll find a very simple project that I’ll explain in more detail here.</p>
<p><a title="https://github.com/pkellner/EntityFrameworkSeedFromJSON" href="https://github.com/pkellner/EntityFrameworkSeedFromJSON">https://github.com/pkellner/EntityFrameworkSeedFromJSON</a></p>
<p>Below are the steps necessary to achieve converting JSON into Entity Framework Seeded data.</p>
<p>Copy the <a href="http://json.org">JSON</a> file into your Visual Studio project and make the build action (file property in VS) Embedded Resource.</p>
<p><a href="/wp/wp-content/uploads/2015/11/image13.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/11/image_thumb13.png" width="228" height="244" /></a></p>
<p>Next, find out the name of the embedded resource. If you just don’t know it or don’t want to spend time disassembling the project you can use the <a href="https://msdn.microsoft.com/en-us/library/system.reflection.assembly.getmanifestresourcenames(v=vs.110).aspx">GetManifestResourceNames</a>() method as shown below.&#160; I find that is quicker and I don’t typically have those tools loaded when I need or want then.</p>
<p><a href="/wp/wp-content/uploads/2015/11/image14.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/11/image_thumb14.png" width="729" height="338" /></a></p>
<p>Once we have the manifest name, we can get the json file as a string and then feed that through <a href="https://www.nuget.org/packages/Newtonsoft.Json/">NewtonSoft.JSON</a>.&#160; Then, using dynamic data we simply do the expected “Seed” with Entity Framework.&#160; Below is the code (as well as in the <a href="https://github.com/pkellner/EntityFrameworkSeedFromJSON">GitHub Rep</a>).</p>
<pre lang="cs" class="class">//public class MultiTenantContextInitializer : DropCreateDatabaseAlways
public class MultiTenantContextInitializer : DropCreateDatabaseAlways
{

    //https://connect.microsoft.com/VisualStudio/feedback/details/1934385
    // DropCreateDatabaseAlways  CreateDatabaseIfNotExists

    protected override void Seed(DbLocalContext context)
    {
        GetSpeakers(context);
        context.SaveChanges();
    }

    private void GetSpeakers(DbLocalContext context)
    {
        var speakerJsonAll = 
            GetEmbeddedResourceAsString(&quot;EntityFrameworkSeedFromJSON.speaker.json&quot;);

        JArray jsonValSpeakers = JArray.Parse(speakerJsonAll) as JArray;
        dynamic speakersData = jsonValSpeakers;
        foreach (dynamic speaker in speakersData)
        {
            context.Speakers.Add(new Speaker
            {
                PictureId = speaker.id,
                FirstName = speaker.firstName,
                LastName = speaker.lastName,
                AllowHtml = speaker.allowHtml,
                Bio = speaker.bio,
                WebSite = speaker.webSite
            });

        }
    }

       
    private string GetEmbeddedResourceAsString(string resourceName)
    {
        var assembly = Assembly.GetExecutingAssembly();

        //var names = assembly.GetManifestResourceNames();

        string result;
        using (Stream stream = assembly.GetManifestResourceStream(resourceName))
        using (StreamReader reader = new StreamReader(stream))
        {
            result = reader.ReadToEnd();
        }
        return result;
    }
}</pre>
<p>
  <br />HTH's</p>
