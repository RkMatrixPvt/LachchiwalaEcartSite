// Lightweight front-end script for sample product listing + cart (client-side).


// Highlight active page menu item
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(".main-nav a");

    menuLinks.forEach(link => {
        const href = link.getAttribute("href");

        // Match link to current page (default index.html)
        if (
            (href === currentPage) ||
            (currentPage === "" && href === "index.html")
        ) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

// =========================
// Responsive Menu Toggle
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Optional: animate icon to X
            menuToggle.classList.toggle('active');
        });

        // Close nav on link click (mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }
});


/* ---------- Sample Data ---------- */
function getSampleProducts(){
    return [
        {
            id: 1,
            name: "Buknu Blast",
            price: 99,
            category: "Spice Blend",
            badge: "Daily Use 🌿",
            filters: ["Daily Use", "Healthy", "Traditional"],
            image: "assets/images/Products/buknublast/1.png",
            description: "Haldi, namak aur traditional aromatic spices ka wholesome buknu blend — taste ke saath natural goodness, rotis aur parathas ke liye perfect."
        },
        {
            id: 2,
            name: "Kaitha Chaska",
            price: 129,
            category: "Fruit-Based Seasoning",
            badge: "Chatpata 🍋",
            filters: ["Tangy", "Chatpata", "Snack Special"],
            image: "assets/images/Products/kaithachaska/1.png",
            description: "Sukhe kaitha (wood apple), namak aur secret spices se bana intense chatpata seasoning — addictive tang jo har bite ko flavourful bana de."
        },
        {
            id: 3,
            name: "Tangy Touch",
            price: 89,
            category: "Seasoning Salt",
            badge: "Instant Zing ⚡",
            filters: ["Tangy", "Quick Fix", "Snack Special"],
            image: "assets/images/Products/tangytouch/1.png",
            description: "Hand-ground garlic, red chili, kopra aur pure salt se bana premium seasoning — sirf ek sprinkle aur food ho jaye instant tangy & savoury."
        },
        {
            id: 4,
            name: "Teekha Twist",
            price: 109,
            category: "Spicy Blend",
            badge: "Spicy 🔥",
            filters: ["Spicy", "Bold Flavour", "Snack Special"],
            image: "assets/images/Products/teekhatwist/1.png",
            description: "Potent red chili, garlic aur mixed spices ka fiery tadka-style blend — bina tel ke instant heat aur authentic spicy flavour."
        },
        {
            id: 5,
            name: "Zing Mix",
            price: 109,
            category: "Flavored Blend",
            badge: "Fresh & Light 🌿",
            filters: ["Healthy", "Refreshing", "Daily Use"],
            image: "assets/images/Products/zingmix/1.png",
            description: "Dhaniya seeds, namak aur aromatic spices se bana refreshing blend — cooling taste ke saath digestion aur daily meals ke liye ideal."
        }

    //{
    //  id: 5,
    //  name: "Rainbow Sprinkles Box",
    //  price: 99,
    //  category: "Baking",
    //  image: "images/product5.jpg",
    //  description: "Colorful sprinkles to add magic to desserts."
    //},
    //{
    //  id: 6,
    //  name: "Besan Ladoo (Pack)",
    //  price: 249,
    //  category: "Sweets",
    //  image: "images/product6.jpg",k
    //  description: "Traditional besan ladoos made fresh daily."
    //}
  ];
}

/* ---------- Helpers ---------- */
function productCardHTML(p){
  // fallback image: use logo if product image missing
  const img = p.image || 'images/logo.png';
  //return `
  //  <article class="product-card" data-id="${p.id}">
  //    <div class="product-media"><img src="${img}" alt="${escapeHtml(p.name)}"></div>
  //    <div class="product-name">${escapeHtml(p.name)}</div>
  //    <div class="product-desc">${escapeHtml(p.description)}</div>
  //    <div class="product-bottom">
  //      <div class="price">₹ ${p.price.toFixed(0)}</div>
  //      <div class="card-actions">
  //        <button class="btn-card btn-quick" data-id="${p.id}">Quick View</button>
  //        <button class="btn-card btn-add" data-id="${p.id}">Add</button>
  //      </div>
  //    </div>
  //  </article>
    //`;

    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media"><img src="${img}" alt="${escapeHtml(p.name)}"></div>
      <div class="product-name">${escapeHtml(p.name)}</div>
      <div class="product-desc">${escapeHtml(p.description)}</div>
      <div class="product-bottom">
        <div class="price">₹ ${p.price.toFixed(0)}</div>
        <div class="card-actions">
          <button class="btn-card btn-quick" data-id="${p.id}">Quick View</button>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }

