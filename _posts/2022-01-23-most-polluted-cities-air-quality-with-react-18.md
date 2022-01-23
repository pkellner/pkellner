---
layout: post
status: publish
published: true
title: Build a Web Site With React 18 That Shows the Most Polluted Cities in the United States
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: See the most polluted cities in the United States ranked by Air Quality as well as how to built that app in React 18
---



# Check Out the Final Running React 18 App

You can browse to the final running URL here:  

[![Most Polluted Cities in Unites States](https://airquality.peterkellner.net/images/airquality-350x220.png)](https://airquality.peterkellner.net/)

[https://airquality.peterkellner.net/](https://airquality.peterkellner.net/)


And, to see the source code for the React 18 app here:

[https://github.com/pkellner/airquality](https://github.com/pkellner/airquality)

# Observations (in no order)

<br/>

## You Are Possibly Generating a Lot of Bandwidth For Your Customers (browsers) Though Not Hurting Time To First Byte

Say you have a page that lists 100 product links.  As soon as your customer's browser hits that page, the static content of that page is immediately downloaded.  This is good.
However, at the same time, your browser is also requesting all the props associated with every link on your page.  For a page I'm working on that each link goes to a speaker detail page, the size of the
props in total for each speaker is about 25K.  200 speakers, that's .5 Megabytes. If my customer views this on a mobile phone, that could add up fast when all they really wanted was a few bytes.


## How 404s are Generated


When you return from `getStaticProps` `notfound: true, then the first time this page is rendered, a status 304 (redirect) is returned. NextJS then,
somehow updates the code on the server (I've not figured out how) so that the next time this page is hit you get a 404 (file not found).  You can
verify this by browsing to a page that does not exist with JavaScript disabled.  Refresh over and over and you will continually get a 304.  Turn JavaScript on,
then a few seconds after you first refresh, you'll start getting real 404's.  If you turn JavaScript off again, you'll still get a real 404.

Below is where you set `notFound`:

{% highlight javascript %}
export async function getStaticProps(context) {
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}
  {% endhighlight %}

## If You Disable JavaScript On Client Browser, No Regen Occurs on Server

It seems that what is triggering the regen of the page is the client's browser and not anything on the server.  That makes sense since
there may be just a CDN or static server, there is no way for that server to let your actual node server regenerate a new page. Seems obvious now but
only after I observed the behavior.

An aside note, is the user has browser script disabled, then no regen event will occur.  This is important, because if you are thinking of creating
a scheduled job (like a cron job) to hit your pages forcing them to re-render, this will not work since your cron job is not loading and running the JavaScript.
You'll need to do a jest like thing to simulate a real browser loading and running javascript.


# If you want to learn more about ISR, Check Out This Video

[Incremental Static Regeneration by Bruno Antunes](https://youtu.be/yGuN_9rng6o)
