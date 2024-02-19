---
status: publish
published: true
pubDatetime: 2011-03-19T20:00:00.000Z
title: My Windows Azure Web Deploy Stopped Working Because My Certificate Expired
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1445
wordpress_url: https://peterkellner.net/2011/03/19/my-windows-azure-web-deploy-stopped-working-because-my-certificate-expired/
date: '2011-03-19 15:47:48 -0700'
date_gmt: '2011-03-19 22:47:48 -0700'
categories:
- Azure
tags: []
---
<p>This is one of those things that you do once every year or so and it is very easy to forget how to do it the next time. I’d almost prefer my Cert’s to expire every week so I get in the swing of fixing it (just kidding).</p>
<p>So, I tried do a web deploy to my <a href="http://www.microsoft.com/windowsazure/">Windows Azure</a> Instance this morning and I got a cryptic error that I blogged about here:&#160; <a title="http://social.msdn.microsoft.com/Forums/en-US/windowsazuredevelopment/thread/3b1b6204-2a5f-4fe0-aebc-5245edf46c82" href="http://social.msdn.microsoft.com/Forums/en-US/windowsazuredevelopment/thread/3b1b6204-2a5f-4fe0-aebc-5245edf46c82">http://social.msdn.microsoft.com/Forums/en-US/windowsazuredevelopment/thread/3b1b6204-2a5f-4fe0-aebc-5245edf46c82</a></p>
<p>It looks something like this:</p>
<p>&#160;</p>
<div id="codeSnippetWrapper">
<pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: &#39;Courier New&#39;, courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">Error 1 Web deployment task failed.(Remote agent <br />(URL https://xxx.cloudapp.net:8172/MsDeploy.axd?site=Web_IN_0_Web) could not be <br />contacted.  Make sure the remote agent service is installed and started on the target computer.)<br />Make sure the site name, user name, and password are correct. <span style="color: #0000ff">If</span> the issue is not resolved, <br />please contact your <span style="color: #0000ff">local</span> or server administrator.<br />Error details:<br />Remote agent (URL https://xxx.cloudapp.net:8172/MsDeploy.axd?site=Web_IN_0_Web)<br /> could not be contacted.  Make sure the remote agent service is <br />installed and started on the target computer.<br />An unsupported response was received. The response header 'MSDeploy.Response' was <br />'' but 'v1' was expected.<br />The remote server returned an error: (401) Unauthorized. <br />C:\Program Files (x86)\MSBuild\Microsoft\VisualStudio\v10.0\Web\Microsoft.Web.Publishing.targets 3847 5 Web<br /></pre>
</div>
<div>They key is really one word.&#160; (401) Unauthorized.&#160; The rest is just confusing.&#160; What tipped me off is that I tried to remote into the session with RDP and I got an error that says “username password expired”.</div>
<div>&#160;</div>
<div>So, here are the steps to re-up your password expiration.&#160; I got this from the post here:&#160; </div>
<div>&#160;</div>
<div><a title="http://msdn.microsoft.com/en-us/library/gg443832.aspx" href="http://msdn.microsoft.com/en-us/library/gg443832.aspx">http://msdn.microsoft.com/en-us/library/gg443832.aspx</a></div>
<div>&#160;</div>
<p><!--more--></p>
<div>&#160;</div>
<div>Here we go.</div>
<div>&#160;</div>
<div>First, right click on your azure project and choose publish.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb.png" width="380" height="96" /></a></div>
<div>&#160;</div>
<div>Then, choose “Configure Remote Desktop connections”.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_3.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_3.png" width="312" height="328" /></a></div>
<div>&#160;</div>
<div>From there, make sure “Enable connections for all roles” is checked, then choose the bottom choice “Create”.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_4.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_4.png" width="199" height="353" /></a></div>
<div>&#160;</div>
<div>Give your cert a new name.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_5.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_5.png" width="244" height="105" /></a></div>
<div>&#160;</div>
<div>&#160;</div>
<div>Make sure you set the expiration date far in the future.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_6.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_6.png" width="244" height="234" /></a></div>
<div>&#160;</div>
<div>Don’t press OK!!! instead, click on the “View button next to your new cert in the dialog above</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_7.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_7.png" width="196" height="244" /></a></div>
<div>&#160;</div>
<div>Select the button “CopyToFile”</div>
<div>&#160;</div>
<div>Make sure you say “Yes, export the private key in the next dialog”.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_8.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_8.png" width="244" height="162" /></a></div>
<div>&#160;</div>
<div>Take the default for the next choice.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_9.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_9.png" width="244" height="216" /></a></div>
<div>&#160;</div>
<div>Retype in your password from the dialog 4 back.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_10.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_10.png" width="244" height="214" /></a></div>
<div>&#160;</div>
<div>Finally, give it a filename where you want to export your cert.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_11.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_11.png" width="244" height="95" /></a></div>
<div>&#160;</div>
<div>Press Finish.</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_12.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_12.png" width="244" height="155" /></a></div>
<div>&#160;</div>
<div>You get rewared wih…</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_13.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_13.png" width="211" height="157" /></a></div>
<div>&#160;</div>
<div>Press OK to the next message</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_14.png"><img style="background-image: none; border-right-width: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_14.png" width="244" height="238" /></a></div>
<div>&#160;</div>
<div>And now, you can deploy your package!!!</div>
<div>&#160;</div>
<div>(and, don’t forget to update your certificate into your windows azure portal and delete the old one)</div>
<div>&#160;</div>
<div><a href="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_15.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/FilesForWebDownload/My-Windows-Azure-Web-Deploy-Stopped-Work_DA16/image_thumb_15.png" width="379" height="138" /></a></div>
<div>&#160;</div>
<div>Clear as mud, right?</div>
<div>&#160;</div>
<div>I wonder if this is so hard on mac’s.?</div>
<div>&#160;</div>
<div>&#160;</div>
<div>&#160;</div>
<div>&#160;</div>
<div></div>
<div></div>
<div></div>
