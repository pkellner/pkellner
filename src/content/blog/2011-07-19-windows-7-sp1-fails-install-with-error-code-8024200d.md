---
status: publish
published: true
pubDatetime: 2011-07-19T20:00:00.000Z
title: Windows 7 SP1 Fails Install With Error Code 8024200D
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1517
wordpress_url: https://peterkellner.net/2011/07/19/windows-7-sp1-fails-install-with-error-code-8024200d/
date: '2011-07-19 06:41:54 -0700'
date_gmt: '2011-07-19 13:41:54 -0700'
categories:
- Windows 7
tags: []
---
<p>It’s always disconcerting to have a <a href="http://windows.microsoft.com/en-US/windows/help/windows-update">windows update</a> fail.&#160; I in general think of these updates as things that happen in the background that I don’t need to worry about.&#160; Last week, I got a vague error, which after you lookup, basically says “you hand an error”.</p>
<p>So, I decided to give <a href="http://windows.microsoft.com/en-US/windows7/products/home">Microsoft Windows 7</a> support a try (which is a free service to genuine <a href="http://www.microsoft.com/">Microsoft</a> Windows 7 Users).&#160; I’d say things went well, though it might have been nice if the error sent me to the answer rather than a lengthy support process.</p>
<p>&#160;</p>
<h2>As It Happened</h2>
<p>&#160;</p>
<p>So, here is how things happened:</p>
<p>  <!--more--><br />
<h3>Contact Microsoft through their support web site</h3>
<p>The error itself took me to a web site that allowed me to file a support case for free.&#160; Immediately, I got the following back from an auto responder at 9:02AM</p>
<blockquote><p>==============================</p>
<p>CONFIRMATION</p>
<p>==============================</p>
<p>Thank you for contacting Microsoft. Your support request was successfully submitted.</p>
<p>A Microsoft support professional will contact you within the response time specified for the support that you chose. </p>
<p>Print or save this page or note the confirmation number for your reference. </p>
<p>==============================</p>
<p>INCIDENT DETAILS</p>
<p>==============================</p>
<p>Incident title: windows 7 update failed (sp1 I think)</p>
<p>Support request number: 115778719</p>
<p>Severity rating: Severity C (Minimum business impact) </p>
<p>Type of response: Email to <a href="mailto:peter@peterkellner.net">peter@peterkellner.net</a></p>
<p>Response time: Your expected response time is: 1 business day </p>
<p>View incident online: <a href="https://support.microsoft.com/viewincident">https://support.microsoft.com/viewincident</a></p>
<p>==============================</p>
<p>OTHER INFORMATION</p>
<p>==============================</p>
<p>Full name: Peter Kellner</p>
<p>E-mail address: …</p>
</blockquote>
<p>Followed 15 hours later by:</p>
<blockquote><p>Hello Peter,</p>
<p>Thank you for contacting Microsoft Customer Service.</p>
<p>Your request has been processed. A Support Professional will contact you via e-mail within 24 hours to assist with troubleshooting your issue.</p>
<p>Note: </p>
<p>If you are using a spam blocker, please make sure you can receive e-mail messages from *.microsoft.com. If you do not see the response from a Support Professional within the next 24 hours, please check your junk mail folder for an e-mail containing your case number which is listed in the subject line of this e-mail.</p>
<p>If you have any questions regarding this service request or need to update the service request notes, please reply to this e-mail with your case number in the subject line.</p>
<p>Thank you for using Microsoft products and services,</p>
<p>Microsoft Online Customer Service</p>
</blockquote>
<h3>A Proposed Solution</h3>
<p>Then, 3 hours later (or 18 hours from the problem start), I get a proposed solution from a human.</p>
<blockquote><p>Dear Peter,</p>
<p>Thank you for contacting Microsoft Online Support Service. My name is Joyce, and I am glad to work with you. For your reference, the case ID for this service request is SRX1157341819. You can contact me by sending an email to <a href="mailto:v-30joyh@mssupport.microsoft.com">v-30joyh@mssupport.microsoft.com</a> with the case ID in the subject line.</p>
<p>From the problem description, I understand that win7 sp1 fails to install with error 8024200D. If there has been any misunderstanding, please let me know. </p>
<p>I understand the inconvenience you have experienced. Please be assured that I will do my best to help you. </p>
<p>During the Windows 7 SP1 installation, one of the most common causes of failure occurs when a third-party application holds open a file or locks a file that the Service Pack installation program has to use. For example, a third-party antivirus or antispyware application may cause this problem. If you are running any third-party applications such as Spyblocker, Internet or web accelerators (programs designed to boost the speed of the Internet connection), security or anti-virus programs (McAfee, Norton, etc.), I recommend temporarily disabling or shutting them down during the troubleshooting process. Please be sure to re-enable them once the process has completed.</p>
<p>After that, let us try to run System Update Readiness Tool to replace incorrect data, corrupted files and registry keys on the system. I have included detailed steps below.</p>
<p>Step 1: Run the System Update Readiness Tool</p>
<p>====================================</p>
<p>1. Please download the System Update Readiness Tool from the link below according to the System Type:</p>
<p>System Update Readiness Tool for Windows 7 32-bit     <br /><a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=44e15787-66b0-4e9c-9c3b-1fc9ea40f69f">http://www.microsoft.com/downloads/en/details.aspx?FamilyID=44e15787-66b0-4e9c-9c3b-1fc9ea40f69f</a></p>
<p>System Update Readiness Tool for Windows 7 64-bit     <br /><a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=914fbc5b-1fba-4bae-a7c3-d2c47c6fcffc">http://www.microsoft.com/downloads/en/details.aspx?FamilyID=914fbc5b-1fba-4bae-a7c3-d2c47c6fcffc</a></p>
<p>2. Double click downloaded file to run the System Update Readiness Tool. Then restart the computer and install Windows 7 SP1.</p>
<p>If Windows 7 SP1 still cannot be installed, I suggest downloading the Standalone Installer and installing it in Clean Boot Mode.</p>
<p>Step 2: Download Windows 7 SP1 Standalone Installer</p>
<p>====================================================</p>
<p>1. Download Windows 7 SP1 Standalone Installer from the link below according to the System Type:</p>
<p><a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=c3202ce6-4056-4059-8a1b-3a9b77cdfdda">http://www.microsoft.com/downloads/en/details.aspx?FamilyID=c3202ce6-4056-4059-8a1b-3a9b77cdfdda</a></p>
<p>2. Please visit the above link and click Continue to finish validation. After that the Download buttons will appear.</p>
<p>If your system is Windows 7 32 bit system, please select the file windows6.1-KB976932-X86.exe to download.</p>
<p>If your system is Windows 7 64 bit system, please select the file windows6.1-KB976932-X64.exe to download.</p>
<p>Please do not select “Run” after clicking the Download button. We need to save the file to the local disk instead of run it from internet directly.</p>
<p>Step 3: Install Windows 7 SP1 in Clean Boot Mode</p>
<p>=========================================</p>
<p>Please disable all startup items and third party services when booting to avoid conflict when installing Windows 7 SP1. </p>
<p>1. Click &quot;Start&quot;, type: MSCONFIG in the search box and press Enter. </p>
<p>Note: Please click &quot;Continue&quot; if the &quot;User Account Control&quot; window pops up.</p>
<p>2. Click &quot;Services&quot;, check the &quot;Hide All Microsoft Services&quot; box and click &quot;Disable All&quot; (if it is not gray). </p>
<p>3. Click &quot;Startup&quot;, click &quot;Disable All&quot;, click &quot;OK&quot; and restart the computer.</p>
<p>Note: Temporarily disabling the Startup Group only prevents the startup programs from loading at startup. This shouldn't affect the system or other programs. We can manually run these programs later. </p>
<p>4. Please double click the downloaded Standalone Installer and follow the instructions to install Windows 7 SP1.</p>
<p>To restore the computer to use a Normal Startup, repeat step 1 above. Then click &quot;Normal Startup&quot; on the General tab, click &quot;OK&quot;, and then restart the computer.</p>
<p>If the issue persists, please collect a screenshot of the error message for further research. Please be sure that the information does not contain any of your confidential and private information. It’s for troubleshooting purposes only. Thank you for understanding.</p>
<p>How to capture a Screenshot</p>
<p>======================</p>
<p>1. When the error appears, please press the Print Screen key (PrtScn) on the keyboard. </p>
<p>2. Click &quot;Start&quot;, point to &quot;All Programs&quot;, point to &quot;Accessories&quot; and then click &quot;Paint&quot;. </p>
<p>3. In the Paint program, click the &quot;Edit&quot; menu, click &quot;Paste&quot;, click the &quot;File&quot; menu, and click &quot;Save&quot;. The &quot;Save As&quot; dialogue box will appear. Type a file name in the &quot;File name:&quot; box, for example: screenshot.</p>
<p>Note: Make sure &quot;JPEG (*.JPG;*.JPEG;*.JPE;*.JFIF)&quot; is selected in the &quot;Save as type&quot; box. Save the screenshot file to the Desktop.</p>
<p>Since our issue also can be caused by the corrupted system components. I also need the log file from the system update readiness tool. If I found any system errors from the log, we might need to involve one System Support later. Please be assured that Microsoft Support will do our best to help you fix the current problem.</p>
<p>Collect the CheckSUR.log file     <br />======================      <br />1. Click &quot;Start. Type &quot;%WINDIR%\Logs\CBS\CheckSUR.log&quot; (without the quotation marks) in the Search Bar and press Enter. We will see a file named &quot;CheckSUR.log&quot;       <br />2. Click on the &quot;File&quot; menu and then click on the &quot;Save As&quot;.      <br />3. From the left panel, click &quot;Desktop&quot; and click the Save button.       <br />4. The file will be saved to your Desktop. Please send the file as an attachment in an email to </p>
<p>Note: When attaching files to emails, the process will vary depending on the email application being used. While you are composing the email, most applications will provide you with either an &quot;Attach&quot; button or a Paper Clip Icon to click in order to attach a file. After clicking this button/icon you must browse to the file you wish to attach and select it by either double clicking it or clicking it once and then clicking &quot;Attach&quot;.</p>
<p>After obtaining the information, I will research it and get back to you as soon as possible. Please take your time with the steps and let me know the results at your earliest convenience. If there are any questions or concerns, feel free to contact me.</p>
<p>I look forward to your reply.</p>
<p>Best Regards,</p>
</blockquote>
<h3>My Solution Success</h3>
<p>I chose the standalone installer for my solution which did work.&#160; As advertised, it ran for several hours, but at the end, it did install successfully.</p>
<p>The screen I got to was this:</p>
<p><a href="/wp/wp-content/uploads/2011/07/image.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2011/07/image_thumb.png" width="526" height="454" /></a></p>
<p>&#160;</p>
<h3>Conclusion</h3>
<p>&#160;</p>
<p>Within 24 hours, as promised, my system was back up and running!&#160; I never actually had any down time so it was a good solution. It just required a little patience.</p>
