var sourceSelector = angular.module("sourceSelector", []);

Mediera.addLayerCtrl(sourceSelector, function($scope, $timeout) {
	$scope.showLoading = true;
	$scope.showModal = false;

	$scope.sources = [
		{
			fileName: "Vykoupeni z veznice Shawshank (1994) 720p.BrRip.x264.CZ-EN.tit.EN-CZ",
			lang: [ "cz", "en" ],
			subtitles: [ "cz", "en" ],
			width: 1280,
			height: 720,
			bitrate: 2771
		}, {
			fileName: "Vykoupeni z veznice Shawshank 1994-BRRIP-CZ dabing.avi",
			lang: [ "cz" ],
			subtitles: [],
			width: 720,
			height: 384,
			bitrate: 1445
		}
	];

	$scope.$on("layerActive", function() {
		$timeout(function() {
			$scope.showLoading = false;
			$scope.showModal = true;
			$scope.$apply();
		}, 2500);
	});	
});

sourceSelector.filter("sourceQuality", function() {
	return function(source) {
		var quality = 0;

		if(source.width >= 1920 && source.height >= 1080)
			quality += 2;
		else if(source.width >= 1280 && source.height >= 720)
			quality += 1;
		else
			quality += 0;

		if(source.bitrate >= 5000)
			quality += 2;
		else if(source.bitrate >= 1500)
			quality += 1;
		else
			quality += 0;

		if(quality >= 3)
			return "Vysoká";
		else if(quality >= 2)
			return "Střední";
		else
			return "Nízká";
	};
});

sourceSelector.filter("lang", function() {
	return function(input) {
		return input.join(", ").toUpperCase();
	};
});