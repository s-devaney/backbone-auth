BackboneAuth.module("SessionApp.Entity", function(Entity, BackboneAuth, Backbone, Marionette, $, _) {
	Entity.SessionModel = Backbone.Model.extend({
		url: "user",
		initialize: function() {
			this.fetch();
		}
	});

	Entity.Session = null;

	/* private*/
	var initializeSession = function() {
		Entities.Session = new Entity.SessionModel();
	}

	var API = {
		getSession: function() {
			if(Entity.session === undefined) {
				initializeSession();	
			}
			
			return Entity.Session;
		}
	}

	BackboneAuth.reqres.setHandler("session:entity", function() {
		return API.getSession();
	});
});