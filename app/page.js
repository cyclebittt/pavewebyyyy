'use client';

import { useEffect } from 'react';
import './ls-v4.css';

/* ─── WhatsApp-Links ─── */
const WA_WEBSITE = 'https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AIch%20interessiere%20mich%20f%C3%BCr%20eine%20neue%20Website.';
const WA_ANALYSE = 'https://wa.me/4916095757167?text=Hi%20Leon%2C%0A%0AIch%20interessiere%20mich%20f%C3%BCr%20eine%20kostenlose%20Analyse.';
const WA_PAKET_WEBSITE = 'https://wa.me/4916095757167?text=Hi%20Leon%2C%20ich%20interessiere%20mich%20f%C3%BCr%20das%20Website-Paket.';
const WA_PAKET_EIGEN = 'https://wa.me/4916095757167?text=Hi%20Leon%2C%20ich%20interessiere%20mich%20f%C3%BCr%20das%20Eigenst%C3%A4ndig-Paket.';
const WA_PAKET_SERVICE = 'https://wa.me/4916095757167?text=Hi%20Leon%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Servicepauschale.';

/* ══════════════════════════════════════════════
   Leon Seitz v4 — Scripts (portiert aus ls-v4.js)
   Loader · Hero-Video · Lesefluss (Progress, Rail,
   Read-Along) · Referenz-Switcher · Prozess · GEO
   ══════════════════════════════════════════════ */
