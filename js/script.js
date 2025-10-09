// DEV JOTAPÊ

// Variáveis globais
let participantesData = [];
let sorteados = [];
let sorteioAtual = 0;

// Lista animada de participantes dentro do celular
function criarListaAnimada() {
  const listaContainer = document.getElementById("lista-participantes");
  if (!listaContainer) return;

  if (participantesData.length === 0) {
    // Lista de exemplo enquanto carrega
    let listaExemplo = "";
    for (let i = 1; i <= 100; i++) {
      listaExemplo += `
        <div class="participante-item">
          <span class="participante-numero">${i}</span>
          <span class="participante-nome">Participante ${i}</span>
        </div>`;
    }
    listaContainer.innerHTML = listaExemplo + listaExemplo + listaExemplo;
  } else {
    const participantesOrdenados = [...participantesData].sort(
      (a, b) => a.numero - b.numero
    );

    let listaHTML = "";
    participantesOrdenados.forEach((participante) => {
      listaHTML += `
        <div class="participante-item">
          <span class="participante-numero">${participante.numero}</span>
          <span class="participante-nome">${participante.nome}</span>
        </div>`;
    });

    // Triplicar para efeito contínuo
    listaContainer.innerHTML = listaHTML + listaHTML + listaHTML;
  }

  listaContainer.style.opacity = "1";
  listaContainer.style.visibility = "visible";
  listaContainer.style.display = "block";
}

// Carregar dados dos participantes
async function carregarParticipantes() {
  try {
    const response = await fetch("./participantes.json");
    participantesData = await response.json();
    console.log(`Carregados ${participantesData.length} participantes`);
    criarListaAnimada();
  } catch (error) {
    console.error("Erro ao carregar participantes:", error);
    alert("Erro ao carregar participantes! Verifique o arquivo JSON.");
    participantesData = [];
  }
}

// Validar e executar sorteio
function sortear() {
  const quantidade = parseInt(document.getElementById("quantity").value) || 2;
  const de = parseInt(document.getElementById("min").value) || 1;
  const ate = parseInt(document.getElementById("max").value) || 100;
  const naoRepetir = document.getElementById("unique").checked;

  // Validações
  if (de > ate) {
    alert('O valor "DE" deve ser menor ou igual ao valor "ATÉ"!');
    return;
  }

  if (quantidade <= 0) {
    alert("A quantidade deve ser maior que zero!");
    return;
  }

  // Filtrar participantes no intervalo
  let numerosDisponiveis = participantesData.filter(
    (p) => p.numero >= de && p.numero <= ate
  );

  if (naoRepetir) {
    numerosDisponiveis = numerosDisponiveis.filter(
      (p) => !sorteados.some((s) => s.numero === p.numero)
    );
  }

  if (numerosDisponiveis.length === 0) {
    alert("Não há números disponíveis nesse intervalo!");
    return;
  }

  if (quantidade > numerosDisponiveis.length) {
    alert(
      `Só existem ${numerosDisponiveis.length} números disponíveis nesse intervalo!`
    );
    return;
  }

  // Sortear números
  numerosDisponiveis.sort(() => Math.random() - 0.5);
  const novosSorteados = numerosDisponiveis.slice(0, quantidade);

  if (naoRepetir) {
    sorteados.push(...novosSorteados);
  }

  // Iniciar contagem e exibir resultados
  iniciarContagem(() => {
    mostrarResultados(novosSorteados);
  });
}

// Contagem regressiva antes do sorteio
function iniciarContagem(callback) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let contador = 3;

  const contadorDiv = document.createElement("div");
  contadorDiv.classList.add("contador");
  contadorDiv.style.fontSize = "80px";
  contadorDiv.style.fontWeight = "bold";
  contadorDiv.style.color = "#8467bc";
  contadorDiv.style.textAlign = "center";
  contadorDiv.style.textShadow = "0 0 30px rgba(132, 103, 188, 0.6)";
  resultadoDiv.appendChild(contadorDiv);

  const intervalo = setInterval(() => {
    contadorDiv.innerText = contador;
    contador--;

    if (contador < 0) {
      clearInterval(intervalo);
      callback();
    }
  }, 1000);
}

// Exibir resultados do sorteio
function mostrarResultados(participantesSorteados) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let numeroAtual = 0;

  function mostrarProximoNumero() {
    if (numeroAtual < participantesSorteados.length) {
      const participante = participantesSorteados[numeroAtual];

      resultadoDiv.innerHTML = "";

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("sorteado-item", "numero-aparecendo");

      const ordem = document.createElement("div");
      ordem.classList.add("resultado-ordem");
      ordem.innerText = `${numeroAtual + 1}º Sorteado`;

      const numero = document.createElement("div");
      numero.classList.add("resultado-numero");
      numero.innerText = participante.numero;

      const infos = document.createElement("div");
      infos.classList.add("resultado-infos");
      infos.innerHTML = `
        <strong>Nome:</strong> ${participante.nome} <br>
        <strong>Cartela:</strong> ${participante.cartela} <br>
        <strong>Vendedor:</strong> ${participante.vendedor}
      `;

      itemDiv.appendChild(ordem);
      itemDiv.appendChild(numero);
      itemDiv.appendChild(infos);
      resultadoDiv.appendChild(itemDiv);

      numeroAtual++;

      // Próximo número ou abrir modal
      if (numeroAtual < participantesSorteados.length) {
        setTimeout(mostrarProximoNumero, 3500);
      } else {
        setTimeout(() => {
          abrirModal(participantesSorteados);
        }, 4000);
      }
    }
  }

  mostrarProximoNumero();
}

// Modal com todos os resultados
function abrirModal(participantesSorteados) {
  const modal = document.getElementById("modal-resultados");
  const numbersContainer = document.getElementById("modal-numbers");

  numbersContainer.innerHTML = "";

  participantesSorteados.forEach((participante, index) => {
    const winnerDiv = document.createElement("div");
    winnerDiv.classList.add("modal-winner");

    winnerDiv.style.opacity = "0";
    winnerDiv.style.transform = "translateY(20px)";
    winnerDiv.style.transition = "all 0.8s ease-out";

    winnerDiv.innerHTML = `
      <div class="modal-number">${participante.numero}</div>
      <div class="modal-name">${participante.nome}</div>
      <div class="modal-cartela">Cartela: ${participante.cartela}</div>
    `;

    numbersContainer.appendChild(winnerDiv);

    setTimeout(() => {
      winnerDiv.style.opacity = "1";
      winnerDiv.style.transform = "translateY(0)";
    }, index * 300);
  });

  modal.classList.add("show");
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById("modal-resultados");
  modal.classList.remove("show");
}

// Inicializar ao carregar página
document.addEventListener("DOMContentLoaded", function () {
  criarListaAnimada();
  carregarParticipantes();
});
