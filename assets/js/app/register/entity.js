BackboneAuth.module("RegisterApp.Entity", function(Entity, BackboneAuth, Backbone, Marionette, $, _) {
	Entity.UserCredentials = Backbone.Model.extend({
		urlRoot: "auth/register",

		defaults: {
			username: "",
			password: ""
		}
	});
});