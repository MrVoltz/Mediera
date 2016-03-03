var movieView = angular.module('movieView', []);

movieView.directive("movieView", function() {
	return {
		restrict: "C",
		templateUrl: "layers/movie-view/movie-view.html"
	};
});

// movieView.directive("movieViewModal", ["$timeout", function($timeout) {
// 	return function(scope, element, attrs) {
// 		$timeout(function() {
// 			var $ul = 	
// 		});
// 	};
// }]);