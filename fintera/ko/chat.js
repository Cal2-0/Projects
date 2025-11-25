(function(){
  const CHAT_API_URL = window.FINTERA_CHAT_API || 'https://api.example.com/chat';
  const toggle = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  let hoverTimer = null;
  let greetedOnce = false;

  const appendMsgEl = (role) => {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  };

  const typeText = async (el, text, speed=18) => {
    el.textContent = '';
    for (let i=0;i<text.length;i++){
      el.textContent += text[i];
      messages.scrollTop = messages.scrollHeight;
      await new Promise(r=>setTimeout(r, speed));
    }
  };

  const open = () => { panel.style.display = 'flex'; input.focus(); };
  const close = () => { panel.style.display = 'none'; };

  // Hover to open (>300ms)
  toggle.addEventListener('mouseenter', () => { hoverTimer = setTimeout(() => open(), 300); });
  toggle.addEventListener('mouseleave', () => { if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; } });

  // Close via X and outside click
  closeBtn.addEventListener('click', close);
  document.addEventListener('click', (e) => { if (!panel.contains(e.target) && e.target !== toggle && panel.style.display === 'flex') close(); });

  const greetingCheck = (t) => ['hi','hello','hey'].includes(t.trim().toLowerCase());

  const send = async () => {
    const text = input.value.trim();
    if (!text) return;
    input.value='';
    const userEl = appendMsgEl('user');
    userEl.textContent = text;

    if (!greetedOnce && greetingCheck(text)) {
      greetedOnce = true;
      const botEl = appendMsgEl('bot');
      await typeText(botEl, "Hi! I'm Fin, your personal financial AI assistant. How can I help you today?", 14);
      return;
    }

    greetedOnce = true;
    const botEl = appendMsgEl('bot');
    await typeText(botEl, 'Thinking...', 24);

    try {
      const res = await fetch(CHAT_API_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) });
      const data = await res.json().catch(()=>({ reply: 'Sorry, I could not get a response.' }));
      botEl.textContent = '';
      await typeText(botEl, data && data.reply ? data.reply : 'Sorry, I could not get a response.');
    } catch (e) {
      botEl.textContent = '';
      await typeText(botEl, 'Network error. Please try again.');
    }
  };

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });

  // Link hooks from page: open stocks or chat
  const chatOpenLink = document.getElementById('open-chat');
  if (chatOpenLink) chatOpenLink.addEventListener('click', (e)=>{ e.preventDefault(); open(); });
})();
