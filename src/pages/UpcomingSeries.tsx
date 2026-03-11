import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { Heart, User, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import NavBar from "../components/NavBar";
import { createPortal } from "react-dom";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&h=600&q=80";

const PRODUCTION_SIZES = ["SMALL", "MEDIUM", "LARGE"];

const UpcomingSeries = () => {
  const [series, setSeries] = useState([]);
  const [selected, setSelected] = useState(null);

  const [productionSize, setProductionSize] = useState("ALL");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const smootherRef = useRef(null);
  const scrollPosition = useRef(0);
  /* ================= FETCH API ================= */

  useEffect(() => {
    axios
      .get(
        "https://bombay-canvas-new-dev-v2-1018893063821.asia-south1.run.app/api/filter-upcoming-series",
      ) // change to your API
      .then((res) => {
        setSeries(res.data?.upcomingSeries || []);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto";
  }, [selected]);
  const genres = useMemo(() => {
    return [
      ...new Set(series.flatMap((s) => s.genres?.map((g) => g.name) || [])),
    ];
  }, [series]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  /* ================= FILTER ================= */

  const filteredSeries = series.filter((s) => {
    if (productionSize !== "ALL" && s.productionSize !== productionSize)
      return false;

    if (selectedGenres.length > 0) {
      const seriesGenres = s.genres?.map((g) => g.name) || [];
      return selectedGenres.some((g) => seriesGenres.includes(g));
    }

    return true;
  });

  /* ================= GSAP ================= */

  useGSAP(() => {
    const smoother = ScrollSmoother.create({ smooth: 3, effects: true });
    smoother.scrollTo(0, false);

    const split = SplitText.create(".us-title", { type: "chars" });

    gsap.from(split.chars, {
      yPercent: 120,
      stagger: 0.03,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".us-sub", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8,
    });
  });

  return (
    <main>
      <NavBar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* ================= HERO ================= */}

          <section className="relative min-h-dvh bg-brand-dark flex flex-col justify-end pb-16 px-6 md:px-16 pt-32">
            <div className="overflow-hidden mb-6">
              <h1
                className="us-title uppercase font-black text-cream leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 11rem)" }}
              >
                Upcoming
                <br />
                Series
              </h1>
            </div>

            <p className="us-sub text-cream/60 max-w-lg text-lg">
              Branded micro-series currently in development.
            </p>
          </section>

          {/* ================= FILTERS ================= */}

          <section className="bg-[#222123] pt-16 pb-6 px-6 md:px-16">
            {/* production filter */}

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setProductionSize("ALL")}
                className={`px-4 py-1 rounded-md text-sm ${
                  productionSize === "ALL" ? "bg-orange-500" : "bg-neutral-800"
                }`}
              >
                All
              </button>

              {PRODUCTION_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setProductionSize(size)}
                  className={`px-4 py-1 rounded-md text-sm ${
                    productionSize === size ? "bg-orange-500" : "bg-neutral-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* genre filter */}

            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleGenre(g)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    selectedGenres.includes(g)
                      ? "bg-orange-500"
                      : "bg-neutral-800"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </section>

          {/* ================= CARDS ================= */}

          <section className="bg-[#222123] pb-24 px-6 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredSeries.map((s) => (
                <div
                  key={s.id}
                  className="group bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/40 transition cursor-pointer flex flex-col"
                >
                  {/* Poster */}

                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={s.posterImage || DEFAULT_POSTER}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content */}

                  <div className="p-4 flex flex-col flex-1">
                    {/* Title */}

                    <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-2">
                      {s.seriesName}
                    </h3>

                    {/* Creator */}

                    <div className="flex items-center gap-2 text-[11px] bg-orange-500/90 px-2 py-1 rounded w-fit mb-2">
                      <User size={12} />
                      <span className="truncate max-w-[120px]">
                        {s.uploader?.name || "Unknown"}
                      </span>
                    </div>

                    {/* Synopsis */}

                    <p className="text-[12px] text-white/60 leading-relaxed line-clamp-3">
                      {s.briefSynopsis || "No synopsis available."}
                    </p>

                    {/* Actions */}

                    <div className="mt-auto pt-4">
                      <button
                        onClick={() => setSelected(s)}
                        className="w-full border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 rounded-md py-2 text-[12px] font-medium transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= MODAL ================= */}

          {selected &&
            createPortal(
              <div
                className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 z-[9999] overflow-y-auto"
                onClick={() => setSelected(null)}
              >
                <div
                  className="bg-[#1a1a1a] rounded-2xl max-w-5xl w-full grid md:grid-cols-[380px_1fr] overflow-hidden border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Poster */}
                  <div className="h-full">
                    <img
                      src={selected.posterImage || DEFAULT_POSTER}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 relative overflow-y-auto max-h-[90vh]">
                    {/* Close Button */}

                    <button
                      onClick={() => setSelected(null)}
                      className="absolute right-5 top-5 bg-black/40 hover:bg-orange-500 transition rounded-lg p-2"
                    >
                      <X size={20} />
                    </button>

                    {/* Title */}

                    <h2 className="text-3xl font-bold text-white mb-4">
                      {selected.seriesName}
                    </h2>

                    {/* Creator */}

                    <div className="flex items-center gap-2 text-sm bg-orange-500 px-3 py-1 rounded w-fit mb-5">
                      <User size={14} />
                      {selected.uploader?.name || "Unknown Creator"}
                    </div>

                    {/* Synopsis */}

                    <div className="mb-6">
                      <p className="text-white/70 leading-relaxed">
                        {selected.briefSynopsis || "No synopsis available."}
                      </p>
                    </div>

                    {/* Info Grid */}

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-white/40 text-xs mb-1">
                          Production Size
                        </p>
                        {selected.productionSize || "N/A"}
                      </div>

                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-white/40 text-xs mb-1">
                          Estimated Views
                        </p>
                        {selected.estimatedViews || "N/A"}
                      </div>

                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-white/40 text-xs mb-1">Shoot Date</p>
                        {selected.plannedShootDate
                          ? new Date(selected.plannedShootDate).toDateString()
                          : "TBD"}
                      </div>
                    </div>

                    {/* Genres */}

                    {selected.genres?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-white/40 text-sm mb-2">Genres</p>

                        <div className="flex flex-wrap gap-2">
                          {selected.genres.map((g) => (
                            <span
                              key={g.name}
                              className="bg-neutral-800 text-xs px-3 py-1 rounded-full"
                            >
                              {g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reference Links */}

                    {selected.referenceLinks?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-white/40 text-sm mb-2">
                          Reference Links
                        </p>

                        <div className="flex flex-col gap-2">
                          {selected.referenceLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-orange-400 text-sm hover:underline break-all"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reference PDF */}

                    {selected.referencePdf && (
                      <a
                        href={`https://storage.googleapis.com/bombay_canvas_buckett/${selected.referencePdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 bg-gradient-to-r from-orange-500 to-orange-400 hover:opacity-90 transition px-6 py-3 rounded-lg text-sm font-semibold"
                      >
                        Download Reference PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>,
              document.body,
            )}
        </div>
      </div>
    </main>
  );
};

export default UpcomingSeries;
