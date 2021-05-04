const Joi = require("joi");

module.exports.venueSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  address: Joi.string().required()
});
module.exports.venues = [
  {
    id: 49,
    name: "Funny Furry Convention Center",
    address: "Site 19"
  }
];

module.exports.userSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
});
module.exports.users = [
  {
    id: 1,
    username: "nakamarusun",
    password: "bruh"
  }
];

module.exports.photoSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  venue_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required()
});
module.exports.photos = [];
