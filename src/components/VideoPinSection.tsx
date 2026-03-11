import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";

const TOTAL_FRAMES = 79;
const FRAME_FOLDER = "/frames/hero-video";

function pad(n: number) {
  return String(n).padStart(4, "0");
}

const VideoPinSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const rafIdRef = useRef(0);
  const targetFrameRef = useRef(0);
  const videoBoxRef = useRef<HTMLDivElement>(null);

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

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // rAF render loop — decoupled from scroll events
  useEffect(() => {
    let running = true;

    function tick() {
      if (!running) return;
      const fi = targetFrameRef.current;
      if (fi !== lastFrameRef.current) {
        drawFrame(fi);
        lastFrameRef.current = fi;
      }
      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Load all frames on mount
  useEffect(() => {
    sizeCanvas();

    // Load all frames in parallel (no batching — faster)
    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // don't break on missing frames
        img.src = `${FRAME_FOLDER}/frame_${pad(i + 1)}.jpg`;
      })
    );

    Promise.all(promises).then((imgs) => {
      framesRef.current = imgs;
      targetFrameRef.current = 0;
    });

    const handleResize = () => {
      sizeCanvas();
      lastFrameRef.current = -1; // force redraw
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sizeCanvas]);

  useGSAP(() => {
    if (isMobile) return;

    // Cache the videoBox element once
    const videoBox = videoBoxRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: ".vd-pin-section",
        start: "-15% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
        onUpdate(self) {
          const p = self.progress;

          // Set target frame — the rAF loop picks it up
          targetFrameRef.current = Math.min(
            Math.round(p * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );

          // Clip-path expand
          if (videoBox) {
            const r = 6 + Math.min(p / 0.6, 1) * 94;
            videoBox.style.clipPath = `circle(${r}% at 50% 50%)`;
          }
        },
      },
    });
  });

  return (
    <section className="vd-pin-section bg-[#222123]">
      <div
        ref={videoBoxRef}
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(6% at 50% 50%)",
        }}
        className="size-full video-box"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/images/circle-text.svg" alt="" className="spin-circle" />
          <div className="play-btn">
            <img
              src="/images/play.svg"
              alt=""
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
