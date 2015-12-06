# backbone-auth

## Introduction
BackboneAuth demonstrates a simple method of implementing JWT-based user authentication in a BackboneJS application. It uses a simple SailsJS back-end and the Marionette framework for Backbone.

## About
Authentication is handled with a session controller which persists JWT to local storage in the browser. The JWT is appended to all AJAX requests in the jQuery layer. Authentication management is baked into individual Backbone models/collections and authentication errors are flagged back to the session controller, where the JWT is invalidated and the application is redirected to the login module.

## To run this application
1. clone the project to your local machine
2. run `npm install` from within the folder
3. run `sails lift` from within the folder
4. open `http://localhost:1337/` in your browser