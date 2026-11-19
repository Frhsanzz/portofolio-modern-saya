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
// ===== Carousel: dipakai Tools & Foto proyek =====
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var POS=[[0,1.05,1,0],[96,.8,.72,2.5],[172,.62,.38,5]]; // [geser %, skala, opacity, blur px]
function Carousel(wrap,o){
  var stage=wrap.querySelector('.car'),info=wrap.querySelector('.cd'),
      ix=0,sl=[],held=false,touchT=0,inView=true,dr=null,moved=false;
  info.innerHTML='<div class="ci"><small class="k"></small><h3></h3><p></p></div><div class="ch">Biarkan berputar, geser, atau arahkan kursor / sentuh untuk berhenti dan melihat deskripsi.</div>';
  var cc=d.createElement('div');cc.className='cc';
  cc.innerHTML='<button type="button" aria-label="Sebelumnya">‹</button><span class="n"></span><button type="button" aria-label="Berikutnya">›</button>';
  stage.insertAdjacentElement('afterend',cc);
  var cnt=cc.querySelector('.n'),bs=cc.querySelectorAll('button');
  function hold(v){held=v||reduce;wrap.classList.toggle('hold',held)}
  function fill(){var el=sl[ix];if(!el)return;var r=o.read(el);
    info.querySelector('.k').textContent=r.k||'';info.querySelector('h3').textContent=r.t||'';info.querySelector('p').textContent=r.d||''}
  function paint(){
    sl=[].slice.call(stage.querySelectorAll(o.sel)).filter(function(x){return !x.hidden});
    var n=sl.length;if(ix>=n)ix=0;cc.style.display=n>1?'':'none';
    sl.forEach(function(el,i){
      var dd=i-ix;if(dd>n/2)dd-=n;if(dd<-n/2)dd+=n;
      var a=Math.abs(dd),far=a>2,p=POS[Math.min(a,2)],sg=dd<0?-1:1;
      el.style.transform='translate('+(sg*(far?240:p[0]))+'%,-50%) scale('+p[1]+')';
      el.style.opacity=far?0:p[2];
      el.style.filter=p[3]?'blur('+p[3]+'px)':'none';
      el.style.zIndex=10-Math.min(a,3);
      el.style.pointerEvents=far?'none':'';
      el.classList.toggle('c',dd===0);
      el.setAttribute('aria-hidden',dd===0?'false':'true');
      if(el.tagName==='BUTTON')el.tabIndex=dd===0?0:-1;
    });
    cnt.textContent=n?(ix+1)+' / '+n:'';fill();
  }
  function go(s){if(sl.length<2)return;ix=(ix+s+sl.length)%sl.length;paint()}
  bs[0].onclick=function(){go(-1)};bs[1].onclick=function(){go(1)};
  // berhenti saat kursor di atas / disentuh / fokus
  wrap.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')hold(true)});
  wrap.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse'&&!wrap.contains(d.activeElement))hold(false)});
  wrap.addEventListener('focusin',function(){hold(true)});
  wrap.addEventListener('focusout',function(e){if(!wrap.contains(e.relatedTarget))hold(false)});
  // geser (mouse & sentuh)
  function mv(e){if(!dr)return;var dx=e.clientX-dr.x;if(Math.abs(dx)>45){moved=true;go(dx<0?1:-1);dr.x=e.clientX}}
  function up(){d.removeEventListener('pointermove',mv);d.removeEventListener('pointerup',up);d.removeEventListener('pointercancel',up);
    if(dr&&dr.t==='touch'){clearTimeout(touchT);touchT=setTimeout(function(){hold(false)},4000)}dr=null}
  stage.addEventListener('pointerdown',function(e){
    if(e.pointerType==='touch'){clearTimeout(touchT);hold(true)}
    dr={x:e.clientX,t:e.pointerType};moved=false;
    d.addEventListener('pointermove',mv);d.addEventListener('pointerup',up);d.addEventListener('pointercancel',up)});
  stage.addEventListener('click',function(e){
    if(moved){moved=false;e.preventDefault();e.stopPropagation();return}
    var el=e.target.closest(o.sel);if(!el)return;var i=sl.indexOf(el);if(i<0)return;
    if(i===ix){if(o.open)o.open(el,sl)}else{ix=i;paint()}},true);
  wrap.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){go(-1);e.preventDefault()}if(e.key==='ArrowRight'){go(1);e.preventDefault()}});
  // putar otomatis
  new IntersectionObserver(function(es){inView=es[0].isIntersecting},{threshold:.2}).observe(wrap);
  if(!reduce)setInterval(function(){if(!held&&inView&&!d.hidden)go(1)},2600);
  hold(false);paint();
  return{refresh:function(){ix=0;paint()}};
}

