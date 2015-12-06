BackboneAuth.module("SessionApp.Controller", function(Controller, BackboneAuth, Backbone, Marionette, $, _) {
	var JWT = null;
	var sessionChannel = Backbone.Radio.channel("session");

	Controller.InitialiseSession = function() {
		this.JWT = localStorage.getItem("BackboneAuthJWT");
	};

	Controller.NewSession = function(model) {
		console.log("Session controller: creating NewSession");
		var JWT = model.attributes.data.token
		localStorage.setItem("BackboneAuthJWT", JWT);
		this.JWT = JWT;
		sessionChannel.trigger("session:change");
		BackboneAuth.trigger("users:list");
	};

	Controller.EndSession = function() {
		console.log("Session controller: ending session");
		localStorage.setItem("BackboneAuthJWT", null);
		sessionChannel.trigger("session:change");
	};

	Controller.getJWT = function() {
		return this.JWT;
	};
});