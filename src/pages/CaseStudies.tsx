import { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "../components/NavBar";
import fallbackImage from "../../public/assets/landing.png";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const CaseStudies = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= API ================= */

  useEffect(() => {
    axios
      .get(
        "https://bombay-canvas-new-dev-v2-1018893063821.asia-south1.run.app/api/get-links",
      )
      .then((res) => {
        const allLinks = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setLinks(allLinks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ================= GSAP ================= */

  useGSAP(() => {
    ScrollSmoother.create({ smooth: 3, effects: true });

    const split = SplitText.create(".cs-title", { type: "chars" });

    gsap.from(split.chars, {
      yPercent: 120,
      stagger: 0.03,
      ease: "power3.out",
      duration: 1,
      delay: 0.3,
    });

    gsap.from(".cs-sub", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.9,
    });

    gsap.from(".cs-card", {
      opacity: 0,
      y: 50,
      stagger: 0.08,
      duration: 0.7,
      delay: 1,
    });
  });

  return (
    <main>
      <NavBar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* HERO */}

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

            <p className="cs-sub text-cream/60 max-w-xl text-lg">
              Real results from branded shows we've produced — numbers that
              matter to marketing teams.
            </p>
          </section>

          {/* CARDS */}

          <section className="bg-brand-dark py-24 px-6 md:px-16">
            <div className="max-w-[1600px] mx-auto">
              {loading && (
                <div className="text-center text-white/40 text-lg">
                  Loading case studies...
                </div>
              )}

              {!loading && links.length === 0 && (
                <div className="text-center text-white/40 text-lg">
                  No case studies available.
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {links.map((item, i) => {
                  const image =
                    item?.image && item.image.length > 5
                      ? item.image
                      : fallbackImage;

                  const title =
                    item?.title && item.title.length > 3
                      ? item.title
                      : "Untitled Resource";

                  const description =
                    item?.description && item.description.length > 10
                      ? item.description
                      : "No description available. Click to explore the source.";

                  const domain = item?.domain || "External Source";

                  const url = item?.url || "#";

                  return (
                    <div
                      key={item.id || i}
                      onClick={() => url !== "#" && window.open(url, "_blank")}
                      className="cs-card group bg-gradient-to-b from-[#1c1c1c] to-[#141414] border border-[#1f1f1f] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:border-[#333] transition-all duration-300 flex flex-col"
                    >
                      {/* IMAGE */}

                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>

                      {/* CONTENT */}

                      <div className="p-4 flex flex-col gap-2 flex-1">
                        {/* TITLE */}

                        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
                          {title}
                        </h3>

                        {/* DESCRIPTION */}

                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                          {description}
                        </p>

                        {/* FOOTER */}

                        <div className="flex items-center justify-between text-xs pt-2 mt-auto">
                          <span className="bg-orange-500/10 text-orange-400 px-2 py-1 rounded-full font-medium">
                            {domain}
                          </span>

                          <ExternalLink
                            size={14}
                            className="text-gray-400 group-hover:text-orange-400 transition"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}

          <section className="bg-[#222123] py-20 px-6 md:px-16 flex flex-col items-center gap-6 text-center">
            <p className="text-cream/30 text-sm uppercase tracking-widest">
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
