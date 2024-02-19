---
status: publish
published: true
pubDatetime: 2014-05-06T20:00:00.000Z
title: Commands (CLI) to remember for Azure, NodeJS and MongoDb
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3981
wordpress_url: https://peterkellner.net/?p=3981
date: '2014-05-06 08:08:19 -0700'
date_gmt: '2014-05-06 15:08:19 -0700'
categories:
- Azure
- NodeJS
- MongoDB
tags: []
---
<p>Having just started using <a href="http://azure.microsoft.com/en-us/documentation/articles/xplat-cli/" target="_blank">Azure</a> Web Sites with <a href="http://nodejs.org/" target="_blank">NodeJS</a> and <a href="http://www.mongodb.com/" target="_blank">MongoDB</a> I thought I’d blog several of the commands I use often (mostly for me to go back to).&#160; Here is my short list</p>
<h2>NodeJS</h2>
<ul>
<li>node server.js – starts node</li>
<li>node –debug server.js – starts node and enables debugging (needs npm install –g node-inspector)</li>
<li>npm install – installs all node packages in project</li>
</ul>
<h2>MongoDb</h2>
<ul>
<li>mongod – starts mongo daemon</li>
<li>mongostat – shows stats while mongodb running</li>
<li>mongotop – shows top mongo processes</li>
</ul>
<h2>Windows Azure CLI</h2>
<ul>
<li>npm install azure – so you can use azure command line (cli)</li>
<li>npm install azure-cli –g</li>
<li>azure site create mywebsite</li>
<li>azure site list</li>
<li>azure site start mywebsite</li>
<li>azure site delete mywebsite</li>
<li>azure site log tail mywebsite</li>
</ul>
