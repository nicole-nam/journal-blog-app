//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "Keeping a journal helps you create order when your world feels like it’s in chaos. You get to know yourself by revealing your most private fears, thoughts, and feelings. Look at your writing time as personal relaxation time. It's a time when you can de-stress and wind down. Write in a place that's relaxing and soothing, maybe with a cup of tea. Look forward to your journaling time. And know that you're doing something good for your mind and body.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingConent: homeStartingContent,
    posts: posts,
  });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutConent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactConent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/posts/:postName", function (req, res) {
  const requestedName = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const actualTitle = _.lowerCase(post.title);

    if (requestedName === actualTitle) {
      console.log("match found");
    } else {
      console.log("no match found");
    }
  });
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
