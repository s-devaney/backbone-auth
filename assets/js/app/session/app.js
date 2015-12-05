BackboneAuth.module("SessionApp", function(SessionApp, BackboneAuth, Backbone, Marionette, $, _) {
	SessionApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"logout": "logout"
		}
	});

	var sessionChannel = Backbone.Radio.channel("session");

	var API = {
		logout: function() {
			SessionApp.Logout.Controller.actionLogout();
		},

		login: function(model) {
			console.log("Session API: attempting login");
			console.log(model);
			SessionApp.Controller.NewSession(model);
		}
	};

	sessionChannel.on("session:login", API.login);

	SessionApp.on("start", function() {
		new SessionApp.Router({
			controller: API
		});
	});
});