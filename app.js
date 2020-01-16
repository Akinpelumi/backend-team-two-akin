var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
var mongoose = require("mongoose");
var cors = require("cors");
var fileUpload = require("express-fileupload");

var port = 4000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/adminRoute")

var app = express();
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter)

module.exports = app;