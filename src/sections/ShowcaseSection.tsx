import { useMediaQuery } from "react-responsive";
import { distributionStats } from "../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const ShowcaseSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const displayStats = isMobile ? distributionStats.slice(0, 3) : distributionStats;

  useGSAP(() => {
    const titleSplit = SplitText.create(".showcase-title", {
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".showcase-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".showcase-section",
        start: "top center",
        toggleActions: "play reverse play reverse",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".showcase-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    titleTl.to(".showcase-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
    });
  });

  return (
    <section className="showcase-section">
      <img
        src="/images/slider-dip.png"
        alt=""
        className="w-full object-cover"
      />

      <img src="/images/big-img.png" alt="" className="big-img" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="showcase-title">Already a Hit</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="showcase-text-scroll place-self-start"
            >
              <div className="bg-brand-mid pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-cream">Before Launch</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph text-brand-dark">
              Every Bombay Canvas series launches with distribution across our
              owned pages, 200+ creator channels, and our own OTT platform.
            </p>
          </div>
        </div>

        <div className="showcase-box">
          <div className="list-wrapper">
            {displayStats.map((stat, index) => (
              <div key={index} className="relative flex-1 col-center">
                <div>
                  <p className="md:text-lg font-paragraph">{stat.label}</p>
                  <p className="font-paragraph text-sm mt-2">over</p>
                  <p className="text-2xl md:text-4xl tracking-tighter font-bold">
                    {stat.amount}
                  </p>
                </div>

                {index !== displayStats.length - 1 && (
                  <div className="spacer-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
