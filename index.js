import {
	addProduct,
	calculateCartQuantity,
	cart,
	getProductTotalPrice,
	getTotalPrice,
	removeProduct,
} from "./data/cart.js";
import { products } from "./data/products.js";

const productsContainer = document.querySelector("#js-products-container");
const aside = document.querySelector("aside");

function formatPrice(price) {
	return price.toFixed(2);
}

function renderProducts() {
	let html = ``;
	products.forEach((product) => {
		html += `
      <div class="desserts__card">
        <picture class="card__figure">
          <source
            media="(min-width: 480px)"
            srcset="${product.image.tablet}"
          />
          <source
            media="(min-width: 900px)"
            srcset="${product.image.desktop}"
          />
          <img
            src="${product.image.mobile}"
            alt="${product.name} Image"
            title="${product.name}"
            class="card__image"
          />
        </picture>
        <button class="card__add-button js-add-button" data-product-name="${
					product.name
				}">
          <img src="assets/images/icon-add-to-cart.svg" alt="Cart Icon" />
          <p>Add to Cart</p>
        </button>
        <div class="card__desc">
          <h3 class="desc__subtitle">${product.category}</h3>
          <h2 class="desc__title">${product.name}</h2>
          <span class="desc__price">$${formatPrice(product.price)}</span>
        </div>
      </div>
    `;
	});
	productsContainer.innerHTML = html;

	document.querySelectorAll(".js-add-button").forEach((btn) => {
		btn.addEventListener("click", () => {
			const productName = btn.dataset.productName;
			addProduct(productName);
			renderCart();
		});
	});
}

function renderCart() {
	let html = ``;
	if (cart.length > 0) {
		aside.innerHTML = `
      <h2 class="cart__quantity" id="js-cart-quantity">Your cart (${calculateCartQuantity()})</h2>
      <ul class="cart__list" id="js-cart-items-container"></ul>
      <div class="cart__summary">
        <h3 class="summary__title">Order total</h3>
        <span class="summary__price">$${formatPrice(getTotalPrice())}</span>
      </div>
      <div class="cart__advice">
        <img src="assets/images/icon-carbon-neutral.svg" alt="Icon Carbon Neutral" />
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>
      <button class="cart__confirm-button">Confirm Order</button>
    `;
		const cartItemsContainer = document.querySelector(
			"#js-cart-items-container"
		);
		cart.forEach((cartItem) => {
			html += `
        <li class="cart__item">
          <div class="item__info">
            <h4 class="item__title">${cartItem.name}</h4>
            <span class="item__quantity">${cartItem.quantity}x</span>
            <span class="item__price">@ $${formatPrice(cartItem.price)}</span>
            <span class="item__price-per-quantity">$${formatPrice(
							getProductTotalPrice(cartItem.price, cartItem.quantity)
						)}</span>
          </div>
          <button class="item__remove-icon js-remove-item" data-product-name="${
						cartItem.name
					}">
            <img
              src="assets/images/icon-remove-item.svg"
              alt="Remove Icon"
            />
          </button>
        </li>
      `;
		});
		cartItemsContainer.innerHTML = html;

		document.querySelectorAll(".js-remove-item").forEach((btn) => {
			btn.addEventListener("click", () => {
				const productName = btn.dataset.productName;
				removeProduct(productName);
				renderCart();
			});
		});
	} else {
		aside.innerHTML = `
      <h2 class="cart__quantity" id="js-cart-quantity">Your cart (0)</h2>
      <div class="cart__empty-container">
        <img src="assets/images/illustration-empty-cart.svg" alt="" />
        <p>Your items will appear here</p>
			</div>
    `;
	}
}

renderProducts();
renderCart();
