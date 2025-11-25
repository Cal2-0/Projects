(function(){
  const data = window.FINTERA_DATA;
  const fsModal = document.getElementById('fs-modal');
  const fsTitle = document.getElementById('fs-title');
  const fsBody = document.getElementById('fs-body');
  const fsClose = document.getElementById('fs-close');
  const fsBackdrop = fsModal.querySelector('.fs-backdrop');

  const openModal = (title) => {
    fsTitle.textContent = title || 'Loading...';
    fsBody.innerHTML = '<div class="spinner"></div>';
    fsModal.style.display = 'block';
  };

  const closeModal = () => { fsModal.style.display = 'none'; };
  fsClose.addEventListener('click', closeModal);
  fsBackdrop.addEventListener('click', closeModal);

  const h3 = (text) => `<h3 style="margin:.5rem 0 0.5rem;color:#8ef8d2;">${text}</h3>`;
  const p = (text) => `<p style="opacity:.9;">${text}</p>`;

  const renderTriple = (lookFor, avoid, start) => `
    <div class="triple">
      <div class="pill">${h3('What to Look For')}${p(lookFor.join(' • '))}</div>
      <div class="pill">${h3('What to Avoid')}${p(avoid.join(' • '))}</div>
      <div class="pill">${h3('How to Get Started')}${p(start.join(' • '))}</div>
    </div>`;

  const renderScroller = (items, isCards) => {
    if (!items || !items.length) return '';
    const html = items.map(item => {
      if (isCards) {
        return `<div class="card-mini"><div style="font-weight:700;">${item.bank}</div><div style="opacity:.9;">${item.feature}</div><div style="opacity:.7; font-size:.9rem;">${item.user}</div></div>`;
      }
      return `<div class="card-mini"><div style="font-weight:700;">${item.name}</div><div style="opacity:.9;">${(item.items||[]).join(', ')}</div></div>`;
    }).join('');
    return `${h3('Real-World Comparison')}<div class="h-scroll">${html}</div>`;
  };

  const renderAISuggestions = () => `
    <div class="pill" style="border:1px dashed rgba(0,255,148,.35)">
      <div style="display:flex;align-items:center;gap:.5rem;color:#00ff94;font-weight:700;">🤖 Fin's Suggestions</div>
      <ul style="margin-top:.5rem;opacity:.95;">
        <li>Set a monthly reminder to review goals.</li>
        <li>Automate small investments to build habits.</li>
        <li>Keep an emergency fund worth 3-6 months of expenses.</li>
      </ul>
    </div>`;

  const renderChartCanvas = (id='fin-chart') => `<canvas id="${id}" height="140"></canvas>`;

  const renderEMICalc = () => `
    <div class="pill">
      ${h3('Interactive Calculator')}
      <label>Amount: <input id="emi-amt" type="range" min="50000" max="3000000" step="10000" value="500000"/></label>
      <label> Rate (%): <input id="emi-rate" type="range" min="5" max="18" step="0.1" value="10"/></label>
      <label> Tenure (yrs): <input id="emi-yrs" type="range" min="1" max="30" step="1" value="10"/></label>
      <div id="emi-out" style="margin-top:.5rem; font-weight:700;"></div>
    </div>`;

  const computeEMI = (P, r, nYrs) => {
    const i = r/1200; const n = nYrs*12; const e = P*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1); return Math.round(e);
  };

  const renderSIPCalc = () => `
    <div class="pill">
      ${h3('Interactive Calculator')}
      <label>Monthly: <input id="sip-m" type="range" min="500" max="100000" step="500" value="5000"/></label>
      <label> Return (%): <input id="sip-r" type="range" min="4" max="20" step="0.5" value="12"/></label>
      <label> Years: <input id="sip-y" type="range" min="1" max="40" step="1" value="15"/></label>
      <div id="sip-out" style="margin-top:.5rem; font-weight:700;"></div>
    </div>`;

  const sipFutureValue = (m, r, y) => {
    const i = r/1200; const n = y*12; return Math.round(m*((Math.pow(1+i,n)-1)/i)*(1+i));
  };

  const setChart = (type) => {
    const ctx = document.getElementById('fin-chart');
    if (!ctx) return;
    const chartData = {
      type: type || 'bar',
      data: {
        labels: ['Year 1','Year 2','Year 3','Year 4','Year 5'],
        datasets: [{ label: 'Value', data: [1,2,3,4,5].map(v=>v*10000), backgroundColor: '#00d4aa' }]
      },
      options: { plugins: { legend: { labels: { color: '#fff' } } }, scales: { x: { ticks:{ color:'#8aa0b8' } }, y: { ticks:{ color:'#8aa0b8' } } } }
    };
    // eslint-disable-next-line no-undef
    return new Chart(ctx, chartData);
  };

  const renderToolModal = (key) => {
    const t = data.tools[key];
    if (!t) return;
    openModal(t.title);
    setTimeout(() => {
      fsBody.innerHTML = `
        <div class="pill">${h3(t.title)}${p(t.intro)}</div>
        ${renderTriple(t.lookFor, t.avoid, t.start)}
        ${renderScroller(t.scroller, key==='cards')}
        <div class="pill">${h3('Visualization')}${renderChartCanvas()}</div>
        ${(key==='emi')?renderEMICalc(): (key==='sip')?renderSIPCalc(): ''}
        ${renderAISuggestions()}
      `;
      setChart(t.chart?.type);

      if (key==='emi') {
        const amt = document.getElementById('emi-amt');
        const rate = document.getElementById('emi-rate');
        const yrs = document.getElementById('emi-yrs');
        const out = document.getElementById('emi-out');
        const update = () => { out.textContent = `EMI: ₹${computeEMI(+amt.value, +rate.value, +yrs.value).toLocaleString('en-IN')}`; };
        [amt,rate,yrs].forEach(el=>el.addEventListener('input', update));
        update();
      }

      if (key==='sip') {
        const m = document.getElementById('sip-m');
        const r = document.getElementById('sip-r');
        const y = document.getElementById('sip-y');
        const out = document.getElementById('sip-out');
        const update = () => { out.textContent = `Future Value: ₹${sipFutureValue(+m.value, +r.value, +y.value).toLocaleString('en-IN')}`; };
        [m,r,y].forEach(el=>el.addEventListener('input', update));
        update();
      }
    }, 500);
  };

  // Attach to tool cards
  document.querySelectorAll('[data-tool]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-tool');
      renderToolModal(key);
    });
  });

  // Stocks modal renderer (called by stocks.js)
  window.FINTERA_OPEN_STOCKS = () => {
    openModal('Stock Market Intelligence');
  };
})();
