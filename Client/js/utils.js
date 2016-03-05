Mediera.StringUtils = {
	camelCase: function(str) {
		return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
			return group1.toUpperCase();
	    });
	},

	ucFirst: function(str) {
		if(str.length <= 1)
			return str.toUpperCase();

		return str.charAt(0).toUpperCase() + str.substring(1);
	},

	getLayerController: function(layerName) {
		return M.StringUtils.ucFirst(M.StringUtils.camelCase(layerName)) + "Ctrl";
	},

	getLayerView: function(layerName) {
		return M.StringUtils.camelCase(layerName) + "Layer";
	}
};

Mediera.RouterUtils = {
	controllerExists: function(controllerName) {
		if(typeof window[controllerName] === "function")
			return true;

		try {
			$controller(controllerName);
			return true;
		} catch (error) {
			return !(error instanceof TypeError);
		}
	},

	buildLayerState: function(layerName) {
		var controllerName = M.StringUtils.getLayerController(layerName);
		return { templateUrl: "layers/" + layerName + "/" + layerName + ".html", controller: controllerName };
	},

	buildLayers: function(layers) {
		var _layers = {};
		_.each(layers, function(layer) {
			_layers[M.StringUtils.getLayerView(layer)] = M.RouterUtils.buildLayerState(layer);
		});
		return _layers;
	},

	getLayerScope: function(layerName) {
		return angular.element(".layer." + layerName).scope();
	},

	getControlScope: function() {
		return M.RouterUtils.getLayerScope(M.$state.current.controlLayer);
	}
};

var utils = angular.module("mediera.utils", []);

utils.value("stringUtils", M.StringUtils);
utils.value("routerUtils", M.RouterUtils);