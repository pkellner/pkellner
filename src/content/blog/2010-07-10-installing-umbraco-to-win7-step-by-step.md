---
status: publish
published: true
pubDatetime: 2010-07-10T20:00:00.000Z
title: Installing Umbraco To Windows 7 Ultimate &ndash; Step By Step
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1341
wordpress_url: https://peterkellner.net/2010/07/10/installing-umbraco-to-win7-step-by-step/
date: '2010-07-10 09:29:41 -0700'
date_gmt: '2010-07-10 16:29:41 -0700'
categories:
- ASP.NET 3.5
- Umbraco
- CMS
- Forums Software
tags: []
---
<p>I’m planning on launching some small consumer software products in the next couple months and to support this effort, I need to have a <a href="http://en.wikipedia.org/wiki/Content_management_system">CMS</a>, <a href="http://en.wikipedia.org/wiki/Comparison_of_Internet_forum_software">Forums Software</a>, <a href="http://en.wikipedia.org/wiki/Shopping_cart_software">Store Front (Credit Card Processing)</a> and <a href="http://en.wikipedia.org/wiki/Wiki">Wiki solutions</a> up and running.&#160; Since I’m a .Net guy, my first choice is to use Microsoft .Net technology, but if I don’t find anything there that suits me, off to the LAMP stack I go.&#160; It’s important to me that all of these are tied together with a <a href="http://en.wikipedia.org/wiki/Single_sign-on">single sign-on</a>.&#160; It always irritates me when you go to a site and they make you first log in to the site, the create a separate login for forums.&#160; I will avoid that experience for my customers and users.</p>
<p>&#160;</p>
<h2>
<p>My Research</p>
</h2>
<p>My research first started with Google/Bing type searches.&#160; That really leads me to many choices.&#160; Actually too many.&#160; Next, I go to my friend network.&#160; The first obvious person I turn to is <a href="http://scottcate.com/">Scott Cate</a> because he seems to always have the best advice on this kind of thing. The guy is plugged into everything!</p>
<p>Scott give me a very strong recommendation to look at Umbraco.&#160; He says he is personally involved in writing code for that CMS, it’s very extensible, has a great admin UI and bottom line, is just good stuff.&#160; So, Off I go to <a href="http://umbraco.org">http://umbraco.org</a>.</p>
<p>&#160;</p>
<p> <!--more-->
<p>&#160;</p>
<h2>What I Find</h2>
<p>I discover Umbraco is an open source project hosted at <a href="http://www.codeplex.com">http://www.codeplex.com</a>.&#160; I find that it’s available in <a href="http://www.microsoft.com/web/downloads/platform.aspx">Microsoft Web Platform Installer</a>.&#160; It’s not obvious to me that it includes forum, wiki or shopping cart software.&#160; I don’t really expect the shopping cart, but I was hoping for wiki and forums software integrated.&#160; At this point, I’m sure none are integrated but it seems there are add-ins that might help me. </p>
<h3>Forums Software</h3>
<p>After searching the web, I find <a title="http://uforum.codeplex.com/" href="http://uforum.codeplex.com/">http://uforum.codeplex.com/</a> which has lots of downloads but not no checkins since June last year (not very active).&#160; I also find, what appears to be the treasure chest of addins at <a title="http://our.umbraco.org/projects" href="http://our.umbraco.org/projects">http://our.umbraco.org/projects</a>.&#160; I do find uForum listed here, and it does say it is what is used with Umbraco so I’ll probably go with that.&#160; </p>
<p>There is another forum mentioned quite a bit called YAF (<a title="http://www.yetanotherforum.net/" href="http://www.yetanotherforum.net/">http://www.yetanotherforum.net/</a>).&#160; It seems much more active than uForum so I should probably give that some thought.&#160; I did see another post on configuring it that looked complex.</p>
<h3>Ecommerce Software</h3>
<p>For Ecommerce, they list Commerce for Umbraco.&#160; They give a link to a site using it ( <a title="http://orders.homaxproducts.com/" href="http://orders.homaxproducts.com/">http://orders.homaxproducts.com/</a> ) which is a dead link.&#160; The primary site is <a title="http://commerce4umbraco.codeplex.com/" href="http://commerce4umbraco.codeplex.com/">http://commerce4umbraco.codeplex.com/</a>.&#160; There seems to be some controversy on the net about dashCommerce.net.&#160; </p>
<p>Clearly there is history here and it seems some issues around licensing and open source but I don’t quite follow all the threads.&#160; It would be nice if someone clarified this so I would know the story and could decide if I’m comfortable with what is going on there.</p>
<h3>Wiki Software</h3>
<p>Here I draw a big zero.&#160; When I search for <a href="http://www.bing.com/search?q=umbraco%20wiki%20integration&amp;mkt=en-us&amp;FORM=TOOLBR&amp;DI=6244&amp;CE=14.0&amp;CM=SearchWeb">“Umbraco Wiki Integration”</a> I don’t find anything obvious for what wiki to use.&#160; Umbraco has a wiki on their main site, but I can’t tell which one it is and how they integrated it.&#160; Another worry is I posted a question to the forums about which wiki/forums software they use and still don’t have answer after about 18 hours.&#160; Seems like this is a trivial answer making me think the forums are not very active.&#160; Here is a link to my thread.&#160; Maybe by the time you read this, someone will have answered it.&#160; <a title="http://our.umbraco.org/forum/getting-started/questions-about-runway-and-modules/10554-which-forum-and-wiki-sw-is-Umbracoorg-using" href="http://our.umbraco.org/forum/getting-started/questions-about-runway-and-modules/10554-which-forum-and-wiki-sw-is-Umbracoorg-using">http://our.umbraco.org/forum/getting-started/questions-about-runway-and-modules/10554-which-forum-and-wiki-sw-is-Umbracoorg-using</a>.&#160; </p>
<p>Also, just a side note.&#160; The forum software is not so easy to find.&#160; From <a href="http://umbraco.org">http://umbraco.org</a>, you have to chose the Documentation link, then 5 subcategories down is a forum link.&#160; Ultimately, you end up here:&#160; <a title="http://our.umbraco.org/forum" href="http://our.umbraco.org/forum">http://our.umbraco.org/forum</a>.</p>
<p>&#160;</p>
<h2>Installation Of Umbraco Experience</h2>
<h3>Preamble</h3>
<p>Finally, the meat of this post.&#160; My installation experience.&#160; I typically don’t blog everything I install, but in this case, I had a special request from <a href="http://twitter.com/paulsterling">@paulsterling</a>.&#160; I had tweeted “Just Installed umbraco on my local win7 box with iis7.&#160; web pi failed. recreated web site with iis worked.&#160; Lots of complaints posted”.&#160; Paul tweets back “do you have link to your feedback from your #epbi <a href="http://twitter.com/umbraco">@umbraco</a> install experience? always looking to improve”.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb.png" width="335" height="254" /></a> </p>
<p>Well Paul, I’m a sucker for the “always looking to improve” which is what motivated this post.</p>
<p>To make sure I’m reasonably fair, I’ve created a VM with just Windows 7 Ultimate loaded. No Visual Studio, No Db. I’m going to install from there and document the steps in as much detail as I can.&#160; The first time I did this (OK, the first several times) it did not work.&#160; Let’s see what happens now.</p>
<p>&#160;</p>
<h3>Step By Step Experience</h3>
<p>Go to the <a href="http://www.microsoft.com/web/downloads/platform.aspx">Windows Platform Installer</a> Site, choose “Download It Now” and Choose Umbarco under the CMS category</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_3.png" width="399" height="301" /></a> </p>
<p>Then, PI figures out lots of dependencies of which I just accept and say install (about 100 meg).</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_4.png" width="419" height="364" /></a> </p>
<p>I then get prompted for a whether I want mixed mode or integrated authentication with SqlExpress.&#160; I say Integrated because I’m running everything on my local vm and that is good enough.&#160; In my earlier tests, I was doing this with SqlServer 2008 on my real development so this is a little different than what I did previously which failed.&#160; Let’s see what happens here.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_5.png" width="433" height="378" /></a> </p>
<p>And now, we are off for the install.&#160; It says it’s installing lots of components.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_6.png" width="441" height="385" /></a> </p>
<p>About 5 minutes later I get this screen where I fill in MyUmbracoApp and press continue.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_7.png" width="465" height="404" /></a> </p>
<p>Then, I get a screen where I leave the defaults including “Create a New Database” and fill in a password for sqlexpress (I just make that up since it’s going to create a sqlexpress database for me).</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_8.png" width="475" height="417" /></a>&#160;</p>
<p>I forget to scroll down and see the rest of the page so I get a warning.&#160; I then scroll down, fill in the below with the same password (which probably could be different) and press continue.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_9.png" width="468" height="410" /></a> </p>
<p>&#160;</p>
<p>And, I get this error:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_10.png" width="414" height="214" /></a>&#160;</p>
<p>I say “no” because likely bad things will happen.&#160; Now, I go backwards a little and try to install it to a SqlServer Instance running externally.&#160; I do know that I will be able to make this work, but here is where the experience kind of sucks.&#160; I don’t know that most people who have not spend years like I have messing around with sqlserver and asp.net would figure it out.</p>
<p>As a little bit of a disclaimer and possible reason why things did not work, I have to admit I have almost no experience with SqlExpress.&#160; I use SqlServer on all my projects.&#160; Maybe I did not answer a question as well as I could of had I known SqlExpress better.</p>
<p>So, now I update my screen to point to a SqlServer on a system named W500 (that’s the main computer the VM is running on with it’s firewall open to SqlServer port 1433.&#160; I rename the database to umbracofirst hoping it will create this as well as the user umbracouser.&#160; Let’s see.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_11.png" width="457" height="399" /></a> </p>
<p>Up comes this screen after I press Continue which is encouraging.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_12.png" width="468" height="409" /></a> </p>
<p>A few minutes go by and then I get some good news.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_13.png" width="410" height="363" /></a> </p>
<p>I press Finish and am brought back to the the PI screen.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_14.png" width="436" height="327" /></a> </p>
<p>Now, time to see what happened.&#160; A completion dialog with “what’s next might have been nice as opposed to just a “Finished and Congratulations” message.</p>
<p>&#160;</p>
<h3>Time to Snoop Around for What Happened</h3>
<p>My first guess is it installed an IIS web site.&#160; So, let’s run IIS Manager as follows to see.</p>
<p>&#160;</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_15.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_15.png" width="342" height="434" /></a> </p>
<p>Sure enough, here is the site it created.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_16.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_16.png" width="437" height="307" /></a>&#160;</p>
<p>To run the default.aspx page, I do this:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_17.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_17.png" width="454" height="405" /></a> </p>
<p>Http 404 just means not found.</p>
<p>&#160;</p>
<h2>Things Did Not Work! Time for a Fix</h2>
<p>&#160;</p>
<p>After trolling the internet for a while, I find someone who says try removing and re-adding the web site in IIS Manager.&#160; I do that as follows:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_18.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_18.png" width="372" height="378" /></a> </p>
<p>Then, do re-add it.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_19.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_19.png" width="428" height="263" /></a> </p>
<p>which leads to the following where I’ve name the site “MyUmbracoWeb” and added the physical path to where the app was installed by PI.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_20.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_20.png" width="530" height="395" /></a> </p>
<p>I get the following warning</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_21.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_21.png" width="382" height="161" /></a> </p>
<p>which means I’ve created another web site (in addition to the one there originally named “Default” that is running on port 80.&#160; If I try to run the new web site, something bad will happen because I’ve asked for two sites to run on port 80.&#160; So, I say Yes.&#160; Now, it shows me that Default Web Site is running and MyEmbracoWeb is not.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_22.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_22.png" width="304" height="181" /></a> </p>
<p>So, I need to stop “Default Web Site” and start “MyUmbracoWeb”.&#160; I do that as follows:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_23.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_23.png" width="402" height="306" /></a> </p>
<p>Then,</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_24.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_24.png" width="411" height="310" /></a> </p>
<p>which gives me just MyUmbraco running.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_25.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_25.png" width="210" height="156" /></a> </p>
<p>So, now to run the default page again.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_26.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_26.png" width="318" height="379" /></a> </p>
<p>and Presto! now I’m back on track.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_27.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_27.png" width="423" height="364" /></a></p>
<p>&#160;</p>
<h3>Continuing With Step By Step</h3>
<p>So, now we are back on track, let’s finish the setup.</p>
<p>The screen above has a “Next” button on the bottom right (a little out of site). Press that.</p>
<p>We get Step1/5, Accept License.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_28.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_28.png" width="327" height="257" /></a>&#160; </p>
<p>Next, Confirm Defaults (nothing to change)</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_29.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_29.png" width="346" height="209" /></a> </p>
<p>Confirm leads to and error:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_30.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_30.png" width="368" height="260" /></a> </p>
<p>This means we can’t write to the directory where the web site lives.&#160; So, let’s add permissions to that as follows:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_31.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_31.png" width="364" height="319" /></a> </p>
<p>goes to:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_32.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_32.png" width="261" height="338" /></a> </p>
<p>chose Edit and then full control for the IIS_IUSRS user.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_33.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_33.png" width="323" height="332" /></a> </p>
<p>Press OK (Apply happens automatically)</p>
<p>For some reason, I lost my IE session so I had to back and re-run Default.aspx from IIS again, then go through first two wizard steps which takes me to the second step successfully completing.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_34.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_34.png" width="430" height="142" /></a> </p>
<p>Moving on to by pressing Install button.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_35.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_35.png" width="452" height="101" /></a> </p>
<p>Feeling like I went to step 3, but still happy because I’m getting good messages.&#160; After pressing Next gain I get:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_36.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_36.png" width="471" height="138" /></a> </p>
<p>It tells me my permissions are Perfect!&#160; Now, really starting to feel good, pressing next gives me:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_37.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_37.png" width="489" height="248" /></a> </p>
<p>I put in a password for my umbraco admin account and press “Change Password” button. I get another success!</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_38.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_38.png" width="376" height="123" /></a> </p>
<p>Pressing Next again I get:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_39.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_39.png" width="415" height="233" /></a> </p>
<p>Clearly, I’m not an expert so I chose “Add Runway” and I do actually watch the video.&#160; It’s quite good IMHO.</p>
<p>Pressing next again, I get the following where I now chose Standard top Navigation and Contact Form.</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_40.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_40.png" width="423" height="332" /></a> </p>
<p>I press “Install Selected Modules” button and get&#160; a success install message:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_41.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_41.png" width="430" height="130" /></a> ]</p>
<p>Pressing Next asks me to Register with umbarco (which I do), the press the hyperlink “Launch Umbraco”.</p>
<p>Now, I get the admin screen for umbraco!</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_42.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_42.png" width="421" height="308" /></a> </p>
<p>If I go back and now run <a href="http://localhost">http://localhost</a> I get:</p>
<p><a href="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_43.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/InstallingUmbracoToWindows7UltimateStepB_6E5F/image_thumb_43.png" width="437" height="383" /></a> </p>
<p>Everything is working!!! Hurray!!</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>Kind of early for conclusions, but I’d say that the installation is clearly a work in progress.&#160; My personal preference would not to have this installer since it is obviously still a work in progress.&#160; Again, my personal opinion is that in this case less is more.&#160; Unless the experience with the wizard is near perfect, don’t do one. It just gets people (like me) frustrated.</p>
<p>On a happier note, I’ve been playing with Umbraco now for about 2 or 3 hours and am really impressed with it’s potential.&#160; I am going to continue down the path of evaluating (and hopefully using) umbraco for my CMS,Forums,Wiki and Ecommerce solutions.</p>
<p>Wish me luck!</p>
<p>and,… HTH’s.</p>
