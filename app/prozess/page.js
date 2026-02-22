<!doctype html>
<html lang="de">
<head>
  <!--
    /prozess — Single-file HTML (no framework)
    Intent: high-end, low-noise, conversion-psychology informed.
    Notes (Integrity):
    - Prices are "ab" (starting points).
    - Social proof is phrased cautiously (no unverifiable counts).
    - Scarcity is framed as capacity planning, not artificial urgency.
  -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0B0B14" />
  <title>Prozess — Leon Seitz</title>
  <meta name="description" content="Klarer Projektprozess, transparente Pakete und Zahlungslogik. Ohne Agentur-Overhead." />

  <!-- Inter (Google Fonts) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    /* -----------------------------
      TOKENS (Paveo-esque dark + subdued accents)
    ----------------------------- */
    :root{
      --bg0:#0F0F18;
      --bg1:#131329;
      --bg2:#0B0B14;

      --fg:#F0F0F0;
      --muted:rgba(240,240,240,.72);
      --dim:rgba(240,240,240,.56);
      --hair:rgba(240,240,240,.14);
      --hair2:rgba(240,240,240,.10);

      --violet:#7C3AED;
      --violet2:#8B5CF6;
      --indigo:#A5B4FC;
      --azure:#38BDF8;

      /* radial effects */
      --rv: 129,51,241;
      --rb: 56,189,248;

      --maxw:1120px;
      --radius:18px;
      --radius2:26px;
      --shadow: 0 22px 70px -55px rgba(0,0,0,.95);
      --shadow2: 0 34px 110px -80px rgba(0,0,0,.95);
      --ease: cubic-bezier(.2,.9,.2,1);
    }

    *{ box-sizing:border-box; }
    html,body{ height:100%; }
    body{
      margin:0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: var(--fg);
      background: radial-gradient(1200px 700px at 18% 18%, rgba(var(--rv),0.32), transparent 60%),
                  radial-gradient(950px 720px at 82% 20%, rgba(var(--rb),0.18), transparent 55%),
                  linear-gradient(135deg, var(--bg0) 0%, var(--bg1) 55%, var(--bg2) 100%);
      overflow-x:hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: geometricPrecision;
    }

    a{ color:inherit; text-decoration:none; }
    button, input{ font-family:inherit; }
    ::selection{ background: rgba(124,58,237,.35); }

    @media (prefers-reduced-motion: reduce){
      *{ animation:none !important; transition:none !important; scroll-behavior:auto !important; }
    }

    /* -----------------------------
      BACKGROUND LAYERS (subtle motion + grain + vignette)
    ----------------------------- */
    .bg-fixed{ position:fixed; inset:0; z-index:-10; pointer-events:none; }
    .blobs{ position:absolute; inset:0; filter: blur(60px); opacity:.95; mix-blend-mode: screen; }
    .blob{
      position:absolute;
      border-radius:999px;
      will-change: transform;
      opacity:.18;
    }
    .blob.v1{
      left:-18%; top:-20%;
      width:56rem; height:56rem;
      background: radial-gradient(circle at 35% 30%, rgba(var(--rv), .55), transparent 62%);
      animation: blob1 16s var(--ease) infinite;
    }
    .blob.b1{
      right:-20%; top:4%;
      width:54rem; height:54rem;
      background: radial-gradient(circle at 40% 35%, rgba(var(--rb), .52), transparent 62%);
      animation: blob2 19s var(--ease) infinite;
    }
    .blob.v2{
      left:18%; bottom:-30%;
      width:48rem; height:48rem;
      background: radial-gradient(circle at 45% 35%, rgba(var(--rv), .38), transparent 62%);
      animation: blob3 23s var(--ease) infinite;
    }

    .grain{
      position:absolute; inset:0;
      opacity:.10;
      mix-blend-mode: overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
      background-size: 240px 240px;
      animation: grainMove 7s linear infinite;
    }

    .vignette{
      position:absolute; inset:0;
      background: radial-gradient(80% 60% at 50% 35%, transparent 0%, rgba(0,0,0,.40) 65%, rgba(0,0,0,.78) 100%);
    }

    @keyframes blob1{
      0% { transform: translate3d(0,0,0) scale(1); }
      40%{ transform: translate3d(46px, 22px,0) scale(1.06); }
      78%{ transform: translate3d(-30px, 18px,0) scale(.98); }
      100%{ transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes blob2{
      0% { transform: translate3d(0,0,0) scale(1); }
      35%{ transform: translate3d(-52px, 30px,0) scale(1.05); }
      76%{ transform: translate3d(26px, -18px,0) scale(.99); }
      100%{ transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes blob3{
      0% { transform: translate3d(0,0,0) scale(1); }
      45%{ transform: translate3d(34px, -26px,0) scale(1.08); }
      82%{ transform: translate3d(-28px, 18px,0) scale(.97); }
      100%{ transform: translate3d(0,0,0) scale(1); }
    }
    @keyframes grainMove{
      0% { transform: translate3d(0,0,0); }
      100% { transform: translate3d(90px,60px,0); }
    }

    /* -----------------------------
      LAYOUT
    ----------------------------- */
    .container{
      width:100%;
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 0 20px;
    }

    section{ padding: 84px 0; }
    @media (max-width: 720px){
      section{ padding: 66px 0; }
    }

    /* reveal */
    .reveal{
      opacity:0;
      transform: translateY(14px);
      transition: opacity 650ms var(--ease), transform 650ms var(--ease);
      will-change: opacity, transform;
    }
    .reveal.in{
      opacity:1;
      transform: translateY(0);
    }

    /* subtle top progress bar */
    .progress{
      position:fixed;
      top:0; left:0; right:0;
      height:2px;
      z-index:50;
      pointer-events:none;
      background: rgba(255,255,255,.08);
    }
    .progress > div{
      height:100%;
      width:0%;
      background: linear-gradient(90deg, rgba(139,92,246,.95), rgba(56,189,248,.9));
      transition: width 70ms linear;
    }

    /* typography */
    h1,h2,h3{ margin:0; letter-spacing:-0.03em; }
    h1{
      font-weight: 800;
      font-size: clamp(38px, 6.3vw, 72px);
      line-height: 1.03;
    }
    h2{
      font-weight: 800;
      font-size: clamp(26px, 4.2vw, 46px);
      line-height: 1.08;
    }
    h3{
      font-weight: 800;
      font-size: clamp(18px, 3vw, 24px);
      line-height: 1.15;
    }

    p{ margin:0; }
    .muted{ color: var(--muted); }
    .dim{ color: var(--dim); }

    .accent{
      background: linear-gradient(90deg, rgba(220,210,255,.96), rgba(200,235,255,.92));
      -webkit-background-clip:text;
      background-clip:text;
      color: transparent;
    }

    /* pill badges */
    .pill{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--hair);
      background: rgba(255,255,255,.06);
      color: rgba(240,240,240,.86);
      font-size: 12px;
      letter-spacing: .01em;
      box-shadow: 0 18px 60px -50px rgba(0,0,0,.9);
      backdrop-filter: blur(10px);
    }
    .pill .dot{
      width:7px; height:7px; border-radius:50%;
      background: rgba(56,189,248,.65);
      box-shadow: 0 0 18px rgba(56,189,248,.18);
    }

    /* cards */
    .card{
      border-radius: var(--radius2);
      border: 1px solid var(--hair2);
      background: rgba(255,255,255,.05);
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      overflow:hidden;
      position:relative;
    }
    .card::before{
      content:"";
      position:absolute;
      inset:-1px;
      opacity:.55;
      filter: blur(24px);
      background:
        radial-gradient(60% 80% at 25% 10%, rgba(139,92,246,.14), transparent 60%),
        radial-gradient(60% 80% at 85% 0%, rgba(56,189,248,.10), transparent 60%),
        radial-gradient(55% 80% at 50% 115%, rgba(165,180,252,.07), transparent 60%);
      pointer-events:none;
    }
    .card > *{ position:relative; }

    /* buttons */
    .btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      border-radius: 999px;
      padding: 12px 16px;
      font-weight: 700;
      font-size: 14px;
      border: 1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06);
      color: rgba(240,240,240,.92);
      transition: transform 220ms var(--ease), background 220ms var(--ease), border-color 220ms var(--ease);
      will-change: transform;
    }
    .btn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.20); }
    .btn:active{ transform: translateY(0px); }

    .btn.primary{
      background: linear-gradient(90deg, rgba(124,58,237,.95), rgba(139,92,246,.92));
      border-color: rgba(124,58,237,.35);
      color: #0B0B14;
      box-shadow: 0 26px 90px -70px rgba(124,58,237,.95);
    }
    .btn.primary:hover{ filter: brightness(1.02); }
    .btn.outline{
      background: rgba(255,255,255,.02);
      border-color: rgba(255,255,255,.18);
    }

    .link{
      display:inline-flex;
      align-items:center;
      gap:8px;
      font-weight: 650;
      color: rgba(240,240,240,.88);
      padding: 6px 0;
      border-bottom: 1px solid transparent;
      transition: border-color 220ms var(--ease), transform 220ms var(--ease), opacity 220ms var(--ease);
      opacity:.92;
    }
    .link:hover{
      border-color: rgba(240,240,240,.28);
      transform: translateY(-1px);
      opacity:1;
    }

    /* section headers */
    .section-head{
      display:flex;
      flex-direction:column;
      gap:14px;
      max-width: 860px;
    }
    .subline{
      font-size: 15px;
      line-height: 1.65;
      color: rgba(240,240,240,.72);
      max-width: 70ch;
    }

    /* -----------------------------
      BLOCK 1 — HERO
    ----------------------------- */
    .hero{
      min-height: 92svh;
      display:flex;
      align-items:center;
      padding: 110px 0 80px;
    }
    @media (max-width: 720px){
      .hero{ padding: 92px 0 66px; min-height: 86svh; }
    }
    .hero-inner{
      display:flex;
      flex-direction:column;
      gap:18px;
      align-items:flex-start;
      max-width: 860px;
    }
    .hero h1{
      white-space:pre-line;
    }

    /* -----------------------------
      BLOCK 2 — REFERENCE (halo + mini story)
    ----------------------------- */
    .ref-wrap{ display:grid; grid-template-columns: 1fr; gap:16px; }
    @media (min-width: 940px){
      .ref-wrap{ grid-template-columns: 1.2fr .8fr; gap:18px; align-items:stretch; }
    }
    .mock{
      aspect-ratio: 16 / 10;
      width:100%;
      border-radius: 22px;
      background:
        linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)),
        radial-gradient(1100px 600px at 25% 10%, rgba(139,92,246,.14), transparent 60%),
        radial-gradient(900px 600px at 85% 0%, rgba(56,189,248,.11), transparent 60%);
      border: 1px solid rgba(255,255,255,.10);
      position:relative;
      overflow:hidden;
    }
    /* browser chrome */
    .mock .chrome{
      position:absolute;
      top:0; left:0; right:0;
      height: 46px;
      display:flex;
      align-items:center;
      gap:10px;
      padding: 0 14px;
      background: rgba(0,0,0,.28);
      border-bottom: 1px solid rgba(255,255,255,.08);
      backdrop-filter: blur(10px);
    }
    .dots{ display:flex; gap:8px; }
    .dots span{
      width:10px; height:10px; border-radius:999px;
      background: rgba(240,240,240,.20);
    }
    .url{
      margin-left:6px;
      font-size: 12px;
      color: rgba(240,240,240,.60);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      padding: 6px 10px;
      border-radius: 999px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 70%;
    }
    .mock .shot{
      position:absolute;
      inset:46px 0 0 0;
      display:flex;
      align-items:center;
      justify-content:center;
      color: rgba(240,240,240,.55);
      font-size: 13px;
      letter-spacing:.01em;
    }
    .mock .shot::before{
      content:"Screenshot-Platzhalter (hier dein echtes Bild einsetzen)";
      padding: 10px 12px;
      border-radius: 999px;
      border: 1px dashed rgba(240,240,240,.22);
      background: rgba(0,0,0,.18);
    }
    .ref-copy{
      padding: 18px 18px 20px;
      display:flex;
      flex-direction:column;
      gap:12px;
      justify-content:center;
    }
    .ref-story{
      font-size: 14.5px;
      line-height: 1.65;
      color: rgba(240,240,240,.72);
      max-width: 60ch;
    }

    /* -----------------------------
      BLOCK 3 — FREE ANALYSIS (reciprocity)
    ----------------------------- */
    .analysis{
      padding: 22px 18px;
    }
    .analysis-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 16px;
      align-items:center;
    }
    @media (min-width: 900px){
      .analysis-grid{ grid-template-columns: 1.2fr .8fr; }
    }
    .note{
      font-size: 12.5px;
      color: rgba(240,240,240,.55);
      line-height: 1.55;
    }

    /* -----------------------------
      BLOCK 4 — PACKAGES (anchor + contrast + default)
    ----------------------------- */
    .packages-head{
      display:flex;
      flex-direction:column;
      gap:10px;
      margin-bottom: 18px;
      max-width: 860px;
    }
    .packages-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    @media (min-width: 960px){
      .packages-grid{ grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    }

    .pkg{
      padding: 18px 18px 20px;
      min-height: 100%;
      display:flex;
      flex-direction:column;
      gap: 12px;
      border-radius: var(--radius2);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      position:relative;
      overflow:hidden;
      transition: transform 220ms var(--ease), border-color 220ms var(--ease), background 220ms var(--ease);
    }
    .pkg:hover{
      transform: translateY(-2px);
      border-color: rgba(255,255,255,.18);
      background: rgba(255,255,255,.05);
    }

    .pkg .top{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap: 12px;
    }
    .pkg .name{
      font-weight: 800;
      letter-spacing:-0.02em;
      font-size: 16px;
    }
    .price{
      font-weight: 800;
      letter-spacing:-0.02em;
      font-size: 20px;
      white-space: nowrap;
    }
    .lead{
      color: rgba(240,240,240,.70);
      font-size: 13.5px;
      line-height: 1.55;
    }

    .list{
      display:flex;
      flex-direction:column;
      gap: 9px;
      margin-top: 2px;
    }
    .li{
      display:flex;
      gap: 10px;
      align-items:flex-start;
      color: rgba(240,240,240,.78);
      font-size: 13.5px;
      line-height: 1.55;
    }
    .li svg{ width:18px; height:18px; flex: 0 0 auto; opacity:.82; margin-top: 1px; }

    .meta{
      margin-top:auto;
      display:flex;
      flex-direction:column;
      gap: 6px;
      padding-top: 10px;
      border-top: 1px solid rgba(255,255,255,.08);
      color: rgba(240,240,240,.62);
      font-size: 12.5px;
      line-height: 1.55;
    }

    .pkg.anchor::before{
      content:"";
      position:absolute;
      inset:-1px;
      opacity:.55;
      filter: blur(26px);
      background: radial-gradient(70% 60% at 25% 10%, rgba(165,180,252,.10), transparent 62%),
                  radial-gradient(60% 70% at 85% 0%, rgba(56,189,248,.10), transparent 60%);
      pointer-events:none;
    }

    /* default highlight */
    .pkg.default{
      border-color: rgba(124,58,237,.40);
      background: rgba(124,58,237,.07);
      transform: translateY(-2px);
    }
    .pkg.default:hover{ transform: translateY(-4px); }
    .badge-mini{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(124,58,237,.35);
      background: rgba(124,58,237,.14);
      color: rgba(240,240,240,.88);
      font-size: 12px;
      font-weight: 650;
      width: fit-content;
    }
    .badge-mini .spark{
      width:6px; height:6px; border-radius:999px;
      background: rgba(56,189,248,.75);
      box-shadow: 0 0 14px rgba(56,189,248,.18);
    }

    .packages-foot{
      margin-top: 14px;
      display:flex;
      flex-direction:column;
      gap: 10px;
    }
    .infobox{
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(0,0,0,.16);
      padding: 14px 14px;
      color: rgba(240,240,240,.70);
      font-size: 13.5px;
      line-height: 1.6;
    }
    .social{
      color: rgba(240,240,240,.52);
      font-style: italic;
      font-size: 13px;
      line-height: 1.6;
    }

    /* -----------------------------
      BLOCK 5 — PAYMENT CALCULATOR (framing + reduce load)
    ----------------------------- */
    .calc{
      padding: 18px;
    }
    .calc-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    @media (min-width: 980px){
      .calc-grid{ grid-template-columns: 1fr 1fr; gap: 14px; align-items:start; }
    }

    .seg{
      display:flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .seg button{
      cursor:pointer;
      border-radius: 999px;
      padding: 10px 12px;
      font-weight: 700;
      font-size: 13px;
      border: 1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.05);
      color: rgba(240,240,240,.86);
      transition: transform 200ms var(--ease), border-color 200ms var(--ease), background 200ms var(--ease);
    }
    .seg button:hover{ transform: translateY(-1px); border-color: rgba(255,255,255,.22); background: rgba(255,255,255,.07); }
    .seg button.active{
      border-color: rgba(124,58,237,.45);
      background: rgba(124,58,237,.14);
    }

    .inputrow{
      display:flex;
      align-items:center;
      gap: 10px;
      margin-top: 10px;
    }
    .inputwrap{
      flex:1 1 auto;
      display:flex;
      align-items:center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.18);
    }
    .inputwrap svg{ width:18px; height:18px; opacity:.82; }
    .inputwrap input{
      width:100%;
      border:none;
      outline:none;
      background: transparent;
      color: rgba(240,240,240,.92);
      font-weight: 750;
      font-size: 14px;
    }
    .inputwrap input::placeholder{ color: rgba(240,240,240,.42); font-weight: 650; }

    .paylist{
      display:flex;
      flex-direction:column;
      gap: 10px;
      margin-top: 10px;
    }
    .payrow{
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      padding: 12px 12px;
      display:flex;
      gap: 12px;
      align-items:flex-start;
    }
    .payrow .n{
      width:34px; height:34px;
      border-radius: 12px;
      display:flex; align-items:center; justify-content:center;
      background: rgba(255,255,255,.10);
      border: 1px solid rgba(255,255,255,.10);
      color: rgba(240,240,240,.90);
      font-weight: 850;
      flex: 0 0 auto;
    }
    .payrow .txt{ flex:1 1 auto; display:flex; flex-direction:column; gap:2px; }
    .payrow .title{ font-weight: 800; font-size: 13.5px; letter-spacing:-0.01em; }
    .payrow .sub{ color: rgba(240,240,240,.62); font-size: 12.5px; line-height: 1.5; }
    .payrow .amt{ font-weight: 850; letter-spacing:-0.02em; white-space: nowrap; color: rgba(240,240,240,.92); }

    .framebox{
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(0,0,0,.16);
      padding: 14px 14px;
      color: rgba(240,240,240,.72);
      font-size: 13.5px;
      line-height: 1.6;
    }

    /* -----------------------------
      BLOCK 6 — PROCESS (effort justification + milestone glow)
    ----------------------------- */
    .timeline{
      margin-top: 16px;
      display:grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .phase{
      position:relative;
      border-radius: var(--radius2);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      overflow:hidden;
      padding: 16px 16px 16px 58px;
      min-height: 110px;
      transition: border-color 220ms var(--ease), background 220ms var(--ease);
    }
    .phase:hover{ border-color: rgba(255,255,255,.18); background: rgba(255,255,255,.05); }

    /* left rail */
    .phase::before{
      content:"";
      position:absolute;
      left: 28px;
      top: 18px;
      bottom: 18px;
      width: 2px;
      background: rgba(255,255,255,.10);
      border-radius: 2px;
    }
    /* animated fill when "completed" in viewport */
    .phase .fill{
      position:absolute;
      left: 28px;
      top: 18px;
      width: 2px;
      height: 0%;
      background: linear-gradient(180deg, rgba(139,92,246,.95), rgba(56,189,248,.85));
      border-radius: 2px;
      transition: height 900ms var(--ease);
      box-shadow: 0 0 24px rgba(124,58,237,.18);
    }
    .phase.inview .fill{ height: calc(100% - 36px); }

    .phase .badgeN{
      position:absolute;
      left: 12px;
      top: 14px;
      width: 34px;
      height: 34px;
      border-radius: 14px;
      display:flex; align-items:center; justify-content:center;
      font-weight: 900;
      background: rgba(255,255,255,.10);
      border: 1px solid rgba(255,255,255,.10);
      color: rgba(240,240,240,.92);
    }
    .phase .h{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap: 12px;
      margin-bottom: 6px;
    }
    .phase .t{
      font-weight: 850;
      letter-spacing:-0.02em;
      font-size: 15px;
    }
    .phase .ms{
      display:inline-flex;
      align-items:center;
      gap:8px;
      color: rgba(240,240,240,.60);
      font-size: 12.5px;
      white-space: nowrap;
    }
    .phase .ms svg{ width:16px; height:16px; opacity:.8; }
    .phase .d{
      color: rgba(240,240,240,.72);
      font-size: 13.5px;
      line-height: 1.6;
      max-width: 90ch;
      white-space: pre-line;
    }

    /* -----------------------------
      BLOCK 7 — OBJECTIONS (risk reduction, not FAQ-y)
    ----------------------------- */
    .objections{
      display:grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 14px;
    }
    @media (min-width: 980px){
      .objections{ grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    }
    .ob{
      padding: 16px 16px;
      border-radius: var(--radius2);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
    }
    .ob .q{
      font-weight: 850;
      letter-spacing:-0.02em;
      margin-bottom: 8px;
    }
    .ob .a{
      color: rgba(240,240,240,.72);
      font-size: 13.5px;
      line-height: 1.6;
    }

    /* -----------------------------
      BLOCK 8 — RETAINER
    ----------------------------- */
    .ret-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 14px;
    }
    @media (min-width: 900px){
      .ret-grid{ grid-template-columns: 1fr 1fr; }
    }
    .ret{
      padding: 18px 18px;
      border-radius: var(--radius2);
      border: 1px solid rgba(255,255,255,.10);
      background: rgba(255,255,255,.04);
      display:flex;
      flex-direction:column;
      gap: 10px;
    }
    .ret .tt{
      font-weight: 900;
      letter-spacing:-0.02em;
      font-size: 16px;
    }
    .ret .pp{
      color: rgba(240,240,240,.72);
      font-size: 13.5px;
      line-height: 1.6;
    }
    .ret .tag{
      margin-top:auto;
      color: rgba(240,240,240,.58);
      font-size: 12.5px;
      border-top: 1px solid rgba(255,255,255,.08);
      padding-top: 10px;
      line-height: 1.5;
    }

    /* -----------------------------
      BLOCK 9 — CTA
    ----------------------------- */
    .cta{
      padding: 22px 18px;
    }
    .cta-actions{
      margin-top: 12px;
      display:flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    footer{
      padding: 26px 0 40px;
      color: rgba(240,240,240,.45);
      font-size: 12.5px;
      text-align:center;
    }
  </style>
</head>

<body>
  <!-- fixed background layers -->
  <div class="bg-fixed" aria-hidden="true">
    <div class="blobs">
      <div class="blob v1"></div>
      <div class="blob b1"></div>
      <div class="blob v2"></div>
    </div>
    <div class="grain"></div>
    <div class="vignette"></div>
  </div>

  <!-- scroll progress -->
  <div class="progress" aria-hidden="true"><div id="pbar"></div></div>

  <!-- BLOCK 1 — HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner reveal">
        <div class="pill">
          <span class="dot" aria-hidden="true"></span>
          Aktuell plane ich Kapazität für bis zu zwei neue Projekte gleichzeitig.
        </div>

        <h1>Klar. Strukturiert.
Ohne Agenturpreis.</h1>

        <p class="subline">
          Jeden Monat verlieren lokale Unternehmen Anfragen an Wettbewerber mit besserem Webauftritt.
          Ich setze einen Auftritt um, der führt – in Tagen, nicht Monaten.
        </p>
      </div>
    </div>
  </section>

  <!-- BLOCK 2 — REFERENZ -->
  <section>
    <div class="container">
      <div class="ref-wrap">
        <div class="card reveal">
          <div style="padding:14px;">
            <div class="mock">
              <div class="chrome">
                <div class="dots" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <div class="url">leonseitz.com</div>
              </div>
              <div class="shot" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <div class="card reveal">
          <div class="ref-copy">
            <h3>Ein Eindruck, der hängen bleibt.</h3>
            <p class="ref-story">
              Ein Unternehmer aus der Region hatte keinen klaren Online-Auftritt.
              Nach dem Go-Live kamen die ersten qualifizierten Anfragen – weil der Weg zur Kontaktaufnahme endlich eindeutig war.
            </p>

            <div style="display:flex; justify-content:flex-end;">
              <a class="link" href="https://leonseitz.com" target="_blank" rel="noopener noreferrer">
                leonseitz.com ansehen
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p class="note">
              Hinweis: Der Screenshot ist hier bewusst als Platzhalter. Du kannst ihn später durch ein echtes Bild ersetzen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 3 — KOSTENLOSE WEBSITE-ANALYSE -->
  <section>
    <div class="container">
      <div class="card analysis reveal">
        <div class="analysis-grid">
          <div>
            <h2>Kostenlose Website-Analyse</h2>
            <p class="subline" style="margin-top:12px;">
              Ich schaue mir deinen aktuellen Auftritt an und sage dir in 15 Minuten konkret, was fehlt – und was ich ändern würde.
              Kein Pitch. Kein Commitment.
            </p>
            <p class="note" style="margin-top:10px;">
              Normalerweise ist dieser Schritt Teil bezahlter Beratung. Für neue Anfragen mache ich ihn als Einstieg kostenlos.
            </p>
          </div>

          <div style="display:flex; justify-content:flex-start; align-items:center; gap:10px; flex-wrap:wrap;">
            <a class="btn primary" href="https://wa.me/4916095757167" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle"></i>
              Analyse anfragen
            </a>
            <a class="btn outline" href="mailto:hello@leonseitz.com?subject=Website-Analyse%20anfragen" aria-label="Per Mail schreiben">
              <i data-lucide="mail"></i>
              Per Mail
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 4 — PAKETE -->
  <section>
    <div class="container">
      <div class="packages-head reveal">
        <h2>Was du bekommst.</h2>
        <p class="subline">Vergleichbare Agenturen starten häufig deutlich höher (z.B. ab 3.000 €) – hier arbeitest du direkt mit mir, ohne Umwege.</p>
      </div>

      <div class="packages-grid">
        <!-- Anchor first -->
        <div class="pkg anchor reveal" data-pkg="komplett" data-amount="1100">
          <div class="top">
            <div>
              <div class="name">Komplett</div>
              <div class="lead">Für einen Auftritt, der als System funktioniert.</div>
            </div>
            <div class="price">ab 1.100 €</div>
          </div>

          <div class="list">
            <div class="li"><i data-lucide="check-circle-2"></i><span>Website bis 5 Seiten</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Vollständiges Brandbook (Farben, Typo, Layoutregeln)</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Ein Motion-Element für Social Media</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Übergabe aller Zugänge und Dateien</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Optional: Betreuung ab 150 €/Monat</span></div>
          </div>

          <div class="meta">
            <div><strong>Lieferzeit:</strong> ca. 3 Wochen (je nach Umfang & Feedbacktempo)</div>
          </div>
        </div>

        <!-- Default middle -->
        <div class="pkg default reveal" data-pkg="standard" data-amount="700" aria-label="Standard Paket (vorausgewählt)">
          <div class="badge-mini"><span class="spark" aria-hidden="true"></span>Wird am häufigsten gewählt</div>

          <div class="top" style="margin-top:2px;">
            <div>
              <div class="name">Standard</div>
              <div class="lead">Klarer Webauftritt mit sauberer Führung zur Anfrage.</div>
            </div>
            <div class="price">ab 700 €</div>
          </div>

          <div class="list">
            <div class="li"><i data-lucide="check-circle-2"></i><span>Website bis 5 Seiten</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Branding-Grundlage (Farben, Schrift, Logo-Einbindung)</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Kontaktformular, mobil optimiert</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Übergabe aller Zugänge</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Optional: Betreuung ab 150 €/Monat</span></div>
          </div>

          <div class="meta">
            <div><strong>Lieferzeit:</strong> 10–14 Tage (bei zügigem Feedback)</div>
          </div>
        </div>

        <!-- Entry -->
        <div class="pkg reveal" data-pkg="einstieg" data-amount="400">
          <div class="top">
            <div>
              <div class="name">Einstieg</div>
              <div class="lead">Eine Landingpage, ein Ziel, ein klarer CTA.</div>
            </div>
            <div class="price">ab 400 €</div>
          </div>

          <div class="list">
            <div class="li"><i data-lucide="check-circle-2"></i><span>Eine Landingpage</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Klare Struktur, ein CTA</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Mobil optimiert</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Übergabe aller Zugänge</span></div>
            <div class="li"><i data-lucide="check-circle-2"></i><span>Optional: Betreuung ab 150 €/Monat</span></div>
          </div>

          <div class="meta">
            <div><strong>Lieferzeit:</strong> ca. 7 Tage (bei klarer Vorlage)</div>
          </div>
        </div>
      </div>

      <div class="packages-foot reveal">
        <div class="infobox">
          Alle Preise sind Ausgangspunkte. Nach der kostenlosen Analyse bekommst du ein konkretes Angebot mit Scope – damit es keine Überraschungen gibt.
        </div>
        <div class="social">Hinweis: Viele Entscheidungen fallen leichter, wenn man einen lokalen Vergleich hat. Darum ist die Analyse vorab der Standardstart.</div>
      </div>
    </div>
  </section>

  <!-- BLOCK 5 — ZAHLUNGSRECHNER -->
  <section>
    <div class="container">
      <div class="card calc reveal">
        <div class="calc-grid">
          <div>
            <h2>Wann zahlst du was?</h2>
            <p class="subline" style="margin-top:12px;">
              Du zahlst erst weiter, wenn der Stand passt. Die zweite Rate wird erst fällig, nachdem du die erste Version gesehen und freigegeben hast.
            </p>

            <div class="seg" role="tablist" aria-label="Paketauswahl">
              <button type="button" data-set="400">Einstieg (400 €)</button>
              <button type="button" data-set="700" class="active" aria-selected="true">Standard (700 €)</button>
              <button type="button" data-set="1100">Komplett (1.100 €)</button>
            </div>

            <div class="inputrow">
              <div class="inputwrap" aria-label="Projektpreis eingeben">
                <i data-lucide="euro"></i>
                <input id="amount" inputmode="numeric" pattern="[0-9]*" placeholder="z.B. 700" />
              </div>
            </div>

            <div class="paylist" aria-live="polite">
              <div class="payrow">
                <div class="n">1</div>
                <div class="txt">
                  <div class="title">Projektstart (40 %)</div>
                  <div class="sub">Fällig nach Auftragsbestätigung</div>
                </div>
                <div class="amt" id="p1">280 €</div>
              </div>

              <div class="payrow">
                <div class="n">2</div>
                <div class="txt">
                  <div class="title">Erste Version (40 %)</div>
                  <div class="sub">Fällig nachdem du die erste Version gesehen und freigegeben hast</div>
                </div>
                <div class="amt" id="p2">280 €</div>
              </div>

              <div class="payrow">
                <div class="n">3</div>
                <div class="txt">
                  <div class="title">Go-Live (20 %)</div>
                  <div class="sub">Fällig nach Übergabe</div>
                </div>
                <div class="amt" id="p3">140 €</div>
              </div>
            </div>
          </div>

          <div class="framebox">
            <strong>Warum diese Aufteilung?</strong><br><br>
            Diese Struktur schützt beide Seiten: Du gibst erst dann den nächsten Schritt frei, wenn du den Stand gesehen hast.
            Und ich arbeite mit klarem Auftrag weiter – ohne Scope-Creep, ohne Unklarheit, ohne „wir schauen mal“.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 6 — PROZESS -->
  <section>
    <div class="container">
      <div class="section-head reveal">
        <h2>Wie das konkret abläuft.</h2>
        <p class="subline">
          Du bist nicht „nur Abnehmer“. Du siehst Zwischenschritte, gibst Feedback und weißt jederzeit, wo wir stehen.
          Agil bedeutet hier: klare Sprints, klare Meilensteine, klare Freigaben.
        </p>
      </div>

      <div class="timeline">
        <div class="phase reveal" data-phase>
          <span class="fill" aria-hidden="true"></span>
          <div class="badgeN">1</div>
          <div class="h">
            <div class="t">Briefing</div>
            <div class="ms"><i data-lucide="flag"></i><span>Meilenstein: Scope definiert</span></div>
          </div>
          <div class="d">Du schickst Ziel, Stand und Deadline.
Ich analysiere das und antworte innerhalb von 24 Stunden mit einer ersten Einschätzung und konkreten Rückfragen.</div>
        </div>

        <div class="phase reveal" data-phase>
          <span class="fill" aria-hidden="true"></span>
          <div class="badgeN">2</div>
          <div class="h">
            <div class="t">Konzept & Struktur</div>
            <div class="ms"><i data-lucide="flag"></i><span>Meilenstein: Struktur freigegeben</span></div>
          </div>
          <div class="d">Ich lege Seitenaufbau, Inhalte und die Branding-Grundlage fest.
Du bekommst das zur Freigabe – erst danach fange ich an zu bauen.</div>
        </div>

        <div class="phase reveal" data-phase>
          <span class="fill" aria-hidden="true"></span>
          <div class="badgeN">3</div>
          <div class="h">
            <div class="t">Erste Version & Feedback</div>
            <div class="ms"><i data-lucide="flag"></i><span>Meilenstein: Review abgeschlossen</span></div>
          </div>
          <div class="d">Du bekommst eine lauffähige Version zum Testen.
Eine vollständige Feedback-Runde ist eingebaut – keine Extra-Kosten.
Nach der Freigabe wird die zweite Rate fällig.</div>
        </div>

        <div class="phase reveal" data-phase>
          <span class="fill" aria-hidden="true"></span>
          <div class="badgeN">4</div>
          <div class="h">
            <div class="t">Finalisierung</div>
            <div class="ms"><i data-lucide="flag"></i><span>Meilenstein: Freigabe erteilt</span></div>
          </div>
          <div class="d">Letzte Anpassungen, Feinschliff, technische Stabilisierung.
Was vereinbart war, wird geliefert – keine Überraschungen, kein Scope-Creep.</div>
        </div>

        <div class="phase reveal" data-phase>
          <span class="fill" aria-hidden="true"></span>
          <div class="badgeN">5</div>
          <div class="h">
            <div class="t">Übergabe</div>
            <div class="ms"><i data-lucide="flag"></i><span>Meilenstein: Go-Live</span></div>
          </div>
          <div class="d">Du bekommst alle Dateien, Zugänge und ein kurzes Setup-Briefing.
Optional geht es ab hier in Betreuung – wenn du Updates ohne Reibung willst.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 7 — EINWÄNDE -->
  <section>
    <div class="container">
      <div class="section-head reveal">
        <h2>Was wenn…?</h2>
        <p class="subline">
          Drei typische Risiken – und wie sie im Prozess abgefedert sind.
        </p>
      </div>

      <div class="objections">
        <div class="ob reveal">
          <div class="q">Was wenn mir das Ergebnis nicht gefällt?</div>
          <div class="a">
            Du siehst die erste Version, bevor die zweite Rate fällig wird.
            Feedback ist eingeplant – nicht „on top“.
          </div>
        </div>

        <div class="ob reveal">
          <div class="q">Was wenn ich später Änderungen brauche?</div>
          <div class="a">
            Dafür gibt es Betreuung ab 150 €/Monat – oder wir lösen es als separates Mini-Projekt.
            Du bekommst in jedem Fall einen klaren Rahmen.
          </div>
        </div>

        <div class="ob reveal">
          <div class="q">Was wenn mein Budget nicht reicht?</div>
          <div class="a">
            Nach der Analyse machen wir ein passendes Angebot.
            Oft reicht ein sauberer Einstieg, der später erweitert wird.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 8 — RETAINER -->
  <section>
    <div class="container">
      <div class="section-head reveal">
        <h2>Nach dem Projekt.</h2>
        <p class="subline">
          Entweder saubere Übergabe – oder laufende Pflege. Ohne Abo-Stress, monatlich kündbar.
        </p>
      </div>

      <div class="ret-grid">
        <div class="ret reveal">
          <div class="tt">Einmalig</div>
          <div class="pp">Fixer Preis. Klare Umsetzung. Saubere Übergabe. Kein Folgevertrag.</div>
          <div class="tag">Ideal, wenn du intern weiterarbeiten willst.</div>
        </div>

        <div class="ret reveal">
          <div class="tt">Mit Betreuung</div>
          <div class="pp">Projekt + monatliche Pflege ab 150 €/Monat. Updates, Anpassungen, Ansprechpartner.</div>
          <div class="tag">Ideal, wenn du schnell iterieren willst, ohne Reibung.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOCK 9 — CTA -->
  <section>
    <div class="container">
      <div class="card cta reveal">
        <div class="section-head">
          <h2>Passt das?</h2>
          <p class="subline">
            Sag mir, welches Paket grob passt – oder starte mit der kostenlosen Analyse.
            Beides dauert keine zwei Minuten.
          </p>
          <div class="cta-actions">
            <a class="btn primary" href="https://wa.me/4916095757167" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle"></i>
              Kostenlose Analyse anfragen
            </a>
            <a class="btn outline" href="mailto:hello@leonseitz.com?subject=Projektanfrage" aria-label="Per Mail schreiben">
              <i data-lucide="mail"></i>
              Per Mail schreiben
            </a>
          </div>
          <p class="note" style="margin-top:10px;">
            Copy/Paste: Ziel · Deadline · aktueller Stand · Link/Beispiele (optional)
          </p>
        </div>
      </div>
    </div>
  </section>

  <footer>© <span id="y"></span> Leon Seitz · Prozess</footer>

  <!-- Lucide Icons (CDN) -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    /*
      Interactions:
      1) Scroll progress bar
      2) Reveal-on-scroll (section elements)
      3) Process phases: fill rail when each phase enters viewport ("done" feeling)
      4) Payment calculator with package defaults + live typing
    */
    (function () {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Icons
      if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();

      // Footer year
      document.getElementById('y').textContent = String(new Date().getFullYear());

      // Scroll progress
      const pbar = document.getElementById('pbar');
      const onScroll = () => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
        const p = doc.scrollTop / max;
        if (pbar) pbar.style.width = Math.round(p * 100) + '%';
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Reveal-on-scroll
      const revealEls = Array.from(document.querySelectorAll('.reveal'));
      if (!prefersReduced && 'IntersectionObserver' in window) {
        const rObs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              rObs.unobserve(e.target);
            }
          });
        }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
        revealEls.forEach(el => rObs.observe(el));
      } else {
        revealEls.forEach(el => el.classList.add('in'));
      }

      // Process phases "completed" animation
      const phases = Array.from(document.querySelectorAll('[data-phase]'));
      if (!prefersReduced && 'IntersectionObserver' in window) {
        const pObs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('inview');
          });
        }, { threshold: 0.35, rootMargin: '0px 0px -15% 0px' });
        phases.forEach(el => pObs.observe(el));
      } else {
        phases.forEach(el => el.classList.add('inview'));
      }

      // Payment calculator
      const amountInput = document.getElementById('amount');
      const p1 = document.getElementById('p1');
      const p2 = document.getElementById('p2');
      const p3 = document.getElementById('p3');

      const segButtons = Array.from(document.querySelectorAll('.seg button'));

      // Default Effect: Standard (700€) preselected
      let current = 700;

      const formatEUR = (n) => {
        // Integer euros, German formatting
        const v = Math.round(n);
        return v.toLocaleString('de-DE') + ' €';
      };

      const compute = (val) => {
        const v = Number.isFinite(val) ? Math.max(0, val) : 0;
        const a1 = v * 0.40;
        const a2 = v * 0.40;
        const a3 = v * 0.20;
        p1.textContent = formatEUR(a1);
        p2.textContent = formatEUR(a2);
        p3.textContent = formatEUR(a3);
      };

      const setActiveSeg = (value) => {
        current = value;
        segButtons.forEach(b => {
          const is = Number(b.dataset.set) === value;
          b.classList.toggle('active', is);
          if (is) b.setAttribute('aria-selected', 'true');
          else b.removeAttribute('aria-selected');
        });
        if (amountInput) amountInput.value = String(value);
        compute(value);
      };

      segButtons.forEach(b => {
        b.addEventListener('click', () => {
          const v = Number(b.dataset.set);
          if (!Number.isFinite(v)) return;
          setActiveSeg(v);
        });
      });

      // Input: live typing
      const parseNumber = (s) => {
        if (!s) return NaN;
        // keep digits only
        const digits = String(s).replace(/[^\d]/g, '');
        if (!digits) return NaN;
        return Number(digits);
      };

      if (amountInput) {
        amountInput.addEventListener('input', (e) => {
          const v = parseNumber(e.target.value);
          // If empty/invalid -> keep placeholders based on current default
          if (!Number.isFinite(v)) {
            compute(current);
            return;
          }
          // remove segment highlight if custom value differs from presets
          const preset = [400,700,1100].includes(v);
          if (preset) {
            setActiveSeg(v);
          } else {
            segButtons.forEach(btn => {
              btn.classList.remove('active');
              btn.removeAttribute('aria-selected');
            });
            current = v;
            compute(v);
          }
        });
      }

      // Initial
      setActiveSeg(700);
    })();
  </script>
</body>
</html>
