import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

import churchShillong from "./assets/images/image-2.png";
import heroImage1 from "./assets/images/953f8576-9c74-4dfa-a590-5ced2694c3a2.png";
import floralBranches from "./assets/images/floral-branches.png";
import weddingMusic from "./assets/Music/krasnoshchok-wedding-romantic-love-music-409293 (1).mp3";
import waxSeal from "./assets/images/wax-seal.png";
import rightFloatingImage from "./assets/images/WhatsApp Image 2026-07-11 at 12.52.23 PM.jpeg";
import leftFloatingImage from "./assets/images/PHOTO-2026-07-11-12-52-23.jpg";

type AppState = 'envelope' | 'entered';

export default function App() {
  const [appState, setAppState] = useState<AppState>('envelope');
  const [breaking, setBreaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (appState !== 'entered') return;

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [appState]);

  const handleOpenEnvelope = () => {
    if (breaking) return;
    setBreaking(true);

    // Play music when the user interacts with the envelope
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }

    // Envelope animation sequence takes 3s, wait a bit longer to unmount
    window.setTimeout(() => setAppState('entered'), 3000);
  };

  return (
    <>
      <audio ref={audioRef} src={weddingMusic} loop />

      {/* Render Invitation beneath the envelope so it reveals elegantly */}
      <div className={appState !== 'entered' ? "h-screen overflow-hidden" : ""}>
        <Invitation />

        {/* Envelope Landing Overlay */}
        {appState === 'envelope' && (
          <EnvelopeLanding breaking={breaking} onOpen={handleOpenEnvelope} />
        )}
      </div>
    </>
  );
}

/* ----------------------------- Envelope Cover ----------------------------- */

function EnvelopeLanding({
  breaking,
  onOpen,
}: {
  breaking: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={
        "fixed inset-0 z-50 overflow-hidden bg-[oklch(0.93_0.01_75)] font-sans text-ink transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)] " +
        (breaking ? "-translate-y-full pointer-events-none" : "translate-y-0")
      }
      style={{ transitionDelay: breaking ? "1800ms" : "0ms" }}
    >
      {/* Ambient warm vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.97 0.008 80) 0%, transparent 55%), radial-gradient(ellipse at center, transparent 45%, oklch(0.78 0.02 70 / 0.55) 100%)",
        }}
      />

      <div
        className={
          "relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 transition-transform duration-[2000ms] ease-[cubic-bezier(0.7,0.05,0.25,1)] " +
          (breaking ? "scale-[1.15] md:scale-[1.25]" : "scale-100")
        }
        style={{ transitionDelay: breaking ? "600ms" : "0ms" }}
      >
        <p
          className={
            "mb-6 text-[10px] font-medium uppercase tracking-[0.5em] transition-opacity duration-500 " +
            (breaking ? "opacity-0" : "text-ink/50")
          }
        >
          You are cordially invited
        </p>

        <button
          type="button"
          onClick={onOpen}
          aria-label="Open the invitation"
          disabled={breaking}
          className="group relative block cursor-pointer focus:outline-none"
        >
          {/* Envelope — zoomed in to fill viewport */}
          <div
            className="relative mx-auto"
            style={{
              width: "min(94vw, 720px)",
              aspectRatio: "8 / 5.2",
              perspective: "2000px",
            }}
          >
            {/* Envelope back / interior */}
            <div
              className="absolute inset-0 rounded-[8px] shadow-[0_50px_100px_-30px_rgba(60,40,20,0.45),0_20px_40px_-20px_rgba(60,40,20,0.3)]"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.96 0.014 82) 0%, oklch(0.90 0.02 78) 100%)",
              }}
            />

            {/* Letter peeking out (revealed as flap opens) */}
            <div
              aria-hidden
              className={
                "absolute inset-x-[6%] top-[8%] bottom-[10%] rounded-[3px] bg-[oklch(0.985_0.005_85)] ring-1 ring-ink/10 shadow-inner transition-all duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)] " +
                (breaking
                  ? "-translate-y-[20%] md:-translate-y-[45%] opacity-100"
                  : "translate-y-0 opacity-0")
              }
              style={{ transitionDelay: breaking ? "700ms" : "0ms" }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] text-ink/40">
                  The Marriage of
                </p>
                <p className="font-serif text-2xl italic text-ink/80 md:text-3xl">
                  Dr. Phinri &amp; Barri B.M. Wahlang
                </p>
                <div className="h-px w-16 bg-gold/60" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                  01 · X · 2026
                </p>
              </div>
            </div>

            {/* Bottom fold shading */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-[8px]"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, oklch(0.85 0.025 75 / 0.6) 100%)",
              }}
            />

            {/* Side folds */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/2 rounded-l-[8px]"
              style={{
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                background: "oklch(0.88 0.022 75 / 0.55)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-1/2 rounded-r-[8px]"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
                background: "oklch(0.88 0.022 75 / 0.55)",
              }}
            />

            {/* Top flap — rotates open on X axis */}
            <div
              aria-hidden
              className={
                "absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] " +
                (breaking ? "[transform:rotateX(-178deg)]" : "[transform:rotateX(0deg)]")
              }
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, oklch(0.98 0.012 85) 0%, oklch(0.89 0.024 78) 100%)",
                filter: "drop-shadow(0 8px 12px rgba(60,40,20,0.2))",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transitionDelay: breaking ? "300ms" : "0ms",
              }}
            />



            {/* Gold wax seal */}
            <div
              className={
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-[cubic-bezier(0.6,-0.05,0.7,1)] " +
                (breaking
                  ? "duration-[700ms] scale-95 rotate-[14deg] opacity-0 translate-y-[80px]"
                  : "duration-[400ms] scale-100 group-hover:scale-[1.05] group-active:scale-[0.97]")
              }
              style={{
                width: "32%",
                filter:
                  "drop-shadow(0 10px 18px rgba(120,90,20,0.45)) drop-shadow(0 3px 4px rgba(120,90,20,0.4))",
              }}
            >
              <img
                src={waxSeal}
                alt="Gold wax seal with monogram P and B"
                width={512}
                height={512}
                className="h-auto w-full select-none"
                draggable={false}
              />
            </div>
          </div>

          <p
            className={
              "mt-10 text-center text-[10px] font-medium uppercase tracking-[0.4em] transition-opacity duration-500 " +
              (breaking ? "opacity-0" : "text-ink/45 group-hover:text-gold")
            }
          >
            Click to open
          </p>
        </button>

        <p
          className={
            "mt-12 text-center font-serif text-sm italic transition-opacity duration-500 " +
            (breaking ? "opacity-0" : "text-ink/40")
          }
        >
          01 October 2026
        </p>
      </div>
    </div>
  );
}


