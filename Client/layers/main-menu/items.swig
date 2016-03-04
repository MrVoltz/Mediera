{% for item in items %}
	<li class="menu-item{{ iif(activeItem === item, ' active') }}"><a href="#/{{ item.urlSlug }}">{{ item.text }}</a>
	{% if item.subItems %}<ul class="sub-menu">
		{% for subItem in item.subItems | reverse %}
			<li class="sub-menu-item{{ iif(activeItem === item && activeSubItem === subItem, ' active') }}"><a href="#/{{ item.urlSlug }}/{{ subItem.urlSlug }}">{{ subItem.text }}</a></li>
		{% endfor %}
	</ul>{% endif %}
{% endfor %}