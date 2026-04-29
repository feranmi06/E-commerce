let images = document.querySelectorAll('.slider img');
    let index = 0;

    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, 3000);

    // for the home page

let slides = document.querySelectorAll(".slide");
// let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    index++;

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add("active");
}

setInterval(showSlide, 3000);

// BUTTON
function goShop() {
    alert("Welcome to L-BUY 💕");
}

//for the shop to scroll to products section
function goShop() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE CART COUNT
function updateCount() {
    let count = document.getElementById("count");
    if (count) {
        count.innerText = cart.length;
    }
}

// ADD TO CART
function addToCart(name, price, image) {
    cart.push({ name, price, image });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCount(); // 🔥 THIS was missing in many cases

    alert(name + " added 💕");
}

// RUN WHEN PAGE LOADS
window.onload = function () {
    updateCount();
};

// --- API integration examples ---
async function fetchProductsFromApi() {
    try {
        const res = await fetch('/api/products/');
        const data = await res.json();
        console.log('Products from API:', data);
        // Example: render into #products container (left as exercise)
    } catch (err) {
        console.error('Failed to fetch products', err);
    }
}

async function apiAddToCart(productId, quantity = 1) {
    await fetch('/api/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', product_id: productId, quantity })
    });
}

// call fetchProductsFromApi() on pages that should use dynamic products
// fetchProductsFromApi();
