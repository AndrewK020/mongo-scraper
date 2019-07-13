$(document).ready(function() {

    $(".article-form").on("submit", function(event) {
        event.preventDefault();

        let article = {};
        
        article.title = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("h5")
            .text();

        article.body = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("p.article-body")
            .text();

        article.author = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("p.article-author")
            .text();

        article.date = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("p.card-text")
            .children("small")
            .text();

        article.imageLink = $(this)
            .children("div.no-gutters")
            .children("div.col-md-4")
            .children(".image-link")
            .attr("src");

        article.articleLink = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("a")
            .attr("href");

        article.note = $(this)
            .children("div.no-gutters")
            .children("div.col-md-8")
            .children("div.card-body")
            .children("div")
            .children("input")
            .val();
        

        console.log("article: ", article);

        $.ajax({
            method: "POST",
            url: "/api/article/",
            data: article
        })
        .then(function(response) {
        });

      });
    
});

