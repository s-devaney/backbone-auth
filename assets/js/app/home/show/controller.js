BackboneAuth.module("HomeApp.Show", function(Show, BackboneAuth, Backbone, Marionette, $, _) {
	Show.Controller = {
		showHome: function() {
			var homeView = new Show.Home();
			BackboneAuth.region_container.main.show(homeView);
		}
	}
});