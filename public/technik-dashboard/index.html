<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KfA Bildtechnik</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"><\/script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#f7f7f5;--surface:#fff;--border:rgba(0,0,0,.07);
  --shadow:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);
  --shadow-sm:0 1px 2px rgba(0,0,0,.05);
  --text:#1a1a1a;--muted:#8a8a8a;--light:#c8c8c8;
  --accent:#2563eb;--green:#16a34a;--amber:#b45309;--red:#dc2626;
  --green-bg:#f0fdf4;--amber-bg:#fffbeb;--red-bg:#fef2f2;--blue-bg:rgba(37,99,235,.06);
  --tag:#f1f0ef;
  --serif:'DM Serif Display',Georgia,serif;
  --sans:'DM Sans',-apple-system,sans-serif;
  --r:12px;--r-sm:8px;
}
html{font-size:15px;}
body{background:var(--bg);color:var(--text);font-family:var(--sans);line-height:1.5;min-height:100vh;-webkit-font-smoothing:antialiased;}

/* NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(247,247,245,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 32px;height:52px;gap:4px;}
.nav-logo{font-family:var(--serif);font-size:17px;margin-right:20px;white-space:nowrap;}
.nav-tab{font-size:13.5px;color:var(--muted);padding:6px 14px;border-radius:6px;cursor:pointer;transition:all .15s;border:none;background:none;font-family:var(--sans);white-space:nowrap;}
.nav-tab:hover{background:var(--tag);color:var(--text);}
.nav-tab.active{background:var(--surface);color:var(--text);font-weight:500;box-shadow:var(--shadow-sm);}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:10px;}
.email-badge{display:none;background:var(--red);color:#fff;font-size:11px;font-weight:500;padding:2px 10px;border-radius:20px;cursor:pointer;}
.email-badge.visible{display:inline-block;}

/* PAGES */
.page{display:none;max-width:1140px;margin:0 auto;padding:36px 32px 72px;animation:rise .25s ease both;}
.page.active{display:block;}
@keyframes rise{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}

.block{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow);overflow:hidden;}
.block-head{padding:15px 20px 13px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;}
.block-title{font-size:11.5px;font-weight:500;text-transform:uppercase;letter-spacing:.7px;color:var(--muted);}
.block-tag{font-size:12px;color:var(--muted);background:var(--tag);padding:2px 9px;border-radius:5px;white-space:nowrap;}

.page-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;}
.greeting{font-family:var(--serif);font-size:32px;font-weight:400;letter-spacing:-.4px;line-height:1.15;}
.greeting-name{color:var(--accent);cursor:pointer;transition:opacity .15s;}
.greeting-name:hover{opacity:.75;}
.name-input-g{font-family:var(--serif);font-size:32px;color:var(--accent);background:none;border:none;border-bottom:1.5px solid var(--accent);outline:none;width:200px;}
.sub-label{margin-top:5px;font-size:13px;color:var(--muted);}
.clock-wrap{text-align:right;}
.clock{font-family:var(--serif);font-size:32px;letter-spacing:-.5px;}
.date-label{font-size:13px;color:var(--muted);margin-top:4px;}

.phase-bar{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);padding:11px 18px;display:flex;align-items:center;gap:8px;margin-bottom:24px;flex-wrap:wrap;row-gap:6px;}
.phase-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);}
.phase-dot{width:6px;height:6px;border-radius:50%;background:var(--light);}
.phase-item.active{color:var(--accent);font-weight:500;}.phase-item.active .phase-dot{background:var(--accent);}
.phase-item.done{color:var(--light);}.phase-item.done .phase-dot{background:var(--green);}
.phase-sep{width:16px;height:1px;background:var(--border);}
.phase-tail{margin-left:auto;display:flex;align-items:center;gap:18px;}
.phase-tail span{font-size:12.5px;color:var(--muted);}
.phase-tail .next-txt{color:var(--text);font-weight:500;}

.dash-grid{display:grid;grid-template-columns:1fr 308px;gap:16px;align-items:start;}
.col{display:flex;flex-direction:column;gap:16px;}
.logbuch-layout{display:grid;grid-template-columns:440px 1fr;gap:20px;align-items:start;}
.charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.kanban-board{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:start;}

.tiles-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;}
.tile{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow-sm);padding:18px 20px;}
.tile-val{font-family:var(--serif);font-size:28px;line-height:1;color:var(--text);}
.tile-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-top:5px;}
.tile-sub{font-size:12px;color:var(--light);margin-top:3px;}
.tile.accent .tile-val{color:var(--accent);}
.tile.green .tile-val{color:var(--green);}
.tile.red .tile-val{color:var(--red);}

.dienst-card{padding:18px 20px;display:flex;align-items:center;gap:16px;}
.dienst-icon{width:44px;height:44px;background:var(--blue-bg);border-radius:10px;display:grid;place-items:center;font-size:20px;flex-shrink:0;}
.dienst-info{flex:1;}
.dienst-name{font-size:15px;font-weight:500;}
.dienst-date{font-size:12px;color:var(--muted);margin-top:2px;}
.dienst-countdown{font-family:var(--serif);font-size:20px;color:var(--accent);}

.sec-label{padding:14px 20px 5px;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.8px;color:var(--light);}
.task{display:flex;align-items:center;gap:12px;padding:9px 20px;cursor:pointer;transition:background .1s;user-select:none;}
.task:hover{background:var(--bg);}
.task.done{opacity:.38;}
.chk{width:17px;height:17px;border-radius:5px;border:1.5px solid var(--light);flex-shrink:0;display:grid;place-items:center;transition:all .15s;}
.task.done .chk{background:var(--green);border-color:var(--green);}
.chk-svg{display:none;}.task.done .chk-svg{display:block;}
.t-time{font-size:12px;color:var(--light);width:38px;flex-shrink:0;}
.t-text{font-size:13.5px;flex:1;}
.task.done .t-text{text-decoration:line-through;color:var(--muted);}
.chevron{font-size:12px;color:var(--light);transition:transform .18s;flex-shrink:0;}
.task.open .chevron{transform:rotate(90deg);}
.subtasks{display:none;flex-direction:column;padding:0 20px 8px 48px;}
.subtasks.open{display:flex;}
.sub{padding:5px 0;font-size:13px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:8px;transition:color .1s;}
.sub:hover{color:var(--text);}
.sub.done{color:var(--light);text-decoration:line-through;}
.sub::before{content:'';width:3px;height:3px;border-radius:50%;background:var(--light);flex-shrink:0;}
.sub.done::before{background:var(--green);}

.ql-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);}
.ql-item{background:var(--surface);padding:15px 16px;text-decoration:none;display:flex;flex-direction:column;gap:5px;transition:background .1s;}
.ql-item:hover{background:var(--bg);}
.ql-icon{font-size:17px;}
.ql-name{font-size:13px;font-weight:500;color:var(--text);}
.ql-desc{font-size:11px;color:var(--muted);}

.lb-form-body{padding:20px;}
.form-row{margin-bottom:14px;}
.form-row label{display:block;font-size:11.5px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:5px;}
.form-row input,.form-row textarea,.form-row select{width:100%;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--r-sm);font-size:13.5px;font-family:var(--sans);color:var(--text);background:var(--bg);outline:none;transition:border-color .15s;}
.form-row input:focus,.form-row textarea:focus,.form-row select:focus{border-color:var(--accent);}
.form-row textarea{resize:vertical;min-height:64px;}
.form-row.inline{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

.radio-group{display:flex;gap:8px;flex-wrap:wrap;}
.radio-btn{padding:6px 14px;border:1.5px solid var(--border);border-radius:6px;cursor:pointer;font-size:13px;color:var(--muted);transition:all .15s;user-select:none;background:var(--bg);}
.radio-btn:hover{border-color:var(--accent);color:var(--accent);}
.radio-btn.active{border-color:var(--accent);color:var(--accent);background:var(--blue-bg);}

.kpi-section{border:1.5px solid var(--border);border-radius:var(--r-sm);margin-bottom:14px;overflow:hidden;}
.kpi-section-head{padding:10px 14px;background:var(--tag);font-size:11.5px;font-weight:500;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);}
.kpi-section-body{padding:14px;}
.kpi-note{font-size:11.5px;color:var(--muted);margin-bottom:10px;line-height:1.4;font-style:italic;}

.fehler-types{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}
.fehler-type-btn{padding:4px 10px;border:1.5px solid var(--border);border-radius:5px;font-size:12px;cursor:pointer;transition:all .15s;user-select:none;background:var(--bg);color:var(--muted);}
.fehler-type-btn:hover{border-color:var(--red);color:var(--red);}
.fehler-type-btn.selected{border-color:var(--red);color:var(--red);background:var(--red-bg);}

.log-entry{padding:16px 20px;border-top:1px solid var(--border);}
.log-entry:first-child{border-top:none;}
.log-entry-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:8px;}
.log-person{font-weight:500;font-size:13.5px;}
.log-chips{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;}
.chip{font-size:11px;padding:2px 8px;border-radius:4px;font-weight:500;}
.chip.green{background:var(--green-bg);color:var(--green);}
.chip.amber{background:var(--amber-bg);color:var(--amber);}
.chip.red{background:var(--red-bg);color:var(--red);}
.chip.gray{background:var(--tag);color:var(--muted);}
.log-notiz{font-size:12.5px;color:var(--muted);margin-top:4px;line-height:1.4;}
.log-del-btn{font-size:11px;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:none;color:var(--muted);cursor:pointer;transition:all .15s;font-family:var(--sans);}
.log-del-btn:hover{border-color:var(--red);color:var(--red);}

