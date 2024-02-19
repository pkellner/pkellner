---
status: publish
published: true
pubDatetime: 2006-03-02T20:00:00.000Z
title: AJAX Meets ASP.NET 2.0 Membership Management For IIS
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: This article extends one of the web pages developed in Part II of this series
  using Microsoft's implementation of AJAX called Atlas.  You can view a live demonstration
  of the technology developed in this article at the URL  <a href="http://livedemos.peterkellner.net/AJAXDemo">http://livedemos.peterkellner.net/AJAXDemo</a>.
wordpress_id: 19
wordpress_url: "/?p=1"
date: '2006-03-02 12:34:44 -0800'
date_gmt: '2006-03-02 19:34:44 -0800'
categories:
- ".Net 2.0"
- Membership
- MSDN Articles
- ASP.NET 2.0
tags: []
---
<table border="0" align="left">
<tbody>
<tr>
<td class="title">
<div align="center">Microsoft ASP.NET 2.0 Member/Role Management with IIS, Part 3: AJAX Enhancements with Microsoft's Atlas </div>
</td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<table border="0" cellpadding="2" width="200">
<tbody>
<tr>
<td>Peter Kellner</td>
</tr>
<tr>
<td><a href="https://peterkellner.net">https://peterkellner.net</a></td>
</tr>
<tr>
<td>March 2006</td>
</tr>
</tbody>
</table>
<p>Applies to:</p>
<blockquote><p>Microsoft ASP.NET 2.0</p>
<p>Microsoft Visual Studio 2005</p>
<p>Microsoft Internet Information Services</p>
</blockquote>
<p>&#160;<a class="style2" href="http://livedemos.peterkellner.net/">Run Live Demonstration Of AJAX Technology</a></p>
<p class="style2"><a href="/download-manager/">Click Here for Source Code Associated With This Article</a>&#160; </p>
<hr />
<h4>Contents</h4>
<p>Introduction    <br />What is AJAX and Atlas     <br />Background     <br />The AJAX Enhanced Version     <br />Technologies Used in AJAX Enhanced Version     <br />Steps Involved in Building (or upgrading) to AJAX using Atlas     <br />Using UpdatePanel ASP.NET Tag     <br />What is Really Happening     <br />Enhancing the TextBox for User Search     <br />Conclusions&#160; </p>
<p> <!--more--><br />
<h2>Introduction</h2>
<p>This article extends one of the web pages developed in Part II of this series using Microsoft's implementation of AJAX called Atlas. It utilized two techniques for reducing web server traffic to the browser to enhance the users web experience. The first technique uses the UpdatePanel tags to limit the refreshed area of the web page to limited areas and the second has to do with implementing some javascript using Atlas techniques so that the web page is updated on every key stroke in a textbox. A user list is displayed based on what is actively typed into this textbox. After reading this article the developer will be able to implement AJAX (Microsoft's implementation Atlas) in their own application.</p>
<h2>What is AJAX and Atlas</h2>
<p>AJAX is an acronym for <strong>A</strong>synchronous <strong>J</strong>avaScript <strong>A</strong>nd <strong>X</strong>ML. It is a technique for making interactive web applications more responsive. It does this by exchanging small amounts of information between the web server and the web client, thereby reducing the amount of traffic to the web client and making the application more responsive. Without AJAX, each time a page is refreshed (or a postback in generated) the complete page must be retransmitted to the users web browser. This is somewhat mitigated by the local cache on the web browser, but still overkill since most of the information on a postback to a web page does not change.</p>
<p>Atlas is Microsoft's implantation of AJAX. It is designed to make it relatively easy for software engineer, already skilled in ASP.NET 2.0 to take advantage of AJAX. Though Atlas has huge capabilities (which, by the way come with a huge learning curve), it is very easy to implement the basics of AJAX and significantly improve the user experience of a web site designed with ASP.NET 2.0 as well be shown in this article.</p>
<p>&#160;&#160;&#160;&#160;<br />
<h2>Background</h2>
<p>Managing membership and roles for ASP.NET 2.0 using ObjectDataSource technology was developed in a previous article published by this author in MSDN ( <a href="http://msdn.microsoft.com/en-us/library/aa478947.aspx">http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dnaspp/html/ASP2memroleman.asp</a> ). This article stepped through the inner workings of an ObjectDataSource that allowed for the easy creation of gridviews, dataviews, or any other databound control. It also presented a best practices solution in the form of a ASP.NET 2.0 web page (aspx file). The solution allowed for adding, modifying and deleting members, adding and deleting roles, as well as assigning users to roles. The solution is functionally similar to what comes with Visual Studio 2005 under the menu item &quot;Website / ASP.NET Configuration&quot;. The major benefit is that this solution works 100% with IIS 5.1 and 6.0 and gives the software engineer complete customization control of what is presented to the user. It would normally be set to administrator access only. Below is a screen shot of this application previously developed.</p>
<p><a href="http://livedemos.peterkellner.net/AJAXDemo/DefaultNoAjax.aspx"><img border="1" src="/wp/wp-content/uploads/2006/03/DefaultNoAjax.gif" width="450" height="245" /></a></p>
<p><a href="http://livedemos.peterkellner.net/AJAXDemo/DefaultNoAjax.aspx"></a></p>
<p>This application shown above has no AJAX technology in it. This means that every interaction you have with the web form requires a full page refresh of html from the web server. In this case, a picture is not worth very many words, but a URL will certainly make the point. Go to the URL: <a href="http://livedemos.peterkellner.net/AJAXDemo/Default.aspx">http://livedemos.peterkellner.net/AJAXDemo/Default.aspx</a> and play with the web site. Feel completely free to search on this data, add new users, add roles, assign and unassign roles as you please noticing at the time how the page reacts to changes. In particular, note the Search button on top for finding users. This search is a little different than you would normally expect. Instead of looking for exact matches, it effectively finds usernames that begin with what you have typed in the textbox when you press the search button. In the next section, the AJAX enhanced version, the search button is gone and as the username is typed into the textbox, the list of usernames will be automatically updated. This could have been done here also, however it would have caused a complete refresh of the page on every keystroke. Not only would the performance have been unacceptable, it would also have been unusable with all the flashing while typing. This is why in non-AJAX applications, there is almost always a button to press when data is finished being entered.</p>
<p>While you are running the demonstration program, notice at the top of the page there is a link that takes you to the same application without AJAX. Notice that in this application, there is a button for search. Notice also when you check and uncheck the checkboxes to display Manage Roles or Create New Users, those sections turn on and off with a lot of screen refreshing. Also notice the difference when you edit users and assign or unassign roles. </p>
<h2>The AJAX Enhanced Version</h2>
<p>Without actually running the web application, the only visual change the user can see in the AJAX enhanced version of this application is that there is no search button above the user list. This is because with AJAX, as the user types in the search criteria, the list of users is automatically restricted to the search criteria defined by users that begin with what is typed. Notice in the screen shot below, ch is entered into the username textbox and just the usernames beginning with ch automatically appear. </p>
<p><a href="http://livedemos.peterkellner.net/AJAXDemo/Default.aspx"><img border="1" src="/wp/wp-content/uploads/2006/03/DefaultWithAjax.gif" width="450" height="245" /></a>&#160;</p>
<h2>Technologies Used in AJAX Enhanced Version</h2>
<p>Obviously, Microsoft's Atlas is the primary technology used to implement AJAX. Atlas has lots of functionality and capability, however in this article (and the code associated with the AJAX enhanced Membership Editor), there is just a small part of Atlas being used. Actually, there are only two technologies going on. One has to do with the updates on the screen not requiring complete html refreshes between postbacks, and the other has to do with extending the functionality of the TextBox control the user enters the name for search. Because the default TextBox has no event associated with characters changing (it only has an event which generates a postback for TextChanged) the TextBox has to be enhanced to deal with the javascript function OnTextChanged. </p>
<h2>Steps Involved in Building (or upgrading) to AJAX using Atlas</h2>
<p>In order to Atlas enable an application you need to make several changes to your project. I won't go through all the details, however, the basics are you need to copy in the Atlas script library, modify your web.config, add the atlas dll to your project and finally, add some initializing tags in your aspx pages. The other way to begin working with Atlas (and is it was done to convert the project associated with this article) is first download the new Atlas template from Microsoft's Atlas web site. Then, create a new web project using the newly installed Atlas template. Next, rename the default.aspx file in case you have your own, then copy in all your existing libraries and pages. Finally, add your sections to the Atlas enabled web.config file and make sure everything works as before with no Atlas functionality. The final step is to look at the original default.aspx file and copy the Atlas constructs into the headers of an existing page you want to add AJAX capabilities.</p>
<p>It is recommended not to put Atlas in your master page because there are undoubtedly pages that do not need AJAX capability. It is better to put that capability in only the pages you need to keep things simple.</p>
<h2>Using UpdatePanel ASP.NET Tag</h2>
<p>Below is the actual UpdatePanel asp.net control surrounding the checkboxes that let you turn on and off the Role Management, and the Create of New User section. It's the two checkboxes half way down the web screen.</p>
<p> 
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:UpdatePanel</span> <span class="attr">ID</span><span class="kwrd">=&quot;UpdatePanelCheckBoxes&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">contenttemplate</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">table</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;</span><span class="html">tr</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">align</span><span class="kwrd">=&quot;left&quot;</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:CheckBox</span> <span class="attr">ID</span><span class="kwrd">=&quot;CheckBoxManageRoles&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Manage Roles&quot;</span>
          <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoPostBack</span><span class="kwrd">=&quot;True&quot;</span> <span class="attr">Checked</span><span class="kwrd">=&quot;True&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">align</span><span class="kwrd">=&quot;right&quot;</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:CheckBox</span> <span class="attr">ID</span><span class="kwrd">=&quot;CheckBoxAddUser&quot;</span> <span class="attr">Text</span><span class="kwrd">=&quot;Create New Users&quot;</span>
         <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span> <span class="attr">AutoPostBack</span><span class="kwrd">=&quot;True&quot;</span> <span class="attr">Checked</span><span class="kwrd">=&quot;True&quot;</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;/</span><span class="html">tr</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">table</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;/</span><span class="html">contenttemplate</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">atlas</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>The UpdatePanel control is the control that will most likely be used the most. By surrounding parts of the web page that will change on the postback, this causes the affect of letting this section update with out actually a screen refresh. Essentially, what Atlas does on a page that is Atlas enabled, is it lets all the normal asp.net page lifecycle events process normally (including the Page_Init method) but instead of redisplaying all the HTML in the Page_Render method, it knows to only update code inside the UpdatePanels defined on the web page. In reality what is happening is Atlas is simulating a postback instead of doing a real one.</p>
