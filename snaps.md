---
layout: page
nav: Life
title: Snaps and splats gallery
---

<div class="posts">
  {% for post in site.categories.snaps %}
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
  {% endfor %}
</div>