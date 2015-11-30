BackboneAuth.module("LoginApp", function(Login, BackboneAuth, Marionette, Backbone, $, _) { 
	LoginApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"login": "showLogin"
		}
	});

	var API = {
		showLogin: function() {
			LoginApp.Show.Controller.showLogin();
			BackboneAuth.execute("set:active:header", "about");
		}
	};

	BackboneAuth.on("login:show", function() {
		BackboneAuth.navigate("login");
		API.showLogin();
	});

	LoginApp.on("start", function() {
		new LoginApp.Router({
			controller: API
		});
	});
});