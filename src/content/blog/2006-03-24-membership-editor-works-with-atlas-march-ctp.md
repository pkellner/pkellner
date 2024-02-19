---
status: publish
published: true
pubDatetime: 2006-03-24T20:00:00.000Z
title: Membership Editor Works With Atlas March CTP
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
wordpress_id: 21
wordpress_url: https://peterkellner.net/?p=31
date: '2006-03-24 20:17:20 -0800'
date_gmt: '2006-03-25 03:17:20 -0800'
categories:
- Uncategorized
tags: []
---
<p><strong>Membership Editor Works With </strong><strong>Atlas March Community Technology Preview </strong><strong>IE and Firefox! </strong></p>
<p align="left">In two previous postings I used the January version of Atlas. At MIX06, Microsoft released the next version which is known as the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=B01DC501-B3C1-4EC0-93F0-7DAC68D2F787&amp;displaylang=en">March CTP</a>. I have updated my web demonstration programs to take advantage of the new Atlas. The basic difference now is that the demonstrations all now work with Firefox as well as IE. I don't know about other browser compatability issues, but I'd sure like to hear if they work in your browser. The code can be run at the following locations:</p>
<p align="left"><a href="http://livedemos.peterkellner.net/">http://livedemos.peterkellner.net/</a> (using March Atlas)</p>
<p align="left"><a href="http://livedemos.peterkellner.net/DefaultNoAjax.aspx">http://livedemos.peterkellner.net/DefaultNoAjax.aspx</a> (no Atlas, just for comparison)</p>
<p align="left">and demonstrating adding Membership with Personalization information:</p>
<p align="left"><a href="http://livedemos.peterkellner.net/DefaultWithProfile.aspx">http://livedemos.peterkellner.net/DefaultWithProfile.aspx </a></p>
<p>I have not yet posted the code for the working versions of this you can download. I'm still not happy with part of the solution. Specifically, to make the textbox field you enter the search name into work correctly the changed behavior has to be added. This is done by declaratively putting the following in the asp page of interest.</p>
<p> <!--more-->  <br /> 
<pre class="csharpcode">
<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">="text/xml-script"</span><span class="kwrd">&gt;</span>
 &lt;page&gt;
  &lt;components&gt;
   &lt;textbox id=<span class="str">"ctl00_ContentPlaceHolder1_TextBoxUserSearch"</span>&gt;
    &lt;behaviors&gt;
     &lt;textchangedbehavior timeout=<span class="str">"100"</span>
          changed=<span class="str">"onTextChange"</span> /&gt;
    &lt;/behaviors&gt;
   &lt;/textbox&gt;
  &lt;/components&gt;
 &lt;/page&gt;
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>The TextBox is declared in the page as follows:</p>
<p></p>
<pre class="csharpcode">
<span class="kwrd">&lt;</span><span class="html">asp</span> <span class="attr">:TextBox</span> <span class="attr">ID</span><span class="kwrd">="TextBoxUserSearch"</span>
 <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">AutoPostBack</span><span class="kwrd">="False"</span>
 <span class="attr">CausesValidation</span><span class="kwrd">="True"</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">asp</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>And, of course there must be this little picece of script to make to make it work:</p>
<p></p>
<pre class="csharpcode">
<span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">="text/javascript"</span><span class="kwrd">&gt;</span>
<span class="kwrd">function</span> onTextChange() {
__doPostBack(<span class="str">'ctl00_ContentPlaceHolder1_GridViewMemberUser'</span>,<span class="str">''</span>) ;
}
<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p></p>
<p>The actual javascript that gets invoked is from <a href="http://aspadvice.com/blogs/garbin/default.aspx">Garbin's &quot;The Atlas Notes blog&quot;</a>.</p>
<p>The reason the control can be referenced inside a master page is because of the ct100_ContentPlaceHolder_ prefix on the ID. I'm hoping to find out how to do the above without referencing the control by it's strange ID. Anyone knows, please let me know. I'll then fix my code and post it for everyone to see. (with a blog entry of course)</p>
<p>Thanks</p>
