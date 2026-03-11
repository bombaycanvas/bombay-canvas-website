import { useGSAP } from "@gsap/react";
import { shows } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const ServicesSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "2% top",
          end: `+=${scrollAmount}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".services-section", {
        x: `-${scrollAmount}px`,
        ease: "none",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".services-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="service-cards">
        {shows.map((show, i) => (
          <div
            key={i}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${show.rotation} group cursor-pointer`}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/10">
              <img
                src={show.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
