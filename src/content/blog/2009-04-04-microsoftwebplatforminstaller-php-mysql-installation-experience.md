---
status: publish
published: true
pubDatetime: 2009-04-04T20:00:00.000Z
title: First Blood Using the New Microsoft Web Platform Installer
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 285
wordpress_url: https://peterkellner.net/2009/04/04/microsoftwebplatforminstaller-php-mysql-installation-experience/
date: '2009-04-04 09:57:55 -0700'
date_gmt: '2009-04-04 16:57:55 -0700'
categories:
- IIS7
- Database
- PHP
- MySql
tags: []
---
<p> At <a href="http://live.visitmix.com/">MIX09</a> this year, <a href="http://weblogs.asp.net/scottgu/">Scott Guthrie</a> presented the Web Platform Installer which seemed like an easy way to install specific technologies on an IIS server.&#160; At the moment, I need to test an application that uses PHP so I figure this is a good time to try it.&#160; Over the years, I’ve had several spectacular failures trying to install PHP on IIS.&#160; Now, maybe I will get it right.&#160; So, here we go.</p>
<p>Step 1: Read the walk through ( <a title="http://learn.iis.net/page.aspx/523/web-platform-installer-walkthrough/" href="http://learn.iis.net/page.aspx/523/web-platform-installer-walkthrough/">http://learn.iis.net/page.aspx/523/web-platform-installer-walkthrough/</a> )</p>
<p>Step 2:&#160; Click Install now&#160; (Can’t find PHP, starting searching the web now)&#160; {Note: 4/14/2009. Turns out I missed an easy step.&#160; See bottom of article for that step}</p>
<p>Found this link:&#160; <a href="http://ruslany.net/2009/03/install-php-with-microsoft-web-platform-installer-20/">Install PHP with Microsoft Web Platform Installer 2.0</a></p>
<p>Step 3: Go Here and try again:&#160; <a title="http://php.iis.net/" href="http://php.iis.net/">http://php.iis.net/</a></p>
<p><a href="/wp/wp-content/uploads/2009/04/image.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb.png" width="364" height="205" /></a></p>
<p> <!--more-->
<p>Well, I still don’t see <a href="http://php.net/">php</a> on the web server choice, but I do see WordPress so I chose to install <a href="http://wordpress.org/">Wordpress</a> and said go.&#160; Let’s see what happens now.</p>
<p>It’s saying downloading PHP and also <a href="http://www.mysql.com/">MySQL</a> so maybe this is good.&#160; Patiently waiting…</p>
<p>It’s now asking me for WordPress Setup…</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_3.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_3.png" width="440" height="304" /></a></p>
<p>And now for the MySql user (pretty impressive)</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_4.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_4.png" width="452" height="312" /></a></p>
<p>And, Installing WordPress…</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_5.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_5.png" width="478" height="330" /></a></p>
<p>&#160;</p>
<p>Oops, failed.&#160; Hmm, wasn’t really intereted in wordpress anyhow, just wanted php.</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_6.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_6.png" width="465" height="321" /></a></p>
<p>Sounds like it did not like my credentials to MySql.&#160; I thought I di follow all the directions.&#160; I’ll paste the error here:</p>
<p>providerName: createApp    <br />&#160;&#160;&#160; path: MSDeploy.iisApp/iisApp[@path='wordpress/WPTest']/createApp[@path='wordpress/WPTest']     <br />[9:42:493]Adding dbMySql (Server=localhost;Database=wordpress;uid=pkellner;Pwd=mypass;)     <br />&#160;&#160;&#160; Details:     <br />&#160;&#160;&#160; operationType: Add     <br />&#160;&#160;&#160; providerName: dbMySql     <br />&#160;&#160;&#160; path: Server=localhost;Database=wordpress;uid=pkellner;Pwd=peterk;     <br />[9:42:498]The database 'wordpress' could not be created..&#160; Retrying operation 'Add' on object dbMySql (Server=localhost;Database=wordpress;uid=pkellner;Pwd=mypass;).&#160; Attempt 1 of 5.     <br />&#160;&#160;&#160; Details:     <br />&#160;&#160;&#160; originalMessage: The database 'wordpress' could not be created.     <br />&#160;&#160;&#160; operationType: Add     <br />&#160;&#160;&#160; retryAttempt: 1     <br />&#160;&#160;&#160; retryCount: 5</p>
<p>It does say php installed though successfully and that was my goal.</p>
<p>So, let’s see what is in IIS manager (inetmgr) so, I run inetmgr from a command prompt.</p>
<p>Well, interesting, I see some new stuff including Web Platform Installer at the bottom.&#160; I don’t see anything about php, but I do see a WordPress directory so there is some hope php worked.&#160; Here is what I see.</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_7.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_7.png" width="557" height="416" /></a></p>
<p>Let’s go into the WordPress base directory and add the only php I know:</p>
<p>Info.php as follows:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">html</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span> PHP Test Script <span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">head</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;?</span><span class="html">php</span>
<span class="attr">phpinfo</span>( );
?<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">body</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">html</span><span class="kwrd">&gt;</span> </pre>
<pre class="csharpcode">And, Run it:</pre>
<pre class="csharpcode"><a href="/wp/wp-content/uploads/2009/04/image_8.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_8.png" width="584" height="347" /></a> </pre>
<p>Woohoo!&#160; It worked!!!!!</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_9.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_9.png" width="507" height="436" /></a></p>
<p>Mission Accomplished in about 10 minutes.&#160; Not a perfect experience, but pretty darn good.&#160; BTW, I’m running 64Bit Vista RTM SP1, 4Gig of Ram on a Lenovo W500.</p>
<p>Hope this helps.</p>
<p>&#160;</p></p>
<hr />
<p>{Added 4/14/2009, this is the step I missed to do it correctly}</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_10.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_10.png" width="370" height="275" /></a></p>
<p>And then select the PHP checkbox:</p>
<p><a href="/wp/wp-content/uploads/2009/04/image_11.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2009/04/image_thumb_11.png" width="366" height="272" /></a></p>
