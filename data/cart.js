import { getProductPrice } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addProduct(productName) {
	let matchingItem;

	cart.forEach((product) => {
		if (product.name === productName) {
			matchingItem = product;
		}
	});

	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			name: productName,
			quantity: 1,
			price: getProductPrice(productName),
		});
	}

	saveToStorage();
}

export function removeProduct(productName) {
	const newCart = cart.filter((cartItem) => cartItem.name !== productName);
	cart = newCart;
	saveToStorage();
}

export function calculateCartQuantity() {
	let cartQuantity = 0;

	cart.forEach((item) => {
		cartQuantity += item.quantity;
	});

	return cartQuantity;
}

export function getProductTotalPrice(price, quantity) {
	return price * quantity;
}

export function getTotalPrice() {
	let totalPrice = 0;
	cart.forEach((cartItem) => {
		totalPrice += getProductTotalPrice(cartItem.price, cartItem.quantity);
	});
	return totalPrice;
}

function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}