.email-item{padding:14px 20px;border-top:1px solid var(--border);}
.email-item:first-child{border-top:none;}
.email-item-head{display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;}
.email-person{font-size:13px;font-weight:500;}
.email-sched{font-size:11.5px;color:var(--muted);margin-left:auto;}
.email-subject{font-size:12px;color:var(--muted);margin-bottom:8px;}
.email-btns{display:flex;gap:6px;flex-wrap:wrap;}
.email-btn{font-size:11.5px;padding:4px 12px;border:1.5px solid var(--border);border-radius:6px;background:none;color:var(--muted);cursor:pointer;font-family:var(--sans);transition:all .15s;}
.email-btn:hover{border-color:var(--accent);color:var(--accent);}
.email-btn.primary{border-color:var(--accent);color:var(--accent);background:var(--blue-bg);}

.kanban-col{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;}
.kanban-col-head{padding:14px 18px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.kanban-col-title{font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.7px;color:var(--muted);}
.kanban-count{font-size:12px;color:var(--muted);background:var(--tag);padding:2px 8px;border-radius:5px;}
.kanban-cards{padding:10px;display:flex;flex-direction:column;gap:8px;min-height:80px;}
.kcard{background:var(--bg);border:1px solid var(--border);border-radius:var(--r-sm);padding:14px;cursor:grab;transition:all .15s;user-select:none;}
.kcard:hover{box-shadow:var(--shadow);transform:translateY(-1px);}
.kcard.dragging{opacity:.4;}
.kcard-title{font-size:13.5px;font-weight:500;}
.kcard-desc{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.4;}
.kcard-meta{display:flex;align-items:center;justify-content:space-between;margin-top:10px;flex-wrap:wrap;gap:6px;}
.kcard-person{font-size:11.5px;color:var(--accent);background:var(--blue-bg);padding:2px 8px;border-radius:4px;}
.kcard-deadline{font-size:11px;color:var(--muted);}
.kcard-deadline.overdue{color:var(--red);}
.kcard-deadline.soon{color:var(--amber);}
.kcard-actions{display:flex;gap:6px;margin-top:8px;}
.kcard-btn{font-size:11px;padding:3px 8px;border:1px solid var(--border);border-radius:4px;background:var(--surface);color:var(--muted);cursor:pointer;transition:all .15s;font-family:var(--sans);}
.kcard-btn:hover{border-color:var(--accent);color:var(--accent);}
.kcard-btn.danger:hover{border-color:var(--red);color:var(--red);}
.kanban-add{margin:0 10px 10px;padding:8px 12px;background:none;border:1.5px dashed var(--border);border-radius:var(--r-sm);width:calc(100% - 20px);font-size:13px;color:var(--muted);cursor:pointer;transition:all .15s;font-family:var(--sans);}
.kanban-add:hover{border-color:var(--accent);color:var(--accent);}

.kpi-summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
.kpi-stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:16px 18px;}
.kpi-stat-val{font-family:var(--serif);font-size:28px;color:var(--text);}
.kpi-stat-lbl{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-top:4px;}
.kpi-stat-sub{font-size:11px;color:var(--light);margin-top:2px;}
.filter-row{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
.filter-btn{font-size:12.5px;padding:5px 14px;border-radius:20px;border:1.5px solid var(--border);background:none;color:var(--muted);cursor:pointer;transition:all .15s;font-family:var(--sans);}
.filter-btn.active,.filter-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--blue-bg);}
.chart-wrap{padding:20px;}
.chart-title{font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.7px;color:var(--muted);margin-bottom:16px;}

.trouble-layout{display:grid;grid-template-columns:1fr 380px;gap:20px;align-items:start;}
.trouble-db{display:flex;flex-direction:column;gap:12px;}
.trouble-entry{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-sm);padding:16px 18px;}
.trouble-entry-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:10px;}
.trouble-title{font-size:13.5px;font-weight:500;}
.trouble-date{font-size:11.5px;color:var(--light);margin-top:2px;}
.trouble-problem{font-size:13px;color:var(--muted);margin-bottom:8px;line-height:1.4;}
.trouble-solution{font-size:13px;color:var(--text);background:var(--green-bg);border-radius:6px;padding:10px 12px;line-height:1.4;}
.trouble-del-btn{font-size:11px;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:none;color:var(--muted);cursor:pointer;transition:all .15s;font-family:var(--sans);flex-shrink:0;}
.trouble-del-btn:hover{border-color:var(--red);color:var(--red);}

.chat-messages{min-height:280px;max-height:380px;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:12px;}
.chat-msg{font-size:13px;line-height:1.5;padding:10px 14px;border-radius:10px;max-width:96%;}
.chat-msg.user{background:var(--blue-bg);color:var(--accent);align-self:flex-end;border:1px solid rgba(37,99,235,.15);}
.chat-msg.ai{background:var(--tag);color:var(--text);align-self:flex-start;border:1px solid var(--border);}
.chat-msg.loading{color:var(--muted);}
.chat-input-row{border-top:1px solid var(--border);padding:12px 14px;display:flex;gap:8px;}
.chat-input{flex:1;border:1.5px solid var(--border);border-radius:var(--r-sm);padding:8px 12px;font-size:13.5px;font-family:var(--sans);outline:none;transition:border-color .15s;background:var(--bg);}
.chat-input:focus{border-color:var(--accent);}
.chat-send-btn{padding:8px 16px;background:var(--accent);color:#fff;border:none;border-radius:var(--r-sm);font-size:13px;font-weight:500;cursor:pointer;font-family:var(--sans);white-space:nowrap;}
.chat-send-btn:disabled{opacity:.5;cursor:not-allowed;}

.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.3);z-index:200;align-items:center;justify-content:center;}
.modal-overlay.open{display:flex;}
.modal{background:var(--surface);border-radius:var(--r);box-shadow:0 8px 40px rgba(0,0,0,.14);width:460px;max-width:95vw;max-height:90vh;overflow-y:auto;padding:28px;animation:rise .2s ease;}
.modal h3{font-family:var(--serif);font-size:20px;font-weight:400;margin-bottom:20px;}
.modal-btns{display:flex;gap:8px;justify-content:flex-end;margin-top:20px;align-items:center;}
.btn-primary{padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:6px;font-size:13.5px;font-weight:500;cursor:pointer;font-family:var(--sans);}
.btn-secondary{padding:8px 16px;background:none;color:var(--muted);border:1.5px solid var(--border);border-radius:6px;font-size:13.5px;cursor:pointer;font-family:var(--sans);}
.email-modal-body{font-size:12.5px;white-space:pre-wrap;color:var(--text);line-height:1.6;padding:14px;background:var(--bg);border-radius:var(--r-sm);border:1px solid var(--border);max-height:280px;overflow-y:auto;font-family:monospace;}
.copy-notice{font-size:12px;color:var(--green);opacity:0;transition:opacity .3s;}
.copy-notice.show{opacity:1;}

.divider{height:1px;background:var(--border);}
.empty-state{text-align:center;padding:40px 20px;color:var(--muted);}
.empty-state .e-icon{font-size:28px;margin-bottom:10px;}
.empty-state p{font-size:13.5px;line-height:1.5;}
.page-subheader{margin-bottom:20px;}
.page-subheader h2{font-family:var(--serif);font-size:26px;font-weight:400;}
.page-subheader p{font-size:13px;color:var(--muted);margin-top:4px;}
.page-subheader-row{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:20px;}
</style>
</head>
<body>

<nav>
  <span class="nav-logo">KfA · Bildtechnik</span>
  <button class="nav-tab active" onclick="showPage('dashboard',this)">Dashboard</button>
  <button class="nav-tab" onclick="showPage('kanban',this)">Aufgaben</button>
  <button class="nav-tab" onclick="showPage('kpi',this)">KPIs</button>
  <button class="nav-tab" onclick="showPage('logbuch',this)">Logbuch</button>
  <button class="nav-tab" onclick="showPage('troubleshooting',this)">Troubleshooting</button>
  <div class="nav-right">
    <span class="email-badge" id="email-badge" onclick="showPage('logbuch',document.querySelectorAll('.nav-tab')[3])">📧 <span id="email-badge-count">0</span> E-Mail(s)</span>
  </div>
</nav>

