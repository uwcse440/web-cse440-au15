/*
 * Janet Gao
 * Last updated: December 14, 2015
 */

"use strict";

(function() {
	window.onload = function() {
		var menu_navigation = document.getElementById("menu_navigation");
		menu_navigation.onmouseover = toggleMenuOn;
		menu_navigation.onmouseout = toggleMenuOff;

		var menu_button = document.getElementById("menu_button");
		menu_button.onclick = handleMobileMenu;
	};
	
	window.onscroll = function() {
		var navbar = document.getElementById("navbar");
		var menu = document.getElementById("menu_links");
		
		var offset;
		if (navigator.userAgent.indexOf("Firefox") != -1) {
			offset = document.documentElement.scrollTop;
		} else {
			offset = document.body.scrollTop;
		}
		if (offset >= 300) {
			navbar.style.background = "rgba(0,0,0,.9)";
			menu.style.background = "rgba(0,0,0,.9)";
		} else {
			navbar.style.background = "rgba(0,0,0,0)";
			menu.style.background = "rgba(0,0,0,.7)";
		}
	};
	
	function handleMobileMenu() {
		var menu = document.getElementById("menu_links");
		var menu_display = menu.style.display;
		if (menu_display == "block") {
			toggleMenuOff();
		} else {
			toggleMenuOn();
		}
	}
	
	function toggleMenuOn() {
		var menu = document.getElementById("menu_links");
		menu.style.display = "block";
		var menu_button = document.getElementById("menu_button");
		menu_button.src = "menu_hover_button.png"
	}
	
	function toggleMenuOff() {
		var menu = document.getElementById("menu_links");
		menu.style.display = "none";
		var menu_button = document.getElementById("menu_button");
		menu_button.src = "menu_button.png"
	}
})();