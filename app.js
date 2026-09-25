// ★★★ EDIT THIS — YOUR NUMBERS ★★★
const CONFIG = {
  shopName: "AM Resin Adventures",
  // Replace with your real WhatsApp number: country code + number, no + / spaces. e.g. India: "919876543210"
  whatsappNumber: "+918160776905",
  // Shown on Call buttons:
  callDisplay: "+918160776905",
  callLink: "tel:+918160776905",
  currency: "₹",
};
// ★★★★★★★★★★★★★★★★★★★★★★★

const PRODUCTS = [
  {id:1,name:"Ocean Geode Coasters (Set of 4)",cat:"kitchen",catLabel:"Trays & Coasters",price:599,old:799,rating:"4.9 (212)",badge:"Bestseller",icon:"🌊",bg:"radial-gradient(circle at 30% 30%,#aef3e6,#1d9e8f 60%,#07463f)",desc:"Hand-poured ocean waves with gold edge. Heat-resistant, waterproof. Perfect for chai & coffee."},
  {id:2,name:"Royal Serving Tray – 12 inch",cat:"kitchen",catLabel:"Trays & Coasters",price:1499,old:1899,rating:"4.9 (167)",badge:"Bestseller",icon:"🍽️",bg:"radial-gradient(circle at 30% 30%,#ffe6c7,#e9a749 55%,#7a3f0c)",desc:"Large rose-gold handles, geode marbling. For serving, pooja or vanity decor."},
  {id:3,name:"Geode Wall Clock – 14 inch",cat:"home",catLabel:"Home Decor",price:1999,old:2599,rating:"5.0 (98)",badge:"Premium",icon:"🕰️",bg:"radial-gradient(circle at 30% 30%,#e9d8ff,#8b5cf6 55%,#3b1d8f)",desc:"Silent movement, crystal stones. Beige-gold / teal-green options. Video shared before dispatch."},
  {id:4,name:"Alphabet Keychain with Flowers",cat:"gifts",catLabel:"Gifts & Custom",price:249,old:349,rating:"4.8 (540)",badge:"Under ₹300",icon:"🔑",bg:"radial-gradient(circle at 30% 30%,#ffd6e3,#ff5f8f 60%,#7a1030)",desc:"Any letter A-Z with real dried flowers + gold flakes. Great return gift. Bulk discount 10+ pcs."},
  {id:5,name:"Pendant Necklace – Real Flower",cat:"jewelry",catLabel:"Jewelry",price:399,old:549,rating:"4.9 (310)",badge:"Gifting",icon:"📿",bg:"radial-gradient(circle at 30% 30%,#fff3c4,#f5c542 55%,#8a5a00)",desc:"Real flower preserved in crystal-clear resin + anti-tarnish chain. Hypoallergenic."},
  {id:6,name:"Floral Stud Earrings (Pair)",cat:"jewelry",catLabel:"Jewelry",price:299,old:399,rating:"4.8 (275)",badge:"New",icon:"💎",bg:"radial-gradient(circle at 30% 30%,#dff3ff,#38bdf8 55%,#0c4a6e)",desc:"Lightweight daily-wear studs. 6 flower options. Gift box included."},
  {id:7,name:"Bookmark with Name",cat:"gifts",catLabel:"Gifts & Custom",price:199,old:299,rating:"4.9 (430)",badge:"Kids love it",icon:"🔖",bg:"radial-gradient(circle at 30% 30%,#e6ffe6,#34d399 55%,#065f46)",desc:"Custom name + tassel. Best gift for readers, teachers, kids. Add photo charm +₹50."},
  {id:8,name:"Jewelry / Trinket Box – Round",cat:"home",catLabel:"Home Decor",price:899,old:1199,rating:"4.8 (120)",badge:"Handmade",icon:"🎁",bg:"radial-gradient(circle at 30% 30%,#ffe4f1,#ec4899 55%,#701a45)",desc:"Rose & gold keepsake box for rings, bangles. Velvet inside."},
  {id:9,name:"Family Photo Frame – 8 inch",cat:"home",catLabel:"Home Decor",price:1299,old:1699,rating:"5.0 (86)",badge:"Custom photo",icon:"🖼️",bg:"radial-gradient(circle at 30% 30%,#e0e7ff,#6366f1 55%,#1e1b4b)",desc:"Your photo + flowers + gold flakes in glossy resin. Send photo on WhatsApp."},
  {id:10,name:"Ocean Cheeseboard with Handle",cat:"kitchen",catLabel:"Trays & Coasters",price:1099,old:1399,rating:"4.9 (143)",badge:"Party hit",icon:"🧀",bg:"radial-gradient(circle at 30% 30%,#cffafe,#0ea5e9 55%,#083344)",desc:"Acacia wood + ocean resin. For snacks, cheese, house parties."},
  {id:11,name:"Custom Nameplate for Home",cat:"home",catLabel:"Home Decor",price:1799,old:2299,rating:"4.9 (74)",badge:"Made to order",icon:"🏠",bg:"radial-gradient(circle at 30% 30%,#fef3c7,#d97706 55%,#451a03)",desc:"Family name + house number, floral theme. Weather-proof for main door."},
  {id:12,name:"Wedding Garland Preservation",cat:"gifts",catLabel:"Gifts & Custom",price:2499,old:3299,rating:"5.0 (61)",badge:"Keepsake",icon:"💐",bg:"radial-gradient(circle at 30% 30%,#ffe4e6,#f43f5e 55%,#4c0519)",desc:"Preserve your varmala / wedding flowers in a frame or tray forever. Most emotional gift."},
];

