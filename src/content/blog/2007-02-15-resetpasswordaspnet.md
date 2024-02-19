---
status: publish
published: true
pubDatetime: 2007-02-15T20:00:00.000Z
title: Resetting Password with ASP.NET 2.0 Membership and Multiple Providers
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: pkellner99@gmail.com
  url: ''
author_login: Peter Kellner
author_email: pkellner99@gmail.com
description: |-
  If you ever have wanted to be able to programmatically change (reset) a users
  password while at the same time continuing to be able to use the question and
  answer feature, this post is for you.
wordpress_id: 52
wordpress_url: https://peterkellner.net/2007/02/15/resetpasswordaspnet/
date: '2007-02-15 08:39:16 -0800'
date_gmt: '2007-02-15 15:39:16 -0800'
categories:
- Membership
- ASP.NET 2.0
tags: []
---
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<p><meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<p>If you ever have wanted to be able to programmatically change (reset) a users&#160; password while at the same time continuing to be able to use the question and answer feature, this post is for you.&#160; The problem is that if you use code like this:</p>
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<pre class="csharpcode"> <span class="kwrd">string</span> username = <span class="str">&quot;user&quot;</span>;
 <span class="kwrd">string</span> password = <span class="str">&quot;pass@word&quot;</span>;
 MembershipUser mu = Membership.GetUser(username);
 mu.ChangePassword(mu.ResetPassword(), password);</pre>
<p>You will find that if you have in your web.config requiresQuestionAnswer=&quot;true&quot;, you will get an error when you try and reset the password.&#160; The elegant solution to this is to create an additional membeship tag in your web.config and reference it when you change passwords.&#160; That is, add another provider like this:</p>
<p><!--more--></p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">membership</span> <span class="attr">defaultProvider</span><span class="kwrd">=&quot;SqlMembershipProvider&quot;</span> <span class="attr">userIsOnlineTimeWindow</span><span class="kwrd">=&quot;15&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">providers</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">clear</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">=&quot;SqlMembershipProviderOther&quot;</span> <span class="attr">type</span><span class="kwrd">=&quot;SqlProviderOneShot.SqlMembershipProvider&quot;</span>
    <span class="attr">requiresQuestionAndAnswer</span><span class="kwrd">=&quot;false&quot;</span>
     <span class="attr">connectionStringName</span><span class="kwrd">=&quot;EmailEmailConnectionString&quot;</span> <span class="attr">applicationName</span><span class="kwrd">=&quot;EmailEmail&quot;</span>
    <span class="attr">enablePasswordRetrieval</span><span class="kwrd">=&quot;false&quot;</span> <span class="attr">enablePasswordReset</span><span class="kwrd">=&quot;true&quot;</span>
    <span class="attr">requiresUniqueEmail</span><span class="kwrd">=&quot;true&quot;</span> <span class="attr">passwordFormat</span><span class="kwrd">=&quot;Hashed&quot;</span>
    <span class="attr">minRequiredNonalphanumericCharacters</span><span class="kwrd">=&quot;0&quot;</span> <span class="attr">writeExceptionsToEventLog</span><span class="kwrd">=&quot;false&quot;</span>
    <span class="attr">minRequiredPasswordLength</span><span class="kwrd">=&quot;1&quot;</span> <span class="attr">passwordStrengthRegularExpression</span><span class="kwrd">=&quot;&quot;</span>
    <span class="attr">passwordAttemptWindow</span><span class="kwrd">=&quot;10&quot;</span> <span class="attr">maxInvalidPasswordAttempts</span><span class="kwrd">=&quot;8&quot;</span><span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">providers</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">membership</span><span class="kwrd">&gt;</span></pre>
<p>Then, when you change your password, reference it as follows:</p>
<p><!-- code formatted by http://manoli.net/csharpformat/ --><br />
<style type="text/css">
<p>.csharpcode, .csharpcode pre<br />
{<br />
	font-size: small;<br />
	color: black;<br />
	font-family: consolas, "Courier New", courier, monospace;<br />
	background-color: #ffffff;<br />
	/*white-space: pre;*/<br />
}</p>
<p>.csharpcode pre { margin: 0em; }</p>
<p>.csharpcode .rem { color: #008000; }</p>
<p>.csharpcode .kwrd { color: #0000ff; }</p>
<p>.csharpcode .str { color: #006080; }</p>
<p>.csharpcode .op { color: #0000c0; }</p>
<p>.csharpcode .preproc { color: #cc6633; }</p>
<p>.csharpcode .asp { background-color: #ffff00; }</p>
<p>.csharpcode .html { color: #800000; }</p>
<p>.csharpcode .attr { color: #ff0000; }</p>
<p>.csharpcode .alt<br />
{<br />
	background-color: #f4f4f4;<br />
	width: 100%;<br />
	margin: 0em;<br />
}</p>
<p>.csharpcode .lnum { color: #606060; }</style>
<pre class="csharpcode"><span class="kwrd">string</span> username = <span class="str">&quot;user&quot;</span>;
<span class="kwrd">string</span> password = <span class="str">&quot;pass@word&quot;</span>;
MembershipUser mu = Membership.Providers[<span class="str">&quot;SqlMembershipProviderOther&quot;</span>].GetUser(username);
mu.ChangePassword(mu.ResetPassword(), password);</pre>
<p>Hope this helps! At some point, I will integrate this functionality into my ObjectDataSource article that lets you display your membership information with a gridview or detailsview.</p>
