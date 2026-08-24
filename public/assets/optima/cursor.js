/* Custom trailing cursor — shared across Optima site pages */
(function(){
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h13M12 5l7 7-7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(dot);

  var tx = -100, ty = -100, x = -100, y = -100;

  function pointInRects(px, py, rects, pad){
    for (var i = 0; i < rects.length; i++){
      var r = rects[i];
      if (r.width < 1 || r.height < 1) continue;
      if (px >= r.left - pad && px <= r.right + pad && py >= r.top - pad && py <= r.bottom + pad) return true;
    }
    return false;
  }

  function isOverText(e){
    var el = e.target;
    if (!el || el === document.body || el === document.documentElement) return false;
    if (el.closest('svg,img,video,canvas,.wwd-visual,.owd-icon,.owd-small-icon,.cursor-dot')) return false;

    var node = null, offset = 0;
    if (document.caretPositionFromPoint){
      var pos = document.caretPositionFromPoint(e.clientX, e.clientY);
      if (pos && pos.offsetNode){ node = pos.offsetNode; offset = pos.offset; }
    } else if (document.caretRangeFromPoint){
      var range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range && range.startContainer){ node = range.startContainer; offset = range.startOffset; }
    }
    if (!node || node.nodeType !== 3) return false;
    var text = node.textContent || '';
    if (!text.replace(/\s+/g, '').length) return false;

    var start = Math.max(0, offset - 1);
    var end = Math.min(text.length, Math.max(offset + 1, start + 1));
    if (end <= start) return false;

    var probe = document.createRange();
    try {
      probe.setStart(node, start);
      probe.setEnd(node, end);
    } catch (err){
      return false;
    }
    return pointInRects(e.clientX, e.clientY, probe.getClientRects(), 2);
  }

  function isOverLearnMoreLabel(e){
    var link = e.target && e.target.closest && e.target.closest('.owd-link');
    if (!link) return false;
    var probe = document.createRange();
    try { probe.selectNodeContents(link); } catch (err){ return false; }
    return pointInRects(e.clientX, e.clientY, probe.getClientRects(), 6);
  }

  var HOVER_SELECTOR = 'a, button, .btn, .op-suite-card, .op-card, .op-mini, .op-mini-card, .op-lp, .op-demo, .op-site, .op-banner, .work-card, .about-card, .bws-tmpl, .bws-tmpl-interactive, .ent-card, .prod, .carousel-cta, .carousel-nav, .carousel-dot, .lp-btn, .lp-hbtn, input, textarea, select, [role="button"]';
  var OWD_SKIP = '.owd-section, .owd-card, .owd-link';

  window.addEventListener('mousemove', function(e){
    tx = e.clientX; ty = e.clientY;
    dot.classList.add('is-visible');

    var learnMore = isOverLearnMoreLabel(e);
    var inOwd = !!(e.target.closest && e.target.closest(OWD_SKIP));
    var hover = learnMore || (!inOwd && !!(e.target.closest && e.target.closest(HOVER_SELECTOR)));
    dot.classList.toggle('is-hover', hover);
    dot.classList.toggle('is-text', learnMore || isOverText(e));
  });
  document.addEventListener('mouseleave', function(){
    dot.classList.remove('is-visible', 'is-hover', 'is-text');
  });

  function raf(){
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    dot.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