function initV4() {
  const listeners = [];
  const timers = [];
  const observers = [];
  /* alle Listener getrackt registrieren — der Cleanup entfernt sie
     vollständig, damit React StrictMode (Doppel-Mount) nichts doppelt */
  const on = (target, ev, fn, opts) => {
    target.addEventListener(ev, fn, opts);
    listeners.push([target, ev, fn, opts]);
  };
  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  };

  /* ── Loader ── */
  const loader = document.querySelector('.loader');
  later(() => {
    if (loader) loader.classList.add('exit');
    later(() => { if (loader) loader.style.display = 'none'; }, 900);
  }, 900);

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Lesefluss 1: Scroll-Fortschritt ── */
  const prog = document.getElementById('scrollProgress');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (prog) prog.style.width = p.toFixed(2) + '%';
  }

  on(window, 'scroll', updateProgress, { passive: true });
  on(window, 'resize', updateProgress);
  updateProgress();

  /* ── Reveal + expand on scroll ── */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .expand-card').forEach((el) => revObs.observe(el));
  observers.push(revObs);

  function revealCheck() {
    const vh = window.innerHeight;
    document.querySelectorAll('.reveal:not(.visible), .expand-card:not(.visible)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.88 && r.bottom > 0) el.classList.add('visible');
    });
  }
  on(window, 'scroll', revealCheck, { passive: true });
  on(window, 'resize', revealCheck);
  revealCheck();
  later(() => {
    document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('visible'));
  }, 1300);

  /* ── Hero review cards (slidebar) ── */
  const REVIEWS = [
    { i: 'OH', c: '#E8A800,#C68F00', n: 'Oksana Hettinger', d: 'vor 3 Monaten', t: 'Von der ersten Idee bis zur finalen Umsetzung alles auf sehr hohem professionellen Niveau. Meine Wünsche wurden vollständig berücksichtigt.' },
    { i: 'DH', c: '#4285F4,#1a73e8', n: 'Dominic Hildebrandt', d: 'vor 5 Monaten', t: 'Ich kann Leon uneingeschränkt weiterempfehlen. Die Zusammenarbeit ist immer kooperativ, effektiv und zielführend.' },
    { i: 'P', c: '#34A853,#1e8e3e', n: 'Pascal', d: 'vor 20 Stunden', t: 'Klare und flexible Kommunikation. Schnelle und saubere Umsetzung nach einer ausführlichen Bedarfsanalyse.' },
    { i: 'LJ', c: '#EA4335,#c5221f', n: 'Laura Janke', d: 'vor 1 Monat', t: 'Zuverlässig — hält Fristen wie abgesprochen ein, gute zielführende Ideen, Top-Kommunikation.' },
    { i: 'I', c: '#9334E6,#7627bb', n: 'Ian', d: 'vor 2 Monaten', t: 'Schnelle Antworten, erstellt individuelle Top-Websites, Posts etc.' },
    { i: 'MG', c: '#E8A800,#9F5A2A', n: 'Michael Gärtner', d: 'vor 4 Monaten', t: 'Immer zuverlässig, spontan und qualitativ gearbeitet. Sehr zu empfehlen!' },
  ];
  const star = '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
  const revCard = (r) =>
    '<div class="hero-rev-card"><div class="top"><div class="av" style="background:linear-gradient(135deg,' + r.c + ')">' + r.i + '</div>' +
    '<div><div class="nm">' + r.n + '</div><div class="dt">' + r.d + '</div></div></div>' +
    '<div class="rstars">' + star + star + star + star + star + '</div><p>' + r.t + '</p></div>';
  const revScroll = document.getElementById('heroRevScroll');
  if (revScroll) {
    const html = REVIEWS.map(revCard).join('');
    revScroll.innerHTML = html + html;
  }

  /* ── Lesefluss 3: Mission Wort-für-Wort ── */
  let litTimer = null;
  const missionText = document.getElementById('missionText');
  if (missionText) {
    if (!missionText.querySelector('.w')) {
      const nodes = Array.prototype.slice.call(missionText.childNodes);
      missionText.innerHTML = '';
      nodes.forEach((node) => {
        const isGold = node.nodeType === 1 && node.classList && node.classList.contains('gold');
        const raw = node.textContent;
        raw.split(/(\s+)/).forEach((p) => {
          if (p === '') return;
          if (/^\s+$/.test(p)) { missionText.appendChild(document.createTextNode(' ')); return; }
          const span = document.createElement('span');
          span.className = 'w' + (isGold ? ' gold-w serif' : '');
          span.textContent = p;
          missionText.appendChild(span);
        });
      });
    }
    const words = missionText.querySelectorAll('.w');
    const runReadAlong = () => {
      if (litTimer) return;
      let i = 0;
      litTimer = setInterval(() => {
        if (i >= words.length) { clearInterval(litTimer); return; }
        words[i].classList.add('lit'); i++;
      }, 95);
    };
    const resetReadAlong = () => {
      if (litTimer) { clearInterval(litTimer); litTimer = null; }
      words.forEach((w) => w.classList.remove('lit'));
    };
    const missionEl = missionText.closest('.mission');
    const missionCheck = () => {
      const r = missionEl.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top < vh * 0.55 && r.bottom > vh * 0.45) runReadAlong();
      else if (r.bottom < 0 || r.top > vh) resetReadAlong();
    };
    on(window, 'scroll', missionCheck, { passive: true });
    missionCheck();
  }

  /* ── Referenzen: ein Screen, drei Projekte ── */
  const PROJECTS = [
    { num: '01.', kat: 'Fundraising · Landing Page', title: 'KFA Aschaffenburg',
      text: 'Konzept, Branding und Landing Page für eine Spendenkampagne — eigenverantwortlich umgesetzt.',
      url: 'https://kfa-fundraising.vercel.app/', slot: 'ref-kfa' },
    { num: '02.', kat: 'Gastronomie · Website', title: 'Star Döner',
      text: 'Digitaler Auftritt und klare Conversion für ein lokales Restaurant. Mobil-first, schnell ladend.',
      url: 'https://star-doner-website.vercel.app/', slot: 'ref-star' },
    { num: '03.', kat: 'Booking · Website', title: 'Angelo DJ',
      text: 'Direkte Buchungsstrecke und Branding für einen DJ. Keine Formulare, klares Auftreten.',
      url: 'https://angelo-site.vercel.app/', slot: 'ref-angelo' },
  ];
  const projNav = document.getElementById('projNav');
  const projNum = document.getElementById('projNum');
  const projInfo = document.getElementById('projInfo');
  const arrowSvg = '<svg viewBox="0 0 10 10" width="11" height="11" fill="none"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (projNav && projInfo) {
    const navItems = Array.prototype.slice.call(projNav.querySelectorAll('li'));
    const slots = Array.prototype.slice.call(document.querySelectorAll('.proj-slot'));
    let current = 0;
    const renderProj = (idx) => {
      const p = PROJECTS[idx];
      projNum.textContent = p.num;
      projInfo.innerHTML =
        '<div class="kat">' + p.kat + '</div>' +
        '<h2 class="proj-title">' + p.title + '</h2>' +
        '<p>' + p.text + '</p>' +
        '<a href="' + p.url + '" target="_blank" rel="noopener" class="go">Projekt ansehen ' + arrowSvg + '</a>';
      navItems.forEach((li, i) => li.classList.toggle('active', i === idx));
      slots.forEach((s) => s.classList.toggle('active', s.id === p.slot));
    };
    const switchProj = (idx) => {
      if (idx === current) return;
      current = idx;
      projInfo.classList.add('switching');
      later(() => {
        renderProj(idx);
        projInfo.classList.remove('switching');
      }, 280);
    };
    navItems.forEach((li) => {
      on(li, 'click', () => switchProj(parseInt(li.getAttribute('data-p'), 10)));
    });
    renderProj(0);
  }

  /* ── Projekt-Galerie: mehrere Bilder pro Slot, swipe- und klickbar ── */
  document.querySelectorAll('.proj-gallery').forEach((gal) => {
    const imgs = Array.prototype.slice.call(gal.querySelectorAll('.pg-img'));
    const dots = Array.prototype.slice.call(gal.querySelectorAll('.pg-dots i'));
    if (imgs.length < 2) return;
    let idx = 0;
    const show = (i) => {
      idx = (i + imgs.length) % imgs.length;
      imgs.forEach((im, j) => im.classList.toggle('active', j === idx));
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    };
    on(gal.querySelector('.pg-prev'), 'click', () => show(idx - 1));
    on(gal.querySelector('.pg-next'), 'click', () => show(idx + 1));
    let swipeX = null;
    on(gal, 'touchstart', (e) => { swipeX = e.touches[0].clientX; }, { passive: true });
    on(gal, 'touchend', (e) => {
      if (swipeX === null) return;
      const dx = e.changedTouches[0].clientX - swipeX;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      swipeX = null;
    }, { passive: true });
  });

  /* ── Prozess: expandierende Reihen (scrollgesteuert + Klick) ── */
  const howto = document.getElementById('howto');
  if (howto) {
    const rows = Array.prototype.slice.call(howto.querySelectorAll('.howrow'));
    let manual = false;
    let openIdx = -1;
    const openRow = (idx) => {
      if (idx === openIdx) return;
      openIdx = idx;
      rows.forEach((r, i) => r.classList.toggle('is-open', i === idx));
    };
    const autoFromScroll = () => {
      if (manual) return;
      const focusY = window.innerHeight * 0.42;
      let best = -1, bestD = Infinity;
      rows.forEach((r, i) => {
        const rect = r.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const c = rect.top + rect.height / 2;
        const d = Math.abs(c - focusY);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best !== -1) openRow(best);
    };
    rows.forEach((r, i) => {
      on(r, 'mouseenter', () => {
        manual = true;
        openRow(i);
      });
      on(r.querySelector('.hr-bar'), 'click', () => {
        manual = true;
        openRow(i);
      });
    });
    on(howto, 'mouseleave', () => {
      manual = false;
      autoFromScroll();
    });
    const howObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (!e.isIntersecting) manual = false; });
    }, { threshold: 0 });
    howObs.observe(howto);
    observers.push(howObs);
    on(window, 'scroll', autoFromScroll, { passive: true });
    on(window, 'resize', autoFromScroll);
    autoFromScroll();
  }

  /* ── GEO: choreografierte Chat-Sequenz ── */
  let gTimers = [];
  const geoScroll = document.getElementById('geoScroll');
  if (geoScroll) {
    const gStage = geoScroll.querySelector('.geo-stage');
    const gChat = document.getElementById('geoChat');
    const gQRow = document.getElementById('geoQRow');
    const gQ = document.getElementById('geoQ');
    const gQText = gQ.querySelector('.qtext');
    const gARow = document.getElementById('geoARow');
    const gAWords = document.getElementById('geoAWords');
    const gPoints = Array.prototype.slice.call(geoScroll.querySelectorAll('.geo-point'));
    const QUESTION = 'Wer baut moderne Websites für kleine Unternehmen in meiner Nähe?';
    const rawAnswer = document.getElementById('geoA').getAttribute('data-words');
    let gPlayed = false;

    const gClear = () => { gTimers.forEach(clearTimeout); gTimers = []; };
    const gAfter = (ms, fn) => gTimers.push(setTimeout(fn, ms));

    const wordEls = [];
    (function buildAnswer() {
      gAWords.innerHTML = '';
      rawAnswer.split('§').forEach((seg, si) => {
        if (si % 2 === 1) {
          const pill = document.createElement('span');
          pill.className = 'w pick';
          pill.innerHTML = '<img src="/assets/logo-white.png" alt="">' + seg;
          gAWords.appendChild(pill);
          wordEls.push(pill);
        } else {
          seg.split(/(\s+)/).forEach((t) => {
            if (t === '') return;
            if (/^\s+$/.test(t)) { gAWords.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.textContent = t;
            gAWords.appendChild(w);
            wordEls.push(w);
          });
        }
      });
    })();

    /* Der Großzustand kommt komplett aus dem CSS (absolut zentriert,
       echte Größe — kein unscharfes Hochskalieren per transform).
       Wechsel zu "mini" als FLIP über Position UND echte Box-Maße:
       kein scale — die Karte startet exakt in ihrer großen Form und
       morpht Breite/Höhe ehrlich zur Zielform (Text bricht live um),
       dadurch kein Form-Sprung beim Start des Zooms. */
    const gToMini = () => {
      const first = gChat.getBoundingClientRect();
      gStage.setAttribute('data-stage', 'mini');
      gChat.style.transition = 'none';
      gChat.style.transform = 'none';
      const last = gChat.getBoundingClientRect();
      gChat.style.width = first.width.toFixed(1) + 'px';
      gChat.style.height = first.height.toFixed(1) + 'px';
      const start = gChat.getBoundingClientRect();
      const dx = first.left - start.left;
      const dy = first.top - start.top;
      gChat.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      void gChat.offsetWidth;
      gChat.style.transition = '';
      gChat.style.transform = 'none';
      gChat.style.width = last.width.toFixed(1) + 'px';
      gChat.style.height = last.height.toFixed(1) + 'px';
      gAfter(1250, () => { gChat.style.width = ''; gChat.style.height = ''; });
    };

    const gReset = () => {
      gClear();
      gPlayed = false;
      gChat.style.transition = 'none';
      gChat.style.transform = '';
      gChat.style.width = '';
      gChat.style.height = '';
      gStage.setAttribute('data-stage', 'pre');
      void gChat.offsetWidth;
      gChat.style.transition = '';
      gQRow.classList.remove('show');
      gQ.classList.remove('done');
      gQText.textContent = '';
      gARow.classList.remove('show', 'answered');
      wordEls.forEach((w) => w.classList.remove('lit'));
      gPoints.forEach((p) => p.classList.remove('in'));
    };

    const gShowFinal = () => {
      gStage.setAttribute('data-stage', 'mini');
      gChat.style.transform = 'none';
      gQRow.classList.add('show'); gQ.classList.add('done'); gQText.textContent = QUESTION;
      gARow.classList.add('show', 'answered');
      wordEls.forEach((w) => w.classList.add('lit'));
      gPoints.forEach((p) => p.classList.add('in'));
    };

    const gPlay = () => {
      if (gPlayed) return; gPlayed = true;
      if (reducedMotion) { gShowFinal(); return; }
      gStage.setAttribute('data-stage', 'intro');
      const t0 = 450;
      gAfter(t0, () => gQRow.classList.add('show'));
      const chars = QUESTION.split('');
      const step = 26;
      chars.forEach((ch, i) => gAfter(t0 + 200 + i * step, () => { gQText.textContent += ch; }));
      const qDone = t0 + 200 + chars.length * step;
      gAfter(qDone, () => gQ.classList.add('done'));
      gAfter(qDone + 550, () => gARow.classList.add('show'));
      const aStart = qDone + 550 + 1150;
      gAfter(aStart, () => {
        gARow.classList.add('answered');
        wordEls.forEach((w, i) => gAfter(i * 62, () => w.classList.add('lit')));
      });
      const answerEnd = aStart + wordEls.length * 62 + 250;
      gAfter(answerEnd + 1200, () => {
        gToMini();
        gAfter(420, () => { if (gPoints[0]) gPoints[0].classList.add('in'); });
        gAfter(660, () => { if (gPoints[1]) gPoints[1].classList.add('in'); });
        gAfter(900, () => { if (gPoints[2]) gPoints[2].classList.add('in'); });
      });
    };

    const gCheck = () => {
      const r = geoScroll.getBoundingClientRect();
      const vh = window.innerHeight;
      const centerIn = r.top < vh * 0.5 && r.bottom > vh * 0.5;
      if (centerIn) {
        if (!gPlayed) { gReset(); gAfter(60, gPlay); }
      } else if (r.bottom < 0 || r.top > vh) {
        if (gPlayed || gStage.getAttribute('data-stage') !== 'pre') gReset();
      }
    };
    on(window, 'scroll', gCheck, { passive: true });
    on(window, 'resize', gCheck);
    gCheck();
  }

  return () => {
    listeners.forEach(([target, ev, fn, opts]) => target.removeEventListener(ev, fn, opts));
    timers.forEach(clearTimeout);
    gTimers.forEach(clearTimeout);
    if (litTimer) clearInterval(litTimer);
    observers.forEach((o) => o.disconnect());
  };
}