<!-- DASHBOARD -->
<div class="page active" id="page-dashboard">
  <div class="page-header">
    <div>
      <div class="greeting"><span id="greeting-prefix">Guten Abend,</span>&nbsp;<span class="greeting-name" id="name-display" onclick="startEdit()">Dein Name</span><input class="name-input-g" id="name-input" type="text" placeholder="Name" style="display:none" onblur="saveEdit()" onkeydown="if(event.key==='Enter')saveEdit()"></div>
      <div class="sub-label" id="sub-label">KfA · Bildtechnik</div>
    </div>
    <div class="clock-wrap"><div class="clock" id="clock">00:00</div><div class="date-label" id="date-label">-</div></div>
  </div>
  <div class="tiles-row">
    <div class="tile accent"><div class="tile-val" id="tile-next-name">-</div><div class="tile-lbl">Naechster Dienst</div><div class="tile-sub" id="tile-next-date">-</div></div>
    <div class="tile"><div class="tile-val" id="tile-log-count">0</div><div class="tile-lbl">Dienste erfasst</div><div class="tile-sub">Logbuch-Eintraege</div></div>
    <div class="tile green" id="tile-issues-cell"><div class="tile-val" id="tile-issues">0</div><div class="tile-lbl">Krit. Vorfaelle</div><div class="tile-sub">gesamt</div></div>
    <div class="tile"><div class="tile-val" id="tile-kanban-open">-</div><div class="tile-lbl">Offene Aufgaben</div><div class="tile-sub">Kanban</div></div>
  </div>
  <div class="phase-bar">
    <div class="phase-item" id="pill-vor"><div class="phase-dot"></div>Vorbereitung</div>
    <div class="phase-sep"></div>
    <div class="phase-item" id="pill-durch"><div class="phase-dot"></div>Durchfuehrung</div>
    <div class="phase-sep"></div>
    <div class="phase-item" id="pill-nach"><div class="phase-dot"></div>Nachbereitung</div>
    <div class="phase-tail"><span class="next-txt" id="next-event">-</span><span id="progress-lbl">0 / 0 erledigt</span></div>
  </div>
  <div class="dash-grid">
    <div class="col">
      <div class="block">
        <div class="block-head"><span class="block-title">Dienst-Checkliste</span><span class="block-tag" id="check-badge">0 / 0</span></div>
        <div class="sec-label">Vorbereitung</div>
        <div class="task" id="t-v1" onclick="toggleSub('s-v1','t-v1')"><div class="chk" onclick="toggleTask(event,'t-v1')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">Fr 20h</span><span class="t-text">Besondere Fragen eingereicht</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-v1"><div class="sub" onclick="toggleSubItem(this)">Videos &amp; Vortraege pruefen</div><div class="sub" onclick="toggleSubItem(this)">Variable X Inhalte</div><div class="sub" onclick="toggleSubItem(this)">Sonstige Zusatzinhalte</div></div>
        <div class="task" id="t-v2" onclick="toggleSub('s-v2','t-v2')"><div class="chk" onclick="toggleTask(event,'t-v2')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">Sa 20h</span><span class="t-text">ProPresenter importiert &amp; finalisiert</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-v2"><div class="sub" onclick="toggleSubItem(this)">Arrangements einpflegen</div><div class="sub" onclick="toggleSubItem(this)">Flyer &amp; Inhalte Variable X</div><div class="sub" onclick="toggleSubItem(this)">Sonstige mediale Einbindungen</div></div>
        <div class="sec-label">Durchfuehrung</div>
        <div class="task" id="t-d1" onclick="toggleTask(event,'t-d1')"><div class="chk" onclick="toggleTask(event,'t-d1')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">16:00</span><span class="t-text">Puenktlicher Start</span></div>
        <div class="task" id="t-d2" onclick="toggleSub('s-d2','t-d2')"><div class="chk" onclick="toggleTask(event,'t-d2')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">16:05</span><span class="t-text">Technischer Aufbau</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-d2"><div class="sub" onclick="toggleSubItem(this)">PC hochgefahren</div><div class="sub" onclick="toggleSubItem(this)">Bildschirme &amp; Beamer</div><div class="sub" onclick="toggleSubItem(this)">Buehnenbeleuchtung</div></div>
        <div class="task" id="t-d3" onclick="toggleSub('s-d3','t-d3')"><div class="chk" onclick="toggleTask(event,'t-d3')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">16:10</span><span class="t-text">ProPresenter vorbereitet</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-d3"><div class="sub" onclick="toggleSubItem(this)">Finale Datei eingepflegt</div><div class="sub" onclick="toggleSubItem(this)">Ablauf kontrolliert</div><div class="sub" onclick="toggleSubItem(this)">Test mit Audio</div></div>
        <div class="task" id="t-d4" onclick="toggleSub('s-d4','t-d4')"><div class="chk" onclick="toggleTask(event,'t-d4')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">16:15</span><span class="t-text">Stream vorbereitet (OBS)</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-d4"><div class="sub" onclick="toggleSubItem(this)">OBS geprueft</div><div class="sub" onclick="toggleSubItem(this)">Quellen kontrolliert</div><div class="sub" onclick="toggleSubItem(this)">Thumbnail erstellt</div><div class="sub" onclick="toggleSubItem(this)">Titel &amp; Beschreibung</div></div>
        <div class="task" id="t-d5" onclick="toggleSub('s-d5','t-d5')"><div class="chk" onclick="toggleTask(event,'t-d5')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">16:20</span><span class="t-text">Letzte Vorbereitungen</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-d5"><div class="sub" onclick="toggleSubItem(this)">iPad-Verbindung geprueft</div><div class="sub" onclick="toggleSubItem(this)">Timer aktiv</div><div class="sub" onclick="toggleSubItem(this)">Stream um 16:40 gestartet</div></div>
        <div class="sec-label">Nachbereitung</div>
        <div class="task" id="t-n1" onclick="toggleSub('s-n1','t-n1')"><div class="chk" onclick="toggleTask(event,'t-n1')"><svg class="chk-svg" width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span class="t-time">18:30</span><span class="t-text">Logbuch vollstaendig ausgefuellt</span><span class="chevron">&#8250;</span></div>
        <div class="subtasks" id="s-n1"><div class="sub" onclick="toggleSubItem(this)">iPads an Ladegeraete</div><div class="sub" onclick="toggleSubItem(this)">Arbeitsplatz aufgeraeumt</div></div>
        <div style="height:8px"></div>
      </div>
    </div>
    <div class="col">
      <div class="block"><div class="block-head"><span class="block-title">Naechster Dienst</span></div><div class="dienst-card"><div class="dienst-icon">&#128197;</div><div class="dienst-info"><div class="dienst-name" id="dash-next-name">-</div><div class="dienst-date" id="dash-next-date">-</div></div><div class="dienst-countdown" id="dash-next-days">-</div></div></div>
      <div class="block"><div class="block-head"><span class="block-title">Quick Links</span></div><div class="ql-grid">
        <a class="ql-item" href="https://www.canva.com/design/DAF_yHzPr90/No355UVf7vNlUApEg-1iiA/view?utm_content=DAF_yHzPr90&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h01d04b0379" target="_blank"><div class="ql-icon">&#127912;</div><div class="ql-name">YT Thumbnail</div><div class="ql-desc">Canva Vorlage</div></a>
        <a class="ql-item" href="https://services.planningcenteronline.com/schedule" target="_blank"><div class="ql-icon">&#128203;</div><div class="ql-name">Services Plan</div><div class="ql-desc">Planning Center</div></a>
        <a class="ql-item" href="https://kircheab.sharepoint.com/Datenablage/Forms/AllItems.aspx?id=%2FDatenablage%2F02%20Gottesdienst&viewid=7aefddde%2D5b1e%2D4bc7%2Da762%2D10488bdf0e50&p=true" target="_blank"><div class="ql-icon">&#128193;</div><div class="ql-name">Flyer &amp; Predigten</div><div class="ql-desc">SharePoint</div></a>
        <a class="ql-item" href="https://studio.youtube.com" target="_blank"><div class="ql-icon">&#9654;&#65039;</div><div class="ql-name">YouTube Studio</div><div class="ql-desc">Live &amp; Uploads</div></a>
        <a class="ql-item" href="https://obsproject.com/wiki/" target="_blank"><div class="ql-icon">&#128225;</div><div class="ql-name">OBS Doku</div><div class="ql-desc">Referenz</div></a>
        <a class="ql-item" href="https://kircheab.sharepoint.com" target="_blank"><div class="ql-icon">&#127968;</div><div class="ql-name">SharePoint</div><div class="ql-desc">KfA Intranet</div></a>
      </div></div>
      <div class="block"><div class="block-head"><span class="block-title">Letzter Eintrag</span><button class="btn-secondary" style="font-size:12px;padding:4px 10px;" onclick="showPage('logbuch',document.querySelectorAll('.nav-tab')[3])">Logbuch</button></div><div id="dash-last-log" style="padding:14px 20px;font-size:13px;color:var(--muted);">Noch kein Eintrag.</div></div>
    </div>
  </div>
</div>

<!-- KANBAN -->
<div class="page" id="page-kanban">
  <div class="page-subheader-row">
    <div class="page-subheader"><h2>Aufgaben &amp; Projekte</h2><p>Langfristige Aufgaben mit Fristen &amp; Verantwortlichkeiten &middot; Drag &amp; Drop</p></div>
    <button class="btn-primary" onclick="openCardModal()">+ Neue Aufgabe</button>
  </div>
  <div class="kanban-board" id="kanban-board">
    <div class="kanban-col" id="col-offen" ondragover="onDragOver(event,'offen')" ondrop="onDrop(event,'offen')" ondragleave="this.style.background=''"><div class="kanban-col-head"><span class="kanban-col-title">Offen</span><span class="kanban-count" id="cnt-offen">0</span></div><div class="kanban-cards" id="cards-offen"></div><button class="kanban-add" onclick="openCardModal('offen')">+ Aufgabe</button></div>
    <div class="kanban-col" id="col-progress" ondragover="onDragOver(event,'progress')" ondrop="onDrop(event,'progress')" ondragleave="this.style.background=''"><div class="kanban-col-head"><span class="kanban-col-title">In Bearbeitung</span><span class="kanban-count" id="cnt-progress">0</span></div><div class="kanban-cards" id="cards-progress"></div><button class="kanban-add" onclick="openCardModal('progress')">+ Aufgabe</button></div>
    <div class="kanban-col" id="col-done" ondragover="onDragOver(event,'done')" ondrop="onDrop(event,'done')" ondragleave="this.style.background=''"><div class="kanban-col-head"><span class="kanban-col-title">Erledigt</span><span class="kanban-count" id="cnt-done">0</span></div><div class="kanban-cards" id="cards-done"></div><button class="kanban-add" onclick="openCardModal('done')">+ Aufgabe</button></div>
  </div>
</div>

