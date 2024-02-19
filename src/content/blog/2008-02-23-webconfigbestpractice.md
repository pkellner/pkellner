---
status: publish
published: true
pubDatetime: 2008-02-23T20:00:00.000Z
title: Best Practices for Configuring ASP.NET ConnectionStrings and AppSettings in
  Web.Config
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: "<p>This article shows a good way to manage connection string and appsettings
  values in your web.config file.  It shows how to use include files and talks about
  how to set defaults so moving to production from testing or development can be less
  painful</p>"
wordpress_id: 102
wordpress_url: https://peterkellner.net/2008/02/23/webconfigbestpractice/
date: '2008-02-23 14:25:22 -0800'
date_gmt: '2008-02-23 21:25:22 -0800'
categories:
- ASP.NET 3.5
- Best Practices
- Visual Studio
tags: []
---
<h2>The Typical Way</h2>
<p>When you first create an asp.net project a file is usually created in your root web directory called web.config.&#160; By default there are two (usually empty) sections in the file.&#160; One for appSettings, and one for connectionStrings.&#160; Below is a default project created with visual studio 2008 and a sample web.config file.</p>
<p><img style="border-right-width: 0px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" border="0" alt="webconfig1" src="/wp/wp-content/uploads/2008/02/webconfig1.jpg" /></p>
<p> <!--more-->
<p>The thing you would normally do is put stuff in those tags that your application would use.&#160; That is, you would would likely put in a sqlserver connection in the connection tag, then in your appsettings section, you might put something like your smtp mail server location.&#160; Here is what this might look like after you have configured your settings.</p>
<pre class="csharpcode">  <span class="kwrd">&lt;</span><span class="html">appSettings</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">key</span><span class="kwrd">=&quot;UseCache&quot;</span> <span class="attr">value</span><span class="kwrd">=&quot;True&quot;</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">key</span><span class="kwrd">=&quot;MapsKey&quot;</span> <span class="attr">value</span><span class="kwrd">=&quot;1234567890-AA&quot;</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">key</span><span class="kwrd">=&quot;SMTPServer&quot;</span> <span class="attr">value</span><span class="kwrd">=&quot;smtp.peterkellner.net&quot;</span><span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">appSettings</span><span class="kwrd">&gt;</span>

  <span class="kwrd">&lt;</span><span class="html">connectionStrings</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">clear</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;LocalSqlServer&quot;</span>
          <span class="attr">connectionString</span><span class="kwrd">=&quot;Data Source=(local);Initial Catalog=aspnetdb;Integrated Security=True&quot;</span>
          <span class="attr">providerName</span><span class="kwrd">=&quot;System.Data.SqlClient&quot;</span> <span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">connectionStrings</span><span class="kwrd">&gt;</span></pre>
<pre class="csharpcode"><span class="kwrd"></span></pre>
<p>The problem with this approach is that when you deploy your application to a new server, you might want to change your SMTPServer in the AppSettings, and you might want to change your connection string in your ConnectionStrings section.&#160; Usually what happens is that you have to have a separate web.config that you use for production.&#160; The problem is, of course, that you have other things in your web.config that change as you build your application.&#160; You may for example add a new page handler and this means you have to maintain one web.config for production and one for development and you have to modify both of them each time you change something.</p>
<h2>A Better Way</h2>
<p>A solution to this problem (though not the best so read on after this), is to extract appSettings and connectionStrings to a separate file on your server.&#160; Then, you can leave those files on the server and not worry about those changing.&#160; The way this looks is as follows.&#160; You will now have three files to worry about.&#160; web.config (which you had before), and two new files, webAppSettings.config and WebConnectionString.config.&#160; Here are what these three files now look like.</p>
<h3>Web.Config:</h3>
<pre class="csharpcode">  &lt;appSettings file=<span class="str">&quot;webAppSettings.config&quot;</span>&gt;
  &lt;/appSettings&gt;

  &lt;connectionStrings configSource=<span class="str">&quot;WebConnectionString.config&quot;</span>&gt;
  &lt;/connectionStrings&gt;


  &lt;system.web&gt;
        &lt;!-- </pre>
