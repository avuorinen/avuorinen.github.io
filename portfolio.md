---
layout: page
title: My Portfolio
permalink: /portfolio/
---

{% for project in site.data.projects.projects %}

### {{project.name}}

{% if project.image && project.image != "" %}
  <img src="{{ project.image }}" class="icon">
{% endif %}

<strong> Role </strong>{{ project.role }}

{% if project.type %}

<strong> Type </strong>{{ project.type }}

{% endif %}

{% if project.info %}

#### Information  
---

  {{ project.info }}

---

{% endif %}


{% if project.links %}
#### Links

  {% for link in project.links %}

  <a href="{{ link.link }}">{{ link.name }}</a>

  {% endfor %}

{% endif %}


{% endfor %}
