BackboneAuth.module("HeaderApp", function(Header, BackboneAuth, Marionette, Backbone, $, _) {
	// application public interface
	var API = {
		listHeader: function() {
			console.log("HeaderApp API: triggering listHeader");
			Header.List.Controller.listHeader();
		}
	};

	BackboneAuth.commands.setHandler("set:active:header", function(name) {
		BackboneAuth.HeaderApp.List.Controller.setActiveHeader(name);
	});

	Header.on("start", function() {
		console.log("header started");
		API.listHeader();
	})
});