<!-- KPI -->
<div class="page" id="page-kpi">
  <div class="page-subheader"><h2>KPI-Auswertung</h2><p>Alle Daten aus dem Logbuch &middot; automatisch aktualisiert</p></div>
  <div class="filter-row">
    <button class="filter-btn active" onclick="setKpiFilter('alle',this)">Alle</button>
    <button class="filter-btn" onclick="setKpiFilter('Leon',this)">Leon</button>
    <button class="filter-btn" onclick="setKpiFilter('Sascha',this)">Sascha</button>
    <button class="filter-btn" onclick="setKpiFilter('Ian',this)">Ian</button>
    <button class="filter-btn" onclick="setKpiFilter('Detlef',this)">Detlef</button>
  </div>
  <div class="kpi-summary-grid" id="kpi-stats-grid"></div>
  <div id="kpi-empty" class="empty-state" style="display:none"><div class="e-icon">&#128202;</div><p>Noch keine Eintraege.</p></div>
  <div class="charts-grid" id="charts-grid">
    <div class="block chart-wrap"><div class="chart-title">Selbsteinschaetzung &mdash; Trend</div><canvas id="chart-selbst" height="200"></canvas></div>
    <div class="block chart-wrap"><div class="chart-title">Folien-Timing (verpasste Cues)</div><canvas id="chart-timing" height="200"></canvas></div>
    <div class="block chart-wrap"><div class="chart-title">Kritische Fehler nach Typ</div><canvas id="chart-fehler" height="200"></canvas></div>
    <div class="block chart-wrap"><div class="chart-title">Stream-Qualitaet</div><canvas id="chart-stream" height="200"></canvas></div>
  </div>
</div>

<!-- LOGBUCH -->
<div class="page" id="page-logbuch">
  <div class="page-subheader"><h2>Logbuch</h2><p>Direkt nach dem Dienst ausfuellen. Daten fliessen automatisch in KPIs und E-Mails ein.</p></div>
  <div class="logbuch-layout">
    <div>
      <div class="block">
        <div class="block-head"><span class="block-title">Neuer Eintrag</span></div>
        <div class="lb-form-body">
          <div class="form-row inline">
            <div><label>Person</label><select id="lb-person"><option value="Leon">Leon Seitz</option><option value="Sascha">Sascha Klusik</option><option value="Ian">Ian Horn</option><option value="Detlef">Detlef Schmittel</option></select></div>
            <div><label>Datum</label><input type="date" id="lb-date"></div>
          </div>

          <div class="kpi-section">
            <div class="kpi-section-head">Vorbereitung</div>
            <div class="kpi-section-body">
              <div class="kpi-note">Waren alle Checklisten-Punkte vor dem Gottesdienst vollstaendig abgearbeitet?</div>
              <div class="radio-group" id="lb-vorb-group">
                <div class="radio-btn" onclick="setRadio('lb-vorb-group','Ja',this)">Ja &mdash; vollstaendig</div>
                <div class="radio-btn" onclick="setRadio('lb-vorb-group','Nein',this)">Nein &mdash; unvollstaendig</div>
              </div>
              <div id="lb-vorb-notiz-wrap" style="display:none;margin-top:10px;"><textarea id="lb-vorb-notiz" placeholder="Was fehlte oder war unvollstaendig?"></textarea></div>
            </div>
          </div>

          <div class="kpi-section">
            <div class="kpi-section-head">Folien-Timing</div>
            <div class="kpi-section-body">
              <div class="kpi-note">Wurden Folien rechtzeitig umgeschaltet, sodass Saenger und Gemeinde die Worte vor dem Singen lesen konnten? &laquo;Zu spaet&raquo; bedeutet: die Folie kam erst nach dem ersten Singen des Textes.</div>
              <div class="radio-group" id="lb-timing-group">
                <div class="radio-btn" onclick="setRadio('lb-timing-group','Ja',this)">Alles pueruenktlich</div>
                <div class="radio-btn" onclick="setRadio('lb-timing-group','Nein',this)">Folie(n) zu spaet</div>
              </div>
              <div id="lb-timing-detail" style="display:none;margin-top:10px;">
                <div style="font-size:11.5px;color:var(--muted);margin-bottom:5px;">Wie viele Cues ungefaehr zu spaet?</div>
                <input type="number" id="lb-timing-count" min="1" placeholder="Anzahl" style="width:120px">
              </div>
            </div>
          </div>

          <div class="kpi-section">
            <div class="kpi-section-head">Kritische Fehler</div>
            <div class="kpi-section-body">
              <div class="kpi-note">Technische Vorfaelle: Software/Hardware-Ausfaelle, Abbrueche, Verstaendigungsprobleme mit dem iPad. Waehl alle zutreffenden Kategorien. Kleinigkeiten die niemand bemerkt hat = kein kritischer Fehler.</div>
              <div class="fehler-types" id="lb-fehler-types">
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Software abgestuerzt</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Hardware defekt</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Stream abgebrochen</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Audioprobleme</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Bildausfall</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">ProPresenter-Fehler</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">OBS-Fehler</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Beamerproblem</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">iPad-Verbindung</div>
                <div class="fehler-type-btn" onclick="toggleFehlerType(this)">Sonstiges</div>
              </div>
              <div style="margin-bottom:6px;font-size:11.5px;color:var(--muted);">Kein Fehler aufgetreten?</div>
              <div class="radio-group" id="lb-fehler-none-group" style="margin-bottom:10px;">
                <div class="radio-btn" onclick="setRadio('lb-fehler-none-group','Kein Fehler',this);clearFehlerTypes()">Kein Fehler</div>
              </div>
              <div id="lb-fehler-detail" style="display:none;margin-top:6px;">
                <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px;">Hatte der Fehler sichtbare Auswirkung auf den Gottesdienst?</div>
                <div class="radio-group" id="lb-fehler-impact-group" style="margin-bottom:10px;">
                  <div class="radio-btn" onclick="setRadio('lb-fehler-impact-group','Ja',this)">Ja, sichtbar</div>
                  <div class="radio-btn" onclick="setRadio('lb-fehler-impact-group','Nein',this)">Nein, nur intern</div>
                </div>
                <textarea id="lb-fehler-notiz" placeholder="Was genau ist passiert und wie wurde es behoben? Diese Info geht direkt in die Troubleshooting-Datenbank."></textarea>
              </div>
            </div>
          </div>

          <div class="kpi-section">
            <div class="kpi-section-head">Stream-Qualitaet</div>
            <div class="kpi-section-body">
              <div class="kpi-note">Wie war der YouTube-Livestream? &laquo;Audio-Sync&raquo; = Bild und Ton versetzt. &laquo;Zu spaet&raquo; = Stream startete nach 16:40.</div>
              <div class="radio-group" id="lb-stream-group">
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Gut',this)">Alles gut</div>
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Audio-Sync',this)">Audio-Sync</div>
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Bildqualitaet',this)">Bildqualitaet</div>
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Unterbrochen',this)">Unterbrochen</div>
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Kein Ton',this)">Kein Ton</div>
                <div class="radio-btn" onclick="setRadio('lb-stream-group','Zu spaet',this)">Zu spaet gestartet</div>
              </div>
            </div>
          </div>

          <div class="kpi-section">
            <div class="kpi-section-head">Selbsteinschaetzung</div>
            <div class="kpi-section-body">
              <div class="kpi-note">Wie sicher habe ich heute meinen Bereich beherrscht? (1 = sehr unsicher, 5 = sehr sicher)</div>
              <div class="radio-group" id="lb-selbst-group">
                <div class="radio-btn" onclick="setRadio('lb-selbst-group','1',this)">1</div>
                <div class="radio-btn" onclick="setRadio('lb-selbst-group','2',this)">2</div>
                <div class="radio-btn" onclick="setRadio('lb-selbst-group','3',this)">3</div>
                <div class="radio-btn" onclick="setRadio('lb-selbst-group','4',this)">4</div>
                <div class="radio-btn" onclick="setRadio('lb-selbst-group','5',this)">5</div>
              </div>
            </div>
          </div>

          <div class="form-row"><label>Allgemeine Notiz (optional)</label><textarea id="lb-notiz" placeholder="Sonstige Beobachtungen..."></textarea></div>
          <button class="btn-primary" style="width:100%" onclick="saveLogEntry()">Eintrag speichern</button>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="block"><div class="block-head"><span class="block-title">Eintraege</span><span class="block-tag" id="log-count">0 Dienste</span></div><div id="log-entries-list"><div class="empty-state" style="padding:32px;"><div class="e-icon">&#128203;</div><p>Noch keine Eintraege.</p></div></div></div>
      <div class="block">
        <div class="block-head"><span class="block-title">Geplante E-Mails</span><span class="block-tag" id="email-count">0</span></div>
        <div style="padding:10px 20px 12px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--border);">E-Mails werden zum naechsten Dienst-Termin um 10:00 Uhr generiert. Kopiere den Text oder oeffne deinen Mail-Client direkt.</div>
        <div id="email-list"><div class="empty-state" style="padding:32px;"><div class="e-icon">&#9993;&#65039;</div><p>Keine ausstehenden E-Mails.</p></div></div>
      </div>
    </div>
  </div>
</div>