// ===== Tools: deskripsi (edit di sini) =====
var TD={
 'HTML5':'Kerangka dasar setiap halaman web. Saya memakainya untuk menyusun struktur portofolio ini dan halaman aplikasi saya.',
 'CSS3':'Mengatur warna, tata letak, dan animasi, termasuk efek kaca dan carousel di portofolio ini.',
 'Tailwind CSS':'Framework CSS berbasis utility class untuk membuat tampilan responsif dengan cepat. Dipakai di Aplikasi Peminjaman Alat dan Lelang Online.',
 'PHP':'Bahasa backend yang menjadi dasar Laravel. Dipakai untuk logika peminjaman, autentikasi, dan pengolahan data.',
 'Laravel':'Framework PHP dengan pola MVC. Dengan Laravel saya membangun Aplikasi Peminjaman Alat dan ikut mengerjakan Lelang Online.',
 'MySQL':'Basis data untuk menyimpan data alat, pengguna, peminjaman, dan pengembalian, dirancang lebih dulu lewat ERD.',
 'Docker':'Menjalankan aplikasi dalam kontainer supaya lingkungan kerja konsisten di setiap perangkat.',
 'Ubuntu (WSL)':'Linux di dalam Windows. Dipakai sebagai lingkungan pengembangan bersama Docker, lewat command line.',
 'GitHub':'Menyimpan dan mengelola versi kode proyek, juga untuk kolaborasi tim. Akun: github.com/Frhsanzz.',
 'Figma':'Merancang wireframe dan prototype sebelum dikodekan, misalnya form login/sign up dan aplikasi toko sepatu.',
 'Canva':'Membuat materi visual dengan cepat, seperti CV kreatif dan desain pendukung.'};
Carousel(d.getElementById('twrap'),{sel:'.tool',read:function(el){var n=el.querySelector('b').textContent;
  return{k:el.dataset.g,t:n,d:TD[n]||el.querySelector('span').textContent}}});

// ===== Galeri proyek: foto diatur lewat tag <img> di index.html =====
// Deskripsi tiap proyek (dipakai bila foto tidak punya data-d)
var KATD={
 peminjaman:'Aplikasi peminjaman alat dengan tiga peran: admin, petugas, dan peminjam. Dibuat dengan Laravel, Tailwind, MySQL, dan Docker.',
 lelang:'Aplikasi lelang online yang dikerjakan tim di kelas 11. Peran saya: anggota yang menyusun UML.',
 desain:'Rancangan antarmuka di Figma sebelum dikodekan, supaya alur aplikasi jelas dan nyaman dipakai.'};
var gal=d.getElementById('gallery'),fil=d.getElementById('filters'),fl='semua';
window.addEventListener('load',function(){
  var all=[].slice.call(gal.querySelectorAll('.shot'));
  if(!all.length){d.getElementById('soon').hidden=false;d.getElementById('gwrap').style.display='none';return}
  var gc=Carousel(d.getElementById('gwrap'),{sel:'.shot',
    read:function(el){return{k:KAT[el.dataset.k]||'',t:el.dataset.t||el.querySelector('span').textContent,d:el.dataset.d||KATD[el.dataset.k]||''}},
    open:function(el,vis){openLB(vis.map(function(x){var im=x.querySelector('img'),sp=x.querySelector('span');return{src:im.currentSrc||im.src,c:sp?sp.textContent:im.alt}}),vis.indexOf(el),'foto',el)}});
  var ks=['semua'];all.forEach(function(b){var k=b.dataset.k;if(ks.indexOf(k)<0)ks.push(k)});
  function apply(){all.forEach(function(b){b.hidden=!(fl==='semua'||b.dataset.k===fl)});gc.refresh()}
  function chips(){fil.innerHTML='';if(ks.length<3)return;ks.forEach(function(k){var b=d.createElement('button');b.type='button';b.textContent=k==='semua'?'Semua':(KAT[k]||k);b.className=k===fl?'on':'';b.onclick=function(){fl=k;chips();apply()};fil.appendChild(b)})}
  chips();
});

