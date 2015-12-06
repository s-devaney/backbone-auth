BackboneAuth.module("LoginApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Form = Marionette.ItemView.extend({
		template: "#login-form-template",

		alert: null,

		events: {
			"click button.js-submit": "loginSubmitClicked"
		},

		serializeData: function() {
			return {
				alert: Marionette.getOption(this, "alert")
			}
		},

		loginSubmitClicked: function(e) {
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.trigger("login:submit", data);
		},

		onRender: function() {
			console.log("render");
			console.log(this);
			if(Marionette.getOption(this, "alert") === null) {
				console.log("get rid of alert");
				this.$el.find("p.alert").remove();
			}
		}
	});
});