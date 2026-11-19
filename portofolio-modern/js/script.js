(function(){
var d=document,r=d.documentElement;
// tema
try{var s=localStorage.getItem('tema');if(s)r.setAttribute('data-theme',s)}catch(e){}
d.getElementById('tema').onclick=function(){
  var cur=r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  var n=cur==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('tema',n)}catch(e){}
};
// spotlight kaca
d.addEventListener('pointermove',function(e){var g=e.target.closest&&e.target.closest('.g');if(!g)return;var b=g.getBoundingClientRect();g.style.setProperty('--mx',(e.clientX-b.left)+'px');g.style.setProperty('--my',(e.clientY-b.top)+'px')});
// ketik
var W=['Web Developer','UI/UX Learner','Game Developer pemula','Siswa PPLG'],wi=0,ci=0,del=false,t=d.getElementById('typing');
(function tick(){var w=W[wi];ci+=del?-1:1;t.textContent=w.slice(0,ci);var sp=del?40:85;
  if(!del&&ci===w.length){del=true;sp=1400}else if(del&&ci===0){del=false;wi=(wi+1)%W.length;sp=300}setTimeout(tick,sp)})();
// tab
var tb=d.querySelectorAll('.tabs button'),tp=d.querySelectorAll('.tp');
tb.forEach(function(b){b.onclick=function(){tb.forEach(function(x){x.classList.remove('on')});tp.forEach(function(x){x.classList.remove('on')});b.classList.add('on');d.getElementById(b.dataset.t).classList.add('on')}});
// reveal + hitung
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');
  e.target.querySelectorAll('[data-n]').forEach(function(el){var n=+el.dataset.n,i=0,sf=el.dataset.s||'';var iv=setInterval(function(){i++;el.textContent=i+sf;if(i>=n)clearInterval(iv)},180)});io.unobserve(e.target)})},{threshold:.15});
d.querySelectorAll('.rv').forEach(function(x){io.observe(x)});
// scrollspy
var ls=d.querySelectorAll('.nav a'),so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)ls.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
d.querySelectorAll('header[id],section[id]').forEach(function(x){so.observe(x)});
// ===== Data: edit di sini =====
var CV=[{t:'CV Kreatif',src:'img/cv-kreatif.jpg',dl:'cv/CV-Kreatif-Farhan-Ahadiana.pdf',f:'CV-Kreatif-Farhan-Ahadiana.pdf'},{t:'CV ATS',src:'img/CV-ATS1.jpg',dl:'cv/CV ATS.pdf',f:'CV ATS.pdf'}];
var KAT={peminjaman:'Peminjaman Alat',lelang:'Lelang Online',desain:'Desain UI/UX'};
// ===== Lightbox =====
var lb=d.getElementById('lb'),lbi=d.getElementById('lbimg'),lbc=d.getElementById('lbcap'),lbt=d.getElementById('lbtabs'),lbd=d.getElementById('lbdl'),lbb=d.getElementById('lbbody');
var items=[],ix=0,mode='',opener=null;
function setDl(a,c){if(!c||!c.dl){a.style.display='none';return}a.style.display='';a.href=c.dl==='self'?c.src:c.dl;a.setAttribute('download',c.f||'')}
function show(){var it=items[ix];lbi.src=it.src;lbi.alt=it.c||it.t||'';lbc.textContent=it.c||'';lbb.scrollTop=0;
  if(mode==='cv'){lbt.querySelectorAll('button').forEach(function(b,n){b.classList.toggle('on',n===ix)});setDl(lbd,it)}}
function openLB(list,i,m,from){items=list;ix=i;mode=m;opener=from||null;
  lb.classList.toggle('photo',m==='foto');lb.classList.toggle('multi',list.length>1);
  lbt.innerHTML='';lbd.style.display='none';
  if(m==='cv')list.forEach(function(c,n){var b=d.createElement('button');b.type='button';b.textContent=c.t;b.onclick=function(){ix=n;show()};lbt.appendChild(b)});
  show();lb.classList.add('open');d.body.style.overflow='hidden';d.getElementById('lbx').focus()}
function closeLB(){lb.classList.remove('open');d.body.style.overflow='';lbi.src='';if(opener)opener.focus()}
function step(n){if(mode!=='foto'||items.length<2)return;ix=(ix+n+items.length)%items.length;show()}
d.getElementById('lbx').onclick=closeLB;d.getElementById('lbp').onclick=function(){step(-1)};d.getElementById('lbn').onclick=function(){step(1)};
lb.addEventListener('click',function(e){if(e.target===lb||e.target===lbb)closeLB()});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
// ===== CV =====
d.querySelectorAll('[data-th]').forEach(function(im){im.src=CV[+im.dataset.th].src});
d.querySelectorAll('[data-dl]').forEach(function(a){setDl(a,CV[+a.dataset.dl])});
d.querySelectorAll('[data-cv]').forEach(function(b){b.addEventListener('click',function(){openLB(CV,+b.dataset.cv,'cv',b)})});
// ===== Galeri proyek: foto diatur lewat tag <img> di index.html =====
var gal=d.getElementById('gallery'),fil=d.getElementById('filters'),fl='semua';
window.addEventListener('load',function(){
  var all=[].slice.call(gal.querySelectorAll('.shot'));
  if(!all.length){d.getElementById('soon').hidden=false;gal.style.display='none';return}
  var ks=['semua'];all.forEach(function(b){var k=b.dataset.k;if(ks.indexOf(k)<0)ks.push(k)});
  function apply(){all.forEach(function(b){b.hidden=!(fl==='semua'||b.dataset.k===fl)})}
  function chips(){fil.innerHTML='';if(ks.length<3)return;ks.forEach(function(k){var b=d.createElement('button');b.type='button';b.textContent=k==='semua'?'Semua':(KAT[k]||k);b.className=k===fl?'on':'';b.onclick=function(){fl=k;chips();apply()};fil.appendChild(b)})}
  all.forEach(function(b){b.onclick=function(){var vis=all.filter(function(x){return !x.hidden});
    openLB(vis.map(function(x){var im=x.querySelector('img'),sp=x.querySelector('span');return{src:im.currentSrc||im.src,c:sp?sp.textContent:im.alt}}),vis.indexOf(b),'foto',b)}});
  chips();
});
})();