const grid = document.getElementById('grid');
const filters = document.getElementById('filters');
const search = document.getElementById('search');
let activeCat = 'all';

function waLink(message){
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function orderMsg(p){
  return `Hi ${CONFIG.shopName}! 💎\nI want to order:\n• ${p.name}\n• Price: ${CONFIG.currency}${p.price}\n• Qty: 1\n• Color choice: \n• My city: \nPlease confirm availability. Thank you!`;
}

function render(list){
  grid.innerHTML = list.map(p=>`
    <article class="card">
      <div class="card-art" style="background:${p.bg}">
        ${p.badge?`<span class="badge">${p.badge}</span>`:''}
        <span>${p.icon}</span>
      </div>
      <div class="card-body">
        <span class="cat">${p.catLabel}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price-row"><span class="price">${CONFIG.currency}${p.price.toLocaleString('en-IN')}</span><span class="old">${CONFIG.currency}${p.old.toLocaleString('en-IN')}</span></div>
        <div class="rate">⭐ ${p.rating}</div>
        <div class="card-btns">
          <a class="btn btn-wa" target="_blank" href="${waLink(orderMsg(p))}">WhatsApp</a>
          <a class="btn btn-ghost" href="${CONFIG.callLink}">📞 Call</a>
        </div>
        <button class="btn btn-dark" onclick="openModal(${p.id})">Quick view</button>
      </div>
    </article>`).join('') || `<p>No items found. Try "clock" or "coaster" — or <a href="#custom">request custom</a>.</p>`;
}

function apply(){
  const q = (search.value||'').toLowerCase();
  render(PRODUCTS.filter(p => (activeCat==='all'||p.cat===activeCat) && (p.name+p.desc).toLowerCase().includes(q)));
}
filters.addEventListener('click',e=>{
  if(e.target.dataset.cat){ activeCat=e.target.dataset.cat;
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    e.target.classList.add('active'); apply(); }
});
search.addEventListener('input',apply);

// Modal
const bg=document.getElementById('modalBg'), box=document.getElementById('modalBox');
window.openModal=function(id){
  const p=PRODUCTS.find(x=>x.id===id);
  box.innerHTML=`
    <div class="modal-art" style="background:${p.bg}"><span>${p.icon}</span></div>
    <div class="modal-body">
      <button class="close" onclick="closeModal()">✕</button>
      <span class="cat">${p.catLabel}</span>
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      <div class="price-row"><span class="price">${CONFIG.currency}${p.price.toLocaleString('en-IN')}</span><span class="old">${CONFIG.currency}${p.old.toLocaleString('en-IN')}</span><span class="rate">⭐ ${p.rating}</span></div>
      <p class="muted small">✓ Handmade • ✓ Gift box • ✓ Shipping pan-India • ✓ Video before dispatch</p>
      <a class="btn btn-wa full" target="_blank" href="${waLink(orderMsg(p))}">💬 Order this on WhatsApp</a>
      <a class="btn btn-ghost full" href="${CONFIG.callLink}">📞 Call to order: ${CONFIG.callDisplay}</a>
    </div>`;
  bg.classList.add('open');
};
window.closeModal=()=>bg.classList.remove('open');
bg.addEventListener('click',e=>{ if(e.target===bg) closeModal(); });

// Global links
const hello = `Hi ${CONFIG.shopName}! 💎 I want to see your resin collection. Please share bestsellers & prices.`;
for(const id of ['waTop','waHero','waFoot','waFloat']){
  const el=document.getElementById(id); if(el) el.href=waLink(hello);
}
document.getElementById('callTop').href=CONFIG.callLink;
document.getElementById('callCustom').href=CONFIG.callLink;
document.querySelectorAll('a[href^="tel:"]').forEach(a=>{ if(a.textContent.includes('99999')) a.textContent=`📞 ${CONFIG.callDisplay}`; });

// Custom form → WhatsApp
document.getElementById('customForm').addEventListener('submit',e=>{
  e.preventDefault();
  const msg=`Hi ${CONFIG.shopName}! ✨ Custom order request:\n• Item: ${document.getElementById('cfItem').value}\n• Name: ${document.getElementById('cfName').value}\n• City: ${document.getElementById('cfCity').value}\n• Details: ${document.getElementById('cfMsg').value}\nPlease share price & time.`;
  window.open(waLink(msg),'_blank');
});

// mobile menu
const mb=document.getElementById('menuBtn'), mn=document.getElementById('mobileNav');
mb.onclick=()=>mn.classList.toggle('open');
mn.querySelectorAll('a').forEach(a=>a.onclick=()=>mn.classList.remove('open'));

render(PRODUCTS);
