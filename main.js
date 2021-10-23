const data = [
  {
    music: "./music/1.mp3",
    img: "./images/bg-0.jpg",
    title: "Eminem",
    name: "Lose yourself",
  },
  {
    music: "./music/2.mp3",
    img: "./images/bg-1.jpg",
    title: "Konsta",
    name: "Ishyoqar",
  },
  {
    music: "./music/3.mp3",
    img: "./images/bg-2.png",
    title: "Meduza",
    name: "Paradise",
  },
  {
    music: "./music/4.mp3",
    img: "./images/bg-3.jpg",
    title: "Djaxarov",
    name: "V momente",
  },
  {
    music: "./music/5.mp3",
    img: "./images/bg-4.jpg",
    title: "Justin Bieber",
    name: "Let me love you",
  },
  {
    music: "./music/6.mp3",
    img: "./images/bg-5.jpg",
    title: "Xcho & MR Lambo",
    name: "Day mne ogna",
  },
  {
    music: "./music/7.mp3",
    img: "./images/bg-6.jpg",
    title: "Hammali & Navai",
    name: "Chorni Meren",
  },
  {
    music: "./music/8.mp3",
    img: "./images/bg-8.jpg",
    title: "Yorqinxo'ja & Abbose",
    name: "Margarita",
  },
  {
    music: "./music/9.mp3",
    img: "./images/bg-7.jpg",
    title: "Rauf & Faik",
    name: "Delete",
  },
  {
    music: "./music/10.mp3",
    img: "./images/bg-9.jpg",
    title: "Koda Black & Travis Scot",
    name: "Zeze",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.querySelector("audio");
  const prew = document.querySelector(".prew");
  const playPauseBtns = document.querySelectorAll(".play-pause i");
  const next = document.querySelector(".next");
  const img = document.querySelector(".img img");
  const singer = document.querySelector(".singer");
  const music = document.querySelector(".music");
  const progress = document.querySelector(".progress");
  const progressLine = document.querySelector(".line");
  const ulList = document.querySelector(".ul-list");
  const item = document.querySelector(".item-lenght");
  const array = [];
  let index = 0;

  // Dynamic Section
  data.forEach((e) => {
    const newLi = document.createElement("li");
    newLi.classList.add("li");
    array.push(newLi);
    newLi.innerHTML = `<div class="title">
    <span class="name">${e.title}</span><br />
    <span class="music-name">${e.name}</span>
  </div>
  <div class="img">
    <img src="${e.img}">
  </div>
 `;
    ulList.appendChild(newLi);
  });

  item.textContent = array.length;

  playPauseBtns.forEach((playPause) => {
    playPause.addEventListener("click", playPauseFunc);

    function playPauseFunc() {
      if (playPause.classList.contains("fa-play")) {
        audio.play();
        document.querySelector("#play").style.display = "none";
        document.querySelector("#pause").style.display = "block";
        img.classList.add("play-music");
        array.forEach((list) => (list.style.background = "#252525"));
        array[index].style.background = "#1db954";
      } else {
        audio.pause();
        document.querySelector("#play").style.display = "block";
        document.querySelector("#pause").style.display = "none";
        img.classList.remove("play-music");
      }
    }
  });

  next.addEventListener("click", nextFunc);
  prew.addEventListener("click", prewFunc);
  audio.addEventListener("timeupdate", progressFunc);
  progress.addEventListener("click", skipFucn);

  function nextFunc() {
    if (data.length - 2 < index) {
      index = 0;
    } else {
      index++;
    }
    audio.src = `${data[index].music}`;
    audio.play();
    img.classList.add("play-music");
    img.src = `${data[index].img}`;
    singer.textContent = `${data[index].title}`;
    music.textContent = `${data[index].name}`;
    document.querySelector("#play").style.display = "none";
    document.querySelector("#pause").style.display = "block";
    array.forEach((list) => (list.style.background = "#252525"));
    array[index].style.background = "#1db954";
  }

  function prewFunc() {
    if (index === 0) {
      index = data.length - 1;
    } else {
      index--;
    }

    audio.src = `${data[index].music}`;
    audio.play();
    img.classList.add("play-music");
    img.src = `${data[index].img}`;
    singer.textContent = `${data[index].title}`;
    music.textContent = `${data[index].name}`;
    document.querySelector("#play").style.display = "none";
    document.querySelector("#pause").style.display = "block";
    array.forEach((list) => (list.style.background = "#252525"));
    array[index].style.background = "#1db954";
  }

  function progressFunc(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressLine.style.width = `${progressPercent}%`;

    if (progressLine.style.width === `100%`) {
      img.classList.remove("play-music");
      document.querySelector("#play").style.display = "block";
      document.querySelector("#pause").style.display = "none";
      progressLine.style.width = 0;
    }
  }

  function skipFucn(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
});
