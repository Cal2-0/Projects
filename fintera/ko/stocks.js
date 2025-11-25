(function(){
  const data = window.FINTERA_DATA.stocks;
  const fsModal = document.getElementById('fs-modal');
  const fsTitle = document.getElementById('fs-title');
  const fsBody = document.getElementById('fs-body');

  const rnd = (min, max) => Math.random()*(max-min)+min;
  const jitter = (v, pct=0.5) => v*(1 + (Math.random()*2-1)*pct/100);

  const render = () => {
    fsTitle.textContent = 'Stock Market Intelligence';
    fsBody.innerHTML = `
      <div class="pill" style="overflow:hidden">
        <div id="ticker" style="display:flex;gap:1rem;white-space:nowrap;animation: ticker 18s linear infinite;"></div>
      </div>
      <style>@keyframes ticker { 0%{ transform: translateX(100%);} 100%{ transform: translateX(-100%);} }</style>
      <div class="pill" style="margin-top:1rem;display:grid;grid-template-columns:2fr 1fr;gap:1rem;">
        <div>
          <h3 style="color:#8ef8d2;margin:.2rem 0;">Watchlist</h3>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="color:#8aa0b8; text-align:left;">
                <th style="padding:.4rem .2rem;">Symbol</th>
                <th style="padding:.4rem .2rem;">Price</th>
                <th style="padding:.4rem .2rem;">Change</th>
              </tr>
            </thead>
            <tbody id="watchlist"></tbody>
          </table>
        </div>
        <div>
          <h3 style="color:#8ef8d2;margin:.2rem 0;">Fin's AI Market Analysis</h3>
          <ul id="insights" style="opacity:.95;"></ul>
        </div>
      </div>
    `;

    const ticker = document.getElementById('ticker');
    ticker.innerHTML = data.indices.map(ix => {
      const color = Math.random()>0.5 ? '#00ff94' : '#ff6b6b';
      return `<span style="margin-right:2rem;">${ix.symbol}: <span style="color:${color}">₹${ix.price.toLocaleString('en-IN')}</span></span>`;
    }).join('');

    const tbody = document.getElementById('watchlist');
    const rows = data.watchlist.map(s => `<tr><td style="padding:.4rem .2rem;">${s.symbol}</td><td style="padding:.4rem .2rem;">₹<span data-sym="${s.symbol}" class="wl-price">${s.price.toFixed(2)}</span></td><td style="padding:.4rem .2rem;"><span data-symc="${s.symbol}" class="wl-chg" style="color:${s.change>=0?'#00ff94':'#ff6b6b'};">${s.change.toFixed(2)}%</span></td></tr>`).join('');
    tbody.innerHTML = rows;

    const ins = document.getElementById('insights');
    ins.innerHTML = data.insights.map(t=>`<li>${t}</li>`).join('');

    setInterval(() => {
      data.indices.forEach(ix => { ix.price = Math.round(jitter(ix.price, 0.3)); });
      ticker.innerHTML = data.indices.map(ix => {
        const color = Math.random()>0.5 ? '#00ff94' : '#ff6b6b';
        return `<span style="margin-right:2rem;">${ix.symbol}: <span style="color:${color}">₹${ix.price.toLocaleString('en-IN')}</span></span>`;
      }).join('');

      data.watchlist.forEach(s => { s.price = (+s.price + rnd(-5,5)); s.change = rnd(-1,1); });
      data.watchlist.forEach(s => {
        const pEl = document.querySelector(`.wl-price[data-sym="${s.symbol}"]`);
        const cEl = document.querySelector(`.wl-chg[data-symc="${s.symbol}"]`);
        if (pEl) pEl.textContent = s.price.toFixed(2);
        if (cEl) { cEl.textContent = `${s.change.toFixed(2)}%`; cEl.style.color = s.change>=0?'#00ff94':'#ff6b6b'; }
      });
    }, 3500);
  };

  const openStocks = () => {
    const modal = document.getElementById('fs-modal');
    const body = document.getElementById('fs-body');
    const title = document.getElementById('fs-title');
    modal.style.display = 'block';
    title.textContent = 'Stock Market Intelligence';
    body.innerHTML = '<div class="spinner"></div>';
    setTimeout(render, 500);
  };

  const stocksCTA = document.getElementById('open-stocks');
  if (stocksCTA) stocksCTA.addEventListener('click', (e)=>{ e.preventDefault(); openStocks(); });

  // Keep support for clicking section area (optional)
  const stocksSection = document.querySelector('#stocks');
  if (stocksSection) {
    stocksSection.addEventListener('click', (e) => {
      if (e.target && (e.target.id === 'open-stocks' || e.target.closest('#open-stocks'))) return;
      // no-op to avoid accidental opens by clicking background
    });
  }
})();
