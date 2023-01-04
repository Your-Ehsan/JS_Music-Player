/**
|--------------------------------------------------
| script for carousel of main section
|--------------------------------------------------
*/

const carousel = [...document.querySelectorAll(".section--carousel img")];

let carouselImageIndex = 0;

const ChangeCarousel = () => {
  carousel[carouselImageIndex].classList.toggle("active");

  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }
  carousel[carouselImageIndex].classList.toggle("active");
};

setInterval(() => {
  ChangeCarousel();
}, 3000);

/**
|--------------------------------------------------
| Naviagtion toggling for music player
|--------------------------------------------------
*/

const MusicPlayerSection = document.querySelector(".MusicPlayer");

let clickCount = 1;

MusicPlayerSection.addEventListener("click", () => {
  if (clickCount >= 2) {
    MusicPlayerSection.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

const CloseBtnMusic = document.querySelector(".icons-container .back-btn");

CloseBtnMusic.addEventListener("click", () => {
  MusicPlayerSection.classList.remove("active");
});

/**
|--------------------------------------------------
| Toggling PlayList area 
|--------------------------------------------------
*/

const PlayList = document.querySelector(".PlayList");
const OpnBtnPlayList = document.querySelector(".icons-container .nav-btn");
const closeBtnPlayList = document.querySelector(
  ".PlayList--heading-container .back-btn"
);

OpnBtnPlayList.addEventListener("click", () => {
  PlayList.classList.add("active");
});

closeBtnPlayList.addEventListener("click", () => {
  PlayList.classList.remove("active");
});

/**
|--------------------------------------------------
| Music player scripting 
|--------------------------------------------------
*/
let CurrentMusic = 0;
const Music = document.querySelector("#audio-source");

const SeekBar = document.querySelector(".MusicPlayer--SeekBar");
const CurrentSong = document.querySelector(".MusicPlayer--currentSong");
const ArtistName = document.querySelector(".MusicPlayer--artist");
const CoverImg = document.querySelector(".MusicPlayer--cover");
const DurationTime = document.querySelector(".durationTime");
const CurrentTime = document.querySelector(".currentTime");

// queue section const
const queue = [...document.querySelectorAll(".PlayList--Queue")];

const Redo = document.querySelector(".Redo");
const Play = document.querySelector(".Play");
const Pause = document.querySelector(".Pause");
const ForWard = document.querySelector(".ForWard");
const BackWard = document.querySelector(".BackWard");

const QueueCoverImg = document.querySelector(".PlayList--Queue-cover img");
const QueueName = document.querySelector(".PlayList--Queue-name");

const Volume = document.querySelector(".Volume");
const VolumeSlider = document.querySelector(".volume-slider");

Play.addEventListener("click", () => {
  Music.play();
  Play.classList.remove("active");
  Pause.classList.add("active");
});

Pause.addEventListener("click", () => {
  Music.pause();
  Pause.classList.remove("active");
  Play.classList.add("active");
});

// Setup music ;)
let songs = [
  {
    Name: "song 1",
    Artist: "Artist 1",
    ImgSrc: "./assets/images/img_1.jpg",
    Path: "./assets/music/song_1.mp3",
  },
  {
    Name: "song 2",
    Artist: "Artist 2",
    ImgSrc: "./assets/images/img_2.jpg",
    Path: "./assets/music/song_2.mp3",
  },
  {
    Name: "song 3",
    Artist: "Artist 3",
    ImgSrc: "./assets/images/img_3.jpg",
    Path: "./assets/music/song_3.mp3",
  },
];

const setMusic = (E) => {
  SeekBar.value = 0;
  let song = songs[E];

  CurrentMusic = E;

  Music.src = song.Path;
  CurrentSong.innerHTML = song.Name;
  ArtistName.innerHTML = song.Artist;
  CoverImg.src = song.ImgSrc;

  setTimeout(() => {
    SeekBar.max = Music.duration;
    DurationTime.innerHTML = formatTime(Music.duration); // duration is audio's attribute & DurationTime is the const
  }, 300);

  CurrentTime.innerHTML = "00 : 00";

  queue.forEach((ITEM) => ITEM.classList.remove("active"));
  queue[CurrentMusic].classList.add("active");
};
setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0` + sec;
  }
  return `${min} : ${sec}`;
};

// seek bar scripting
setInterval(() => {
  SeekBar.value = Music.currentTime;
  CurrentTime.innerHTML = formatTime(Music.currentTime);
  if (Math.floor(Music.currentTime) == Math.floor(SeekBar.max)) {
    if (Redo.className.includes("active")) {
      setMusic(CurrentMusic);
      Play.click();
    } else {
      ForWard.click();
    }
  }
}, 500); // currentTime is audio's attribute & CurrentTime is the const

// This is for seekbar value when its value changed by user then the currentTime value of Music will equals to seekBar's value
SeekBar.addEventListener("change", () => {
  Music.currentTime = SeekBar.value;
});

//  Forward and backward scripting

ForWard.addEventListener("click", () => {
  if (CurrentMusic >= songs.length - 1) {
    CurrentMusic = 0;
  } else {
    CurrentMusic++;
  }
  setMusic(CurrentMusic);
  Play.click();
});

BackWard.addEventListener("click", () => {
  if (CurrentMusic <= 0) {
    CurrentMusic = songs.length - 1;
  } else {
    CurrentMusic--;
  }
  setMusic(CurrentMusic);
  Play.click();
});

Redo.addEventListener("click", () => {
  Redo.classList.toggle("active");
});

// volume controlling script
Volume.addEventListener("click", () => {
  Volume.classList.toggle("active");
  VolumeSlider.classList.toggle("active");
});

VolumeSlider.addEventListener("input", () => {
  Music.volume = VolumeSlider.value;
});

/**
|--------------------------------------------------
| PlayList Area Scripting 
|--------------------------------------------------
*/
queue.forEach((ITEM, E) => {
  ITEM.addEventListener("click", () => {
    setMusic(E);
    Play.click();
  });
});

/**
|--------------------------------------------------
| Adding songs from the databases in default html
|--------------------------------------------------
*/

// queue.forEach(() => {
// })

const QueueContainer = document.querySelector(".PlayList--Queue-container");
const QueueData = songs.map((props) => {
  return ` <div class="PlayList--Queue">
  <div class="PlayList--Queue-cover">
    <img src=${props.ImgSrc} alt="">
    <i class="fa fa-pause"></i>
  </div>
  <p class="PlayList--Queue-name">${props.Name}</p>
</div>`;
});
QueueContainer.innerHTML = QueueData;
console.log(QueueData);
