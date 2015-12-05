BackboneAuth.module("HomeApp", function(Home, BackboneAuth, Backbone, Marionette, $, _) {
	Home.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"*path": "showHome"
		}
	});

	var API = {
		showHome: function() {
			Home.Show.Controller.showHome();
			BackboneAuth.execute("set:active:header", "");
		}
	};

	BackboneAuth.on("home:show", function() {
		BackboneAuth.navigate("");
		API.showHome();
	});

	Home.on("start", function() {
		new Home.Router({
			controller: API
		});
	});
});