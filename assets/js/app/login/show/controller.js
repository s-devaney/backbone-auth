BackboneAuth.module("LoginApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Controller = {
		showLogin: function() {
			var userCredentials = new BackboneAuth.LoginApp.Entity.UserCredentials();
			var loginFormView = new Show.Form();

			loginFormView.on("login:submit", function(data) {
				var result = userCredentials.save(data, {
					success: function() {
						console.log("login is good");
						//pass userCredential model, and defer, to session
					}
				});

				if(!result) {
					console.log("login go bad");
					loginFormView.triggerMethod("login:form:data:invalid", userCredentials.validationError);
				}
			});

			BackboneAuth.region_container.main.show(loginFormView);
		}
	}
});