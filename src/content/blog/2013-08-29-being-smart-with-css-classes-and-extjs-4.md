---
status: publish
published: true
pubDatetime: 2013-08-29T20:00:00.000Z
title: Being Smart With CSS Classes and ExtJS 4
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3715
wordpress_url: https://peterkellner.net/?p=3715
date: '2013-08-29 15:52:03 -0700'
date_gmt: '2013-08-29 22:52:03 -0700'
categories:
- Sencha
- ExtJS
tags: []
---
<p>&nbsp;</p>
<h2>Inspiration</h2>
<p>Tuesday this week, <a href="https://twitter.com/rolandschuetz">Roland Schütz</a> presented at the <a href="http://www.meetup.com/The-San-Francisco-ExtJS-Meetup-Group/events/135795892/">ExtJS San Francisco Meetup Group</a> <a href="http://banchaproject.org/">Bancha</a>. Unfortunately (for everyone else) we did not have good attendance which gave me a bunch of time to talk with Roland (or better I should say for Roland to teach me stuff about ExtJS and the web in general).  It was fun to learn so much from someone half my age and twice as smart.  Meanwhile, while I was showing <a href="http://rolandschuetz.at/">Roland</a> my latest problem, he noticed I was showing and hiding elements by changing XTemplates.  He pointed out how inefficient that is and showed me a better way with CSS.  I have always known this is possible, but until now did not have the specifics for how to achieve it.  In this article, I’ll show you what Roland showed me.</p>
<p><iframe src="https://skydrive.live.com/embed?cid=60F1A949216C6B8F&amp;resid=60F1A949216C6B8F%2121960&amp;authkey=AGsbyWjVE8FhF2o" height="240" width="320" frameborder="0" scrolling="no"></iframe></p>
<p>&nbsp;</p>
<h2>The Problem</h2>
<p>Let’s imagine we want to build an app (<a href="http://www.sencha.com/products/extjs/">Sencha ExtJS</a> in this case) that allows to show rows of data from a database, but easily toggle hiding some of the data.  Say it was a security app where we do now want to show security data.  For our example, we are just going to make it toggle by pressing a button but in the real world, this gets pretty involved.</p>
<p>[wp-js-fiddle url="http://jsfiddle.net/pkellner99/qr2BJ/10428/" style="width:100%; height:400px; border:solid #4173A0 1px;"]</p>
<p>A less correct way to do this would be create an XTemplate with an if clause in it, then based on the value of some button state or checkbox change what is showing from the store to be blank or the value.  This would cause a bunch of javascript to be run.  In this example, it would be fast so there would be no issue but in most cases, not optimal.</p>
<h2>The Strategy</h2>
<p>The basic strategy is this. You create two CSS classes as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">style</span> <span style="color: #ff0000;">TYPE</span><span style="color: #0000ff;">="text/css"</span><span style="color: #0000ff;">&gt;</span>
       .adminsection {
          display: none;
        }
        .show-adminsection .adminsection {
            display: inline;
        }
 <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">style</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p>You create a html structure as follows:</p>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;"><span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div</span> <span style="color: #ff0000;">class</span><span style="color: #0000ff;">="show-adminsection"</span><span style="color: #0000ff;">&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">p</span><span style="color: #0000ff;">&gt;</span>Do not hide this<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">p</span><span style="color: #0000ff;">&gt;&lt;</span><span style="color: #800000;">br</span> <span style="color: #0000ff;">/&gt;</span>
    <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">span</span> <span style="color: #ff0000;">class</span><span style="color: #0000ff;">="adminSection"</span><span style="color: #0000ff;">&gt;</span>Hide THIS!!!<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">span</span>
