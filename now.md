---
layout: page
nav: now
title: What's happening now?
---

# What's happening now?

*What is this about? This is a now page as defined [here](https://nownownow.com/about) which exists to explain what I'm up to lately. If you are reading this and have your own now page I'd be interested to see how you do it!*

{% assign now_posts = site.now | sort: 'date' | reverse %}
{% for month in now_posts limit:6 %}

***

## {{ month.title }}

{{ month.content }}

{% endfor %}