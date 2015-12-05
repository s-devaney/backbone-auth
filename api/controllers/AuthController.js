/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
	if (error) return res.serverError(error);
	if (!user) return res.unauthorized(null, info && info.code, info && info.message);

	return res.ok({
		// TODO: replace with new type of cipher service
		token: CipherService.createToken(user),
		user: user
	});
}

module.exports = {
	/**
	* Sign up in system
	* @param {Object} req Request object
	* @param {Object} res Response object
	*/
	register: function (req, res) {
		req._sails.log.silly('creating user');
		req._sails.log.silly(req.allParams());

		User
			.create(_.omit(req.allParams(), 'id'))
			.then(function (user) {
				return {
					// TODO: replace with new type of cipher service
					token: CipherService.createToken(user),
					user: user
				};
			})
			.then(function(arg) {
				req._sails.log.silly("final user: " + JSON.stringify(arg));
				res.created(arg);
			})
			.catch(res.serverError);
	},

	/**
	* Sign in by local strategy in passport
	* @param {Object} req Request object
	* @param {Object} res Response object
	*/
	login: function (req, res) {
		passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
	}
};

