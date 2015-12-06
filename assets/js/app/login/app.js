BackboneAuth.module("LoginApp", function(Login, BackboneAuth, Backbone, Marionette, $, _) { 
	Login.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"login": "showLogin"
		}
	});

	var API = {
		showLogin: function(context) {
			console.log("show login");
			Login.Show.Controller.showLogin(context);
			BackboneAuth.execute("set:active:header", "login");
		}
	};

	BackboneAuth.on("login:show", function(context) {
		BackboneAuth.navigate("login");
		console.log(context);
		API.showLogin(context);
	});

	Login.on("start", function() {
		new Login.Router({
			controller: API
		});
	});
});