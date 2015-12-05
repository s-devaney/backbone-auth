BackboneAuth.module("LoginApp.Entity", function(Entity, BackboneAuth, Backbone, Marionette, $, _) {
	Entity.UserCredentials = Backbone.Model.extend({
		urlRoot: "auth/login",

		defaults: {
			username: "",
			password: ""
		}
	});
});