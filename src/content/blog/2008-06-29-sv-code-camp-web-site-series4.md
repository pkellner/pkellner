---
status: publish
published: true
pubDatetime: 2008-06-29T20:00:00.000Z
title: Creating a Modal Login Window Using the Telerik Modal RadWindow ComponentBuilding
  the Code Camp Web Site (Article 4)
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<br /><p>This article shows how to create a modal windows (not a popup)
  that displays a login windows (asking for username and password) in the middle of
  whatever asp.net page you are viewing.  It uses the Telerik Modal Radwindow control.
  \ At the end of a successful login, the login dialog redirects the web user to some
  page designated by the author.  It requires no Javascript programming by the programmer.
  \ Just simple method calls in the asp.net page.</p>"
wordpress_id: 118
wordpress_url: https://peterkellner.net/?p=286
date: '2008-06-29 08:47:43 -0700'
date_gmt: '2008-06-29 15:47:43 -0700'
categories:
- ASP.NET 3.5
- Best Practices
- Code Camp Web Site Series
- How Things Work
tags: []
---
<h3>Article Series</h3>
<table border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="100">Article 1:</td>
<td valign="top" width="600"><a href="/2008/05/13/codecampwebsiteseries1/">Best Practices for Building an ASP.NET quality web site</a></td>
</tr>
<tr>
<td>Article 2:</td>
<td><a href="/2008/05/19/codecampwebsiteseries2/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters</a></td>
</tr>
<tr>
<td>Article 3:</td>
<td><a href="/2008/05/25/codecampwebsiteseries3/">Creating a Theme For Each Year of Code Camp Using Skins in ASP.NET</a></td>
</tr>
<tr>
<td>Article 4:</td>
<td><a href="/2008/06/29/sv-code-camp-web-site-series4/">Creating a Modal Login Window Using the Telerik Modal RadWindow Component</a></td>
</tr>
<tr>
<td>Article 5:</td>
<td><a href="/2008/07/03/combine-email-lists-with-linq/">Using LINQ to Merge Mailing Lists and Filter Opt Outs</a></td>
</tr>
<tr>
<td>Article 6:</td>
<td><a href="/2009/03/27/codecampwebsiteseries6-cssfriendly-adapters-aspnet-menu/">Multi Level ASP.NET Menu with CSS Friendly Control Adapters (The Source Code!)</a></td>
</tr>
</tbody>
</table>
<p> <br />
<h2>Introduction</h2>
<p>This article shows how to create a modal windows (not a popup) that displays a login windows (asking for username and password) in the middle of whatever <a href="http://www.asp.net/">asp.net</a> page you are viewing.&#160; It uses the <a href="http://www.telerik.com/products/aspnet-ajax/controls/window/overview.aspx">Telerik Modal Radwindow</a> control.&#160; At the end of a successful login, the login dialog redirects the web user to some page designated by the author.&#160; It requires no <a href="http://www.javascript.com/">Javascript</a> programming by the programmer.&#160; Just simple method calls in the <a href="http://www.asp.net/">asp.net</a> page.</p>
<p> <!--more--> </p>
<h2>How it Looks to the Web User</h2>
<p>When the user press the login button in the upper right corner of the <a href="http://www.siliconvalley-codecamp.com/">Silicon Valley Code Camp web site</a>, below is the screen they see.</p>
<p><a href="/wp/wp-content/uploads/2008/06/test.png">     <br /> <img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="test" src="/wp/wp-content/uploads/2008/06/test-thumb.png" width="384" height="332" /></a></p>
<p>Notice that the screen behind actually fades out and is not able to be clicked by the web user.</p>
<h2>The Method Behind Creating the Modal Window</h2>
<p>OK, so there is a little bit of javascript you need to add to your page.&#160; Basically, what you do is in your master page, around where you have your login control, you put the following code into your aspx page.</p>
<div class="csharpcode">
<pre><span class="kwrd"></span></pre>
</div>
<div class="csharpcode">
<pre class="alt"><span class="lnum">   1:  </span> <span class="kwrd">&lt;</span><span class="html">asp:ScriptManager</span> <span class="attr">ID</span><span class="kwrd">=&quot;ScriptManager1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">EnablePartialRendering</span><span class="kwrd">=&quot;true&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre><span class="lnum">   2:  </span>    <span class="kwrd">&lt;</span><span class="html">table</span> <span class="attr">class</span><span class="kwrd">=&quot;headBar&quot;</span> <span class="attr">cellpadding</span><span class="kwrd">=&quot;0&quot;</span> <span class="attr">cellspacing</span><span class="kwrd">=&quot;0&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">   3:  </span>        <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">   4:  </span>            <span class="kwrd">&lt;</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">   5:  </span>                <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;headLogo&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">   6:  </span>                <span class="kwrd">&lt;</span><span class="html">asp:HyperLink</span> <span class="attr">ID</span><span class="kwrd">=&quot;HomeLink&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">NavigateUrl</span><span class="kwrd">=&quot;Default.aspx&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">   7:  </span>                    <span class="kwrd">&lt;</span><span class="html">asp:Image</span> <span class="attr">ID</span><span class="kwrd">=&quot;HeadLogo&quot;</span> <span class="attr">SkinID</span><span class="kwrd">=&quot;ImageLogo&quot;</span> <span class="attr">AlternateText</span><span class="kwrd">=&quot;Silicon Valley codecamp_08&quot;</span></pre>
<pre><span class="lnum">   8:  </span>                        <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt"><span class="lnum">   9:  </span>                <span class="kwrd">&lt;/</span><span class="html">asp:HyperLink</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  10:  </span>                </pre>
<pre class="alt"><span class="lnum">  11:  </span>               </pre>
<pre><span class="lnum">  12:  </span>                </pre>
<pre class="alt"><span class="lnum">  13:  </span>                <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  14:  </span>            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  15:  </span>            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">valign</span><span class="kwrd">=&quot;middle&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  16:  </span>                <span class="kwrd">&lt;</span><span class="html">span</span> <span class="attr">class</span><span class="kwrd">=&quot;headDate&quot;</span><span class="kwrd">&gt;</span>Saturday and Sunday, November 8th &amp; 9th, 2008<span class="kwrd">&lt;/</span><span class="html">span</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  17:  </span>            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  18:  </span>            <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">align</span><span class="kwrd">=&quot;right&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  19:  </span>                <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">class</span><span class="kwrd">=&quot;headLogin&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  20:  </span>                    <span class="kwrd">&lt;</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  21:  </span> </pre>
<pre><span class="lnum">  22:  </span>                        <span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  23:  </span>                            <span class="rem">//&lt;![CDATA[</span></pre>
<pre><span class="lnum">  24:  </span>                            <span class="rem">//show the window</span></pre>
<pre class="alt"><span class="lnum">  25:  </span>                            <span class="kwrd">function</span> showDialog()</pre>
<pre><span class="lnum">  26:  </span>                            {                    </pre>
<pre class="alt"><span class="lnum">  27:  </span>                                <span class="rem">//Force reload in order to guarantee that the onload event handler </span></pre>
<pre><span class="lnum">  28:  </span>                                <span class="rem">// of the dialog which configures it executes on every show.</span></pre>
<pre class="alt"><span class="lnum">  29:  </span>                                <span class="kwrd">var</span> oWnd = window.radopen(<span class="kwrd">null</span>, <span class="str">&quot;DialogWindow&quot;</span>);</pre>
<pre><span class="lnum">  30:  </span>                                oWnd.setUrl(oWnd.get_navigateUrl());</pre>
<pre class="alt"><span class="lnum">  31:  </span>                            }</pre>
<pre><span class="lnum">  32:  </span>                            </pre>
<pre class="alt"><span class="lnum">  33:  </span>                           </pre>
<pre><span class="lnum">  34:  </span>                            <span class="rem">// Called when a window is being closed.  (force refresh)</span></pre>
<pre class="alt"><span class="lnum">  35:  </span>                            <span class="kwrd">function</span> OnClientclose(radWindow)</pre>
<pre><span class="lnum">  36:  </span>                            {     </pre>
<pre class="alt"><span class="lnum">  37:  </span>                                 window.location.href = <span class="str">&quot;News.aspx&quot;</span>;           </pre>
<pre><span class="lnum">  38:  </span>                            }    </pre>
<pre class="alt"><span class="lnum">  39:  </span>                            <span class="rem">//]]&gt;            </span></pre>
<pre><span class="lnum">  40:  </span>                        <span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  41:  </span> </pre>
<pre><span class="lnum">  42:  </span>                        <span class="kwrd">&lt;</span><span class="html">asp:ImageButton</span> <span class="attr">ID</span><span class="kwrd">=&quot;IDLoginButton&quot;</span> <span class="attr">SkinID</span><span class="kwrd">=&quot;ButtonLogin&quot;</span> </pre>
<pre class="alt"><span class="lnum">  43:  </span>                            <span class="attr">OnClientClick</span><span class="kwrd">=&quot;showDialog();return false;&quot;</span></pre>
<pre><span class="lnum">  44:  </span>                            <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="kwrd">/&gt;</span>   </pre>
<pre class="alt"><span class="lnum">  45:  </span>                        <span class="kwrd">&lt;</span><span class="html">asp:LoginStatus</span> <span class="attr">ID</span><span class="kwrd">=&quot;IDLoginStatus1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre><span class="lnum">  46:  </span>                        <span class="kwrd">&lt;</span><span class="html">asp:LoginName</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">ID</span><span class="kwrd">=&quot;IDLoginName1&quot;</span> <span class="kwrd">/&gt;</span></pre>
<pre class="alt"><span class="lnum">  47:  </span>                        <span class="kwrd">&lt;</span><span class="html">telerik:RadWindowManager</span> <span class="attr">ID</span><span class="kwrd">=&quot;Singleton&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  48:  </span>                            <span class="kwrd">&lt;</span><span class="html">Windows</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  49:  </span>                                <span class="kwrd">&lt;</span><span class="html">telerik:RadWindow</span> <span class="attr">ID</span><span class="kwrd">=&quot;DialogWindow&quot;</span> <span class="attr">Behaviors</span><span class="kwrd">=&quot;Close&quot;</span> </pre>
<pre><span class="lnum">  50:  </span>                                    <span class="attr">ReloadOnShow</span><span class="kwrd">=&quot;true&quot;</span> <span class="attr">OnClientClose</span><span class="kwrd">=&quot;OnClientclose&quot;</span></pre>
<pre class="alt"><span class="lnum">  51:  </span>                                    <span class="attr">BackColor</span><span class="kwrd">=&quot;Gray&quot;</span> <span class="attr">Modal</span><span class="kwrd">=&quot;true&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">Height</span><span class="kwrd">=&quot;250&quot;</span> </pre>
<pre><span class="lnum">  52:  </span>                                    <span class="attr">NavigateUrl</span><span class="kwrd">=&quot;./Login.aspx&quot;</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  53:  </span>                                <span class="kwrd">&lt;/</span><span class="html">telerik:RadWindow</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  54:  </span>                            <span class="kwrd">&lt;/</span><span class="html">Windows</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  55:  </span>                        <span class="kwrd">&lt;/</span><span class="html">telerik:RadWindowManager</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  56:  </span>                        </pre>
<pre class="alt"><span class="lnum">  57:  </span>                        <span class="kwrd">&lt;</span><span class="html">asp:HyperLink</span> <span class="attr">ID</span><span class="kwrd">=&quot;HyperLinkForgotChangePassword&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> </pre>
<pre><span class="lnum">  58:  </span>                             <span class="attr">NavigateUrl</span><span class="kwrd">=&quot;~/PasswordIssues.aspx&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Forgot Password?&quot;</span> <span class="kwrd">&gt;&lt;/</span><span class="html">asp:HyperLink</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  59:  </span>                        </pre>
<pre><span class="lnum">  60:  </span>                    <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  61:  </span>                    </pre>
<pre><span class="lnum">  62:  </span>                <span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span></pre>
<pre class="alt"><span class="lnum">  63:  </span>            <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<pre><span class="lnum">  64:  </span>        <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span></pre>
</div>
<p>Line 22 to 40 shows the javascript.&#160; Basically, you are calling the Telerik window.radopen method which is associated with the tag on line 49.&#160; It automatically navigates to the login.aspx page which is referenced in line 52.&#160; When the page closes, the javascript on line 37 tells the browser to redirect to the News.aspx page.&#160; The reason I do this is because if you don't change pages, I've found the the login cookie is not set (Authorization cookie).&#160; When this happens, even though the person is logged in, they do not see that they are until a page refresh happens.&#160; Very confusing to the user.</p>
<h2>Conclusions</h2>
<p>That is really all this is to adding a windows that displays in the middle of your page.&#160; It's so much nicer than having to send the user to a separate page to login.&#160; They can see where they are as they are logging in.&#160; I hope this helps you.&#160; I find it a very useful technique I can use in lots of web sites.</p>
