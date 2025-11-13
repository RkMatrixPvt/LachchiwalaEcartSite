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
      name: "Lachchi's Gulab Jamun (Box of 12)",
      price: 399,
      category: "Sweets",
      image: "images/product1.jpg",
      description: "Soft, syrupy gulab jamuns made with khoya and saffron."
    },
    {
      id: 2,
      name: "Kaju Katli Premium",
      price: 699,
      category: "Sweets",
      image: "images/product2.jpg",
      description: "Smooth cashew fudge with a silver leaf finish."
    },
    {
      id: 3,
      name: "Masala Chana Crunch",
      price: 149,
      category: "Snacks",
      image: "images/product3.jpg",
      description: "Crispy roasted chickpeas with tangy masala."
    },
    {
      id: 4,
      name: "Badam Milk (500 ml)",
      price: 199,
      category: "Beverages",
      image: "images/product4.jpg",
      description: "Rich almond milk with cardamom — chilled or warm."
    },
    {
      id: 5,
      name: "Rainbow Sprinkles Box",
      price: 99,
      category: "Baking",
      image: "images/product5.jpg",
      description: "Colorful sprinkles to add magic to desserts."
    },
    {
      id: 6,
      name: "Besan Ladoo (Pack)",
      price: 249,
      category: "Sweets",
      image: "images/product6.jpg",
      description: "Traditional besan ladoos made fresh daily."
    }
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
const CART_KEY = 'lachchiwala_cart';
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
