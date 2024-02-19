---
status: publish
published: true
pubDatetime: 2010-04-20T20:00:00.000Z
title: Using RSYNC to Replicate Synology NAS DS710+ to Windows 7 Hard Drive
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1273
wordpress_url: https://peterkellner.net/2010/04/20/synology-nas-rsync-deltacopy-setup/
date: '2010-04-20 21:53:28 -0700'
date_gmt: '2010-04-21 04:53:28 -0700'
categories:
- Hardware
- NAS
- rsync
- backup
tags: []
---
<p>Learn how to use a local backup drive on your windows 7 system to replicate the data on any or all of your directories on your <a href="http://www.synology.com">Synology</a> NAS (Network Hard Drive Device) DS710+.&#160; This post will show how using <a href="http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp">DeltaCopy</a>, you can have all the data on your NAS backed up continually to a local hard drive on your windows system.&#160; Backups are all about redundancy, and this is just another redundant copy of your data should the worst happen.</p>
<p> <!--more--><br />
<h2>The NAS Itself</h2>
<p>I’ve been through multiple NAS devices and I have finally found one I love.&#160; It’s the <a href="http://www.synology.com/us/products/ds710+/index.php">Synology NAS DS710+.</a></p>
<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:7dc1bd33-94bd-46fd-a20b-0131235bcd47:47e3df44-1554-4cca-a1a6-8c2721016a43" class="wlWriterEditableSmartContent">
<table cellspacing="0" cellpadding="2" width="400" border="0" unselectable="on">
<tbody>
<tr>
<td valign="top" width="400">
<p><a title="Synology DiskStation 2-Bay Scalable Network Attached Storage (Black): Electronics" href="http://www.amazon.com/exec/obidos/ASIN/B0031ZKX5S/petkelsblo-20"><img src="http://images.amazon.com/images/P/B0031ZKX5S.01.MZZZZZZZ.jpg" border="0" align="left" style="float:left">Synology DiskStation 2-Bay Scalable Network Attached Storage (Black): Electronics</a><br><br><b>ASIN</b>: B0031ZKX5S</p>
</td>
</tr>
</tbody>
</table>
</div>
<p>&#160;</p>
<p>Briefly, the reasons I really am impressed with this device (in order)</p>
<ol>
<li>It is blazing fast.&#160; I’ve seen 90% of the Gigabit Network in use </li>
<li>Great Features Including Rsync support </li>
<li>Great User Interface (written well in <a href="http://extjs.com">ExtJs</a>) </li>
<li>High Quality Workmanship </li>
<li>Low Power Consumption (idles at about 18 watts) </li>
</ol>
<p>After buying multiple other NAS devices, I finally did some real research and found a great site that reviewed several NAS devices. I finally ended having several emails with the author of the review and based on that, bought the DS710.&#160; For you information, the review site of multiple NAS devices I really like is:&#160; <a title="http://www.xbitlabs.com/articles/networking/" href="http://www.xbitlabs.com/articles/networking/">http://www.xbitlabs.com/articles/networking/</a> and the reviewer is: <a href="http://www.xbitlabs.com/contact/Kochet">Hugh Barros</a>.</p>
<p>&#160;</p>
<h2>Installing DeltaCopy On Windows Computer</h2>
<p>Installing DeltaCopy is very straight forward and there are several blogs on the net.&#160; You can get the download from the site <a title="http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp" href="http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp">http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp</a> but I’m not sure if that is the official location or not.&#160; If you know, please add a comment to this post and I’ll update it.&#160; One site that goes through a step by step install is here:&#160; <a title="http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp" href="http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp">http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp</a></p>
<p>&#160;</p>
<h2 style="width: 100.41%; height: 23px">
<p>Configuring DeltaCopy to Act as Rsync Server to NAS</p>
</h2>
<p>First thing you need to do is open a port in your file wall so that the NAS can reach out to your computer. The port you need to open is:&#160;&#160; <a href="http://ss64.com/bash/rsync.html">873</a>.</p>
<p>Then, I recommend installing DeltaCopy as a service.&#160; You do that by running the “DeltaCopy Server” from your start menu.&#160; </p>
<p><a href="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_thumb.png" width="244" height="225" /></a> </p>
<p>You need to setup a virtual directory where rsync will target the download.&#160; Here is what that looks like:</p>
<p><a href="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_thumb_3.png" width="244" height="228" /></a> </p>
<p>Notice the Existing Directory box has an entry for each virtual directory you want to setup on your windows hard drive.&#160; The name is very important.&#160; It’s a required field in the NAS setup called “Backup Module”.&#160; To me, that’s very confusing because I would think a module is some kind of compiled at in, not the name of the virtual directory.&#160; I’m not an rsync wizard though so I’m guessing it may have meaning to those that are.&#160; You do need to create a username and password for the NAS client to work with this server.&#160; I’m on a trusted internal network so I would prefer it work without authentication, but I guess this is reasonable.&#160; I do not use encryption because I want to be able to access these files natively on the windows hard disk I’m rsync’ing to.</p>
<h3>Creating Backup Job on NAS Plus Scheduling</h3>
<p>Now, on the NAS (DS710+) side, you need to go to Backup / Backup and Create a new backup job. Below is the setup screen for that.</p>
<p><a href="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_thumb_4.png" width="474" height="283" /></a> </p>
<p>Notice that 192.168.1.108 is the IP address of my windows workstation with the drive on it.&#160; I’m sure I could setup dns and use the system name instead.&#160; Something for later. Also, notice the password is masked.&#160; On the DeltaCopy side, the password is not masked.&#160; IMHO, a very bad practice.&#160; I always shutter when I see my password and not stars as is best practice and almost always followed.</p>
<p>Now, when need to create a schedule so that the data is updated every day.&#160; You simply go to the 4th tab “Scheduled Backup” and tell it to backup once a day.&#160; This is creates a mirror (with incremental not checked on setup) so that it will not take long to run.&#160; I set mine to run at 3AM every day.&#160; You can also configure email to go out if any error occurs.&#160; A very nice and important feature.</p>
<p><a href="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingRSYNCtoReplicateSynologyNASDS710toW_7D23/image_thumb_5.png" width="431" height="340" /></a> </p>
<p>That’s about it.&#160; I’ve only had the device for a couple days, but so far, it’s a winner!</p>
<p>Hope this helps.</p>
