var medieraServices = angular.module("medieraServices", []);

medieraServices.factory("nameConverter", function() {
	return {
		getControllerName: function(layerName) {
			return layerName.replace(/([\:\-\_]+(.))/g, function(_, separator, letter) {
				return letter.toUpperCase();
			}) + "Ctrl";
		}
	};
});

medieraServices.factory("controllerChecker", ['$controller', function($controller) {
	return {
		exists: function(controllerName) {
			if(typeof window[controllerName] == 'function') {
				return true;
			}
			try {
				$controller(controllerName);
				return true;
			} catch (error) {
				return !(error instanceof TypeError);
			}
		}
	};
}]);