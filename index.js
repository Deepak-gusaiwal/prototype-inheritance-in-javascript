// old
{
  // let tl = gsap.timeline();
  // gsap.to('.about .wrapper img', {
  //     width:"100%",
  //     // scrollTrigger: ".about .wrapper h2"
  //     scrollTrigger:{
  //         scroller:"body",
  //         trigger:".about ",
  //         markers:true,
  //         start:"top 0%",
  //         end:"top -100%",
  //         scrub:2,
  //         pin:true
  //     }
  // })
  // gsap.to('.service .wrapper h1', {
  //     transform: "translateX(-100%)",
  //     scrollTrigger:{
  //         scroller:"body",
  //         trigger:".service ",
  //         markers:true,
  //         start:"top 0%",
  //         end:"top -100%",
  //         scrub:1,
  //         pin:true
  //     }
  // })
}

// Get all slide boxes
const slideBoxes = document.querySelectorAll(".slideBox");

// Set initial slide index
let currentSlideIndex = 0;
let isAnimating = false;
// Function to show a slide
function showSlide(index, isNext = true) {
  isAnimating = true;
  const currentSlide = slideBoxes[index];
  // Hide all slides except the current one
  slideBoxes.forEach((slideBox, i) => {
    if (i !== index) {
      gsap.set(slideBox, {
        autoAlpha: 0,
      }); // Hide the slide
    }
  });

  // Show the current slide
  gsap.set(currentSlide, { autoAlpha: 1 });
  const image = currentSlide.querySelector(".imgBox");
  const headings = currentSlide.querySelectorAll("h2");
  let tl = gsap.timeline({
    onComplete: function () {
      isAnimating = false;
    },
  });
  tl.from(image, {
    y: isNext ? 100 : -100,
    duration: 0.5,
    opacity: 0,
  });
  tl.from(headings, {
    x: isNext ? 100 : -100,
    duration: 0.2,
    delay: -0.5,
    opacity: 0,
  });
}

// Function to move to next slide
function nextSlide() {
  if (isAnimating) return;
  currentSlideIndex = (currentSlideIndex + 1) % slideBoxes.length;
  showSlide(currentSlideIndex);
}

// Function to move to previous slide
function prevSlide() {
  if (isAnimating) return;
  currentSlideIndex =
    (currentSlideIndex - 1 + slideBoxes.length) % slideBoxes.length;
  showSlide(currentSlideIndex, false);
}

// Show the initial slide
showSlide(currentSlideIndex);

function autoPlay(time="5000") {
  setInterval(() => {
    nextSlide();
  }, time);
}
autoPlay();
// Event listeners for slide controls
document.getElementById("left").addEventListener("click", prevSlide);
document.getElementById("right").addEventListener("click", nextSlide);
