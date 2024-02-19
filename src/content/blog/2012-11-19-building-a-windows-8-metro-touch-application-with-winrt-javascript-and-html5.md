---
status: publish
published: true
pubDatetime: 2012-11-19T20:00:00.000Z
title: Building a Windows 8 Touch application with WinRT JavaScript and Html5
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2186
wordpress_url: https://peterkellner.net/?p=2186
date: '2012-11-19 09:01:32 -0800'
date_gmt: '2012-11-19 16:01:32 -0800'
categories:
- ASP.NET 2.0
- Windows 8
- Windows 8 Store
tags: []
---
<p>&nbsp;</p>
<h2>Introduction</h2>
<p>With the introduction of WinRT (which replaces the Win32 API we are all use to), Microsoft has provided JavaScript programmers first class access to system libraries previously unavailable.  That is, because WinRT is available directly to JavaScript, device access (GPS, motion sensors, etc.) are all available directly to the application with no special security layer.  That said, WinRT also brings with it restrictions which a typical browser does not have.  Because it is possible with such tight access to the OS for applications to do harm, WinRT has a sophisticated security model in place to keep bad things from happening.  In addition, a WinRT app forces you application to behave nicely or it may not work.  For example, if you application takes too long to start, the WinRT library will automatically stop the application from proceeding.</p>
<p>Microsoft has done a good job of balancing the needs of many with the needs of a few with WinRT.  That is, your application is really the needs of a few (well, you alone), while the needs of many (all the other applications and services running on your device) are all looked out for.</p>
<p>&nbsp;</p>
<h2>Our Goal Today</h2>
<p>We will be using Visual Studio 2012’s support for building a WinRT application using JavaScript and HTML5.  The application will be a simple conference track viewer that lets its users navigate tracks and the associated speakers.  This data will be downloaded asynchronously from a remote server in JSON.</p>
<p>Windows 8 application development has lots of special capabilities for which we will only scratch the surface.  Our example will implement the basic search contract and provide a simple about box for the application on the charms bar. The application will be fully touch enabled and it will support all the requirements necessary to be submitted to the Windows 8 store.</p>
<p>&nbsp;</p>
<h2>Built In Visual Studio 2012 Templates</h2>
<p>As you would expect, Visual Studio has new project wizard that let’s you get started building your windows 8 store application.  Having now been through the process of getting a token that let’s me submit applications to the store, I’ve learned that it is best when you are starting out to use the built in templates as much as possible.  Microsoft has strict guidelines around building WinRT touch applications and if you don’t follow these, your application will be rejected.  You of course can build the application from and empty template and follow the guidelines yourself, but you will spend a lot of time learning these specifications which are very detailed and picky.  You’ll find in the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh465424.aspx">UX Guidelines</a> words like:</p>
<blockquote><p>If you find yourself cramming things to fit, it’s okay to use 5x5 mm targets as long as touching the wrong target can be corrected with one gesture. Using 2 mm of padding between targets is extremely important in this case.</p></blockquote>
<p>Because your app will likely be running in different resolutions and on different size devices, implementing the above requires a high level of CSS3 and HTML skills.  If you use the templates that are built in to Visual Studio 2012, these kind of requirements are already taken care of for you with the included CSS3 style sheets.</p>
<p>&nbsp;</p>
<h2>Building the Conference Track Viewer</h2>
<p>&nbsp;</p>
<h3>A Quick Look Ahead</h3>
<p>Here is what our completed app will look like.  Basically, it has two pages.  The first page shows all the tracks and it includes an image background that represents each track.</p>
<p><a href="/wp/wp-content/uploads/2012/08/image12.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb12.png" alt="image" width="404" height="260" border="0" /></a></p>
<p>Then, when the user touches any of the tracks listed, they will be presented with the details of that particular track as follows.</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/08/image13.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb13.png" alt="image" width="404" height="257" border="0" /></a></p>
<p>In addition, there will of course be the charms bar on the right for both search and about and on the bottom will be the app bar that let’s you refresh in case one or more tracks have changed.  As mentioned earlier, there are a lot more areas we could improve upon to make this app take much better advantage of the windows 8 platform.  Just to mention a couple, we could add push notifications so that refresh is not necessary and we could add a communication charms so the user could email or tweet a session or track.</p>
<p>&nbsp;</p>
<h3>Create a New Project for the JavaScript Windows 8 App</h3>
<p>First thing to do is to create a new Visual Studio 2012 JavaScript Windows 8 project.  We of course want to select from a template that most closely matches our scenario for the reasons mentioned in the previous section “Built In Visual Studio 2012 Templates”.  So, File/New/Project/JavaScript (from the opening screen of Visual Studio).   Knowing that we want to display a top level view of all the tracks, with a drill down detail view of each track showing the individual sessions, it seems like the “Split App” is going to be our best choice so let’s choose that.</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/08/image14.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb14.png" alt="image" width="404" height="294" border="0" /></a></p>
<p>&nbsp;</p>
<p>If we run this application, out of the box you can see the similarities to the conference track viewer we plan on building.  Below are some small screen shots of how that looks.</p>
<p>&nbsp;</p>
<table width="400" border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2012/08/image15.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb15.png" alt="image" width="184" height="114" border="0" /></a></td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2012/08/image16.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb16.png" alt="image" width="184" height="114" border="0" /></a></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<h3>Changing Where The Data Comes From (static to JSON)</h3>
<p>One fundamental difference between the Split Item template and the actual Conference Track Viewer we are building is that the data in the template is static data that is simply created by defining JavaScript arrays.  In my opinion, the sample would have more value if those arrays were loaded as if they were coming from an asynchronous source rather than just static memory.</p>
<p>So, if you look closely at the project created in Visual Studio 2012 from using the Split Template, you’ll see a that in the default.html, there is a reference to a JavaScript file called data.js.  Basically, that data.js file executes an anonymous JavaScript function which assigns the the namespace “Data” several properties that include both data and functions.  Because “Data” is a global, this means that after this anonymous JavaScript function executes (which happens when the application first loads), all that was initialized, stays initialized (thank you JavaScript Closure).  I know that’s a bunch of charged words I just said, but at the end of the day what exists is a bunch of functions and data that were declared dynamically.  Lines 16 to 23, as shown below of data.js really are the full definition that get used by the rest of the application to retrieve the data.</p>
<pre class="csharpcode"> WinJS.Namespace.define(<span class="str">"Data"</span>, {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });</pre>
<p>If you look, for example in items.js, you will find at line 12, code that sets the datasource of the list to be Data.groups.dataSource which is basically pulling data from the global declaration of data above.</p>
<p>&nbsp;</p>
<pre class="csharpcode">ready: <span class="kwrd">function</span> (element, options) {
  <span class="kwrd">var</span> listView = element.querySelector(<span class="str">".itemslist"</span>).winControl;
   listView.itemDataSource = Data.groups.dataSource;
   ...</pre>
<p>So, the challenge here is we need to load the data into the “Data” global namespace from a JSON web service and not from static data.  To do this, we need to take into consideration that we can not simply include a static JavaScript file in our application and expect the data will be loaded.  It is not that that static JavaScript file can not load the data, the problem is that we need to synchronize that loading such that the actual list (grid of tracks in our case) loads <strong>after</strong> the JSON service returns it’s data.</p>
<p>So, in order to do this, we change things up a little.  In our Tracked Session Viewer, instead of loading the data in a static JSON file, we simply define the functions for loading the data in a static JSON file (we call it loadData now), then, in default.js, which is the code that executes when the program first launches, we add some code that calls loadData() function in the initial “activated” event of the full application.  We pass in the navigator object to this function so that after the data is fully loaded (using asynchronous JavaScript) we then, and only then let the applicaiton navigate to our session tracks page which now can display data because it is fully loaded. The code in our program activation event (default.js) looks something like this:</p>
<p>&nbsp;</p>
<pre class="csharpcode">app.addEventListener(<span class="str">"activated"</span>, <span class="kwrd">function</span> (args) {

    <span class="kwrd">if</span> (args.detail.kind ===
        activation.ActivationKind.launch) {
        <span class="kwrd">if</span> (args.detail.previousExecutionState !==
            activation.ApplicationExecutionState.terminated) {
        } <span class="kwrd">else</span> {
        }

        <span class="kwrd">if</span> (app.sessionState.history) {
            nav.history = app.sessionState.history;
        }
        args.setPromise(WinJS.UI.processAll().then(<span class="kwrd">function</span> () {
            <span class="kwrd">var</span> searchString = <span class="str">""</span>;
            svcc.Functions.loadData(nav, searchString);
        }));
    }
});</pre>
<p>And then, in our loadData method, which is included as a separate file, we have code that does the Async JavaScript call and when that data load completes, does the navigation to our first page (looking like the following):</p>
<p>&nbsp;</p>
<pre class="csharpcode">WinJS.Namespace.define(<span class="str">"svcc.Functions"</span>, {
    loadData: <span class="kwrd">function</span> (nav, searchString) {
        <span class="kwrd">var</span> searchStringLower = <span class="str">""</span>;
        <span class="kwrd">if</span> (searchString &amp;&amp; searchString.length &gt; 0) {
            searchStringLower = searchString.toLowerCase();
        }

        <span class="kwrd">var</span> sampleGroups = [];
        <span class="kwrd">var</span> sampleItems = [];

        <span class="kwrd">var</span> imageParams =
            <span class="str">"?width=160&amp;height=160&amp;mode=pad&amp;scale=both&amp;anchor=middlecenter&amp;format=png"</span>;
        <span class="kwrd">var</span> urlString = svcc.Constants.baseUrl +
            <span class="str">"GeneralHandlers/Tracks.ashx?codecampyear=6"</span>;
        <span class="kwrd">var</span> xhrOptions = { url: urlString };
        <span class="kwrd">var</span> that = <span class="kwrd">this</span>;
        WinJS.xhr(xhrOptions).done(<span class="kwrd">function</span>(myXhr) {
            <span class="kwrd">var</span> result = JSON.parse(myXhr.response);
            <span class="kwrd">for</span> (<span class="kwrd">var</span> i = 0; i &lt; result.rows.length; i++) {
                <span class="kwrd">var</span> trackId = result.rows[i].TrackId;
                <span class="kwrd">var</span> trackName = result.rows[i].TrackName;</pre>
<p>&nbsp;</p>
<p>All the source for this application is included in a link at the top of this article so feel free to download it and take a look at all the details.</p>
<p>&nbsp;</p>
<h3>Adding Search Functionality</h3>
<p>We’ve talked about how to retrieve data the first time, but now let’s talk about what happens when the user wants to look for a specific speaker or session by some search string.  Because we knew we wanted to add this later, we added to our loadData() function a search string parameter.  When passed in as null, all tracked sessions are downloaded.  However, when a value is passed in, we’ve added simple JavaScript code to the loadData() function to filter those results.</p>
<p>So, let’s follow the guidelines posted at <a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh465238.aspx">http://msdn.microsoft.com/en-us/library/windows/apps/hh465238.aspx</a> for how to create a minimal search in a Windows 8 JavaScript app.  In our application, there are only a few things that are required.</p>
<p>First, in the split.js JavaScript file, add the following line of code in your page/ready label.  This causes the search charm to automatically come up as soon as the user starts to type anything on the keyboard.  That is, the user see something like the following and as soon as the press the search button or press enter, they event defined a little further below here will get executed.</p>
<p><a href="/wp/wp-content/uploads/2012/08/image17.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb17.png" alt="image" width="404" height="249" border="0" /></a></p>
<p>&nbsp;</p>
<p>And the code looks as follows:</p>
<pre class="csharpcode"><span class="rem">// This function is called whenever a user navigates to this page. It</span>
<span class="rem">// populates the page elements with the app's data.</span>
ready: <span class="kwrd">function</span> (element, options) {
    Windows.ApplicationModel.Search.SearchPane.getForCurrentView().
        showOnKeyboardInput = <span class="kwrd">true</span>;</pre>
<p>Then, at the top of that same file (split.js) add an event listener that responds when ever a search is performed. That code is actually executed when the user types</p>
<p>&nbsp;</p>
<pre class="csharpcode"><span class="rem">// Register event handler for QuerySubmitted</span>
Windows.ApplicationModel.Search.SearchPane.getForCurrentView().onquerysubmitted =
    <span class="kwrd">function</span> (eventObject) {
        <span class="kwrd">var</span> searchString = eventObject.queryText;
        svcc.Functions.loadData(nav, searchString);
};</pre>
<h3>Adding an About Button</h3>
<p>It is required that every program have an “About”.  That is, on the charms bar, there needs to be button the user can touch that gives some information about the maker of the program (you).  To do that, all that is necessary is to create a new about.html, about.js and about.css just like creating any other page (put them in the /page folder).  Then, from the default.js file you need to register this new about page as follows:</p>
<pre class="csharpcode"><span class="rem">// Populate settings pane and tie commands to settings flyouts.</span>
WinJS.Application.onsettings = function (e) {
    e.detail.applicationcommands = {
        <span class="str">"aboutDiv"</span>: { href: <span class="str">"/pages/about/about.html"</span>, title: <span class="str">"About"</span> }
    };
    WinJS.UI.SettingsFlyout.populateSettings(e);
};</pre>
<p>Then, when the user brings up the charms bar, there will be a new “about” button and when that is tapped, the html page you just created (/page/about/about.html) comes flying out of the side and looks as follows:</p>
<p>&nbsp;</p>
<table width="400" border="0" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2012/08/image18.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb18.png" alt="image" width="194" height="118" border="0" /></a></td>
<td valign="top" width="200"><a href="/wp/wp-content/uploads/2012/08/image19.png"><img style="display: inline; border-width: 0px;" title="image" src="/wp/wp-content/uploads/2012/08/image_thumb19.png" alt="image" width="194" height="119" border="0" /></a></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Summary</h2>
<p>In this article, we’ve built a very simple Conference Session Tracker.  It uses the Visual Studio 2012 Split template, adds to the charm bar a working search button as well as an About button.  We’ve done it using JavaScript, HTML5 and CSS3.  There are a huge number of things we did not talk about.  This was just a short sampler of building something straight forward that has real world use.  For further reading, I strongly suggest taking a dive over to <a href="http://dev.windows.com">http://dev.windows.com</a> and you’ll find a wealth of resource and more information.</p>
<p>Good Luck with your Windows 8 App Building!   See you in the Windows 8 store.</p>
