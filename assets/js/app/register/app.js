BackboneAuth.module("RegisterApp", function(Register, BackboneAuth, Backbone, Marionette, $, _) {
	Register.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"register": "showRegister"
		}
	});

	var API = {
		showRegister: function() {
			Register.Show.Controller.showRegister();
			BackboneAuth.execute("set:active:header", "register");
		}
	};

	BackboneAuth.on("register:show", function() {
		BackboneAuth.navigate("register");
		API.showRegister();
	});

	Register.on("start", function() {
		new Register.Router({
			controller: API
		});
	});
});