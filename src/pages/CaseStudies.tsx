import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "../components/NavBar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const CaseStudies = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 3, effects: true });
    smoother.scrollTo(0, false);
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    const split = SplitText.create(".cs-title", { type: "chars" });
    gsap.from(split.chars, {
      yPercent: 120,
      stagger: 0.025,
      ease: "power3.out",
      duration: 1,
      delay: 0.3,
    });
    gsap.from(".cs-sub", { opacity: 0, y: 30, duration: 0.8, delay: 0.9, ease: "power2.out" });
    gsap.from(".cs-item", {
      opacity: 0,
      x: -40,
      stagger: 0.15,
      duration: 0.9,
      delay: 1.1,
      ease: "power2.out",
    });
  });

  const cases = [
    {
      brand: "Brand A",
      series: "The Great Indian Heist",
      metric1: "2.4M views",
      metric2: "3× engagement lift",
      category: "Crime · Drama",
    },
    {
      brand: "Brand B",
      series: "Flavours of a Billion",
      metric1: "1.8M views",
      metric2: "42% brand recall",
      category: "Food · Culture",
    },
    {
      brand: "Brand C",
      series: "Who Are We",
      metric1: "900K views",
      metric2: "5× follower growth",
      category: "Identity · Docs",
    },
  ];

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Hero */}
          <section className="relative min-h-[70vh] bg-[#222123] flex flex-col justify-end pb-16 px-6 md:px-16 overflow-hidden pt-36">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 overflow-hidden mb-6">
              <h1
                className="cs-title uppercase font-black text-cream leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 11rem)" }}
              >
                Case
                <br />
                Studies
              </h1>
            </div>
            <p className="cs-sub font-paragraph text-cream/60 max-w-xl text-lg leading-relaxed">
              Real results from branded shows we've produced — numbers that
              matter to marketing teams.
            </p>
          </section>

          {/* Case list */}
          <section className="bg-brand-dark py-24 px-6 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col divide-y divide-cream/10">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="cs-item group py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-paragraph text-cream/30 text-sm pt-1 w-8 flex-none">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-paragraph text-brand text-xs uppercase tracking-widest mb-1">
                        {c.brand} · {c.category}
                      </p>
                      <h2
                        className="text-cream font-bold uppercase tracking-tight group-hover:text-brand transition-colors"
                        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
                      >
                        {c.series}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-10 md:text-right pl-14 md:pl-0">
                    <div>
                      <p className="text-cream font-bold text-xl">{c.metric1}</p>
                      <p className="font-paragraph text-cream/40 text-xs uppercase tracking-wider mt-1">
                        Organic Reach
                      </p>
                    </div>
                    <div>
                      <p className="text-brand font-bold text-xl">{c.metric2}</p>
                      <p className="font-paragraph text-cream/40 text-xs uppercase tracking-wider mt-1">
                        Brand Impact
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placeholder note */}
          <section className="bg-[#222123] py-20 px-6 md:px-16 flex flex-col items-center gap-6 text-center">
            <p className="font-paragraph text-cream/30 text-sm uppercase tracking-widest">
              More case studies — Coming soon
            </p>
            <div className="bg-brand text-brand-dark font-bold uppercase text-lg rounded-full px-12 py-4 cursor-pointer hover:bg-cream transition-colors">
              Work With Us
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CaseStudies;
