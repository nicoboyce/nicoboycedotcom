---
layout: page
nav: Essays
title: Essays
---

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories.size == 0 %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <span class="post-date">{{ post.date | date_to_string }}</span>

    {{ post.excerpt }}
    {% if post.content != post.excerpt %}<a href="{{ post.url }}">Read more!</a>{% endif %}<br /><br />
    <img src="/public/img/delta.svg" width="36" height="36">
  </div>
    {% endif %}
  {% endfor %}
</div>
