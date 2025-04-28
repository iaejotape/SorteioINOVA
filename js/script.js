const participantes = [
  { nome: "João de Oliveira Damasceno Junyor", cartela: "202504", numero: 65, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "João de Oliveira Damasceno Junyor", cartela: "202504", numero: 77, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Pedro Cardozo de Oliveira", cartela: "202504", numero: 66, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Pedro Cardozo de Oliveira", cartela: "202504", numero: 71, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Francisca Keila de Souza Oliveira", cartela: "202504", numero: 78, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Amanda Oliveira", cartela: "202504", numero: 79, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Amanda Oliveira", cartela: "202504", numero: 80, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Cíntia de Sousa Oliveira", cartela: "202504", numero: 61, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Cíntia de Sousa Oliveira", cartela: "202504", numero: 68, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Laís Nicolly", cartela: "202502", numero: 25, vendedor: "Ryan Batista" },
  { nome: "Emília Nunes", cartela: "202502", numero: 35, vendedor: "Ryan Batista" },
  { nome: "Emília Nunes", cartela: "202502", numero: 45, vendedor: "Diogo Bruno" },
  { nome: "Matheus Henrique dos Santos Zulian", cartela: "202504", numero: 62, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Matheus Henrique dos Santos Zulian", cartela: "202504", numero: 67, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Matheus Henrique dos Santos Zulian", cartela: "202504", numero: 73, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Matheus Henrique dos Santos Zulian", cartela: "202504", numero: 74, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Urcilene", cartela: "202506", numero: 81, vendedor: "Priscila Freitas" },
  { nome: "Urcilene", cartela: "202506", numero: 82, vendedor: "Priscila Freitas" },
  { nome: "Urcilene", cartela: "202506", numero: 83, vendedor: "Priscila Freitas" },
  { nome: "Urcilene", cartela: "202506", numero: 84, vendedor: "Priscila Freitas" },
  { nome: "Urcilene", cartela: "202506", numero: 85, vendedor: "Priscila Freitas" },
  { nome: "Izaque Nicolas Vieira de Melo", cartela: "202503", numero: 81, vendedor: "Isac Brito Matos" },
  { nome: "Urcilene", cartela: "202506", numero: 86, vendedor: "Priscila Freitas" },
  { nome: "Ravena", cartela: "202506", numero: 97, vendedor: "Priscila Freitas" },
  { nome: "Isac Brito Matos", cartela: "202504", numero: 21, vendedor: "Izaque Nicolas Vieira de Melo" },
  { nome: "Keila", cartela: "202506", numero: 89, vendedor: "Priscila Freitas" },
  { nome: "Izaque Nicolas Vieira de Melo", cartela: "202503", numero: 100, vendedor: "Isac Brito Matos" },
  { nome: "Isac Brito Matos", cartela: "202504", numero: 40, vendedor: "Izaque Nicolas Vieira de Melo" },
  { nome: "Ulgo", cartela: "202506", numero: 91, vendedor: "Priscila Freitas" },
  { nome: "Emilia", cartela: "202506", numero: 95, vendedor: "Priscila Freitas" },
  { nome: "Ulga", cartela: "202506", numero: 97, vendedor: "Priscila Freitas" },
  { nome: "Ulga", cartela: "202506", numero: 88, vendedor: "Priscila Freitas" },
  { nome: "Ulga", cartela: "202506", numero: 90, vendedor: "Priscila Freitas" },
  { nome: "Ian", cartela: "202506", numero: 98, vendedor: "Priscila Freitas" },
  { nome: "Eduardo", cartela: "202506", numero: 99, vendedor: "Priscila Freitas" },
  { nome: "Quezia Damas", cartela: "202506", numero: 87, vendedor: "Priscila Freitas" },
  { nome: "Sebasthian", cartela: "202504", numero: 74, vendedor: "Gilvan" },
  { nome: "Hugo", cartela: "202503", numero: 29, vendedor: "Gilvan" },
  { nome: "Sebasthian", cartela: "202503", numero: 22, vendedor: "Gilvan" },
  { nome: "Gilvan pai", cartela: "202503", numero: 21, vendedor: "Gilvan" },
  { nome: "Ana Maria dos Santos Oliveira", cartela: "202503", numero: 23, vendedor: "Gilvan" },
  { nome: "Luiz Eduardo", cartela: "202506", numero: 94, vendedor: "Priscila Freitas" },
  { nome: "Luiz Eduardo", cartela: "202506", numero: 100, vendedor: "Priscila Freitas" },
  { nome: "Diego Oliveira", cartela: "202502", numero: 39, vendedor: "Gilvan" },
  { nome: "Diego Oliveira", cartela: "202503", numero: 38, vendedor: "Gilvan" },
  { nome: "Victor Alexandre", cartela: "202503", numero: 37, vendedor: "Gilvan" },
  { nome: "Emanuel Veloso", cartela: "202503", numero: 36, vendedor: "Gilvan" },
  { nome: "Emanuel Veloso", cartela: "202503", numero: 35, vendedor: "Gilvan" },
  { nome: "Laércio da Silva Brito", cartela: "202504", numero: 63, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Laércio da Silva Brito", cartela: "202504", numero: 64, vendedor: "João Pedro de Oliveira Damasceno" },
  { nome: "Gian navar", cartela: "202503", numero: 34, vendedor: "Gilvan" },
  { nome: "Gian navar", cartela: "202503", numero: 33, vendedor: "Gilvan" },
  { nome: "Paulo Henrique", cartela: "202503", numero: 32, vendedor: "Gilvan" },
  { nome: "Luís Carlos", cartela: "202502", numero: 37, vendedor: "Ryan Batista" },
  { nome: "Maria Clara Amaral", cartela: "202502", numero: 48, vendedor: "Diogo Bruno" },
  { nome: "Maria Clara Amaral", cartela: "202502", numero: 60, vendedor: "Diogo Bruno" },
  { nome: "João Silva", cartela: "1", numero: 1, vendedor: "Maria" },
  { nome: "Ana Costa", cartela: "1", numero: 2, vendedor: "Pedro" },
  { nome: "Bruno Souza", cartela: "1", numero: 100, vendedor: "Fernanda" },
  { nome: "Carlos Mendes", cartela: "2", numero: 1, vendedor: "José" },
  { nome: "Patrícia Silva", cartela: "2", numero: 2, vendedor: "Ana" }
];

  
  let sorteados = [];
  let sorteioAtual = 0;
  
  function sortear() {
    const quantidade = 2; // Queremos sempre dois sorteados
    const de = parseInt(document.getElementById('min').value);
    const ate = parseInt(document.getElementById('max').value);

    if (sorteados.length === 0 || sorteioAtual >= sorteados.length) {
        let numerosDisponiveis = participantes.filter(p => 
            p.numero >= de && 
            p.numero <= ate &&
            !sorteados.some(s => s.numero === p.numero) // Exclui números já sorteados
        );

        if (numerosDisponiveis.length === 0) {
            alert('Não há números disponíveis nesse intervalo!');
            return;
        }

        numerosDisponiveis.sort(() => Math.random() - 0.5);

        sorteados = numerosDisponiveis.slice(0, quantidade);
        sorteioAtual = 0;
        document.getElementById('resultado-sorteio').innerHTML = '';
    }

    iniciarContagem(() => {
        mostrarResultado(sorteados[sorteioAtual]);
        sorteioAtual++;
    });
  }
  
  function iniciarContagem(callback) {
    const resultadoDiv = document.getElementById('resultado-sorteio');
    resultadoDiv.innerHTML = ''; // Limpa o resultado
  
    let contador = 5;
  
    const contadorDiv = document.createElement('div');
    contadorDiv.classList.add('contador');
    contadorDiv.style.fontSize = '60px';
    contadorDiv.style.fontWeight = 'bold';
    contadorDiv.style.color = '#00ff00';
    contadorDiv.style.textAlign = 'center';
    resultadoDiv.appendChild(contadorDiv);
  
    const intervalo = setInterval(() => {
      contadorDiv.innerText = contador;
      contador--;
  
      if (contador < 0) {
        clearInterval(intervalo);
        callback(); // Chama a função para mostrar o resultado depois da contagem
      }
    }, 700); // Tempo entre números da contagem (700ms = 0.7s para ficar mais dramático)
  }
  
  function mostrarResultado(participante) {
    const resultadoDiv = document.getElementById('resultado-sorteio');
    resultadoDiv.innerHTML = '';
  
    const ordem = document.createElement('div');
    ordem.classList.add('resultado-ordem');
    ordem.innerText = `${sorteioAtual + 1}º Resultado`;
  
    const numero = document.createElement('div');
    numero.classList.add('resultado-numero');
    numero.innerText = participante.numero;
  
    const infos = document.createElement('div');
    infos.classList.add('resultado-infos');
    infos.innerHTML = `
      <strong>Nome:</strong> ${participante.nome} <br>
      <strong>Cartela:</strong> ${participante.cartela} <br>
      <strong>Vendedor:</strong> ${participante.vendedor}
    `;
  
    const linha = document.createElement('hr');
    linha.classList.add('linha-divisoria');
  
    resultadoDiv.appendChild(ordem);
    resultadoDiv.appendChild(numero);
    resultadoDiv.appendChild(infos);
  }
