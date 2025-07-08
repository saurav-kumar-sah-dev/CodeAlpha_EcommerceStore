// Load products and display them
fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    const list = document.getElementById("product-list");
    if (!list) return;
    list.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>₹${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      `;
      list.appendChild(div);
    });
  });

// Add product to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(p => p._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("✅ Added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = count;
}
updateCartCount();


// Logout function
function logout() {
  localStorage.clear();
  alert("✅ Logged out.");
  window.location.href = "login.html";
}

// Init cart count on load
updateCartCount();
