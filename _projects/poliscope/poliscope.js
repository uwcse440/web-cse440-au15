/*
 * Janet Gao
 * Last updated: December 4, 2015
 */

"use strict";

(function() {
	window.onload = function() {
		var menu_navigation = document.getElementById("menu_navigation");
		menu_navigation.onmouseover = toggleMenuOn;
		menu_navigation.onmouseout = toggleMenuOff;
		
		checkResolution();
	};
	
	// issue with below is if you start from a smaller window size and try to resize, you keep getting the popup
	//		and are unable to resize the window
	// window.onresize = checkResolution;
	
	window.onscroll = function() {
		var navbar = document.getElementById("navbar");
		var menu = document.getElementById("menu_links");
		if (document.body.scrollTop >= 300) {
			navbar.style.background = "rgba(0,0,0,.9)";
			menu.style.background = "rgba(0,0,0,.9)";
		} else {
			navbar.style.background = "rgba(0,0,0,0)";
			menu.style.background = "rgba(0,0,0,.7)";
		}
	};
	
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
	
	function checkResolution() {
		if (window.innerWidth <= 331) {
			alert("Your browser window is too narrow for the Poliscope site. Some elements may appear cut off or out of place.")
		}
	}
})();