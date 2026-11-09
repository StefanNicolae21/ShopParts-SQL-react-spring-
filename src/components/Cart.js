import React, { useEffect, useState } from "react";
import { readCart, writeCart } from "../api/cart";

const currency = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
});

export default function Cart() {
  const [items, setItems] = useState(readCart);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    setStorageError(!writeCart(items));
  }, [items]);

  const updateQuantity = (id, amount) => {
    setItems((current) =>
      current
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => sum + (Number(item.pret) || 0) * item.quantity,
    0
  );

  return (
    <main style={{ padding: 16 }}>
      <h1>Coșul tău</h1>
      {storageError && <p role="alert">Coșul nu poate fi salvat în browser.</p>}
      {items.length === 0 ? (
        <p>Coșul este gol. Adaugă produse din lista de produse.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: 12 }}>
                <strong>{item.descriere}</strong> — {currency.format(Number(item.pret) || 0)}{" "}
                <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Scade cantitatea pentru ${item.descriere}`}>−</button>{" "}
                <span aria-label="Cantitate">{item.quantity}</span>{" "}
                <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Crește cantitatea pentru ${item.descriere}`}>+</button>{" "}
                <button type="button" onClick={() => updateQuantity(item.id, -item.quantity)}>Elimină</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: {currency.format(total)}</strong></p>
          <button type="button" onClick={() => setItems([])}>Golește coșul</button>
        </>
      )}
    </main>
  );
}
