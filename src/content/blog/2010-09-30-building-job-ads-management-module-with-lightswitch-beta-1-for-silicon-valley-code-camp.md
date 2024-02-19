---
status: publish
published: true
pubDatetime: 2010-09-30T20:00:00.000Z
title: Building Job Ads Management Module With LightSwitch Beta 1 For Silicon Valley
  Code Camp
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1370
wordpress_url: https://peterkellner.net/?p=1370
date: '2010-09-30 08:34:29 -0700'
date_gmt: '2010-09-30 15:34:29 -0700'
categories:
- Visual Studio 2010
- ".NET 4.0"
- LightSwitch
tags: []
---
<p>&#160;</p>
<h2>The End Result</h2>
<p>&#160;<a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_17.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_17.png" width="398" height="318" /></a> </p>
<p>&#160;</p>
<h2>Motivation</h2>
<p>As you can imagine, The <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> web site has lots of “back end” functions that need to be done. That is, things like doing mailings, assigning roles to users, making schedules, allocating rooms and times and literally&#160; hundreds of other tasks like that.&#160; Over the 5 years of code camp, I’ve always built simple protected asp.net web pages to do this.&#160; I’ve always used the simplest asp.net control I could find, such as GridView, DetailsView, DropDownList, and SqlDataSource.&#160; The interfaces usually basically work but are very clumsy and lacking in both functionality and aesthetics.</p>
<p>&#160;</p>
<h2>Why Now</h2>
<p>I’ve seen lots of short demos on <a href="http://msdn.microsoft.com/en-us/lightswitch/default.aspx" target="_blank">LightSwitch for Visual Studio</a> and recently read on someone else's blog that they are now building all their simple applications using LIghtSwitch.&#160; Also, my friend <a href="http://blogs.msdn.com/b/bethmassi/" target="_blank">Beth Massi</a> has been running around the world espousing the greatness of this product and I knew if I ran into any dumb issues that she’d bail me out (I’m the king of running into dumb issues.&#160; I’ve found that given two choices that seem right, I always pick the wrong one which is what actually happened here along the way, and Beth did bail me out).</p>
<p> <!--more-->
<p>&#160;</p>
<h2>First Blood</h2>
<p>First thing to do (after installing LightSwitch) is to say “File/New/Project”.&#160; My plan is to add this project right off my SV Codecamp solution.&#160; So, here goes.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb.png" width="309" height="180" /></a> </p>
<p>So far so good.&#160; Next step is to choose attach to an external database</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_3.png" width="329" height="113" /></a> </p>
<p>Continuing, but don’t get tripped up here like I did.&#160; You will use WCF RIA Services under the covers but you don’t want to select that choice.&#160; You want to say that you want to connect to a database and let LightSwitch do the work for you.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_4.png" width="341" height="230" /></a> </p>
<p>PIck your database and connection strings.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_5.png" width="217" height="310" /></a> </p>
<p>Now, pick the tables you plan on working with.&#160; If this were Linq2sql, I’d be choosing them all, but now that I’m in RIA Services land, I’m hoping I can&#160; have separate “Domains” and not have to reference all the tables all the time.&#160; Jury is still out on that one but for now, I’m following the advice of the team and just picking the tables I want to manage now.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_6.png" width="327" height="114" /></a> </p>
<p>And, I’m going to name the Data Source “svcodecampDataJobs”.&#160; I’ll have to see how this goes and report later.&#160; I’m doing this live so I really don’t know where I’ll end up.</p>
<p>click finish, then rebuild all and it&#160; all works.&#160; It comes up with this screen showing me my relationship between the tables. It is showing me a Company table with a link to a JobListing table which is what I have. Here is what LightSwitch shows me.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_7.png" width="384" height="384" /></a> </p>
<p>The reality of my database is that I also have a JobListingDates table that is now shown here.&#160; Taking a step backwards to explain my database, I have a simple company table, the company has a detail table associated with it called JobListings, and the JobListings table has a details file associated with it called JobListingsDates.&#160; That is, a company may run an ad for 30 days, take it down for 30,and bring it back up again.</p>
<p>Here is what that schema actually looks like in SqlManager from EMS.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_8.png" width="370" height="336" /></a> </p>
<p>&#160;</p>
<p>One thing I like about great software is that it has things that are discoverable.&#160; So, just now, I double clicked on the little table called JobListings and the view changed to having JobListing as primary and if you look on the bottom right, it shows JobListingDate.&#160; Very cool.&#160; I have no idea where this is all going but I’m starting to get excited.&#160; Here is what I’m looking at now.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_9.png" width="377" height="377" /></a> </p>
<p>&#160;</p>
<h2>Building a Screen</h2>
<p>&#160;</p>
<p>So now, let’s push the “Screen” button and see what happens (while looking at the Company View).</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_10.png" width="323" height="102" /></a> </p>
<p>This is nice, I get a list of sample screens.&#160; How about if we build an Editable Grid Screen with the hope of editing and adding new Companies.&#160; Notice that I’m naming it EditableGridCompany and chosing the Company for the data in the dropdown.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_11.png" width="362" height="266" /></a></p>
<p>You now get a screen that is a little scary looking so rather than actually try and understand it, I thought “maybe I’m done, maybe this will just run”.&#160; So, here goes, Debug/Start Without Debug.&#160; Here is the scary screen, followed by what happens after the run.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_12.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_12.png" width="399" height="344" /></a> </p>
<p>And the Run:</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_13.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_13.png" width="427" height="303" /></a> </p>
<p>Wow!&#160; Paging, Fancy editing including date pickers, exporting to Excel, Inserts, Updates and Deletes on the company table.&#160; This is amazing.&#160; Let me add another Grid so that I can add JobListings to the company.&#160; To do that, go back to the solution explorer and choose add screen.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_14.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_14.png" width="218" height="244" /></a> </p>
<p>Then again, I have choices.</p>
<p>I choose Details Screen and check Company in the dropdown, Company Details and Company JobListings for the additional data.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_15.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_15.png" width="399" height="292" /></a> </p>
<p>Another intimidating screen, but simply do Debug/Debug Start.</p>
<p><a href="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_16.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/BuildingJobAdsManagementWithLightSwitchB_13C17/image_thumb_16.png" width="415" height="229" /></a></p>
<p>&#160;</p>
<p>Well, that’s it for now.&#160; Code Camp is 4 days away and I don’t really have time to take this to the next level.&#160; You can see from the screen at the top of the post that this is pretty amazing for the effort!&#160; I’m sure I’ll be back to this.</p>
