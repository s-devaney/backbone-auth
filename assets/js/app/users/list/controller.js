BackboneAuth.module("UsersApp.List", function(List, BackboneAuth, Backbone, Marionette, $, _) {
	List.Controller = {
		listUsers: function() {
			var loadingView = new BackboneAuth.Common.Views.Loading();
			BackboneAuth.region_container.main.show(loadingView);

			var usersRequest = BackboneAuth.request("users:entities");

			var usersListLayout = new List.Layout();
			var usersListPanel = new List.Panel();

			$.when(usersRequest).done(function(users) {
				var usersListView = new List.UsersCollectionView({
					collection: users
				});

				usersListLayout.on("show", function() {
					console.log(usersListLayout);
					usersListLayout.panelRegion.show(usersListPanel);
					usersListLayout.usersRegion.show(usersListView);
				});

				usersListPanel.on("user:new", function() {
					// TODO
				});

				usersListView.on("childview:user:show", function(childView, args) {
					BackboneAuth.trigger("user:show", args.model.get("id"));
				});

				BackboneAuth.region_container.main.show(usersListLayout);
			});
		}
	}
});