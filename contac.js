let contadorHamburguesas = 0;

function agregarHamburguesa() {
    contadorHamburguesas++;
    const container = document.getElementById('hamburguesas-container');

    const nuevaHamburguesa = document.createElement('div');
    nuevaHamburguesa.classList.add('product-card');

    nuevaHamburguesa.innerHTML = `
        <h3>Hamburguesa Personalizada #${contadorHamburguesas}</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="form-label">Cantidad:</label>
                    <div class="input-group quantity-control">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${contadorHamburguesas}, -1)">-</button>
                        <input type="number" class="form-control text-center" id="quantity${contadorHamburguesas}" value="1" min="1">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${contadorHamburguesas}, 1)">+</button>
                    </div>
                </div>
                <h5>Ingredientes Extra:</h5>
                <button class="btn btn-outline-primary ingredient-btn" onclick="toggleIngredient(${contadorHamburguesas}, 'queso', 1.50)">+ Queso $1.50</button>
                <button class="btn btn-outline-primary ingredient-btn" onclick="toggleIngredient(${contadorHamburguesas}, 'tocino', 2.00)">+ Tocino $2.00</button>
                <button class="btn btn-outline-primary ingredient-btn" onclick="toggleIngredient(${contadorHamburguesas}, 'papas', 3.00)">+ Papas Extra $3.00</button>
            </div>
            <div class="col-md-6">
                <h5>Quitar Ingredientes:</h5>
                <button class="btn btn-outline-danger ingredient-btn" onclick="toggleRemove(${contadorHamburguesas}, 'cebolla')">Sin Cebolla</button>
                <button class="btn btn-outline-danger ingredient-btn" onclick="toggleRemove(${contadorHamburguesas}, 'lechuga')">Sin Lechuga</button>
                <button class="btn btn-outline-danger ingredient-btn" onclick="toggleRemove(${contadorHamburguesas}, 'tomate')">Sin Tomate</button>
            </div>
        </div>
        <div class="mt-3">
            <strong>Subtotal: $<span id="subtotal${contadorHamburguesas}">0.00</span></strong>
        </div>
    `;

    container.appendChild(nuevaHamburguesa);
}

function updateQuantity(index, change) {
    const quantityInput = document.getElementById(`quantity${index}`);
    const newQuantity = Math.max(1, parseInt(quantityInput.value) + change);
    quantityInput.value = newQuantity;
    updatePrices();
}

function toggleIngredient(index, ingredient, price) {
    const subtotal = document.getElementById(`subtotal${index}`);
    let currentSubtotal = parseFloat(subtotal.textContent);
    currentSubtotal += price;
    subtotal.textContent = currentSubtotal.toFixed(2);
    updatePrices();
}

function toggleRemove(index, ingredient) {
}

function updatePrices() {
    let total = 0;
    document.querySelectorAll('.product-card').forEach(card => {
        const subtotal = parseFloat(card.querySelector('span[id^="subtotal"]').textContent);
        total += subtotal;
    });
    document.getElementById('total')?.textContent = total.toFixed(2);
}

function finalizarPedido() {
    alert('¡Pedido Finalizado!');
    document.getElementById('gif-container').style.display = 'block';
    document.getElementById('boton-finalizar').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    const orderSummaryContainer = document.getElementById('order-summary');
    const totalPriceElement = document.getElementById('total-price');
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    let total = 0;

    cartData.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');

        productDiv.innerHTML = `
            <h5>${item.name}</h5>
            <p>Precio: BS ${item.price.toFixed(2)} x <span id="quantity-${index}">${item.quantity}</span></p>
            <p>Subtotal: BS <span id="subtotal-${index}">${(item.price * item.quantity).toFixed(2)}</span></p>
            <div class="mt-3">
                <strong>Opciones adicionales:</strong>
                <div id="options-${index}"></div>
                <button class="btn btn-sm btn-outline-primary option-btn" onclick="addOption(${index}, 'Papas', 5)">Agregar Papas (+BS5)</button>
                <button class="btn btn-sm btn-outline-primary option-btn" onclick="addOption(${index}, 'Soda', 3)">Agregar Soda (+BS3)</button>
                <button class="btn btn-sm btn-outline-primary option-btn" onclick="addOption(${index}, 'Cebolla Caramelizada', 2)">Agregar Cebolla Caramelizada (+BS2)</button>
                <button class="btn btn-sm btn-outline-primary option-btn" onclick="addOption(${index}, 'Lechuga', 1)">Agregar Lechuga (+BS1)</button>
            </div>
        `;

        orderSummaryContainer.appendChild(productDiv);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
});

function addOption(index, optionName, price) {
    const optionsContainer = document.getElementById(`options-${index}`);
    const subtotalElement = document.getElementById(`subtotal-${index}`);
    const totalPriceElement = document.getElementById('total-price');
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('add-remove-btn');
    optionDiv.innerHTML = `
        <span>${optionName}: BS ${price.toFixed(2)}</span>
        <button class="btn btn-sm btn-danger ms-2" onclick="removeOption(this, ${price})">Quitar</button>
    `;
    optionsContainer.appendChild(optionDiv);
    const newSubtotal = parseFloat(subtotalElement.textContent) + price;
    subtotalElement.textContent = newSubtotal.toFixed(2);

    const newTotal = parseFloat(totalPriceElement.textContent) + price;
    totalPriceElement.textContent = newTotal.toFixed(2);
}

function removeOption(element, price) {
    const totalPriceElement = document.getElementById('total-price');
    element.parentElement.remove();
    const newTotal = parseFloat(totalPriceElement.textContent) - price;
    totalPriceElement.textContent = newTotal.toFixed(2);
}
