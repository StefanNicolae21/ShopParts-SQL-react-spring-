import React, { useState } from "react";
import "./AddForm.css";
import { createProduct } from "../api/products";

export default function AddForm() {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const description = String(formData.get("descriere") || "").trim();
    const price = Number(formData.get("pret"));
    const typeId = Number(formData.get("tipID"));
    const categoryId = Number(formData.get("categorieID"));

    if (!description || !Number.isFinite(price) || price < 0 || !typeId || !categoryId) {
      setStatus("Completează corect toate câmpurile obligatorii.");
      return;
    }

    const payload = {
      descriere: description,
      pret: price,
      tipID: typeId,
      categorieID: categoryId,
      data_Adaugarii: formData.get("data_Adaugarii"),
    };

    setSaving(true);
    setStatus("");
    try {
      const created = await createProduct(payload);
      setStatus(`Produs adăugat${created && created.id ? ` (#${created.id})` : ""} ✅`);
      form.reset();
    } catch (error) {
      setStatus("Produsul nu a putut fi adăugat. Verifică dacă serverul API este pornit.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="contact-form">
      <h3 className="admin">Only admin is allowed to enter data here !! 🥳</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label" htmlFor="descriere">Denumire produs</label>
          <input id="descriere" className="form-element" type="text" name="descriere" placeholder="Ex: Disc frana" required />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="pret">Preț (RON)</label>
          <input id="pret" className="form-element" type="number" step="0.01" min="0" name="pret" required />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="tipID">Tipul produsului</label>
          <select id="tipID" name="tipID" required defaultValue="">
            <option value="" disabled>Selectează un tip</option>
            <option value="1">1. Electric</option>
            <option value="2">2. Mecanic</option>
          </select>
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="categorieID">Categorie</label>
          <select id="categorieID" name="categorieID" required defaultValue="">
            <option value="" disabled>Selectează o categorie</option>
            <option value="1">1. Sistem de franare</option>
            <option value="2">2. Sistem de ungere</option>
            <option value="3">3. Sistem de iluminare</option>
            <option value="4">4. Sistem de directie</option>
            <option value="5">5. Sistem de angrenare</option>
            <option value="6">6. Elemente de caroserie</option>
            <option value="7">7. Elemente electrice</option>
          </select>
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="data_Adaugarii">Data adăugării</label>
          <input id="data_Adaugarii" className="form-element" type="datetime-local" name="data_Adaugarii" required />
        </div>
        <div className="form-row">
          <button type="submit" className="form-button" disabled={saving}>{saving ? "Se salvează…" : "Adaugă produs"}</button>
          <p id="status" role="status" aria-live="polite">{status}</p>
        </div>
      </form>
    </div>
  );
}
