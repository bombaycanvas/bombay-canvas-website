import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="footer-section">
      <div className="w-full h-32 bg-gradient-to-b from-brand to-[#222123]" />

      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">
            #DESIGNFORWARD
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
          <div className="social-btn">
            <img src="/images/yt.svg" alt="YouTube" />
          </div>
          <div className="social-btn">
            <img src="/images/insta.svg" alt="Instagram" />
          </div>
          <div className="social-btn">
            <img src="/images/tiktok.svg" alt="TikTok" />
          </div>
        </div>

        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Services</p>
            </div>
            <div>
              <p>Brand Identity</p>
              <p>Web Design</p>
              <p>Motion Design</p>
            </div>
            <div>
              <p>Company</p>
              <p>About</p>
              <p>Careers</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Get exclusive early access to our latest work and stay informed
              about new projects, events, and creative insights.
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
          <p>Copyright &copy; 2026 Bombay Design — All Rights Reserved</p>
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
