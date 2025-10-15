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

{% assign month_posts = "" | split: "" %}{% for post in site.posts %}{% assign post_month = post.date | date: "%Y-%m" %}{% if post_month == month.month %}{% assign month_posts = month_posts | push: post %}{% endif %}{% endfor %}{% if month_posts.size > 0 %}*Newly published:* {% for post in month_posts %}[{{ post.title }}]({{ post.url }}){% unless forloop.last %} — {% endunless %}{% endfor %}{% endif %}

{% endfor %}