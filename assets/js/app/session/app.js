BackboneAuth.module("SessionApp", function(SessionApp, BackboneAuth, Backbone, Marionette, $, _) {
	SessionApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"logout": "logout"
		}
	});

	var sessionChannel = Backbone.Radio.channel("session");

	var API = {
		logout: function() {
			SessionApp.Controller.EndSession();
			BackboneAuth.trigger("login:show", "You have been logged out");
		},

		login: function(model) {
			console.log("Session API: attempting login");
			console.log(model);
			SessionApp.Controller.NewSession(model);
		},

		handleSessionError: function() {
			SessionApp.Controller.EndSession();
			BackboneAuth.trigger("login:show", "You need to be logged in to view this page");
		}
	};

	sessionChannel.on("session:login", API.login);
	sessionChannel.on("session:logout", API.logout);
	sessionChannel.on("session:error", API.handleSessionError);

	SessionApp.on("start", function() {
		new SessionApp.Router({
			controller: API
		});

		SessionApp.Controller.InitialiseSession();
	});
});