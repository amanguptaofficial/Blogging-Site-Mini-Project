const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./src/routes/route");

//Here using dotenv module for getting constant data
const dotenv = require("dotenv");
dotenv.config();


//Using inbuilt Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// here we are connect our mongodb.
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb connected succesfully...");
  })
  .catch((error) => {
    console.log(error.message);
  });

// this is middleware for fowarding request which is coming from the "/"
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`The Backend Server listen at port ${process.env.PORT}`);
});

module.exports = router;
