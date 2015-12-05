BackboneAuth.module("RegisterApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Controller = {
		showRegister: function() {
			var sessionChannel = Backbone.Radio.channel("session");
			var userCredentials = new BackboneAuth.RegisterApp.Entity.UserCredentials();
			var registerFormView = new Show.Form();

			registerFormView.on("register:submit", function(data) {
				var result = userCredentials.save(data, {
					success: function(model, response, options) {
						console.log("reg is good");
						console.log(model);
						sessionChannel.trigger("session:login", model);
					}
				});

				if(!result) {
					console.log("reg go bad");
					registerFormView.triggerMethod("register:form:data:invalid", userCredentials.validationError);
				}
			});

			BackboneAuth.region_container.main.show(registerFormView);
		}
	}
});