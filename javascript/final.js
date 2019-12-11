
var data = null;

var request = new XMLHttpRequest();

// defining event listener for ready state change event
request.onreadystatechange = function() {

    if(this.readyState === 4 && this.status === 200) {
		  console.log(this.responseText);
          var joke = JSON.parse(this.responseText);

          document.getElementById("joke").innerHTML = joke;
     }
 };


request.open("GET", "https://geek-jokes.sameerkumar.website/api");
request.setRequestHeader("accept", "application/json");
request.send(data);

const cards = document.querySelectorAll(".memory-card");


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

      resetBoard();

    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


// reveal/hide side menu
function toggleNav() {
    let updateElement = document.getElementById("menu-icon");
    // toggle adds or removes a class attribute accordingly (the class name is used by CSS)
    updateElement.classList.toggle("open");
}

// stuff for form
// add an event listener for form submission


// collect the user inputs, store them locally
function store() {

    //retrieve user inputs
    var fname = document.getElementById('first-name').value,
        lname = document.getElementById('last-name').value,
        age = document.getElementById('age').value,
        email = document.getElementById('email').value,
        phone = document.getElementById('phone').value,
        experience = document.getElementById('experience').value,
        message = document.getElementById('message').value;

    // create associative array
    var assarr = { "firstname": fname, "lastname": lname, "age": age, "email": email, "phone": phone, "experience": experience, "message": message};

    //save the javascript entities in the local storage as JSON strings
    localStorage.setItem("assarrValues", JSON.stringify(assarr));

    console.log (localStorage.getItem("assarrValues"));



    refresh();


}


     //parse the JSON string into javascript associative array
    var localAssarrs = JSON.parse( localStorage.getItem("assarrValues"));
    var fname = localAssarrs["firstname"];
    var email = localAssarrs["email"];
    var phone = localAssarrs["phone"];

    document.querySelector("#confirm").style.cssText = "color: red;"
    document.querySelector("#confirm").innerHTML = "Thank you, " + fname + " for your registration.<br> Melissa will be contacting you personally by email " + email + " or by phone " + phone ;

// empty local storage and refresh page
function emptyLS() {
    localStorage.removeItem("assarrValues");

   refresh();
}

function playAgain() {
    refresh();
}

function refresh() {
    history.go(0);
}


