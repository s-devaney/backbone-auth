BackboneAuth.module("LoginApp.Entity", function(Entity, BackboneAuth, Backbone, Marionette, $, _) {
	Entity.UserCredentials = Backbone.Model.extend({
		urlRoot: "login",

		defaults: {
			username: "",
			password: ""
		}
	});
});