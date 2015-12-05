BackboneAuth.module("Entities", function(Entities, BackboneAuth, Backbone, Marionette, $, _) {
	Entities.User = null; //initialised/managed by session controller

	Entities.UserModel = Backbone.Model.extend({
		urlRoot: "user",

		defaults: {
			username: ""
		}
	});

	var API = {
		getUserEntity: function() {
			if(Entities.User === null) {
				throw new UserException(0);
			}
		}
	};

	BackboneAuth.reqres.setHandler("user:entity", function() {
		return API.getUserEntity();
	})
});