/* ─── SVG-Bausteine ─── */
const ArrowUpRight = () => (
  <svg viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M3 1h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Star = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>
);
const FeatOn = () => (
  <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#E8A800" strokeWidth="1.4" /><path d="M5 8l2 2 4-4" stroke="#E8A800" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const FeatOff = () => (
  <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#E8A800" strokeWidth="1.4" /><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#E8A800" strokeWidth="1.2" strokeLinecap="round" /></svg>
);

/* ─── Sektions-Bausteine ─── */
function HowRow({ idx, title, text, badge }) {
  const num = String(idx + 1).padStart(2, '0');
  return (
    <div className="howrow" data-row={idx}>
      <button className="hr-bar" type="button">
        <span className="hr-num">{num}</span>
        <span className="hr-title">{title}</span>
        <span className="hr-plus"></span>
      </button>
      <div className="hr-detail">
        <div className="hr-text">
          <p>{text}</p>
          <div className="badge">{badge}</div>
        </div>
      </div>
    </div>
  );
}

function PriceFeature({ on = true, children }) {
  return (
    <li className={on ? undefined : 'off'}>
      {on ? <FeatOn /> : <FeatOff />}
      {children}
    </li>
  );
}

export default function Home() {
  useEffect(() => initV4(), []);

  return (
    <>
      {/* ════ LOADING SCREEN ════ */}
      <div className="loader">
        <div className="loader-logo">
          <img src="/assets/logo-white.png" alt="Leon Seitz" />
        </div>
      </div>

      {/* ════ LESEFLUSS: Scroll-Fortschritt ════ */}
      <div className="scroll-progress" aria-hidden="true"><i id="scrollProgress"></i></div>


      {/* ════ HERO — Corner Layout + Video-Loop ════ */}
      <section className="hero" id="top" data-screen-label="Hero">
        <img className="hero-bg" src="/assets/hero-bg.jpg" alt="" aria-hidden="true" />
        <div className="hero-glow"></div>
        <div className="hero-scrim"></div>
        <div className="grain"></div>
        <div className="hero-grid-bg"></div>

        {/* Oben links: Logo */}
        <a href="#top" className="hero-logo-link reveal">
          <img className="hero-logo" src="/assets/logo-white.png" alt="Leon Seitz Logo" />
        </a>

        {/* Oben rechts: Link zu den Paketen */}
        <div className="hero-nav-wrap reveal reveal-d1">
          <a href="#pakete" className="hero-nav-link">
            Lösungen anschauen
            <ArrowUpRight />
          </a>
        </div>

        {/* Mitte rechts: Headline */}
        <div className="hero-headline reveal reveal-d2">
          <h1>In 24h besser als deine Konkurrenz.<br /><span className="serif gold">Du zahlst nur, wenns dir gefällt.</span></h1>
        </div>

        {/* Unten links: Google-Rezensionen Slidebar */}
        <div className="hero-reviews reveal reveal-d3">
          <div className="hero-reviews-head">
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 01-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09A6.97 6.97 0 015.49 12c0-.72.13-1.43.35-2.09V7.07H2.18A11 11 0 001 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
            <span className="hero-reviews-score">5,0</span>
            <span className="hero-reviews-stars">
              <Star /><Star /><Star /><Star /><Star />
            </span>
            <span className="hero-reviews-sep">·</span>
            <span className="hero-reviews-label">Verifizierte Google-Rezensionen</span>
          </div>
          <div className="hero-reviews-track">
            <div className="hero-reviews-scroll" id="heroRevScroll"></div>
          </div>
        </div>

        {/* Unten rechts: CTA */}
        <div className="hero-cta-wrap reveal reveal-d3">
          <a href={WA_WEBSITE} className="btn btn--gold">
            Schreib mir auf WhatsApp
            <span className="arr"><ArrowRight /></span>
          </a>
        </div>
      </section>

      {/* ════ MISSION — Wort-für-Wort-Lesefluss ════ */}
      <section className="mission" data-screen-label="Mission">
        <p className="mission-text" id="missionText">
          Innerhalb von <span className="serif gold">24 Stunden</span> analysiere ich deinen digitalen Auftritt
          basierend auf den neuesten Erkenntnissen der Wirtschaftspsychologie — und liefere dir eine
          optimierte Version, die dich <span className="serif gold">von deiner Konkurrenz abhebt.</span>
        </p>
      </section>

      {/* ════ REFERENZEN — eine Sektion, Projekte wechselbar ════ */}
      <section className="proj section--dark" data-screen-label="Referenzen" id="referenzen">
        <div className="grain" style={{ opacity: 0.22 }}></div>
        <div className="proj-left">
          <div className="proj-num" id="projNum">01.</div>
          <ul className="proj-nav" id="projNav">
            <li className="active" data-p="0">KFA Aschaffenburg</li>
            <li data-p="1">Star Döner</li>
            <li data-p="2">Angelo DJ</li>
          </ul>
          <div className="proj-info" id="projInfo">
            <div className="kat">Fundraising · Landing Page</div>
            <h2 className="proj-title">KFA Aschaffenburg</h2>
            <p>Konzept, Branding und Landing Page für eine Spendenkampagne — eigenverantwortlich umgesetzt.</p>
            <a href="https://kfa-fundraising.vercel.app/" target="_blank" rel="noopener noreferrer" className="go">Projekt ansehen <ArrowRight /></a>
          </div>
        </div>
        <div className="proj-visual">
          <div id="ref-kfa" className="proj-slot active proj-gallery">
            <img className="pg-img active" src="/projekte/kfa.png" alt="KFA Aschaffenburg — Landing Page" />
            <img className="pg-img" src="/projekte/kfa-2.png" alt="KFA Aschaffenburg — Brand System" />
            <button className="pg-arrow pg-prev" type="button" aria-label="Vorheriges Bild">
              <svg viewBox="0 0 10 10" fill="none"><path d="M9 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="pg-arrow pg-next" type="button" aria-label="Nächstes Bild">
              <svg viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="pg-dots"><i className="active"></i><i></i></div>
          </div>
          <img id="ref-star" className="proj-slot" src="/projekte/star-doener.png" alt="Screenshot Star Döner" />
          <img id="ref-angelo" className="proj-slot" src="/projekte/angelo.png" alt="Screenshot Angelo DJ" />
        </div>
      </section>

      {/* ════ GEO — KI-Chat-Choreografie ════ */}
      <section className="geo-scroll section--dark" data-screen-label="GEO" id="geoScroll">
        <div className="grain" style={{ opacity: 0.25 }}></div>
        <div className="geo-stage" data-stage="pre">
          <div className="geo-layout">
            <div className="geo-left">
              <span className="eyebrow eyebrow--dark">GEO-Optimierung</span>
              <h2 className="h2">Im Zeitalter von ChatGPT<br /><span className="serif gold">sichtbar bleiben.</span></h2>
              <p className="lede lede--dark">Deine Kunden fragen heute KI um Rat — nicht mehr nur Google. Ich sorge dafür, dass dein Business in den Antworten auftaucht.</p>
              <div className="geo-points">
                <div className="geo-point" data-pt="0">
                  <span className="gp-ic"><svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" strokeLinecap="round" /></svg></span>
                  <span className="gp-t"><b>Google + KI gleichzeitig</b><span>Beide Kanäle brauchen andere Signale — ich optimiere für beide.</span></span>
                </div>
                <div className="geo-point" data-pt="1">
                  <span className="gp-ic"><svg viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="3" /><path d="M7 8h6M7 11h4" strokeLinecap="round" /></svg></span>
                  <span className="gp-t"><b>KI-lesbare Struktur</b><span>Strukturierte Daten, damit ChatGPT &amp; Co. dich korrekt einordnen.</span></span>
                </div>
                <div className="geo-point" data-pt="2">
                  <span className="gp-ic"><svg viewBox="0 0 20 20"><path d="M10 2c3.3 0 6 2.7 6 6 0 4-6 10-6 10S4 12 4 8c0-3.3 2.7-6 6-6z" /><circle cx="10" cy="8" r="2" /></svg></span>
                  <span className="gp-t"><b>Lokale Sichtbarkeit</b><span>Branche, Standort, Leistungen — klar für lokale KI-Anfragen.</span></span>
                </div>
              </div>
            </div>
            <div className="geo-chat" id="geoChat">
              <div className="geo-chat-head">
                <span className="gx"><svg viewBox="0 0 24 24"><path d="M12 2l1.9 5.6L19.5 9.5 14.9 13l1.8 5.7L12 15.4 7.3 18.7 9.1 13 4.5 9.5l5.6-1.9z" /></svg></span>
                <b>KI-Suche</b>
                <span className="live"><i></i>Live</span>
              </div>
              <div className="chat-body" id="geoBody">
                <div className="chat-row chat-row--q" id="geoQRow">
                  <div className="chat-q" id="geoQ"><span className="qtext"></span><span className="caret"></span></div>
                </div>
                <div className="chat-row chat-row--a" id="geoARow">
                  <div className="chat-typing" id="geoTyping"><i></i><i></i><i></i></div>
                  <div className="chat-a-wrap">
                    <div className="chat-a-clip">
                      <div className="chat-a" id="geoA" data-words="Eine sehr gute Wahl ist §Leon Seitz§ — spezialisiert auf maßgeschneiderte Websites, die schon in 24 Stunden stehen. Kunden heben die schnelle, persönliche Umsetzung hervor.">
                        <span className="awords" id="geoAWords"></span>
                        <span className="src"><span>Quellen:</span><span className="chip"><b>leonseitz.com</b></span><span className="chip">★ 5,0 Google</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ WIE ES LÄUFT ════ */}
      <section className="howto section--cream" data-screen-label="Wie es läuft" id="howto">
        <div className="howto-inner">
          <div className="howto-head">
            <h2 className="h2">Du siehst das Ergebnis. <span className="serif gold">Dann entscheidest du.</span></h2>
          </div>
          <div className="howlist">
            <HowRow idx={0} title="Kurze Analyse"
              text="Ich schaue mir deinen aktuellen Auftritt an — was fehlt, was schwächt, was deine Konkurrenz besser macht. Schriftlich und kostenlos."
              badge="Kostenlos · in 24h" />
            <HowRow idx={1} title="Fertige Grundversion in 24h"
              text="Deine optimierte Website — maßgeschneidert an deine Bedürfnisse. Keine Konzeptskizze, eine echte Seite im Browser."
              badge="Vor dem Kickoff-Meeting" />
            <HowRow idx={2} title="Zahlung nur bei Zufriedenheit"
              text="Zwei Revisionsrunden inklusive. Du zahlst nur, wenns dir gefällt. Kein Vertrag, keine Vorauskasse."
              badge="Kein Risiko" />
          </div>
        </div>
      </section>

      {/* ════ PAKETE ════ */}
      <section className="section section--dark" id="pakete" data-screen-label="Pakete">
        <div className="grain" style={{ opacity: 0.2 }}></div>
        <div className="section__inner">
          <div className="sec-head">
            <h2 className="h2 reveal reveal-d1">Drei Optionen. <span className="serif gold">Eine Empfehlung.</span></h2>
            <p className="lede lede--dark reveal reveal-d2" style={{ margin: '16px auto 0' }}>Der Unterschied liegt nicht im Preis — sondern darin, wer den laufenden Betrieb übernimmt.</p>
          </div>
          <div className="pricing-grid">
            {/* Website */}
            <div className="price-card expand-card">
              <div className="name">Website</div>
              <div className="price">490 €</div>
              <div className="price-sub">einmalig</div>
              <ul className="features">
                <PriceFeature>Fertige Website</PriceFeature>
                <PriceFeature>2 Revisionsrunden</PriceFeature>
                <PriceFeature>Eigentumsübertragung</PriceFeature>
                <PriceFeature>Hosting-Einrichtung</PriceFeature>
                <PriceFeature on={false}>Videokurs</PriceFeature>
                <PriceFeature on={false}>AI Agent</PriceFeature>
                <PriceFeature on={false}>Support &amp; Updates</PriceFeature>
              </ul>
              <a href={WA_PAKET_WEBSITE} className="card-btn secondary">Auswählen</a>
            </div>
            {/* Eigenständig */}
            <div className="price-card expand-card expand-d1">
              <div className="name">Eigenständig</div>
              <div className="price">890 €</div>
              <div className="price-sub">einmalig</div>
              <ul className="features">
                <PriceFeature>Fertige Website</PriceFeature>
                <PriceFeature>2 Revisionsrunden</PriceFeature>
                <PriceFeature>Eigentumsübertragung</PriceFeature>
                <PriceFeature>Hosting-Einrichtung</PriceFeature>
                <PriceFeature>Videokurs (Inhaltspflege)</PriceFeature>
                <PriceFeature>Personalisierter AI Agent</PriceFeature>
                <PriceFeature on={false}>Laufender Support</PriceFeature>
              </ul>
              <a href={WA_PAKET_EIGEN} className="card-btn secondary">Auswählen</a>
            </div>
            {/* Servicepauschale */}
            <div className="price-card featured expand-card expand-d2">
              <div className="stamp">Empfohlen</div>
              <div className="name">Servicepauschale</div>
              <div className="price">490 €<span style={{ fontSize: 16, fontWeight: 600, opacity: 0.6 }}> + 69 €/Mo</span></div>
              <div className="price-sub">Gesamtjahr 1: 1.318 € · Mindestlaufzeit 12 Monate</div>
              <ul className="features">
                <PriceFeature>Fertige Website</PriceFeature>
                <PriceFeature>2 Revisionsrunden</PriceFeature>
                <PriceFeature>Eigentumsübertragung</PriceFeature>
                <PriceFeature>Hosting übernommen</PriceFeature>
                <PriceFeature>Videokurs (Inhaltspflege)</PriceFeature>
                <PriceFeature>Personalisierter AI Agent</PriceFeature>
                <PriceFeature>SSL, Updates, Backups</PriceFeature>
              </ul>
              <a href={WA_PAKET_SERVICE} className="card-btn primary">Dieses Paket wählen</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════ CTA + FOOTER ════ */}
      <section className="section section--cream" data-screen-label="Kontakt" style={{ paddingBottom: 0, justifyContent: 'space-between' }}>
        <div className="section__inner cta-box" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="h2 reveal reveal-d1">Kostenlose Analyse in 24h in deinem Postfach.</h2>
          <p className="lede lede--light reveal reveal-d2" style={{ margin: '16px auto 36px', textAlign: 'center' }}>
            Kein Commitment. Kein Paket. Nur eine ehrliche Einschätzung,
            was bei dir fehlt und was ich ändern würde.
          </p>
          <div className="reveal reveal-d3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={WA_ANALYSE} className="btn btn--gold">
              Schreib mir auf WhatsApp
              <span className="arr"><ArrowRight /></span>
            </a>
          </div>
          <div className="cta-badges reveal reveal-d3">
            <span>✓ Kostenlos</span>
            <span>✓ Kein Commitment</span>
            <span>✓ In 24h</span>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-brand"><span className="fdot"></span>Leon Seitz</div>
          <div className="footer-links">
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/agb">AGB</a>
            <a href="mailto:hello@leonseitz.com">hello@leonseitz.com</a>
          </div>
          <div className="footer-copy">© 2026 Leon Seitz</div>
        </footer>
      </section>
    </>
  );
}
