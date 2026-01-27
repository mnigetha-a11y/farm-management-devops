const express = require("express");
const app = express();

// Route for root
app.get("/", (req, res) => {
  res.send("Farm Management Backend Running");
});

// Listen on port 4000
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
