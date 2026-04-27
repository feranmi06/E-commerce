let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Prices (simple demo)
let prices = {
    "Pink Dress": 5000,
    "Luxury Bag": 10000,
    "Heels": 4000,
    "Wig": 25000,
    "Bracelet": 1000,
    "Necklace": 5000
};

function displayCart() {
    let container = document.getElementById("cart-items");
    let total = 0;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        let price = prices[item];
        total += price;

        container.innerHTML += `
            <div class="cart-item">
                <span>${item} - ₦${price}</span>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₦" + total;
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// CHECKOUT
function checkout() {
    alert("Order placed successfully 💕");
    localStorage.removeItem("cart");
    location.reload();
}

displayCart();


