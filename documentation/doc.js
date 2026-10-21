(function () {
  var root = document.documentElement;
  try { var t = localStorage.getItem('doc-theme'); if (t) root.setAttribute('data-theme', t); } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var n = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', n);
    try { localStorage.setItem('doc-theme', n); } catch (e) {}
  });
  var sidebar = document.getElementById('sidebar');
  document.getElementById('menuBtn').addEventListener('click', function () { sidebar.classList.toggle('open'); });
  var links = [].slice.call(sidebar.querySelectorAll('a'));
  links.forEach(function (a) { a.addEventListener('click', function () { sidebar.classList.remove('open'); }); });
  // search
  document.getElementById('search').addEventListener('input', function () {
    var q = this.value.toLowerCase().trim();
    links.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute('href'));
      var hit = !q || a.textContent.toLowerCase().indexOf(q) > -1 || (sec && sec.textContent.toLowerCase().indexOf(q) > -1);
      a.parentNode.classList.toggle('hidden', !hit);
    });
  });
  // scroll spy
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function spy() {
    var y = window.scrollY + 120, cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === cur); });
  }
  window.addEventListener('scroll', spy); spy();
  // copy buttons
  [].forEach.call(document.querySelectorAll('.copy'), function (b) {
    b.addEventListener('click', function () {
      var text = b.parentNode.querySelector('pre').textContent;
      var done = function () { b.textContent = 'Copied!'; setTimeout(function () { b.textContent = 'Copy'; }, 1500); };
      if (navigator.clipboard) { navigator.clipboard.writeText(text).then(done); }
      else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); }
    });
  });
  // lightbox
  var lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img');
  [].forEach.call(document.querySelectorAll('.shot'), function (img) {
    img.addEventListener('click', function () { lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add('open'); });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
