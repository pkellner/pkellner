---
status: publish
published: true
pubDatetime: 2012-04-20T20:00:00.000Z
title: Details On The ExtJS Application to Build Simple CRUD operation Using Models
  and Stores
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1973
wordpress_url: https://peterkellner.net/?p=1973
date: '2012-04-20 17:00:24 -0700'
date_gmt: '2012-04-21 00:00:24 -0700'
categories:
- ASP.NET 2.0
- Sencha
- Sencha
- SenchaMVC
tags: []
---
<p>&nbsp;</p>
<table width="362" border="1" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="199">Part 1</td>
<td valign="top" width="161"><a href="/2011/11/04/building-an-senchas-extjs-4-0-mvc-application-with-microsofts-asp-net-mvc3-series-basics/">Basics (mostly server side)</a></td>
</tr>
<tr>
<td valign="top" width="219">Part 2 (this)</td>
<td valign="top" width="170"><a href="/2012/04/20/details-on-the-extjs-application-to-build-simple-crud-operation-using-models-and-stores/">ExtJS Client Side Details</a></td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><em>*For those who are intersted in this, I just posted a 3 part series on using ExtJS 4.2 with Microsoft's new WebAPI Restful Interface.  The new WebAPI is more efficient on the server side and the coding to REST makes the ExtJS side simpler</em>. (March 13, 2013)    <a title="Part 1" href="/2013/03/13/building-a-simple-rest-controller-with-microsoft-visual-studio-2012-and-webapi/ ">Part 1</a></p>
<p>In the first article, a very simple updater was build using <a href="http://www.sencha.com/">Sencha’s</a> <a href="http://www.sencha.com/products/extjs/">ExtJS</a> and Microsoft’s <a href="http://msdn.microsoft.com/en-us/data/aa937723">Entity Framework</a> <a href="http://blogs.msdn.com/b/adonet/archive/2011/04/11/ef-4-1-released.aspx">Code First</a>.  The focus was really on the server side while the client side project was included for reference.  The client side app was barely discussed.  In this article, we are going to discuss in more detail what is happening on the client side and how the <a href="http://www.sencha.com/products/extjs/">Sencha ExtJS</a> <a href="http://en.wikipedia.org/wiki/JavaScript">JavaScript</a> library helps us to implement these updates.</p>
<p>&nbsp;</p>
<h2>The Basics</h2>
<p>Let’s start out with some basics rather than jump right in to the real project.   I think we can all assume the displaying of the data is pretty simple. We just create a store, add some fields, hook it up to a <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.Panel">Ext.grid.Panel</a> and set the store to <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.ElementLoader-cfg-autoLoad">autoload</a> and it all just works.  Updating though does add a little more complexity and for that, we are going to add some structure.  So, let’s take a look at the very basics without any UI at all.</p>
<p>Just by way of reminders, we create two simple services in our project.  One that reads and the other that updates.  For the purpose of this article, those are the three (of four) <a href="http://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a> operations we are going to implement (read,insert and update).  Let’s first implement those operations directly.  Below is a very straight forward JavaScript which basically represents a completely working ExtJS app with a single button in the viewport.  Here is the code below.</p>
<pre class="csharpcode">Ext.Loader.setConfig({ enabled: <span class="kwrd">true</span> });
Ext.require(<span class="str">'Ext.container.Viewport'</span>);