<h3>WebAppSettings.config</h3>
<pre class="csharpcode">&lt;appSettings&gt;
  &lt;add key=<span class="str">&quot;UseCache&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;True&quot;</span>/&gt;
  &lt;add key=<span class="str">&quot;MapsKey&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;1234567890-AA&quot;</span>/&gt;
  &lt;add key=<span class="str">&quot;SMTPServer&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;smtp.peterkellner.net&quot;</span>/&gt;
&lt;/appSettings&gt;</pre>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}<br />
.csharpcode pre { margin: 0em; }<br />
.csharpcode .rem { color: #008000; }<br />
.csharpcode .kwrd { color: #0000ff; }<br />
.csharpcode .str { color: #006080; }<br />
.csharpcode .op { color: #0000c0; }<br />
.csharpcode .preproc { color: #cc6633; }<br />
.csharpcode .asp { background-color: #ffff00; }<br />
.csharpcode .html { color: #800000; }<br />
.csharpcode .attr { color: #ff0000; }<br />
.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}<br />
.csharpcode .lnum { color: #606060; }</style>
<h3>WebConnectionString.config</h3>
<pre class="csharpcode">&lt;connectionStrings&gt;
    &lt;clear/&gt;
    &lt;add name=<span class="str">&quot;LocalSqlServer&quot;</span>
        connectionString=<span class="str">&quot;Data Source=(local);Initial Catalog=aspnetdb;Integrated Security=True&quot;</span>
        providerName=<span class="str">&quot;System.Data.SqlClient&quot;</span> /&gt;
&lt;/connectionStrings&gt;</pre>
<p>This actually works, but there is even a best way.</p>
<h2>The Best Way</h2>
<p>I didn't realize it until Conrad Cady, a senior developer at our company pointed this out to me.&#160; Basically, it turns out that you can put default values in your web.config AND also have the file= tag in the appSettings tag.&#160; Unfortunately, this only works with AppSetting and the file tag.&#160;&#160; For the connectionStrings, you can not have values inside the connectionString tag if you use the configSource attribute.&#160; That is, you can create a web.config file that looks like the following:</p>
<pre class="csharpcode">&lt;appSettings file=<span class="str">&quot;webAppSettings.config&quot;</span>&gt;
    &lt;add key=<span class="str">&quot;UseCache&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;True&quot;</span>/&gt;
    &lt;add key=<span class="str">&quot;MapsKey&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;1234567890-AA&quot;</span>/&gt;
    &lt;add key=<span class="str">&quot;SMTPServer&quot;</span> <span class="kwrd">value</span>=<span class="str">&quot;smtp.peterkellner.net&quot;</span>/&gt;
  &lt;/appSettings&gt;

  &lt;connectionStrings configSource=<span class="str">&quot;WebConnectionString.config&quot;</span>&gt;
  &lt;/connectionStrings&gt;</pre>
<p>What happens is that if you have values in your webAppSettings.config file, they will override what is in your web.config appSettings section. If you have no webAppSettings.config file, then all the values in web.config webAppSettings section are used. </p>
<p>connectionStrings unfortunately does not work the same.&#160; You MUST have a WebConnectionString.config file for this setup and you MUST NOT have any values inside the connectionStrings tag in the web.config file.</p>
<h2>How to Use the &quot;Best Way&quot; in Real Life </h2>
<p>So, the title of this article is &quot;Best Practices&quot;.&#160; So, what is the best practice.&#160; Well, IMHO the best practice is to have your production AppSettings in your web.config file and not have an external file checked into source control (that is, don't check in webAppSettings.config).&#160; Only create that file for development servers where you want to override you default (web.config) appSettings keys and attributes.&#160; For connectionStrings, I recommend always using an external file but don't actually check it into source control.&#160; Instead, check in a file named WebConnectionString.config.sample and on each environment where you are running a web server, rename that file to WebConnectionString.config so that it will actually be used.&#160; Again, the most important thing is NOT to check into source control a file called WebConnectionString.config or webAppSettings.config.&#160; Both should have sample versions checked in, but not actual ones.&#160; That way, you will avoid overwriting real ones when you check out your source control to a working directory.</p>
