---
status: publish
published: true
pubDatetime: 2010-09-02T20:00:00.000Z
title: Using Hosted Mercurial Version Control on BitBucket.org / Adding Commit Emails
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1361
wordpress_url: https://peterkellner.net/2010/09/02/mercurial-bitbucket-adding-commit-emails/
date: '2010-09-02 20:53:15 -0700'
date_gmt: '2010-09-03 03:53:15 -0700'
categories:
- Mercurial
- BitBucket.Org
tags: []
---
<p>&#160;</p>
<h2>A Little History</h2>
<p>So, this may sound simple, but I seem to be having one of those days where things just don’t seem to go as I plan.&#160; First, a little background.&#160; I’m planning on releasing an open source project on <a href="http://www.codeplex.com/">CodePlex</a> in the not to distant future and one of the choices for version control is Mercurial (hg for short).&#160; Most of my projects have been in subversion, but it seems all the smart people I know have been moving to <a href="http://git-scm.com/">Git</a> or <a href="http://en.wikipedia.org/wiki/Mercurial_(software)">Mercurial</a>.&#160; Since CodePlex does not support Git, Mercurial it is.&#160; I like having a company I pay host my source control so if I have an issue, I have someone to contact.&#160; I chose <a href="http://bitbucket.org/">bitbucket.org</a> for this. They seem very well known with lots of positive vibes on the net.</p>
<p>&#160;</p>
<p> <!--more--><br />
<h2>Adding a Commit Email</h2>
<p>Every time someone commits an update to <a href="http://bitbucket.org/">bitbucket.org</a> (that is where our primary repository is), I want to get an email that says a commit was made and I want to see the differences.&#160; To do this, you need to chose your repository (mine is called pkellner99 / ConnectionRoadWeb) as follows:</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb.png" width="355" height="143" /></a> </p>
<p>Then, click on the repository you want. From there, click on the admin tab (as pointed at by the red arrow), then go to the “Services” item in the Additional options/settings window (see the other red arrow).</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_3.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_3.png" width="370" height="207" /></a> </p>
<p>Once you’ve done that, you will see this window:</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_4.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_4.png" width="393" height="267" /></a> </p>
<p>change the dropdown to say “Email Diff” and press the Add Service button as follows.</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_5.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_5.png" width="371" height="99" /></a> </p>
<p>You’ll get this window:</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_6.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_6.png" width="398" height="201" /></a> </p></p>
<p>You’ll put your email int he box and press “Save Settings”.&#160; I’m putting <a href="mailto:info@siliconvalley-codecamp.com">info@siliconvalley-codecamp.com</a> in the textbox because I don’t really want to tell you my super secret email address (though I’m not afraid to publish my phone number on the contact page so go figure).</p>
<p>You’ll be then rewarded with:</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_7.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_7.png" width="419" height="207" /></a> </p>
<p>You may be thinking, that is the same as the above (that is what I was thinking), but then if you go back to the top box, change POST to EMAIL Diff, press Add service again, you will get:</p>
<p><a href="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_8.png"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/UsingHostedMercuri.orgAddingCommitEmails_12596/image_thumb_8.png" width="436" height="313" /></a> </p>
<p>&#160;</p>
<p>Which tells you that you are doing good!&#160; Repeat over and over for lots of different services to add.</p>
<p>&#160;</p>
<h2>Conclusions</h2>
<p>I have to say it was not obvious to me how to do this, but <a href="http://bitbucket.org/">bitbucket</a> support was awesome!&#160; I would email them, they would email me (and so on and so forth) with practically no lag time that eventually led to me figuring this out.&#160; </p>
<p><strong>Thanks for the great support</strong> <a href="http://bitbucket.org/">bitbucket</a>!</p>
