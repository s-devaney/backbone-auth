function UserException(code) {
	var codes = [
		{
			"type": "User model error",
			"description": "The requested user model is not yet initialized (NULL)"
		}
	];

	this.type = codes[code].type;
	this.description = codes[code].description;
};

function SessionException(code) {
	var codes = [
		{
			"type": "Session model error",
			"description": "The requested session model is not yet initialized"
		}
	];

	this.type = codes[code].type;
	this.description = codes[code].description;
};