const rights = [
  {text: "Right to Education", pair: "Going to school every day"},
  {text: "Right to Play", pair: "Playing with friends safely"},
  {text: "Right to Protection", pair: "Being safe from abuse"},
  {text: "Right to Health", pair: "Visiting the doctor when sick"},
];

let cards = [];
rights.forEach(right => {
  cards.push({text: right.text, pairId: right.text});
  cards.push({text: right.pair, pairId: right.text});
});

cards = shuffle(cards);

let flippedCards = [];
let gameBoard = document.getElementById("gameBoard");

cards.forEach(card => {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerText = "?";
  div.dataset.text = card.text;
  div.dataset.pairId = card.pairId;

  div.addEventListener("click", () => {
    if (div.classList.contains("flipped") || flippedCards.length === 2) return;

    div.classList.add("flipped");
    div.innerText = div.dataset.text;
    flippedCards.push(div);

    if (flippedCards.length === 2) {
      const [a, b] = flippedCards;
      if (a.dataset.pairId === b.dataset.pairId && a !== b) {
        // Match
        flippedCards = [];
      } else {
        // No match
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          a.innerText = "?";
          b.innerText = "?";
          flippedCards = [];
        }, 1000);
      }
    }
  });

  gameBoard.appendChild(div);
});

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}