// ===== Animasi Spider-Man =====
(function(){
  var PI=Math.PI;
  function P(r,a){return[(r*Math.cos(a)).toFixed(1),(r*Math.sin(a)).toFixed(1)]}
  // 1) Laba-laba bergelantung: benang memanjang mengikuti scroll
  var sp=d.createElement('div');sp.className='spd';sp.setAttribute('aria-hidden','true');
  var leg='<path d="M26 30Q14 20 6 26M25 34Q12 32 4 38M26 38Q14 44 8 54M27 41Q20 50 16 58"/>';
  sp.innerHTML='<div class="th"></div><svg viewBox="0 0 60 60"><g fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round">'
   +'<g class="lg">'+leg+'</g><g class="lg b" transform="translate(60 0) scale(-1 1)">'+leg+'</g></g>'
   +'<ellipse cx="30" cy="42" rx="9" ry="11" fill="#d4141c" stroke="#111" stroke-width="1.2"/>'
   +'<path d="M27 38h6l-3 6zM30 44l-3 6h6z" fill="#111"/>'
   +'<circle cx="30" cy="28" r="6.8" fill="#1d4fc4" stroke="#111" stroke-width="1.2"/>'
   +'<path d="M24.6 27l4.4 1.6-1.2 2.6zM35.4 27L31 28.6l1.2 2.6z" fill="#fff" stroke="#111" stroke-width=".8"/></svg>';
  d.body.appendChild(sp);
  var cur=80,run=false;
  function loop(){
    var mx=d.documentElement.scrollHeight-innerHeight,p=mx>0?Math.min(1,scrollY/mx):0,tg=70+p*innerHeight*.5;
    cur+=(tg-cur)*.08;sp.style.setProperty('--len',cur.toFixed(1)+'px');
    if(Math.abs(tg-cur)>.2)requestAnimationFrame(loop);else run=false}
  function kick(){if(!run){run=true;requestAnimationFrame(loop)}}
  addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick);kick();

  // 2) Jaring muncul di titik klik / sentuh
  function web(x,y){
    var n=8,o=Math.random()*PI/4,s='<svg viewBox="-65 -65 130 130">',i,r,pa;
    for(i=0;i<n;i++){pa=P(60,o+i*2*PI/n);s+='<path pathLength="1" d="M0 0L'+pa[0]+' '+pa[1]+'"/>'}
    [16,32,48].forEach(function(r){var dd='';
      for(i=0;i<=n;i++){var a=o+i*2*PI/n,p=P(r,a),c=P(r*.82,a-PI/n);dd+=(i?'Q'+c[0]+' '+c[1]+' ':'M')+p[0]+' '+p[1]+' '}
      s+='<path class="rg" pathLength="1" d="'+dd+'"/>'});
    var w=d.createElement('div');w.className='web';w.style.left=x+'px';w.style.top=y+'px';w.setAttribute('aria-hidden','true');w.innerHTML=s+'</svg>';
    d.body.appendChild(w);setTimeout(function(){w.remove()},1300)}
  // 2b) Klik tombol / tautan apa pun: laba-laba menembakkan jaring ke tombol itu
  function shoot(x,y){
    var r=sp.querySelector('svg').getBoundingClientRect(),sx=r.left+r.width/2,sy=r.top+r.height*.55;
    var v=d.createElementNS('http://www.w3.org/2000/svg','svg');v.setAttribute('class','wlw');v.setAttribute('aria-hidden','true');
    v.innerHTML='<path pathLength="1" d="M'+sx+' '+sy+'Q'+((sx+x)/2)+' '+(Math.min(sy,y)-50)+' '+x+' '+y+'"/>';
    d.body.appendChild(v);
    setTimeout(function(){web(x,y)},190);
    setTimeout(function(){v.remove()},1200)}
  if(!reduce)d.addEventListener('click',function(e){
    var t=e.target.closest&&e.target.closest('button,a[href],[role="tab"],.btn');if(!t)return;
    var x=e.clientX,y=e.clientY;
    if(!e.detail||(!x&&!y)){var b=t.getBoundingClientRect();x=b.left+b.width/2;y=b.top+b.height/2} // Enter / Space
    shoot(x,y)});

  // 3) Jaring di sudut hero
  var it=d.getElementById('home');
  if(it){var s='<path pathLength="1" d="',i,k,dd;
    var rad='',rings='';
    for(i=0;i<=4;i++){var p=P(190,i*PI/8);rad+='<path pathLength="1" d="M0 0L'+p[0]+' '+p[1]+'"/>'}
    [40,80,120,160].forEach(function(r){dd='';
      for(i=0;i<=4;i++){var a=i*PI/8,p=P(r,a);dd+=(i?'Q'+P(r*.86,a-PI/16).join(' ')+' ':'M')+p.join(' ')+' '}
      rings+='<path pathLength="1" d="'+dd+'"/>'});
    ['l','r'].forEach(function(c){var v=d.createElementNS('http://www.w3.org/2000/svg','svg');
      v.setAttribute('class','cw cw-'+c);v.setAttribute('viewBox','0 0 200 200');v.setAttribute('aria-hidden','true');v.innerHTML=rad+rings;it.appendChild(v)})}
})();
})();