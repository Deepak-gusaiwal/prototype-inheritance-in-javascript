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
    }, 40);
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
    delay: 3.9,
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

preLoaderFun();
createMagnetFun();
heroAnimFun();
movingCursorFun();
