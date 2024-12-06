const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X"; // Jogador atual (X ou O)

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];


const images = {
  X: "/assets/game/snoopy-flower.png",
  O: "/assets/game/wood-heart.png",
};

function init() {
  selected = [];

  updateCurrentPlayerDisplay();

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");

  const img = document.createElement("img");
  img.src = images[player];
  img.alt = player;
  img.style.width = "100%";
  img.style.height = "100%";

  e.target.appendChild(img);
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X"; // Alterna o jogador
  updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
  currentPlayer.innerHTML = `JOGADOR DA VEZ: `;

  const img = document.createElement("img");
  img.src = images[player];
  img.alt = player;
  img.style.width = "30px"; // Tamanho da imagem ao lado do texto
  img.style.height = "30px";
  img.style.verticalAlign = "middle"; // Alinha verticalmente a imagem com o texto

  currentPlayer.appendChild(img);
}

function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (let pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      const winner = playerLastMove === "X" ? "SNOOPY" : "WOODSTOCK"; // Definir o vencedor baseado no último movimento
      showModal(`O JOGADOR ${winner} GANHOU!`);
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    showModal("DEU EMPATE!");
    return;
  }
}

// Função para exibir o modal personalizado
function showModal(message) {
  const modal = document.getElementById("alertModal");
  const modalText = document.getElementById("modalText");
  const restartButton = document.getElementById("restartButton");
  // const closeButton = document.querySelector(".close");

  // Exibe o texto da mensagem
  modalText.textContent = message;

  // Exibe o modal
  modal.style.display = "block";

  // Fecha o modal ao clicar no botão de fechar ou reiniciar o jogo
  // closeButton.onclick = function () {
  //   modal.style.display = "none";
  //   init(); // Reinicia o jogo
  // };
  restartButton.onclick = function () {
    modal.style.display = "none";
    init(); // Reinicia o jogo
  };

  // Fecha o modal se clicar fora dele
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      init(); // Reinicia o jogo
    }
  };
}