/* -------------------------------- ScrollZoomImage -------------------------- */
function ScrollZoomImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
      }
    });

    tl.to(imageWrapperRef.current, {
      width: "100%",
      height: "100vh",
      borderRadius: "0px",
      ease: "none",
    }, 0)
      .to(textRef.current, {
        opacity: 0,
        ease: "none",
      }, 0)
      .to(float1Ref.current, {
        y: "-140vh",
        ease: "none",
      }, 0)
      .to(float2Ref.current, {
        y: "-160vh",
        ease: "none",
      }, 0)
      .to([float1Ref.current, float2Ref.current], {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      }, 0.4);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full z-0 bg-paper">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Main scaling image */}
        <div
          ref={imageWrapperRef}
          className="relative overflow-hidden bg-bloom/10 shadow-[0_30px_60px_-30px_rgba(40,30,20,0.25)] flex flex-col items-center justify-center z-0"
          style={{ width: "90%", height: "50vh", borderRadius: "12px" }}
        >
          <img
            src={churchShillong}
            alt="Jaiaw Presbyterian Church, Shillong"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Floating parallax image 1 */}
          <div
            ref={float1Ref}
            className="absolute left-[5%] md:left-[8%] top-[100vh] md:top-[100vh] w-[45vw] md:w-[22vw] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl z-10"
          >
            <img src={leftFloatingImage} className="w-full h-full object-cover" alt="" />
          </div>

          {/* Floating parallax image 2 */}
          <div
            ref={float2Ref}
            className="absolute right-[5%] md:right-[8%] top-[140vh] md:top-[110vh] w-[50vw] md:w-[26vw] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl z-10"
          >
            <img src={rightFloatingImage} className="w-full h-full object-cover" alt="" />
          </div>

          <p
            ref={textRef}
            className="absolute bottom-6 text-center text-[10px] uppercase tracking-[0.25em] text-white drop-shadow-md z-10"
          >
            Shillong · Meghalaya · India
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Invitation ------------------------------- */

