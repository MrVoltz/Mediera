var Mediera = window.Mediera = window.M = {};

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
				M.InputManager.sendControlEvent(_keyMap[e.which]);
			}
		});
	}
};

Mediera.InputManager = {};
Mediera.InputManager.sendControlEvent = function(id) {
	M.RouterUtils.getControlScope().$broadcast("control", id);
};

Mediera.Layers = {};

Mediera.addLayerCtrl = function(module, ctrl) {
	function ucFirst(str) {
		return str.charAt(0).toUpperCase() + str.substring(1);
	}

	var ctrlName = ucFirst(module.name) + "Ctrl",
		dirName = module.name;

	module.controller(ctrlName, ctrl);
};

Mediera.init = function($scope) {
	this.$scope = $scope;
	this.$state = $scope.$state;
	this.$stateParams = $scope.$stateParams;

	console.info("Initializing...");

	M.KeyboardAdapter.init();

	this.$scope.title = "Mediera";
};