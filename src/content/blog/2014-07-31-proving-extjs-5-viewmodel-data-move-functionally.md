---
status: publish
published: true
pubDatetime: 2014-07-31T20:00:00.000Z
title: Proving to Myself that in ExtJS 5 ViewModel data does move Functionally
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4058
wordpress_url: https://peterkellner.net/?p=4058
date: '2014-07-31 19:00:49 -0700'
date_gmt: '2014-08-01 02:00:49 -0700'
categories:
- ExtJS 5
tags: []
---
<p>I’ve been having issues that makes me think that ViewModel data in ExtJS 5 does not move through the prototypical inheritance chain so I put a small example to show my case.  Of course, my example works exactly as exptected.  I’m showing it here just for reference.  The output is simply what is below.</p>
<p>The problem I've been having is with bindTo to get a model row.  From what I can tell, data moves exactly as expected but I'm not sure that store and formula model view stuff follow the same path.  I can drill down and see it in the prototype but it is not obvious like it is with data.  More research coming.</p>
<p>Object {from2: "from2", from1: "from1"}</p>
<pre class="csharpcode"> Ext.application({
            name: <span class="str">'MyApp'</span>,
            launch: <span class="kwrd">function</span> () {

                <span class="kwrd">var</span> panel = Ext.create(<span class="str">'Ext.Panel'</span>, {
                    renderTo: Ext.getBody(),
                    height: 500,
                    width: 500,
                    viewModel: {
                        data: {
                            from1: <span class="str">'from1'</span>
                        }
                    },
                    layout: <span class="str">'fit'</span>,
                    items: [
                        {
                            xtype: <span class="str">'panel'</span>,
                            layout: <span class="str">'fit'</span>,
                            viewModel: {
                                data: {
                                    from2: <span class="str">'from2'</span>
                                }
                            },
                            items: [
                                {
                                    xtype: <span class="str">'button'</span>,
                                    text: <span class="str">'1st level'</span>,
                                    handler: <span class="kwrd">function</span> (button) {
                                        <span class="kwrd">var</span> viewModel = button.up().getViewModel();
                                        console.log(viewModel.getData());
                                        debugger;
                                    }
                                }
                            ]
                        }
                    ]
                });
            }
        })</pre>
