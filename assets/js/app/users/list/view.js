BackboneAuth.module("UsersApp.List", function(List, BackboneAuth, Backbone, Marionette, $, _) {
	List.Layout = Marionette.LayoutView.extend({
		template: "#users-list-layout",

		regions: {
			panelRegion: "#panel-region",
			usersRegion: "#users-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#users-list-panel",

		triggers: {
			"click button.js-new": "user:new"
		}
	});

	List.UserItemView = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#users-list-item-template",

		triggers: {
			"click td a.js-show": "user:show",
			"click td a.js-edit": "user:edit",
			"click button.js-delete": "user:delete"
		},

		events: {
			"click": "highlightName"
		},

		highlightName: function(e) {
			this.$el.toggleClass("warning");
		},

		remove: function() {
			// TODO
		},

		flash: function() {
			// TODO
		}
	});

	var NoUsersView = Marionette.ItemView.extend({
		template: "#users-list-empty-template",
		tagName: "tr",
		className: "alert"
	});

	List.UsersCollectionView = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "#users-list-template",
		childView: List.UserItemView,
		childViewContainer: "tbody",
		emptyView: NoUsersView,

		initialize: function() {
			this.listenTo(this.collection, "reset", function() {
				this.attachHtml = function(collectionView, childView, index) {
					collectionView.$el.append(childView.el);
				}
			});
		},

		onRenderCollection: function() {
			this.attachHtml = function(collectionView, childView, index) {
				collectionView.$el.prepend(childView.el);
			}
		}
	});
});