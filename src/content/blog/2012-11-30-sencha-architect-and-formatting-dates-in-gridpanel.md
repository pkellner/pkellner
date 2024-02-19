---
status: publish
published: true
pubDatetime: 2012-11-30T20:00:00.000Z
title: Sencha Architect and Formatting Dates in GridPanel
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 2388
wordpress_url: https://peterkellner.net/?p=2388
date: '2012-11-30 10:23:05 -0800'
date_gmt: '2012-11-30 17:23:05 -0800'
categories:
- JavaScript
- Sencha
- Sencha Architect 2
tags: []
---
<h2>Background</h2>
<p>I wasted about 10 minutes this morning being confused about why I could not enter the format attribute on a column of a <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.grid.Panel">GridPanel</a>.  Since I am using <a href="http://www.sencha.com/products/extjs/">Sencha</a> <a href="http://www.sencha.com/products/architect/">Architect</a>, sometimes the simple things are not obvious because you are not looking at the code directly.  To be fully honest, I have not written any ExtJS code for about 2 months so I tend to forget the simple things.</p>
<p>&nbsp;</p>
<h2>Here is my Story</h2>
<p>I created a simple <a href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.data.Store">Data Store</a> and assigned all the fields without specifying any times (that is my first mistake).  The code looks like the following:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image16.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb14.png" alt="image" width="473" height="316" border="0" /></a></p>
<p>&nbsp;</p>
<p>Notice I don’t put any type associated with date.  So now, when I create a GridPanel and do the “AutoColumn” which is very handy, all the columns are created and they look like the following:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image17.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb15.png" alt="image" width="486" height="349" border="0" /></a></p>
<p>&nbsp;</p>
<p>Notice that the xtype is gridcolumn for the LogDate.  My issue is now when I try to find format in the designer’s attribute editor for LogDate, it does not exist.  The problem is that LogDate was not set to type date in the store.  Had I done that (as follows):</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image18.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb16.png" alt="image" width="506" height="315" border="0" /></a></p>
<p>&nbsp;</p>
<p>The store would look like:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image19.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb17.png" alt="image" width="306" height="380" border="0" /></a></p>
<p>&nbsp;</p>
<p>And now, when I autocolumn the gridpanel it assigns an xtype to that column of datecolumn and that allows me to put set a format attribute (which did not exist when the xtype was gridcolumn.  Here is what it looks like now:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image20.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb18.png" alt="image" width="497" height="207" border="0" /></a></p>
<p>&nbsp;</p>
<p>and in the property editor of the column “LogDate” I can set the format (choosing from a format at the url: <a title="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date-method-format" href="http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date-method-format">http://docs.sencha.com/ext-js/4-1/#!/api/Ext.Date-method-format</a> ).  In my case I’m choosing "F j, Y, g:i a”.  The attributte editor now shows this:</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/11/image21.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb19.png" alt="image" width="524" height="491" border="0" /></a></p>
<p>So, when I run my app, it looks like this (just to give some context to what I’m actually building here)</p>
<p><a href="/wp/wp-content/uploads/2012/11/image22.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb20.png" alt="image" width="572" height="333" border="0" /></a></p>
<p>&nbsp;</p>
<p>Wrong Order, Forgot to Set Store xtype (type)</p>
<p>So, the point of this post is I forgot to set the store xytpe and my column type did not get set to datacolumn and therefore there was no format parameter available.  I did not want to autocolumn because I had already done a bunch of adjusting on my column widths and header names so, what to do?  No problem, just go into the project inspector of the gridcolumn (for LogDate), right click and transform the column to datacolumn (as follows).</p>
<p><a href="/wp/wp-content/uploads/2012/11/image23.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2012/11/image_thumb21.png" alt="image" width="562" height="330" border="0" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Conclusion</h2>
<p>Hope this helps!  10 minute problem, 15 minutes being confused, and 30 minutes writing this up.</p>
