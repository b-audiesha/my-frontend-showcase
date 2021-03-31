const url = "https://legendary-strong-cesium.glitch.me/movies"

function displayLoading() {
    $("#loading-message").modal("show");
}
function toggleMovieHTML() {
    $("#movies-cards-container").toggleClass("d-none");
}
// todo: Function to build a movie card using a movie object
function buildMovieCard(movieObject) {
    let movieHTML = "";
    movieHTML += `<div class="card my-3 border border-primary rounded"><div class="card-body">`
    movieHTML += `<button type="button" data-id="${movieObject.id}" id="${movieObject.id}-button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i id="delete-button" class="fas fa-trash text-primary"></i></span></button>`
    movieHTML += `<h5 class="card-title" data-title="${movieObject.title}"><span class="heading-font-cards">Title:</span> ${movieObject.title}</h5>`
    movieHTML += `<p class="card-text" data-rating="${movieObject.rating}"><span class="heading-font-cards">Rating:</span> ${movieObject.rating}</p>`
    movieHTML += `<button type="button" data-id="${movieObject.id}" id="${movieObject.id}-edit-button" class="edit-btn btn btn-primary" data-dismiss="modal" aria-label="Edit"><span class="heading-font-cards" aria-hidden="true">Edit Movie</span></button>`
    movieHTML += `</div></div>`
    return movieHTML;
}
function buildModalHTML(modalObject){
    let modalHTML = "";
    modalHTML += `<div class="modal-dialog">`
    modalHTML += `<div class="modal-content">`
    modalHTML += `<div class="modal-header">`
    modalHTML += `<h5 class="modal-title"><span class="heading-font-cards">Editing:</span> ${modalObject.title}</h5>`
    modalHTML += `<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
    modalHTML += `</div>`
    modalHTML += `<div class="modal-body"><form>`
    modalHTML += `<div class="form-group">`
    modalHTML += `<label for="editModalMovieTitle"><span class="heading-font-cards">New Title: </span></label><input type="text" class="form-control" id="editModalMovieTitle" aria-describedby="emailHelp" value="${modalObject.title}"></div>`
    modalHTML += `<div class="form-group">`
    modalHTML += `<p data-rating="${modalObject.rating}"><span class="heading-font-cards">New Rating: </span> (Currently: ${modalObject.rating})</p>`
    modalHTML += `<div class="form-check form-check-inline" id="editModalMovieRating">`
    modalHTML += `<input class="form-check-input" type="radio" name="inlineRadioEditOptions" id="inlineEditRadio1" value="1"><label class="form-check-label" for="inlineEditRadio1"> 1</label></div>`
    modalHTML += `<div class="form-check form-check-inline">`
    modalHTML += `<input class="form-check-input" type="radio" name="inlineRadioEditOptions" id="inlineEditRadio2" value="2"><label class="form-check-label" for="inlineEditRadio2"> 2</label></div>`
    modalHTML += `<div class="form-check form-check-inline">`
    modalHTML += `<input class="form-check-input" type="radio" name="inlineRadioEditOptions" id="inlineEditRadio3" value="3"><label class="form-check-label" for="inlineEditRadio3"> 3</label></div>`
    modalHTML += `<div class="form-check form-check-inline">`
    modalHTML += `<input class="form-check-input" type="radio" name="inlineRadioEditOptions" id="inlineEditRadio4" value="4"><label class="form-check-label" for="inlineEditRadio4"> 4</label></div>`
    modalHTML += `<div class="form-check form-check-inline">`
    modalHTML += `<input class="form-check-input" type="radio" name="inlineRadioEditOptions" id="inlineEditRadio5" value="5"><label class="form-check-label" for="inlineEditRadio5"> 5</label></div>`
    modalHTML += `</div></form></div>`
    modalHTML += `<div class="modal-footer">`
    modalHTML += `<button id="save-edits-button" data-id="${modalObject.id}" type="button" class="btn btn-primary heading-font-cards">Save edits</button></div>`
    modalHTML += `</div></div>`
    return modalHTML;
}

// Edit Movie
function appendModalHTML(modalHTML){
    $("#edit-modal-container").empty();
    $("#edit-modal-container").append(modalHTML);
}

function appendMovieHTML(movieHTML){
    $("#movies-cards-container").append(movieHTML);
}

function setupListeners(){
    $(".close").click(function() {
        let userDelete = confirm("Are you sure you want to delete this message?");
        if (userDelete === true){
            deleteMovies($(this).attr("data-id"));
            console.log("Movie Deleted");
        }
    })
    $(".edit-btn").click(function(){
        let modalObject = {
            id: $(this).attr("data-id"),
            title: $(this).parent().children("h5").attr("data-title"),
            rating: $(this).parent().children("p").first().attr("data-rating")
        }
        console.log("Modal Object: ", modalObject)
        appendModalHTML(buildModalHTML(modalObject));
        $("#edit-modal-container").modal("show")
        $("#save-edits-button").click(function(){
            console.log($(this));
            let updatedMovieID = $(this).attr("data-id")
            console.log(updatedMovieID);
            let updatedMovieObject = {
                title: $("#editModalMovieTitle").val(),
                rating: $("input[name='inlineRadioEditOptions']:checked").val()
            }
            console.log(updatedMovieObject);
            updateMovie(updatedMovieObject, updatedMovieID);
        })
    })
}

function createMovies() {
    let movieObject = {
        title: $("#modalMovieTitle").val(),
        rating: $("input[name='inlineRadioOptions']:checked").val()
    }
    pushToMovies(movieObject);
}

function deleteMovies(movieId) {
    const deleteOptions ={
        method: "DELETE",
    }
    fetch(`${url}/${movieId}`, deleteOptions)
        .then(response => console.log(response))
        .then( moviesRerender =>{ fetch(url)
            .then(response => response.json())
            .then(listOfMovies => {
                $("#movies-cards-container").empty();
                listOfMovies.forEach(function (element) {
                    appendMovieHTML(buildMovieCard(element));
                })
                setupListeners();
            })
        });
// .catch(error => console.error(error))
}

function updateMovie(movieObject, movieID){
    const options = {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(movieObject)
    };
    fetch(`${url}/${movieID}`,options)
        .then(response => console.log(response))
        .then(() => {
            $("#edit-modal-container").modal("hide")
            displayLoading();
            fetch(url)
                .then(response => response.json())
                .then(listOfMovies => {
                    $("#movies-cards-container").empty();
                    listOfMovies.forEach(function (element) {
                        appendMovieHTML(buildMovieCard(element));
                    })
                    // todo We needed this event listener to be after the cards are populated, otherwise there were issues with the scope
                    setupListeners();
                    setTimeout(function(){
                        $("#loading-message").modal("hide");
                    }, 3000);
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error))
}

function pushToMovies(movieObject) {
    const options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(movieObject)
    };
    // Movie added
    fetch(url,options)
        .then(response => console.log(response))
        .catch(error => console.error(error))
        .then( movieLoad => {
            fetch(url)
                .then(response => response.json())
                .then(listOfMovies => {
                    let newestMovie = listOfMovies[listOfMovies.length - 1]
                    console.log(newestMovie);
                    appendMovieHTML(buildMovieCard(newestMovie));
                    toggleMovieHTML();
                    setupListeners();
                    // todo get the HTML appended properly, not currently appending for some reason
                })
        })

    // Modal closes
    $("#add-modal").modal("hide");

    // HTML disappears, Loading appears
    toggleMovieHTML();
    // toggleLoading();

}

$(document).ready(function () {
    displayLoading();
    setTimeout(function () {
        $("#loading-message").modal("hide");
    },3000)
    fetch(url)
        .then(response => response.json())
        .then(listOfMovies => {
            listOfMovies.forEach(function (element) {
                appendMovieHTML(buildMovieCard(element));
            })
            // todo We needed this event listener to be after the cards are populated, otherwise there were issues with the scope
            setupListeners();
        })
        .catch(error => console.error(error));


    $("#add-btn").click((e) => {
        e.preventDefault();
        $("#add-modal").modal("show")
    })


});

$("#save-changes-button").click(function () {
    createMovies();

})