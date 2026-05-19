// Lista de redes sociais com nome e imagem local
const redesSociais = [
  { nome: "Instagram", imagem: "img/instagram.jpg" },
  { nome: "YouTube",   imagem: "img/youtube.jpg"   },
  { nome: "TikTok",    imagem: "img/tiktok.jpg"    },
  { nome: "X",         imagem: "img/x.jpg"         },
  { nome: "Discord",   imagem: "img/discord.jpg"   },
  { nome: "Twitch",    imagem: "img/twitch.jpg"    },
];

// Começa todos os votos zerados
const votos = new Array(redesSociais.length).fill(0);

// Guarda qual par está sendo exibido agora
let indice1, indice2;

// Seleciona os elementos da página
const cartao1    = document.getElementById("cartao1");
const cartao2    = document.getElementById("cartao2");
const resultado  = document.getElementById("resultado");
const barras     = document.getElementById("barras");
const avisoProx  = document.getElementById("proximo-aviso");

// Sorteia um novo par de redes sociais diferentes
function sortearPar() {
  indice1 = Math.floor(Math.random() * redesSociais.length);
  do {
    indice2 = Math.floor(Math.random() * redesSociais.length);
  } while (indice2 === indice1);

  // Atualiza cartão 1
  cartao1.querySelector("img").src = redesSociais[indice1].imagem;
  cartao1.querySelector("p").textContent = redesSociais[indice1].nome;

  // Atualiza cartão 2
  cartao2.querySelector("img").src = redesSociais[indice2].imagem;
  cartao2.querySelector("p").textContent = redesSociais[indice2].nome;

  // Esconde o resultado da rodada anterior
  resultado.style.display = "none";

  // Habilita os cliques nos cartões
  cartao1.style.pointerEvents = "auto";
  cartao2.style.pointerEvents = "auto";
}

// Registra o voto e mostra o placar por 3 segundos
function votar(indiceVencedor) {
  votos[indiceVencedor]++;

  // Desabilita cliques enquanto o resultado aparece
  cartao1.style.pointerEvents = "none";
  cartao2.style.pointerEvents = "none";

  mostrarResultado();

  // Aguarda 3 segundos e sorteia o próximo par
  let segundos = 3;
  avisoProx.textContent = `Próxima dupla em ${segundos}s...`;

  const contagem = setInterval(() => {
    segundos--;
    if (segundos > 0) {
      avisoProx.textContent = `Próxima dupla em ${segundos}s...`;
    } else {
      clearInterval(contagem);
      sortearPar();
    }
  }, 1000); //em milisegundos
}

// Monta o placar com barras de progresso
function mostrarResultado() {
  const totalVotos = votos.reduce((soma, v) => soma + v, 0);

  barras.innerHTML = ""; // Limpa as barras anteriores

  redesSociais.forEach((rede, i) => {
    const percentual = totalVotos > 0 ? (votos[i] / totalVotos) * 100 : 0;

    const item = document.createElement("div");
    item.classList.add("barra-item");

    item.innerHTML = `
      <span class="nome">${rede.nome}</span>
      <div class="barra-fundo">
        <div class="barra-preenchida" style="width: ${percentual}%"></div>
      </div>
      <span class="votos">${votos[i]}</span>
    `;

    barras.appendChild(item);
  });

  resultado.style.display = "block";
}

// Inicia o jogo quando a página carregar
sortearPar();