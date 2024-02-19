---
status: publish
published: true
pubDatetime: 2014-05-08T20:00:00.000Z
title: Move Existing NodeJS Site To Windows Azure Websites
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4001
wordpress_url: https://peterkellner.net/?p=4001
date: '2014-05-08 01:14:46 -0700'
date_gmt: '2014-05-08 08:14:46 -0700'
categories:
- JavaScript
- Azure
- Azure Web Role
- Azure Deployment
- NodeJS
tags: []
---
<h2></h2>
<h2>Background</h2>
<p>Mr <a href="http://codebetter.com/glennblock/2013/10/13/a-new-adventure-at-splunk-after-an-amazing-8-years-at-microsoft/" target="_blank">Glen Block</a> (formerly of Microsoft) has really good video he did while at the <a href="http://www.senchacon.com/2013" target="_blank">Sencha Conference in 2013</a> in Orlando on how to work with <a href="http://nodejs.org/" target="_blank">NodeJS</a> as an <a href="http://azure.microsoft.com/" target="_blank">Azure</a> Web Site.  Azure Websites are a great way to easily spin up low cost web sites that can scale in a big way.  I will not go into all the details of the setup but will fork part of his discussion on how to take an existing azure web site and push it to node.  There are a couple interesting differences in my discussion that are particularly useful.</p>
<p><iframe src="//www.youtube.com/embed/WbtV1bX_m2I" height="265" width="427" allowfullscreen="allowfullscreen" frameborder="0"></iframe></p>
<p>&nbsp;</p>
<p>The value add here is I’m assuming you already have a Git repository For your node project that does not have the root as the NodeJS directory.  That is, in Glen’s talk he assume you are starting a node project from scratch and he uses the “Azure site create mysite –git” to create the Git repository, then he simply deploys it using git push and it all magically works.  In this post, I’m going to decrypt some of the magic which is more real world IMHO.</p>
<h2>The Steps To Publish Your Azure Websites</h2>
<p>Let’s assume we have an existing node project (in Git) with the following directory structure</p>
<p><a href="/wp/wp-content/uploads/2014/05/image.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb.png" width="244" height="137" border="0" /></a></p>
<p>I’ve got my own .gitignore here which already blocks out certain files. WhenI drill down into the node-server directory you can see that the actual nodejs directory is “..\node-server\extdirect-mongodb\”.  In Glen’s video, he assumes this is not a git repository (yet) and at a command prompt in that directory he types “azure site create gitblogpost –git” which creates locally a git repository along with the appropriate remote settings so that git push will deploy automatically.</p>
<p><a href="/wp/wp-content/uploads/2014/05/image1.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb1.png" width="244" height="233" border="0" /></a></p>
<p>In our case, we want to create the azure web site but we need to tell azure web sites that it’s nodejs root is really “..\node-server\extdirect-mongodb\”.  To do this, we follow the guidance from Microsoft in the article <a title="https://github.com/projectkudu/kudu/wiki/Customizing-deployments" href="https://github.com/projectkudu/kudu/wiki/Customizing-deployments">https://github.com/projectkudu/kudu/wiki/Customizing-deployments</a> which talks about customizing deployments.  What we do is create a simple file call .deployment and put it at the root of our Git repository as follows:</p>
<p><a href="/wp/wp-content/uploads/2014/05/image2.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb2.png" width="446" height="304" border="0" /></a></p>
<p>Now, we need to figure out what the credentials are for checking this in to our newly create azure websites which we will newly create with the following command:</p>
<p><a href="/wp/wp-content/uploads/2014/05/image3.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb3.png" width="443" height="294" border="0" /></a></p>
<p>Now, we have the Azure Web Site created and we have a local git repository.  What we need to now is figure how to publish it.  There are two ways you can easily do this.  You can link your existing remote repository to azure web sites and when you push, it will automatically publish the site, or, as I like to do as I’m developing, have the Git push go directly to the Azure Web Site live when you push.  Then, you can easily see the details (and errors) of a publish as it is publishing.</p>
<p>So, what is the git credential for your azure web site? It is in my case automatically created as</p>
<p><a title="https://pkellner99@gitblogpost.scm.azurewebsites.net/gitblogpost.git" href="https://pkellnerxxx@gitblogpost.scm.azurewebsites.net/gitblogpost.git">https://pkellnerxxx@gitblogpost.scm.azurewebsites.net/gitblogpost.git</a></p>
<p>where pkellnerxxx is the account name assigned to me that I can see if I log into the azure portal and go to the dashboard, choose “reset your deployment credentials” as seen below, you put in the username and password there.</p>
<p><a href="/wp/wp-content/uploads/2014/05/image4.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb4.png" width="413" height="313" border="0" /></a></p>
<p>if we do a git push now to that credential, you’ll see in the git log the actual nodejs install.  Below is what some of that looks like.</p>
<p><a href="/wp/wp-content/uploads/2014/05/image5.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb5.png" width="405" height="206" border="0" /></a></p>
<p>What you are seeing above is the npm install command being run on the Azure Website for us.  That way, all the nodejs packages are loaded for us and don’t need to be in our version control.  To this end, I recommend you put in your .gitignore a line that ignores the directory on your local which has all these files (node-server/extdirect-mongodb/node_modules).</p>
<p><a href="/wp/wp-content/uploads/2014/05/image6.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb6.png" width="410" height="368" border="0" /></a></p>
<p>If you do have an issues, I recommend running the command: “azure site log tail gitblogpost” and that gives you a live log of what is happening on your azure web server (see sample session below).  Basically, if you look at your git push log, it will echo what is tailed from the server.</p>
<p><a href="/wp/wp-content/uploads/2014/05/image7.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb7.png" width="424" height="377" border="0" /></a></p>
<p>Finally, if things don’t work after all this, it can be helpful to look at what is actually on the azure web site.  I don’t know if it’s possible to rdp in to the server but I do know that you can ftp into it.  If you download the “deployment profile” in the azure profile, you can open that with a text editor and extract the ftp site and credentials.</p>
<p>Here is what the site actually looks like viewing with ftp:</p>
<p><a href="/wp/wp-content/uploads/2014/05/image8.png"><img style="display: inline; border: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2014/05/image_thumb8.png" width="426" height="236" border="0" /></a></p>
<p>Hope this helps!  please feel free to comment any suggestions and improvements to this.</p>
<p>&nbsp;</p>
