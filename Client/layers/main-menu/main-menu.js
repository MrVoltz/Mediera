var mainMenu = angular.module('mainMenu', []);

mainMenu.directive("mainMenu", function() {
	return {
		restrict: "C",
		templateUrl: "layers/main-menu/main-menu.html",
		controller: "MainMenuCtrl"
	};
});

mainMenu.controller('MainMenuCtrl', ['$scope', function($scope) {
	$scope.menuItems = [
		{
			text: "Knihovna",
			urlSlug: "knihovna",
			subMenu: [
				{
					text: "Dle názvu",
					urlSlug: "dle-nazvu"
				}, {
					text: "Hledat",
					urlSlug: "hledat"
				}
			]
		}, {
			text: "Aplikace",
			urlSlug: "aplikace",
			subMenu: null
		}, {
			text: "Nastavení",
			urlSlug: "nastaveni",
			subMenu: null
		}
	];

	$scope.activeMenuItem = $scope.menuItems[0];
	$scope.activeSubItem = $scope.activeMenuItem.subMenu ? $scope.activeMenuItem.subMenu[0] : null;

	$scope.setMenuItem = function(item, subItem) {
		if(item)
			$scope.activeMenuItem = item;
		$scope.activeSubItem = subItem || ($scope.activeMenuItem.subMenu ? $scope.activeMenuItem.subMenu[0] : null);
	};

	$scope.$on("control", function(e, key) {
		var itemIndex = $scope.menuItems.indexOf($scope.activeMenuItem),
			newIndex, subItemIndex;

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
		}
	});
}]);

mainMenu.directive("menuBarSlider", ["$timeout", "$window", function($timeout, $window) {
	return function(scope, element, attr) {
		var $bar = angular.element(element),
			$ul = angular.element("ul.menu", $bar),
			$hr = angular.element("hr", $bar);

		function refresh() {
			var $active = $ul.find("> li.next-active");

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
				});
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