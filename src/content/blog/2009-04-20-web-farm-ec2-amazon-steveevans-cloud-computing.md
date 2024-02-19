---
status: publish
published: true
pubDatetime: 2009-04-20T20:00:00.000Z
title: Load Balancing IIS Web Farm with EC2
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 295
wordpress_url: https://peterkellner.net/2009/04/20/web-farm-ec2-amazon-steveevans-cloud-computing/
date: '2009-04-20 21:08:36 -0700'
date_gmt: '2009-04-21 04:08:36 -0700'
categories:
- WebFarm
- SQL Server
- Cloud Computing
- Sql Server 2008
tags: []
---
<p>&#160;</p>
<p>We’ve been looking to find the best <a href="http://www.cloudcamp.com/">Cloud based host</a> to put our soon to be virally growing web site up on.&#160; Our requirements are it must run <a href="http://www.iis.net/">IIS7</a> and use <a href="http://www.microsoft.com/sqlserver/2008/en/us/default.aspx">Sql Server 2008</a> as it’s database. We have lots of wants (like Service Broker, Replication, etc.) but primarily we want the web tier to scale easily.&#160; After doing research and testing, we got frustrated with our options at <a href="http://aws.amazon.com/ec2/">Amazon’s EC2</a>.&#160; We emailed their support (with our paid support contract) and were basically told we should go do our own Windows research to find out what works best.</p>
<p>At any rate, I emailed Steve Evan’s who is a frequent speaker at conferences and also an expert consultant on all things Windows and IT related and asked for some advice.&#160; He told me that he had been asked that question often recently by others so he would do some research and get back to me.&#160; He did one step better.&#160; He wrote a blog post describing the ups and downs of the different cloud providers including Amazon’s EC2.&#160; I respect Steve’s opinion a lot and rather than try and paraphrase it, I’ll just link to his post.</p>
<p>Here it is:&#160; <a title="http://serktools.com/2009/04/20/load-balancing-iis-web-farm-on-amazon-ec2/" href="http://serktools.com/2009/04/20/load-balancing-iis-web-farm-on-amazon-ec2/">http://serktools.com/2009/04/20/load-balancing-iis-web-farm-on-amazon-ec2/</a></p>
<p>Good luck and feel free to post comments here if you’ve got opinions on Cloud Hosting of IIS and Sql Server 2008.</p>
