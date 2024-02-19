---
status: publish
published: true
pubDatetime: 2012-04-10T20:00:00.000Z
title: Microsoft&rsquo;s ASP.NET MVC Lite, Building a TextReformatter With JsonResult
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1931
wordpress_url: https://peterkellner.net/?p=1931
date: '2012-04-10 12:40:18 -0700'
date_gmt: '2012-04-10 19:40:18 -0700'
categories:
- ASP.NET 3.5
- Visual Studio
- MVC
- JSON
- Visual Studio 2010
- ASP.NET 4.0
- ASP.net
- Visual Studio 2011 Developer Preview
tags: []
---
<p>&#160;</p>
<h2>Introduction</h2>
<p>&#160;</p>
<p>People often ask me if I use <a href="http://www.asp.net/mvc">MVC</a> or <a href="http://www.asp.net/web-forms">WebForms</a> for my Microsoft <a href="http://www.asp.net/">ASP.NET</a> projects.&#160; I always tell them <a href="http://www.asp.net/mvc">MVC</a>, but I don’t use it in the classic way that most others do.&#160; That is to say, I emit no html from my views, and for that matter really don’t even use views (with the exception of one view which is essentially my entire app.&#160;&#160; People often refer to this as a SPA or Single-Page-Application. What this basically means is that my entire view is built with JavaScript (in my case Sencha’s <a href="http://www.sencha.com/products/extjs/">ExtJS</a>) and the only interaction with the server is to simply bring down <a href="http://json.org/">Json</a> results.</p>
<p>In this post, I’m going to build a simple app following this principle. It’s purpose will be to take a big pile of text, chop it up into words, then output it in some c# friendly manner.&#160; My motivation for doing this is I happen to need that functionality right now and instead of creating a little <a href="http://en.wikipedia.org/wiki/AWK">awk</a> script to do it, I’m going to right a web site!</p>
<p>&#160;</p>
<p>So, Here is what we will build.&#160; A handy formatter! (and you can run it at:&#160;&#160; <a href="http://reformatter.peterkellner.net/">http://reformatter.peterkellner.net/</a> )</p>
<p>&#160;</p>
<p><a href="http://reformatter.peterkellner.net/app.html"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image4.png" width="510" height="438" /></a></p>
<p><a href="http://reformatter.peterkellner.net/app.html"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image5.png" width="511" height="444" /></a></p>
<p>&#160;</p>
<p>&#160;</p>
<h2>Part I, The Visual Studio Project</h2>
<p>&#160;</p>
<p>Let’s first create the Visual Studio project.&#160; My development these days is actually using the latest Windows 8 Consumer build with the beta of Visual Studio 2011 running on it.&#160; The nice thing about this is because Microsoft added “Round Tripping” to VS2011, I can now use VS2011 to create the project and you, my happy readers, can download the project and open it in Visual Studio 2010.&#160; This has been long in coming and Microsoft has finally done it for the newest version of Visual Studio.&#160; Thank you Microsoft!</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb.png" width="438" height="271" /></a></p>
<p>&#160;</p>
<p>And with an Internet Application with Razor (though I really don’t need all that extra stuff, it does not hurt)</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image1.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb1.png" width="385" height="353" /></a></p>
<p>&#160;</p>
<p>The structure created is as as shown below with a Controller and Views folder and all the proper routing setup.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/04/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb2.png" width="218" height="340" /></a></p>
<p>&#160;</p>
<p>Because I want to make a very simple MVC app that only emits Json, Let’s create our own empty controller called ReformatterController.&#160; We do that by right clicking on the Controller folder and pressing “Add Controller”, then “Add Empty Controller”.</p>
<p><a href="/wp/wp-content/uploads/2012/04/image3.png"><img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2012/04/image_thumb3.png" width="352" height="256" /></a></p>
<p>&#160;</p>
<p>Now, let’s create a very very simple controller with just one method that returns a JSON Result.&#160; I’m returning the data in a friendly format to&#160; Sencha’s ExtJS (or SenchaTouch for that matter).&#160; <a href="http://www.webappers.com/2011/02/16/how-to-build-single-page-applications-with-jquery/">JQuery</a> would be similar.&#160; Here is our new controller class (I’m sure my little tokenizer, line maker could be improved, but I’m just doing this to show some real work.</p>
<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> System.Collections.Generic;
<span class="kwrd">using</span> System.Linq;
<span class="kwrd">using</span> System.Text;
<span class="kwrd">using</span> System.Web;
<span class="kwrd">using</span> System.Web.Mvc;

