---
status: publish
published: true
pubDatetime: 2013-03-13T20:00:00.000Z
title: Using Sencha ExtJS 4.2, Sencha Architect 2.2, Add CRUD to REST client for calling
  Microsoft WebAPI server
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3521
wordpress_url: https://peterkellner.net/?p=3521
date: '2013-03-13 10:41:10 -0700'
date_gmt: '2013-03-13 17:41:10 -0700'
categories:
- Sencha
- Sencha Architect 2
- WebAPI
- Visual Studio 2012
tags: []
---
<h2>Three Part Series </h2>
<h3>(Part 3)</h3>
<p>&#160;</p>
<table cellspacing="20" cellpadding="2" width="400" border="1">
<tbody>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/building-a-simple-rest-controller-with-microsoft-visual-studio-2012-and-webapi/">Building a Simple REST Controller with Microsoft Visual Studio 2012 and WebAPI</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-and-sencha-architect-2-2-build-a-simple-rest-client-to-feed-webapi-server/">Using Sencha ExtJS 4.2 and Sencha Architect 2.2, Build a Simple REST client (to feed WebAPI server)</a></td>
</tr>
<tr>
<td valign="top" width="400"><a href="/2013/03/13/using-sencha-extjs-4-2-sencha-architect-2-2-add-crud-to-rest-client-for-calling-microsoft-webapi-server/">Add CRUD to REST client for calling Microsoft WebAPI server</a></td>
</tr>
</tbody>
</table>
<p>&#160;</p>
<p>In the first two posts, we built a <a href="http://www.microsoft.com/visualstudio/eng/office-dev-tools-for-visual-studio">Microsoft</a> <a href="http://www.asp.net/web-api">WebAPI</a> REST service, then we built the client side <a href="http://www.sencha.com/">ExtJS</a> app to process the GET request of the service (populate the grid panel), now let’s do the other 3 parts of CRUD (insert, update and delete).&#160; We will not build out the WebAPI side because that would involve adding some kind of persistent storage to the server (which is another topic I did not want to add to this post now, but maybe will later).</p>
<p>So, first, let us go back to the Sencha Architect project and make the “TagName” editable so that we can see the “Update” in action.&#160; We also need to add a save button to the toolbar that will simply so a store.sync() which will push the REST proxy into action once we have modified a TagName.</p>
<p>Without going through all the drag and drop, here is what needs to be done from Sencha Architect.</p>
<p>Add a toolbar to the Viewport</p>
<p>Put a “save” button on the Viewport</p>
<p>Add a click event handler to the “save” button and have the code grab a handle to the store and issue a sync() call when pressed</p>
<p>Add an editor to the text field “TagName” so we can edit that field</p>
<p>Add a CellEditing plugin to the grid</p>
<p>Now, that gives us this:</p>
<p><a href="/wp/wp-content/uploads/2013/03/image15.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb13.png" width="414" height="462" /></a> </p>
<p>and it looks like:</p>
<p><a href="/wp/wp-content/uploads/2013/03/image16.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb14.png" width="436" height="185" /></a> </p>
<p>Notice that I’ve actually clicked and edited the Tagname for item #3. You can tell because ExtJS puts the little red hat showing the field is edited.</p>
<p>If we press “Save” next we will get an error because the default WebAPI “Put” method does not have the correct signature.&#160; We just change it to take an instance of TagItem and now, when we press the “save” button, we see the browser do a PUT</p>
<p><a href="/wp/wp-content/uploads/2013/03/image17.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb15.png" width="452" height="325" /></a> </p>
<p>&#160;</p>
<p>If we place a break point in the visual studio 2012 server code when the PUT is called, you will see the new value come in for tagName (as follows):</p>
<p><a href="/wp/wp-content/uploads/2013/03/image18.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/03/image_thumb16.png" width="476" height="229" /></a> </p>
<p>and, if you look at the browser shot above, you will see that the little red hat indicating “dirty” is now gone showing that we generated a clean update.</p>
<p>&#160;</p>
<p>On your own, you can now do the same for POST (Insert) and DELETE.&#160; The pattern is identical.&#160; Simply make the WebAPI parameter TagItem (like we did for update), then, add to the client a delete button that figures out what is the selected row on the Grid Panel (fire the button again), and for insert, create an add button that simply adds a new row to the store, edit it and fire the save button again.</p>
<p>Hope these posts help.&#160; I’m hoping this gives you a clear roadmap to build WebAPI / Sencha ExtJS applications using Microsoft’s WebAPI.</p>
