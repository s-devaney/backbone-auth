var credential = require('credential');
var jwt = require('jsonwebtoken');
 
module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,
 
	/**
	* Hash the password field of the passed user.
	*/
	hashPassword: function (user, next) {
		sails.log.silly("hashing password for user: " + JSON.stringify(user));
		if (user.password) {
			//user.password = bcrypt.hashSync(user.password);
			credential.hash(user.password, function(err, hash) {
				sails.log.silly("password hashing complete ("+typeof hash+"). Hash: " + hash);
				user.password = hash;
				sails.log.silly("hashing complete. Updating user password for user: " + JSON.stringify(user));
				next();
			});
		}
	},

	/**
	* Compare user password hash with unhashed password
	* @returns boolean indicating a match
	*/
	comparePassword: function(pwhash, inputpw, callback){
		//return bcrypt.compareSync(password, user.password);
		credential.verify(pwhash, inputpw, callback);
	},
 
	/**
	* Create a token based on the passed user
	* @param user
	*/
	createToken: function(user) {
		return jwt.sign({
			user: user.toJSON()
			},
			sails.config.jwtSettings.secret,
			{
				algorithm: sails.config.jwtSettings.algorithm,
				expiresIn: sails.config.jwtSettings.expiresInSeconds,
				issuer: sails.config.jwtSettings.issuer,
				audience: sails.config.jwtSettings.audience
			}
		);
	}
};