<p>Something that must be set also is in the ScriptManager tag, for this to actually work, the EnablePartialRendering must be set to true as shown below. If it is not set, then the page behaves as if the UpdatePanel tags are not there.</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:ScriptManager</span> <span class="attr">ID</span><span class="kwrd">=&quot;ScripManager&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
   <span class="attr">EnablePartialRendering</span><span class="kwrd">=&quot;true&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">atlas</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>The final thing to do is to surround all the areas on the aspx page with these UpdatePanel tags. Once this is done, VS2005 does a nice job of showing the UpdatePanel areas. The screen shot below shows the actual screen shot of the page used to manage members. Notice all the UpdatePanel tags displayed above the regions. Clicking on the image will display a large one which is much easier to see the details.</p>
<p><a href="/wp/wp-content/uploads/2006/03/vs2005UpdatePanels.gif"><img border="1" src="/wp/wp-content/uploads/2006/03/vs2005UpdatePanels_small.gif" width="450" height="245" /></a></p>
<p>Trigger tags go hand in hand with the UpdatePanel control. Essentially, you can nest trigger controls in the UpdatePanel control and that will specify when the UpdatePanel will actually be posted back. You can specify triggers in two ways. The first way is on some control event such as the EventName &quot;Click&quot; on the button control. The other way is on some control value changing. with that, you would specify the controlID and the property name. There are no examples of triggers in the article download. The code below is just an example of typical code.</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:UpdatePanel</span> <span class="attr">ID</span><span class="kwrd">=&quot;Panel1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">contenttemplate</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:TextBox</span> <span class="attr">ID</span><span class="kwrd">=&quot;TextBox1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:Button</span> <span class="attr">ID</span><span class="kwrd">=&quot;Button1&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span><span class="kwrd">&gt;&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;/</span><span class="html">contenttemplate</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">triggers</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:ControlEventTrigger</span> <span class="attr">ControlID</span><span class="kwrd">=&quot;Button1&quot;</span> <span class="attr">EventName</span><span class="kwrd">=&quot;Click&quot;</span> <span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:ControlValueTrigger</span> <span class="attr">ControlID</span><span class="kwrd">=&quot;TextBox1&quot;</span> <span class="attr">PropertyName</span><span class="kwrd">=&quot;Text&quot;</span>   <span class="kwrd">/&gt;</span>
 <span class="kwrd">&lt;/</span><span class="html">triggers</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">atlas</span><span class="kwrd">&gt;</span></pre>
