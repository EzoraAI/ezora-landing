// Smooth page transitions — keeps nav visible, only fades page content
// Requires: each page has <div id="page-content"> wrapping everything after </nav>
(function(){

  /* ── 1. Fade in page content on load ── */
  function revealContent(){
    var pc = document.getElementById('page-content');
    if(!pc){return;}
    // Use rAF to ensure the browser has painted with opacity:0 first,
    // then add the visible class so the CSS transition runs smoothly
    requestAnimationFrame(function(){
      pc.classList.add('page-visible');
    });
  }

  // Run as early as possible
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', revealContent);
  } else {
    revealContent();
  }

  /* ── 2. Intercept internal link clicks ── */
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

    // Fade out page content (nav stays), then navigate
    var content = document.getElementById('page-content');
    if(content){
      content.classList.remove('page-visible');
      content.classList.add('page-exit');
      setTimeout(function(){ window.location.href = href; }, 150);
    } else {
      window.location.href = href;
    }
  });

})();
