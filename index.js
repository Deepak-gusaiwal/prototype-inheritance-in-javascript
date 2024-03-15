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
gsap.to('.about .wrapper img', {
    width:"100%",
    // scrollTrigger: ".about .wrapper h2"
    scrollTrigger:{
        scroller:"body",
        trigger:".about ",
        markers:true,
        start:"top 0%",
        end:"top -100%",
        scrub:2,
        pin:true
    }
})
gsap.to('.service .wrapper h1', {
    transform: "translateX(-100%)",
    scrollTrigger:{
        scroller:"body",
        trigger:".service ",
        markers:true,
        start:"top 0%",
        end:"top -100%",
        scrub:1,
        pin:true
    }
})