<p></p>
<h2>What is Really Happening</h2>
<p>To understand what is really happening with these UpdatePanel tags, it is helpful to look at the source generated for the web page. Essentially what is happening is that for every control on your web page that is surrounded by the UpdatePanel tags, javascript is created which forces a postback on every click. For example, just looking at the checkboxAddUser control, the following is what is generated.</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">td</span> <span class="attr">align</span><span class="kwrd">=&quot;right&quot;</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">label</span> <span class="attr">for</span><span class="kwrd">=&quot;CheckBoxAddUser&quot;</span><span class="kwrd">&gt;</span>Create New Users<span class="kwrd">&lt;/</span><span class="html">label</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;</span><span class="html">input</span> <span class="attr">id</span><span class="kwrd">=&quot;CheckBoxAddUser&quot;</span>
   <span class="attr">type</span><span class="kwrd">=&quot;checkbox&quot;</span> <span class="attr">name</span><span class="kwrd">=&quot;CheckBoxAddUser&quot;</span>
   <span class="attr">checked</span><span class="kwrd">=&quot;checked&quot;</span> <span class="attr">onclick</span>=
   <span class="kwrd">&quot;javascript:setTimeout
   ('__doPostBack('CheckBoxAddUser','')', 0)&quot;</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">td</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>This is in addition to all the javascript references that include lots of other javascripts. The bottom line here is that if you include Atlas in your web pages, the actual payload size delivered to your web page in bytes will be significantly larger on the first download then it would be without Atlas. Subsequent requests are of course much smaller because, depending on how you design your page, only small amounts of data need to be returned on each future postback.</p>