&amp;<span style="color: #ff0000;">lt</span>;/<span style="color: #ff0000;">div</span><span style="color: #0000ff;">&gt;</span></pre>
<p>&nbsp;</p>
</div>
<p>Then, in your JavaScript, you simply add and remove the class show-adminsection and the Hide THIS! will come and go!</p>
<p>You can see this in it’s full detail list a list view in the code below as well as the JS Fiddle Project shown above (hopefully, it’s my first fiddle).</p>
<p>Basically, when you press the button to hide or show, one DOM element has a class inserted or deleted to it.  That’s it!</p>
<p>HTH’s!</p>
<h2>The Code</h2>
<div id="codeSnippetWrapper">
<pre id="codeSnippet" style="overflow: visible; font-size: 8pt; font-family: 'Courier New', courier, monospace; color: black; direction: ltr; text-align: left; margin: 0em; line-height: 12pt; width: 100%; background-color: #f4f4f4; border-style: none; padding: 0px;">Ext.Loader.setConfig({ enabled: <span style="color: #0000ff;">true</span>, disableCaching: <span style="color: #0000ff;">true</span> });
Ext.application({
    name: <span style="color: #006080;">'TestApp'</span>,
    launch: <span style="color: #0000ff;">function</span> () {

        <span style="color: #0000ff;">var</span> store = Ext.create(<span style="color: #006080;">'Ext.data.Store'</span>, {
            storeId: <span style="color: #006080;">'employeeStore'</span>,
            fields: [<span style="color: #006080;">'name'</span>,
                <span style="color: #006080;">'seniority'</span>, <span style="color: #006080;">'department'</span>, <span style="color: #006080;">'clearance'</span>],
            data: {
                <span style="color: #006080;">'employees'</span>: [
                    {
                        <span style="color: #006080;">"name"</span>: <span style="color: #006080;">"Richard Nixon"</span>, <span style="color: #006080;">"seniority"</span>: 7,
                        <span style="color: #006080;">"department"</span>: <span style="color: #006080;">"Management"</span>,
                        <span style="color: #006080;">"clearance"</span>: <span style="color: #006080;">"low"</span>
                    },
                    {
                        <span style="color: #006080;">"name"</span>: <span style="color: #006080;">"Jimmy Carter"</span>,
                        <span style="color: #006080;">"seniority"</span>: 2, <span style="color: #006080;">"department"</span>: <span style="color: #006080;">"Sales"</span>,
                        <span style="color: #006080;">"clearance"</span>: <span style="color: #006080;">"hight"</span>
                    },
                    {
                        <span style="color: #006080;">"name"</span>: <span style="color: #006080;">"Ronald Reagan"</span>, <span style="color: #006080;">"seniority"</span>: 3,
                        <span style="color: #006080;">"department"</span>: <span style="color: #006080;">"Sales"</span>, <span style="color: #006080;">"clearance"</span>: <span style="color: #006080;">"medium"</span>
                    },
                    {
                        <span style="color: #006080;">"name"</span>: <span style="color: #006080;">"George Washington"</span>, <span style="color: #006080;">"seniority"</span>: 4,
                        <span style="color: #006080;">"department"</span>: <span style="color: #006080;">"Accounting"</span>, <span style="color: #006080;">"clearance"</span>: <span style="color: #006080;">"medium"</span>
                    },
                    {
                        <span style="color: #006080;">"name"</span>: <span style="color: #006080;">"George Bush"</span>, <span style="color: #006080;">"seniority"</span>: 5,
                        <span style="color: #006080;">"department"</span>: <span style="color: #006080;">"Accounting"</span>, <span style="color: #006080;">"clearance"</span>: <span style="color: #006080;">"none"</span>
                    }
                ]
            },
            proxy: {
                type: <span style="color: #006080;">'memory'</span>,
                reader: {
                    type: <span style="color: #006080;">'json'</span>,
                    root: <span style="color: #006080;">'employees'</span>
                }
            }
        });

        <span style="color: #0000ff;">var</span> tpl1 = <span style="color: #0000ff;">new</span> Ext.XTemplate(
            <span style="color: #006080;">'&lt;tpl for="."&gt;'</span>,
                <span style="color: #006080;">'{name} {seniority}&lt;br/&gt;'</span>,
                <span style="color: #006080;">'&lt;span class="adminsection"&gt;{clearance}&lt;/span&gt;&lt;br/&gt;'</span>,
                <span style="color: #006080;">'&lt;hr/&gt;'</span>,
            <span style="color: #006080;">'&lt;/tpl&gt;'</span>
        );

        <span style="color: #0000ff;">var</span> view = Ext.create(<span style="color: #006080;">'Ext.view.View'</span>, {
            region: <span style="color: #006080;">'center'</span>,
            title: <span style="color: #006080;">'Employees'</span>,
            store: Ext.data.StoreManager.lookup(<span style="color: #006080;">'employeeStore'</span>),
            tpl: tpl1,
        });

        <span style="color: #0000ff;">new</span> Ext.Viewport({
            items: [
                    {
                        xtype: <span style="color: #006080;">'button'</span>,
                        text: <span style="color: #006080;">'Show Admin Section'</span>,
                        region: <span style="color: #006080;">'north'</span>,
                        handler: <span style="color: #0000ff;">function</span> (button) {
                            <span style="color: #0000ff;">var</span> panel = button.up();
                            panel.addCls(<span style="color: #006080;">"show-adminsection"</span>);
                        },
                    },
            {
                xtype: <span style="color: #006080;">'button'</span>,
                text: <span style="color: #006080;">'Hide Admin Section'</span>,
                region: <span style="color: #006080;">'north'</span>,
                handler: <span style="color: #0000ff;">function</span> (button) {
                    <span style="color: #0000ff;">var</span> panel = button.up();
                    panel.removeCls(<span style="color: #006080;">"show-adminsection"</span>);
                }
            }, view
            ],
            layout: <span style="color: #006080;">'border'</span>
        });

    }
});</pre>
<p>&nbsp;</p>
</div>
