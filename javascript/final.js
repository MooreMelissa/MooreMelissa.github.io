
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
document.getElementById('registration')

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

    // parse the JSON string into javascript associative array
    var localAssarr = JSON.parse( localStorage.getItem("assarrValues"));


    document.getElementById("output1").value = localAssarr["first-name"] + ", thank you for your registration.";
    document.getElementById("output2").value = "Miss Melissa will be contacting you shortly by the email address of " + localAssarr["email"];


    refresh();

    // retrieve values from the items stored in the local storage

    // parse the JSON string into javascript associative array
    var localAssarr = JSON.parse( localStorage.getItem("assarrValues"));

    var out = document.getElementById("output");
    document.getElementById("output").value = localAssarr["first-name"] + ", thank you for your registration.";
    document.getElementById("output").value = "Miss Melissa will be contacting you shortly by the email address of " + localAssarr["email"];



}


