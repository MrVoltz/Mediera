var medieraApp = angular.module('medieraApp', [
  'ngRoute',

  'mainMenu',
  'topBar',
  'player',
  'movieView'
]);

medieraApp.config(function() {
	document.title = "Mediera";
});

medieraApp.directive("body", ["$window", function($window) {
	return {
		restrict: "E",
		controller: "BaseCtrl",
		link: function(scope, element, attrs) {

			/* keyboard controls, TODO: move to another file and prepare for another input methods */
			angular.element($window).on("keyup", function(e) {
				var $activeScope = angular.element("." + scope.activeLayer).scope();

				switch(e.which) {
					case 37:
						e.preventDefault();
						$activeScope.$broadcast("control", "left");
						break;
					case 39:
						e.preventDefault();
						$activeScope.$broadcast("control", "right");
						break;
					case 38:
						e.preventDefault();
						$activeScope.$broadcast("control", "up");
						break;
					case 40:
						e.preventDefault();
						$activeScope.$broadcast("control", "down");
						break;
					case 13:
						e.preventDefault();
						$activeScope.$broadcast("control", "enter");
						break;
				}
			});

		}
	};
}]);

medieraApp.controller("BaseCtrl",  ['$scope', '$window', function($scope, $window) {
	$scope.activeLayer = "main-menu";	
}]);

medieraApp.directive("layer", ["$window", function($window) {
	return {
		restrict: "C",
		scope: true,
		priority: 1000
	};
}]);