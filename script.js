const FIRST_MET_DATE = "23 Juni 2026";

const moments = [
  { date:"Braga,Kota Bandung", title:"Pertama Kali kita jalan", caption:"Waktu itu aku nggak nyangka orang ini bakal sama saya", img:"photos/foto1.jpg" },
  { date:"Kota Bandung", title:"Ini saat kita masak pempek bareng", caption:"Saat itu kita berdua janji sebelum meninggalkan sumatera kita akan kasih hadiah perkenalan kita, kamu buat pempek dan aku belikan kamu dimsum mentai.", img:"photos/foto2.jpg" },
  { date:"Braga,Kota Bandung", title:"Malam minggu dan makin dekat kita berdua berani fotbar", caption:"Masih inget banget awalnya kamu gamau fotbar dengan aku,dan ternyata kamu mau fotbar dari awal, awalnya aku ragu kenapa kamu mau tapi dunia berkata lain untuk kita berdua.", img:"photos/foto3.jpg" },
  { date:"Kawasan DAGO", title:"Jalan berdua kita dihari minggu", caption: "Ini saat hari tu kamu mau bawa teman kamu dan aku perbolehkan tapi ternyata hanya kita berdua yang menikmati perjalanan itu dan aku berusaha membuat kamu hari itu bahagia dan aku gamau buat kesalahan sedikit pun agar mood kamu tidak rusak dan hari bahagia kita hari itu ga berjalan buruk.", img:"photos/foto4.jpg" },
  { date:"Yogya Kepatihan", title:"Makan berdua di luar setelah beli boneka untuk teman bobo kamu", caption:"Ini saat kamu cuekin dan ga peduliin aku sedikit pun di hari sabtu aku didiemin sampai hari minggu,dan minggu nya kamu ajak aku keluar untuk beli boneka dan aku terima tawaran kamu dan akhirnya kamu memilih teman boboo kamu kucing berwarna orange dengan lonceng di lehernya dan itu hadiah sementara dari aku.", img:"photos/foto5.jpg" },
];

const garland = document.getElementById('garland');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');

moments.forEach((m, i) => {
  const el = document.createElement('div');
  el.className = 'moment';
  el.innerHTML = `
    <span class="pin"></span>
    <div class="card">
      <div class="tape"></div>
      <div class="photo-wrap" data-idx="${i}">
        <img src="${m.img}" alt="${m.title}" loading="lazy"
             onerror="this.style.display='none'; this.parentElement.querySelector('.ph-fallback').style.display='block';">
        <div class="ph-fallback" style="display:none;">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7.5-4.6-10.2-9.1C.4 9.1 1.3 5.6 4.4 4.3c2.3-1 4.8-.2 6.1 1.7l1.5 2.1 1.5-2.1c1.3-1.9 3.8-2.7 6.1-1.7 3.1 1.3 4 4.8 2.6 7.6C19.5 16.4 12 21 12 21z"/></svg>
          <div>Foto ${i+1}</div>
          <small>Taruh file "${m.img.split('/').pop()}"<br>di folder photos/</small>
        </div>
      </div>
      <div class="moment-index">Momen ${String(i+1).padStart(2,'0')}</div>
      <div class="moment-title">${m.title}</div>
      <div class="moment-date">${m.date}</div>
      <div class="moment-caption">${m.caption}</div>
    </div>
  `;
  garland.appendChild(el);
});

garland.addEventListener('click', (e) => {
  const wrap = e.target.closest('.photo-wrap');
  if(!wrap) return;
  const idx = wrap.dataset.idx;
  const m = moments[idx];
  const img = wrap.querySelector('img');
  if(img.style.display !== 'none'){
    lbImg.src = img.src;
    lbCap.textContent = `${m.title} — ${m.caption}`;
    lightbox.classList.add('open');
  }
});
document.getElementById('lbClose').onclick = () => lightbox.classList.remove('open');
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });

const obs = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); } });
},{threshold:.2});
document.querySelectorAll('.moment').forEach(m=>obs.observe(m));

function updateDays(){
  const start = new Date(FIRST_MET_DATE);
  const now = new Date();
  const diff = Math.max(0, Math.floor((now-start)/(1000*60*60*24)));
  document.getElementById('days').textContent = diff.toString().padStart(3,'0');
}
updateDays();

const heartsWrap = document.getElementById('hearts');
const heartChars = ['♥','❤','💗'];
for(let i=0;i<16;i++){
  const h = document.createElement('div');
  h.className = 'float-heart';
  h.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (12 + Math.random()*16) + 'px';
  h.style.animationDuration = (10 + Math.random()*14) + 's';
  h.style.animationDelay = (Math.random()*14) + 's';
  heartsWrap.appendChild(h);
}
