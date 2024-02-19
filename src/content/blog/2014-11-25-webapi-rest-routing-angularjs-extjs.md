---
status: publish
published: true
pubDatetime: 2014-11-25T20:00:00.000Z
title: WebAPI REST Routing For AngularJS and ExtJS
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4116
wordpress_url: https://peterkellner.net/?p=4116
date: '2014-11-25 17:51:56 -0800'
date_gmt: '2014-11-26 00:51:56 -0800'
categories:
- C#
- ASP.NET 4.5
- WebAPI
- AngularJS
- Angular
tags: []
---
<p>As most of my readers know, I’ve done a lot of work with the JavaScript libraries made by <a href="http://www.sencha.com/">Sencha</a> (<a href="http://www.sencha.com/products/extjs/">ExtJS</a> and <a href="http://www.sencha.com/products/touch/">SenchaTouch</a>).  The typical JSON sent down to the requesting web application looks like the following with both Sencha products.</p>
<pre>
{
  "data": [
    {
      "shirtSize": "Mens-4XL",
      "id": 30
    },
    {
      "shirtSize": "Mens-5XL",
      "id": 31
    },
    {
      "shirtSize": "Mens-6XL",
      "id": 32
    }
  ],
  "total": 34,
  "success": true
} 
</pre>
<p>Notice that it is a single JavaScript object that has a property named data which is the array we are interested in.</p>
<p><a href="https://angularjs.org/">AngularJS’s</a> Resource api expects just the data array by default without the nice wrapping with total and status.  That is, Angular just wants this:</p>
<pre>[
    {
      "shirtSize": "Womens-L",
      "id": 4
    },
    {
      "shirtSize": "Womens-XL",
      "id": 5
    },
    {
      "shirtSize": "Womens-2XL",
      "id": 6
    },
    {
      "shirtSize": "Mens-S",
      "id": 7
    }
  ]
</pre>
<p>The default routing in Microsoft’s ASP.NET WebAPI 2 is such that a rest controller always formats data the same and it is non trivial to write a special filter to convert the results to one format or the other based on something like a request header.  The work around I came up with to allow basically one WebAPI service to handle both types of output was to have the REST call be slightly different.  The original REST calls to get data were as follows:</p>
<p>…/rest/ShirtSize and …/rest/ShirtSize/31</p>
<p>That is, the two above URLs always get me the full result including the total and success value.  What I want is another REST call I can use in AngularJS that will return me just the array.  My design calls for the following two URLs to do that.</p>
<p>../rest/ShirtSize/ArrayOnly and /rest/ShirtSize/ArrayOnly/31</p>
<p>To do this in WebAPI is quite simple.  All we need to do is add to our routing file (WebApiConfig.cs) the following code.</p>
<pre lang='c#'>
config.Routes.MapHttpRoute
    ("API Presenter ArrayOnly", "rest/presenter/arrayonly/{id}",
        new
        {
            controller = "presenter",
            arrayonly = 1,
            id = RouteParameter.Optional
        });
</pre>
<p>Then, in our WebAPI controller itself we have the following method signature.</p>
<pre lang='c#'> 
public HttpResponseMessage Get(int? arrayonly=null,int? id = null)
</pre>
<p>Now, when the WebAPI call happens without arrayonly specified we get the default behavior which includes the success and count but when arrayonly is passed in the parameter line we can return a custom response that just has our array.</p>
<p>HTH’s!</p>
