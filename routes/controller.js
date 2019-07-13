var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();


router.get("/", function(req, res) {

  res.render("index");

  });


  // A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
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

            result.imgLink = $(this)
                .children("div")
                .children("a")
                .children("img")
                .attr("src");
            
            result.articleLink = $(this)
            .children("div")
            .children("p")
            .children("a")
            .attr("href");
            
            console.log(result);
        
        });
        res.send("Scrape Complete");
    });
  });
  
  


  module.exports = router;