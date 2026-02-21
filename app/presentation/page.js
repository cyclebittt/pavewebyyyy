<!doctype html>
<html lang="de">
<head>
  <!--
    Single-file presentation page for WhatsApp sharing.
    Goals: 10-second scanability, high-end agency feel, minimal copy, strong visual hierarchy.
    No tracking, no cookies, no frameworks.
  -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#0a0a0a" />
  <title>Leon Seitz — Präsentation</title>
  <meta name="description" content="Websites, die Vertrauen schaffen. Leon Seitz — Webdesign für lokale Unternehmen." />

  <!-- Inter (Google Fonts) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    /* -----------------------------
      Core tokens
    ----------------------------- */
    :root{
      --bg:#0a0a0a;
      --fg:#f0f0f0;
      --muted:rgba(240,240,240,.72);
      --dim:rgba(240,240,240,.56);
      --hair:rgba(240,240,240,.14);
      --card:rgba(255,255,255,.04);
      --card2:rgba(255,255,255,.06);

      /* subdued accents (no neon) */
      --violet: 168, 85, 247; /* muted violet base */
      --cyan:   56, 189, 248; /* muted cyan base */

      --maxw: 1080px;
      --radius: 22px;
      --shadow: 0 18px 60px -40px rgba(0,0,0,.9);
      --shadow2: 0 28px 90px -60px rgba(0,0,0,.95);

      --ease: cubic-bezier(.2,.9,.2,1);
    }

    *{ box-sizing:border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: var(--bg);
      color: var(--fg);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
      overflow-x:hidden;
    }

    a{ color:inherit; text-decoration:none; }
    button{ font-family:inherit; }

    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce){
      *{ animation: none !important; transition:none !important; scroll-behavior:auto !important; }
    }

    /* -----------------------------
      Global background system
      (subtle gradients + grain + vignette)
    ----------------------------- */
    .bg{
      position:fixed;
      inset:0;
      z-index:-10;
      background:
        radial-gradient(1200px 720px at 18% 18%, rgba(var(--violet), .22), transparent 60%),
        radial-gradient(900px 680px at 82% 26%, rgba(var(--cyan),   .14), transparent 55%),
        linear-gradient(135deg, #0a0a0a 0%, #0b0b12 55%, #05050b 100%);
    }

    /* Slow moving “light leaks” (very subtle) */
    .leaks{
      position:fixed;
      inset:0;
      z-index:-9;
      pointer-events:none;
      opacity:.9;
      filter: blur(40px);
      mix-blend-mode: screen;
    }
    .leak{
      position:absolute;
      width: 56rem;
      height:56rem;
      border-radius:999px;
      opacity:.22;
      transform: translate3d(0,0,0);
      will-change: transform;
    }
    .leak.v{
      left:-18%;
      top:-22%;
      background: radial-gradient(circle at 35% 30%, rgba(var(--violet), .55), transparent 62%);
      animation: drift1 18s var(--ease) infinite;
    }
    .leak.c{
      right:-18%;
      top:2%;
      background: radial-gradient(circle at 40% 35%, rgba(var(--cyan), .45), transparent 62%);
      animation: drift2 22s var(--ease) infinite;
    }
    .leak.m{
      left:18%;
      bottom:-30%;
      width:48rem;
      height:48rem;
      background: radial-gradient(circle at 45% 35%, rgba(var(--violet), .32), transparent 62%);
      animation: drift3 26s var(--ease) infinite;
    }

    /* Grain overlay (SVG noise) */
    .grain{
      position:fixed;
      inset:0;
      z-index:-8;
      pointer-events:none;
      opacity:.09;
      mix-blend-mode: overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
      background-size: 240px 240px;
      animation: grainMove 7s linear infinite;
    }

    /* Vignette */
    .vignette{
      position:fixed;
      inset:0;
      z-index:-7;
      pointer-events:none;
      background: radial-gradient(80% 60% at 50% 35%, transparent 0%, rgba(0,0,0,.40) 65%, rgba(0,0,0,.75) 100%);
    }

    @keyframes drift1{
      0%   { transform: translate3d(0,0,0) scale(1); }
      40%  { transform: translate3d(46px, 22px,0) scale(1.06); }
      78%  { transform: translate3d(-30px, 18px,0) scale(.98); }
      100% { transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes drift2{
      0%   { transform: translate3d(0,0,0) scale(1); }
      35%  { transform: translate3d(-52px, 30px,0) scale(1.05); }
      76%  { transform: translate3d(26px, -18px,0) scale(.99); }
      100% { transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes drift3{
      0%   { transform: translate3d(0,0,0) scale(1); }
      45%  { transform: translate3d(34px, -26px,0) scale(1.08); }
      82%  { transform: translate3d(-28px, 18px,0) scale(.97); }
      100% { transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes grainMove{
      0%   { transform: translate3d(0,0,0); }
      100% { transform: translate3d(90px,60px,0); }
    }

    /* -----------------------------
      Layout
    ----------------------------- */
    .wrap{
      min-height:100%;
      display:flex;
      flex-direction:column;
    }

    .container{
      width:100%;
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 0 20px;
    }

    section{
      padding: 72px 0;
    }

    /* Fullscreen intro */
    .hero{
      min-height: 100svh;
      display:flex;
      align-items:center;
      padding: 96px 0 72px;
    }

    /* Subtle “top badge” (quality signaling) */
    .badge{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--hair);
      background: rgba(255,255,255,.06);
      color: rgba(240,240,240,.85);
      font-size: 12px;
      letter-spacing: .02em;
    }
    .dot{
      width:7px;height:7px;border-radius:50%;
      background: rgba(var(--cyan), .65);
      box-shadow: 0 0 18px rgba(var(--cyan), .18);
    }

    h1,h2{
      margin:0;
      letter-spacing:-0.03em;
    }
    h1{
      font-weight: 800;
      font-size: clamp(40px, 6.6vw, 78px);
      line-height: 1.03;
    }
    h2{
      font-weight: 800;
      font-size: clamp(28px, 4.2vw, 46px);
      line-height: 1.08;
    }

    .muted{
      color: var(--muted);
    }
    .dim{
      color: var(--dim);
    }

    /* Gradient text accent (subdued) */
    .accent{
      background: linear-gradient(90deg, rgba(220,210,255,.95), rgba(200,235,255,.92));
      -webkit-background-clip:text;
      background-clip:text;
      color:transparent;
    }

    .hero-inner{
      text-align:center;
      display:flex;
      flex-direction:column;
      gap: 18px;
      align-items:center;
    }
    .hero-sub{
      max-width: 720px;
      font-size: clamp(14px, 2.2vw, 18px);
      line-height: 1.6;
      margin: 0;
    }

    /* -----------------------------
      Editorial case block
    ----------------------------- */
    .case{
      padding-top: 36px;
    }
    .case-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 18px;
      align-items:stretch;
    }

    .card{
      border-radius: var(--radius);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      box-shadow: var(--shadow);
      overflow:hidden;
      position:relative;
      backdrop-filter: blur(12px);
    }

    /* Image/Mockup placeholder (replace the <img> src yourself) */
    .mock{
      aspect-ratio: 16/10;
      width:100%;
      display:block;
      background:
        radial-gradient(1200px 600px at 25% 10%, rgba(var(--violet), .16), transparent 60%),
        radial-gradient(900px 600px at 85% 0%, rgba(var(--cyan), .12), transparent 60%),
        linear-gradient(135deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.02) 55%, rgba(0,0,0,.06) 100%);
      position:relative;
    }
    .mock::after{
      content:"";
      position:absolute; inset:0;
      background: radial-gradient(70% 70% at 30% 0%, rgba(255,255,255,.10), transparent 55%);
      mix-blend-mode: screen;
      opacity:.6;
      pointer-events:none;
    }
    .mock::before{
      content:"";
      position:absolute; inset:0;
      background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.10), transparent);
      pointer-events:none;
    }

    .case-meta{
      padding: 18px 18px 20px;
      display:flex;
      flex-direction:column;
      gap: 12px;
    }
    .kicker{
      font-size: 12px;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(240,240,240,.55);
    }
    .case-title{
      font-size: 22px;
      font-weight: 800;
      letter-spacing:-0.02em;
      line-height: 1.12;
      margin:0;
    }
    .case-desc{
      margin:0;
      color: rgba(240,240,240,.72);
      line-height:1.6;
      font-size: 14.5px;
      max-width: 56ch;
    }

    /* Microinteraction: premium link button */
    .linkbtn{
      display:inline-flex;
      align-items:center;
      gap:10px;
      width: fit-content;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,.12);
      background: rgba(255,255,255,.06);
      color: rgba(240,240,240,.92);
      font-weight: 600;
      font-size: 14px;
      transition: transform 220ms var(--ease), background 220ms var(--ease), border-color 220ms var(--ease);
      will-change: transform;
    }
    .linkbtn:hover{
      transform: translateY(-1px);
      background: rgba(255,255,255,.09);
      border-color: rgba(255,255,255,.18);
    }
    .linkbtn:active{
      transform: translateY(0px);
    }
    .arrow{
      opacity:.8;
      transform: translateX(0);
      transition: transform 220ms var(--ease), opacity 220ms var(--ease);
    }
    .linkbtn:hover .arrow{
      transform: translateX(2px);
      opacity:.95;
    }

    /* Microinteraction: subtle tilt on hover (desktop) */
    @media (hover:hover){
      .card.tilt{
        transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        transition: transform 180ms var(--ease), border-color 240ms var(--ease);
        will-change: transform;
      }
      .card.tilt:hover{
        border-color: rgba(255,255,255,.18);
      }
      .card.tilt .shine{
        position:absolute;
        inset:0;
        pointer-events:none;
        opacity:0;
        transition: opacity 220ms var(--ease);
        background: radial-gradient(520px 380px at var(--hx, 50%) var(--hy, 30%), rgba(255,255,255,.10), transparent 62%);
        mix-blend-mode: screen;
      }
      .card.tilt:hover .shine{ opacity: .9; }
    }

    /* -----------------------------
      Facts (3 big statements)
      Keep honest: “typisch / oft / je nach Umfang”
    ----------------------------- */
    .facts{
      padding-top: 22px;
      padding-bottom: 22px;
    }
    .facts-row{
      display:grid;
      grid-template-columns: 1fr;
      gap: 18px;
      align-items:start;
    }
    .fact{
      padding: 14px 0;
    }
    .fact-big{
      font-size: clamp(30px, 5vw, 56px);
      font-weight: 800;
      letter-spacing:-0.03em;
      line-height:1;
      margin:0;
    }
    .fact-small{
      margin: 10px 0 0;
      color: rgba(240,240,240,.62);
      font-size: 13.5px;
      line-height: 1.5;
      max-width: 30ch;
    }

    /* -----------------------------
      CTA
    ----------------------------- */
    .cta{
      padding-bottom: 96px;
    }
    .cta-inner{
      border-radius: var(--radius);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      box-shadow: var(--shadow2);
      padding: 26px 20px;
      backdrop-filter: blur(14px);
      position:relative;
      overflow:hidden;
    }
    .cta-inner::before{
      content:"";
      position:absolute;
      inset:-2px;
      opacity:.55;
      filter: blur(22px);
      background:
        radial-gradient(60% 80% at 25% 10%, rgba(var(--violet), .12), transparent 60%),
        radial-gradient(60% 80% at 85% 0%, rgba(var(--cyan), .10), transparent 60%),
        radial-gradient(55% 80% at 50% 115%, rgba(var(--violet), .08), transparent 60%);
      pointer-events:none;
    }
    .cta-content{
      position:relative;
      display:flex;
      flex-direction:column;
      gap: 14px;
      text-align:center;
      align-items:center;
    }
    .cta-p{
      margin:0;
      max-width: 52ch;
      color: rgba(240,240,240,.72);
      line-height:1.6;
      font-size: 14.5px;
    }

    /* Single high-intent CTA button (WhatsApp) */
    .cta-btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      padding: 12px 18px;
      border-radius: 999px;
      background: rgba(240,240,240,.95);
      color:#0a0a0a;
      font-weight: 700;
      font-size: 14px;
      border: 1px solid rgba(255,255,255,.16);
      transition: transform 220ms var(--ease), filter 220ms var(--ease);
      will-change: transform;
    }
    .cta-btn:hover{
      transform: translateY(-1px);
      filter: brightness(0.98);
    }
    .cta-btn:active{
      transform: translateY(0px);
    }

    /* Footer (minimal) */
    footer{
      padding: 22px 0 34px;
      color: rgba(240,240,240,.45);
      font-size: 12.5px;
      text-align:center;
    }

    /* -----------------------------
      Responsive upgrades
    ----------------------------- */
    @media (min-width: 860px){
      section{ padding: 88px 0; }
      .case-grid{
        grid-template-columns: 1.35fr .65fr;
        gap: 22px;
        align-items:stretch;
      }
      .case-meta{
        padding: 22px 22px 24px;
        justify-content:center;
      }
      .facts-row{
        grid-template-columns: 1fr 1fr 1fr;
        gap: 34px;
      }
      .fact-small{ max-width: 34ch; }
      .cta-inner{
        padding: 34px 28px;
      }
    }
  </style>
