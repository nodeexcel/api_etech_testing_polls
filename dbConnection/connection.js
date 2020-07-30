const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://ashutosh_m:java123@ds251245.mlab.com:51245/etech_testing_polls",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection
  .on("error", (error) => console.log("Error Occured in Connecting With DB."))
  .once("open", () => console.log("Database Connected."));
 

  