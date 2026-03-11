import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "../components/NavBar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const UpcomingSeries = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 3, effects: true });
    smoother.scrollTo(0, false);
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    const split = SplitText.create(".us-title", { type: "chars" });
    gsap.from(split.chars, {
      yPercent: 120,
      stagger: 0.025,
      ease: "power3.out",
      duration: 1,
      delay: 0.3,
    });
    gsap.from(".us-sub", { opacity: 0, y: 30, duration: 0.8, delay: 0.9, ease: "power2.out" });
    gsap.from(".us-card", {
      opacity: 0,
      y: 60,
      stagger: 0.12,
      duration: 0.9,
      delay: 1.1,
      ease: "power2.out",
    });
  });

  const placeholderShows = [
    { label: "Series 01", tag: "Food · Travel", season: "Coming 2025" },
    { label: "Series 02", tag: "Culture · Docs", season: "Coming 2025" },
    { label: "Series 03", tag: "Crime · Drama", season: "Coming 2026" },
    { label: "Series 04", tag: "Comedy · Shorts", season: "Coming 2026" },
  ];

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Hero band */}
          <section className="relative min-h-dvh bg-brand-dark flex flex-col justify-end pb-16 px-6 md:px-16 overflow-hidden pt-32">
            {/* background decorative circles */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-[8%] right-[6%] w-[40vw] h-[40vw] rounded-full border border-white/5" />
              <div className="absolute bottom-[10%] left-[2%] w-[25vw] h-[25vw] rounded-full border border-brand/20" />
            </div>

            <div className="relative z-10 overflow-hidden mb-6">
              <h1
                className="us-title uppercase font-black text-cream leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 11rem)" }}
              >
                Upcoming
                <br />
                Series
              </h1>
            </div>
            <p className="us-sub font-paragraph text-cream/60 max-w-lg text-lg leading-relaxed">
              Branded micro-series currently in development — built for Reels,
              Shorts, and creator networks. Stay tuned.
            </p>
          </section>

          {/* Series grid */}
          <section className="bg-[#222123] py-24 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {placeholderShows.map((show, i) => (
                <div
                  key={i}
                  className="us-card group relative bg-brand-dark/50 border border-cream/10 rounded-2xl overflow-hidden cursor-pointer hover:border-brand/50 transition-colors"
                >
                  {/* placeholder poster */}
                  <div className="h-72 bg-gradient-to-br from-brand-dark via-brand/20 to-brand-dark flex items-end p-6">
                    <span className="font-paragraph text-cream/30 text-sm uppercase tracking-widest">
                      Poster · Coming Soon
                    </span>
                  </div>
                  <div className="p-6 flex justify-between items-end">
                    <div>
                      <p className="font-paragraph text-cream/40 text-xs uppercase tracking-widest mb-1">
                        {show.tag}
                      </p>
                      <h2
                        className="text-cream font-bold uppercase tracking-tight"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                      >
                        {show.label}
                      </h2>
                    </div>
                    <span className="font-paragraph text-brand text-sm">{show.season}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA strip */}
          <section className="bg-brand py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2
              className="font-black uppercase text-brand-dark leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            >
              Want your
              <br />
              brand in one?
            </h2>
            <div className="bg-brand-dark text-cream font-bold uppercase text-lg rounded-full px-12 py-4 cursor-pointer hover:bg-black transition-colors">
              Pitch Us
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default UpcomingSeries;
