---
layout: page
nav: Essays
title: Essays
---

<div class="posts">
  {% assign essay_categories = "business,culture,philosophy,music,design,personal,meta,saas,history,criticism,theory,release,opinion,motorsport" | split: "," %}
  {% assign essay_posts = site.posts | where_exp: "post", "essay_categories contains post.categories[0]" %}
  {% for post in essay_posts %}
  <div class="post">
    <h1 class="post-title">
      <a href="{{ post.url }}">
        {{ post.title }}
      </a>
    </h1>

    <span class="post-date">{{ post.date | date_to_string }}</span>

    {{ post.excerpt }}
    {% if post.content != post.excerpt %}<a href="{{ post.url }}">Read more!</a>{% endif %}<br /><br />
    <img src="/public/img/delta.png" width="36" height="36">
  </div>
  {% endfor %}
</div>
