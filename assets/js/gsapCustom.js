(function ($) {
    ("use strict");
    // DOM Ready

    gsap.registerPlugin(ScrollTrigger);
    // gsap.registerPlugin(SplitText);

    var changetext = function () {
        if ($(".text-color-change").length) {
            $(".text-color-change").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#D4D4D4" });

                gsap.to($el.charSplit.chars, {
                    color: "#000",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                        // markers: true,
                    },
                });
            });
        }
        if ($(".text-color-change-2").length) {
            $(".text-color-change-2").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#707070" });

                gsap.to($el.charSplit.chars, {
                    color: "#111111",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
        if ($(".text-color-change-3").length) {
            $(".text-color-change-3").each(function () {
                const $el = $(this)[0];

                $el.wordSplit?.revert();
                $el.charSplit?.revert();

                $el.wordSplit = new SplitText($el, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });
                $el.charSplit = new SplitText($el.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set($el.charSplit.chars, { color: "#BBBBBB" });

                gsap.to($el.charSplit.chars, {
                    color: "#1A1A1A",
                    stagger: { each: 0.03, from: "start" },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: $el,
                        start: "top 90%",
                        end: "bottom 35%",
                        scrub: 1.5,
                        toggleActions: "play none none reverse",
                    },
                });
            });
        }
    };

    /* Scroll Smooth
    -------------------------------------------------------------------------*/
    var scrollSmooth = () => {
        if (typeof Lenis === "undefined") return;
        if (window.lenis) return;

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            prevent: (node) => {
                return node.closest(
                    '.modal, .offcanvas, .offcanvas-backdrop'
                );
            }
        });

        window.lenis = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    };

    /* Scroll Inner
    -------------------------------------------------------------------------*/
    var scrollInner = () => {

        const init = () => {

            const section = document.querySelector(".section-inner-page");

            if (!section) return;

            ScrollTrigger.getAll().forEach((st) => {

                if (st.vars.trigger === section) {
                    st.kill();
                }

            });

            gsap.killTweensOf(
                section.querySelectorAll(".image-inner")
            );

            const lists = gsap.utils.toArray(
                section.querySelectorAll(".wrap-inner-list")
            );

            ScrollTrigger.create({
                trigger: section,
                start: "center center",
                end: "+=2000",
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
            });

            lists.forEach((list) => {

                const items = gsap.utils.toArray(
                    list.querySelectorAll(".image-inner")
                );

                const total = items.length;

                items.forEach((item, index) => {

                    const progress = index / (total - 1);

                    let moveY = gsap.utils.random(1500, 2000);

                    if (progress > 0.7) {
                        moveY *= 1.2;
                    }

                    gsap.to(item, {

                        y: -moveY,
                        ease: "none",
                        force3D: true,

                        scrollTrigger: {
                            trigger: section,
                            start: "center center",
                            end: "+=2000",
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },

                    });

                });

            });

            ScrollTrigger.refresh();

        };

        init();

        let resizeTimer;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                init();

            }, 200);

        });

    };

    var handleHeroPinOnSection = function () {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }
    
        gsap.registerPlugin(ScrollTrigger);
    
        var hero = document.querySelector('.hero-landing');
        var targetSection = document.querySelector('.section-design-testimonial');
    
        if (!hero || !targetSection) return;
    
        ScrollTrigger.create({
            trigger: targetSection,
            start: 'top bottom',
            end: 'bottom top',
            pin: hero,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true
        });
    };

    document.addEventListener("DOMContentLoaded", function () {
        changetext();
        scrollSmooth();
        scrollInner();
        handleHeroPinOnSection();
    });
})(jQuery);