<!-- TROUBLESHOOTING -->
<div class="page" id="page-troubleshooting">
  <div class="page-subheader-row">
    <div class="page-subheader"><h2>Troubleshooting</h2><p>Dokumentierte Vorfaelle &middot; KI-gestuetzte Problemloesung auf Basis eurer Datenbank</p></div>
    <button class="btn-primary" onclick="openTroubleModal()">+ Manuell eintragen</button>
  </div>
  <div class="trouble-layout">
    <div>
      <div id="trouble-db-list" class="trouble-db"><div class="empty-state"><div class="e-icon">&#128295;</div><p>Noch keine Vorfaelle dokumentiert.<br>Kritische Fehler aus dem Logbuch erscheinen hier automatisch.</p></div></div>
    </div>
    <div>
      <div class="block">
        <div class="block-head"><span class="block-title">KI-Assistent</span><span class="block-tag" style="color:var(--accent)">Claude</span></div>
        <div id="chat-messages" class="chat-messages"><div class="chat-msg ai">Hallo! Ich kenne die dokumentierten Vorfaelle eures Technik-Teams. Beschreib mir ein Problem &mdash; ich helfe beim Troubleshooting.</div></div>
        <div class="chat-input-row"><input class="chat-input" id="chat-input" type="text" placeholder="Problem beschreiben..." onkeydown="if(event.key==='Enter')sendChat()"><button class="chat-send-btn" id="chat-send-btn" onclick="sendChat()">Senden</button></div>
      </div>
    </div>
  </div>
</div>

<!-- MODALS -->
<div class="modal-overlay" id="card-modal">
  <div class="modal"><h3 id="card-modal-title">Neue Aufgabe</h3><input type="hidden" id="card-id">
    <div class="form-row"><label>Titel</label><input type="text" id="card-title" placeholder="Aufgabe..."></div>
    <div class="form-row"><label>Beschreibung</label><textarea id="card-desc" placeholder="Details..."></textarea></div>
    <div class="form-row inline"><div><label>Verantwortlich</label><select id="card-person"><option value="Leon">Leon</option><option value="Sascha">Sascha</option><option value="Ian">Ian</option><option value="Detlef">Detlef</option><option value="Team">Team</option></select></div><div><label>Frist</label><input type="date" id="card-deadline"></div></div>
    <div class="form-row"><label>Status</label><select id="card-status"><option value="offen">Offen</option><option value="progress">In Bearbeitung</option><option value="done">Erledigt</option></select></div>
    <div class="modal-btns"><button class="btn-secondary" onclick="closeModal('card-modal')">Abbrechen</button><button class="btn-primary" onclick="saveCard()">Speichern</button></div>
  </div>
</div>

<div class="modal-overlay" id="trouble-modal">
  <div class="modal"><h3>Vorfall dokumentieren</h3>
    <div class="form-row"><label>Kategorie</label><select id="tm-category"><option>Software abgestuerzt</option><option>Hardware defekt</option><option>Stream abgebrochen</option><option>Audioprobleme</option><option>Bildausfall</option><option>ProPresenter-Fehler</option><option>OBS-Fehler</option><option>Beamerproblem</option><option>iPad-Verbindung</option><option>Sonstiges</option></select></div>
    <div class="form-row"><label>Datum</label><input type="date" id="tm-date"></div>
    <div class="form-row"><label>Was ist passiert?</label><textarea id="tm-problem" placeholder="Genaue Beschreibung..."></textarea></div>
    <div class="form-row"><label>Wie wurde es geloest?</label><textarea id="tm-solution" placeholder="Loesung / Workaround..."></textarea></div>
    <div class="modal-btns"><button class="btn-secondary" onclick="closeModal('trouble-modal')">Abbrechen</button><button class="btn-primary" onclick="saveTroubleEntry()">Speichern</button></div>
  </div>
</div>

<div class="modal-overlay" id="email-modal">
  <div class="modal" style="width:540px"><h3>E-Mail Vorschau</h3>
    <div style="margin-bottom:8px;font-size:12px;color:var(--muted)">An: <span id="em-to" style="color:var(--text);font-weight:500;word-break:break-all"></span></div>
    <div style="margin-bottom:8px;font-size:12px;color:var(--muted)">Betreff: <span id="em-subject" style="color:var(--text);font-weight:500"></span></div>
    <div style="margin-bottom:14px;font-size:12px;color:var(--muted)">Geplant: <span id="em-sched" style="color:var(--text)"></span></div>
    <div class="email-modal-body" id="em-body"></div>
    <div class="modal-btns"><span class="copy-notice" id="copy-notice">Kopiert!</span><button class="btn-secondary" onclick="closeModal('email-modal')">Schliessen</button><button class="btn-secondary" onclick="copyEmailBody()">Text kopieren</button><button class="btn-primary" onclick="sendViaMailto()">Mail-App oeffnen</button></div>
  </div>
</div>

<script>
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

var logEntries=load('kfa-log3',[]);
var kanbanCards=load('kfa-kanban3',[
  {id:'k1',title:'Backup-Laptop einrichten',desc:'Zweites Geraet als Fallback konfigurieren.',person:'Leon',deadline:'2026-03-15',status:'offen'},
  {id:'k2',title:'OBS-Szenen aktualisieren',desc:'Neue CI-Vorlagen fuer alle Stream-Szenen.',person:'Ian',deadline:'2026-02-28',status:'progress'},
  {id:'k3',title:'ProPresenter Schulung',desc:'Einfuehrungsanleitung fuer neue Mitglieder.',person:'Sascha',deadline:'2026-04-01',status:'offen'},
  {id:'k4',title:'SharePoint Wissensbasis',desc:'Geraete-Doku zentral ablegen.',person:'Leon',deadline:'2026-02-20',status:'done'},
]);
var pendingEmails=load('kfa-emails3',[]);
var troubleEntries=load('kfa-trouble3',[]);
var currentEmailPreview=null;
var kpiFilter='alle';
var charts={};
var dragCardId=null;

