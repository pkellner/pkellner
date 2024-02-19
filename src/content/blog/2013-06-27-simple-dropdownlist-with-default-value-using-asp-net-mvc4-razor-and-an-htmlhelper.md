---
status: publish
published: true
pubDatetime: 2013-06-27T20:00:00.000Z
title: Simple DropDownList With Default Value Using ASP.NET MVC4, Razor and an HtmlHelper
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3645
wordpress_url: https://peterkellner.net/?p=3645
date: '2013-06-27 10:41:49 -0700'
date_gmt: '2013-06-27 17:41:49 -0700'
categories:
- ASP.net
- ASP.NET MVC
- ASP.NET 4.5
- Visual Studio 2012
- MVC4
- Razor
tags: []
---
<p>First, the results of what you get.&#160; Notice the URL parameter, the default value in the <a href="http://msdn.microsoft.com/en-us/library/dd492948(v=vs.108).aspx" target="_blank">DropDownList</a> and also the text value output on the page.</p>
<p>&#160;<a href="/wp/wp-content/uploads/2013/06/image2.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/06/image_thumb2.png" width="350" height="184" /></a></p>
<div id="scid:fb3a1972-4489-4e52-abe7-25a00bb07fdf:8b93a061-f484-4474-a340-550bcc923826" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<p>Visual Studio Project <a href="/wp/wp-content/uploads/2013/06/MVC4WithDropDownListAndPostBack1.zip" target="_blank">Project.zip</a></p>
</div>
<h2>Background</h2>
<p>I know a lot of us are struggling changing from ASP.NET <a href="http://www.asp.net/web-forms" target="_blank">WebForms</a> to <a href="http://www.asp.net/mvc/mvc4" target="_blank">MVC4</a>.&#160; For me in particular, it’s been a struggle but I’m slowly seeing light at the end of the tunnel.&#160; Our <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> has been in the process of rewriting in MVC4 for the past many months, and with the help of contractors (and me), we are getting there.&#160; Basically, the site has gone from:</p>
<p><a href="http://siliconvalley-codecamp.com" target="_blank"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/06/image3.png" width="244" height="91" /></a> </p>
<p>to</p></p></p>
<p><a href="http://siliconvalley-codecamp.com" target="_blank"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/06/image4.png" width="244" height="124" /></a> </p>
<p>The example I’m showing here is really based on just implementing a tag cloud manager. You can see an example of this in production and in action here:</p>
<p><a href="http://siliconvalley-codecamp.com/tag">http://siliconvalley-codecamp.com/tag</a></p>
<p><a href="/wp/wp-content/uploads/2013/06/image5.png"><img title="image" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" border="0" alt="image" src="/wp/wp-content/uploads/2013/06/image_thumb3.png" width="244" height="183" /></a> </p>
<p>So, let’s move to the very simple example (project file above).&#160;&#160; The Simple Implementation</p>
<p>First, we need to create an empty <a href="http://www.microsoft.com/visualstudio/" target="_blank">Visual Studio 2012</a> MVC4 Razor project.</p>
<p>Then, let’s create a new home controller that looks like the following:</p>
<pre class="csharpcode"><span class="kwrd">public</span> ActionResult Index(<span class="kwrd">int</span>? maxCnt = 50)
{
    ViewBag.TopTags = <span class="kwrd">new</span> List&lt;SelectListItem&gt;
        {
            <span class="kwrd">new</span> SelectListItem
                {
                    Text = <span class="str">&quot;Top 25 Tags&quot;</span>, 
                    Value = <span class="str">&quot;25&quot;</span>,
                    Selected = checkForSelectedValue(maxCnt ?? 0,25 )
                },
            <span class="kwrd">new</span> SelectListItem {Text = <span class="str">&quot;Top 50 Tags&quot;</span>, Value = <span class="str">&quot;50&quot;</span>,Selected = checkForSelectedValue(maxCnt ?? 0,50 )},
            <span class="kwrd">new</span> SelectListItem {Text = <span class="str">&quot;Top 75 Tags&quot;</span>, Value = <span class="str">&quot;75&quot;</span>,Selected = checkForSelectedValue(maxCnt ?? 0,75 )},
            <span class="kwrd">new</span> SelectListItem {Text = <span class="str">&quot;All Tags&quot;</span>, Value = <span class="str">&quot;9999&quot;</span>,Selected = checkForSelectedValue(maxCnt ?? 0,9999 )}
        };

    ViewBag.MaxCnt = maxCnt ?? 888;
    <span class="kwrd">return</span> View();
}

<span class="kwrd">private</span> <span class="kwrd">bool</span> checkForSelectedValue(<span class="kwrd">int</span> cnt, <span class="kwrd">int</span> maxCnt)
{
    <span class="kwrd">return</span> cnt == maxCnt;
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
<p>Notice we are creating a ViewBag property TopTags which is a list of SelectListItem.&#160; SelectListItem is what is needed as part of the <a href="http://msdn.microsoft.com/en-us/library/system.web.mvc.htmlhelper(v=vs.108).aspx" target="_blank">Html Helper</a> will use for the dropdownlist.&#160; Also notice that we set the default selected list value based on the passed in value to the controller.&#160; If the passed in value equals one of the items, the Selected parameter gets set to true.</p>
<p>Now, let’s make a simple route that passes in maxCnt value from the URL as http://mysite.com/50 as an example.&#160; The route is as follows</p>
<pre class="csharpcode">routes.MapRoute(
    name: <span class="str">&quot;DropDownListRoute&quot;</span>,
    url: <span class="str">&quot;{maxCnt}&quot;</span>,
    defaults:
        <span class="kwrd">new</span>
            {
                controller = <span class="str">&quot;Home&quot;</span>,
                action = <span class="str">&quot;Index&quot;</span>,
                maxCnt = UrlParameter.Optional
            });</pre>
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>Finally, we need the razor view itself.</p>
<pre class="csharpcode">@model dynamic


&lt;h2&gt;Simple DropDownList Using HTML Helpers&lt;/h2&gt;
@Html.DropDownList(<span class="str">&quot;TopTags&quot;</span>, <span class="kwrd">null</span>, <span class="kwrd">new</span> { @onchange = <span class="str">&quot;ChangeCallback(this.value);&quot;</span> })
&lt;p&gt;
    MaxCnt Passed In: @ViewBag.MaxCnt
&lt;/p&gt;

&lt;script type=<span class="str">&quot;text/javascript&quot;</span>&gt;
    function ChangeCallback(maxCnt) {
        window.location.href = maxCnt; <span class="rem">// redirect to &quot;/75&quot;</span>
    }
&lt;/script&gt;</pre>
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>The DropDownList takes as the first parameter as the ViewBag value which is the actual list.&#160; The third parameter is basically a call back that gets called on change of the selection box.&#160; It pass the value of the dropdownlist to the little JavaScript function at the bottom (ChangeCallback) that simply does a new redirect to the URL with the number at the end.</p>
<p>Very simple!</p>
<p>HTHs</p>
