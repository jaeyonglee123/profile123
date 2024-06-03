function showSlides(slideshowId, slideClass, slideIndex) {
  let i;
  let slides = document.querySelectorAll(`#${slideshowId} .${slideClass}`);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(() => showSlides(slideshowId, slideClass, slideIndex), 1000); // 1초마다 슬라이드 전환
}

// 슬라이드 쇼 초기화
document.addEventListener("DOMContentLoaded", () => {
  showSlides("slideshow1", "mySlides1", 0);
  showSlides("slideshow2", "mySlides2", 0);
  showSlides("slideshow3", "mySlides3", 0);
});
