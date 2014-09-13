---
layout: page
title: My Portfolio
permalink: /portfolio/
---

Projects:
{% for project in site.data.projects.projects %}

## {{project.name}}


  {% if project.image && project.image != "" %}
  <img src="{{ project.image }}" class="icon">
  {% endif %}
  
  {% if project.links %}
### Links
  
  {% for link in project.links %}
  
  <a href="{{ link.link }}">{{ link.name }}</a>
  
  {% endfor %}
  {% endif %}
  

{% endfor %}

