---
status: publish
published: true
pubDatetime: 2014-08-28T20:00:00.000Z
title: ExtJS 5 Bind ViewModel To Template
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4068
wordpress_url: https://peterkellner.net/?p=4068
date: '2014-08-28 07:38:49 -0700'
date_gmt: '2014-08-28 14:38:49 -0700'
categories:
- JavaScript
- ExtJS 5
- ExtJS Databinding
tags: []
---
<p>The simplest things can often be aggravating to get right.&#160; I often find that when something does not work (especially in <a href="http://docs.sencha.com/extjs/5.0/whats_new/5.0/whats_new.html">ExtJS 5</a> using <a href="http://docs.sencha.com/extjs/5.0/application_architecture/view_models_data_binding.html">View Model and Bind</a>) that I need to make the simplest example to prove my understanding to myself.&#160; I thought I would share a very simple yet powerful example of how to bind data from a ViewModel to an xtemplate in ExtJS 5.</p>
<p>There are many other things you can do with databinding including modeling selected row in a grid as well as nice integration with formulas.&#160; The below example is just a very simple case that proves it works which is often all I need.</p>
<p>Notice that in the code below I’ve created a very simple viewport with just one item.&#160; The two big takeaways are:</p>
<p>The data must be enclosed in the bind attribute</p>
<p>The tpl (template) is not in a bind attribute</p>
<p>Hope this helps someone struggling also.</p>
<pre class="csharpcode">Ext.onReady(<span class="kwrd">function</span>() {
    Ext.create({
        xtype: <span class="str">'viewport'</span>,
        viewModel: {
            data: {
                viewModelAddress: <span class="str">'200 main street'</span>
            }
        },
        items: [{
            bind: {
                data: {
                    address: <span class="str">'100 main street'</span>,
                    viewModelAddress: <span class="str">'200 main street'</span>

                }
            },
            tpl: <span class="str">'address: {address}&lt;br/&gt;viewModelAddress: {viewModelAddress}'</span>
        }],
        renderTo: Ext.getBody()
    });
});</pre></p>
<hr />
<p><iframe style="height: 383px; width: 788px" height="150" src="https://fiddle.sencha.com/fiddle/9is" width="600"></iframe></p>
<p><a title="https://fiddle.sencha.com/#fiddle/9is" href="https://fiddle.sencha.com/#fiddle/9is">https://fiddle.sencha.com/#fiddle/9is</a></p>
