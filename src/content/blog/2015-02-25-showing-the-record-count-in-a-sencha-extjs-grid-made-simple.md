---
status: publish
published: true
pubDatetime: 2015-02-25T20:00:00.000Z
title: Showing The Record Count in a Sencha ExtJS Grid Made Simple
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4196
wordpress_url: https://peterkellner.net/?p=4196
date: '2015-02-25 10:37:01 -0800'
date_gmt: '2015-02-25 17:37:01 -0800'
categories:
- JavaScript
- Sencha
- ExtJS
tags: []
---
<p>I use <a href="http://www.sencha.com/products/extjs">Sencha’s ExtJS</a> for lot’s of data maintenance type applications.&#160; One such application is an email response manager where it’s convenient to know how many different URL’s got clicked.&#160; Basically, how many rows in the <a href="http://docs.sencha.com/extjs/5.0.1/#!/api/Ext.grid.View">gridview</a>.&#160; Certainly, counting is an option but showing it in the title makes a lot more sense.</p>
<p>The tip here is that often you have to call <a href="http://docs.sencha.com/extjs/5.0.1/#!/api/Ext.data.Store">store</a>.load() on the store associated with a grid so with just a couple extra lines you can put the count in the title of that grid.&#160; Those extra lines are basically just a callback to the store.load that then grabs a reference to the gridview.&#160; In my case, I have a button on my toolbar (just above the gridview), and in the button’s handler I execute the store.load which passes the parameters to the store as well as sets the title on completion.</p>
<p>Here is the very simple code.</p>
<pre lang="javascript">{
    xtype: 'button',
    text: 'Fetch Emails',
    handler: function(button) {
        var readEmailsChecked = button.up().down('[name=checkBoxReadOnly]').checked;
        var readEmailsNotChecked = button.up().down('[name=checkBoxNotReadOnly]').checked;
        var emailDetailStore = button.up().up().getStore();
        console.log(readEmailsChecked + ' ' + readEmailsNotChecked);
        emailDetailStore.load({
            params: {
                emailReadCountNonZero: readEmailsChecked,
                emailReadCountZero: readEmailsNotChecked
            },
            callback: function(records, operation, success) {
                button.up().up().setTitle('People ' + records.length);
            }
        })
    }
}</pre>
<hr />
<p><a href="/wp/wp-content/uploads/2015/02/image6.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2015/02/image_thumb6.png" width="610" height="166" /></a> </p>
<p>HTH’s</p>
