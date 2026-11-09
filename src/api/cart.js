const CART_KEY = "shop-parts-cart";

export function readCart() {
  try {
    const cart = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    return [];
  }
}

export function writeCart(cart) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    return false;
  }
}

export function addToCart(product) {
  const cart = readCart();
  const existing = cart.find((item) => String(item.id) === String(product.id));
  const next = existing
    ? cart.map((item) =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...cart, { ...product, quantity: 1 }];
  return writeCart(next);
}
