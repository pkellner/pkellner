---
layout: post
status: publish
published: true
title: Integrating Jekyll and SmartForms and ReCaptcha For Static Site Contact Forms
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
excerpt: Learn how to integrate a static web site with a contact form effortlessly using SmartForms.
---

# Background

I've recently upgraded my blog site (this one) to use [Jekyll](https://jekyllrb.com/) instead of WordPress. For years, my Wordpress site has been getting more and more difficult to maintain. The [MySql](https://www.mysql.com/) database is a mess from all the plugins, and every time I press the "Upgrade Site" button in my dashboard, my heart would sink a little until after it said "successfully updated". I knew that if it failed, I'd be in a world of hurt.


So, I bit the bullet, spent about two days converting and learning Jekyll and now, my site is 100% converted, running on [GitHub Pages](https://pages.github.com/) and ... so far so good. You can see the actually repository that serves the site here.  [https://github.com/pkellner/pkellner/tree/gh-pages](https://github.com/pkellner/pkellner/tree/gh-pages).  When nice thing that came for free is I had been meaning to upgrade this site to https and with GitHub Pages, I just had to check a box to make that happen.

I did need to figure out the contact me form and that's where [SmartForms](https://smartforms.dev/) comes and made it easy

# The Integration With SmartForms

## Create an Account on SmartForms

Creating the account on https://smartforms.dev was easy. No credit card, simple setup.  Pricing is straight forward.  50 contacts emails a month, free forever. Though, I'd like to know what happens to that 51st.

![](../assets/posts/including-and-managing-images-in-jekyll/homepage.png)

Next, click on the button "My forms" and add a new form.  You can see I have one now and it shows I have 10 submissions in it.

![](../assets/posts/including-and-managing-images-in-jekyll/myforms.png)

Clicking on my form, I just need to name it, give it a redirect URL which is what happens after the person entering the comment clicks send, and of course, a very important captcha secret needs to be entered.

![](../assets/posts/including-and-managing-images-in-jekyll/formsetup.png)

I won't go into the details, but getting the captcha keys is easy. Go to your google account (yes, you need a google account), go here: https://developers.google.com/recaptcha/docs/settings and sign up for your keys (make sure to use recaptcha-2, 3 is hopefully coming... hint hint)

![](../assets/posts/including-and-managing-images-in-jekyll/recaptcha.png)

Save your site and secret keys in a secure place (everyone will see the site key, but the secret you shoud not share).

![](../assets/posts/including-and-managing-images-in-jekyll/recaptchakeys.png)

Now, go back to your form screen (above) and paste that secret key into the SmartForms setting box and update.

That's it! You are ready to go to your Jekyll site and add your contact form.



## The Contact Form in Jekyll

Just a couple things to do in Jekyll.  First make a contact form that looks something like this:

```
---
layout: page
title: Contact Me
description: How can I help you?
background: '/img/bg-contact.jpg'
form: true
---
```

```HTML
<script src="https://www.google.com/recaptcha/api.js"></script>

<p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
<form action="https://smartforms.dev/submit/5d72bc1bf5eed62ce3daa13c" method="POST" >
  <div class="control-group">
    <div class="form-group floating-label-form-group controls">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Name" id="name" name="name" required data-validation-required-message="Please enter your name.">
      <p class="help-block text-danger"></p>
    </div>
  </div>
  <div class="control-group">
    <div class="form-group floating-label-form-group controls">
      <label>Email Address</label>
      <input type="email" class="form-control" placeholder="Email Address" id="email" name="email" required data-validation-required-message="Please enter your email address.">
      <p class="help-block text-danger"></p>
    </div>
  </div>
  <div class="control-group">
    <div class="form-group col-xs-12 floating-label-form-group controls">
      <label>Phone Number</label>
      <input type="tel" class="form-control" name="phone" placeholder="Phone Number" id="phone" >
    </div>
  </div>
  <div class="control-group">
    <div class="form-group floating-label-form-group controls">
      <label>Message</label>
      <textarea rows="8" class="form-control" placeholder="Message" id="message" name="message" required data-validation-required-message="Please enter a message."></textarea>
      <p class="help-block text-danger"></p>
    </div>
  </div>
  <br>
  <div id="success"></div>
  <div class="form-group">
    <button type="submit" class="btn btn-primary" id="sendMessageButtonxxx">Send</button>
  </div>
  <div class="g-recaptcha" data-sitekey="6LdUIbcUAAAAABjv3-v5Y9coWrg7yBT57KetkvRk"></div>
</form>
```

Notice the script tag pointing to the google api and then just above the form tag at the bottom, the g-recaptcha div tag with my site key in it.

## You are Done!

Now, when a user comes to your site and gets to the contact page, they see the nice google captcha and when they submit, you will get an email and the message will be logged.

![](../_posts/final.png)





