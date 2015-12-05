BackboneAuth.module("HeaderApp.List", function(List, BackboneAuth, Marionette, Backbone, $, _) {
	List.Controller = {
		listHeader: function() {
			console.log("listing header");
			var links = BackboneAuth.request("header:entities");
			var headers = new List.Headers({collection: links});

			headers.on("brand:clicked", function() {
				// TODO - default action
				BackboneAuth.trigger("home:show");
			});

			headers.on("childview:navigate", function(childView, model) {
				var trigger = model.get("navigationTrigger");
				BackboneAuth.trigger(trigger);
			});

			BackboneAuth.region_container.header.show(headers);
		},

		setActiveHeader: function(headerUrl) {
			console.log(headerUrl);
			var links = BackboneAuth.request("header:entities");
			window.linksback = links;
			var headerToSelect = links.find(function(header) {
				return header.get("url") === headerUrl;
			});

			console.log(headerToSelect);

			headerToSelect.select();
			links.trigger("reset");
		}
	}
});