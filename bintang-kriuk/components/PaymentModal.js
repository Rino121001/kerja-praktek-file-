"use client";

import { useState } from "react";
import { formatRupiah, getSettings } from "@/lib/data";

export default function PaymentModal({ total, onClose, onConfirm }) {
  const [confirming, setConfirming] = useState(false);
  const settings = getSettings();

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => {
      onConfirm();
    }, 700);
  }

  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-paper rounded-2xl border-2 border-line max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-inkSoft hover:text-chili"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-center text-xs font-medium uppercase tracking-wide text-inkSoft mb-1">
          Total Pembayaran
        </p>
        <p className="text-center font-display font-bold text-3xl text-ink mb-5">
          {formatRupiah(total)}
        </p>

        <div className="bg-white border-2 border-line rounded-xl aspect-square flex items-center justify-center overflow-hidden mb-4">
          {settings.qrisImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.qrisImage} alt="QRIS Bintang Kriuk" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-inkSoft text-sm px-6">
              QRIS belum diunggah. Minta admin menambahkan gambar QRIS di menu Pengaturan QRIS.
            </div>
          )}
        </div>

        <p className="text-center text-xs text-inkSoft mb-5">
          Minta pembeli memindai kode QRIS di atas menggunakan aplikasi bank / e-wallet.
        </p>

        <button onClick={handleConfirm} disabled={confirming} className="btn-primary w-full text-center">
          {confirming ? "Menyimpan transaksi..." : "Pembayaran Diterima"}
        </button>
        <button onClick={onClose} className="btn-secondary w-full text-center mt-2">
          Batalkan
        </button>
      </div>
    </div>
  );
}
