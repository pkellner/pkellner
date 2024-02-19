---
status: publish
published: true
pubDatetime: 2014-07-08T20:00:00.000Z
title: 'Sencha ExtJS 5 Checkbox DataBinding '
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4050
wordpress_url: https://peterkellner.net/?p=4050
date: '2014-07-08 17:54:38 -0700'
date_gmt: '2014-07-09 00:54:38 -0700'
categories:
- ExtJS
- ExtJS 5
- ExtJS Databinding
tags: []
---
<p>I often find that something does not work as I expect and I have to take the problem to bits.  In this case, I was expecting to post a bug to the Sencha team about DataBinding and checkbox field but as is often the case, making the simple example brings out the correct solution and understanding.  So, in light of sharing, here is my simple working example of two way databinding with Sencha’s ExtJS 5.</p>
<p>You can see from the example and code that 1,true (and “on” not shown) all check the box as you would expect.</p>
<p><a href="/wp/wp-content/uploads/2014/07/image1.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/07/image_thumb.png" alt="image" width="244" height="111" border="0" /></a></p>
<p><a href="/wp/wp-content/uploads/2014/07/image2.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/07/image_thumb1.png" alt="image" width="244" height="116" border="0" /></a></p>
<p><a href="/wp/wp-content/uploads/2014/07/image3.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/07/image_thumb2.png" alt="image" width="244" height="130" border="0" /></a></p>
<pre class="csharpcode">Ext.application({
    name: <span class="str">'ProblemBindApp'</span>,

    launch: <span class="kwrd">function</span> () {
        Ext.create(<span class="str">'Ext.container.Viewport'</span>, {
            autoShow: <span class="kwrd">true</span>,
            viewModel: {
                data: {
                    content: <span class="str">'Some Content'</span>,
                    approved: <span class="kwrd">false</span>
                }
            },
            layout: <span class="str">'fit'</span>,
            items: [
                {
                    xtype: <span class="str">'form'</span>,
                    title: <span class="str">'my title'</span>,
                    items: [
                        {
                            xtype: <span class="str">'textfield'</span>,
                            fieldLabel: <span class="str">'approved as textfield:'</span>,
                            bind: <span class="str">'{approved}'</span>
                        },
                        {
                            xtype: <span class="str">'checkboxfield'</span>,
                            fieldLabel: <span class="str">'approved as checkboxfield:'</span>,
                            bind: <span class="str">'{approved}'</span>
                        }
                    ]
                }
            ]
        });
    }
});</pre>
