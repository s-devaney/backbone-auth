BackboneAuth.module("HeaderApp.List", function(List, BackboneAuth, Backbone, Marionette, $, _) {
	List.Header = Marionette.ItemView.extend({
		template: "#header-link-template",
		tagName: "li",

		events: {
			"click a": "navigate"
		},

		navigate: function(e) {
			e.preventDefault();
			this.trigger("navigate", this.model);
		},

		// set active page on render
		onRender: function() {
			if(this.model.selected) {
				this.$el.addClass("active");
			}
		}
	});

	List.Headers = Marionette.CompositeView.extend({
		template: "#header-template",
		className: "navbar navbar-inverse navbar-fixed-top",
		childView: List.Header,
		childViewContainer: "ul",

		events: {
			"click a.brand": "brandClicked"
		},

		brandClicked: function(e) {
			e.preventDefault();
			this.trigger("brand:clicked");
		}
	})
});