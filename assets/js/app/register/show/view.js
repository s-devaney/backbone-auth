BackboneAuth.module("RegisterApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Form = Marionette.ItemView.extend({
		template: "#register-form-template",

		events: {
			"click button.js-submit": "registerSubmitClicked"
		},

		registerSubmitClicked: function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("register:submit", data);
		}
	})
});