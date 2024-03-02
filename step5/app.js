require("dotenv").config();
const express = require("express"); 
const bodyParser = require('body-parser');

const routes = require("./routes/index");

const app = express(); 
const PORT = process.env.PORT;

// Middleware to parse form data

//needed to parse url form data
app.use(bodyParser.urlencoded({ extended: true }));

//root location to refer in the html. looks in here when referencing the locations of files, such as the styles.css in the link in the header partial
app.use(express.static('public'));

app.set("view engine", "ejs");

/*
    ROUTES
*/
app.use("/", routes);

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
