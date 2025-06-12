// Variáveis globais
let participantesData = [];
let sorteados = [];
let sorteioAtual = 0;

// Criar lista animada de participantes
function criarListaAnimada() {
  const listaContainer = document.getElementById("lista-participantes");
  if (!listaContainer) return;

  // Se não há dados ainda, criar dados de exemplo
  if (participantesData.length === 0) {
    // Criar lista simples de exemplo para aparecer imediatamente
    let listaExemplo = "";
    for (let i = 1; i <= 100; i++) {
      listaExemplo += `<div class="participante-item">${i} - Participante ${i}</div>`;
    }
    listaContainer.innerHTML = listaExemplo + listaExemplo + listaExemplo;
  } else {
    // Ordenar participantes por número
    const participantesOrdenados = [...participantesData].sort(
      (a, b) => a.numero - b.numero
    );

    // Criar HTML da lista
    let listaHTML = "";
    participantesOrdenados.forEach((participante) => {
      listaHTML += `<div class="participante-item">${participante.numero} - ${participante.nome}</div>`;
    });

    // Triplicar a lista para criar efeito contínuo mais suave
    listaContainer.innerHTML = listaHTML + listaHTML + listaHTML;
  }

  // Forçar a exibição imediata
  listaContainer.style.opacity = "1";
  listaContainer.style.visibility = "visible";
  listaContainer.style.display = "block";
  listaContainer.style.animation = "scrollLista 600s linear infinite";
}

// Carregar dados dos participantes
async function carregarParticipantes() {
  try {
    const response = await fetch("../participantes.json");
    participantesData = await response.json();
    console.log(`Carregados ${participantesData.length} participantes`);
    criarListaAnimada();
  } catch (error) {
    console.error("Erro ao carregar participantes:", error);
    alert("Erro ao carregar participantes! Verifique o arquivo JSON.");
    participantesData = []; 
  }
}

// Função de sorteio melhorada
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

  // Filtrar participantes no intervalo especificado
  let numerosDisponiveis = participantesData.filter(
    (p) => p.numero >= de && p.numero <= ate
  );

  if (naoRepetir) {
    // Remover números já sorteados se a opção estiver marcada
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

  // Embaralhar e selecionar
  numerosDisponiveis.sort(() => Math.random() - 0.5);
  const novosSorteados = numerosDisponiveis.slice(0, quantidade);

  // Adicionar aos sorteados se não repetir estiver marcado
  if (naoRepetir) {
    sorteados.push(...novosSorteados);
  }

  // Iniciar animação de contagem
  iniciarContagem(() => {
    mostrarResultados(novosSorteados);
  });
}

// Função de contagem regressiva
function iniciarContagem(callback) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let contador = 5;

  const contadorDiv = document.createElement("div");
  contadorDiv.classList.add("contador");
  contadorDiv.style.fontSize = "60px";
  contadorDiv.style.fontWeight = "bold";
  contadorDiv.style.color = "#00ff00";
  contadorDiv.style.textAlign = "center";
  contadorDiv.style.marginTop = "100px";
  resultadoDiv.appendChild(contadorDiv);

  const intervalo = setInterval(() => {
    contadorDiv.innerText = contador;
    contador--;

    if (contador < 0) {
      clearInterval(intervalo);
      callback();
    }
  }, 700);
}

// Mostrar resultados do sorteio com delay maior
function mostrarResultados(participantesSorteados) {
  const resultadoDiv = document.getElementById("resultado-sorteio");
  resultadoDiv.innerHTML = "";

  let numeroAtual = 0;

  function mostrarProximoNumero() {
    if (numeroAtual < participantesSorteados.length) {
      const participante = participantesSorteados[numeroAtual];

      // Limpar resultado anterior
      resultadoDiv.innerHTML = "";

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("sorteado-item", "numero-aparecendo");

      const ordem = document.createElement("div");
      ordem.classList.add("resultado-ordem");
      ordem.innerText = `${numeroAtual + 1}º Resultado`;

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

      // Se ainda há números para mostrar, agendar o próximo com delay maior
      if (numeroAtual < participantesSorteados.length) {
        setTimeout(mostrarProximoNumero, 4000); // Aumentei para 4 segundos
      } else {
        // Todos os números foram mostrados, abrir modal após 5 segundos
        setTimeout(() => {
          abrirModal(participantesSorteados);
        }, 5000);
      }
    }
  }

  // Começar a mostrar os números
  mostrarProximoNumero();
}

// Função para abrir o modal com todos os resultados incluindo nomes
function abrirModal(participantesSorteados) {
  const modal = document.getElementById("modal-resultados");
  const numbersContainer = document.getElementById("modal-numbers");

  // Limpar números anteriores
  numbersContainer.innerHTML = "";

  // Adicionar cada participante sorteado com número e nome
  participantesSorteados.forEach((participante, index) => {
    const winnerDiv = document.createElement("div");
    winnerDiv.classList.add("modal-winner");

    // Definir estilos inline para garantir que apareçam
    winnerDiv.style.opacity = "0";
    winnerDiv.style.transform = "translateY(20px)";
    winnerDiv.style.transition = "all 0.8s ease-out";

    winnerDiv.innerHTML = `
      <div class="modal-number">${participante.numero}</div>
      <div class="modal-name">${participante.nome}</div>
      <div class="modal-cartela">Cartela: ${participante.cartela}</div>
    `;

    numbersContainer.appendChild(winnerDiv);

    // Animar entrada com delay
    setTimeout(() => {
      winnerDiv.style.opacity = "1";
      winnerDiv.style.transform = "translateY(0)";
    }, index * 300);
  });

  // Mostrar modal
  modal.classList.add("show");
}

// Função para fechar o modal
function fecharModal() {
  const modal = document.getElementById("modal-resultados");
  modal.classList.remove("show");
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  // Criar lista animada imediatamente
  criarListaAnimada();
  // Carregar dados dos participantes
  carregarParticipantes();
});
