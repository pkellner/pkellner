---
status: publish
published: true
pubDatetime: 2012-04-17T20:00:00.000Z
title: Setting Values In a Form Using the Sencha Architect 2.0 (ExtJS 4.0)
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1959
wordpress_url: https://peterkellner.net/2012/04/17/setting-values-in-a-form-using-the-sencha-architect-2-0-extjs-4-0/
date: '2012-04-17 17:01:50 -0700'
date_gmt: '2012-04-18 00:01:50 -0700'
categories:
- Sencha
- Sencha
- Sencha Architect 2
tags: []
---
<p>Let’s say you want to make a simple modal window that appears when you <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.Panel-event-itemdblclick">double click</a> on a row in a <a href="http://www.sencha.com/">Sencha</a> <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.Panel">Grid Panel</a>.&#160; Let’s assume you have the panel created and in the double click event you need to put some code.&#160; You want that code to pass in some values to the <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.window.Window">window</a>, then have the window pop up and look something like this:</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image7.png"><img title="image" style="display: inline" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb5.png" width="354" height="225" /></a></p>
<p>&#160;</p>
<p>We know we need to create a <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.Panel">form panel</a>, but first, let’s code the double click event in the grid that brings it up.&#160; To do this, we add the DoubleClick event to the Grid Panel and then, using the “record” passed in, we pass that to our new Windows we are about to create.&#160; below is some code I wrote to do this (3 lines).</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image8.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb6.png" width="567" height="201" /></a></p>
<p>&#160;</p>
<p>Next, let’s go into designer and make a simple form that is basically a top level window that has a form panel as a client, then the form panel has a <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.FieldSet">fieldset</a>, and that fieldset has 3 <a href="http://docs.sencha.com/ext-js/4-0/#!/api/Ext.form.field.Text">textfields</a>.&#160; Very straight forward and what you end up getting from SA (<a href="http://www.sencha.com/products/architect">Sencha Architect</a>) looks like the following.&#160; I won’t go through the drag and drops to make it, but it is pretty straight forward.&#160; It took me about 30 seconds.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image9.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb7.png" width="462" height="243" /></a></p>
<p>&#160;</p>
<p>The code it created looks like the following (which also contains the load event I entered myself and is pictured separately below it.</p>
<pre class="csharpcode">Ext.define(<span class="str">'MyApp.view.AddressUpdateWindow'</span>, {
    extend: <span class="str">'Ext.window.Window'</span>,

    height: 250,
    width: 400,
    title: <span class="str">'Address Book Update'</span>,

    initComponent: <span class="kwrd">function</span>() {
        <span class="kwrd">var</span> me = <span class="kwrd">this</span>;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: <span class="str">'form'</span>,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: <span class="str">'fieldset'</span>,
                            title: <span class="str">'My Fields'</span>,
                            items: [
                                {
                                    xtype: <span class="str">'textfield'</span>,
                                    name: <span class="str">'City'</span>,
                                    fieldLabel: <span class="str">'City'</span>,
                                    anchor: <span class="str">'100%'</span>
                                },
                                {
                                    xtype: <span class="str">'textfield'</span>,
                                    name: <span class="str">'State'</span>,
                                    fieldLabel: <span class="str">'State'</span>,
                                    anchor: <span class="str">'100%'</span>
                                },
                                {
                                    xtype: <span class="str">'textfield'</span>,
                                    name: <span class="str">'Zip'</span>,
                                    fieldLabel: <span class="str">'Zip'</span>,
                                    anchor: <span class="str">'100%'</span>
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onFormAfterRender,
                            scope: me
                        }
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: <span class="str">'toolbar'</span>,
                    dock: <span class="str">'bottom'</span>,
                    items: [
                        {
                            xtype: <span class="str">'button'</span>,
                            handler: <span class="kwrd">function</span>(button, <span class="kwrd">event</span>) {
                                debugger;
                            },
                            text: <span class="str">'Save'</span>
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onFormAfterRender: <span class="kwrd">function</span>(abstractcomponent, options) {

        <span class="kwrd">var</span> recordData = 
        abstractcomponent.up().recordData;

        abstractcomponent.getForm().setValues(
        recordData
        );


        <span class="rem">//abstractcomponent.getForm().setValues({</span>
        <span class="rem">//    City: recordData.City,</span>
        <span class="rem">//    State: recordData.State,</span>
        <span class="rem">//    Zip: recordData.Zip</span>
        <span class="rem">//});</span>



    }

});</pre>
<style type="text/css">
.csharpcode, .csharpcode pre<br />
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
<p>Below is the code I wrote which you can see incorporated in the code above.&#160; Notice the lines I commented out.&#160; I just did this to show what is really happening, but I condensed it a little in my real JavaScript.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image10.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb8.png" width="569" height="312" /></a></p>
<p>&#160;</p>
<p>So basically, that’s it.&#160; We created a double click event in a grid panel and from that we opened a pop up form and populated it with data.&#160; Very straight forward.</p>
<p>HTH’s.</p>
