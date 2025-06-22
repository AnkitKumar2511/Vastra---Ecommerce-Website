// ===== NAVBAR TOGGLE =====
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add a product to cart
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id && item.size === product.size);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove a product from cart
function removeFromCart(id, size) {
  cart = cart.filter(item => !(item.id === id && item.size === size));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render cart in cart.html
function renderCart() {
  const tbody = document.querySelector("#cart tbody");
  if (!tbody) return; // Exit if not on cart page

  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><button onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button></td>
      <td><img src="${item.image}" width="50" /></td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td>${item.size}</td>
      <td>₹${subtotal}</td>
    `;
    tbody.appendChild(row);
  });

  let totalDisplay = document.getElementById("cart-total");

  if (!totalDisplay) {
    const totalEl = document.createElement("h2");
    totalEl.innerHTML = `Total: ₹<span id="cart-total">${total}</span>`;
    document.querySelector("#cart").appendChild(totalEl);
  } else {
    totalDisplay.textContent = total;
  }
}

// Auto-render cart if on cart.html
renderCart();