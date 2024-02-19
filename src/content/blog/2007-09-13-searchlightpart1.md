---
status: publish
published: true
pubDatetime: 2007-09-13T20:00:00.000Z
title: Media Browser Using Silverlight 1.1 Alpha and Leverage Software's REST API
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  <br />
  <p>Searchlight was born from the desire to show the outstanding ability of
  Silverlight to create a compelling web application using existing infrastructure
  technology.&nbsp; The products was developed working with
  <a href="http://www.leveragesoftware.com/">Leverage Software, </a>a
  San Francisco company dedicated to delivering first class communities for it&#39;s
  customer&#39;s, <a href="/about/">Peter Kellner</a> (the Silverlight technology guy), and
  <a href="http://udanium.com/about_me.html">Uday Gajendar</a>, the design
  specialist.&nbsp; Our efforts can be viewed by going to the
  <a href="http://labs.leveragesoftware.com/silverlight.html">LeverageSoftware Labs Link Here</a>.&nbsp;
  Simply follow the directions on that web page to run the web application.&nbsp;
  In this article, many of the Silverlight features in
  Searchlight are discussed.&nbsp; </p>

  <a href="http://searchlight.peterkellner.net/Default.html">
  <img alt="click here if you have Silverlight Alpha 1.1 Installed" src="/wp/Images/SearchLightPart1/clip_image001t.jpg" class="style1"  /></a>
  <br />
