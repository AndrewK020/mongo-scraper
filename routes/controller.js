var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();
var db = require("../models");

router.get("/", function(req, res) {
  res.render("index");
  });

  // save an article
router.post("/api/article/", function(req, res) {
  db.Article.create(req.body)
    .then(function() {
      res.send(201);
    })
    .catch(function(err) {
      console.log(err);
      res.send(520);
    });
  
});


  // A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
    let articles = [];
    // First, we grab the body of the html with axios
    axios.get("https://itsfoss.com/category/news/").then(function(response) {
    
        var $ = cheerio.load(response.data);
        // console.log($);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function(i, element) {
          // Save an empty result object
          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          //result = $(this);
        result.title = $(this)
            .children("header")
            .children("h2")
            .children("a")
            .text();

        result.body = $(this)
            .children("div")
            .children("p")
            .text();

        result.author = $(this)
            .children("header")
            .children("p")
            .children("span.entry-author")
            .children("a")
            .children("span.entry-author-name")
            .text();

        result.date = $(this)
            .children("header")
            .children("p")
            .children("time")
            .text();

        result.imageLink = $(this)
            .children("div")
            .children("a")
            .children("img")
            .attr("src");
        
        result.articleLink = $(this)
        .children("div")
        .children("p")
        .children("a")
        .attr("href");
            
        articles.push(result);
        
        });

        res.render("index", {article_data: articles});

    });
  });
  
  router.get("/saved-articles", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {

      //getting articles from the database will add a saved attribute for front end
      dbArticle.forEach(function(article) {
        article.isSaved = true;
      });
      res.render("index", {article_data: dbArticle});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });

  // delete an article
  router.delete("/remove/saved-articles/:id", function(req, res) {
    var myquery = { _id: req.params.id };
    db.Article.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.send(200);
      console.log("1 article deleted");
    })
    .catch(function(err) {
      console.log(err);
      res.send(500);
    });
  });


  module.exports = router;