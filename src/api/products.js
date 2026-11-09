const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:8080").replace(/\/$/, "");
const PRODUCTS_URL = `${API_BASE_URL}/produs`;

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response;
}

export async function getProducts() {
  const response = await request(PRODUCTS_URL);
  const products = await response.json();
  if (!Array.isArray(products)) {
    throw new Error("The products API returned an invalid response.");
  }
  return products;
}

export async function createProduct(product) {
  const response = await request(PRODUCTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response.json();
}

export async function deleteProduct(id) {
  await request(`${PRODUCTS_URL}/${encodeURIComponent(id)}`, { method: "DELETE" });
}
