var data = null;

var request = new XMLHttpRequest();

// defining event listener for ready state change event
request.onreadystatechange = function() {

    if(this.readyState === 4 && this.status === 200) {
		  console.log(this.responseText);
          var joke = JSON.parse(this.responseText);
          document.getElementById("joke").style.cssText = "font-style:italic;font-size:1.0em;color:#FFA101;"
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

function playAgain() {
    refresh();
}

function refresh() {
    history.go(0);
}


