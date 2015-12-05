BackboneAuth.module("HomeApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Home = Marionette.ItemView.extend({
		template: "#home-template"
	});
});