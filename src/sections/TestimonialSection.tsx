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

  });

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[8vw]" style={{ transform: "translateY(-60px)" }}>
        <h1 className="text-brand-dark first-title">Modern</h1>
        <h1 className="text-white sec-title">Story</h1>
        <h1 className="text-brand-dark third-title">Telling</h1>
      </div>

    </section>
  );
};

export default TestimonialSection;
