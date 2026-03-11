import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { useRef, useEffect, useCallback } from "react";

const TOTAL_FRAMES = 149;
const FRAME_FOLDER = "/frames/canvas-logo";

function pad(n: number) {
  return String(n).padStart(4, "0");
}

const FooterSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef(0);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  const drawFrame = useCallback((fi: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[fi];
    if (!canvas || !ctx || !img) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  // rAF render loop — draws only when target frame changes
  useEffect(() => {
    let running = true;
    function tick() {
      if (!running) return;
      const fi = targetFrameRef.current;
      if (fi !== lastFrameRef.current) {
        drawFrame(fi);
        lastFrameRef.current = fi;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [drawFrame]);

  // Load frames
  useEffect(() => {
    sizeCanvas();
    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = `${FRAME_FOLDER}/frame_${pad(i + 1)}.png`;
      })
    );
    Promise.all(promises).then((imgs) => {
      framesRef.current = imgs;
      targetFrameRef.current = 0;
    });

    const onResize = () => { sizeCanvas(); lastFrameRef.current = -1; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sizeCanvas]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".footer-title", { type: "chars" });

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

    // Play all frames once over 3s when footer enters viewport
    if (!isMobile) {
      let animRaf = 0;
      ScrollTrigger.create({
        trigger: ".footer-section",
        start: "top bottom",
        onEnter() {
          cancelAnimationFrame(animRaf);
          targetFrameRef.current = 0;
          const duration = 3000;
          const startTime = performance.now();
          function play(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            targetFrameRef.current = Math.round(progress * (TOTAL_FRAMES - 1));
            if (progress < 1) animRaf = requestAnimationFrame(play);
          }
          animRaf = requestAnimationFrame(play);
        },
        onLeaveBack() {
          cancelAnimationFrame(animRaf);
          targetFrameRef.current = 0;
          lastFrameRef.current = -1;
        },
      });
    }

  });

  return (
    <section className="footer-section">
      <div className="w-full h-32 bg-gradient-to-b from-brand to-[#222123]" />

      <div className="min-h-dvh relative md:pt-[20vh] pt-[10vh]">

        <div className="overflow-hidden z-10 relative">
          <h1 className="footer-title general-title text-center text-milk py-5">
            #BOMBAYCANVAS
          </h1>
        </div>

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

        {/* Canvas logo — absolute, centred below social icons, no layout impact */}
        {!isMobile && (
          <canvas
            ref={canvasRef}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0"
            style={{ width: "40vw", height: "25vw", top: "48%" }}
          />
        )}

        <div className="footer-links mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-10">
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
          </div>
        </div>

        <div className="copyright-box relative z-10">
          <p>Copyright &copy; 2026 Bombay Canvas — All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