wordpress_id: 76
wordpress_url: https://peterkellner.net/2007/09/13/searchlightpart1/
date: '2007-09-13 18:24:22 -0700'
date_gmt: '2007-09-14 01:24:22 -0700'
categories:
- Best Practices
- Community
- Silverlight
- Visual Studio
- WPF
tags: []
---
<h2>Introduction</h2>
<p>Searchlight was born from the desire to show the outstanding ability of Silverlight to create a compelling web application using existing infrastructure technology.&#160; The products was developed working with <a href="http://www.leveragesoftware.com/">Leverage Software, </a>a     <br />San Francisco company dedicated to delivering first class communities for it's customer's, Peter Kellner (the Silverlight technology guy), and Uday Gajendar, the design specialist.&#160; Our efforts can be viewed by going to the LeverageSoftware Labs Link Here.&#160; Simply follow the directions on that web page to run the web application. In this article, many of the Silverlight features in Searchlight are discussed. </p>
<h2>Background</h2>
<p>Searchlight was built to run with the first Alpha 1.1 version of Silverlight shipped from Microsoft.&#160; Searchlight takes advantage of Leverage Software's extensive web service api to provide real time data based on those web feeds.&#160; Currently, Leverage Software's&#160; main access to the Dwell Community is an html application that can be found at    <br /><a href="http://dwell.leveragesoftware.com/">http://dwell.leveragesoftware.com/</a>.&#160; Using the Silverlight Alpha 1.1 combined with </p>
<p> <!--more-->
<p><a href="http://www.microsoft.com/expression/products/overview.aspx?key=blend">Microsoft's Expression Blend</a>, a new compelling interface to the Dwell Community was built.&#160; Below is a screen shot of the application running after it has been loaded for the first time.</p>
<p><img src="/wp/wp-content/uploads/2007/09/clip_image001.jpg" width="624" height="408" /></p>
<h2>Dynamic Data Content</h2>
<p>Silverlight supports access to remote data feeds. This allows for interactive applications to be built that rely on external datasources seamlessly.&#160; For example, when the user clicks on the Furniture Menu choice, a query is sent to the Dwell on line community and all members who have pictures tagged with the word furniture are retrieved.</p>
<h2>Responsiveness</h2>
<p>Silverlight runs on the client side which means all user interaction (events) are processed in the browser and do not require a round trip to the server. For example, when the user wants to scroll pictures right to left they would press the green right arrow button and the pictures will scroll.&#160; Notice also the nice halo affect when you mouse over the green scroll button.</p>
<p><img alt="sl2.jpg" src="/wp/wp-content/uploads/2007/09/clip_image004.jpg" width="90" height="107" /></p>
<p>Again, because Silverlight is all client side, the speed at which the pictures scroll is determined by how long the user holds down the mouse over the arrow key before releasing. If the user quickly clicks the green arrow button, the pictures move quickly, if they click and hold for a second, then release, the picture will&#160; scroll more slowly.&#160; In addition the little green dots give you immediate feedback of how many pictures are in the entire scrollable region, and where you are in that list.&#160; For example, if you look at the second line of pictures (Wimlarch), you’ll notice that there are    <br />6 green dots with 5 illuminated on the left (as shown below).</p>
<p><img alt="sl3.jpg" src="/wp/wp-content/uploads/2007/09/clip_image006.jpg" width="111" height="66" /></p>
<p>This means, you are looking at 5/6ths of the pictures (83 percent), and that you are scrolled all the way to the left. If half the green dots were illuminated, then you would only be looking at half the pictures for that particular person (line). Again, because this is a completely client side programming model (Silverlight), as you scroll, the green dots automatically change and there is no server load and no traffic on the internet (with the exception of the actual    <br />images being downloaded if they have not previously been cached in the browser).</p>
<h2>Layout/Size Management</h2>
<p>It’s important for a real functioning application to be able to manage the information inside it’s borders. The amount of screen area available to the program is different depending on how big the users browser is, as well as how much space the user has allocated to the browser window.</p>
<p>Silverlight exposes a class called the HttpBrowserClass which allows the client software (Silverlight) to react and adjust based on screen size. For example, if the browser size is reduced, the number of rows showing is reduced to the correct number (two in this case) and the pictures showing on each row is reduced to 4. Of course the little green dots adjust also. Here is a screen showing that situation.</p>
<p><img src="/wp/wp-content/uploads/2007/09/clip_image007.jpg" width="624" height="394" /></p>
<p>Notice also that the menu choices are closer together. The point here is that each Silverlight control can change its position dynamically depending on external inputs such as browser size changes.</p>
<h2>Special Effects.</h2>
<p>Silverlight shines when it comes to special effects. Many effects can be achieved, while only a few are demonstrated here. The effects demonstrated here are as follows.</p>
<h3>Picture Growth On Mouse Over </h3>
<p>This means that as you mouse over a picture it slightly grows and when you mouse out it shrinks again.&#160; This is to give you an idea that you can click on it.</p>
<h3>Picture Flipping to the opposite side</h3>
<p>When you click on a picture in the user’s collection, the picture fades in at a higher resolution as below.</p>
<p><img alt="sl5.JPG" src="/wp/wp-content/uploads/2007/09/clip_image010.jpg" width="397" height="295" /></p>
<p>If you click on the little orange triangle on the lower right corner of the picture, the picture actually flips over simulating a 3d flip and the information about the picture is displayed on the back side.</p>
<p><img alt="sl6.jpg" src="/wp/wp-content/uploads/2007/09/clip_image012.jpg" width="389" height="298" /></p>
<h3>Accents On Mouse Over</h3>
<p>Another Silverlight effect is what happens when you mouse over one of the green left or right arrow buttons.&#160; Small expanding circles grow out of the button to indicate that this is something that can be pressed.</p>
<h3>Links to External Web Sites</h3>
<p>Silverlight supports many features of standard web browsers including the ability to link to external web sites. If you bring up the Credits screen by pressing the “Credits” button in the upper right corner, you will see the screen below.</p>
<p><img alt="sl7.jpg" src="/wp/wp-content/uploads/2007/09/clip_image014.jpg" width="624" height="458" /></p>
<p>Notice that under each of our names, there is a “View Website” button.&#160; When this button is pressed, a new browser window is opened containing the information about one of us.&#160; You can also get to more information about one of the members by clicking on their picture on the far left of the picture row.</p>
<h3>Asynchronous Processing</h3>
<p>Silverlight allows multiple things to be done at the same time. For example, when the program first loads, an initial web feed from the dwell community is retrieved. This can take several seconds so instead of nothing happening, a small image is displayed with dynamic content.</p>
<p><img alt="sl8.jpg" src="/wp/wp-content/uploads/2007/09/clip_image016.jpg" width="134" height="170" /></p>
<p>The little dial circles showing time passing. When the web download is complete, Silverlight has the built in capability to notify the running program that the work is complete so it can continue and bring all the controls and pictures to life.</p>
<h3>Multiple Ways to See Similar Data</h3>
<p>Silverlight has a complete custom programming model that allows the developer to show the data in lots of different ways. On the opening screen, if the user presses the “View Gallery” button on any of the picture rows, they will get a screen that looks like what is below.</p>
<p><img alt="sl10.jpg" src="/wp/wp-content/uploads/2007/09/clip_image018.jpg" width="624" height="452" /></p>
<p>Notice that as the picture is scrolled through the artists collection, the title and information about the picture is displayed. Again, this all happens with no server interaction or traffic.</p>
<h2>Conclusions</h2>
<p>Silverlight is indeed a compelling technology to build applications that can be run anywhere on the internet.&#160; Searchlight demonstrates just a small number of Silverlight's great features.&#160; Understanding that there are always lots of ways to deliver the same result, Silverlight does give a way to deliver very rich content using the Microsoft development stack.&#160; In this case, that includes Visual Studio, Microsoft Expressions Blend and of course the    <br />.Net Programming language c#.&#160; Many of the features of Silverlight .net alpha 1.1 are not yet available, so we anticipate when the final production release comes, we will be able to deliver even more functionality, even more efficiently than we can do it now.</p>
