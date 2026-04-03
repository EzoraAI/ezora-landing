// Glow hover effect — shared across all pages
// Injects CSS and attaches mousemove listeners to .glow-hover elements

(function(){
  // Inject glow CSS if not already present
  if(!document.getElementById('glow-hover-styles')){
    var style=document.createElement('style');
    style.id='glow-hover-styles';
    style.textContent=
      '.glow-hover{position:relative;overflow:hidden;isolation:isolate}'+
      '.glow-hover::before{content:"";position:absolute;width:120px;height:120px;border-radius:50%;top:calc(var(--y,50%) - 60px);left:calc(var(--x,50%) - 60px);opacity:0;transition:opacity .2s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(255,255,255,.2) 0%,transparent 70%)}'+
      '.glow-hover:hover::before{opacity:1}'+
      '.glow-hover:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}'+
      '.glow-hover.glow-teal::before{background:radial-gradient(circle,rgba(255,255,255,.25) 0%,transparent 70%)}'+
      '.glow-hover.glow-purple::before{background:radial-gradient(circle,rgba(200,170,255,.25) 0%,transparent 70%)}'+
      '.glow-hover.glow-gold::before{background:radial-gradient(circle,rgba(255,220,150,.25) 0%,transparent 70%)}'+
      '.glow-hover.glow-white::before{background:radial-gradient(circle,rgba(255,255,255,.1) 0%,transparent 70%)}';
    document.head.appendChild(style);
  }

  // Attach mousemove listeners
  document.querySelectorAll('.glow-hover').forEach(function(el){
    el.addEventListener('mousemove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--x',(e.clientX-r.left)+'px');
      el.style.setProperty('--y',(e.clientY-r.top)+'px');
    });
  });
})();
