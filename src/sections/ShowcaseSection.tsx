import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const ShowcaseSection = () => {
  useGSAP(() => {
    const split = SplitText.create(".cinema-title", {
      type: "chars",
    });

    gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0,
      stagger: 0.04,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".showcase-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".cinema-sub", {
      yPercent: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".showcase-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <section className="showcase-section">
      {/* Background image */}
      <img
        src="/assets/Untitled (2).png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col justify-center md:px-16 px-6 pt-10">
        <div className="overflow-hidden">
          <h1 className="cinema-title">CINEMA</h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="cinema-title">ON</h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="cinema-title">REELS</h1>
        </div>

        <p className="cinema-sub mt-6 text-white/80 font-paragraph text-sm md:text-base">
          Presented by<br />
          <span className="text-white font-medium">The Bombay Canvas</span>
        </p>
      </div>
    </section>
  );
};

export default ShowcaseSection;
