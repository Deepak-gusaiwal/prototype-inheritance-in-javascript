let tl = gsap.timeline();

tl.from(['header .wrapper .logo', 'header .wrapper nav a'], {
    y: "-100%",
    delay: 0.2,
    stagger: 0.2,
    duration: 0.4
})
tl.from(['.heroContentContainer .bound h2'], {
    y: "100%",
    delay: -0.8,
    stagger: 0.2,
    duration: 0.4
})
tl.from(['.hero .wrapper>.bg'], {
    rotate: "260deg",
    opacity: 0,
    duration: 0.5
})
gsap.from('.about .wrapper h2', {
    rotate: "260deg",
    duration: 2,
    // scrollTrigger: ".about .wrapper h2"
    scrollTrigger:{
        scroller:"body",
        trigger:".about .wrapper h2",
        markers:true,
        start:"top 60%",
        end:"top 20%",
        scrub:2
    }
})
