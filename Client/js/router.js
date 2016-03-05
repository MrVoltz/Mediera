var router = angular.module("mediera.router", [
	"ui.router",
	"mediera.utils"
]);

router.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/menu"); // redirect invalid urls to /

	console.log(M.RouterUtils.buildLayers([ "player", "main-menu", "top-bar" ]));

	$stateProvider
		.state("menu", {
			url: "/menu",

			views: M.RouterUtils.buildLayers([ "player", "main-menu", "top-bar" ]),
			controlLayer: "main-menu"
		})

		.state("movie", {
			url: "/movie",

			views: M.RouterUtils.buildLayers([ "player", "movie-view", "top-bar" ]),
			controlLayer: "movie-view"
		});
});