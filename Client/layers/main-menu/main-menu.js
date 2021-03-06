var mainMenu = angular.module('mainMenu', []);

Mediera.addLayerCtrl(mainMenu, function($scope) {
	$scope.menuItems = [
		{
			text: "Knihovna",
			urlSlug: "library",
			subMenu: [
				{
					text: "Dle názvu",
					urlSlug: "by-name"
				}, {
					text: "Hledat",
					urlSlug: "search"
				}
			]
		}, {
			text: "Aplikace",
			urlSlug: "apps",
			subMenu: null
		}, {
			text: "Nastavení",
			urlSlug: "settings",
			subMenu: null
		}, {
			text: "Film",
			urlSlug: "movie",
			subMenu: null
		}
	];

	$scope.setMenuItem = function(item, subItem) {
		if(item)
			$scope.activeMenuItem = item;
		$scope.activeSubItem = subItem || ($scope.activeMenuItem.subMenu ? $scope.activeMenuItem.subMenu[0] : null);
	};

	$scope.$on("control", function(e, key) {
		var itemIndex = $scope.menuItems.indexOf($scope.activeMenuItem),
			newIndex, subItemIndex, newUrl;

		switch(key) {
			case "left":
				newIndex = itemIndex - 1;
				if(newIndex < 0)
					newIndex = $scope.menuItems.length - 1;
				
				$scope.setMenuItem($scope.menuItems[newIndex]);
				$scope.$apply();
				break;
			case "right":
				newIndex = itemIndex + 1;
				if(newIndex === $scope.menuItems.length)
					newIndex = 0;

				$scope.setMenuItem($scope.menuItems[newIndex]);
				$scope.$apply();
				break;
			case "up":
				if(!$scope.activeMenuItem.subMenu)
					break;

				subItemIndex = $scope.activeMenuItem.subMenu.indexOf($scope.activeSubItem);
				newIndex = subItemIndex + 1;
				if(newIndex === $scope.activeMenuItem.subMenu.length)
					newIndex = 0;

				$scope.setMenuItem(null, $scope.activeMenuItem.subMenu[newIndex]);
				$scope.$apply();
				break;
			case "down":
				if(!$scope.activeMenuItem.subMenu)
					break;

				subItemIndex = $scope.activeMenuItem.subMenu.indexOf($scope.activeSubItem);
				newIndex = subItemIndex - 1;
				if(newIndex < 0)
					newIndex = $scope.activeMenuItem.subMenu.length - 1;

				$scope.setMenuItem(null, $scope.activeMenuItem.subMenu[newIndex]);
				$scope.$apply();
				break;
			case "enter":
				if($scope.activeSubItem)
					$scope.activeSubItem.$el.click();
				else
					$scope.activeMenuItem.$el.click();
				break;
		}
	});

	Mediera.Layers.TopBar.setTitle("Hlavní menu");
	$scope.setMenuItem($scope.menuItems[0]);
});

mainMenu.directive("menuBarSlider", ["$timeout", "$window", function($timeout, $window) {
	return function(scope, element, attr) {
		var $bar = angular.element(element),
			$ul = angular.element("ul.menu", $bar),
			$hr = angular.element("hr", $bar);

		function refresh() {
			var $active = $ul.find("> li.next-active");

			if(!$active.length || !$active.is(":visible"))
				return;

			$ul.find("> li.before-active").removeClass("before-active");
			$ul.find("> li.active").removeClass("active");
			$ul.find("> li.after-active").removeClass("after-active");

			$active.prev().addClass("before-active");
			$active.addClass("active");
			$active.next().addClass("after-active");

			var width = $active.width();
			$hr.css("margin-left", -width/2);
			$hr.css("width", width);

			$ul.stop();

			$timeout(function() {
				var activeMargin = $active.outerWidth(true) - $active.width(),
					activeOffset = $active.offset().left - $ul.position().left - activeMargin / 2,
					activeWidth = $("a", $active).width(),
					windowWidth = angular.element($window).width();

				$ul.css("transform", "translateX(" + (windowWidth / 2 - activeWidth / 2 - activeOffset) + "px)");
				
				$timeout(function() {
					$bar.removeClass("no-transition");	
				}, 500);
			});
		}

		scope.$watch('activeMenuItem', function(newValue, oldValue) {
			$timeout(function() {
				refresh();
			});			
		});

		angular.element($window).on("resize", function() {
			refresh();
		});

		console.log("directive fired");
		refresh();
    };
}]);

mainMenu.directive("menuBarItem", [function() {
	return function(scope, element, attr) {
		scope.item.$el = element;
	};
}]);

mainMenu.directive("menuBarSubItem", [function() {
	return function(scope, element, attr) {
		scope.subItem.$el = element;
	};
}]);

mainMenu.filter("reverse", function() {
	return function(array) {
		return array.slice().reverse();
	};
});