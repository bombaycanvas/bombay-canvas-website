import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "../components/NavBar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const CanvasHQ = () => {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 3, effects: true });
    smoother.scrollTo(0, false);
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    const split = SplitText.create(".hq-title", { type: "chars" });
    gsap.from(split.chars, {
      yPercent: 120,
      stagger: 0.025,
      ease: "power3.out",
      duration: 1,
      delay: 0.3,
    });
    gsap.from(".hq-sub", { opacity: 0, y: 30, duration: 0.8, delay: 0.9, ease: "power2.out" });
    gsap.from(".hq-block", {
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.9,
      delay: 1.1,
      ease: "power2.out",
    });
  });

  const pillars = [
    {
      number: "01",
      title: "The Studio",
      body: "Our in-house production arm — cameras, crew, direction. Cinematic quality, social-first pacing.",
    },
    {
      number: "02",
      title: "Creator Network",
      body: "200+ creator distribution partners across Reels, Shorts and YouTube. Built-in audience from day one.",
    },
    {
      number: "03",
      title: "IP Library",
      body: "A growing catalogue of owned IPs available for brand partnerships and co-productions.",
    },
    {
      number: "04",
      title: "OTT Pipeline",
      body: "Every series is shot in 4:3 — ready for TV, OTT and streaming platforms alongside social.",
    },
  ];

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Hero */}
          <section className="relative min-h-dvh bg-brand flex flex-col justify-end pb-20 px-6 md:px-16 overflow-hidden pt-36">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-[5%] right-[5%] w-[45vw] h-[45vw] rounded-full border border-brand-dark/20" />
              <div className="absolute bottom-[15%] left-[0%] w-[30vw] h-[30vw] rounded-full border border-brand-dark/10" />
              <div className="absolute top-[45%] left-[55%] w-[18vw] h-[18vw] rounded-full bg-brand-dark/10" />
            </div>
            <div className="relative z-10 overflow-hidden mb-6">
              <h1
                className="hq-title uppercase font-black text-brand-dark leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 11rem)" }}
              >
                Canvas
                <br />
                HQ
              </h1>
            </div>
            <p className="hq-sub font-paragraph text-brand-dark/70 max-w-xl text-lg leading-relaxed">
              Everything that powers Bombay Canvas — our studio, creator
              network, IP library, and OTT pipeline under one roof.
            </p>
          </section>

          {/* Pillars */}
          <section className="bg-[#222123] py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="hq-block bg-brand-dark/60 border border-cream/10 rounded-2xl p-8 hover:border-brand/40 transition-colors"
                >
                  <span className="font-paragraph text-brand/50 text-xs uppercase tracking-widest">
                    {p.number}
                  </span>
                  <h3
                    className="text-cream font-bold uppercase tracking-tight mt-3 mb-4"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-paragraph text-cream/60 text-base leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats bar */}
          <section className="bg-brand-dark py-20 px-6 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-10">
              {[
                { value: "120+", label: "Episodes Produced" },
                { value: "324K+", label: "Audience Community" },
                { value: "200+", label: "Creator Partners" },
                { value: "10K+", label: "OTT Downloads" },
              ].map((s, i) => (
                <div key={i} className="hq-block text-center">
                  <p className="text-brand font-black tracking-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
                    {s.value}
                  </p>
                  <p className="font-paragraph text-cream/50 text-sm uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-brand py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2
              className="font-black uppercase text-brand-dark leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
            >
              Come visit
              <br />
              the HQ
            </h2>
            <p className="font-paragraph text-brand-dark/70 max-w-sm text-base leading-relaxed md:text-right">
              Mumbai-based. Open to brand partnerships, co-productions, and
              creator collaborations. Reach out below.
            </p>
            <div className="bg-brand-dark text-cream font-bold uppercase text-lg rounded-full px-12 py-4 cursor-pointer hover:bg-black transition-colors flex-none">
              Get in Touch
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CanvasHQ;
