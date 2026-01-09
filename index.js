
import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");

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
                <button class="add-to-order" type="button" aria-label="Add to Order"><i class="fa fa-plus "></i></button>
               `

menuContainer.appendChild(menuContainerItem);
});