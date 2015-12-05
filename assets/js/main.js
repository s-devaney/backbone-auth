var BackboneAuth = new Marionette.Application();

/*
*	UNKNOWN
*/
BackboneAuth.navigate = function(route, options) {
	options || (options = {});
	Backbone.history.navigate(route, options);
};

/*
*	Return current route as URL fragment
*/
BackboneAuth.getCurrentRoute = function() {
	return Backbone.history.fragment;
};

BackboneAuth.on("before:start", function() {
	var RegionContainer = Marionette.LayoutView.extend({
		el: "#app-container",

		regions: {
			header: "#header-region",
			main: "#main-region",
			dialog: "#dialog_region"
		}
	});

	BackboneAuth.region_container = new RegionContainer();

	// TODO - should this be here? couldn't we have a dialog view to handle this?
	BackboneAuth.region_container.dialog.onShow = function(view) {
		var self = this;

		// generic function to close the dialog
		var closeDialog = function() {
			self.stopListening();
			self.empty();
			self.$el.dialog("destroy");
		};

		// listen and respond to the dialog close event from the controlling view
		this.listenTo(view, "dialog:close", closeDialog)

		// create the dialog (jQuery UI)
		this.$el.dialog({
			modal: true,
			title: view.title,
			width: "auto",
			close: function(e, ui) {
				closeDialog();
			} 
		});
	};
});

BackboneAuth.on("start", function() {
	console.log("starting app");
	if(Backbone.history) {
		Backbone.history.start();

		// set default route
		// TODO - initial route should be handled by session controller?
		if(this.getCurrentRoute() == "") {
			console.log("triggering default route");
			BackboneAuth.trigger("login:show");
		}
	}
});