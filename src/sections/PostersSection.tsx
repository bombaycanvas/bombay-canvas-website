import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { showPosters } from "../constants";

const PostersSection = () => {
  useGSAP(() => {
    gsap.from(".posters-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".posters-section",
        start: "10% top",
        end: "100% top",
        scrub: 1.5,
        pin: true,
      },
    });
  });

  return (
    <section className="posters-section bg-brand relative w-full h-[180dvh]">
      <div className="flex items-center justify-center w-full ps-52 absolute 2xl:bottom-32 lg:bottom-0 bottom-[40vh]" style={{ transform: "translateY(-500px)" }}>
        {showPosters.map((poster, index) => (
          <div
            key={index}
            className={`posters-card ${poster.translation || ""} ${poster.rotation} w-[18vw] -ms-[7.5vw] min-[2000px]:w-96 min-[2000px]:-ms-44 flex-none md:rounded-[2vw] rounded-3xl overflow-hidden relative min-[2000px]:relative border-[.5vw] border-brand`}
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

export default PostersSection;
