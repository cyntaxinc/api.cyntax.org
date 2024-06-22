const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

require("dotenv").config();

// set port, listen for requests
const PORT = process.env.APP_PORT || 3000;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Configure CORS to allow all origins
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,POST',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Access Denied" });
});
require("./app/routes/routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

