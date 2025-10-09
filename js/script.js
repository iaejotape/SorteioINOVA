// DEV JOTAPÊ
// Sistema de Sorteio de Números

// Variáveis globais
let sorteados = [];

// Lista animada de números dentro do celular
function criarListaAnimada() {
  const listaContainer = document.getElementById("lista-numeros");
  if (!listaContainer) return;

  let listaHTML = "";
  for (let i = 1; i <= 300; i++) {
    listaHTML += `
      <div class="numero-item">
        <span class="numero-badge">${i}</span>
      </div>`;
  }

  // Triplicar para efeito contínuo
  listaContainer.innerHTML = listaHTML + listaHTML + listaHTML;
  listaContainer.style.opacity = "1";
  listaContainer.style.visibility = "visible";
  listaContainer.style.display = "block";
}

// Validar e executar sorteio
function sortear() {
  const quantidade = parseInt(document.getElementById("quantity").value) || 1;
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

  const totalNumeros = ate - de + 1;

  if (naoRepetir && quantidade > totalNumeros) {
    alert(
      `Só existem ${totalNumeros} números disponíveis entre ${de} e ${ate}!`
    );
    return;
  }

  // Criar array de números disponíveis
  let numerosDisponiveis = [];
  for (let i = de; i <= ate; i++) {
    if (naoRepetir && sorteados.includes(i)) {
      continue; // Pula números já sorteados
    }
    numerosDisponiveis.push(i);
  }

  if (numerosDisponiveis.length === 0) {
    alert("Não há números disponíveis para sortear! Use o botão Resetar.");
    return;
  }

  if (quantidade > numerosDisponiveis.length) {
    alert(
      `Só existem ${numerosDisponiveis.length} números disponíveis para sortear!`
    );
    return;
  }

  // Sortear números aleatoriamente
  const numerosSorteados = [];
  const numerosTemp = [...numerosDisponiveis];

  for (let i = 0; i < quantidade; i++) {
    const indiceAleatorio = Math.floor(Math.random() * numerosTemp.length);
    const numeroSorteado = numerosTemp.splice(indiceAleatorio, 1)[0];
    numerosSorteados.push(numeroSorteado);
  }

  if (naoRepetir) {
    sorteados.push(...numerosSorteados);
  }

  // Iniciar contagem e exibir resultados
  iniciarContagem(() => {
    mostrarResultados(numerosSorteados);
  });
}

// Contagem regressiva antes do sorteio
function iniciarContagem(callback) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let contador = 3;

  const contadorDiv = document.createElement("div");
  contadorDiv.classList.add("contador");
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
function mostrarResultados(numerosSorteados) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let numeroAtual = 0;

  function mostrarProximoNumero() {
    if (numeroAtual < numerosSorteados.length) {
      const numero = numerosSorteados[numeroAtual];

      resultadoDiv.innerHTML = "";

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("sorteado-item", "numero-aparecendo");

      const ordem = document.createElement("div");
      ordem.classList.add("resultado-ordem");
      ordem.innerText = `${numeroAtual + 1}º Sorteado`;

      const numeroDiv = document.createElement("div");
      numeroDiv.classList.add("resultado-numero");
      numeroDiv.innerText = numero;

      itemDiv.appendChild(ordem);
      itemDiv.appendChild(numeroDiv);
      resultadoDiv.appendChild(itemDiv);

      numeroAtual++;

      // Próximo número ou abrir modal
      if (numeroAtual < numerosSorteados.length) {
        setTimeout(mostrarProximoNumero, 2500);
      } else {
        setTimeout(() => {
          abrirModal(numerosSorteados);
        }, 3000);
      }
    }
  }

  mostrarProximoNumero();
}

// Modal com todos os resultados
function abrirModal(numerosSorteados) {
  const modal = document.getElementById("modal-resultados");
  const numbersContainer = document.getElementById("modal-numbers");

  numbersContainer.innerHTML = "";

  numerosSorteados.forEach((numero, index) => {
    const winnerDiv = document.createElement("div");
    winnerDiv.classList.add("modal-winner");

    winnerDiv.style.opacity = "0";
    winnerDiv.style.transform = "translateY(20px)";
    winnerDiv.style.transition = "all 0.8s ease-out";

    winnerDiv.innerHTML = `
      <div class="modal-number">${numero}</div>
      <div class="modal-ordem">Sorteio #${index + 1}</div>
    `;

    numbersContainer.appendChild(winnerDiv);

    setTimeout(() => {
      winnerDiv.style.opacity = "1";
      winnerDiv.style.transform = "translateY(0)";
    }, index * 200);
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
});
