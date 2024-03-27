//1.------------------------------- loading js

let tl = gsap.timeline();


let loadingCounter = document.querySelector(".loaderCounter span.count");
function incrementLoadCount(){
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


tl.from(["#loader .bound h3","#loader .bound h4.loaderCounter"], {
  y: "150%",
  stagger: 0.2,
  duration: 0.6,
  delay: 0.5,
});
tl.to("#loader .bound h4.fadingInOut", {
  opacity:0,
  animationName:"fadeInOut"
});

tl.from("#loader .bound h4",{
  opacity:0,
  onStart:()=>{
    incrementLoadCount()
  },
  duration:0.5
})

tl.to('#loader',{
  y:"-100%",
  opacity:0,
  delay:3.9
})
tl.to('#loader',{
display:'none'
})