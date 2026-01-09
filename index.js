import { menuArray } from "./data.js";

// ==================== DOM Elements ====================
const menuContainer = document.getElementById("menu-container");
const orderContainer = document.getElementById("order-container");
const cardDetailsModal = document.querySelector(".card-details-modal");
const orderCompleteState = document.getElementById("order-complete-state");
const cardDetailsForm = document.getElementById("card-details-form");
const submitButton = document.getElementById("submit-button");

// ==================== State ====================
const orderCart = [];

// ==================== Event Listeners ====================
document.addEventListener("click", (e) => {
    const idEl = e.target.closest("[data-id]");

    if (idEl && idEl.classList.contains("add-to-order")) {
        const menuItem = menuArray.find((item) => item.id === parseInt(idEl.dataset.id));
        addToOrder(menuItem);
    } 
    else if (idEl && idEl.classList.contains("remove-item")) {
        const menuItem = orderCart.find((item) => item.id === parseInt(idEl.dataset.id));
        removeItem(menuItem);
    } 
    else if (e.target.id === "purchase-button") {
        openPaymentModal();
    } 
    else if (e.target.id === "submit-button") {
        e.preventDefault();
        completeOrder();
    }
});

cardDetailsForm.addEventListener("input", () => {
    submitButton.disabled = !cardDetailsForm.checkValidity();
});

// ==================== Order Functions ====================
function addToOrder(item) {
    orderCart.push(item);
    renderOrder();
}

function removeItem(item) {
    if (!item) return;
    orderCart.splice(orderCart.indexOf(item), 1);
    renderOrder();
}

function openPaymentModal() {
    cardDetailsModal.classList.add("open");
}

function completeOrder() {
    const customerName = document.getElementById("name").value;
    cardDetailsModal.classList.remove("open");
    orderCompleteState.innerHTML = `<h2>Thanks, ${customerName}! Your order is on its way!</h2>`;
    orderCompleteState.classList.add("open");
    orderCart.length = 0;
    renderOrder();
}

// ==================== Render Functions ====================
function renderMenu() {
    menuContainer.innerHTML = "";
    menuArray.forEach((menuItem) => {
        const menuContainerItem = document.createElement("div");
        menuContainerItem.classList.add("menu-item");
        menuContainerItem.innerHTML = `  
            <img src="./images/${menuItem.image}" alt="${menuItem.name}">
            <div class="menu-item-info">
                <h3 class="menu-item-name">${menuItem.name}</h3>
                <p class="ingredients">${menuItem.ingredients.join(", ")}</p>
                <p class="price">$${menuItem.price}</p>
            </div>
            <button class="add-to-order" type="button" aria-label="Add to Order" data-id="${menuItem.id}"></button>
        `;
        menuContainer.appendChild(menuContainerItem);
    });
}

function renderOrder() {
    if (orderCart.length === 0) {
        orderContainer.innerHTML = "";
        return;
    }

    orderContainer.innerHTML = `
        <h2>Your Order</h2>
        <ul id="order-list" class="order-list">
            ${orderCart.map((item) => `
                <li>
                    <span class="order-item">${item.name}
                    <span class="remove-item" data-id="${item.id}">remove</span></span>
                    <span class="price">$${item.price}</span>
                </li>
            `).join("")}
        </ul>
        <p id="total-price" class="total-price">
            Total price: <span class="price">$${orderCart.reduce((total, item) => total + item.price, 0)}</span>
        </p>
        <button type="button" id="purchase-button" class="btn btn-primary">Complete Order</button>
    `;
}

// ==================== Initialize ====================
renderMenu();