<h2>&#160;</h2>
<h2>Enhancing the TextBox for User Search</h2>
<p>The textbox search functionality is a little more tricky. It involves adding javascript which reacts to keystrokes changes. The reason this is necessary is because there is not event in the TextBox control that responds to keyboard clicks. There is only an event that reacts to text changes which is not good enough for our needs. In this application, I am using javascript from The <a href="http://aspadvice.com/blogs/garbin/archive/2006/02/25/15360.aspx">Atlas Notes Blog</a> by Garbin</p>
<p>The steps necessary to make this work are as follows:</p>
<p>Add the TextChangedBehavior.js to the ScriptLibrary folder</p>
<p>Add just below the &lt;form&gt; tag of your aspx page a line that includes the new javascript</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:ScriptManager</span> <span class="attr">ID</span><span class="kwrd">=&quot;sm&quot;</span> <span class="attr">runat</span><span class="kwrd">=&quot;server&quot;</span>
     <span class="attr">EnablePartialRendering</span><span class="kwrd">=&quot;true&quot;</span><span class="kwrd">&gt;</span>
 <span class="kwrd">&lt;</span><span class="html">scripts</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">atlas</span> <span class="attr">:ScriptReference</span>
     <span class="attr">Path</span><span class="kwrd">=&quot;ScriptLibrary/TextChangedBehavior.js&quot;</span> <span class="kwrd">/&gt;</span>
 <span class="kwrd">&lt;/</span><span class="html">scripts</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">atlas</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>Add a small javascript code piece to your web page that your TextBox control will reference</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/javascript&quot;</span><span class="kwrd">&gt;</span>
  <span class="kwrd">function</span> onTextChange() {
    __doPostBack(<span class="str">'GridViewMemberUser'</span>,<span class="str">''</span>) ;
        }
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>And, finally add another xml-script to the bottom of your web page that declaratively tells the Atlas processor to add this new javascript capability to the TextBoxSearchUser Control. This essentially maps the onclick event of the TextBoxSearchUser to the onTextChange javascript. The timeout is very nice because it allows for typing without causing postbacks until the typer stops typing for that many milliseconds.</p>
<p></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">=&quot;text/xml-script&quot;</span><span class="kwrd">&gt;</span>
 &lt;page&gt;
  &lt;components&gt;
   &lt;textbox id=<span class="str">&quot;TextBoxSearchUser&quot;</span>&gt;
    &lt;behaviors&gt;
     &lt;textchangedbehavior timeout=<span class="str">&quot;100&quot;</span>
        changed=<span class="str">&quot;onTextChange&quot;</span> /&gt;
    &lt;/behaviors&gt;
   &lt;/textbox&gt;
  &lt;/components&gt;
 &lt;/page&gt;
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p></p>
<h1>Conclusions</h1>
<p>AJAX, though in concept is not new, is one of the most exciting new technologies to hit the Web for quite some time. The tool kits now available, such as Microsoft's Atlas which is described here and included with the demonstration download, makes adding AJAX functionality to existing ASP.NET 2.0 applications very straight forward. In this article, I've discussed the mechanics of adding AJAX functionality but have not addressed the impact to web servers, cross browser functionality or web design. Those things must all be considered before including AJAX technology in an existing web application. Overall however, AJAX, and Microsoft's implementation ATLAS, are wonderful things.</p>
