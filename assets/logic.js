$(document).ready(function() {
    //creating an array to contain all possible options
    var topics = ["leek", "onion", "tomato", "carrots", "broccoli", "jalapenos", "potato"];
    //using a for loop to generate buttons accoring to the number of items in topics
    function makeButtons() {
        for (index = 0; index < topics.length; index++) {
            var buttonCreate = $("<button>").addClass("options");
            buttonCreate.attr("data-name", topics[index]);
            buttonCreate.text(topics[index]);
            $(".buttonDiv").append(buttonCreate);
        } //< ends for loop
    } //< ends makeButtons();
    makeButtons();
    $(".options").on("click", function() {
        $(".imagesDiv").empty();
        var searchWord = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            searchWord + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);
                console.log(queryURL);
                results = response.data;
                for (i = 0; i < results.length; i++) {
                    var imageView = $("<img>");
                    imageView.attr("src", results[i].images.fixed_height.url);
                    $(".imagesDiv").prepend(imageView);
                }
            });
    });




});