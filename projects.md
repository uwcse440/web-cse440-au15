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
  - name: TagLine
    path: tagline
  - name: Timeout
    path: timeout
  - name: Zonect
    path: zonect
   
---

<html>
<div class="row">
<div class="col-md-9" markdown="block">
# Project Theme

Projects explored challenges and opportunities in self-tracking, also known as Personal Informatics:

> Personal informatics systems are systems that help people collect personally relevant information for the purpose of 
> self-reflection and gaining self-knowledge.
>
> [Li _et al._, 2010]({{ site.baseurl }}/readings/PersonalInformatics-Li2010.pdf).

Personal informatics relates heavily to the [Quantified Self](http://quantifiedself.com/) movement, which emphasizes:

> Self-knowledge through numbers.
>
> [Gary Wolf, 2009](http://archive.wired.com/medtech/health/magazine/17-07/lbnp_knowthyself)

People have long sought to better understand themselves, but recently technology advances are enabling fundamentally new approaches. 
Students have examined the problems people encounter, then explored how new technology can go beyond the data fetish to help people in reaching their goals. 
</div>
<div class="col-md-3" markdown="block">
<div class="panel panel-default" style="margin-top:20px;">
<div class="panel-heading" markdown="block">
## Poster Session
</div>
<div class="panel-body" markdown="block">
Please join us for a poster session celebrating the outstanding design work of CSE 440 students:

Wednesday, December 16

11:00 am
  
[CSE Atrium](http://www.washington.edu/maps/#!/cse)
</div>
</div>
</div>
</div>
</html>

# Project Websites

{% assign projects_rows = page.projects | size | divided_by: 4 %}

<html>
  <div class="row">
    <div class="col-md-9">
    {% for item_project in page.projects %}
      <div class="col-sm-3 col-xs-6">        
        <p>
          <a href="{{ site.baseurl }}/projects/{{ item_project.path }}/" target="_blank">
            {{ item_project.name }}
          </a>
        </p>
        <div class="thumbnailBox">
          <a href="{{ site.baseurl }}/projects/{{ item_project.path }}/" target="_blank">
            <img src="{{ site.baseurl }}/projects/{{ item_project.path }}/project_thumb.png" width="150" class="projectThumbnail" alt="{{ item_project.name }}"/>
          </a>
        </div>
        {% assign row_current = forloop.index | minus: 1 | divided_by: 4 | plus: 1 %}
        {% unless row_current == projects_rows %}
          <p>&nbsp;</p>
        {% endunless %}
      </div>
    {% endfor %}
    </div>
  </div>
</html>
