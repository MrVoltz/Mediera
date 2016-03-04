var movieView = angular.module('movieView', []);

movieView.directive("movieView", function() {
	return {
		restrict: "C",
		controller: "MovieViewCtrl",
		link: function(scope, element, attrs) {
			var $layer = angular.element(element);

			$layer.find(".poster").one("load", function() {
				$layer.find(".rating").width($layer.find(".poster").outerWidth());
				$layer.find(".menu").width($layer.find(".container").outerWidth());
			});			
		}
	};
});

movieView.controller("MovieViewCtrl", ['$scope', function($scope) {
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

	$scope.activeMenuItem = $scope.menuItems[0];

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
		}
	});
}]);