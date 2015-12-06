BackboneAuth.module("HeaderApp.Entities", function(Entities, BackboneAuth, Backbone, Marionette, $, _) {
	Entities.Header = Backbone.Model.extend({
		initialize: function() {
			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);
		}
	});

	Entities.HeaderCollection = Backbone.Collection.extend({
		model: Entities.Header,

		initialize: function() {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
		}
	});

	var initializeHeaders = function() {
		Entities.headers = new Entities.HeaderCollection([
			{name: "Home", url: "", navigationTrigger: "home:show"},
			{name: "Users", url: "users", navigationTrigger: "users:list"},
			{name: "Login", url: "login", navigationTrigger: "login:show"},
			{name: "Register", url: "register", navigationTrigger: "register:show"},
			{name: "Logout", url: "logout", navigationTrigger: "session:logout"}
		]);
	};

	var API = {
		getHeaders: function() {
			if(Entities.headers == undefined) {
				initializeHeaders();
			}

			return Entities.headers;
		}
	};

	BackboneAuth.reqres.setHandler("header:entities", function() {
		return API.getHeaders();
	});
});