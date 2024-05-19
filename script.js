/// chamando variáveis
const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const buttonNext = document.getElementById("next");
const buttonPrev = document.getElementById("prev");
const backgroundVideo = document.getElementById("backgroundVideo");

// Lista de músicas
const musicas = [
  {
    src: './assets/music/The Kid LAROI, Justin Bieber - Stay.mp3',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    img: './assets/img/Stay.png',
    video: "./assets/vid/Stay.mp4",
    gradient: 'linear-gradient(to bottom right, #4D555F, #4D555F)'
  },
  {
    src: './assets/music/The Black Eyed Peas - Meet Me Halfway.mp3',
    title: 'Meet Me Halfway',
    artist: 'The Black Eyed Peas',
    img: './assets/img/Meetmehalfway.png',
    video: "./assets/vid/Meetmehalfway.mp4",
    gradient: 'linear-gradient(to bottom right, #170270, #A024B0)'
  },
  {
    src: './assets/music/Mr.Kitty - Empty Phases.mp3',
    title: 'Empty Phases',
    artist: 'Mr.Kitty',
    img: './assets/img/Emptyphases.png',
    video: "./assets/vid/Emptyphases.mp4",
    gradient: 'linear-gradient(to bottom right, #203451, #4D7089)'
  },
  {
    src: './assets/music/Ava Max - Sweet But Psycho.mp3',
    title: 'Sweet But Psycho',
    artist: 'Ava Max',
    img: './assets/img/Sweetbutpsycho.png',
    video: "./assets/vid/Sweetbutpsycho.mp4",
    gradient: 'linear-gradient(to bottom right, #BB5D83, #80202C)'
  }
];

let currentMusicIndex = 0;
let music = new Audio(musicas[currentMusicIndex].src);
let interval;

// funções

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

function loadMusic(index) {
  clearInterval(interval);
  music.src = musicas[index].src;
  backgroundVideo.src = musicas[index].video;
  backgroundVideo.pause(); // Pausar o vídeo ao carregar a música
  music.load();
  document.querySelector('.desc-musica p').textContent = musicas[index].title;
  document.querySelector('.desc-musica span').textContent = musicas[index].artist;
  document.querySelector('.conteudo-musica img').src = musicas[index].img;
  document.querySelector('.card-player').style.background = musicas[index].gradient;
  music.addEventListener('loadedmetadata', function () {
    tempoTotal.textContent = formatarTempo(music.duration);
    tempoAtual.textContent = formatarTempo(0);
    progressBar.value = 0;
  });
}

function play() {
  buttonPlay.classList.add('hide');
  buttonPause.classList.remove('hide');
  music.play();
  backgroundVideo.play(); // Inicia o vídeo de fundo
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.remove('hide');
  buttonPause.classList.add('hide');
  music.pause();
  backgroundVideo.pause(); // Pausa o vídeo de fundo
}

function next() {
  currentMusicIndex = (currentMusicIndex + 1) % musicas.length;
  loadMusic(currentMusicIndex);
  play();
}

function prev() {
  if (music.currentTime > 5 || currentMusicIndex === 0) {
    music.currentTime = 0;
    backgroundVideo.currentTime = 0; // Volta o vídeo para o início
  } else {
    currentMusicIndex = (currentMusicIndex - 1 + musicas.length) % musicas.length;
    loadMusic(currentMusicIndex);
    play();
  }
}

buttonPrev.addEventListener('click', prev);
buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
buttonNext.addEventListener('click', next);

// Carregar a primeira música na inicialização
loadMusic(currentMusicIndex);

// Pausar o vídeo ao iniciar o site
backgroundVideo.pause();
