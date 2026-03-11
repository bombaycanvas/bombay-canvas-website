import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";
import { whyUsPoints } from "../constants";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 80%",
        end: "30% center",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  const classNames = ["first-title", "second-title", "third-title", "fourth-title"];

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-28 pb-20">
        <div className="col-center">
          <p>
            Why Brands Work With Us: <br />
            Because creating short-form shows isn't everyone's cup of tea.
          </p>

          <div className="mt-20 col-center">
            {whyUsPoints.map((point, i) => (
              <ClipPathTitle
                key={point.title}
                title={point.title}
                color={point.color}
                bg={point.bg}
                className={classNames[i]}
                borderColor={point.borderColor}
              />
            ))}
          </div>

          <div className="mt-16 max-w-lg">
            <p>
              It's about building characters, pacing stories for mobile screens,
              and keeping audiences hooked episode after episode. Our team works
              hands-on with some of the most popular creators across Instagram
              and TikTok.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box bg-brand pb-[20vh]">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
