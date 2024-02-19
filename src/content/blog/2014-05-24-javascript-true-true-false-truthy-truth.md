---
status: publish
published: true
pubDatetime: 2014-05-24T20:00:00.000Z
title: In JavaScript, 'true' == true is false, truthy truth
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 4018
wordpress_url: https://peterkellner.net/?p=4018
date: '2014-05-24 09:56:06 -0700'
date_gmt: '2014-05-24 16:56:06 -0700'
categories:
- JavaScript
tags: []
---
<p>Somehow, I had thought that in JavaScript that if I said ‘true’ == true that a string conversion to bool would happen on the left side of the comparator and that the == instead of the truthy === would do a type conversion for me.</p>
<p>Apparently not.</p>
<p>So, for now on, all my JavaScript will look like this when I’m saving off a boolean that I collect in string form.</p>
<pre class="csharpcode"> var donationConfirmed = 
  $(<span class="str">'#RegisterUserInfoLoggedIn_DonationConfirmed'</span>).
      val().toLowerCase() === <span class="str">"true"</span>;</pre>
<p>Happy to hear why I’m wrong here but I don’t think I am.</p>