function Invitation() {
  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans selection:bg-gold/10 selection:text-gold">
      {/* Hero Background Image with Fade */}
      <div className="absolute inset-x-0 top-0 h-[65vh] md:h-[80vh] z-0 pointer-events-none">
        <img
          src={heroImage1}
          alt="Barri and Dr. Phinrikerbha"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-paper" />
      </div>

      {/* Subtle floral branch backgrounds */}
      <div
        className="pointer-events-none fixed -top-16 -right-24 z-0 w-[28rem] opacity-[0.14] md:w-[36rem] md:opacity-[0.18]"
        aria-hidden
      >
        <img
          src={floralBranches}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full rotate-12"
        />
      </div>
      <div
        className="pointer-events-none fixed -bottom-24 -left-20 z-0 w-[26rem] opacity-[0.10] md:w-[34rem] md:opacity-[0.14]"
        aria-hidden
      >
        <img
          src={floralBranches}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full -rotate-135 scale-x-[-1]"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full justify-center py-6 backdrop-blur-sm bg-white/40">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 text-[9px] font-medium uppercase tracking-[0.25em] text-ink/60 md:gap-10 md:text-[10px]">
          <a href="#ceremony" className="transition-colors hover:text-gold">Ceremony</a>
          <a href="#reception" className="transition-colors hover:text-gold">Reception</a>
          <a href="#venues" className="transition-colors hover:text-gold">Venues</a>
          <a href="#rsvp" className="transition-colors hover:text-gold">RSVP</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center px-6 pb-12 pt-[40vh] md:pt-[45vh] text-center z-10 w-full">
        <div className="mx-auto max-w-[62ch]">
          <span className="mb-6 block text-[10px] md:text-[11px] font-medium uppercase tracking-[0.4em] text-ink/70">
            In the presence of God &amp; loved ones
          </span>

          <h1 className="font-serif text-[8.5vw] sm:text-5xl font-medium leading-[1.1] text-balance md:text-6xl lg:text-7xl">
            <span className="italic block">Dr Phinri</span>
            <span className="block my-2 text-2xl md:text-3xl font-normal not-italic opacity-40 md:text-4xl">
              &amp;
            </span>
            <span className="italic block">Barri</span>
          </h1>

          <div className="mx-auto my-6 md:my-8 flex items-center justify-center gap-2 md:gap-4">
            <span className="h-px w-8 md:w-16 bg-ink/20" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-ink/50">
              Are to be married
            </span>
            <span className="h-px w-8 md:w-16 bg-ink/20" />
          </div>

          <p className="font-serif text-base md:text-lg italic leading-relaxed text-ink/70 md:text-xl">
            Dr. Phinrikerbha &amp; Barri B.M Wahlang request the honour of your
            presence as they unite in holy matrimony.
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-3 items-center gap-2 border-y border-ink/15 px-2 py-4 md:gap-12 md:px-14 md:py-6">
          <div className="text-right">
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-ink/50">Thursday</p>
            <p className="mt-1 font-serif text-2xl md:text-4xl">October</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-5xl leading-none md:text-7xl">01</p>
          </div>
          <div className="text-left">
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-ink/50">Shillong</p>
            <p className="mt-1 font-serif text-2xl md:text-4xl">2026</p>
          </div>
        </div>
      </section>

      {/* Feature image with sticky scroll zoom */}
      <ScrollZoomImage />

      {/* Details wrapper overlaps sticky image */}
      <div className="relative z-20 w-full bg-paper mt-[-100vh]">
        <main className="mx-auto max-w-6xl space-y-28 px-6 py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <DetailCard
              id="ceremony"
              eyebrow="The Holy Union"
              title="Ceremony"
              time="1:00 PM"
              venue="Jaiaw Presbyterian Church"
              address="Jaiaw, Shillong, Meghalaya 793002"
            />
            <DetailCard
              id="reception"
              eyebrow="The Celebration"
              title="Reception"
              time="5:00 PM onwards"
              venue="The Ratson Pavillion"
              address="Mawiong, Opposite Shillong Hyundai, Shillong"
            />
          </div>

          {/* Maps */}
          <section id="venues" className="space-y-12">
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
                Find your way
              </p>
              <h2 className="mt-3 font-serif text-4xl italic md:text-5xl">Venue Locations</h2>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              <MapCard
                label="Ceremony"
                venue="Jaiaw Presbyterian Church"
                query="Jaiaw Presbyterian Church, Shillong, Meghalaya"
              />
              <MapCard
                label="Reception"
                venue="The Ratson Pavillion, Mawiong"
                query="The Ratson Pavillion, Mawiong, Shillong"
              />
            </div>
          </section>

          {/* RSVP */}
          <section id="rsvp" className="mx-auto max-w-xl space-y-10 text-center">
            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
                Kindly Respond
              </p>
              <h2 className="font-serif text-4xl italic md:text-5xl">
                Joyfully awaiting your response
              </h2>
              <p className="leading-relaxed text-ink/60 text-pretty">
                We kindly request the favour of your reply by 15th September 2026.
              </p>
            </div>

            <RsvpForm />

            <div className="pt-6">
              <p className="mx-auto max-w-md font-serif text-base italic text-ink/50">
                &ldquo;So they are no longer two, but one flesh. Therefore what God has joined
                together, let no one separate.&rdquo;
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink/40">
                — Matthew 19:6
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-ink/10 py-16 text-center">
          <p className="font-serif text-2xl italic text-ink/50">Dr Phinri &amp; Barri B.M. Wahlang</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-ink/30">
            01 October 2026 · Shillong
          </p>
        </footer>
      </div> {/* End overlap wrapper */}
    </div>
  );
}

