var app = angular.module('mediera', [
	"mediera.router",
	"ui.router",

	'medieraServices',

	'mainMenu',
	'topBar',
	'player',
	'movieView',
	'sourceSelector'
]);

app.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

	Mediera.init($rootScope);
});

app.directive("layer", function($window) {
	return {
		restrict: "C",
		link: function(scope, element, attrs) {
			scope.layerName = attrs.class.split(" ")[1];
			scope.layerUrl = "layers/" + scope.layerName + "/" + scope.layerName + ".html";

			var viewName = M.StringUtils.getLayerView(scope.layerName);
			scope.$on("$viewContentLoaded", function() {
				console.log("$viewContentLoaded " + scope.layerName);
				var active = _.keys(scope.$state.current.views).indexOf(viewName) !== -1;

				element.toggleClass("active", active);
			});
		}
	};
});