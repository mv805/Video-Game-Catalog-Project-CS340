require("dotenv").config();
const express = require("express"); 
const db = require("./db-connector");
const routes = require("./routes/index");

const app = express(); 
const PORT = process.env.PORT; // Set a port number at the top so it's easy to change in the future


// Middleware to parse form data
// for parsing request bodies that are in JSON format
app.use(express.json());

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
