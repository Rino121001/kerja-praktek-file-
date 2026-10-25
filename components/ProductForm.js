"use client";

import { useState } from "react";

const COLOR_OPTIONS = ["#D6402A", "#EFA23E", "#F0C94A", "#5B7F3A", "#8B3A2B", "#C97F26", "#A62E1C", "#42602A"];

export default function ProductForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [stock, setStock] = useState(initial?.stock ?? "");
  const [color, setColor] = useState(initial?.color || COLOR_OPTIONS[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !category.trim() || price === "" || stock === "") return;
    onSave({
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      stock: Number(stock),
      color,
    });
  }

  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <form onSubmit={handleSubmit} className="bg-paper rounded-2xl border-2 border-line max-w-md w-full p-6">
        <h3 className="font-display text-xl font-bold text-ink mb-5">
          {initial ? "Edit Produk" : "Tambah Produk Baru"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="label-field">Nama Produk</label>
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Keripik Singkong Original" required />
          </div>
          <div>
            <label className="label-field">Kategori</label>
            <input className="input-field" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Singkong" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Harga (Rp)</label>
              <input className="input-field" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="12000" required />
            </div>
            <div>
              <label className="label-field">Stok</label>
              <input className="input-field" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="40" required />
            </div>
          </div>
          <div>
            <label className="label-field">Warna Label</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-ink" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onCancel} className="btn-secondary flex-1 text-center">
            Batal
          </button>
          <button type="submit" className="btn-primary flex-1 text-center">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
