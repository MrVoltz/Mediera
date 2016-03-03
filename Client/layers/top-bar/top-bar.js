var topBar = angular.module('topBar', []);

topBar.directive("topBar", function() {
	return {
		restrict: "C",
		templateUrl: "layers/top-bar/top-bar.html"
	};
});

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