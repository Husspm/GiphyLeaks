$(document).ready(function() {
    //creating an array to contain all possible options
    //will eventually add the ability for users to add to this array via text input
    var topics = ["leek", "onion", "tomato", "carrots", "broccoli", "corn", "potato"];
    //using a for loop to generate buttons accoring to the number of items in topics
    function makeButtons() {
        $(".buttonDiv").empty();
        for (index = 0; index < topics.length; index++) {
            var buttonCreate = $("<button>").addClass("options");
            buttonCreate.attr("data-name", topics[index]);
            buttonCreate.text(topics[index]);
            $(".buttonDiv").append(buttonCreate);
        } //< ends for loop
    } //< ends makeButtons function
    makeButtons(); //calls it initially so the items in the array show up on load

    //grabs the images from giphy based on the selection user makes

    $(document).on("click", ".options", function goToGiphy() {
        $(".imagesDiv").empty();
        var searchWord = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchWord + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                results = response.data;
                console.log(results);
                for (i = 0; i < results.length; i++) {
                    var wrap = $("<div>").addClass("wrapper");
                    var imageView = $("<img>").attr("data-index", i);
                    var imageRating = $("<h2>");
                    imageRating.html("Classification : " + results[i].rating);
                    imageView.attr("src", results[i].images.fixed_height_still.url);
                    wrap.append(imageRating, imageView);
                    $(".imagesDiv").append(wrap);
                } //<ends for loop
            }); //<ends ajax.done function
    }); //<ends goToGiphy function
    var movement = false;
    $(document).on("click", "img", function animate() {
        var thisIndex = $(this).attr("data-index");
        if (movement === false) {
            movement = true;
            $(this).attr("src", results[thisIndex].images.fixed_height.url);
        } //<ends if 
        else {
            movement = false;
            $(this).attr("src", results[thisIndex].images.fixed_height_still.url);
        } //<ends else
    }); //ends animate function

    $("#sub-button").on("click", function(event) {
        event.preventDefault();
        var itemToAdd = $("#add-item").val().trim().toLowerCase();
        $("#add-item").val("");
        if (itemToAdd.length > 0 && topics.indexOf(itemToAdd) === -1) {
            topics.push(itemToAdd);
            makeButtons();
        } //<ends if 
    }); //<ends sub-button function

}); //<ends ready function