Ext.application({
    name: <span class="str">'AM'</span>,

    controllers: [
        <span class="str">'Users'</span>
    ],

    launch: <span class="kwrd">function</span>() {
        Ext.create(<span class="str">'Ext.container.Viewport'</span>, {
            layout: <span class="str">'border'</span>,
            items: [
                {
                    xtype: <span class="str">'button'</span>,
                    region: <span class="str">'center'</span>,
                    text: <span class="str">'Insert a Record'</span>,
                    handler: <span class="kwrd">function</span> () {
                        <span class="kwrd">var</span> writer = <span class="kwrd">new</span> Ext.data.JsonWriter({
                            type: <span class="str">'json'</span>,
                            encode: <span class="kwrd">false</span>,
                            listful: <span class="kwrd">true</span>,
                            writeAllFields: <span class="kwrd">true</span>,
                            returnJson: <span class="kwrd">true</span>
                        });

                        <span class="kwrd">var</span> reader = <span class="kwrd">new</span> Ext.data.JsonReader({
                            totalProperty: <span class="str">'total'</span>,
                            successProperty: <span class="str">'success'</span>,
                            idProperty: <span class="str">'Id'</span>,
                            root: <span class="str">'Data'</span>,
                            messageProperty: <span class="str">'message'</span>
                        });

                        <span class="kwrd">var</span> proxy = <span class="kwrd">new</span> Ext.data.HttpProxy({
                            reader: reader,
                            writer: writer,
                            type: <span class="str">'ajax'</span>,
                            api: {
                                read: <span class="str">'/UserInfo/Get'</span>,
                                create: <span class="str">'/UserInfo/Create'</span>,
                                update: <span class="str">'/UserInfo/Update'</span>,
                                destroy: <span class="str">'/UserInfo/Delete'</span>
                            },
                            headers: {
                                <span class="str">'Content-Type'</span>: <span class="str">'application/json; charset=UTF-8'</span>
                            }
                        });

                        Ext.define(<span class="str">'MyModel'</span>, {
                            extend: <span class="str">'Ext.data.Model'</span>,
                            fields: [<span class="str">'Id'</span>, <span class="str">'Name'</span>, <span class="str">'Email'</span>],
                            proxy: proxy
                        });

                        Ext.define(<span class="str">'MyStore'</span>, {
                            extend: <span class="str">'Ext.data.Store'</span>,
                            model: <span class="str">'MyModel'</span>,
                            autoLoad: <span class="kwrd">true</span>,
                            paramsAsHash: <span class="kwrd">true</span>,
                            proxy: proxy
                        });

                        <span class="kwrd">var</span> myStore = Ext.create(<span class="str">'MyStore'</span>, {
                        });

                        myStore.add({
                            Name: <span class="str">'TestName'</span>,
                            Email: <span class="str">'TestEmail@Test.com'</span>
                        });

                        myStore.sync();
                    }
                }
            ]
        });
    }
});</pre>
<p>Without going into to much detail, basically, what has been done above is a to create a simple <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Model">model</a> (myModel) which contains a JsonReader and JsonWriter and proxy of course. This model has a couple fields in it (Id,Name and Email), then a simple <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Store">store</a> is created that uses this model called myStore.  Once this store has been created, we simply call the store’s “add” method with a config object that represents the data, then calling sync() on that store forces an insert (or create) to be executed through the proxy.  If I look at Chrome’s JavaScript debugger (network tab), you can see from the picture below that indeed, the servers UserInfo/Create method has been called passing in the parameters Name and Email.</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image14.png"><img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb12.png" width="516" height="192" border="0" /></a></p>
<p>&nbsp;</p>
<p>It’s important to understand these steps because we will be using the store and model in a similar way when we update the data in our next section.</p>
<p>&nbsp;</p>
<h2>Implementation in Grid and Editor Panel</h2>
<p>&nbsp;</p>
<p>We are using the ExtJS MVC architecture for this app so all our procedural code is in the controller.  For the Ext.grid.Panel, all we have for the view is the following (app/view/List.js).</p>
<p>&nbsp;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image15.png"><img style="background-image: none; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-width: 0px;" title="image" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb13.png" width="322" height="179" border="0" /></a></p>
<p>&nbsp;</p>
<pre class="csharpcode">Ext.define(<span class="str">'AM.view.user.List'</span>, {
    extend: <span class="str">'Ext.grid.Panel'</span>,
    alias: <span class="str">'widget.userlist'</span>,

    title: <span class="str">'All Users'</span>,
    store: <span class="str">'Users'</span>,

    columns: [
    { header: <span class="str">'Name'</span>, dataIndex: <span class="str">'Name'</span>, flex: 1 },
    { header: <span class="str">'Email'</span>, dataIndex: <span class="str">'Email'</span>, flex: 1 }
    ]
});</pre>
<p>Then, in our controller (app/controller/Users.js) we have the working code that actually does the editing and updating of the record.  the code is below:</p>
<pre class="csharpcode">Ext.define(<span class="str">'AM.controller.Users'</span>, {
    extend: <span class="str">'Ext.app.Controller'</span>,
    stores: [<span class="str">'Users'</span>],
    models: [<span class="str">'User'</span>],
    views: [<span class="str">'user.Edit'</span>, <span class="str">'user.List'</span>],
    refs: [
        {
            <span class="kwrd">ref</span>: <span class="str">'usersPanel'</span>,
            selector: <span class="str">'panel'</span>
        }
    ],
    init: <span class="kwrd">function</span>() {
        <span class="kwrd">this</span>.control({
            <span class="str">'viewport &gt; userlist dataview'</span>: {
                itemdblclick: <span class="kwrd">this</span>.editUser
            },
            <span class="str">'useredit button[action=save]'</span>: {
                click: <span class="kwrd">this</span>.updateUser
            }
        });
    },
    editUser: <span class="kwrd">function</span>(grid, record) {
        <span class="kwrd">var</span> edit = Ext.create(<span class="str">'AM.view.user.Edit'</span>).show();

        edit.down(<span class="str">'form'</span>).loadRecord(record);
    },
    updateUser: <span class="kwrd">function</span>(button) {
        <span class="kwrd">var</span> win    = button.up(<span class="str">'window'</span>),
            form   = win.down(<span class="str">'form'</span>),
            record = form.getRecord(),
            values = form.getValues();
        record.set(values);
        win.close();
        <span class="kwrd">this</span>.getUsersStore().sync();
    }
});</pre>
<p>Basically, this follows the exact same method we described above for implementing the CRUD.  Note getUsersStore().sync.  This does the same thing as shown above to force the appropriate call the back end.</p>
<p>&nbsp;</p>
<h2>Remarks</h2>
<p>Hope this helps give you a little more understanding into updating with the ExtJS library. If you are looking for the source, it’s in part 1 of this series.</p>
<p>* for the record, this ExtJS code is taken very closely from samples on the Sencha web site.  The premise of the article is asp.net and not how to right sencha code.</p>
