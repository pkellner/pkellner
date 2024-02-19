---
status: publish
published: true
pubDatetime: 2013-12-12T20:00:00.000Z
title: Showing Code In A Wordpress Blog
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3860
wordpress_url: https://peterkellner.net/?p=3860
date: '2013-12-12 13:27:01 -0800'
date_gmt: '2013-12-12 20:27:01 -0800'
categories:
- Live Writer
- WordPress
tags: []
---
<p>For years, I’ve wrestled (and failed) at using code formatting plugins. I use <a href="http://www.live-writer.net/">Windows Live Writer</a> to do my blog posts on <a href="http://wordpress.org/">WordPress</a> and though there are several plugins available for Live Writer, I really don’t like any of them (please correct me if you know of a great one and I’ll post that).</p>
<p>Today, I’m trying a new plugin called Crayon that does a great job but is a little cumbersome to use.&#160; Let me describe my workflow now. If you have a better suggestion for how to use it, please let me know.</p>
<p>The first thing to do is install the plugin. You can find it at the URL: <a href="https://github.com/aramk/crayon-syntax-highlighter">https://github.com/aramk/crayon-syntax-highlighter</a> or simply search for the plugin “crayon” and have wordpress install it for you automatically (like I did).</p>
<p>Once crayon is activated, create a dummy post (not published) and in visual mode add the lines C# Start and C# End with some empty space between them (as follows):</p>
<p><a href="/wp/wp-content/uploads/2013/12/image1.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb1.png" width="610" height="130" /></a></p>
<p>Next, press the “Insert Code” button and in that dialog put in some code as well as tell the dialog the type and anything else you want (you can see what I did highlighted in yellow).</p>
<p><a href="/wp/wp-content/uploads/2013/12/image2.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb2.png" width="499" height="441" /></a></p>
<p>Then of course, press the “Add” button in the upper right.</p>
<p>How, since you want to put this into Live Writer, you’ll need to cut and paste from the “text” view in the wordpress editor the code between the “pre” tags as follows:</p>
<p><a href="/wp/wp-content/uploads/2013/12/image3.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb3.png" width="491" height="296" /></a></p>
<p>and put that into Live Writer in the Source tab:</p>
<p><a href="/wp/wp-content/uploads/2013/12/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb4.png" width="266" height="352" /></a></p>
<p>And, as you can see below, in Live Writer, you just see the source (in edit tab), but when you preview it, well, that becomes a very nice story.</p>
<p><a href="/wp/wp-content/uploads/2013/12/image5.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2013/12/image_thumb5.png" width="328" height="219" /></a></p>
<p>And, as you can see the result below, quite nice!</p>
<p>It would be nice if this where a plugin to live writer!</p>
<pre title="Just Some Sample Code" class="lang:c# decode:true ">// look for first good price (effective now price). If none found, then assume retail price
for (int index = 0; index &lt; sessionPriceList.Count; index++)
{
    var sessionPrice = sessionPriceList[index];
    if (sessionPrice.PriceGoodThroughDate.CompareTo(DateTime.Now) &gt; 0)
    {
        session.CurrentPrice = sessionPrice.PriceOfSession.ToString(&quot;F2&quot;);
        if (index &lt; sessionPriceList.Count)
        {
            var nextOne = sessionPriceList[index + 1];
            session.NextPriceDate = nextOne.PriceGoodThroughDate.ToString(&quot;d&quot;);
            session.NextPrice = nextOne.PriceOfSession.ToString(&quot;F2&quot;);
            session.DaysUntilNextPrice =
                sessionPrice.PriceGoodThroughDate.Subtract(DateTime.Now).Days;
        }

        // confirm that we have number at this slot (if null, then always stop at this price)
        if (!sessionPrice.MaxAtThisPrice.HasValue || session.CurrentAttendance &lt; sessionPrice.MaxAtThisPrice) {
                break;
        }

    }
}</pre>