var DIENSTPLAN=[
  {date:'2026-01-10',name:'Sascha'},{date:'2026-01-17',name:'Detlef'},
  {date:'2026-01-24',name:'Ian'},{date:'2026-01-31',name:'Leon'},
  {date:'2026-02-07',name:'Ian'},{date:'2026-02-14',name:'Sascha'},
  {date:'2026-02-21',name:'Detlef'},{date:'2026-02-28',name:'Leon'},
  {date:'2026-03-07',name:'Sascha'},{date:'2026-03-14',name:'Leon'},
  {date:'2026-03-21',name:'Leon'},{date:'2026-03-28',name:'Ian'},
  {date:'2026-04-04',name:'Leon'},{date:'2026-04-11',name:'Detlef'},
  {date:'2026-04-18',name:'Leon'},{date:'2026-04-25',name:'Ian'},
  {date:'2026-05-02',name:'Sascha'},{date:'2026-05-09',name:'Detlef'},
  {date:'2026-05-16',name:'Leon'},{date:'2026-05-23',name:'Ian'},
  {date:'2026-05-30',name:'Detlef'},{date:'2026-06-06',name:'Sascha'},
  {date:'2026-06-13',name:'Leon'},{date:'2026-06-20',name:'Ian'},
  {date:'2026-06-27',name:'Detlef'},
];
var EMAILS={Leon:'leon.seitz@kircheab.onmicrosoft.com',Ian:'ian.horn@kircheab.onmicrosoft.com',Detlef:'detlef.schmittel@onmicrosoft.com',Sascha:'sascha.klusik@kircheab.onmicrosoft.com'};
var DAYS=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
var MONTHS=['Januar','Februar','Maerz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

function pad(n){return String(n).padStart(2,'0');}
function toKey(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function fmtDate(s){if(!s)return'-';var d=new Date(s+'T12:00:00');return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function showPage(id,btn){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('.nav-tab').forEach(function(t){t.classList.remove('active');});
  document.getElementById('page-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  if(id==='kpi')renderKpiPage();
  if(id==='logbuch'){renderLogEntries();renderEmailList();}
  if(id==='kanban')renderKanban();
  if(id==='troubleshooting')renderTroubleshootingDB();
  if(id==='dashboard')updateDashTiles();
}

function greetingText(h){if(h>=5&&h<11)return'Guten Morgen,';if(h>=11&&h<14)return'Guten Tag,';if(h>=14&&h<18)return'Guten Nachmittag,';return'Guten Abend,';}
function updateClock(){var n=new Date(),h=n.getHours(),m=n.getMinutes();document.getElementById('clock').textContent=pad(h)+':'+pad(m);document.getElementById('greeting-prefix').textContent=greetingText(h);document.getElementById('date-label').textContent=DAYS[n.getDay()]+', '+n.getDate()+'. '+MONTHS[n.getMonth()]+' '+n.getFullYear();updatePhases(h,m);updateNextEvent(h,m);}

function initName(){
  var today=toKey(new Date());
  var entry=DIENSTPLAN.find(function(e){return e.date===today;});
  if(entry){document.getElementById('name-display').textContent=entry.name;document.getElementById('sub-label').textContent='KfA - Bildtechnik - Dienst heute';document.getElementById('lb-person').value=entry.name;}
  var next=DIENSTPLAN.find(function(e){return e.date>today;});
  if(next){var d=new Date(next.date+'T12:00:00');var diff=Math.ceil((d-new Date())/86400000);document.getElementById('dash-next-name').textContent=next.name;document.getElementById('dash-next-date').textContent=fmtDate(next.date);document.getElementById('dash-next-days').textContent=diff<=0?'Heute':diff===1?'Morgen':diff+' Tage';document.getElementById('tile-next-name').textContent=next.name;document.getElementById('tile-next-date').textContent=fmtDate(next.date);}
}
function startEdit(){var d=document.getElementById('name-display'),i=document.getElementById('name-input');i.value=d.textContent==='Dein Name'?'':d.textContent;d.style.display='none';i.style.display='';i.focus();}
function saveEdit(){var i=document.getElementById('name-input'),d=document.getElementById('name-display');d.textContent=i.value.trim()||'Dein Name';d.style.display='';i.style.display='none';}

function updatePhases(h,m){var t=h*60+m;var v=document.getElementById('pill-vor'),du=document.getElementById('pill-durch'),na=document.getElementById('pill-nach');[v,du,na].forEach(function(el){el.className='phase-item';});if(t<960)v.className='phase-item active';else if(t<1110){v.className='phase-item done';du.className='phase-item active';}else{v.className='phase-item done';du.className='phase-item done';na.className='phase-item active';}}
var EVENTS=[{min:960,label:'16:00 Start'},{min:965,label:'16:05 Aufbau'},{min:970,label:'16:10 ProPresenter'},{min:975,label:'16:15 Stream'},{min:980,label:'16:20 Checks'},{min:1000,label:'16:40 Live'},{min:1110,label:'18:30 Logbuch'}];
function updateNextEvent(h,m){var t=h*60+m,next=EVENTS.find(function(e){return e.min>t;}),el=document.getElementById('next-event');if(next){el.textContent=next.label+' (in '+(next.min-t)+' Min.)';el.style.color='';}else{el.textContent='Abgeschlossen';el.style.color='var(--green)';}}

var TASK_IDS=['t-v1','t-v2','t-d1','t-d2','t-d3','t-d4','t-d5','t-n1'];
var doneSet=new Set();
function toggleTask(e,id){e.stopPropagation();var el=document.getElementById(id);if(doneSet.has(id)){doneSet.delete(id);}else{doneSet.add(id);}el.classList.toggle('done',doneSet.has(id));if(doneSet.has(id)){el.classList.remove('open');var s=document.getElementById(id.replace('t-','s-'));if(s)s.classList.remove('open');}updateProgress();}
function toggleSub(sid,tid){var s=document.getElementById(sid);if(!s){toggleTask({stopPropagation:function(){}},tid);return;}s.classList.toggle('open');document.getElementById(tid).classList.toggle('open');}
function toggleSubItem(el){el.classList.toggle('done');}
function updateProgress(){var n=doneSet.size,t=TASK_IDS.length;document.getElementById('check-badge').textContent=n+' / '+t;document.getElementById('progress-lbl').textContent=n+' / '+t+' erledigt';}
updateProgress();

function updateDashTiles(){
  document.getElementById('tile-log-count').textContent=logEntries.length;
  var rc=logEntries.filter(function(e){return e.fehlerTypes&&e.fehlerTypes.length>0&&e.fehlerImpact==='Ja';}).length;
  document.getElementById('tile-issues').textContent=rc;
  document.getElementById('tile-issues-cell').className='tile '+(rc>0?'red':'green');
  document.getElementById('tile-kanban-open').textContent=kanbanCards.filter(function(c){return c.status==='offen';}).length;
  var ll=logEntries[0];
  var el=document.getElementById('dash-last-log');
  if(ll){el.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><strong>'+esc(ll.person)+'</strong><span style="font-size:12px;color:var(--muted)">'+fmtDate(ll.date)+'</span></div><div style="font-size:12px;color:var(--muted)">Vorb: <b>'+esc(ll.vorb||'-')+'</b> &middot; Timing: <b>'+esc(ll.timing||'-')+'</b> &middot; Stream: <b>'+esc(ll.stream||'-')+'</b></div>'+(ll.fehlerTypes&&ll.fehlerTypes.length?'<div style="font-size:12px;color:var(--red);margin-top:4px">Fehler: '+esc(ll.fehlerTypes.join(', '))+'</div>':'');}
  else{el.textContent='Noch kein Eintrag.';}
}

function setRadio(groupId,val,el){
  document.querySelectorAll('#'+groupId+' .radio-btn').forEach(function(b){b.className='radio-btn';});
  el.classList.add('active');el.dataset.val=val;
  if(groupId==='lb-vorb-group')document.getElementById('lb-vorb-notiz-wrap').style.display=val==='Nein'?'block':'none';
  if(groupId==='lb-timing-group')document.getElementById('lb-timing-detail').style.display=val==='Nein'?'block':'none';
}
function getRadioVal(groupId){var a=document.querySelector('#'+groupId+' .radio-btn.active');return a?a.dataset.val||a.textContent.replace(/[\u2714\u2718\u26A1]/g,'').trim():'';}
function toggleFehlerType(el){el.classList.toggle('selected');var any=document.querySelectorAll('#lb-fehler-types .fehler-type-btn.selected').length>0;document.getElementById('lb-fehler-detail').style.display=any?'block':'none';if(any){document.querySelectorAll('#lb-fehler-none-group .radio-btn').forEach(function(b){b.className='radio-btn';});}}
function clearFehlerTypes(){document.querySelectorAll('#lb-fehler-types .fehler-type-btn.selected').forEach(function(b){b.classList.remove('selected');});document.getElementById('lb-fehler-detail').style.display='none';}
function getFehlerTypes(){return Array.from(document.querySelectorAll('#lb-fehler-types .fehler-type-btn.selected')).map(function(el){return el.textContent;});}

function resetForm(){document.querySelectorAll('#page-logbuch .radio-btn').forEach(function(b){b.className='radio-btn';});document.querySelectorAll('.fehler-type-btn').forEach(function(b){b.className='fehler-type-btn';});['lb-vorb-notiz-wrap','lb-timing-detail','lb-fehler-detail'].forEach(function(id){document.getElementById(id).style.display='none';});['lb-notiz','lb-fehler-notiz','lb-vorb-notiz'].forEach(function(id){document.getElementById(id).value='';});document.getElementById('lb-timing-count').value='';document.getElementById('lb-date').value=toKey(new Date());}

function saveLogEntry(){
  var person=document.getElementById('lb-person').value;
  var date=document.getElementById('lb-date').value;
  var vorb=getRadioVal('lb-vorb-group');
  var vorbNotiz=document.getElementById('lb-vorb-notiz').value.trim();
  var timing=getRadioVal('lb-timing-group');
  var timingCount=document.getElementById('lb-timing-count').value;
  var fehlerTypes=getFehlerTypes();
  var fehlerNone=getRadioVal('lb-fehler-none-group');
  var fehlerImpact=getRadioVal('lb-fehler-impact-group');
  var fehlerNotiz=document.getElementById('lb-fehler-notiz').value.trim();
  var stream=getRadioVal('lb-stream-group');
  var selbst=getRadioVal('lb-selbst-group');
  var notiz=document.getElementById('lb-notiz').value.trim();
  if(!vorb||!timing||!stream||!selbst){alert('Bitte alle KPI-Felder auswaehlen.');return;}
  if(!fehlerTypes.length&&!fehlerNone){alert('Bitte Kritische Fehler bestaetigen (oder "Kein Fehler" waehlen).');return;}
  var entry={id:'log'+Date.now(),person:person,date:date,vorb:vorb,vorbNotiz:vorbNotiz,timing:timing,timingCount:timingCount,fehlerTypes:fehlerTypes,fehlerImpact:fehlerImpact,fehlerNotiz:fehlerNotiz,stream:stream,selbst:selbst,notiz:notiz,createdAt:new Date().toISOString()};
  logEntries.unshift(entry);save('kfa-log3',logEntries);
  if(fehlerTypes.length>0&&fehlerNotiz){troubleEntries.unshift({id:'tr'+Date.now(),category:fehlerTypes[0],date:date,problem:fehlerNotiz,solution:'',impact:fehlerImpact,person:person,fromLog:true});save('kfa-trouble3',troubleEntries);}
  generateEmail(entry);renderLogEntries();renderEmailList();checkEmailBadge();updateDashTiles();resetForm();
}

function renderLogEntries(){
  var list=document.getElementById('log-entries-list');
  document.getElementById('log-count').textContent=logEntries.length+' Dienste';
  if(!logEntries.length){list.innerHTML='<div class="empty-state" style="padding:32px"><div class="e-icon">&#128203;</div><p>Noch keine Eintraege.</p></div>';return;}
  list.innerHTML=logEntries.map(function(e){
    var ft=(e.fehlerTypes||[]).join(', ')||'';
    var ip=e.fehlerTypes&&e.fehlerTypes.length?(e.fehlerImpact==='Ja'?'<span class="chip red">Sichtbar</span>':'<span class="chip amber">Intern</span>'):'';
    return '<div class="log-entry"><div class="log-entry-head"><span class="log-person">'+esc(e.person)+'</span><span style="font-family:var(--serif);font-size:18px">'+esc(e.selbst||'-')+'/5</span><span style="font-size:12px;color:var(--muted)">'+fmtDate(e.date)+'</span></div><div class="log-chips"><span class="chip '+(e.vorb==='Ja'?'green':'red')+'">Vorb: '+esc(e.vorb||'-')+'</span><span class="chip '+(e.timing==='Ja'?'green':'amber')+'">Timing: '+esc(e.timing||'-')+'</span><span class="chip '+(e.stream==='Gut'?'green':'amber')+'">Stream: '+esc(e.stream||'-')+'</span>'+(ft?'<span class="chip red">Fehler: '+esc(ft)+'</span>':'<span class="chip green">Kein Fehler</span>')+ip+'</div>'+(e.fehlerNotiz?'<div class="log-notiz">'+esc(e.fehlerNotiz)+'</div>':'')+(e.notiz?'<div class="log-notiz">'+esc(e.notiz)+'</div>':'')+'<div style="margin-top:6px"><button class="log-del-btn" onclick="deleteLogEntry(\''+e.id+'\')">Loeschen</button></div></div>';
  }).join('<div class="divider"></div>');
}
function deleteLogEntry(id){logEntries=logEntries.filter(function(e){return e.id!==id;});save('kfa-log3',logEntries);renderLogEntries();updateDashTiles();}

function getNextDienstFor(person,afterDate){return DIENSTPLAN.find(function(e){return e.date>afterDate&&e.name===person;})||null;}

function generateEmail(entry){
  var hasCrit=entry.fehlerTypes&&entry.fehlerTypes.length>0&&entry.fehlerImpact==='Ja';
  var hasHint=(entry.fehlerTypes&&entry.fehlerTypes.length>0&&entry.fehlerImpact!=='Ja')||(entry.timing==='Nein')||(entry.stream&&entry.stream!=='Gut');
  var level=hasCrit?'red':hasHint?'amber':'green';
  var next=getNextDienstFor(entry.person,entry.date);
  var nextStr=next?fmtDate(next.date):'-';
  var sched=next?next.date+'T10:00:00':'-';
  var to=EMAILS[entry.person]||entry.person+'@kircheab.de';
  var kpiBlock='  Vorbereitung: '+(entry.vorb||'-')+(entry.vorbNotiz?' ('+entry.vorbNotiz+')':'')+'\n  Folien-Timing: '+(entry.timing==='Ja'?'Alles puenktlich':'Zu spaet (ca. '+(entry.timingCount||'?')+' Cue(s))')+'\n  Stream: '+(entry.stream||'-')+'\n  Selbsteinschaetzung: '+(entry.selbst||'-')+'/5';
  var subject,body;
  if(level==='green'){subject='Dienst-Rueckmeldung - '+fmtDate(entry.date);body='Hallo '+entry.person+',\n\nkurze Rueckmeldung zu deinem Dienst am '+fmtDate(entry.date)+'.\n\nAlles lief reibungslos. Danke fuer den zuverlaessigen Einsatz.\n\nDeine KPIs:\n'+kpiBlock+(entry.notiz?'\n\nNotiz: '+entry.notiz:'')+'\n\nAuf Wiedersehen beim naechsten Dienst am '+nextStr+'.\n\nViele Gruesse\nLeon Seitz - KfA Bildtechnik';}
  else if(level==='amber'){var hints=[];if(entry.timing==='Nein')hints.push('Folien-Timing: ca. '+(entry.timingCount||'?')+' Cue(s) zu spaet');if(entry.stream&&entry.stream!=='Gut')hints.push('Stream: '+entry.stream);if(entry.fehlerTypes&&entry.fehlerTypes.length&&entry.fehlerImpact!=='Ja')hints.push('Technischer Hinweis (intern): '+entry.fehlerTypes.join(', '));subject='Dienst-Rueckmeldung - '+fmtDate(entry.date);body='Hallo '+entry.person+',\n\nRueckmeldung zu deinem Dienst am '+fmtDate(entry.date)+'.\n\nKleiner Hinweis fuer den naechsten Dienst am '+nextStr+':\n'+hints.map(function(h){return'  - '+h;}).join('\n')+'\n\nDas ist kein Problem - wir halten es fuer das Quartals-Review fest.\n\nDeine KPIs:\n'+kpiBlock+(entry.notiz?'\n\nNotiz: '+entry.notiz:'')+'\n\nBis zum '+nextStr+'!\n\nViele Gruesse\nLeon Seitz - KfA Bildtechnik';}
  else{subject='Dienst-Rueckmeldung - '+fmtDate(entry.date);body='Hallo '+entry.person+',\n\nRueckmeldung zu deinem Dienst am '+fmtDate(entry.date)+'.\n\nEs gab einen Vorfall:\n  Typ: '+(entry.fehlerTypes||[]).join(', ')+'\n  Auswirkung: sichtbar im Gottesdienst'+(entry.fehlerNotiz?'\n  Beschreibung: '+entry.fehlerNotiz:'')+'\n\nDas ist keine persoenliche Kritik - der Vorfall hilft uns, Prozesse zu verbessern. Wir schauen beim naechsten Dienst am '+nextStr+' gemeinsam darauf.\n\nDeine KPIs:\n'+kpiBlock+(entry.notiz?'\n\nNotiz: '+entry.notiz:'')+'\n\nBis zum '+nextStr+'!\n\nViele Gruesse\nLeon Seitz - KfA Bildtechnik';}
  var em={id:'em'+Date.now(),entryId:entry.id,to:to,person:entry.person,level:level,subject:subject,body:body,scheduledDate:sched,scheduledDisplay:nextStr+' - 10:00 Uhr',sent:false};
  pendingEmails.unshift(em);save('kfa-emails3',pendingEmails);checkEmailBadge();
}

function renderEmailList(){
  var unsent=pendingEmails.filter(function(e){return!e.sent;});
  document.getElementById('email-count').textContent=unsent.length;
  var list=document.getElementById('email-list');
  if(!unsent.length){list.innerHTML='<div class="empty-state" style="padding:32px"><div class="e-icon">&#9993;&#65039;</div><p>Keine ausstehenden E-Mails.</p></div>';return;}
  list.innerHTML=unsent.map(function(em){
    var lvlLabel=em.level==='green'?'Positiv':em.level==='amber'?'Hinweis':'Kritisch';
    return '<div class="email-item"><div class="email-item-head"><span class="chip '+em.level+'" style="color:'+(em.level==='amber'?'var(--amber)':'')+'">'+lvlLabel+'</span><span class="email-person">'+esc(em.person)+'</span><span class="email-sched">'+esc(em.scheduledDisplay)+'</span></div><div class="email-subject">'+esc(em.subject)+'</div><div class="email-btns"><button class="email-btn primary" onclick="previewEmail(\''+em.id+'\')">Vorschau & Senden</button><button class="email-btn" onclick="markSent(\''+em.id+'\')">Als gesendet markieren</button></div></div>';
  }).join('<div class="divider"></div>');
}

function previewEmail(id){var em=pendingEmails.find(function(e){return e.id===id;});if(!em)return;currentEmailPreview=em;document.getElementById('em-to').textContent=em.to;document.getElementById('em-subject').textContent=em.subject;document.getElementById('em-sched').textContent=em.scheduledDisplay;document.getElementById('em-body').textContent=em.body;document.getElementById('email-modal').classList.add('open');}
function copyEmailBody(){if(!currentEmailPreview)return;var fn=function(){var ta=document.createElement('textarea');ta.value=currentEmailPreview.body;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);};try{navigator.clipboard.writeText(currentEmailPreview.body).catch(fn);}catch(e){fn();}var n=document.getElementById('copy-notice');n.classList.add('show');setTimeout(function(){n.classList.remove('show');},2000);}
function sendViaMailto(){if(!currentEmailPreview)return;var a=document.createElement('a');a.href='mailto:'+currentEmailPreview.to+'?subject='+encodeURIComponent(currentEmailPreview.subject)+'&body='+encodeURIComponent(currentEmailPreview.body);a.style.display='none';document.body.appendChild(a);a.click();setTimeout(function(){document.body.removeChild(a);},200);markSent(currentEmailPreview.id);closeModal('email-modal');}
function markSent(id){var em=pendingEmails.find(function(e){return e.id===id;});if(em){em.sent=true;save('kfa-emails3',pendingEmails);renderEmailList();checkEmailBadge();}}
function checkEmailBadge(){var n=pendingEmails.filter(function(e){return!e.sent;}).length;var badge=document.getElementById('email-badge');badge.classList.toggle('visible',n>0);document.getElementById('email-badge-count').textContent=n;}

function setKpiFilter(val,btn){kpiFilter=val;document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');renderKpiPage();}
function getFiltered(){return kpiFilter==='alle'?logEntries:logEntries.filter(function(e){return e.person===kpiFilter;});}
function destroyCharts(){Object.values(charts).forEach(function(c){try{c.destroy();}catch(e){}});charts={};}

function renderKpiPage(){
  var entries=getFiltered();
  var empty=document.getElementById('kpi-empty');
  var cg=document.getElementById('charts-grid');
  var sg=document.getElementById('kpi-stats-grid');
  if(!entries.length){sg.innerHTML='';empty.style.display='block';cg.style.display='none';destroyCharts();return;}
  empty.style.display='none';cg.style.display='grid';
  var avgS=(entries.reduce(function(s,e){return s+(parseInt(e.selbst)||0);},0)/entries.length).toFixed(1);
  var crit=entries.filter(function(e){return e.fehlerTypes&&e.fehlerTypes.length>0&&e.fehlerImpact==='Ja';}).length;
  var tf=entries.filter(function(e){return e.timing==='Nein';}).length;
  var sf=entries.filter(function(e){return e.stream&&e.stream!=='Gut';}).length;
  sg.innerHTML='<div class="kpi-stat"><div class="kpi-stat-val">'+entries.length+'</div><div class="kpi-stat-lbl">Dienste</div></div><div class="kpi-stat"><div class="kpi-stat-val" style="color:'+(parseFloat(avgS)>=4?'var(--green)':parseFloat(avgS)>=3?'var(--amber)':'var(--red)')+'">'+avgS+'</div><div class="kpi-stat-lbl">Selbst.</div><div class="kpi-stat-sub">von 5</div></div><div class="kpi-stat"><div class="kpi-stat-val" style="color:'+(tf>0?'var(--amber)':'var(--green)')+'">'+tf+'</div><div class="kpi-stat-lbl">Timing-Fehler</div></div><div class="kpi-stat"><div class="kpi-stat-val" style="color:'+(crit>0?'var(--red)':'var(--green)')+'">'+crit+'</div><div class="kpi-stat-lbl">Krit. Vorfaelle</div></div>';
  destroyCharts();
  var sorted=entries.slice().reverse();
  var labels=sorted.map(function(e){return fmtDate(e.date).slice(0,5)+' '+e.person[0];});
  charts.selbst=new Chart(document.getElementById('chart-selbst').getContext('2d'),{type:'line',data:{labels:labels,datasets:[{label:'Selbst.',data:sorted.map(function(e){return parseInt(e.selbst)||0;}),borderColor:'#2563eb',backgroundColor:'rgba(37,99,235,.08)',tension:.3,pointRadius:4,fill:true}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:1,max:5,ticks:{stepSize:1}}}}});
  charts.timing=new Chart(document.getElementById('chart-timing').getContext('2d'),{type:'bar',data:{labels:labels,datasets:[{label:'Cues',data:sorted.map(function(e){return e.timing==='Nein'?parseInt(e.timingCount)||1:0;}),backgroundColor:sorted.map(function(e){return e.timing==='Nein'?'rgba(180,83,9,.7)':'rgba(22,163,74,.3)';})}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:0,ticks:{stepSize:1}}}}});
  var ftm={};entries.forEach(function(e){(e.fehlerTypes||[]).forEach(function(t){ftm[t]=(ftm[t]||0)+1;});});var ftk=Object.keys(ftm);
  charts.fehler=new Chart(document.getElementById('chart-fehler').getContext('2d'),{type:'doughnut',data:{labels:ftk.length?ftk:['Keine Fehler'],datasets:[{data:ftk.length?ftk.map(function(k){return ftm[k];}):[1],backgroundColor:ftk.length?['rgba(220,38,38,.7)','rgba(180,83,9,.6)','rgba(37,99,235,.6)','rgba(22,163,74,.6)','rgba(100,100,100,.4)']:['rgba(22,163,74,.3)']}]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:11}}}}}});
  var sm={};entries.forEach(function(e){if(e.stream){sm[e.stream]=(sm[e.stream]||0)+1;}});
  charts.stream=new Chart(document.getElementById('chart-stream').getContext('2d'),{type:'bar',data:{labels:Object.keys(sm),datasets:[{label:'Anzahl',data:Object.values(sm),backgroundColor:Object.keys(sm).map(function(k){return k==='Gut'?'rgba(22,163,74,.7)':'rgba(180,83,9,.6)';})}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:0,ticks:{stepSize:1}}}}});
}

