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
					},

					error: function(model, response, options) {
						console.log("login is bad");
						switch(response.status) {
							case 401:
								loginFormView.options.alert = response.responseJSON.message;
								loginFormView.render();
								break;
						}
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