/* وکالت‌وند — بروزرسانی خودکار قیمت سکه (هر ۴ روز یکبار) */
(function () {
  'use strict';
  var CYCLE_DAYS = 4;
  var LS_KEY = 'vv-coin-price';
  var JSON_PATHS = [
    'assets/coin-price.json',
    '../assets/coin-price.json',
    '../../assets/coin-price.json',
    '../../../assets/coin-price.json',
    '/vekalatvand/assets/coin-price.json'
  ];
  function fa(n) { try { return Math.round(n).toLocaleString('fa-IR'); } catch (e) { return String(Math.round(n)); } }
  function faDate(iso) {
    try {
      var d = new Date(iso + 'T00:00:00');
      return d.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return iso; }
  }
  function daysSince(iso) {
    try {
      var a = new Date(iso + 'T00:00:00').getTime();
      return Math.floor((Date.now() - a) / 86400000);
    } catch (e) { return 99; }
  }
  function loadJSON() {
    var tryNext = function (i) {
      if (i >= JSON_PATHS.length) return Promise.resolve(null);
      return fetch(JSON_PATHS[i], { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw 0;
        return r.json();
      }).catch(function () { return tryNext(i + 1); });
    };
    return tryNext(0);
  }
  function loadCache() {
    try {
      var o = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (o && o.price_toman > 10000000) return o;
    } catch (e) {}
    return null;
  }
  // تلاش زنده (best-effort) از طریق TGJU + پروکسی CORS — اگر نشد همان JSON مبناست
  function tryLive() {
    var ctrl = new AbortController();
    var to = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 7000);
    var url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.tgju.org/profile/sekee');
    return fetch(url, { signal: ctrl.signal }).then(function (r) {
      if (!r.ok) throw 0;
      return r.text();
    }).then(function (html) {
      var m = html.match(/data-col="info\.last_trade\.PDrCotVal">([\d,]+)</);
      if (!m) throw 0;
      var rial = parseInt(m[1].replace(/,/g, ''), 10);
      var toman = Math.round(rial / 10);
      if (!(toman > 20000000 && toman < 1000000000)) throw 0;
      return toman;
    }).catch(function () { return null; })
    .finally(function () { clearTimeout(to); });
  }
  function applyPrice(toman, meta) {
    if (!(toman > 0)) return;
    // ورودی‌های هر دو حسابگر
    var ids = ['coinPrice', 'm4cPrice'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        if (el.tagName === 'INPUT') { el.value = toman; el.dispatchEvent(new Event('input', { bubbles: true })); }
        else { el.textContent = String(toman); }
      }
    });
    // متغیرهای داخلی صفحه محاسبه نرخ روز (اگر لود شده)
    try {
      if (typeof window !== 'undefined' && window.__VV_SET_COIN) window.__VV_SET_COIN(toman);
    } catch (e) {}
    if (typeof coinCalc === 'function') { try { coinCalc(); } catch (e) {} }
    // بج تاریخ
    var txt = 'قیمت خودکار سکه: ' + fa(toman) + ' تومان' + (meta && meta.updated_at ? ' — بروزرسانی: ' + faDate(meta.updated_at) : '') + ' (هر ۴ روز)';
    document.querySelectorAll('[data-coin-date]').forEach(function (el) { el.textContent = txt; });
  }
  function paintBadge(meta, live) {
    var txt;
    if (meta && meta.price_toman) {
      txt = 'قیمت خودکار سکه: ' + fa(meta.price_toman) + ' تومان — بروزرسانی: ' + faDate(meta.updated_at) + ' (هر ۴ روز)' + (live ? ' + نرخ زنده' : '');
    } else txt = 'قیمت سکه به‌صورت خودکار هر ۴ روز به‌روز می‌شود';
    document.querySelectorAll('[data-coin-date]').forEach(function (el) { el.textContent = txt; });
  }
  function init() {
    loadJSON().then(function (meta) {
      var cache = loadCache();
      var base = meta && meta.price_toman ? meta : (cache ? { price_toman: cache.price_toman, updated_at: cache.updated_at } : null);
      if (!base) { paintBadge(null); return; }
      // اگر کش تازه‌تر از فایل است (کمتر از ۴ روز)، کش را مبنا بگذار
      var useCache = cache && daysSince(cache.updated_at) < CYCLE_DAYS && (!meta || cache.ts > +new Date(meta.updated_at));
      var active = useCache ? { price_toman: cache.price_toman, updated_at: cache.updated_at } : base;
      applyPrice(active.price_toman, active);
      paintBadge(active, false);
      // اگر فایل قدیمی‌تر از ۴ روز است، یک تلاش زنده بکن (بدون بلاک کردن صفحه)
      var age = daysSince(active.updated_at);
      if (age >= CYCLE_DAYS) {
        tryLive().then(function (live) {
          if (live && Math.abs(live - active.price_toman) / active.price_toman > 0.001) {
            var today = new Date().toISOString().slice(0, 10);
            try { localStorage.setItem(LS_KEY, JSON.stringify({ price_toman: live, updated_at: today, ts: Date.now() })); } catch (e) {}
            applyPrice(live, { updated_at: today });
            paintBadge({ price_toman: live, updated_at: today }, true);
          }
        });
      }
    });
  }
  window.VVCoin = { refresh: init, apply: applyPrice, CYCLE_DAYS: CYCLE_DAYS };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
