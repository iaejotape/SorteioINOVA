const participantes = [
    { nome: "João de Oliveira Damasceno Junyor", numero: 65, cartela: 4, vendedor: "João Pedro de Oliveira Damasceno" },
    { nome: "João de Oliveira Damasceno Junyor", numero: 77, cartela: 4, vendedor: "João Pedro de Oliveira Damasceno" },
    { nome: "Pedro Cardozo de Oliveira", numero: 66, cartela: 4, vendedor: "João Pedro de Oliveira Damasceno" },
    { nome: "João Silva", numero: 1, cartela: 1, vendedor: "Maria" },
    { nome: "Ana Costa", numero: 2, cartela: 1, vendedor: "Pedro" },
    { nome: "Bruno Souza", numero: 100, cartela: 1, vendedor: "Fernanda" },
    { nome: "Carlos Mendes", numero: 1, cartela: 2, vendedor: "José" },
    { nome: "Patrícia Silva", numero: 2, cartela: 2, vendedor: "Ana" },
  ];
  
  // Gerar todas as cartelas
  for (let cartela = 1; cartela <= 8; cartela++) {
    for (let numero = 1; numero <= 100; numero++) {
      participantes.push({
        nome: `Pessoa ${numero}C${cartela}`, 
        numero: numero,
        cartela: cartela,
        vendedor: `Vendedor ${cartela}`
      });
    }
  }
  
  let sorteados = []; // Vai armazenar todos os sorteados
  let sorteioAtual = 0; // Vai controlar o índice do sorteado atual
  
  function sortear() {
    const quantidade = 2; // Queremos sempre dois sorteados
    const de = parseInt(document.getElementById('min').value);
    const ate = parseInt(document.getElementById('max').value);
  
    if (sorteados.length === 0 || sorteioAtual >= sorteados.length) {
      // Sorteia novos apenas se for o início ou terminou de mostrar os anteriores
      let numerosDisponiveis = participantes.filter(p => p.numero >= de && p.numero <= ate);
  
      if (numerosDisponiveis.length === 0) {
        alert('Não há números disponíveis nesse intervalo!');
        return;
      }
  
      // Embaralha os participantes
      numerosDisponiveis.sort(() => Math.random() - 0.5);
  
      // Pega os dois primeiros sorteados
      sorteados = numerosDisponiveis.slice(0, quantidade);
      sorteioAtual = 0; // Reseta para começar do primeiro
      document.getElementById('resultado-sorteio').innerHTML = ''; // Limpa o resultado anterior
    }
  
    // Mostra o próximo sorteado
    mostrarResultado(sorteados[sorteioAtual]);
    sorteioAtual++;
  }
  
  function mostrarResultado(participante) {
    const resultadoDiv = document.getElementById('resultado-sorteio');
  
    // Ordem (1º, 2º, etc)
    const ordem = document.createElement('div');
    ordem.classList.add('resultado-ordem');
    ordem.innerText = `${sorteioAtual + 1}º Resultado`;
  
    // Número sorteado grandão
    const numero = document.createElement('div');
    numero.classList.add('resultado-numero');
    numero.innerText = participante.numero;
  
    // Informações adicionais
    const infos = document.createElement('div');
    infos.classList.add('resultado-infos');
    infos.innerHTML = `
      <strong>Nome:</strong> ${participante.nome} <br>
      <strong>Cartela:</strong> ${participante.cartela} <br>
      <strong>Vendedor:</strong> ${participante.vendedor}
    `;
  
    // Linha divisória entre os resultados
    const linha = document.createElement('hr');
    linha.classList.add('linha-divisoria');
  
    // Adiciona no resultado
    resultadoDiv.appendChild(ordem);
    resultadoDiv.appendChild(numero);
    resultadoDiv.appendChild(infos);
  }
  