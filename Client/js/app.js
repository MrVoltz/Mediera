var medieraApp = angular.module('medieraApp', [
  'ngRoute',

  'mainMenu',
  'topBar',
  'player',
  'movieView'
]);

medieraApp.config([function() {
	document.title = "Mediera";
}]);