</head>

<body>
  <!-- Background layers -->
  <div class="bg" aria-hidden="true"></div>
  <div class="leaks" aria-hidden="true">
    <div class="leak v"></div>
    <div class="leak c"></div>
    <div class="leak m"></div>
  </div>
  <div class="grain" aria-hidden="true"></div>
  <div class="vignette" aria-hidden="true"></div>

  <div class="wrap">
    <!-- BLOCK 1 — INTRO (Fullscreen) -->
    <section class="hero">
      <div class="container">
        <div class="hero-inner">
          <div class="badge" aria-label="Kurz. Klar. Hochwertig.">
            <span class="dot" aria-hidden="true"></span>
            Kurz. Klar. Hochwertig.
          </div>

          <h1>
            Websites, die <span class="accent">Vertrauen</span> schaffen.
          </h1>

          <p class="hero-sub muted">
            Leon Seitz — Webdesign für lokale Unternehmen, die professionell auftreten wollen.
          </p>
        </div>
      </div>
    </section>

    <!-- BLOCK 2 — ONE FEATURED CASE (Editorial) -->
    <section class="case">
      <div class="container">
        <div class="case-grid">
          <!-- Replace the mock block with your image if you want:
               <img src="..." alt="Screenshot ..." class="mock-img">
               For now: elegant placeholder with filmic vignette.
          -->
          <div class="card tilt" id="tiltCard">
            <div class="shine" aria-hidden="true"></div>
            <div class="mock" aria-label="Projekt-Mockup Platzhalter"></div>
          </div>

          <div class="card" style="padding:0;">
            <div class="case-meta">
              <div class="kicker">Ein konkretes Beispiel</div>

              <p class="case-title">
                Spendenportal Kirche Erlenbach
              </p>

              <p class="case-desc">
                Funktional. Klar. In kurzer Zeit live — mit sauberer Führung bis zur Spende.
              </p>

              <a class="linkbtn" href="https://kircheab.de/spenden" target="_blank" rel="noopener noreferrer">
                Ansehen <span class="arrow" aria-hidden="true">→</span>
              </a>

              <div class="dim" style="font-size:12.5px; line-height:1.45;">
                Kein „Portfolio-Raster“. Ein Output, der zeigt, wie ein Projekt am Ende wirkt.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOCK 3 — THREE FACTS (minimal, honest framing) -->
    <section class="facts">
      <div class="container">
        <div class="facts-row" role="list">
          <div class="fact" role="listitem">
            <p class="fact-big">&lt; 2&nbsp;Wochen</p>
            <p class="fact-small">Oft realistisch bei klarer Vorlage und schneller Feedbackschleife.</p>
          </div>

          <div class="fact" role="listitem">
            <p class="fact-big">ab&nbsp;400&nbsp;€</p>
            <p class="fact-small">Einstieg je nach Umfang. Transparenter Rahmen vor dem Start.</p>
          </div>

          <div class="fact" role="listitem">
            <p class="fact-big">direkt</p>
            <p class="fact-small">Kein Agentur-Overhead. Kurze Wege. Ein Ansprechpartner.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOCK 4 — SINGLE CTA (one action, low friction) -->
    <section class="cta">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-content">
            <h2>Passt das?</h2>
            <p class="cta-p">
              Schreib mir kurz dein Vorhaben — ich melde mich innerhalb von 24 Stunden.
            </p>

            <a class="cta-btn" href="https://wa.me/4916095757167" target="_blank" rel="noopener noreferrer">
              Per WhatsApp schreiben <span aria-hidden="true">→</span>
            </a>

            <div class="dim" style="font-size:12.5px;">
              Tipp: Ziel + Deadline + aktueller Stand reichen vollkommen.
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      © <span id="y"></span> Leon Seitz · leonseitz.com
    </footer>
  </div>

  <script>
    /*
      Micro-interaction 1: Subtle tilt + highlight on the case visual (desktop only).
      Signals craftsmanship, stays calm.
    */
    (function () {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const canHover = window.matchMedia && window.matchMedia('(hover:hover)').matches;
      const card = document.getElementById('tiltCard');
      if (!card || prefersReduced || !canHover) return;

      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;   // 0..1
        const py = (e.clientY - r.top) / r.height;   // 0..1

        const rx = clamp((0.5 - py) * 10, -8, 8);
        const ry = clamp((px - 0.5) * 12, -10, 10);

        card.style.setProperty('--rx', rx + 'deg');
        card.style.setProperty('--ry', ry + 'deg');
        card.style.setProperty('--hx', (px * 100) + '%');
        card.style.setProperty('--hy', (py * 100) + '%');
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--hx', '50%');
        card.style.setProperty('--hy', '30%');
      });
    })();

    /* Footer year (no tracking, no external calls) */
    document.getElementById('y').textContent = new Date().getFullYear();
  </script>
</body>
</html>
