---
status: publish
published: true
pubDatetime: 2016-05-05T20:00:00.000Z
title: Parsing NewtonSoft JToken Inside WebAPI Call
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4403
wordpress_url: https://peterkellner.net/?p=4403
date: '2016-05-05 07:44:53 -0700'
date_gmt: '2016-05-05 14:44:53 -0700'
categories:
- C#
- WebAPI
- Visual Studio 2015
tags: []
---
<p>One of the simplest ways to POST data from a JavaScript app (such as Angular or JQuery) to a <a href="http://www.asp.net/web-api">Microsoft ASP.NET WebAPI</a> endpoint is simply to post JSON data.  There is a lot of magic that happens to try and match up the POST data you are calling with to the WebAPI call and it often feels like there is no reason why some calls work and some don’t.</p>
<p>My experience is that it’s easier to just process generic JSON on the WebAPI side and not worry about the shape of the data until after it arrives on your WebAPI endpoint.  Darrell Miller has a <a href="http://bizcoder.com/posting-raw-json-to-web-api">very helpful article</a> that demystifies that data and give a very clear way to get that JSON to your WebAPI endpoint as a <a href="http://www.newtonsoft.com/json">NewtonSoft</a> JToken.  Darrel leaves out what to do with the JToken so I thought I’d fill in some of those details.</p>
<p>Here is the WebAPI code from Darrell’s article that you can use to get JSON into your WebAPI endpoint:</p>
<pre lang="c#">public HttpResponseMessage Post([FromBody]JToken jsonbody)
{
    // Process the jsonbody 

    return new HttpResponseMessage(HttpStatusCode.Created);
}</pre>
<p>Let me give an example of processing the jsonbody which is JToken.  It’s actually pretty simple if you use c# indexers.  My example is pretty ugly with goofy variable names but it is what I used just to understand how to parse it. Obviously you’d never use code like this in production but it’s pretty clear what really needs to be done from this.</p>
<p>Here is some basic JSON to parse:</p>
<pre lang="javascript">{
  "codeCampType": "svcc",
  "isAdmin": false,
  "eventName": "Silicon Valley Code Camp 2015",
  "currentCodeCampYear": "2015",
  "attendeeResults": {
    "interestLevel": 0,
    "userLastName": "Smith",
    "id": 987
  },
  "workshopResults": {
    "showWorkshops": true,
    "workshopDatas": [
      {
        "sessionId": 2596,
        "attendeesId": 0,
        "speakers": "Ron Lichty,Mickey Mantle",
        "title": "Managing the Unmanageable 1-Day Workshop"
      },
      {
        "sessionId": 2598,
        "attendeesId": 0,
        "speakers": "John Smith",
        "title": "AngularJS in 2-Days (Workshop)"
      }
    ]
  }
}
</pre>
<p>And here is the code to parse the JToken</p>
<pre lang="javascript">       public HttpResponseMessage Post([FromBody]JToken jsonbody)
        {
            var json = jsonbody.ToString();

            var z = jsonbody["currentCodeCampYear"].Value();

            var zz1 = jsonbody["attendeeResults"]["interestLevel"].Value();
            var zz2 = jsonbody["attendeeResults"]["userLastName"].Value();

            var yy1 = jsonbody["workshopResults"]["showWorkshops"].Value();
            var yy2 = jsonbody["workshopResults"]["workshopDatas"];

            foreach (var yy3 in yy2.Children())
            {
                var kk1 = yy3["sessionId"].Value();
                var kk2 = yy3["speakers"].Value();
            }

            return Request.CreateResponse(HttpStatusCode.Accepted);
        
        }
</pre>
<p><b>HTH's!</b></p>
