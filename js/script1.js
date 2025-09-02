
  function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
  }
  document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".et_pb_tabs_controls li");
  const contents = document.querySelectorAll(".et_pb_tab");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // hapus active di semua
      tabs.forEach(t => t.classList.remove("et_pb_tab_active"));
      contents.forEach(c => {
        c.classList.remove("et_pb_active_content");
        c.style.display = "none";
      });

      // aktifkan tab yang diklik
      tab.classList.add("et_pb_tab_active");
      contents[index].classList.add("et_pb_active_content");
      contents[index].style.display = "block";
    });
  });

  // default aktif tab pertama
  if (contents.length > 0) {
    contents[0].classList.add("et_pb_active_content");
    contents[0].style.display = "block";
  }
});


    // ====== SALES VERTICAL SLIDER ======
    (function(){
      const wrap=document.getElementById('salesSlider');
      const rows=wrap.children.length; let pos=0; const step=1; // 1 card per scroll
      document.getElementById('prev').onclick=()=>{ pos=Math.max(0,pos-step); wrap.style.transform=`translateY(${-pos*132}px)` };
      document.getElementById('next').onclick=()=>{ pos=Math.min(rows-3,pos+step); wrap.style.transform=`translateY(${-pos*132}px)` };
    })();

    // ====== KATALOG (DATA PRODUK) ======
    const PRODUCTS = [
      { id:'tiggo-cross-sport', name:'Tiggo Cross Sport', tags:['suv'], badge:'NEW', price:299900000, variants:[{name:'Sport', price:299900000}], brochure:'Brochure-Tiggo-Cross-CSH-New.pdf', images:{ cover:'images/tiggocrosssportaftersales.jpg', exterior:['images/extersport1.jpg','images/extersport2.jpg'], interior:['images/intercrosssport1.jpg','images/intercrosssport2.jpg','images/intercrosssport3.jpg'] }, colors:[{name:'Merah',hex:'#e00404',},{name:'Putih',hex:'#ffffff'},{name:'Hitam',hex:'#000000'},{name:'Grey',hex:'#605c5cff'},], specs:[ ['Mesin','1.5T'], ['Tenaga','~156 HP'], ['Fitur','ADAS • 6 Airbag • Sunroof'] ] },
      { id:'tiggo-9-csh', name:'Tiggo 9 CSH', tags:['suv','hybrid'], badge:'NEW', price:719900000, variants:[{name:'CSH', price:719900000}], brochure:'Brochuretiggo9csh.pdf', images:{ cover:'images/tampakdepanbawah.jpg', exterior:['images/tiggo9cshexter4.jpg','images/tiggo9cshinter1.jpg','images/tiggo9cshinter2.jpg','images/tiggo9cshexter1.jpg','images/tiggo9cshexter2.jpg'], interior:['images/kursidepandanbelakang.jpg','images/pengaturkursi.jpg','images/sunroof.jpg','images/tampakairbag.jpg'] }, colors:[{name:'Putih',hex:'#ffffffff'},{name:'Hitam',hex:'#000'},{name:'Abu',hex:'#6b7280'},{name:'Hijau',hex:'#0a4b3f'}], specs:[ ['Mesin','2.0T / Hybrid'], ['Kursi','7 Seater'], ['Fitur','Sunroof • ADAS • Audio Premium'] ] },
      { id:'tiggo-cross-csh', name:'Tiggo Cross CSH Hybrid', tags:['suv','hybrid'], badge:'NEW', price:299900000, variants:[{name:'Comfort', price:299900000},{name:'Premium', price:319800000}], brochure:'Brochure-Tiggo-Cross-CSH-New.pdf', images:{ cover:'images/tiggocrosscshaftersales.jpg', exterior:['images/extercrosscsh1.jpg','images/extercrosscsh2.jpg','images/crosscshexter2.jpg','images/crosscshexter1.jpg'], interior:['images/intercrosscsh1.jpg','images/intercrosscsh2.jpg','images/intercrosscsh3.jpg'] }, colors:[{name:'Merah',hex:'#e00404'},{name:'Putih',hex:'#ffffff'},{name:'Hitam',hex:'#000000'},{name:'Grey',hex:'#605c5cff'},], specs:[ ['Hybrid','1.5T + Motor Listrik'], ['Daya','201 HP / 310 Nm'], ['Fitur','Sunroof • 6 Airbag • ADAS'] ] },
      { id:'j6', name:'Chery J6', tags:['suv'], price:505500000, variants:[{name:'RWD', price:505500000},{name:'IWD', price:565500000}], brochure:'BrochureJ6.pdf', images:{ cover:'images/j6gambarcover.jpg', exterior:['images/exteriorj61.jpg','images/exteriorj64.jpg','images/exteriorj65.jpg','images/exteriorj62.jpg'], interior:['images/interiorj61.jpg','images/interiorj62.jpg'] }, colors:[{name:'Putih',hex:'#fff'},{name:'Hijau',hex:'#0a4b3f'},{name:'Grey',hex:'#605c5cff'},{name:'Silver',hex:'#ffffff'},{name:'Hitam',hex:'#000000'},], specs:[ ['Dimensi','SUV Large Cube Design'], ['Kursi','5 Seater'], ['Fitur','ADAS • 360° Camera'] ] },
      { id:'tiggo-8-csh', name:'Tiggo 8 CSH', tags:['suv','hybrid'], badge:'NEW', price:509900000, variants:[{name:'CSH', price:509900000},{name:'Varian 2', price:519900000}], brochure:'Brochuretiggo8csh.pdf', images:{ cover:'images/tiggo8cshaftersales.jpg', exterior:['images/tiggo8cshexterior1.jpg','images/tiggo8cshexterior2.jpg','images/tiggo8cshexterior3.jpg','images/tiggo8cshexterior4.jpg'], interior:['images/tiggo8cshinterior1.jpg','images/tiggo8cshinterior2.jpg'] }, colors:[{name:'Putih',hex:'#ffffffff'},{name:'Hitam',hex:'#000'},{name:'Abu',hex:'#6b7280'},{name:'Hijau',hex:'#0a4b3f'}], specs:[ ['Mesin','Hybrid'], ['Kursi','7 Seater'], ['Fitur','Panoramic Sunroof • ADAS'] ] },
      { id:'tiggo-8', name:'Tiggo 8', tags:['suv'], price:357500000, variants:[{name:'Comfort', price:357500000},{name:'Premium', price:397500000}], brochure:'Brochuretiggo8.pdf', images:{ cover:'images/tiggo8aftersales.jpg', exterior:['images/tiggo8exterior.jpg','images/tiggo8exterior2.jpg','images/tiggo8exterior3.jpg','images/tiggo8exterior4.jpg'], interior:['images/tiggo8interior1.jpg','images/tiggo8interior2.jpg'] }, colors:[{name:'Biru',hex:'#1e40af'},{name:'Grey',hex:'#605c5cff'},{name:'Hitam',hex:'#000'},{name:'Putih',hex:'#ffffff'}], specs:[ ['Mesin','1.5T'], ['Kursi','7 Seater'], ['Fitur','ADAS • Sunroof'] ] },
      { id:'tiggo-cross', name:'Tiggo Cross', tags:['suv'], price:259500000, variants:[{name:'Comfort', price:259500000},{name:'Premium', price:289500000}], brochure:'Brochure-Tiggo-Cross-CSH-New.pdf', images:{ cover:'images/tiggocrossaftersales.jpg', exterior:['images/tiggocrossexterior1.jpg','images/tiggocrossexterior2.jpg','images/tiggocrossexterior3.jpg','images/tiggocrossexterior4.jpg'], interior:['images/tiggocrossinterior1.jpg','images/tiggocrossinterior2.jpg'] }, colors:[{name:'Merah',hex:'#e00404'},{name:'Putih',hex:'#ffffff'},{name:'Hitam',hex:'#000000'},{name:'Grey',hex:'#605c5cff'},], specs:[ ['Mesin','1.5L'], ['Transmisi','CVT'], ['Fitur','HHC • HDC • 360° Camera'] ] },
      { id:'e5', name:'Chery E5', tags:['ev'], badge:'NEW', price:399900000, variants:[{name:'E5', price:399900000},{name:'Pure', price:369900000}], brochure:'Brochuree5.pdf', images:{ cover:'images/e5aftersales.jpg', exterior:['images/extere51.jpg','images/extere52.jpg','images/extere53.jpg','images/extere54.jpg'], interior:['images/intere51.jpg','images/intere52.jpg'] }, colors:[{name:'Green 2 Tone',hex:'#d7f3ea'},{name:'Putih 2 Tone',hex:'#fff'},{name:'Putih',hex:'#ffffff'},{name:'Hitam',hex:'#000000'},{name:'Grey',hex:'#605c5cff'}], specs:[ ['Baterai','~50–60 kWh'], ['Jarak','~400 km CLTC'], ['Fitur','V2L • ADAS'] ] },
      { id:'c5', name:'Chery C5', tags:['suv'], badge:'NEW', price:319900000, variants:[{name:'SZ', price:319900000},{name:'RZ', price:349900000},{name:'RZ Red Ruby / Two Tone', price:354900000}], brochure:'Brochurec5rz.pdf', images:{ cover:'images/c5aftersales.jpg', exterior:['images/exteriorrz1.jpg','images/exteriorrz3.jpg','images/exteriorrz2.jpg'], interior:['images/interiorrz.jpg','images/interiorrz1.jpg'] }, colors:[{name:'Merah Ruby',hex:'#b3001b'},{name:'Putih 2 Tone',hex:'#ffffff'},{name:'Putih',hex:'#ffffff'},{name:'Hitam',hex:'#000'}], specs:[ ['Mesin','1.5T'], ['Tenaga','~180 HP'], ['Fitur','ADAS • Dual Screen'] ] }
    ];

    const formatIDR = n => 'Rp ' + (n||0).toLocaleString('id-ID');
    let FILTER='all';
    let COMPARE = new Map();

    function setFilter(el){
      document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'))
      el.classList.add('active');
      FILTER = el.dataset.filter;
      render();
    }

    function getSorted(list){
      const val = document.getElementById('sort').value;
      let arr = [...list];
      if(val==='price-asc') arr.sort((a,b)=>a.price-b.price)
      if(val==='price-desc') arr.sort((a,b)=>b.price-a.price)
      if(val==='name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name))
      if(val==='name-desc') arr.sort((a,b)=>b.name.localeCompare(a.name))
      return arr;
    }

    function render(){
      const q = (document.getElementById('q').value||'').toLowerCase();
      const filtered = PRODUCTS.filter(p=> (FILTER==='all' || p.tags.includes(FILTER)) && p.name.toLowerCase().includes(q) );
      const list = getSorted(filtered);
      const grid = document.getElementById('grid');
      grid.innerHTML = list.map(p=>cardHTML(p)).join('');
      list.forEach(p=>wireCard(p));
    }

    function cardHTML(p){
      const minV = p.variants.reduce((m,v)=>Math.min(m,v.price), Infinity)
      return `
      <article class="card" data-id="${p.id}">
        <div class="card-head">
          ${p.badge?`<span class="badge">${p.badge}</span>`:''}
          <img src="${p.images.cover}" alt="${p.name}" data-main>
          <div class="price-tag">${formatIDR(minV)} <small>*OTR</small></div>
        </div>
        <div class="card-body">
          <div class="topline">
            <div>
              <h3>${p.name}</h3>
              <div class="variant">${p.variants.map(v=>`${v.name}: ${formatIDR(v.price)}`).join(' • ')}</div>
            </div>
            <label class="compare-ctl"><input type="checkbox" data-compare> Bandingkan</label>
          </div>

          <div class="tabs" role="tablist">
            <button class="tab active" data-tab="overview">Overview</button>
            <button class="tab" data-tab="exterior">Exterior</button>
            <button class="tab" data-tab="interior">Interior</button>
            <button class="tab" data-tab="specs">Spesifikasi</button>
          </div>

          <div class="panel" data-panel="overview">
            <div class="swatches">
              <small>Warna:</small>
              ${p.colors.map((c,i)=>`<button class="dot" title="${c.name}" style="background:${c.hex}" data-color="${i}"></button>`).join('')}
            </div>
            <div class="specs">
              ${p.specs.map(s=>`<div class="spec"><strong>${s[0]}:</strong> ${s[1]}</div>`).join('')}
            </div>
            <div class="actions">
              <a class="btn-sm primary" target="_blank" href="${p.brochure}">Download Brosur</a>
              <a class="btn-sm" href="https://wa.me/6285128041948" target="_blank">Test Drive</a>
            </div>
          </div>

          <div class="panel hidden" data-panel="exterior">${galleryHTML(p.images.exterior)}</div>
          <div class="panel hidden" data-panel="interior">${galleryHTML(p.images.interior)}</div>
          <div class="panel hidden" data-panel="specs">
            <div class="specs">
              ${p.specs.map(s=>`<div class="spec"><strong>${s[0]}:</strong> ${s[1]}</div>`).join('')}
              <div class="spec"><strong>Harga:</strong> ${p.variants.map(v=>`${v.name} ${formatIDR(v.price)}`).join(' | ')}</div>
              <div class="spec"><strong>Keterangan:</strong> Harga OTR Jadetabek • Dapat berubah • Pajak progresif ditanggung konsumen</div>
            </div>
          </div>
        </div>
      </article>`
    }

    function galleryHTML(arr){
      if(!arr || !arr.length) return '<em style="color:var(--muted)">Galeri segera hadir</em>'
      const first = arr[0]
      return `
        <div class="gallery" data-gallery>
          <img src="${first}" alt="preview" data-preview>
          <div class="thumbs">
            ${arr.map((src,i)=>`<img src="${src}" data-thumb="${i}" class="${i===0?'active':''}">`).join('')}
          </div>
        </div>`
    }

    function wireCard(p){
      const root = document.querySelector(`[data-id="${p.id}"]`)
      const tabs = root.querySelectorAll('.tab');
      const panels = root.querySelectorAll('.panel');
      tabs.forEach(tab=>{ tab.addEventListener('click',()=>{ tabs.forEach(t=>t.classList.remove('active')); tab.classList.add('active'); panels.forEach(pn=>pn.classList.add('hidden')); root.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.remove('hidden') }) })
      root.querySelectorAll('[data-gallery]').forEach(g=>{ const preview = g.querySelector('[data-preview]'); g.querySelectorAll('[data-thumb]').forEach(th=>{ th.addEventListener('click',()=>{ g.querySelectorAll('[data-thumb]').forEach(t=>t.classList.remove('active')); th.classList.add('active'); preview.src = th.src }); th.addEventListener('dblclick',()=>openLightbox(`<img src='${th.src}' style='max-width:92vw;max-height:86vh;border-radius:12px'/>`)) }); preview.addEventListener('click',()=>openLightbox(`<img src='${preview.src}' style='max-width:92vw;max-height:86vh;border-radius:12px'/>`)) })
      const cover = root.querySelector('[data-main]')
      root.querySelectorAll('[data-color]').forEach(btn=>{ btn.addEventListener('click',()=>{ root.querySelectorAll('[data-color]').forEach(b=>b.style.outline='none'); btn.style.outline = '2px solid var(--primary)'; cover.style.filter = 'saturate(1.05) contrast(1.02)'; cover.style.boxShadow = '0 0 0 3px rgba(211,0,0,.35)'; setTimeout(()=>{cover.style.boxShadow='none'},450) }) })
      const chk = root.querySelector('[data-compare]')
      chk.addEventListener('change',()=>{ if(chk.checked){ if(COMPARE.size>=3){ alert('Maksimum 3 model untuk dibandingkan.'); chk.checked=false; return } COMPARE.set(p.id,p) } else { COMPARE.delete(p.id) } renderDrawer() })
    }

    function openLightbox(html){ const lb=document.getElementById('lightbox'); const box=document.getElementById('lightbox-box'); box.innerHTML = html; lb.classList.add('open') }

    function renderDrawer(){ const drawer=document.getElementById('drawer'); const mini=document.getElementById('mini'); if(COMPARE.size===0){ drawer.style.display='none'; mini.innerHTML=''; return } drawer.style.display='block'; mini.innerHTML = Array.from(COMPARE.values()).map(p=>`<div class="mini-item">${p.name}<br><small>${formatIDR(p.price)}</small></div>`).join('') }

    function clearCompare(){ COMPARE.clear(); document.querySelectorAll('[data-compare]').forEach(c=>c.checked=false); renderDrawer(); }

    function openCompare(){ if(COMPARE.size<2){ alert('Pilih minimal 2 model.'); return } const items=Array.from(COMPARE.values()); const specRows=['Mesin','Hybrid','Baterai','Tenaga','Kursi','Fitur']; const html=`<h2 style='margin:0 0 8px'>Perbandingan Model</h2><div style='overflow:auto'><table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left;padding:10px;border-bottom:1px solid var(--border)'>Spesifikasi</th>${items.map(p=>`<th style='text-align:left;padding:10px;border-bottom:1px solid var(--border)'>${p.name}<br><small>${formatIDR(p.price)}</small></th>`).join('')}</tr>${specRows.map(key=>`<tr><td style='padding:10px;border-bottom:1px solid var(--border)'><strong>${key}</strong></td>${items.map(p=>`<td style='padding:10px;border-bottom:1px solid var(--border)'>${(p.specs.find(s=>s[0]===key)||['','-'])[1]||'-'}</td>`).join('')}</tr>`).join('')}</table></div>`; openLightbox(`<div>${html}</div>`); }

    // Initial render
    render();

    // ====== ACCORDION ======
    function toggleAcc(head){ const body=head.nextElementSibling; body.style.display = body.style.display==='block' ? 'none' : 'block'; }
    window.toggleAcc=toggleAcc;
    // =====================
// Horizontal Slider
// =====================
let currentIndex = 0;

function moveSlide(direction) {
  const sliderTrack = document.getElementById('sliderTrack');
  if (!sliderTrack) return; // jika slider tidak ada, keluar

  const slides = sliderTrack.querySelectorAll('.slide'); // scope hanya di slider ini
  const totalSlides = slides.length;

  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// =====================
// Vertical Sliders (Mobil & Sales)
// =====================
function initVerticalSlider(containerId, intervalTime, prevBtnId, nextBtnId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let index = 0;
  const totalSlides = container.children.length;

  // Auto play
  setInterval(() => {
    index = (index + 1) % totalSlides;
    container.style.transform = `translateY(-${index * 90}vh)`;
  }, intervalTime);

  // Manual controls (optional)
  if (prevBtnId && nextBtnId) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalSlides) % totalSlides;
        container.style.transform = `translateY(-${index * 90}vh)`;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalSlides;
        container.style.transform = `translateY(-${index * 90}vh)`;
      });
    }
  }
}

// Inisialisasi
initVerticalSlider('slider', 3000); // slider mobil

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // Scroll ke bawah -> sembunyikan
    header.classList.add("hide");
  } else {
    // Scroll ke atas -> tampilkan lagi
    header.classList.remove("hide");
  }
  
  lastScroll = currentScroll;
});

