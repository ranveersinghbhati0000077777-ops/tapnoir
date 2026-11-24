/* TAPNOIR — site interactions (no dependencies) */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Mobile menu ---------- */
  var header = $('.site-header');
  var menuBtn = $('.menu-btn');
  if (header && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Homepage: finish switcher ---------- */
  var FINISHES = {
    noir: { label: 'Noir', num: '01', cls: 'f-black', desc: 'Matte black, deep and quiet. The card for those who never need to raise their voice to be noticed.' },
    blanc: { label: 'Blanc', num: '02', cls: 'f-white', desc: 'Pure, luminous white. Clean confidence for those who want to be seen in the best light.' }
  };
  var finishChips = $$('[data-finish-chip]');
  if (finishChips.length) {
    var fCard = $('[data-finish-card]');
    var fNum = $('[data-finish-num]');
    var fLabel = $('[data-finish-label]');
    var fDesc = $('[data-finish-desc]');
    var fLink = $('[data-finish-link]');
    finishChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.getAttribute('data-finish-chip');
        var f = FINISHES[key];
        finishChips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        fCard.classList.remove('f-black', 'f-white');
        fCard.classList.add(f.cls);
        fNum.textContent = f.num + ' / 02';
        fLabel.textContent = f.label;
        fDesc.textContent = f.desc;
        if (fLink) fLink.href = 'product.html?finish=' + key;
      });
    });
  }

  /* ---------- Homepage: tap demo ---------- */
  var tapBtn = $('[data-tap-toggle]');
  if (tapBtn) {
    var demoCard = $('.demo-card');
    var idle = $('[data-phone-idle]');
    var prof = $('[data-phone-profile]');
    var ring = $('.ring');
    var tapLabel = $('[data-tap-label]');
    var tapped = false;
    tapBtn.addEventListener('click', function () {
      tapped = !tapped;
      demoCard.classList.toggle('tapped', tapped);
      idle.hidden = tapped;
      prof.hidden = !tapped;
      ring.hidden = !tapped;
      tapLabel.textContent = tapped ? 'Reset' : 'Tap the card';
      tapBtn.setAttribute('aria-pressed', tapped ? 'true' : 'false');
    });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqBtns = $$('.faq-btn');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      faqBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        $('.faq-icon', b).textContent = '+';
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      });
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        $('.faq-icon', btn).textContent = '−';
        document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  /* ---------- Product: personaliser ---------- */
  var flip = $('[data-flip]');
  if (flip) {
    var faces = $$('.face', flip);
    var swatches = $$('[data-swatch]');
    var finishNames = $$('[data-finish-name]');
    var nameIn = $('#nm');
    var titleIn = $('#tt');
    var nameOut = $('[data-name-out]');
    var titleOut = $('[data-title-out]');
    var sideLabel = $('[data-side-label]');
    var NAMES = { noir: 'Noir — Matte Black', blanc: 'Blanc — White' };

    var setFinish = function (key) {
      if (!NAMES[key]) key = 'noir';
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', s.getAttribute('data-swatch') === key ? 'true' : 'false'); });
      faces.forEach(function (f) {
        f.classList.remove('f-black', 'f-white');
        f.classList.add(key === 'blanc' ? 'f-white' : 'f-black');
      });
      finishNames.forEach(function (el) { el.textContent = NAMES[key]; });
    };
    swatches.forEach(function (s) { s.addEventListener('click', function () { setFinish(s.getAttribute('data-swatch')); }); });
    var q = new URLSearchParams(location.search);
    setFinish((q.get('finish') || 'noir').toLowerCase());

    nameIn.addEventListener('input', function () { nameOut.textContent = nameIn.value.trim() || 'Your Name'; });
    titleIn.addEventListener('input', function () { titleOut.textContent = titleIn.value.trim() || 'Founder · Company'; });

    var letterBtns = $$('[data-lettering]');
    letterBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var serif = b.getAttribute('data-lettering') === 'serif';
        letterBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        nameOut.className = serif ? 'n-serif' : 'n-sans';
      });
    });

    var sideBtns = $$('[data-side]');
    sideBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var back = b.getAttribute('data-side') === 'back';
        sideBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        flip.classList.toggle('back', back);
        sideLabel.textContent = back ? 'Back' : 'Front';
      });
    });

    /* carry the chosen design into the enquiry form */
    var enquire = $('[data-enquire-design]');
    if (enquire) {
      enquire.addEventListener('click', function (e) {
        e.preventDefault();
        var p = new URLSearchParams();
        var active = $('[data-swatch][aria-pressed="true"]');
        p.set('finish', active ? active.getAttribute('data-swatch') : 'noir');
        if (nameIn.value.trim()) p.set('name', nameIn.value.trim());
        if (titleIn.value.trim()) p.set('title', titleIn.value.trim());
        var lett = $('[data-lettering][aria-pressed="true"]');
        if (lett) p.set('lettering', lett.getAttribute('data-lettering'));
        location.href = 'contact.html?' + p.toString();
      });
    }
  }

  /* ---------- Contact: enquiry form ---------- */
  var form = $('#enquiry');
  if (form) {
    var interestBtns = $$('[data-interest]');
    var interestIn = $('#interest');
    var pick = function (val) {
      interestBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-interest') === val ? 'true' : 'false'); });
      interestIn.value = val;
    };
    interestBtns.forEach(function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-interest')); }); });

    var params = new URLSearchParams(location.search);
    if (params.get('interest') === 'business') pick('Business');
    if (params.get('interest') === 'unsure') pick('Not sure yet');
    var msg = $('#cm');
    if (params.get('finish')) {
      var parts = ['Design: ' + (params.get('finish') === 'blanc' ? 'Blanc' : 'Noir')];
      if (params.get('lettering')) parts.push((params.get('lettering') === 'sans' ? 'Modern sans' : 'Editorial serif') + ' lettering');
      if (params.get('name')) parts.push('Name on card: ' + params.get('name'));
      if (params.get('title')) parts.push('Title: ' + params.get('title'));
      msg.value = parts.join('\n') + '\n\n';
    }

    var done = $('[data-sent]');
    var thanks = $('[data-thanks-name]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = Object.fromEntries(new FormData(form).entries());
      /* Hook up your backend here (Formspree, Netlify Forms, your own API…).
         Until then, the enquiry is not sent anywhere. */
      if (window.TAPNOIR_SUBMIT) window.TAPNOIR_SUBMIT(data);
      thanks.textContent = ((data.name || 'friend').trim().split(/\s+/)[0]) || 'friend';
      form.hidden = true;
      done.hidden = false;
      done.focus();
    });
    $('[data-reset]').addEventListener('click', function () {
      form.reset(); pick('Personal');
      done.hidden = true; form.hidden = false;
      $('#cn').focus();
    });
  }

  /* ---------- Profile: save + tabs + share ---------- */
  var saveBtn = $('[data-save]');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      var saved = saveBtn.classList.toggle('saved');
      saveBtn.textContent = saved ? 'Saved to contacts ✓' : 'Save contact';
    });
  }
  var tabs = $$('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    });
    t.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(t);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        n.focus(); n.click();
      }
    });
  });
  var share = $('[data-share]');
  if (share) {
    var toast = $('.toast');
    share.addEventListener('click', function () {
      if (navigator.share) { navigator.share({ title: document.title, url: location.href }).catch(function () {}); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          toast.classList.add('show');
          setTimeout(function () { toast.classList.remove('show'); }, 2200);
        });
      }
    });
  }
})();
