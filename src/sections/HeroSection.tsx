import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({ delay: 1 });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-stat",
        {
          yPercent: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {isTablet ? (
          <>
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light to-brand-dark" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light/50 to-brand-dark/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light/40 to-brand-dark/20" />
        )}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full border border-white/10" />
          <div className="absolute bottom-[20%] left-[5%] w-[20vw] h-[20vw] rounded-full border border-white/5" />
          <div className="absolute top-[40%] left-[50%] w-[15vw] h-[15vw] rounded-full bg-white/5" />
        </div>

        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title text-center">We Create Shows<br />For Brands</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Reels · Shorts · TV</h1>
            </div>
          </div>

          <h2>
            Branded micro-series and IPs built for Reels, Shorts and creator
            networks — with a cinematic 4:3 version ready for TV and streaming.
          </h2>

          <a
            href="https://mail.google.com/mail/?view=cm&to=creative@bombaycanvas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            <p>Work With Us</p>
          </a>

          {/* Proof strip */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 md:mt-20 mt-12">
            <div className="hero-stat text-center">
              <p className="font-bold text-2xl md:text-3xl tracking-tight">120+</p>
              <p className="font-paragraph text-white/60 text-xs md:text-sm mt-1">Episodes Produced</p>
            </div>
            <div className="hero-stat text-center">
              <p className="font-bold text-2xl md:text-3xl tracking-tight">324K+</p>
              <p className="font-paragraph text-white/60 text-xs md:text-sm mt-1">Audience Community</p>
            </div>
            <div className="hero-stat text-center">
              <p className="font-bold text-2xl md:text-3xl tracking-tight">200+</p>
              <p className="font-paragraph text-white/60 text-xs md:text-sm mt-1">Creator Distribution Partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
