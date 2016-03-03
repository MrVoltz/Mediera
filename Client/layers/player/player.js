var player = angular.module('player', []);

player.directive("player", function() {
	return {
		restrict: "C",
		templateUrl: "layers/player/player.html"
	};
});