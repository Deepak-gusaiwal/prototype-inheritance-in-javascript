let Path = "M 10 150 Q 400 150 790 150";
let finalPath = "M 10 150 Q 400 150 790 150";

let stringBox = document.querySelector("#string");
let { width, height, top: boxTop, left } = stringBox.getClientRects();

stringBox.addEventListener("mouseleave", () => {
  gsap.to("#string svg path", {
    attr: { d: finalPath },
  });
});

stringBox.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  Path = `M 10 150 Q ${400} ${clientY} 790 150`;
  gsap.to("#string svg path", {
    attr: { d: Path },
    ease: "elastic.out(1,0.2)",
  });
});