function renderKanban(){['offen','progress','done'].forEach(function(col){var cards=kanbanCards.filter(function(c){return c.status===col;});document.getElementById('cards-'+col).innerHTML='';cards.forEach(function(card){var el=document.createElement('div');el.className='kcard';el.draggable=true;el.dataset.id=card.id;var dc=getDeadlineClass(card.deadline);el.innerHTML='<div class="kcard-title">'+esc(card.title)+'</div>'+(card.desc?'<div class="kcard-desc">'+esc(card.desc)+'</div>':'')+'<div class="kcard-meta"><span class="kcard-person">'+esc(card.person)+'</span>'+(card.deadline?'<span class="kcard-deadline '+dc+'">'+fmtDate(card.deadline)+'</span>':'')+'</div><div class="kcard-actions"><button class="kcard-btn" onclick="openCardModal(null,\''+card.id+'\')">Bearbeiten</button><button class="kcard-btn danger" onclick="deleteCard(\''+card.id+'\')">Loeschen</button></div>';el.addEventListener('dragstart',function(){dragCardId=card.id;el.classList.add('dragging');});el.addEventListener('dragend',function(){el.classList.remove('dragging');});document.getElementById('cards-'+col).appendChild(el);});document.getElementById('cnt-'+col).textContent=cards.length;});}
function getDeadlineClass(dl){if(!dl)return'';var diff=(new Date(dl+'T12:00:00')-new Date())/86400000;if(diff<0)return'overdue';if(diff<7)return'soon';return'';}
function onDragOver(e,col){e.preventDefault();document.getElementById('col-'+col).style.background='rgba(37,99,235,.04)';}
function onDrop(e,col){e.preventDefault();document.getElementById('col-'+col).style.background='';if(dragCardId){var c=kanbanCards.find(function(x){return x.id===dragCardId;});if(c){c.status=col;save('kfa-kanban3',kanbanCards);renderKanban();}dragCardId=null;}}
function openCardModal(defStatus,editId){var m=document.getElementById('card-modal');document.getElementById('card-modal-title').textContent=editId?'Aufgabe bearbeiten':'Neue Aufgabe';if(editId){var c=kanbanCards.find(function(x){return x.id===editId;});document.getElementById('card-id').value=c.id;document.getElementById('card-title').value=c.title;document.getElementById('card-desc').value=c.desc||'';document.getElementById('card-person').value=c.person;document.getElementById('card-deadline').value=c.deadline||'';document.getElementById('card-status').value=c.status;}else{document.getElementById('card-id').value='';document.getElementById('card-title').value='';document.getElementById('card-desc').value='';document.getElementById('card-person').value='Leon';document.getElementById('card-deadline').value='';document.getElementById('card-status').value=defStatus||'offen';}m.classList.add('open');}
function saveCard(){var id=document.getElementById('card-id').value;var card={id:id||'k'+Date.now(),title:document.getElementById('card-title').value.trim()||'Aufgabe',desc:document.getElementById('card-desc').value.trim(),person:document.getElementById('card-person').value,deadline:document.getElementById('card-deadline').value,status:document.getElementById('card-status').value};if(id){var i=kanbanCards.findIndex(function(c){return c.id===id;});if(i>-1)kanbanCards[i]=card;}else kanbanCards.push(card);save('kfa-kanban3',kanbanCards);closeModal('card-modal');renderKanban();updateDashTiles();}
function deleteCard(id){kanbanCards=kanbanCards.filter(function(c){return c.id!==id;});save('kfa-kanban3',kanbanCards);renderKanban();updateDashTiles();}

