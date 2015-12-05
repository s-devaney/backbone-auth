BackboneAuth.module("LoginApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Controller = {
		showLogin: function() {
			var loginFormView = new Show.Form();

			loginFormView.on("login:submit", function(data) {
				//process login
			});

			BackboneAuth.region_container.main.show(loginFormView);
		}
	}
});