/* ---------- Cart (localStorage) ---------- */
const CART_KEY = 'Lachchhiwala_cart';
function readCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch(e){return []} }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCountUI(); }

function addToCart(productId, qty = 1){
  const products = getSampleProducts();
  const p = products.find(x=>x.id===productId);
  if(!p) return;
  const cart = readCart();
  const item = cart.find(i=>i.id===productId);
  if(item) item.qty += qty; else cart.push({id:productId, qty, name:p.name, price:p.price});
  saveCart(cart);
}

/* update cart icon */
function updateCartCountUI(){
  const cart = readCart();
  const total = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

/* ---------- Modal (Quick View) ---------- */
function openQuickView(productId){
  const products = getSampleProducts();
  const p = products.find(x=>x.id===productId);
  if(!p) return;
  const modal = document.getElementById('quickModal');
  const content = document.getElementById('modalContent');
  //content.innerHTML = `
  //  <div style="display:flex;gap:18px;align-items:stretch;flex-wrap:wrap">
  //    <div style="flex:1 1 260px;min-width:220px">
  //      <img src="${p.image || 'images/logo.png'}" alt="${escapeHtml(p.name)}" style="width:100%;border-radius:8px;object-fit:cover">
  //    </div>
  //    <div style="flex:1 1 320px">
  //      <h2 style="margin-top:0">${escapeHtml(p.name)}</h2>
  //      <p style="color:var(--muted)">${escapeHtml(p.description)}</p>
  //      <p style="font-weight:800;font-size:20px;margin:10px 0">₹ ${p.price}</p>
  //      <div style="display:flex;gap:8px;align-items:center">
  //          <input id="qtyInput" type="number" min="1" value="1" style="width:70px;padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--accent)">
  //          <button id="modalAdd" class="btn btn-primary">Add to Cart</button>
  //      </div>
  //    </div>
  //  </div>
    //`;

    content.innerHTML = `
    <div style="display:flex;gap:18px;align-items:stretch;flex-wrap:wrap">
      <div style="flex:1 1 260px;min-width:220px">
        <img src="${p.image || 'images/logo.png'}" alt="${escapeHtml(p.name)}" style="width:100%;border-radius:8px;object-fit:cover">
      </div>
      <div style="flex:1 1 320px">
        <h2 style="margin-top:0">${escapeHtml(p.name)}</h2>
        <p style="color:var(--muted)">${escapeHtml(p.description)}</p>
        <p style="font-weight:800;font-size:20px;margin:10px 0">₹ ${p.price}</p>
        <div style="display:flex;gap:8px;align-items:center">
          <button id="modalClose" class="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  `;
  modal.setAttribute('aria-hidden', 'false');

  // attach add
  setTimeout(()=>{ // ensure DOM inserted
    document.getElementById('modalAdd').addEventListener('click', ()=>{
      const qty = Math.max(1, parseInt(document.getElementById('qtyInput').value || 1));
      addToCart(productId, qty);
      modal.setAttribute('aria-hidden', 'true');
    });
  }, 50);
}
function closeModal(){ document.getElementById('quickModal').setAttribute('aria-hidden','true'); }

/* ---------- Attach card listeners for quick view and add ---------- */
function attachCardListeners(){
  document.querySelectorAll('.btn-quick').forEach(btn=>{
    btn.onclick = () => openQuickView(parseInt(btn.dataset.id,10));
  });
  document.querySelectorAll('.btn-add').forEach(btn=>{
    btn.onclick = () => { addToCart(parseInt(btn.dataset.id,10)); };
  });
}

/* attach global listeners */
document.addEventListener('click', (e)=>{
  if(e.target.matches('#modalClose')) closeModal();
  if(e.target.closest && e.target.closest('#quickModal') && !e.target.closest('.modal-panel')) closeModal();
});

document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// modal close button (if present)
document.getElementById('modalClose')?.addEventListener('click', closeModal);

// cart button: simple alert list (placeholder for real cart page)
document.querySelectorAll('#cartBtn').forEach(b=>{
  b.addEventListener('click', ()=>{
    const cart = readCart();
    if(!cart.length) return alert('Cart is empty');
    let msg = 'Cart contents:\\n\\n';
    cart.forEach(i=> msg += `${i.name} x ${i.qty} — ₹ ${i.price * i.qty}\\n`);
    msg += '\\nTotal: ₹ ' + cart.reduce((s,i)=>s+i.price*i.qty,0);
    alert(msg);
  });
});

/* initial attach */
attachCardListeners();
updateCartCountUI();