<span class="kwrd">namespace</span> MvcLiteApp.Controllers
{
    <span class="kwrd">public</span> <span class="kwrd">class</span> ReformatterController : Controller
    {
       
        <span class="kwrd">public</span> JsonResult ConvertTextToFriendlyText(<span class="kwrd">string</span> inputText)
        {
            <span class="kwrd">const</span> <span class="kwrd">int</span> maxCharactersInLine = 30;
            <span class="kwrd">bool</span> success;
            <span class="kwrd">string</span> messageReturn;
            var outputDataList = <span class="kwrd">new</span> List&lt;<span class="kwrd">string</span>&gt;();

            <span class="kwrd">try</span>
            {
                var words = inputText.Split(<span class="str">' '</span>).ToList();
                var newLine = <span class="kwrd">new</span> StringBuilder();
                <span class="kwrd">foreach</span> (var word <span class="kwrd">in</span> words)
                {
                    <span class="kwrd">if</span> (newLine.Length + word.Length &lt; maxCharactersInLine &amp;&amp; 
                        word.Length &lt; maxCharactersInLine)
                    {
                        newLine.Append(<span class="str">&quot; &quot;</span>);
                        newLine.Append(word);
                    }
                    <span class="kwrd">else</span>
                    {
                        outputDataList.Add(newLine.ToString().Trim());
                        newLine = <span class="kwrd">new</span> StringBuilder();
                        newLine.Append(word);
                    }
                }
                success = <span class="kwrd">true</span>;
                messageReturn = <span class="str">&quot;&quot;</span>;
            }
            <span class="kwrd">catch</span> (Exception e)
            {
                messageReturn = e.ToString();
                success = <span class="kwrd">false</span>;
            }


            <span class="kwrd">return</span> Json(<span class="kwrd">new</span>
            {
                Success = success,
                Data = outputDataList,
                message = messageReturn
            }, JsonRequestBehavior.AllowGet);
        }

    }
}</pre>
<p>
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
<p>Now, let’s feed it a URL and see what happens.&#160; Here is a sample URL:</p>
<p>http://localhost:3600/Reformatter/ConvertTextToFriendlyText?inputText=Romeo%20Montague%20and%20Juliet%20Capulet%20meet%20and%20fall%20in%20love%20in%20Shakespeare's%20lyrical%20tale%20of%20%22star-cross'd%22%20lovers.</p>
<p>I actually pasted the sentence in to the the browser’s URL line and it added the nice encoded spaces for me.&#160; The output is as follows:</p>
<p>{&quot;Success&quot;:true,&quot;Data&quot;:[&quot;Romeo Montague and Juliet&quot;,&quot;Capulet meet and fall in love&quot;,&quot;in Shakespeare\u0027s lyrical tale&quot;],&quot;message&quot;:&quot;&quot;}</p>
<p>Notice that it created the nice lines formatted as a JavaScript array!</p>
<p>Next step, let’s make a real JavaScript program out of this.</p>
<p>&#160;</p>
<h2>Part 2, Our SPA (Single Page App) That Does Real Work</h2>
<p>&#160;</p>
<p>I’m only going to explain here the part of the Sencha Program that actually consumes the data but first, let’s add a little “properness” to our controller so it responds only to POST.&#160; That is, we add an attribute to the top of the method and we change the behavior attribute on the bottom to say to not allow get.</p>
<pre class="csharpcode">        [HttpPost]
        <span class="kwrd">public</span> JsonResult ConvertTextToFriendlyText(<span class="kwrd">string</span> inputText)
        {
            .......
            <span class="kwrd">return</span> Json(<span class="kwrd">new</span>
            {
                Success = success,
                Data = outputDataList,
                message = messageReturn
            }, JsonRequestBehavior.DenyGet);
        }</pre>
<p>And, the JavaScript in the SPA is very straight forward and is here:</p>
<pre class="csharpcode"><span class="kwrd">var</span> beforeTextAreaComponent = Ext.getCmp(<span class="str">'BeforeFormatTextAreaId'</span>);
textBefore = beforeTextAreaComponent.getValue();

<span class="rem">// how to not pollute global name space here?</span>
<span class="kwrd">var</span> stringbuildervalue = Ext.getCmp(<span class="str">'stringbuilderid'</span>).getValue();
<span class="kwrd">var</span> javascriptarrayvalue = Ext.getCmp(<span class="str">'javascriptarrayid'</span>).getValue();
<span class="kwrd">var</span> noformattingvalue = Ext.getCmp(<span class="str">'noformattingid'</span>).getValue();
<span class="kwrd">var</span> outputwidthvalue = Ext.getCmp(<span class="str">'outputwidthid'</span>).getValue();

Ext.Ajax.request({
    url: <span class="str">'ReFormatter/ConvertTextToFriendlyText'</span>,
    <span class="kwrd">params</span>: {
        inputText: textBefore,
        stringbuilder: stringbuildervalue,
        javascriptarray: javascriptarrayvalue,
        noformatting: noformattingvalue,
        outputwidth: outputwidthvalue
    },
    success: <span class="kwrd">function</span>(response){
        <span class="kwrd">var</span> localData = Ext.JSON.decode(response.responseText).Data;
        <span class="kwrd">var</span> numberRows = localData.length;
        <span class="kwrd">var</span> newData = <span class="str">''</span>;
        <span class="kwrd">for</span> (<span class="kwrd">var</span> i=0;i&lt;numberRows;i++) {
            newData += localData[i] + <span class="str">'\n'</span>;
        }


        <span class="kwrd">var</span> afterTextAreaComponent = Ext.getCmp(<span class="str">'AfterFormatTextAreaId'</span>);
        afterTextAreaComponent.setValue(newData);

    },
    failure: <span class="kwrd">function</span>(error) {
        alert(<span class="str">'error'</span>);
    }

});</pre>
<p>Now, in reality, I’ve added some useful stuff to the controller (and put the project here for your review, comments and suggestions).</p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:279ce901-a751-4b1a-8603-ebda182698cc" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<p>Visual Studio Project <a href="/wp/wp-content/uploads/2012/04/TextReformatter.zip" target="_blank">TextReformatter.zip</a></p>
</div>
