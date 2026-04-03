// Shared scroll-triggered animations — included on all pages
(function(){
  // Inject animation CSS
  if(!document.getElementById('anim-styles')){
    var style=document.createElement('style');
    style.id='anim-styles';
    style.textContent=
      '.fade-in{opacity:0;transform:translateY(20px) scale(.98);transition:none}'+
      '.fade-in.fade-visible{opacity:1;transform:translateY(0) scale(1);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}'+
      'h2.fade-in{transform:translateY(40px) scale(.98)}'+
      'h2.fade-in.fade-visible{transition-duration:.9s}'+
      '.delay-1{transition-delay:.15s!important}.delay-2{transition-delay:.3s!important}.delay-3{transition-delay:.45s!important}.delay-4{transition-delay:.6s!important}';
    document.head.appendChild(style);
  }

  // Remove any paused animation state set by legacy inline scripts
  document.querySelectorAll('.fade-in').forEach(function(el){
    el.style.animationPlayState='';
    el.style.animation='none';
  });

  // IntersectionObserver
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('fade-visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.1});

  document.querySelectorAll('.fade-in').forEach(function(el){
    obs.observe(el);
  });
})();
