function heroSlider() {
  // Get all slide boxes
  const slideBoxes = document.querySelectorAll(".slideBox");
  //   slider pagination
  let slidePagination = document.querySelector(
    ".sliderContainer .slidePagination"
  );
  let autoSlideInterVal;
  let slideAutoPlayTime = 3000;
  slideBoxes.forEach((slideBox, index) => {
    let slideIndicator = document.createElement("span");
    //append TExt
    let text = document.createTextNode(index + 1);
    slideIndicator.appendChild(text);
    // append fill
    let indicatorFill = document.createElement("span");
    indicatorFill.setAttribute("class", "fill");
    slideIndicator.appendChild(indicatorFill);
    // final append of all indicators to slidePagination container
    slidePagination.appendChild(slideIndicator);
  });

  let slideIndicators = [...slidePagination.children];
  // Set initial slide index
  let currentSlideIndex = 0;
  let isAnimating = false;

  //===================== Function to show a slide
  function showSlide(index, isNext = true) {
    // console.log("calling show slide");
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
    // slideIndicators
    slideIndicators.forEach((indicator, i) => {
      let fill = indicator.querySelector(".fill");
      // gsap.set(fill, { display: "none", scaleX:"0%" });
      if (i !== index) {
        gsap.set(indicator, { opacity: 0.5 });
        gsap.set(fill, { transform: "scaleX(0%)" });
      } else {
        gsap.set(indicator, { opacity: 1 });
        gsap.set(fill, { display: "flex" });
        gsap.to(fill, {
          transform: "scaleX(100%)",
          duration: slideAutoPlayTime / 1000,
        });
      }
    });

    // Show the current slide
    gsap.set(currentSlide, { autoAlpha: 1 });
    const image = currentSlide.querySelector(".imgBox");
    const headings = currentSlide.querySelectorAll("h2");
    let tl = gsap
      .timeline({
        onComplete: function () {
          isAnimating = false;
        },
      })
      .from(image, {
        y: isNext ? 100 : -100,
        duration: 0.5,
        opacity: 0,
      })
      .from(headings, {
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
    restartAutoPlay();
  }

  // Function to move to previous slide
  function prevSlide() {
    if (isAnimating) return;
    currentSlideIndex =
      (currentSlideIndex - 1 + slideBoxes.length) % slideBoxes.length;
    showSlide(currentSlideIndex, false);
    restartAutoPlay();
  }

  //Function to move on indicator click
  slideIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (isAnimating) return;
      showSlide(index);
      currentSlideIndex = index; // update the current slide index
      restartAutoPlay();
    });
  });

  // Show the initial slide
  showSlide(currentSlideIndex);

  function autoPlay(time = slideAutoPlayTime) {
    autoSlideInterVal = setInterval(nextSlide, time);
  }
  autoPlay();
  // Function to restart autoplay
  function restartAutoPlay() {
    clearInterval(autoSlideInterVal);
    autoPlay(); // Restart autoplay with desired time
  }
  // Event listeners for slide controls
  document.getElementById("left").addEventListener("click", prevSlide);
  document.getElementById("right").addEventListener("click", nextSlide);
}

// calling functions
heroSlider();

VanillaTilt.init(document.querySelector(".card"), {
  max: 25,
  speed: 500,
  transition: false,
});
VanillaTilt.init(document.querySelectorAll(".slideBox .imgBox"), {
  max: 25,
  speed: 400,
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".card"));

// second slider js
function sliderFun() {
  let slider2Container = document.querySelector(".slider2Container");

  slider2Container.addEventListener("mousemove", (e) => {
    let { width, left, right } = slider2Container.getBoundingClientRect();
  });
}

// scrollTrigger
let { width: parentWidth } = document
  .querySelector("#container h2")
  .parentElement.getBoundingClientRect();
// console.log(parentWidth);
gsap.to("#container h2", {
  transform: `translateX(calc(-100% + ${parentWidth}px))`,
  scrollTrigger: {
    scroller: "body",
    trigger: "#container ",
    pin: true,
    start: "top 0%",
    end: "top -100%",
    // markers: true,
    scrub: 1,
  },
});

// ------------horizontal scroller
let horizontalScrollerContainer = document.querySelector(
  "#horizontalContainer"
);
let items = document.querySelectorAll("#horizontalContainer .item");

let scrollTween = gsap.to(items, {
  x: `${-100 * (items.length - 1)}%`,
  ease: "none",
  scrollTrigger: {
    trigger: "#horizontalContainer",
    scroller: "body",
    scrub: 1,
    // markers: true,
    pin: true,
    // start:"0% 0%", // triggerVal scrollerVal
    // end:"top -200%",// triggerVal scrollerVal
    end: "+=3000",
  },
});

// animate headings of every item when it get into view
items.forEach((item) => {
  // indicatorBox in all items
  let indicatorBox = document.createElement("div");
  indicatorBox.setAttribute("class", "indicatorBox");
  item.appendChild(indicatorBox);

  // animate text
  let text = item.querySelector("h2");
  gsap.from(text, {
    y: -200,
    opacity: 0,
    // duration: 2,
    ease: "elastic",
    scrollTrigger: {
      trigger: item,
      // scroller: "body",
      containerAnimation: scrollTween,
      scrub: 2,
      // markers: true,
      start: "left center",
    },
  });
  // animate indicatorBox
  let indicatorBoxElem = item.querySelector(".indicatorBox");
  gsap.to(indicatorBoxElem, {
    left: "100%",
    scrollTrigger: {
      trigger: item,
      containerAnimation: scrollTween,
      scrub: 2,
      // markers: true,
      start: "left end",
      end: "right end",
    },
  });
});

//////////////////////////////////////// slider2 js
function slider2() {
  let slides = [...document.querySelectorAll(".slide")];
  let prv = document.querySelector(".navigators .prv");
  let next = document.querySelector(".navigators .next");

  let indicatorContainer = document.querySelector(
    "#slider2 .wrapper .indicators"
  );

  slides.forEach((_, index) => {
    indicatorContainer.innerHTML += `<span>${index + 1}</span>`;
  });
  let indicators = [
    ...document.querySelectorAll("#slider2 .wrapper .indicators span"),
  ];
  //initialize indicators
  gsap.to(indicators[0], {
    opacity: 1,
  });
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      indicatorHighlighter(index);
      showSlide(index);
    });
  });
  function indicatorHighlighter(index) {
    gsap.to("#slider2 .wrapper .indicators span", {
      opacity: 0.5,
    });
    gsap.to(indicators[index], {
      opacity: 1,
    });
  }

  let currentSlide = 0;
  function showSlide(indexToShow) {
    slides.forEach((slide) => {
      indicatorHighlighter(indexToShow);
      gsap.to(slide, {
        x: `-${indexToShow * 100}%`,
      });
    });
  }

  next.addEventListener("click", () => {
    if (currentSlide >= slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide += 1;
    }
    // console.log(currentSlide, slides.length);
    showSlide(currentSlide);
  });

  prv.addEventListener("click", () => {
    console.log("before::", currentSlide, slides.length);
    if (currentSlide <= 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide -= 1;
    }
    console.log("after::", currentSlide, slides.length);
    showSlide(currentSlide);
  });
}

slider2();
