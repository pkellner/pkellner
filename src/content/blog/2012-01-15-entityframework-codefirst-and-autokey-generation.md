---
status: publish
published: true
pubDatetime: 2012-01-15T20:00:00.000Z
title: EntityFramework CodeFirst and AutoKey Generation
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 1783
wordpress_url: https://peterkellner.net/2012/01/15/entityframework-codefirst-and-autokey-generation/
date: '2012-01-15 14:02:45 -0800'
date_gmt: '2012-01-15 21:02:45 -0800'
categories:
- Entity Framework
- CodeFirst
tags: []
---
<p>&#160;</p>
<p>This one had me a little stumped, and as usual, there are not enough examples in the <a href="http://www.microsoft.com/en-us/default.aspx">Microsoft</a> documentation to be very helpful. I’m using <a href="http://msdn.microsoft.com/en-us/data/aa937723">EntityFramework</a> <a href="http://msdn.microsoft.com/en-us/data/hh134698">CodeFirst</a> with <a href="http://www.microsoft.com/visualstudio/en-us/products/2010-editions">Visual Studio</a> 2011.&#160; Let’s assume you create a class as follows:</p>
<p>&#160;</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> CongressNumber
    {
        [Key]
        <span class="kwrd">public</span> <span class="kwrd">int</span> CongressNumberValue { get; set; }
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
.csharpcode .lnum { color: #606060; }</style></p>
<p>Then, you manually set the value of CongressNumberValue to 112.&#160; I’d certainly think that is a reasonable thing to do. I know that the Microsoft guys often special case Id or id, but hard to believe they would take something like CongressNumberValue and assume I meant that to be an autogenerating Identity column.&#160; Well, it seems they do that and the doc’s don’t even mention it.&#160; </p>
<p>After first, finding the <a href="http://msdn.microsoft.com/en-us/library/gg197525(v=vs.103).aspx">page on annotations</a>, I discovered that what we really need to set is this to have it work as we want (with no identity key generation).</p>
<pre class="csharpcode"> <span class="kwrd">public</span> <span class="kwrd">class</span> CongressNumber
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        <span class="kwrd">public</span> <span class="kwrd">int</span> CongressNumberValue { get; set; }
    }</pre>
<p>I found this after drilling down some in there doc.&#160; What surprises me is that no where does it mention that if you have a string, that does not get database generated, but if you have an int, that does.&#160; I wonder what happens if you have a Guid? (I’ll leave that up to someone who wants to use a guid).</p>
<p>I would have loved to put in my own comments on the page: <a href="http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.databasegeneratedoption(v=vs.103).aspx">http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.databasegeneratedoption(v=vs.103).aspx</a> but there was no user comment section.&#160; Oh well.</p>
<p>To be fair, on the page: <a href="http://msdn.microsoft.com/en-us/library/gg197525(v=vs.103).aspx">http://msdn.microsoft.com/en-us/library/gg197525(v=vs.103).aspx</a> it does explain about identity and integers but when I had my issue, I was already on the detail page.&#160; Seems to me the detail page should have more information on it than the summary page that leads in.&#160; The only reason I found it was because while writing this post, I went back to get the proper links.</p>
<p>&#160;</p>
<p><a href="/wp/wp-content/uploads/2012/01/image10.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="image" border="0" alt="image" src="/wp/wp-content/uploads/2012/01/image_thumb8.png" width="542" height="89" /></a></p>
<p>HTH’s.</p>
