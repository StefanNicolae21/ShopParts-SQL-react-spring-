import React, { useCallback, useEffect, useState } from "react";
import { addToCart } from "../api/cart";
import { deleteProduct, getProducts } from "../api/products";
import "./AllProducts.css";

const TIP = { 1: "Electric", 2: "Mecanic" };
const CAT = {
  1: "Sistem de franare",
  2: "Sistem de ungere",
  3: "Sistem de iluminare",
  4: "Sistem de directie",
  5: "Sistem de angrenare",
  6: "Elemente de caroserie",
  7: "Elemente electrice",
};
const currency = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
});

export default function AllProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await getProducts());
    } catch (loadError) {
      setError("Nu s-au putut încărca produsele. Verifică dacă serverul API este pornit.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (product) => {
    const previousItems = items;
    setItems((current) => current.filter((item) => String(item.id) !== String(product.id)));
    setDeletingIds((current) => [...current, product.id]);
    setError("");
    try {
      await deleteProduct(product.id);
    } catch (deleteError) {
      setItems((current) => {
        if (current.some((item) => String(item.id) === String(product.id))) return current;
        const previousIndex = previousItems.findIndex(
          (item) => String(item.id) === String(product.id)
        );
        const restored = [...current];
        restored.splice(Math.min(previousIndex, restored.length), 0, product);
        return restored;
      });
      setError("Nu s-a putut șterge produsul. Încearcă din nou.");
    } finally {
      setDeletingIds((current) => current.filter((id) => String(id) !== String(product.id)));
    }
  };

  const handleAddToCart = (product) => {
    setNotice(
      addToCart(product)
        ? `${product.descriere} a fost adăugat în coș.`
        : "Coșul nu a putut fi salvat. Verifică setările de stocare ale browserului."
    );
  };

  if (loading) return <p role="status" style={{ padding: 16 }}>Se încarcă produsele…</p>;

  return (
    <main style={{ padding: 16 }}>
      <h2>All Products DB</h2>
      {error && <p role="alert" style={{ color: "crimson" }}>{error}</p>}
      {notice && <p role="status">{notice}</p>}
      {items.length === 0 ? (
        <p>Nu există produse încă.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table border="1" cellPadding="8" style={{ width: "100%", background: "white" }}>
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Denumire</th>
                <th scope="col">Preț</th>
                <th scope="col">Tip</th>
                <th scope="col">Categorie</th>
                <th scope="col">Data adăugării</th>
                <th scope="col">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.descriere}</td>
                  <td>{currency.format(Number(product.pret) || 0)}</td>
                  <td>{TIP[product.tipID] || product.tipID || "-"}</td>
                  <td>{CAT[product.categorieID] || product.categorieID || "-"}</td>
                  <td>{product.data_Adaugarii || "-"}</td>
                  <td>
                    <button type="button" onClick={() => handleAddToCart(product)}>Adaugă în coș</button>{" "}
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={deletingIds.some((id) => String(id) === String(product.id))}
                    >
                      {deletingIds.some((id) => String(id) === String(product.id)) ? "Se șterge…" : "Șterge"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
