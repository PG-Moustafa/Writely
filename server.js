import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/view_blog", (req, res) => {
    res.render("view_blog.ejs");
});

app.get("/create_blog", (req, res) => {
    res.render("create_blog.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});



