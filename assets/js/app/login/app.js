BackboneAuth.module("LoginApp", function(Login, BackboneAuth, Backbone, Marionette, $, _) { 
	Login.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"login": "showLogin"
		}
	});

	var API = {
		showLogin: function() {
			Login.Show.Controller.showLogin();
			BackboneAuth.execute("set:active:header", "login");
		}
	};

	BackboneAuth.on("login:show", function() {
		BackboneAuth.navigate("login");
		API.showLogin();
	});

	Login.on("start", function() {
		new Login.Router({
			controller: API
		});
	});
});