import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import {Blog} from './blog_list.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(express.static("views"));

const blogFilePath = path.join(__dirname, "blog_data.json");
let blogs = JSON.parse(fs.readFileSync(blogFilePath));

const myBlogFilePath = path.join(__dirname, "my_blog_data.json");
let myBlogs = JSON.parse(fs.readFileSync(myBlogFilePath));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", {blogs});
});

app.get("/view_blog", (req, res) => {
    res.render("view_blog.ejs", { blogs });
});

app.get("/view_my_blog", (req, res) => {
    res.render("view_my_blog.ejs", { myBlogs });
});

app.get("/create_blog", (req, res) => {
    res.render("create_blog.ejs");
});

app.post("/submit_blog", (req, res) => {
    let id = blogs.length + 1;
    let title = req.body.title;
    let author = req.body.author;
    let date = new Date().toISOString().split("T")[0];
    let content = req.body.content;
    const newBlog = new Blog(id, title, author, date, content);
    blogs.push(newBlog);
    myBlogs.push(newBlog);
    fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
    fs.writeFileSync(myBlogFilePath, JSON.stringify(myBlogs, null, 2));
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});



