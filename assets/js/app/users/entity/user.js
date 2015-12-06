BackboneAuth.module("UsersApp.Entity", function(Entity, BackboneAuth, Backbone, Marionette, $, _) {
	Entity.UserModel = Backbone.Model.extend({
		urlRoot: "user",

		defaults: {
			username: ""
		},

		/* TODO - use backbone.validation?
		validate: function() {

		} */
	});

	Entity.UserCollection = Backbone.Collection.extend({
		url: "user",
		model: Entity.UserModel,
		comparator: "username"
	});

	var users;

	var API = {
		getUserEntities: function() {
			console.log("getting user entities");

			var users = new Entity.UserCollection();
			var defer = $.Deferred();

			users.fetch({
				success: function(collection) {
					console.log("success");
					defer.resolve(collection);
				},

				error: function(collection, response, options) {
					console.log("error");
					defer.resolve(null);
					switch(response.status) {
						case 401:
							// Authorisation failure
							console.log("unauthorised");
							var sessionChannel = Backbone.Radio.channel("session");
							sessionChannel.trigger("session:error");
							break;
					}
				}
			});

			return defer.promise();
		},

		getUserEntity: function(id) {
			var user = new Entity.UserModel({id: id});
			var defer = $.Deferred();

			user.fetch({
				success: function(model) {
					defer.resolve(model);
				},

				error: function(model) {
					defer.resolve(null);
				}
			});

			return defer.promise();
		}
	};

	BackboneAuth.reqres.setHandler("users:entities", function() {
		return API.getUserEntities();
	});

	BackboneAuth.reqres.setHandler("user:entity", function(id) {
		return API.getUserEntity(id);
	});
});