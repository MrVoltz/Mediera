var topBar = angular.module('topBar', []);

Mediera.addLayerCtrl(topBar, function() {});

topBar.directive("time", ["$interval", function($interval) {
	return {
		template: "{{ time }}",
		link: function(scope, element, attrs) {
			function tick() {
				scope.time = moment().locale("cs").format("HH:mm");
			}

			$interval(tick, 1000);
			tick();
		}
	};
}]);

topBar.directive("date", ["$interval", function($interval) {
	return {
		template: "{{ date }}",
		link: function(scope, element, attrs) {
			function tick() {
				scope.date = moment().locale("cs").format("dd, D. MMMM");
			}

			$interval(tick, 1000);
			tick();
		}
	};
}]);

M.Layers.TopBar = {
	setTitle: function(title) {
		var $scope = M.RouterUtils.getLayerScope("top-bar");
		$scope.title = title;
	},
	setNowPlaying: function(nowPlaying) {
		var $scope = M.RouterUtils.getLayerScope("top-bar");
		$scope.nowPlaying = nowPlaying;
	}
};