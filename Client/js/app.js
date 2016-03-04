var medieraApp = angular.module('medieraApp', [
  'ngRoute',

  'mainMenu',
  'topBar',
  'player',
  'movieView'
]);

var $baseScope;

medieraApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when("/movie",{template:function() {
			$baseScope.activeLayers = [ "player", "movie-view", "top-bar" ];
			$baseScope.controlLayer = "movie-view";
			$baseScope.title = "Informace o filmu";
		}})
		.otherwise({template: function() {
			$baseScope.activeLayers = [ "player", "main-menu", "top-bar" ];
			$baseScope.controlLayer = "main-menu";
			$baseScope.title = "Hlavní menu";
		}});
}]);

medieraApp.controller("BaseCtrl",  ['$scope', '$window', function($scope, $window) {
	$scope.controlLayer = "main-menu";
	$scope.activeLayers = [];
	$scope.title = "";

	$baseScope = $scope;
}]);

medieraApp.directive("body", ["$window", "$document", function($window, $document) {
	return {
		restrict: "E",
		controller: "BaseCtrl",
		link: function(scope, element, attrs) {
			$document.title = "Mediera";

			/* keyboard controls, TODO: move to another file and prepare for another input methods */
			angular.element($window).on("keyup", function(e) {
				var $activeScope = angular.element("." + scope.controlLayer).scope();

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

medieraApp.directive("layer", ["$window", function($window) {
	return {
		restrict: "C",
		scope: true,
		priority: 1000,
		link: function(scope, element, attrs) {
			scope.layerName = angular.element(element).attr("class").split(" ")[1];

			scope.$watch("activeLayers", function() {
				if(scope.activeLayers.indexOf(scope.layerName) !== -1)
					angular.element(element).addClass("active");
				else
					angular.element(element).removeClass("active");
			});
		}
	};
}]);