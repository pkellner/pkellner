---
status: publish
published: true
pubDatetime: 2015-02-19T20:00:00.000Z
title: Add a Data Driven Combobox to ExtJS Form
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4191
wordpress_url: https://peterkellner.net/?p=4191
date: '2015-02-19 10:47:23 -0800'
date_gmt: '2015-02-19 17:47:23 -0800'
categories:
- Sencha
- ExtJS
tags: []
---
<p>I’ve been enhancing the session editor for <a href="https://angularu.com/" target="_blank">AngularU</a>&#160; (Written in <a href="http://sencha.com/" target="_blank">ExtJS</a> 4.2)&#160; and I’ve recently had to add a couple data driven <a href="http://docs.sencha.com/extjs/4.2.3/#!/api/Ext.form.field.ComboBox" target="_blank">comboboxes</a>.&#160; One to specify which track the session is in and one to assign which track the session is in.&#160; Having done it a couple times in a row, my muscle memory is pretty good so I thought I’d do it again but this time on my blog.</p>
<p>This is what the result looks like:</p>
<p><a href="/wp/wp-content/uploads/2015/02/image3.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/02/image_thumb3.png" width="469" height="328" /></a> </p>
<p>The basics of the relationship between the table data is that we have a Session Table and a Track Table as follows:</p>
<p><a href="/wp/wp-content/uploads/2015/02/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/02/image_thumb4.png" width="478" height="277" /></a> </p>
<p>For the sake of the controls, we actually have two rest feeds.&#160; One Track and one Session.&#160; You can see them both here:</p>
<p><a href="http://angularu.com/rest/track">http://angularu.com/rest/track</a></p>
<p><a href="http://angularu.com/rest/session">http://angularu.com/rest/session</a></p>
<p>The track is a primary keyof Id and a track name of Name.&#160; Session has SessionTrackId as the foreign key.</p>
<p>So, the steps are as follows.&#160; First we add a new model and store for the track table (we had the session model and store already).&#160; Then we update the form that has that data with the combobox.&#160; Below are the details of those thre places.</p>
<pre lang="javascript" title="C# Code" >
Ext.define('SessionEditor.model.Track', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    proxy: {
        type: 'rest',
        url: '/rest/Track',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'visible',
            type: 'bool'
        },
        {
            name: 'codeCampYearId',
            type: 'int'
        },
        {
            name: 'named',
            sortType: 'asUCString',
            type: 'string'
        }
    ]
});</pre>
<pre lang="javascript" title="track store">Ext.define('SessionEditor.store.Track', {
    extend: 'Ext.data.Store',

    requires: [
        'SessionEditor.model.Track'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'SessionEditor.model.Track',
            storeId: 'Track'
        }, cfg)]);
    }
});</pre>
<pre lang="javascript" title="form with combobox">{
    xtype: 'combobox',
    fieldLabel: 'Track',
    name: 'sessionTrackId',   // column in primary table
    allowBlank: true,
    displayField: 'sessionTrackName',   // name shown in combobox
    store: 'Track',   // name of store of secondary table
    valueField: 'id'  // primary key of secondary table
},</pre>
<p>That's it! Hope this helps</p>
