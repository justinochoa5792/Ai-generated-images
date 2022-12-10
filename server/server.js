const express = require("express");
const port = process.env.PORT || 5001;
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());

// Enable body parser
app.use(express.json());

//Set static folder
app.use(express.static(path.join(__dirname, "client")));

app.use(express.urlencoded({ extended: false }));

app.use("/openai", require("./routes/openai"));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
