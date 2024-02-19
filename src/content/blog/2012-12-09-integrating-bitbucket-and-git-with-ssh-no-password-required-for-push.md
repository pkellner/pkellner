---
status: publish
published: true
pubDatetime: 2012-12-09T20:00:00.000Z
title: Integrating BitBucket and GIT with ssh (no password required for push)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2395
wordpress_url: https://peterkellner.net/?p=2395
date: '2012-12-09 18:43:23 -0800'
date_gmt: '2012-12-10 01:43:23 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<p>&#160;</p>
<p>I’ve just gone through the process of integrating GIT with BitBucket so that when I sync I do not have to type in my username or password.&#160; There are a couple locations I used as resources listed here. Much of what I did is exactly the same process but since it was a little of each I thought I’d blog it.</p>
<p><a title="https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git" href="https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git">https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git</a></p>
<p><a title="http://stackoverflow.com/questions/11918285/my-bashrc-file-not-executed-on-git-bash-startup-windows-7" href="http://stackoverflow.com/questions/11918285/my-bashrc-file-not-executed-on-git-bash-startup-windows-7">http://stackoverflow.com/questions/11918285/my-bashrc-file-not-executed-on-git-bash-startup-windows-7</a></p>
<p>My environment is VMWare Fusion running on a MacBook. I’m using the released version of Windows 8-64.</p>
<p>1) Install Git</p>
<p>2) Run from the launch icon Git Bash</p>
<p>3) verify ssh installed (ssh –v)</p>
<p>4) in the bash shell prompt, run ssh-keygen (do put in a passphrase)</p>
<p>5)&#160; copy and paste the text from the file /Users/peter/.ssh/id_rsa.pub to the ssh section of your account information on bitbucket</p>
<p>6) paste the following code in to your .bashrc file:&#160;&#160; </p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:24002245-343e-40ac-a15e-46bd8a99cd67" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<p> <a href="/wp/wp-content/uploads/2012/12/bashrc.txt" target="_blank">.bashrc</a></p>
</div>
<p>7) go to your bitbucket account information and grab the name of the repository in ssh speak. For me it is:&#160; <a href="mailto:git@bitbucket.org:pkellner99/win8storeagelessemail.git">git@bitbucket.org:pkellner99/win8storeagelessemail.git</a></p>
<p>8) for me, it went into settings in tortoisegit and added the remote url in ssh speak, however I believe you can go into your /.git/config file and add to the remote origin section yourself the url of your remote repository (see below for what mine looks like.</p>
<p>[core]    <br />&#160;&#160;&#160; repositoryformatversion = 0     <br />&#160;&#160;&#160; filemode = false     <br />&#160;&#160;&#160; bare = false     <br />&#160;&#160;&#160; logallrefupdates = true     <br />&#160;&#160;&#160; symlinks = false     <br />&#160;&#160;&#160; ignorecase = true     <br />&#160;&#160;&#160; hideDotFiles = dotGitOnly     <br />[remote &quot;origin&quot;]     <br />&#160;&#160;&#160; fetch = +refs/heads/*:refs/remotes/origin/*     <br />&#160;&#160;&#160; url = git@bitbucket.org:pkellner99/win8storeagelessemail.git     <br />[branch &quot;master&quot;]     <br />&#160;&#160;&#160; remote = origin     <br />&#160;&#160;&#160; merge = refs/heads/master     <br />[gui]     <br />&#160;&#160;&#160; wmstate = normal     <br />&#160;&#160;&#160; geometry = 887x427+182+182 171 192</p>
<p>&#160;</p>
<p>That’s it for now.&#160; Hope this helps (it will me when I forget how to do this and have to come back to these notes)</p>
