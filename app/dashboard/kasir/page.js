"use client";

import { useEffect, useState } from "react";
import { getProducts, addSale, getSession, formatRupiah } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import CartPanel from "@/components/CartPanel";
import PaymentModal from "@/components/PaymentModal";

export default function KasirPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function refreshProducts() {
    setProducts(getProducts());
  }

  function handleAdd(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      const currentQty = existing ? existing.qty : 0;
      if (currentQty >= product.stock) return prev;
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  }

  function handleQtyChange(productId, qty) {
    const product = products.find((p) => p.id === productId);
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    if (product && qty > product.stock) return;
    setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, qty } : i)));
  }

  function handleRemove(productId) {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }

  function handleConfirmPayment() {
    const session = getSession();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const sale = addSale({
      items: cart,
      total,
      cashier: session?.name || "Kasir",
      channel: "Kasir Toko",
      paymentMethod: "QRIS",
      status: "Lunas",
    });
    setReceipt(sale);
    setCart([]);
    setShowPayment(false);
    refreshProducts();
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kasir</h1>
          <p className="text-inkSoft text-sm">Pilih kripik, cek stok, lalu proses pembayaran QRIS.</p>
        </div>
        <input
          className="input-field max-w-xs"
          placeholder="Cari kripik..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <ProductGrid products={filteredProducts} onAdd={handleAdd} />
        <CartPanel
          cart={cart}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onCheckout={() => setShowPayment(true)}
        />
      </div>

      {showPayment && (
        <PaymentModal total={total} onClose={() => setShowPayment(false)} onConfirm={handleConfirmPayment} />
      )}

      {receipt && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-paper rounded-2xl border-2 border-line max-w-sm w-full p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-leaf/15 text-leaf-dark flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-1">Transaksi Berhasil</h3>
            <p className="text-inkSoft text-sm mb-4">No. {receipt.id}</p>
            <div className="text-left bg-cream rounded-xl p-4 mb-4 space-y-1 max-h-40 overflow-y-auto">
              {receipt.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-ink">{item.qty}x {item.name}</span>
                  <span className="text-inkSoft">{formatRupiah(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-display font-bold text-ink mb-5">
              <span>Total</span>
              <span>{formatRupiah(receipt.total)}</span>
            </div>
            <button onClick={() => setReceipt(null)} className="btn-primary w-full text-center">
              Transaksi Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
