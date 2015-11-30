BackboneAuth.module("HeaderApp.List", function(List, BackboneAuth, Marionette, Backbone, $, _) {
	List.Controller = {
		listHeader: function() {
			console.log("listing header");
			var links = BackboneAuth.request("header:entities");
			var headers = new List.Headers({collection: links});

			headers.on("brand:clicked", function() {
				// TODO - default action
				BackboneAuth.trigger("");
			});

			headers.on("childview:navigate", function(childView, model) {
				var trigger = model.get("navigationTrigger");
				BackboneAuth.trigger(trigger);
			});

			BackboneAuth.region_container.header.show(headers);
		},

		setActiveHeader: function(headerUrl) {
			var links = ContactManager.request("header:entities");
			var headerToSelect = links.find(function(header) {
				return header.get("url") === headerUrl;
			});

			headerToSelect.select();
			links.trigger("reset");
		}
	}
});