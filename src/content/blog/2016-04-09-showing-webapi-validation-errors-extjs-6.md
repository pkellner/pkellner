---
status: publish
published: true
pubDatetime: 2016-04-09T20:00:00.000Z
title: Showing WebAPI Validation Errors with ExtJS 6
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4388
wordpress_url: https://peterkellner.net/?p=4388
date: '2016-04-09 18:28:23 -0700'
date_gmt: '2016-04-10 01:28:23 -0700'
categories:
- Sencha
- Sencha
- ExtJS
- ExtJS 6
tags: []
---
<p>Let’s say you use model validation with ASP.NET WebAPI and you are serving a client side application written in Sencha’s ExtJS.  To show those errors like this:</p>
<p><a href="/wp/wp-content/uploads/2016/04/image.png"><img style="display: inline; border: 0px;" title="image" src="/wp/wp-content/uploads/2016/04/image_thumb.png" alt="image" width="331" height="271" border="0" /></a></p>
<p>You need to add a ValidationActionFilter to your startup code as follows:</p>
<pre lang="c#">using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using CodeCampSV;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace WebAPI.App_Start
{
    public class SenchaError
    {
        public bool success { get; set; }
        public string message { get; set; }
    }

    public class ErrorObject
    {
        public string PropertyName { get; set; }
        public string Message { get; set; }
    }


    public class ValidationActionFilter : ActionFilterAttribute 
    { 
        public override void OnActionExecuting(HttpActionContext context)
        {
            var errorList = new List();
            string errorString = "";
            var modelState = context.ModelState;
            if (!modelState.IsValid)
            {
                var errors = new JObject();
                foreach (var key in modelState.Keys)
                {
                    var state = modelState[key];
                    if (state.Errors.Any())
                    {
                        errors[key] = state.Errors.First().ErrorMessage;
                        errorString = state.Errors.First().ErrorMessage;
                        errorList.Add(new ErrorObject()
                        {
                            Message = errorString,
                            PropertyName = key
                        });
                    }
                }
                context.Response =
                    context.Request.CreateResponse(
                        HttpStatusCode.NotAcceptable, new SenchaError()
                        {
                            message = JsonConvert.SerializeObject(errorList),
                            success = false
                        });

            }
        } 
    }
}
</pre>
<pre lang="c#">
// POST: api/RegSvcc
        public HttpResponseMessage Post(RegistrationData registrationData)
        {
            // do work
            return Request.CreateResponse
                (HttpStatusCode.OK);
        }

    public class RegistrationData
    {
        [MaxLength(20)]
        [MinLength(5)]
        [DisplayName("Confirm Password")]
        [Required]
        public string FirstName{ get; set; }

        [MaxLength(20)]
        [MinLength(5)]
        [DisplayName("Confirm Password")]
        [Required]
        public string LastName{ get; set; }
    }


</pre>
<p>
And then, you can have your ExtJS code do something like the following to display the error:</p>
<pre lang="js">
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/RegSvcc',
            params: 
                City: 'hartsdale',
                State: 'ny',
                UserZipCode: '10530'
            },

            success: function (data) {
                // do something good
            },

            failure: function (result,aa,bb) {
                var errorList = Ext.decode(Ext.decode(result.responseText).message);
                var errorTpl = new Ext.XTemplate(
                    '<tpl for=".">',
                    '<ul class="thumb-wrap">',
                    '<li><b>{Message}</b></li>',
                    '</ul>',
                    '</tpl>'
                );
                var htmlError = errorTpl.apply(errorList);
                Ext.Msg.alert('Problems Found (Please Correct)',htmlError);
            }
        });
</pre>
<pre lang="js">
Ext.application({
    name: 'Fiddle',
    launch: function() {

        data = [{
            Message: 'The Company field is required'
        }, {
            Message: 'Occupation required'
        }, {
            Message: 'Password Does Not Match Confirmation'
        }];
        var errorTpl = new Ext.XTemplate('<tpl for=".">', '<ul class="thumb-wrap">', '<li><b>{Message}</b></li>', '</ul>', '</tpl>');
        var htmlError = errorTpl.apply(data);
        Ext.Msg.alert('Problems Found (please fix)', htmlError);
    }
});
</pre>
<p>And you can run it yourself at the Sencha Fiddle:</p>
<p><iframe width="600" height="500" src="https://fiddle.sencha.com/fiddle/18eh"></iframe> HTH's</p>
