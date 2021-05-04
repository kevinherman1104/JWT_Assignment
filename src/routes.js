let express = require("express");
let model = require("./models");

module.exports.rest = express.Router();

module.exports.initRoutes = function (app) {
  // Router for REST, for parsing and auth
  let rest = module.exports.rest;

  app.get("/", (req, res) => {
    return res.send("Welcome to spotlight lalallalalalallalalal");
  });

  // Check whether id exists in DB, and passes the venue reference
  rest.param("vId", (req, res, next, id) => {
    if (!/^-?\d+$/.test(id)) return res.sendStatus(400);
    id = parseInt(id, 10);

    let venue = model.venues.find((obj) => {
      return obj.id === id;
    });
    if (venue) {
      req.venue = venue;
      next();
    } else {
      res.sendStatus(404);
    }
  });

  rest.param("pId", (req, res, next, id) => {
    if (!/^-?\d+$/.test(id)) return res.sendStatus(400);
    id = parseInt(id, 10);

    let photo = model.photos.find((obj) => {
      return obj.id === id;
    });
    if (photo) {
      req.photo = photo;
      next();
    } else {
      res.sendStatus(404);
    }
  });

  /**
   * @swagger
   * /venues:
   *    post:
   *      parameters:
   *       - in: body
   *         name: id
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: body
   *         name: name
   *         required: true
   *         description: Description of the venue.
   *         schema:
   *           type: string
   *           example: The International 10 Venue
   *       - in: body
   *         name: address
   *         required: true
   *         description: Address of the venue.
   *         schema:
   *           type: string
   *           example: Jakarta
   *      summary: Inserts a venue into the database
   *      responses:
   *        "201":
   *          description: Successfully created
   *        "400":
   *          description: Invalid parameter
   */
  rest.post("/venues", (req, res) => {
    const dataRes = model.venueSchema.validate(req.body);

    if (!dataRes.error) {
      let data = dataRes.value;
      model.venues.push(data);
      return res.sendStatus(201);
    } else {
      console.log(dataRes.error);
      return res.sendStatus(400);
    }
  });

  /**
   * @swagger
   * /venues:
   *    get:
   *      summary: Lists all the available venues
   *      responses:
   *        "200":
   *          description: Successfully sent
   */
  rest.get("/venues", (req, res) => {
    res.send(model.venues);
  });

  /**
   * @swagger
   * /venues/{venueId}:
   *    get:
   *      parameters:
   *       - in: path
   *         name: venueId
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 49
   *      summary: Gets the venue with the corresponding ID
   *      responses:
   *        "200":
   *          description: Successfully sent
   *        "400":
   *          description: Invalid parameter
   *        "404":
   *          description: Not found
   */
  rest.get("/venues/:vId", (req, res) => {
    res.send(req.venue);
  });

  /**
   * @swagger
   * /venues/{venueId}:
   *    delete:
   *      parameters:
   *       - in: path
   *         name: venueId
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 49
   *      summary: Deletes a venue with the corresponding ID
   *      responses:
   *        "204":
   *          description: Deletion complete
   */
  rest.delete("/venues/:vId", (req, res) => {
    model.venues.splice(model.venues.indexOf(req.venue), 1);
    res.sendStatus(204);
  });

  /**
   * @swagger
   * /venues/{venueId}/photos:
   *    post:
   *      parameters:
   *       - in: path
   *         name: venueId
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: body
   *         name: id
   *         required: true
   *         description: ID of the photo.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: body
   *         name: venue_id
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 5
   *       - in: body
   *         name: user_id
   *         required: true
   *         description: ID of the user who owns this resource.
   *         schema:
   *           type: integer
   *           example: 9
   *      summary: Inserts a new photo metadata to the database
   *      responses:
   *        "201":
   *          description: Successfully created
   *        "400":
   *          description: Invalid parameter
   */
  rest.post("/venues/:vId/photos", (req, res) => {
    const dataRes = model.photoSchema.validate(req.body);

    if (!dataRes.error) {
      let data = dataRes.value;
      model.photos.push(data);
      return res.sendStatus(201);
    } else {
      console.log(dataRes.error);
      return res.sendStatus(400);
    }
  });

  /**
   * @swagger
   * /venues/{venueId}/photos/{photoId}:
   *    post:
   *      parameters:
   *       - in: path
   *         name: venueId
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: path
   *         name: photoId
   *         required: true
   *         description: ID of the photo.
   *         schema:
   *           type: integer
   *           example: 1
   *      summary: Gets the photo of the venue with corresponding ID.
   *      responses:
   *        "200":
   *          description: Successfully sent
   *        "400":
   *          description: Invalid parameter
   *        "404":
   *          description: Not found
   */
  rest.get("/venues/:vId/photos/:pId", (req, res) => {
    res.send(req.photo);
  });

  /**
   * @swagger
   * /venues/{venueId}/photos/{photoId}:
   *    delete:
   *      parameters:
   *       - in: path
   *         name: venueId
   *         required: true
   *         description: ID of the venue.
   *         schema:
   *           type: integer
   *           example: 1
   *       - in: path
   *         name: photoId
   *         required: true
   *         description: ID of the photo.
   *         schema:
   *           type: integer
   *           example: 1
   *      summary: Deletes the photo of the venue with corresponding ID.
   *      responses:
   *        "204":
   *          description: Deletion complete
   */
  rest.delete("/venues/:vId/photos/:pId", (req, res) => {
    model.photos.splice(model.photos.indexOf(req.photo), 1);
    res.sendStatus(204);
  });

  // Register router
  app.use("/api", rest);
};
