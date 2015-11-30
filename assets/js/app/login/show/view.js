BackboneAuth.module("LoginApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Form = Marionette.ItemView.extend({
		template: "#login-form-template",

		events: {
			"click button.js-submit": "loginSubmitClicked"
		},

		loginSubmitClicked: function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("login:submit", data);
		}
	});
});