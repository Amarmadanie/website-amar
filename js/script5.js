
  function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
}
    // Smooth scroll helper
    function scrollToSection(sel){
      const el=document.querySelector(sel); if(!el) return;
      el.scrollIntoView({behavior:'smooth',block:'start'});
    }
    // Modal info aftersales per produk
    document.querySelectorAll('.card').forEach(card=>{
      card.style.cursor='pointer';
      card.addEventListener('click', (ev)=>{
        if(ev.target.closest('a')) return;
        const model = card.getAttribute('data-model') || card.querySelector('h3')?.innerText || 'Detail Mobil';
        const price = card.querySelector('.price')?.innerText || '';
        const specs = card.querySelector('.specs')?.innerText || '';
        const feats = Array.from(card.querySelectorAll('.features li')).map(li=>li.innerText.replace(/[\n\r]+/g,' '));
        showDetailModal({model,price,specs,feats});
      });
    });
    function showDetailModal(data){
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.inset=0;overlay.style.background='rgba(0,0,0,0.6)';
      overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex=9999;
      const card = document.createElement('div');
      card.style.width='min(760px,95%)';card.style.maxHeight='90vh';card.style.overflow='auto';
      card.style.background='linear-gradient(180deg,#0b0b0b,#121214)';card.style.border='1px solid rgba(255,255,255,0.04)';card.style.borderRadius='12px';
      card.style.padding='18px';card.style.color='#e9ecef';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <h3 style="margin:0">${escapeHtml(data.model)}</h3>
          <button aria-label="close" id="modalClose" style="background:transparent;border:0;color:var(--muted);font-weight:800;cursor:pointer">✕</button>
        </div>
        <div style="color:var(--muted);margin-top:6px">${escapeHtml(data.price)} • ${escapeHtml(data.specs)}</div>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.03);margin:12px 0">
        <div>
          <strong>Penjelasan Aftersales untuk Produk Ini:</strong>
          <ul style="margin-top:8px;padding-left:18px;color:#dfe6e8">
            ${data.feats.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn ghost" id="modalClose2">Tutup</button>
        </div>
      `;
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      overlay.querySelectorAll('#modalClose, #modalClose2').forEach(btn=>btn.addEventListener('click', ()=>overlay.remove()));
    }
    function escapeHtml(s){
      return (s||'').toString().replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m] });
    }
    let lastScroll = 0;
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      let currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }
      lastScroll = currentScroll;
    });
