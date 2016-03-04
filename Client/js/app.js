var medieraApp = angular.module('medieraApp', [
  'mainMenu',
  'topBar',
  'player',
  'movieView'
]);

medieraApp.controller("BaseCtrl",  ['$scope', Mediera.init.bind(Mediera)]);
medieraApp.directive("body", function() {
	return {
		restrict: "E",
		controller: "BaseCtrl"
	};
});

medieraApp.directive("layer", ["$window", function($window) {
	return {
		restrict: "C",
		scope: true,
		priority: 1000,
		link: function(scope, element, attrs) {
			scope.layerName = attrs.class.split(" ")[1];
			scope.layerUrl = "layers/" + scope.layerName + "/" + scope.layerName + ".html";

			scope.$watch("activeLayers", function() {
				if(scope.activeLayers.indexOf(scope.layerName) !== -1)
					angular.element(element).addClass("active");
				else
					angular.element(element).removeClass("active");
			});
		},
		template: '<div ng-include="layerUrl"></div>'
	};
}]);