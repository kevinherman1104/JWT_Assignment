require("dotenv").config();
var http = require("http");
let express = require("express");
let bParser = require("body-parser");
const jwt = require("jsonwebtoken");

const swagUi = require("swagger-ui-express");
const swagJSDoc = require("swagger-jsdoc");
const swagDoc = require("../swagger.json");

const routes = require("./routes");
const models = require("./models");

let app = express();

// Middlewares
app.use(bParser.json()); // JSON decoder
app.use(
  bParser.urlencoded({
    extended: true
  })
); // URL format decoder

/**
 * @swagger
 * /login:
 *    post:
 *      parameters:
 *       - in: body
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: username
 *         required: true
 *         description: Unique username.
 *         schema:
 *           type: string
 *           example: bAGUzcODe
 *       - in: body
 *         name: password
 *         required: true
 *         description: User password.
 *         schema:
 *           type: string
 *           example: F78=sFJfDS7f+S_$r42_lDRFS-7
 *      summary: Deletes the photo of the venue with corresponding ID.
 *      responses:
 *        "400":
 *          description: Parameter error
 */
app.post("/login", (req, res) => {
  const dataRes = models.userSchema.validate(req.body);
  if (dataRes.error) return res.sendStatus(400);

  const data = dataRes.value;
  const user = { name: data.username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

/**
 * @swagger
 * /register:
 *    post:
 *      parameters:
 *       - in: body
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: username
 *         required: true
 *         description: Unique username.
 *         schema:
 *           type: string
 *           example: bAGUzcODe
 *       - in: body
 *         name: password
 *         required: true
 *         description: User password.
 *         schema:
 *           type: string
 *           example: F78=sFJfDS7f+S_$r42_lDRFS-7
 *      summary: Deletes the photo of the venue with corresponding ID.
 *      responses:
 *        "400":
 *          description: Parameter error
 *        "201":
 *          description: User created
 */
app.post("/register", (req, res) => {
  const dataRes = models.userSchema.validate(req.body);
  if (dataRes.error) return res.sendStatus(400);

  models.users.push(dataRes.value);
  res.sendStatus(201);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register all server routes and middlewares
routes.rest.use(authenticateToken);
routes.initRoutes(app);

// Swagger
const swagSpec = swagJSDoc(swagDoc);
app.use("/api-docs", swagUi.serve, swagUi.setup(swagSpec, { explorer: true }));

http.createServer(app).listen(8080, () => {
  console.log("Server listening to 8080");
});
