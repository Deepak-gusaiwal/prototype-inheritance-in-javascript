function locoWithScrollTrigger(){
  gsap.registerPlugin(ScrollTrigger);
// Using Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  }
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locoWithScrollTrigger();


let tl = gsap.timeline();

//1.------------------------------- loading js
function preLoaderFun() {
  let loadingCounter = document.querySelector(".loaderCounter span.count");
  function incrementLoadCount() {
    let intial = 0;
    const initInterval = setInterval(() => {
      // console.log("calling");
      if (intial < 100) {
        intial++;
      } else {
        intial = 100;
        clearInterval(initInterval);
      }
      loadingCounter.innerText = intial;
    }, 10);
  }

  tl.from(["#loader .bound h3", "#loader .bound h4.loaderCounter"], {
    y: "150%",
    stagger: 0.2,
    duration: 0.6,
    delay: 0.5,
  });
  tl.to("#loader .bound h4.fadingInOut", {
    opacity: 0,
    animationName: "fadeInOut",
  });

  tl.from("#loader .bound h4", {
    opacity: 0,
    onStart: () => {
      incrementLoadCount();
    },
    duration: 0.5,
  });

  tl.to("#loader", {
    y: "-100%",
    opacity: 0,
    delay: 1,
  });
  tl.to("#loader", {
    display: "none",
  });
}

//2.---------------------- magnet effect
function createMagnetFun() {
  // Get the button element
  const buttons = [...document.querySelectorAll(".magnet")];

  // Add event listener for mouseenter event
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(button, { duration: 0.3, x: x, y: y });
    });

    // Add event listener for mouseleave event
    button.addEventListener("mouseleave", () => {
      // Define the reverse animation on mouse leave
      gsap.to(button, { duration: 0.3, x: "0px", y: "0px" });
    });
  });
}

//3.-------------------- hero Section
function heroAnimFun() {
  gsap.from(".heroSection .bound>*", {
    y: 150,
    stagger: 0.5,
    duration: 0.2,
    delay: 0.2,
    ease: "elastic.out(1,0.3)",
  });

  let videoSection = document.querySelector(".heroSection .videoSection");
  let video = document.querySelector(".heroSection .videoSection video");
  let playBoxIcon = document.querySelector(
    ".heroSection .videoSection span.playBox"
  );
  let videoPlayed = false;
  videoSection.addEventListener("click", () => {
    videoPlayed = !videoPlayed;
    gsap.to(playBoxIcon, {
      display: videoPlayed ? "none" : "flex",
    });
    videoPlayed ? video.play() : video.pause();
  });

  const { height, width, left, right, top, bottom } =
    videoSection.getBoundingClientRect();
  videoSection.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    // const topVal = ((clientY - top) / height) * 100;
    // console.log(top, clientY, ((clientY - top) / height) * 100);
    let xVal = clientX;
    let yVal = clientY;
    //for calc xVal;
    if (clientX > right) {
      xVal = right - 50;
    } else if (clientX < left) {
      xVal = left + 50;
    }
    //for calc yVal;
    if (clientY < top) {
      yVal = top + 50;
    } else if (clientY > bottom) {
      yVal = bottom - 50;
    }
    // console.log(bottom, top, clientY, yVal);
    gsap.to(".heroSection .videoSection span.playBox", {
      // left: clientX - left,
      // top: clientY - top,
      left: xVal,
      top: yVal,
    });
  });

  videoSection.addEventListener("mouseleave", () => {
    gsap.to(".heroSection .videoSection span.playBox", {
      left: "50%",
      top: "50%",
    });
  });
}

//4----------------------- move cursor
function movingCursorFun() {
  document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    gsap.to("#cursor", {
      left: clientX,
      top: clientY,
    });
  });
}

//5 ------------------------- horizontalBar
function horizontalBarFun() {
  let scrollbarContainers = [
    ...document.querySelectorAll(".scrollbarContainer"),
  ];
  scrollbarContainers.forEach((scrollbarContainer) => {
    let newScrollItems = scrollbarContainer.children[0].cloneNode(true);
    newScrollItems.classList.add("clonedScrollItem");
    // console.log(newScrollItems);

    scrollbarContainer.appendChild(newScrollItems);
  });
}

preLoaderFun();
movingCursorFun();
createMagnetFun();
heroAnimFun();
horizontalBarFun();
