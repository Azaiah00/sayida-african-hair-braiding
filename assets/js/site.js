/* Sayida African Hair Braiding — site behaviour (vanilla JS, no libraries) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- header + mobile menu ---------------- */
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-menu-toggle]');
  var mnav = document.querySelector('[data-mobile-nav]');
  function setMenu(open) {
    if (!toggle || !mnav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    mnav.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    if (open) { var f = mnav.querySelector('a'); if (f) f.focus(); }
  }
  if (toggle && mnav) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) setMenu(false); });
  }

  /* ---------------- reveal on scroll ---------------- */
  var revealEls = [].slice.call(document.querySelectorAll('[data-reveal], .words-list li'));
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- open-now (America/New_York, Square hours) ---------------- */
  var HOURS = { 0: [840, 1320], 1: [360, 1320], 2: [360, 1320], 3: [360, 1320], 4: [360, 1320], 5: [360, 1320], 6: [360, 1320] };
  var DAYN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function clock(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60;
    var suf = h < 12 ? 'AM' : 'PM';
    var h12 = h % 12 || 12;
    return h12 + (m ? ':' + (m < 10 ? '0' : '') + m : '') + ' ' + suf;
  }
  function nyNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var h = parseInt(o.hour, 10) % 24;
      return { day: WD[o.weekday], mins: h * 60 + parseInt(o.minute, 10) };
    } catch (e) { return null; }
  }
  function status(now) {
    var t = HOURS[now.day];
    if (now.mins >= t[0] && now.mins < t[1]) {
      var left = t[1] - now.mins;
      return { open: true, html: '<b>Open now</b> &middot; ' + (left <= 60 ? 'closes soon, at ' : 'until ') + clock(t[1]) };
    }
    if (now.mins < t[0]) return { open: false, html: '<b>Closed now</b> &middot; opens today at ' + clock(t[0]) };
    var nd = (now.day + 1) % 7;
    return { open: false, html: '<b>Closed now</b> &middot; opens tomorrow' + (nd === 0 ? ' (Sunday)' : '') + ' at ' + clock(HOURS[nd][0]) };
  }
  function paintOpen() {
    var now = nyNow();
    if (!now) return;
    var s = status(now);
    [].forEach.call(document.querySelectorAll('[data-open-badge]'), function (b) {
      b.classList.toggle('is-open', s.open);
      b.classList.toggle('is-closed', !s.open);
      var txt = b.querySelector('.txt');
      if (txt) txt.innerHTML = s.html;
    });
    [].forEach.call(document.querySelectorAll('.week-row'), function (r) {
      var today = parseInt(r.getAttribute('data-day'), 10) === now.day;
      r.classList.toggle('is-today', today);
      var nm = r.querySelector('.now');
      if (nm) nm.style.left = (now.mins / 1440 * 100).toFixed(3) + '%';
    });
    [].forEach.call(document.querySelectorAll('.hours-table tr[data-day]'), function (r) {
      r.classList.toggle('is-today', parseInt(r.getAttribute('data-day'), 10) === now.day);
    });
  }
  paintOpen();
  setInterval(paintOpen, 60000);

  /* ---------------- woven bands + plait (scroll-driven) ---------------- */
  var weaves = [].slice.call(document.querySelectorAll('[data-weave]'));
  var plaits = [].slice.call(document.querySelectorAll('svg[data-plait]')).map(buildPlait).filter(Boolean);

  function buildPlait(svg) {
    var NS = 'http://www.w3.org/2000/svg';
    var g = svg.querySelector('.plait-strands');
    if (!g) return null;
    var W = 590, CY = 40, S = 24, A = 15, LAM = 104, K = 2 * Math.PI / LAM, DX = 6;
    var chunks = [];
    for (var i = 0; i < 3; i++) {
      var ph = i * 2 * Math.PI / 3;
      for (var x = 0; x < W; x += DX) {
        var x1 = Math.min(x + DX, W);
        chunks.push({ i: i, ph: ph, x0: x, x1: x1, z: Math.cos(K * (x + x1) / 2 + ph) });
      }
    }
    chunks.sort(function (a, b) { return a.z - b.z; });
    var frag = document.createDocumentFragment();
    chunks.forEach(function (c) {
      c.o = document.createElementNS(NS, 'path'); c.o.setAttribute('class', 'ol');
      c.p = document.createElementNS(NS, 'path'); c.p.setAttribute('class', 'chunk c' + c.i);
      frag.appendChild(c.o); frag.appendChild(c.p);
    });
    while (g.firstChild) g.removeChild(g.firstChild);
    g.appendChild(frag);
    function smooth(t) { t = t < 0 ? 0 : t > 1 ? 1 : t; return t * t * (3 - 2 * t); }
    function yAt(i, ph, x, p) {
      var w = 0.4;
      var b = smooth((p * (1 + w) - (1 - x / W)) / w);
      b = Math.max(b, smooth((x - 500) / 86));
      return CY + (1 - b) * S * (i - 1) + b * A * Math.sin(K * x + ph);
    }
    var last = -1;
    var isHero = !!svg.closest('.hero, .page-hero');
    return {
      svg: svg, isHero: isHero,
      draw: function (p) {
        if (Math.abs(p - last) < 0.002) return;
        last = p;
        for (var n = 0; n < chunks.length; n++) {
          var c = chunks[n], xm = (c.x0 + c.x1) / 2;
          var d = 'M' + c.x0 + ' ' + yAt(c.i, c.ph, c.x0, p).toFixed(2) + 'L' + xm + ' ' + yAt(c.i, c.ph, xm, p).toFixed(2) + 'L' + c.x1 + ' ' + yAt(c.i, c.ph, c.x1, p).toFixed(2);
          c.o.setAttribute('d', d);
          c.p.setAttribute('d', d);
        }
      }
    };
  }

  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.pageYOffset || doc.scrollTop || 0;
    var vh = window.innerHeight || 800;
    weaves.forEach(function (w) {
      var r = w.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      var a = w.querySelector('.weave-row--a .weave-track'), b = w.querySelector('.weave-row--b .weave-track');
      var off = y * 0.35;
      if (a) a.style.transform = 'translate3d(' + (-(off % 192)).toFixed(1) + 'px,0,0)';
      if (b) b.style.transform = 'translate3d(' + (-(160 - (off % 160))).toFixed(1) + 'px,0,0)';
    });
    plaits.forEach(function (pl) {
      var p;
      if (reduce) p = 1;
      else if (pl.isHero) p = 0.3 + y / (vh * 0.5);
      else { var r = pl.svg.getBoundingClientRect(); p = Math.max(pl.max || 0, (vh * 0.95 - r.top) / (vh * 0.5)); pl.max = Math.min(1, p); }
      pl.draw(Math.max(0, Math.min(1, p)));
    });
  }
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', (window.pageYOffset || 0) > 8);
    if (!ticking) { ticking = true; window.requestAnimationFrame(frame); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();
  onScroll();

  /* ---------------- style picker ---------------- */
  [].forEach.call(document.querySelectorAll('[data-picker]'), function (root, idx) {
    var dataEl = root.querySelector('[data-menu]');
    if (!dataEl) return;
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return; }
    var styles = {};
    data.styles.forEach(function (s) { styles[s.id] = s; });
    var sizesEl = root.querySelector('[data-sizes]');
    var addonEl = root.querySelector('[data-addon]');
    var addonIn = root.querySelector('[data-addon-input]');
    var R = {
      name: root.querySelector('[data-r-name]'), price: root.querySelector('[data-r-price]'), time: root.querySelector('[data-r-time]'),
      bar: root.querySelector('[data-r-bar]'), note: root.querySelector('[data-r-note]'), booktxt: root.querySelector('[data-r-booktxt]')
    };
    var state = { style: null, label: null };
    var gname = 'pk-size-' + idx;

    function fmt(m) {
      var h = Math.floor(m / 60), mm = m % 60;
      if (h && mm) return h + ' h ' + mm + ' min';
      if (h) return h + ' h';
      return mm + ' min';
    }
    function renderSizes() {
      var s = styles[state.style];
      var labels = s.variants.map(function (v) { return v.label; });
      if (labels.indexOf(state.label) === -1) state.label = labels[0];
      var html = '';
      s.variants.forEach(function (v) {
        var sub = s.consult ? 'Free consult' : '$' + v.price;
        html += '<label class="size"><input type="radio" name="' + gname + '" value="' + v.label + '"' + (v.label === state.label ? ' checked' : '') + '><span><b>' + v.label + '</b><small>' + sub + '</small></span></label>';
      });
      if (s.variants.length === 1 && !s.consult) html += '<p class="size-consult">' + s.name + ' come in one size on Square.</p>';
      sizesEl.innerHTML = html;
      addonEl.hidden = !s.addon;
      if (!s.addon) addonIn.checked = false;
    }
    function render() {
      var s = styles[state.style];
      var v = s.variants.filter(function (x) { return x.label === state.label; })[0] || s.variants[0];
      var add = s.addon && addonIn.checked;
      var name;
      if (s.id === 'locs') name = v.label;
      else name = s.name + (s.variants.length > 1 || v.label !== 'Regular' ? ', ' + v.label : '');
      if (add) name += ', knotless';
      R.name.textContent = name;
      var note = '';
      if (s.consult) {
        R.price.textContent = 'Quote at your free consultation';
        R.price.classList.add('is-text');
        R.time.textContent = '30 min consult';
        R.time.classList.add('is-text');
        R.bar.style.transform = 'scaleX(' + (30 / 540).toFixed(3) + ')';
        note = 'Book the free 30-minute consultation with Sayida on Square and add ' + (s.id === 'locs' ? v.label.toLowerCase() : 'the style you want') + ' in the appointment note. Your quote and chair time are set there.';
        R.booktxt.textContent = 'Book a free consultation';
      } else {
        R.price.textContent = '$' + (v.price + (add ? 30 : 0));
        R.price.classList.remove('is-text');
        R.booktxt.textContent = 'Book this on Square';
        if (v.mins == null) {
          R.time.textContent = 'Confirmed at booking';
          R.time.classList.add('is-text');
          R.bar.style.transform = 'scaleX(0)';
          note = 'Square doesn’t list a reliable time for this size yet. Ask when you book.';
        } else {
          var m = v.mins + (add ? 30 : 0);
          R.time.textContent = fmt(m);
          R.time.classList.remove('is-text');
          R.bar.style.transform = 'scaleX(' + Math.min(1, m / 540).toFixed(3) + ')';
          note = 'A 6 AM start (Mon–Sat) finishes around ' + clock(360 + m) + '.';
          if (840 + m <= 1320) note += ' A 2 PM Sunday start finishes around ' + clock(840 + m) + '.';
        }
        if (add) note = 'Includes the + Knotless add-on: $' + v.price + ' + $30, and about 30 min more. ' + note;
        if (v.note) note += ' Square note: “' + v.note + '.”';
        if (s.desc) note += ' Square lists these as “' + s.desc + '.”';
      }
      R.note.textContent = note;
    }
    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'pk-style') { state.style = t.value; renderSizes(); render(); }
      else if (t.name === gname) { state.label = t.value; render(); }
      else if (t === addonIn) { render(); }
    });
    // unique radio group name per picker
    [].forEach.call(root.querySelectorAll('input[name="pk-style"]'), function (r) { if (r.checked) state.style = r.value; });
    if (!state.style) state.style = data.styles[0].id;
    renderSizes();
    render();
  });

  /* ---------------- Netlify form ---------------- */
  var form = document.querySelector('[data-form]');
  if (form) {
    var ok = form.querySelector('[data-form-ok]');
    function setErr(id, field, msg) {
      var el = document.getElementById(id);
      var wrap = field.closest('.field');
      if (el) el.textContent = msg || '';
      if (wrap) wrap.classList.toggle('has-error', !!msg);
      if (msg) { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', id); }
      else { field.removeAttribute('aria-invalid'); }
      return !msg;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = form.elements.name, p = form.elements.phone, em = form.elements.email, m = form.elements.message;
      var good = true;
      good = setErr('e-name', n, n.value.trim() ? '' : 'Please enter your name.') && good;
      var digits = p.value.replace(/\D/g, '');
      good = setErr('e-phone', p, digits.length >= 10 ? '' : 'Please enter a phone number with area code.') && good;
      good = setErr('e-email', em, !em.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value) ? '' : 'Please check the email address.') && good;
      good = setErr('e-msg', m, m.value.trim() ? '' : 'Please type your question.') && good;
      if (!good) { var f = form.querySelector('[aria-invalid="true"]'); if (f) f.focus(); return; }
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (r) { if (!r.ok) throw new Error(r.status); ok.hidden = false; form.querySelector('button[type="submit"]').hidden = true; ok.focus(); })
        .catch(function () {
          ok.hidden = false;
          ok.innerHTML = '<h3>That didn’t send</h3><p>Please call or text <a href="tel:+13363373257">(336) 337-3257</a>, or book on Square.</p>';
          ok.focus();
        });
    });
  }
})();
