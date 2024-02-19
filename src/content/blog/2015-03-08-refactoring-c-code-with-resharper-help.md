---
status: publish
published: true
pubDatetime: 2015-03-08T20:00:00.000Z
title: Refactoring C# Code With ReSharper Help
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4208
wordpress_url: https://peterkellner.net/?p=4208
date: '2015-03-08 17:56:48 -0700'
date_gmt: '2015-03-09 00:56:48 -0700'
categories:
- ASP.NET 2.0
tags: []
---
<p>&#160;</p>
<p>A pattern that I do quite often is to first right out code that actually works, then when I see a pattern repeat itself, I like to refactor that code to try and avoid the repetitive code.&#160; Reasons include:</p>
<ul>
<li>Smaller Code </li>
<li>Less Chance For Error </li>
<li>Don’t Repeat Yourself (DRY) </li>
</ul>
<p>As an example, the <a href="http://en.wikipedia.org/wiki/C_Sharp_%28programming_language%29">c#</a> code I’m working on now involves reading key values to be used with the Stripe payment service.&#160; Here is the code I first wrote:</p>
<pre lang="cs">bool testMode = Utils.AppSettingCheck(&quot;StripeTestMode&quot;, null, null, codeCampYearId, null);

// don't even set values
if (testMode)
{
    // test
    var stripeTestSecretKey = Utils.AppSettingValue(&quot;StripeTestSecretKey&quot;, null, null, codeCampYearId, null);
    if (String.IsNullOrEmpty(stripeTestSecretKey))
    {
        view.StripePublicAndPrivateKeys.StripeSecretKey = Utils.AppSettingValue(&quot;StripeTestSecretKey&quot;,
            null, null, codeCampYearId, null);
    }
    else
    {

        view.StripePublicAndPrivateKeys.StripeSecretKey = Utils.AppSettingValue(&quot;StripeTestSecretKey&quot;,
            null, null, 999, null);
    }

    var stripePublicKey = Utils.AppSettingValue(&quot;StripePublicKey&quot;, null, null, codeCampYearId, null);
    if (String.IsNullOrEmpty(stripePublicKey))
    {
        view.StripePublicAndPrivateKeys.StripePublicKey = Utils.AppSettingValue(&quot;StripeTestPublicKey&quot;,
            null, null, 999, null);
    }
}
else
{
    // live
    var stripeLiveSecretKey = Utils.AppSettingValue(&quot;StripeLiveSecretKey&quot;, null, null, codeCampYearId, null);
    if (String.IsNullOrEmpty(stripeLiveSecretKey))
    {
        view.StripePublicAndPrivateKeys.StripeSecretKey = Utils.AppSettingValue(&quot;StripeLiveSecretKey&quot;,
            null, null, 999, null);
    }

    var stripePublicKey = Utils.AppSettingValue(&quot;StripeLivePublicKey&quot;, null, null, codeCampYearId, null);
    if (String.IsNullOrEmpty(stripePublicKey))
    {
        view.StripePublicAndPrivateKeys.StripePublicKey = Utils.AppSettingValue(&quot;StripeLivePublicKey&quot;,
            null, null, 999, null);
    }
}</pre>
<p>The first thing I do is to look for the pattern and try and pull out variables that I know are going to be helpful in refacotring. You can see below that I pulled out the keyAppName variable and I also changed the assignment to be to a new variable rather than to the exact target I wanted (keyValue instead of view.StripePublicAndPrivateKeys.StripeSecretKey). The reason is my plan is to pull out the common functionality and to do this I don't want to have to pass into a common method lot's of extranious classes.</p>
<pre lang="cs"> if (testMode)
{
    // test
    var keyAppName = &quot;StripeTestSecretKey&quot;;

    var keyValue = Utils.AppSettingValue(keyAppName, null,
        null,
        String.IsNullOrEmpty(Utils.AppSettingValue(keyAppName, null, null, codeCampYearId, null))
            ? codeCampYearId
            : 999, null);

    view.StripePublicAndPrivateKeys.StripeSecretKey = keyValue;

    var stripePublicKey = Utils.AppSettingValue(&quot;StripePublicKey&quot;, null, null, codeCampYearId, null);
    if (String.IsNullOrEmpty(stripePublicKey))
    {
        view.StripePublicAndPrivateKeys.StripePublicKey = Utils.AppSettingValue(&quot;StripeTestPublicKey&quot;,
            null, null, 999, null);
    }
}</pre>
<p>Next, through the helpfulness of JetBrain's <a href="https://www.jetbrains.com/resharper/">ReSharper</a>, I select the code I want to refactor and then right mouse button, say &quot;Extract Method&quot; and this is what I get:</p>
<p><a href="/wp/wp-content/uploads/2015/03/image.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/03/image_thumb.png" width="570" height="252" /></a></p>
<p>The method that is created is this:</p>
<p><a href="/wp/wp-content/uploads/2015/03/image4.png"><img title="image" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="image" src="/wp/wp-content/uploads/2015/03/image4_thumb.png" width="573" height="395" /></a></p>
<p>Which, when shown, changes the code to the following (notice that the method GetKeyValueFromStrip is created.</p>
<pre lang="cs">var keyAppName = &quot;StripeTestSecretKey&quot;;

var keyValue = GetKeyValueFromStrip(codeCampYearId, keyAppName);

view.StripePublicAndPrivateKeys.StripeSecretKey = keyValue;</pre>
<p>And, that can be simplified to simply</p>
<pre lang="cs">view.StripePublicAndPrivateKeys.StripeSecretKey = 
    GetKeyValueFromStrip(codeCampYearId, &quot;StripeTestSecretKey&quot;);</pre>
<p>And now, all 4 keys (public and private for both live and test) can be generated quite simply and with little chance of typos as follows</p>
<pre lang="cs">if (testMode)
    {
        view.StripePublicAndPrivateKeys.StripeSecretKey =
            GetKeyValueFromStrip(codeCampYearId, &quot;StripeTestSecretKey&quot;);

        view.StripePublicAndPrivateKeys.StripePublicKey =
            GetKeyValueFromStrip(codeCampYearId, &quot;StripeTestPublicKey&quot;);
    }
    else
    {
        view.StripePublicAndPrivateKeys.StripeSecretKey =
            GetKeyValueFromStrip(codeCampYearId, &quot;StripeLiveSecretKey&quot;);

        view.StripePublicAndPrivateKeys.StripePublicKey =
            GetKeyValueFromStrip(codeCampYearId, &quot;StripeLivePublicKey&quot;);
    }


}

private static string GetKeyValueFromStrip(int codeCampYearId, string keyAppName)
{
    var keyValue = Utils.AppSettingValue(keyAppName, null,
        null,
        String.IsNullOrEmpty(Utils.AppSettingValue(keyAppName, null, null, codeCampYearId, null))
            ? codeCampYearId
            : 999, null);
    return keyValue;
}</pre>
