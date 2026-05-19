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
        const section = document.querySelector(".section-inner-page");
        if (section) {
            const lists = gsap.utils.toArray(".wrap-inner-list");
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: true,
            });
            lists.forEach((list) => {
                const items = gsap.utils.toArray(
                    list.querySelectorAll(".image-inner")
                );
                const total = items.length;
                items.forEach((item, index) => {
                    const progress = index / (total - 1);
                    let moveY;
                    let scrub;
                    if (progress < 0.25) {
                        moveY = gsap.utils.random(1500, 2000);
                        scrub = 1;
                    }
                    else if (progress < 0.7) {
                        moveY = gsap.utils.random(1500, 2000);
                        scrub = 1;
                    }
                    else {
                        moveY = gsap.utils.random(1500, 2000);
                        scrub = 1;
                    }
                    gsap.to(item, {
                        y: -moveY,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "+=2000",
                            scrub,
                        },
                    });
                });
            });
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        changetext();
        scrollSmooth();
        scrollInner();
    });
})(jQuery);
