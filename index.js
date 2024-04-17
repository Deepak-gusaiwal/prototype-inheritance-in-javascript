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

// Function to show a slide
function showSlide(index,isNext=true) {
  // Hide all slides
  slideBoxes.forEach((slideBox, i) => {
    if (i !== index) {
      gsap.set(slideBox, {
        autoAlpha: 0,
      }); // Hide the slide
    }
    if (i == index) {
      gsap.from(slideBox, {
        y: isNext ? "100":"-100",
        duration: 0.2,
        opacity:0
      });
    }
  });

  // Show the current slide
  gsap.set(slideBoxes[index], { autoAlpha: 1 });
}

// Function to move to next slide
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slideBoxes.length;
  showSlide(currentSlideIndex);
}

// Function to move to previous slide
function prevSlide() {
  currentSlideIndex =
    (currentSlideIndex - 1 + slideBoxes.length) % slideBoxes.length;
  showSlide(currentSlideIndex,false);
}

// Show the initial slide
showSlide(currentSlideIndex);

// Event listeners for slide controls
document.getElementById("left").addEventListener("click", prevSlide);
document.getElementById("right").addEventListener("click", nextSlide);
