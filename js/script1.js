(function () {
  'use strict';

  // Utility
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ====== NAV / HAMBURGER ======
  function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    if (!nav) return;
    nav.classList.toggle('show');
    // accessibility: reflect state on aria-expanded if a button controls it
    const btn = document.querySelector('.hamburger');
    if (btn) btn.setAttribute('aria-expanded', nav.classList.contains('show'));
  }
  window.toggleMenu = toggleMenu; // keep global if inline handlers used

  // ====== TABS (generic for .et_pb_tabs and card tabs) ======
  function initTabs(root = document) {
    // ET PB Tabs (server-generated markup uses li anchors)
    $$(".et_pb_tabs_controls li").forEach((tab, idx, list) => {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        list.forEach(t => t.classList.remove('et_pb_tab_active'));
        $$('.et_pb_tab').forEach(c => { c.classList.remove('et_pb_active_content'); c.style.display = 'none'; });

        tab.classList.add('et_pb_tab_active');
        const contents = $$('.et_pb_tab');
        if (contents[idx]) { contents[idx].classList.add('et_pb_active_content'); contents[idx].style.display = 'block'; }
      });
    });

    // Card-level tabs (.tab buttons inside each card)
    $$(".card").forEach(card => {
      const tabs = card.querySelectorAll('.tab');
      const panels = card.querySelectorAll('.panel');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          panels.forEach(p => p.classList.add('hidden'));
          tab.classList.add('active');
          const panel = card.querySelector(`[data-panel="${tab.dataset.tab}"]`);
          if (panel) panel.classList.remove('hidden');
        });
      });
      // ensure default
      if (tabs.length && panels.length) {
        tabs[0].classList.add('active');
        panels.forEach((p, i) => p.classList.toggle('hidden', i !== 0));
      }
    });
  }

  // ====== SALES VERTICAL SLIDER ======
  function initVerticalSlider(containerId, intervalTime = 3500, prevBtnId, nextBtnId, itemHeightPx = 132) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    const rows = wrap.children.length;
    let pos = 0;

    function update() { wrap.style.transform = `translateY(${-pos * itemHeightPx}px)`; }

    const prev = prevBtnId ? document.getElementById(prevBtnId) : null;
    const next = nextBtnId ? document.getElementById(nextBtnId) : null;
    if (prev) prev.addEventListener('click', () => { pos = Math.max(0, pos - 1); update(); });
    if (next) next.addEventListener('click', () => { pos = Math.min(Math.max(0, rows - 1), pos + 1); update(); });

    // optional autoplay
    if (intervalTime > 0 && rows > 1) {
      setInterval(() => { pos = (pos + 1) % rows; update(); }, intervalTime);
    }
  }

  // ====== HORIZONTAL SLIDER (generic) ======
  function moveSlide(direction, trackId = 'sliderTrack') {
    const sliderTrack = document.getElementById(trackId);
    if (!sliderTrack) return;
    const slides = sliderTrack.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (!sliderTrack._index) sliderTrack._index = 0;
    sliderTrack._index = (sliderTrack._index + direction + totalSlides) % totalSlides;
    sliderTrack.style.transform = `translateX(-${sliderTrack._index * 100}%)`;
  }
  window.moveSlide = moveSlide;

  // ====== PRODUCTS / CATALOG ======
  const PRODUCTS = window.PRODUCTS || []; // keep existing if set inline
  const formatIDR = n => 'Rp ' + (n || 0).toLocaleString('id-ID');

  function render() {
    const qEl = document.getElementById('q');
    const q = (qEl && qEl.value || '').toLowerCase();
    const filterChip = document.querySelector('.chip.active');
    const FILTER = (filterChip && filterChip.dataset.filter) || 'all';
    const filtered = PRODUCTS.filter(p => (FILTER === 'all' || p.tags.includes(FILTER)) && p.name.toLowerCase().includes(q));

    const sortVal = document.getElementById('sort')?.value || 'default';
    if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortVal === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortVal === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

    const grid = document.getElementById('grid');
    if (!grid) return;
    grid.innerHTML = filtered.map(p => cardHTML(p)).join('');
    filtered.forEach(p => wireCard(p));

    // re-init tabs inside newly rendered cards
    initTabs(grid);
  }

  function cardHTML(p) {
    const minV = p.variants.reduce((m, v) => Math.min(m, v.price), Infinity);
    return `
      <article class="card" data-id="${p.id}">
        <div class="card-head">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
          <img src="${p.images.cover}" alt="${p.name}" data-main>
          <div class="price-tag">${formatIDR(minV)} <small>*OTR</small></div>
        </div>
        <div class="card-body">
          <div class="topline">
            <div>
              <h3>${p.name}</h3>
              <div class="variant">${p.variants.map(v => `${v.name}: ${formatIDR(v.price)}`).join(' • ')}</div>
            </div>
            <label class="compare-ctl"><input type="checkbox" data-compare> Bandingkan</label>
          </div>

          <div class="tabs" role="tablist">
            <button class="tab" data-tab="overview" type="button">Overview</button>
            <button class="tab" data-tab="exterior" type="button">Exterior</button>
            <button class="tab" data-tab="interior" type="button">Interior</button>
            <button class="tab" data-tab="specs" type="button">Spesifikasi</button>
          </div>

          <div class="panel" data-panel="overview">
            <div class="swatches">
              <small>Warna:</small>
              ${p.colors.map((c, i) => `<button class="dot" title="${c.name}" style="background:${c.hex}" data-color="${i}" type="button"></button>`).join('')}
            </div>
            <div class="specs">
              ${p.specs.map(s => `<div class="spec"><strong>${s[0]}:</strong> ${s[1]}</div>`).join('')}
            </div>
            <div class="actions">
              <a class="btn-sm primary" target="_blank" href="${p.brochure}">Download Brosur</a>
              <a class="btn-sm" href="https://wa.me/" target="_blank">Test Drive</a>
            </div>
          </div>

          <div class="panel hidden" data-panel="exterior">${galleryHTML(p.images.exterior)}</div>
          <div class="panel hidden" data-panel="interior">${galleryHTML(p.images.interior)}</div>
          <div class="panel hidden" data-panel="specs">
            <div class="specs">
              ${p.specs.map(s => `<div class="spec"><strong>${s[0]}:</strong> ${s[1]}</div>`).join('')}
              <div class="spec"><strong>Harga:</strong> ${p.variants.map(v => `${v.name} ${formatIDR(v.price)}`).join(' | ')}</div>
              <div class="spec"><strong>Keterangan:</strong> Harga OTR Jadetabek • Dapat berubah • Pajak progresif ditanggung konsumen</div>
            </div>
          </div>
        </div>
      </article>`;
  }

  function galleryHTML(arr) {
    if (!arr || !arr.length) return '<em style="color:var(--muted)">Galeri segera hadir</em>';
    const first = arr[0];
    return `
      <div class="gallery" data-gallery>
        <img src="${first}" alt="preview" data-preview>
        <div class="thumbs">
          ${arr.map((src, i) => `<img src="${src}" data-thumb="${i}" class="${i === 0 ? 'active' : ''}">`).join('')}
        </div>
      </div>`;
  }

  // Wire interactions for each card after it's inserted
  function wireCard(p) {
    const root = document.querySelector(`[data-id="${p.id}"]`);
    if (!root) return;

    // tabs are init'd by initTabs

    // gallery
    root.querySelectorAll('[data-gallery]').forEach(g => {
      const preview = g.querySelector('[data-preview]');
      g.querySelectorAll('[data-thumb]').forEach(th => {
        th.addEventListener('click', () => {
          g.querySelectorAll('[data-thumb]').forEach(t => t.classList.remove('active'));
          th.classList.add('active');
          if (preview) preview.src = th.src;
        });
        th.addEventListener('dblclick', () => openLightbox(`<img src='${th.src}' style='max-width:92vw;max-height:86vh;border-radius:12px'/>`));
      });
      preview?.addEventListener('click', () => openLightbox(`<img src='${preview.src}' style='max-width:92vw;max-height:86vh;border-radius:12px'/>`));
    });

    // color swatches
    const cover = root.querySelector('[data-main]');
    root.querySelectorAll('[data-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('[data-color]').forEach(b => b.style.outline = 'none');
        btn.style.outline = '2px solid var(--primary)';
        if (cover) {
          cover.style.filter = 'saturate(1.05) contrast(1.02)';
          cover.style.boxShadow = '0 0 0 3px rgba(211,0,0,.35)';
          setTimeout(() => { cover.style.boxShadow = 'none'; }, 450);
        }
      });
    });

    // compare checkbox
    const chk = root.querySelector('[data-compare]');
    chk?.addEventListener('change', (ev) => {
      if (ev.target.checked) {
        if (window.COMPARE.size >= 3) { alert('Maksimum 3 model untuk dibandingkan.'); ev.target.checked = false; return; }
        window.COMPARE.set(p.id, p);
      } else { window.COMPARE.delete(p.id); }
      renderDrawer();
    });
  }

  function openLightbox(html) {
    const lb = document.getElementById('lightbox');
    const box = document.getElementById('lightbox-box');
    if (!lb || !box) return;
    box.innerHTML = html;
    lb.classList.add('open');
    lb.focus();
  }

  function renderDrawer() {
    const drawer = document.getElementById('drawer');
    const mini = document.getElementById('mini');
    if (!drawer || !mini) return;
    if (window.COMPARE.size === 0) { drawer.style.display = 'none'; mini.innerHTML = ''; return; }
    drawer.style.display = 'block';
    mini.innerHTML = Array.from(window.COMPARE.values()).map(p => `<div class="mini-item">${p.name}<br><small>${formatIDR(p.price)}</small></div>`).join('');
  }

  function clearCompare() { window.COMPARE.clear(); $$("[data-compare]").forEach(c => c.checked = false); renderDrawer(); }
  window.clearCompare = clearCompare;

  function openCompare() {
    if (window.COMPARE.size < 2) { alert('Pilih minimal 2 model.'); return; }
    const items = Array.from(window.COMPARE.values());
    const specRows = ['Mesin', 'Hybrid', 'Baterai', 'Tenaga', 'Kursi', 'Fitur'];
    const html = `<h2 style='margin:0 0 8px'>Perbandingan Model</h2><div style='overflow:auto'><table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:10px;border-bottom:1px solid var(--border)'>Spesifikasi</th>${items.map(p => `<th style='text-align:left;padding:10px;border-bottom:1px solid var(--border)'>${p.name}<br><small>${formatIDR(p.price)}</small></th>`).join('')}</tr>${specRows.map(key => `<tr><td style='padding:10px;border-bottom:1px solid var(--border)'><strong>${key}</strong></td>${items.map(p => `<td style='padding:10px;border-bottom:1px solid var(--border)'>${(p.specs.find(s => s[0] === key) || ['', '-'])[1] || '-'}</td>`).join('')}</tr>`).join('')}</table></div>`;
    openLightbox(`<div>${html}</div>`);
  }
  window.openCompare = openCompare;

  // ====== ACCORDION ======
  function toggleAcc(el) {
    // el may be the button element or the event target
    const btn = (typeof el === 'string') ? document.querySelector(el) : el;
    if (!btn) return;
    const controls = btn.getAttribute('aria-controls');
    const body = controls ? document.getElementById(controls) : btn.nextElementSibling;
    if (!body) return;

    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (body.hasAttribute('hidden')) body.removeAttribute('hidden'); else body.setAttribute('hidden', '');
  }
  window.toggleAcc = toggleAcc;

  function initAccordions() {
    $$('button.acc-head').forEach(btn => {
      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-expanded', 'false');
      const controls = btn.getAttribute('aria-controls');
      if (controls) {
        const body = document.getElementById(controls);
        if (body) body.setAttribute('hidden', '');
      }
      btn.addEventListener('click', () => toggleAcc(btn));
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAcc(btn); } });
    });
  }

  // ====== Analytics / WA tracking ======
  function initWATracking() {
    $$('a[href*="wa.me"]').forEach(el => el.addEventListener('click', function () {
      const transactionId = 'WA-' + Date.now();
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', { 'send_to': 'AW-17552436630/PHs-CJOSk5kbEJbb07FB', 'transaction_id': transactionId });
        console.log('Konversi WA terkirim dengan ID:', transactionId);
      }
    }));
  }

  // ====== LIGHTBOX CLOSE HANDLERS ======
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  // ====== BOOT ======
  document.addEventListener('DOMContentLoaded', () => {
    // init global state containers
    window.COMPARE = window.COMPARE || new Map();

    // init features
    initTabs();
    initAccordions();
    initVerticalSlider('salesSlider', 4000, 'prev', 'next', 132);
    initVerticalSlider('slider', 3000); // generic vertical slider for .slider-track if present

    // wire search & chips
    const q = document.getElementById('q'); q?.addEventListener('input', render);
    $$('.chip').forEach(c => c.addEventListener('click', (ev) => { $$('.chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); render(); }));
    document.getElementById('sort')?.addEventListener('change', render);

    // initialize PRODUCTS render (if PRODUCTS exists)
    if ((window.PRODUCTS || []).length) render();

    initWATracking();
    initLightbox();

    // header hide on scroll
    let lastScroll = 0; const headerEl = document.querySelector('header');
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > lastScroll && currentScroll > 80) headerEl?.classList.add('hide'); else headerEl?.classList.remove('hide');
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

  });

})();
