---
status: publish
published: true
pubDatetime: 2014-06-12T20:00:00.000Z
title: With jQuery and ASP.NET MVC Almost Radio Buttons
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4038
wordpress_url: https://peterkellner.net/?p=4038
date: '2014-06-12 12:29:11 -0700'
date_gmt: '2014-06-12 19:29:11 -0700'
categories:
- ASP.NET MVC
- ASP.NET 4.5
- jQuery
tags: []
---
<p>The <a href="http://www.siliconvalley-codecamp.com/" target="_blank">Silicon Valley Code Camp</a> web site used <a href="https://jquery.org/">jQuery</a> to do a lot of the page markup manipulation.  Behind the scenes of course is <a href="http://www.asp.net/mvc">ASP.NET MVC5</a> which has a lot of helper methods for things like Check Boxes and Radio Buttons.  General purpose methods are nice (until they are not).  I’m building a more sophisticated “Opt-Out” for the code camp site and have created a choice where the user can say they want “All Emails” or “Critical Emails”.  I did not want to have a third choice for “No Emails” since say they don’t want all and they don’t want critical implies they don’t want any.  Also, it does not make sense for the user to say they want both “All” and “Critical”. It’s a one or another, just like radio buttons.</p>
<p><a href="/wp/wp-content/uploads/2014/06/image2.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2014/06/image_thumb2.png" alt="image" width="298" height="448" border="0" /></a></p>
<p>Since I could not use radio buttons to make the behavior correct, I decided to do the validation logic in jQuery.  Here is the short code that takes care of it (along with the ASP.NET MVC5 code for reference).</p>
<pre class="csharpcode">&lt;script type=<span class="str">"text/javascript"</span>&gt;
    $(document).ready(function() {
        <span class="rem">// these are not quite radio buttons.  want to be able to check them both off if you want,</span>
        <span class="rem">// but not allow both to be set.</span>
        $(<span class="str">'#EmailReceiveAllYears'</span>).change(function () {
            <span class="kwrd">if</span> ($(<span class="str">'#EmailSendMinimalEmail'</span>).<span class="kwrd">is</span>(<span class="str">':checked'</span>)) {
                $(<span class="str">'#EmailSendMinimalEmail'</span>).prop(<span class="str">'checked'</span>, <span class="kwrd">false</span>);
            }
        });
        $(<span class="str">'#EmailSendMinimalEmail'</span>).change(function () {
            <span class="kwrd">if</span> ($(<span class="str">'#EmailReceiveAllYears'</span>).<span class="kwrd">is</span>(<span class="str">':checked'</span>)) {
                $(<span class="str">'#EmailReceiveAllYears'</span>).prop(<span class="str">'checked'</span>, <span class="kwrd">false</span>);
            }
        });
    });
&lt;/script&gt;</pre>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: Consolas; font-size: small;">And the ASP.NET MVC5 razor form:</span></p>
<pre class="csharpcode">@<span class="kwrd">using</span> (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    @Html.HiddenFor(a =&gt; a.RegisterUserInfoLoggedIn.AttendeesId)

    &lt;div <span class="kwrd">class</span>=<span class="str">"important"</span>&gt;
        &lt;div <span class="kwrd">class</span>=<span class="str">"checkField"</span>&gt;
            @Html.CheckBoxFor(m =&gt; m.EmailReceiveAllCurrentYear)
            @Html.LabelFor(m =&gt; m.EmailReceiveAllCurrentYear,
                <span class="str">"Receive mailings regarding this years event..."</span>)
          
        &lt;/div&gt;

        &lt;div <span class="kwrd">class</span>=<span class="str">"checkField"</span>&gt;
            @Html.CheckBoxFor(m =&gt; m.EmailReceiveAllYears)
            @Html.LabelFor(m =&gt; m.EmailReceiveAllYears,
                <span class="str">"Receive all mailings regarding ..."</span>)
          
        &lt;/div&gt;

        &lt;div <span class="kwrd">class</span>=<span class="str">"checkField"</span>&gt;
            @Html.CheckBoxFor(m =&gt; m.EmailSendMinimalEmail)
            @Html.LabelFor(m =&gt; m.EmailSendMinimalEmail,
                <span class="str">"Receive ONLY critical email ..."</span>)
        &lt;/div&gt;

        &lt;div <span class="kwrd">class</span>=<span class="str">"checkField"</span>&gt;
            @Html.CheckBoxFor(m =&gt; m.EmailReceiveSponsorEmail)
            @Html.LabelFor(m =&gt; m.EmailReceiveSponsorEmail,
                <span class="str">"Receive emails from our sponsors.  From ..."</span>)  
        &lt;/div&gt;

    &lt;/div&gt;
    &lt;div&gt;
        &lt;div&gt;
            &lt;input type=<span class="str">"submit"</span> <span class="kwrd">class</span>=<span class="str">"button magenta"</span> 
            <span class="kwrd">value</span>=<span class="str">"Save Changes"</span>  /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
}</pre>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: Consolas; font-size: small;">HTH’s!</span></p>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: Consolas; font-size: small;"> </span></p>
