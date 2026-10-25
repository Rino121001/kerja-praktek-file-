"use client";

import { formatRupiah } from "@/lib/data";

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="card p-10 text-center text-inkSoft">
        Belum ada produk. Minta admin menambahkan stok kripik dulu ya.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((p) => {
        const habis = p.stock <= 0;
        return (
          <div key={p.id} className="card p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-cream shrink-0"
                style={{ backgroundColor: p.color || "#EFA23E" }}
              >
                {p.name.charAt(0)}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  habis
                    ? "bg-chili/10 text-chili"
                    : p.stock <= 10
                    ? "bg-gold/20 text-gold-dark"
                    : "bg-leaf/10 text-leaf-dark"
                }`}
              >
                {habis ? "Stok habis" : `Stok ${p.stock}`}
              </span>
            </div>
            <div>
              <h3 className="font-display font-semibold text-ink leading-snug">{p.name}</h3>
              <p className="text-xs text-inkSoft">{p.category}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="font-display font-bold text-ink">{formatRupiah(p.price)}</span>
              <button
                onClick={() => onAdd(p)}
                disabled={habis}
                className="text-sm font-semibold px-3 py-2 rounded-lg bg-chili text-cream hover:bg-chili-dark disabled:bg-line disabled:text-inkSoft/60 transition-colors"
              >
                + Tambah
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
