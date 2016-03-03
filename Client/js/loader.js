var Loader = {
	load: function(options) {
		var css = options.css || [],
			js = options.js || [];

		var layers = options.layers || [];
		for(let layer of layers) {
			let name = layer.split("/").pop();
			css.push(layer + "/" + name + ".css");
			js.push(layer + "/" + name + ".js");
		}

		for(let url of css) {
			document.write('<link rel="stylesheet" href="' + url + '" type="text/css">');
		}
		for(let url of js) {
			document.write('<script src="' + url + '" type="text/javascript"></script>');
		}
	}
};