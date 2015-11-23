/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
 
var EXPIRES_IN_MINUTES = 60 * 24; // TODO - change? 1 day atm
var EXPIRES_IN_SECONDS = 60 * 60 * 24;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM"; // TODO - change!!!!
var ALGORITHM = "HS256";
var ISSUER = "nozus.com";
var AUDIENCE = "nozus.com";
 
/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: false
};
 
/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer : ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false
};
 
/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(username, password, next) {
  User.findOne({username: username})
	.exec(function (error, user) {
		if (error) return next(error, false, {});

		if (!user) return next(null, false, {
			code: 'E_USER_NOT_FOUND',
			message: username + ' is not found'
		});

		sails.log.silly(password);
		sails.log.silly(user.password);

		CipherService.comparePassword(user.password, password, function(err, isValid) {
			sails.log.silly(JSON.stringify(err));
			sails.log.silly(err);
			sails.log.silly(typeof err);
			sails.log.silly("valid: "+isValid);
			if(err) {
				return next(null, false, {
					code: "E_CIPHERSERVICE",
					message: err
				});
			}

			switch(isValid) {
				case true:
					return next(null, user, {});
					break;
				case false:
					return next(null, false, {
						code: 'E_WRONG_PASSWORD',
						message: 'Password is wrong'
					});
					break;
			}
		});

		/*
		*	TODO
		*	is this the only authorisation needed here?
		*	do we want to check user is not banned, etc...
		*	check password expiry? login origin? login attempts?
		*/
	});
}
 
/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
	var user = payload.user;
	return next(null, user, {});
}
 
passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
 
module.exports.jwtSettings = {
	expiresInMinutes: EXPIRES_IN_MINUTES,
	expiresInSeconds: EXPIRES_IN_SECONDS,
	secret: SECRET,
	algorithm : ALGORITHM,
	issuer : ISSUER,
	audience : AUDIENCE
};