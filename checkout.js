let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price || 0;
});

document.getElementById("total").innerText = "Total: ₦" + total;

// HANDLE PAYMENT
document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.querySelector("input[type='email']").value;

    let handler = PaystackPop.setup({
        key: "pk_test_54d5692883e1c2990825c3f13cccf01a4aa8dd1f", // 🔴 replace with your Paystack PUBLIC key
        email: email,
        amount: total * 100, // Paystack uses kobo (₦100 = 10000)
        currency: "NGN",

        callback: function(response) {
            alert("Payment successful 💕 Ref: " + response.reference);

            localStorage.removeItem("cart");
            window.location.href = "home.html";
        },

        onClose: function() {
            alert("Transaction cancelled");
        }
    });

    handler.openIframe();
});