/* --------------------------------- Pieces --------------------------------- */

function DetailCard({
  id,
  eyebrow,
  title,
  time,
  venue,
  address,
}: {
  id: string;
  eyebrow: string;
  title: string;
  time: string;
  venue: string;
  address: string;
}) {
  return (
    <div id={id} className="relative">
      <div className="relative rounded-sm border border-ink/10 bg-paper/60 p-6 md:p-10 shadow-[0_20px_50px_-30px_rgba(40,30,20,0.2)] backdrop-blur-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl italic leading-tight">{title}</h3>

        <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
          <Row label="When">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em]">{time}</span>
          </Row>
          <Row label="Where">
            <span className="font-serif text-base md:text-lg not-italic">{venue}</span>
            <br />
            <span className="text-xs md:text-sm text-ink/60">{address}</span>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-6 border-t border-ink/10 pt-4 sm:pt-6 first:border-0 first:pt-0">
      <p className="sm:pt-1 text-[10px] uppercase tracking-[0.3em] text-ink/50">{label}</p>
      <div className="text-ink/85">{children}</div>
    </div>
  );
}

function MapCard({
  label,
  venue,
  query,
}: {
  label: string;
  venue: string;
  query: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

  return (
    <div className="overflow-hidden rounded-sm border border-ink/10 bg-paper shadow-[0_25px_50px_-30px_rgba(40,30,20,0.25)]">
      <div className="aspect-[4/3] w-full bg-bloom/10">
        <iframe
          src={src}
          title={`Map of ${venue}`}
          className="h-full w-full grayscale-[0.35]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-6 py-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{label}</p>
          <p className="mt-1 font-serif text-lg italic">{venue}</p>
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[10px] font-medium uppercase tracking-[0.25em] text-ink/70 underline underline-offset-[6px] transition-colors hover:text-gold"
        >
          Directions
        </a>
      </div>
    </div>
  );
}

function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Web3Forms Access Key
    formData.append("access_key", "2875298b-da09-4265-8fa7-6bd0f0340855");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-sm border border-ink/10 bg-paper/60 p-8 text-center shadow-sm">
        <h3 className="font-serif text-2xl italic text-ink">Thank you!</h3>
        <p className="mt-2 text-sm text-ink/60">Your RSVP has been beautifully received.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-md space-y-10 text-left">
      <div>
        <input required type="text" name="name" id="name" placeholder="Guest Name(s)" className="w-full rounded-none border-b border-ink/20 bg-transparent pb-3 font-serif text-2xl italic text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink" />
      </div>

      <div className="space-y-4 pt-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">Will you attend?</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input required type="radio" name="attendance" value="Accepts" className="peer sr-only" />
            <div className="w-4 h-4 rounded-full border border-ink/30 peer-checked:bg-ink peer-checked:border-ink transition-colors"></div>
            <span className="font-serif text-lg italic text-ink/70 group-hover:text-ink transition-colors">Joyfully Accepts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input required type="radio" name="attendance" value="Declines" className="peer sr-only" />
            <div className="w-4 h-4 rounded-full border border-ink/30 peer-checked:bg-ink peer-checked:border-ink transition-colors"></div>
            <span className="font-serif text-lg italic text-ink/70 group-hover:text-ink transition-colors">Regretfully Declines</span>
          </label>
        </div>
      </div>

      <div className="pt-2">
        <input type="number" name="guests" id="guests" min="1" max="10" placeholder="Number of Guests" className="w-full rounded-none border-b border-ink/20 bg-transparent pb-3 font-serif text-xl italic text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink" />
      </div>

      <div className="pt-2">
        <textarea name="message" id="message" rows={2} placeholder="Dietary Requirements or a Note for the Couple" className="w-full rounded-none border-b border-ink/20 bg-transparent pb-3 pt-2 font-serif text-xl italic text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-ink resize-none"></textarea>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full border border-ink bg-transparent py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-all hover:bg-ink hover:text-paper hover:tracking-[0.35em] disabled:opacity-50 active:scale-[0.98]"
        >
          {status === "submitting" ? "Sending..." : "Submit RSVP"}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-4 text-center text-xs text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
