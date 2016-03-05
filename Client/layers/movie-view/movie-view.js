var movieView = angular.module('movieView', []);

M.addLayerCtrl(movieView, function($scope) {
	$scope.menuItems = [
		{
			text: "Přehrát",
			urlSlug: "play"
		},
		{
			text: "Stáhnout",
			urlSlug: "download"
		}
	];

	$scope.setMenuItem = function(item) {
		$scope.activeMenuItem = item;
	};

	$scope.$on("control", function(e, key) {
		var itemIndex = $scope.menuItems.indexOf($scope.activeMenuItem),
			newIndex;

		switch(key) {
			case "left":
				newIndex = itemIndex - 1;
				if(newIndex < 0)
					break;
				
				$scope.setMenuItem($scope.menuItems[newIndex]);
				$scope.$apply();
				break;
			case "right":
				newIndex = itemIndex + 1;
				if(newIndex === $scope.menuItems.length)
					break;

				$scope.setMenuItem($scope.menuItems[newIndex]);
				$scope.$apply();
				break;
			case "enter":
				$scope.handleClick($scope.activeMenuItem);
				break;
		}
	});

	Mediera.Layers.TopBar.setTitle("Informace o filmu");
	$scope.setMenuItem($scope.menuItems[0]);

	$scope.handleClick = function(item) {
		Mediera.activateLayers([ "player", "movie-view", "source-selector", "top-bar" ], "source-selector");
	};	
});

movieView.directive("movie-view-modal", function() {
	return function(scope, element, attrs) {
		element.find(".poster").one("load", function() {
			element.find(".rating").width($layer.find(".poster").outerWidth());
			element.find(".menu").width($layer.find(".container").outerWidth());
		});
	};
});