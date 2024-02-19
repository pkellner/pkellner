---
status: publish
published: true
pubDatetime: 2012-11-25T20:00:00.000Z
title: Adding Design Time (Blend and Visual Studio 2012) Support to the Windows Store
  App Blog Reader Sample
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2354
wordpress_url: https://peterkellner.net/?p=2354
date: '2012-11-25 23:06:47 -0800'
date_gmt: '2012-11-26 06:06:47 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>&nbsp;</p>
<h2>Background and Original Sample From Microsoft</h2>
<p>Microsoft has put a huge amount of work into building <a href="http://code.msdn.microsoft.com/windowsapps">hundreds of sample</a> apps for us developers who are working in on Windows Store Apps (Applications that can be downloaded from the Windows 8 Store).  Microsoft tried very hard to cover all the capabilities with good solid examples.  Unfortunately, many of the apps are incomplete in many ways.  I actually doubt if any of them would actually make it through the store certification process.</p>
<p>The area I am going to talk about now is how to take one of the Windows Store Apps (<a href="http://code.msdn.microsoft.com/windowsapps/Getting-started-with-C-and-41e15af5">The Windows Blog Reader</a>) and add design time support so that when you are looking at a XAML page in Visual Studio or Blend, it shows what it actually looks like instead of a blank screen.</p>
<p>Here is a zip file that was on msdn as of the writing of this blog post:</p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:46982e7e-0497-42f7-ad80-dd6190662181" class="wlWriterEditableSmartContent" style="float: none; margin: 0px; display: inline; padding: 0px;">
<p><a href="/wp/wp-content/uploads/2012/11/WindowsBlogReader1.zip" target="_blank">WindowsBlogReader.zip</a></p>
</div>
<p>And here is what the page ItemsPage.xaml looks like in the designer (or Blend for that matter).</p>
<p><a href="/wp/wp-content/uploads/2012/11/image13.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb12.png" alt="image" width="489" height="370" border="0" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Adding Design Time Support</h2>
<p>In order to add design time support, we need to first create a new class to replace the current FeedData class that currently reads actual feeds to get it’s information.  The file FeedData.cs is the one we want to work on.  We are going to hugely simplify it.  It will not have any async tasks, it will not have an ObservableCollection of Feeds, it will just be a simple POCO (plain old c# object).</p>
<p>Here are the steps:</p>
<ol>
<li>Copy FeedData.cs to FeedDataDesignTime.cs</li>
<li>In FeedData.cs, make Items updatable with a setter</li>
<li>In ItemsPage.xaml, add a new source tag prefixed by d: which means it will be ignored at runtime (add to CollectionsViewSource section)</li>
<li>To App.xaml, add another local resource FeedDataSourceDesignTime</li>
<li>Fill in the code for FeedDataDesignTime.cs to be very simple</li>
</ol>
<p>&nbsp;</p>
<p>That’s it! you should not see the following when navigate to the ItemsPage.xaml in Visual Studio.  Notice the grid is showing with your sample data.</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image14.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb13.png" alt="image" width="490" height="272" border="0" /></a></p>
<p>&nbsp;</p>
<h2>Step By Step Details</h2>
<p><strong>Step 1</strong>and <strong>step 2</strong> are self explanatory.</p>
<p><strong>Step 3</strong> basically change your CollectionViewSource to include a namespace (d) which will not be compiled because of the ignore statement in the xaml header.  Your full CollectionViewSource now looks like the following.  Notice it has two Source attributes.  One that gets used at design time (the new one) and the original that has not changed which gets used at run time.</p>
<pre class="csharpcode">&lt;CollectionViewSource
    x:Name=<span class="str">"itemsViewSource"</span>
    d:Source=<span class="str">"{Binding Feeds, Source={d:DesignInstance Type=local:FeedDataSourceDesignTime, IsDesignTimeCreatable=True}}"</span>
    Source=<span class="str">"{Binding Items}"</span>/&gt;</pre>
<p><strong>Step 4</strong> basically is to create a static in the main app class called FeedDataSourceDesignTime as follows.  It also defines a key so we can reference that from our c# code.  The reason we do this is so that this can be easily accessed from both c# and the xaml code itself (that is, declaring FeedDataSourceDesignTime declaratively in xml).</p>
<p>Step 5 is replacing the class FeedData.cs with FeedDataSourceDesignTime.cs make the data for the sample come from a local static array rather than making an async web call.  It’s about 100 lines of code and I don’t want to paste it all here.  It is in the root of the project attached below.  To give you an idea of what it looks like, I’m pasting a piece of the class below.</p>
<pre class="csharpcode"><span class="kwrd">namespace</span> WindowsBlogReader
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> FeedDataSourceDesignTime
    {
        <span class="kwrd">public</span> List&lt;FeedData&gt; Feeds { get; set; }

        <span class="kwrd">public</span> FeedDataSourceDesignTime()
        {
            Feeds = <span class="kwrd">new</span> List&lt;FeedData&gt;();
            DateTime dt = DateTime.Now;
            var feedDatas = <span class="kwrd">new</span> List&lt;FeedData&gt;
              {
                <span class="kwrd">new</span> FeedData
                 {
                   Description = <span class="str">"description1"</span>,
                   PubDate = dt.Subtract(<span class="kwrd">new</span> TimeSpan(1, 1, 1)),
                   Title = <span class="str">"title1"</span>,
                   Items = <span class="kwrd">new</span> List&lt;FeedItem&gt;...</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>The Modified Visual Studio 2012 Project</h2>
<p>Below is a link to the VS Project file with the above changes done.  It also includes the full FeedDataSourceDesignTime class which you will of course need to write yourself for any project.  Give it a try!</p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:b9a3fb00-7202-4feb-8b58-deb119dabac5" class="wlWriterEditableSmartContent" style="float: none; margin: 0px; display: inline; padding: 0px;">
<p><a href="/wp/wp-content/uploads/2012/11/WindowsBlogReaderWithDesignSupport.zip" target="_blank">WindowsBlogReaderWithDesignSupport.zip</a></p>
</div>
<p>Download it and give it a try!  When you actually run it, if any of the blog links are down, the await hangs forever so you might want to run it in the debugger to make sure all the links are good (and find the bad ones).</p>
<p>&nbsp;</p>
<h2>Stumbling Blocks</h2>
<p>It’s really hard to figure out what is wrong if your data initialization code in your FeedDataSourceDesignTime.cs data creation is wrong.  For example, I had created a uri as “new Uri(“peter.jpg”); and it took me about 2 hours to figure out that was the problem.  I need a FQDN in front of the the name.  A also at one point had forgotten to new up my List in the constructor of that class and I kept seeing “object null” violation which as happening when I was trying to do an AddRange to the List.  Correct error, but practically impossible to figure out.</p>
<p>&nbsp;</p>
<p>HTH’s!</p>
