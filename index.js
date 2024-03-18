function locoWithScrollTrigger(){
  gsap.registerPlugin(ScrollTrigger);
// Using Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
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




// gsap code
gsap.from("#page2 .box", {
  scale: 0,
  duration: 1,
  opacity: 0,
  rotate: 360,
  scrollTrigger: {
    trigger: "#page2 .box",
    scroller: "main",
    markers:true,
    start:"top 90%",
    end:"top 50%",
    scrub:2,
  },
});
