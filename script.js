// ===============================
// السلامي جروب - Main JavaScript
// ===============================

let cart = [];


// ===============================
// Mobile Menu
// ===============================

function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("show");
}


// إغلاق القائمة بعد الضغط على أي رابط
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".menu").classList.remove("show");
    });
});


// ===============================
// Products Filter
// ===============================

function filterProducts(category, button) {

    const products = document.querySelectorAll(".product-card");
    const buttons = document.querySelectorAll(".category");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    products.forEach(product => {

        const productCategory = product.dataset.category;

        if (category === "all" || productCategory === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}


// ===============================
// Cart
// ===============================

function addToCart(name, price) {

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    showNotification("تمت إضافة المنتج إلى السلة ✓");
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                السلة فارغة حالياً
            </div>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            const itemElement = document.createElement("div");

            itemElement.className = "cart-item";

            itemElement.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>
                        ${item.price} جنيه × ${item.quantity}
                    </p>
                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">
                    حذف
                </button>
            `;

            cartItems.appendChild(itemElement);
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}


// ===============================
// Open / Close Cart
// ===============================

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeCart(event) {

    if (
        event &&
        event.target !== document.getElementById("cartOverlay")
    ) {
        return;
    }

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

    document.body.style.overflow = "";
}


// ===============================
// WhatsApp Checkout
// ===============================

function checkout() {

    if (cart.length === 0) {

        showNotification("السلة فارغة");

        return;
    }

    let message = "السلام عليكم، أريد طلب المنتجات التالية من السلامي جروب:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            `• ${item.name} - الكمية: ${item.quantity} - ${itemTotal} جنيه%0A`;
    });

    message += `%0Aالإجمالي: ${total} جنيه`;

    // ============================================
    // غيّر الرقم الموجود هنا إلى رقم واتساب الشركة
    // مثال مصر: 201012345678
    // ============================================

    const phone = "201000000000";

    const whatsappURL =
        `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappURL, "_blank");
}


// ===============================
// Notification
// ===============================

function showNotification(message) {

    const oldNotification =
        document.querySelector(".notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification =
        document.createElement("div");

    notification.className = "notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("hide");
    }, 2000);

    setTimeout(() => {
        notification.remove();
    }, 2500);
}


// ===============================
// Notification CSS
// ===============================

const notificationStyle =
document.createElement("style");

notificationStyle.textContent = `

.notification {
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 5000;
    background: #16834a;
    color: white;
    padding: 13px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    font-size: 14px;
    font-weight: 700;
    animation: notificationIn 0.3s ease;
}

.notification.hide {
    opacity: 0;
    transform: translateY(10px);
    transition: 0.3s;
}

@keyframes notificationIn {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

`;

document.head.appendChild(notificationStyle);


// ===============================
// Initialize
// ===============================

updateCart();