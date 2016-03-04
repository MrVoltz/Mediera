var Mediera = {};

Mediera.KeyboardAdapter = {
	_keyMap: {
		37: "left",
		39: "right",
		38: "up",
		40: "down",
		13: "enter"
	},

	init: function() {
		var _keyMap = this._keyMap;

		$(window).on("keyup", function(e) {
			if(_keyMap[e.which]) {
				e.preventDefault();
				Mediera.InputManager.sendControlEvent(_keyMap[e.which]);
			}
		});
	}
};

Mediera.Routes = {
	"movie": {
		layers: [ "player", "movie-view", "top-bar" ],
		controlLayer: "movie-view",
		title: "Informace o filmu"
	},

	"index": {
		layers: [ "player", "main-menu", "top-bar" ],
		controlLayer: "main-menu",
		title: "Hlavní menu"
	}
};

Mediera.InputManager = {};
Mediera.InputManager.sendControlEvent = function(id) {
	Mediera.getControlScope().$broadcast("control", id);
};

Mediera.Router = {
	routeTo: function(id, args, qs) {
		if(!Mediera.Routes[id])
			id = "index";

		var route = Mediera.Routes[id],
			$scope = Mediera.$scope;

		$scope.activeLayers = route.layers;
		$scope.controlLayer = route.controlLayer;
		$scope.title = _.isFunction(route.title) ? route.title() : route.title;
	},

	route: function(hash) {
		if(hash.charAt(0) === "#")
			hash = hash.substring(1);
		if(hash.charAt(0) === "/")
			hash = hash.substring(1);

		var parts = hash.split("?"),
			qs = parts[1] ? parts[1] : "";
		parts = parts[0].trim().split("/");

		this.routeTo(parts[0], parts.slice(1), qs.split("&").map(function(a) {
			return a.split("=");
		}));
	},

	init: function() {
		$(window).on("hashchange", function() {
			Mediera.Router.route(location.hash);
		});
		Mediera.Router.route(location.hash);
	}
};

Mediera.getControlScope = function() {
	return angular.element(".layer." + this.$scope.controlLayer).scope();
};

Mediera.init = function($scope) {
	this.$scope = $scope;

	console.info("Initializing...");

	this.$scope.controlLayer = "main-menu";
	this.$scope.activeLayers = [ "player", "main-menu", "top-bar" ];
	this.$scope.title = "";

	document.title = "Mediera";

	Mediera.KeyboardAdapter.init();
	Mediera.Router.init();
};