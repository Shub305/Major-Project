const cardsData = [
  { text: "Going to school", type: "right" },
  { text: "Only boys can speak", type: "not" },
  { text: "Being safe from harm", type: "right" },
  { text: "No girls allowed", type: "not" },
  { text: "Getting medical care", type: "right" },
  { text: "Being punished without reason", type: "not" },
  { text: "Playing and resting", type: "right" },
  { text: "Working instead of school", type: "not" }
];

let score = 0;

const cardArea = document.getElementById("cardArea");
const scoreboard = document.getElementById("scoreboard");

// Create draggable cards
cardsData.forEach((cardData, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerText = cardData.text;
  card.draggable = true;
  card.id = "card-" + index;
  card.dataset.type = cardData.type;

  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.id);
  });

  cardArea.appendChild(card);
});

// Set up bins
const bins = document.querySelectorAll(".bin");
bins.forEach((bin) => {
  bin.addEventListener("dragover", (e) => {
    e.preventDefault();
    bin.style.backgroundColor = "#dcedc8";
  });

  bin.addEventListener("dragleave", () => {
    bin.style.backgroundColor = bin.dataset.type === "right" ? "#c8e6c9" : "#ffcdd2";
  });

  bin.addEventListener("drop", (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);
    const correctType = card.dataset.type;
    const binType = bin.dataset.type;

    if (correctType === binType) {
      bin.appendChild(card);
      card.draggable = false;
      card.style.borderColor = "#4caf50";
      score += 1;
    } else {
      card.style.borderColor = "#f44336";
      score -= 1;
    }

    scoreboard.innerText = `Score: ${score}`;
    bin.style.backgroundColor = bin.dataset.type === "right" ? "#c8e6c9" : "#ffcdd2";
  });
});
