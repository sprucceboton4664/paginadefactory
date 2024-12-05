document.addEventListener('DOMContentLoaded', () => {
    $('.hero-carousel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.category).classList.add('active');
        });
    });
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const cartClose = document.querySelector('.cart-close');
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartCount = document.querySelector('.cart-count');

    let cart = [];
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('h3').textContent;
            const price = parseFloat(item.querySelector('.price').textContent.replace('BS', ''));
            const existingItem = cart.find(cartItem => cartItem.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <span>BS${item.price.toFixed(2)} x ${item.quantity}</span>
                    <span>BS${itemTotal.toFixed(2)}</span>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            `;

            cartItems.appendChild(cartItemElement);
        });

        cartTotalAmount.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    cartIcon.addEventListener('click', () => {
        cartModal.classList.toggle('open');
    });

    cartClose.addEventListener('click', () => {
        cartModal.classList.remove('open');
    });
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Comprar';
    checkoutButton.classList.add('checkout-btn');
    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cartData', JSON.stringify(cart));
        window.location.href = 'contac.html';
    });
    cartTotalAmount.parentElement.appendChild(checkoutButton);
    
});