function renderTroubleshootingDB(){var list=document.getElementById('trouble-db-list');if(!troubleEntries.length){list.innerHTML='<div class="empty-state"><div class="e-icon">&#128295;</div><p>Noch keine Vorfaelle dokumentiert.<br>Kritische Fehler aus dem Logbuch erscheinen hier automatisch.</p></div>';return;}list.innerHTML=troubleEntries.map(function(e){return'<div class="trouble-entry"><div class="trouble-entry-head"><div><div class="trouble-title">'+esc(e.category)+'</div><div class="trouble-date">'+fmtDate(e.date)+' - '+esc(e.person||'-')+'</div></div><button class="trouble-del-btn" onclick="deleteTroubleEntry(\''+e.id+'\')">Loeschen</button></div><div class="trouble-problem">'+esc(e.problem)+'</div>'+(e.solution?'<div class="trouble-solution">'+esc(e.solution)+'</div>':'<div style="font-size:12px;color:var(--light);padding:4px 0">Noch keine Loesung dokumentiert.</div>')+(e.impact==='Ja'?'<span class="chip red" style="margin-top:6px;display:inline-block">Sichtbare Auswirkung</span>':'')+'</div>';}).join('');}
function openTroubleModal(){document.getElementById('tm-date').value=toKey(new Date());document.getElementById('tm-problem').value='';document.getElementById('tm-solution').value='';document.getElementById('trouble-modal').classList.add('open');}
function saveTroubleEntry(){var te={id:'tr'+Date.now(),category:document.getElementById('tm-category').value,date:document.getElementById('tm-date').value,problem:document.getElementById('tm-problem').value.trim(),solution:document.getElementById('tm-solution').value.trim(),fromLog:false};if(!te.problem){alert('Bitte das Problem beschreiben.');return;}troubleEntries.unshift(te);save('kfa-trouble3',troubleEntries);closeModal('trouble-modal');renderTroubleshootingDB();}
function deleteTroubleEntry(id){troubleEntries=troubleEntries.filter(function(e){return e.id!==id;});save('kfa-trouble3',troubleEntries);renderTroubleshootingDB();}

function buildSystemPrompt(){var db=troubleEntries.length?troubleEntries.map(function(e){return'Vorfall: '+e.category+' ('+e.date+')\nProblem: '+e.problem+'\nLoesung: '+(e.solution||'unbekannt');}).join('\n---\n'):'Noch keine Vorfaelle.';return'Du bist ein technischer Assistent fuer das Bildtechnik-Team der KfA (Kirche fuer Aschaffenburg). Du hilfst bei der Fehlerdiagnose rund um ProPresenter, OBS, YouTube, Beamer, Audio, iPads. Dokumentierte Vorfaelle:\n'+db+'\n\nBeziehe dich auf aehnliche Vorfaelle wenn relevant. Antworte kurz und klar auf Deutsch.';}
var chatHistory=[];
async function sendChat(){var input=document.getElementById('chat-input');var msg=input.value.trim();if(!msg)return;input.value='';var btn=document.getElementById('chat-send-btn');btn.disabled=true;appendMsg(msg,'user');chatHistory.push({role:'user',content:msg});var loading=appendMsg('...','ai loading');try{var res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:buildSystemPrompt(),messages:chatHistory})});var data=await res.json();var reply=data.content&&data.content[0]?data.content[0].text:'Keine Antwort.';loading.textContent=reply;loading.className='chat-msg ai';chatHistory.push({role:'assistant',content:reply});if(chatHistory.length>16)chatHistory=chatHistory.slice(-16);}catch(e){loading.textContent='Verbindungsfehler.';loading.className='chat-msg ai';}btn.disabled=false;input.focus();}
function appendMsg(text,cls){var msgs=document.getElementById('chat-messages');var el=document.createElement('div');el.className='chat-msg '+cls;el.textContent=text;msgs.appendChild(el);msgs.scrollTop=msgs.scrollHeight;return el;}

function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(function(o){o.addEventListener('click',function(e){if(e.target===o)o.classList.remove('open');});});

document.getElementById('lb-date').value=toKey(new Date());
initName();updateClock();updateDashTiles();renderKanban();checkEmailBadge();
setInterval(updateClock,30000);
<\/script>
</body>
</html>
