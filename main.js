/**
|--------------------------------------------------
| script for carousel of main section
|--------------------------------------------------
*/

const carousel = document.querySelectorAll(".section--carousel img");

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
// console.log("anything")