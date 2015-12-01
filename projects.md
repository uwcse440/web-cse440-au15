---
layout: base/bar-sidebar-none
title: Projects

projects:
  - name: Balance
    path: balance
  - name: Ecotopia
    path: ecotopia
  - name: FoodPic
    path: foodpic
  - name: MiPhone
    path: miphone
  - name: Neat
    path: neat
  - name: Poliscope
    path: poliscope
  - name: SchoolView
    path: schoolview
  - name: Sitless
    path: sitless
  - name: SmartClothing
    path: smartclothing
  - name: Social Reconnection
    path: socialreconnection
  - name: TagLine
    path: tagline
  - name: Timeout
    path: timeout
   
---

# Project Theme

Projects are exploring challenges and opportunities in self-tracking, also known as Personal Informatics:

> Personal informatics systems are systems that help people collect personally relevant information for the purpose of 
> self-reflection and gaining self-knowledge.
>
> [Li _et al._, 2010]({{ site.baseurl }}/readings/PersonalInformatics-Li2010.pdf).

Personal informatics relates heavily to the [Quantified Self](http://quantifiedself.com/) movement, which emphasizes:

> Self-knowledge through numbers.
>
> [Gary Wolf, 2009](http://archive.wired.com/medtech/health/magazine/17-07/lbnp_knowthyself)

People have long sought to better understand themselves, but recently technology advances are enabling fundamentally new approaches. 
Students will examine the problems people encounter, then explore how new technology can go beyond the data fetish to help people in reaching their goals. 

# Project Websites

{% assign projects_rows = page.projects | size | divided_by: 4 %}

<html>
  <div class="row">
    {% for item_project in page.projects %}
      <div class="col-md-3">        
        <div class="thumbnailBox">
          <a href="{{ site.baseurl }}/projects/{{ item_project.path }}/">
            <img src="{{ site.baseurl }}/projects/{{ item_project.path }}/project_thumb.png" width="150" class="projectThumbnail" alt="{{ item_project.name }}"/>
          </a>
        </div>
        <p>
          <a href="{{ site.baseurl }}/projects/{{ item_project.path }}/">
            {{ item_project.name }}
          </a>
        </p>
        {% assign row_current = forloop.index | minus: 1 | divided_by: 4 | plus: 1 %}
        {% unless row_current == projects_rows %}
          <p>&nbsp;</p>
        {% endunless %}
      </div>
    {% endfor %}
  </div>
</html>
