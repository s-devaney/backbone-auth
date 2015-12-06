BackboneAuth.module("LoginApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Controller = {
		showLogin: function(context) {
			var sessionChannel = Backbone.Radio.channel("session");
			var userCredentials = new BackboneAuth.LoginApp.Entity.UserCredentials();
			console.log(context);
			var loginFormView = new Show.Form({alert: context});

			loginFormView.on("login:submit", function(data) {
				var result = userCredentials.save(data, {
					success: function(model, response, options) {
						console.log("login is good");
						//pass userCredential model, and defer, to session
						sessionChannel.trigger("session:login", model);
					}
				});

				if(!result) {
					console.log("login go bad");
					loginFormView.triggerMethod("login:form:data:invalid", userCredentials.validationError);
				}
			});

			console.log("show login..");
			BackboneAuth.region_container.main.show(loginFormView);
		}
	}
});