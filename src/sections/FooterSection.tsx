import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const FooterSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    const titleSplit = SplitText.create(".footer-title", {
      type: "chars",
    });

    gsap.from(titleSplit.chars, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 75%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".footer-social", {
      yPercent: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 60%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(".footer-links", {
      yPercent: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer-links",
        start: "top 90%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <section className="footer-section">
      <div className="w-full h-32 bg-gradient-to-b from-brand to-[#222123]" />

      <div className="min-h-dvh relative md:pt-[20vh] pt-[10vh]">
        <div className="overflow-hidden z-10">
          <h1 className="footer-title general-title text-center text-milk py-5">
            #BOMBAYCANVAS
          </h1>
        </div>

        {isMobile ? (
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-brand/20 to-transparent" />
        ) : (
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten"
          />
        )}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="footer-social social-btn">
            <img src="/images/yt.svg" alt="YouTube" />
          </div>
          <div className="footer-social social-btn">
            <img src="/images/insta.svg" alt="Instagram" />
          </div>
          <div className="footer-social social-btn">
            <img src="/images/tiktok.svg" alt="TikTok" />
          </div>
        </div>

        <div className="footer-links mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Shows</p>
            </div>
            <div>
              <p>For Brands</p>
              <p>For Creators</p>
              <p>Our OTT</p>
            </div>
            <div>
              <p>Company</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Want to create a show for your brand? Get in touch and let's
              build something audiences actually want to watch.
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans placeholder:text-[#999999] bg-transparent outline-none text-milk"
              />
              <img src="/images/arrow.svg" alt="Submit" />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright &copy; 2026 Bombay Canvas — All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
