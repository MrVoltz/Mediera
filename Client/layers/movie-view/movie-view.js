var movieView = angular.module('movieView', []);

movieView.directive("movieView", function() {
	return {
		restrict: "C",
		templateUrl: "layers/movie-view/movie-view.html",
		controller: "MovieViewCtrl"
	};
});

movieView.directive("movieViewModal", ["$timeout", function($timeout) {
	return function(scope, element, attrs) {
		
	};
}]);

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

	$scope.$on("keypress", function(e) {
		console.log("event received inside MovieViewCtrl");
	});
}]);