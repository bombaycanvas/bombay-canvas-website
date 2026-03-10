import { useGSAP } from "@gsap/react";
import { services } from "../constants";
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
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".services-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
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
        {services.map((service) => (
          <div
            key={service.title}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${service.rotation} group cursor-pointer`}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}22, ${service.color}88, ${service.color})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1108] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
              <p className="text-white/60 font-paragraph text-sm uppercase tracking-widest mb-3">
                {service.description}
              </p>
            </div>

            <h1>{service.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;
