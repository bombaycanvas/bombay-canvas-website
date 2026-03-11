import { showPosters } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "100% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "100% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".poster-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[8vw]">
        <h1 className="text-brand-dark first-title">Modern</h1>
        <h1 className="text-white sec-title">Story</h1>
        <h1 className="text-brand-dark third-title">Telling</h1>
      </div>

      <div className="pin-box">
        {showPosters.map((poster, index) => (
          <div
            key={index}
            className={`poster-card ${poster.translation || ""} ${poster.rotation} lg:w-32 lg:-ms-20 2xl:w-96 2xl:-ms-44 w-80 -ms-44 flex-none md:rounded-[2vw] rounded-3xl overflow-hidden 2xl:relative absolute border-[.5vw] border-brand`}
          >
            <img
              src={poster.src}
              alt={`Show poster ${index + 1}`}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
