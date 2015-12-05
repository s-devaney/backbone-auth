BackboneAuth.module("SessionApp.Controller", function(Controller, BackboneAuth, Backbone, Marionette, $, _) {
	Controller.NewSession = function(model) {
		console.log("Session login controller: attempting to initialize new session");
		console.log(model);
	};

	Controller.EndSession = function() {

	};
});