import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", notes: "" });

  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckedOut(true);
    toast.success("Order placed! We will confirm by email shortly.");
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setCheckedOut(false), 300);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={handleClose} />
      )}

      <div className={
        "fixed top-0 right-0 h-full w-full sm:w-96 bg-card-dark z-50 flex flex-col transition-transform duration-300 shadow-2xl " +
        (isOpen ? "translate-x-0" : "translate-x-full")
      }>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="font-serif text-xl text-white">Your Order</h2>
            <p className="text-white/50 text-xs mt-0.5">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={handleClose} className="text-white/50 hover:text-white text-2xl leading-none transition-colors">×</button>
        </div>

        {checkedOut ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mb-6">✅</div>
            <h3 className="font-serif text-2xl text-white mb-3">Order Placed!</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-2">
              Thank you, {form.name.split(" ")[0]}! Your order has been received.
            </p>
            <p className="text-white/40 text-xs mb-8">A confirmation will be sent to {form.email}</p>
            <button
              onClick={() => { clearCart(); handleClose(); }}
              className="btn-gold text-sm py-2.5 px-6"
            >
              Done
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-6xl mb-4">🍽️</span>
            <h3 className="font-serif text-xl text-white mb-2">Your cart is empty</h3>
            <p className="text-white/50 text-sm mb-6">Add some delicious dishes from our menu</p>
            <button onClick={handleClose} className="btn-outline text-sm py-2.5 px-6">
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-dark/50 rounded-2xl p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium leading-snug truncate">{item.name}</p>
                    <p className="text-gold text-sm font-semibold mt-0.5">£{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-white/30 hover:text-red-400 text-xs transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">Subtotal</span>
                <span className="text-white font-semibold">£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">Service (12.5%)</span>
                <span className="text-white font-semibold">£{(totalPrice * 0.125).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-3">
                <span className="text-white font-bold">Total</span>
                <span className="text-gold font-bold text-lg">£{(totalPrice * 1.125).toFixed(2)}</span>
              </div>

              <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name *"
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="Your email *"
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Allergies or special requests..."
                  className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
                />
                <button type="submit" className="w-full btn-gold py-3 text-sm font-semibold">
                  Place Order →
                </button>
              </form>

              <button
                onClick={clearCart}
                className="w-full text-white/30 hover:text-white/60 text-xs transition-colors text-center"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}