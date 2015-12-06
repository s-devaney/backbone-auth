BackboneAuth.module("UsersApp", function(UsersApp, BackboneAuth, Backbone, Marionette, $, _) {
	UsersApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"users": "listUsers",
			"users/:id": "showUser"
		}
	});

	var API = {
		listUsers: function() {
			UsersApp.List.Controller.listUsers();
			BackboneAuth.execute("set:active:header", "users");
		},

		showUser: function(id) {
			UsersApp.Show.Controller.showUser(id);
			BackboneAuth.execute("set:active:header", "users");
		}
	};

	UsersApp.on("users:list", function() {
		BackboneAuth.navigate("users");
		API.listUsers();
	});

	UsersApp.on("user:show", function(id) {
		BackboneAuth.navigate("users/" + id);
		API.showUser(id);
	});

	UsersApp.on("start", function() {
		new UsersApp.Router({
			controller: API
		});
	});
});