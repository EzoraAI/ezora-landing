// Smooth page transitions — keeps nav visible, only fades page content
// Include this script at the TOP of <body> on every page (before nav)
(function(){

  /* ── 1. Show body immediately (nav is always visible) ── */
  document.body.classList.add('loaded');

  /* ── 2. Wrap all content after <nav> in a transition container ── */
  function wrapContent(){
    var nav = document.querySelector('nav');
    if(!nav) return;
    // Collect every sibling after <nav>
    var nodes = [];
    var sibling = nav.nextSibling;
    while(sibling){
      nodes.push(sibling);
      sibling = sibling.nextSibling;
    }
    // Don't re-wrap if already wrapped
    if(document.getElementById('page-content')) return;
    var wrapper = document.createElement('div');
    wrapper.id = 'page-content';
    nodes.forEach(function(n){ wrapper.appendChild(n); });
    nav.parentNode.appendChild(wrapper);
    // Trigger entrance animation on next frame
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        wrapper.classList.add('page-visible');
      });
    });
  }

  /* ── 3. Intercept internal link clicks ── */
  document.addEventListener('click', function(e){
    var link = e.target.closest('a');
    if(!link) return;
    var href = link.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;

    var current = location.pathname.split('/').pop() || 'index.html';
    var target  = href.split('#')[0].split('/').pop() || 'index.html';

    // Same page — just scroll to top
    if(current === target){
      e.preventDefault();
      window.scrollTo({top:0, behavior:'smooth'});
      return;
    }

    e.preventDefault();

    // Use View Transitions API if available (Chrome 111+, Edge, etc.)
    if(document.startViewTransition){
      document.startViewTransition(function(){
        window.location.href = href;
      });
      return;
    }

    // Fallback: fade out only the page content, nav stays visible
    var content = document.getElementById('page-content');
    if(content){
      content.classList.remove('page-visible');
      content.classList.add('page-exit');
      setTimeout(function(){ window.location.href = href; }, 180);
    } else {
      window.location.href = href;
    }
  });

  /* ── 4. Init on DOM ready ── */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', wrapContent);
  } else {
    wrapContent();
  }

})();
