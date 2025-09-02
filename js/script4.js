    // Data OTR semua unit lengkap
    const mobilData = {
      "Tiggo Cross Comfort": 259500000,
      "Tiggo Cross Premium": 289500000,
      "Tiggo Cross Sport": 299900000,
      "Tiggo Cross CSH Premium": 319800000,
      "Tiggo Cross Hybrid": 319800000,
      "Tiggo 8 Comfort": 357500000,
      "Tiggo 8 Premium": 397500000,
      "Tiggo 8 CSH": 509900000,
      "Tiggo 8 Promax FWD": 578500000,
      "Tiggo 9 CSH": 719900000,
      "J6 RWD": 505500000,
      "J6 IWD": 565500000,
      "Chery E5 Pure": 369900000,
      "Chery E5": 399900000,
      "Chery C5 Z": 319900000,
      "Chery C5 RZ": 349900000,
      "Chery C5 RS": 354900000
    };

    // Rate brosur Maybank
    const rates = {11:3.18, 23:3.38, 35:3.48, 47:4.08, 59:4.88};

    // Isi dropdown
    const unitSelect = document.getElementById('unit');
    for(const [nama,harga] of Object.entries(mobilData)){
      const opt = document.createElement('option');
      opt.value = harga;
      opt.textContent = `${nama} - Rp ${harga.toLocaleString("id-ID")}`;
      unitSelect.appendChild(opt);
    }

    function formatRupiah(angka){
      return "Rp " + angka.toLocaleString("id-ID");
    }

    function hitungKredit(){
      const harga = parseInt(unitSelect.value);
      const dpPersen = parseFloat(document.getElementById('dp').value);
      if(isNaN(dpPersen) || dpPersen <= 0 || dpPersen >= 100){
        alert("Masukkan DP dalam persen (1-99).");
        return;
      }
      const dpNominal = harga * dpPersen / 100;
      const pinjaman = harga - dpNominal;

      let html = `<p>Harga Unit: <b>${formatRupiah(harga)}</b></p>`;
      html += `<p>DP ${dpPersen}%: <b>${formatRupiah(dpNominal)}</b></p>`;
      html += `<p>Pinjaman: <b>${formatRupiah(pinjaman)}</b></p>`;
      html += `<h3>Simulasi Angsuran:</h3>`;
      html += `<table><tr><th>Tenor</th><th>Rate</th><th>Angsuran / Bulan</th></tr>`;

      for(const tenor in rates){
        const rate = rates[tenor];
        const total = pinjaman * (1 + (rate/100)); 
        const cicilan = total / tenor;
        html += `<tr><td>${tenor} bulan</td><td>${rate}%</td><td>${formatRupiah(Math.round(cicilan))}</td></tr>`;
      }
      html += `</table>`;
      document.getElementById('result').innerHTML = html;
    }

    // Tombol hitung
    document.getElementById('btnHitung').addEventListener('click', hitungKredit);