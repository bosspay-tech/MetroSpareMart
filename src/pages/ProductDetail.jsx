import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { STORE_ID } from "../config/store";
import { useCartStore } from "../store/cart.store";
import toast from "react-hot-toast";

/* ---------- SKELETON ---------- */
function SkeletonDetail() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="h-105 bg-white/10" />
        </div>

        <div className="animate-pulse">
          <div className="h-7 w-2/3 rounded bg-white/10" />
          <div className="mt-4 h-4 w-full rounded bg-white/10" />
          <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
          <div className="mt-2 h-4 w-2/3 rounded bg-white/10" />
          <div className="mt-6 h-8 w-28 rounded bg-white/10" />
          <div className="mt-6 h-10 w-full rounded-2xl bg-white/10" />
          <div className="mt-3 h-10 w-full rounded-2xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL UI BITS ---------- */
function StarRow({ rating = 4.4, count = 128 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full || (i === full && half);
          return (
            <span
              key={i}
              className={filled ? "text-amber-400" : "text-slate-700"}
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="text-sm font-semibold text-slate-100">{rating}</span>
      <span className="text-sm text-slate-400">({count} reviews)</span>
    </div>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
      {items.map((it, idx) => (
        <div key={it.title}>
          <button
            type="button"
            onClick={() => setOpen(open === idx ? -1 : idx)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-white">{it.title}</span>
            <span className="text-cyan-300">{open === idx ? "−" : "+"}</span>
          </button>
          {open === idx ? (
            <div className="px-5 pb-5 text-sm leading-6 text-slate-200/80">
              {it.content}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [pincode, setPincode] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    let alive = true;

    const fetchProduct = async () => {
      setLoading(true);
      setErr("");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("store_id", STORE_ID)
        .single();

      if (!alive) return;

      if (error) {
        setErr(error.message || "Failed to load product.");
        setProduct(null);
      } else {
        setProduct(data);
        setSelectedVariant(null);
      }

      setLoading(false);
    };

    fetchProduct();
    return () => {
      alive = false;
    };
  }, [id]);

  const cartItem = items.find((it) => it.productId === product?.id);
  const qtyInCart = cartItem?.quantity ?? 0;

  const price = useMemo(() => {
    const p = selectedVariant?.price ?? product?.base_price ?? 0;
    return Number(p);
  }, [selectedVariant, product]);

  const handleAddToCart = () => {
    if (product?.is_active === false) return;

    addItem({
      productId: product.id,
      storeId: STORE_ID,
      title: product.title,
      price,
    });

    toast.success(
      qtyInCart > 0
        ? `Updated cart • ${qtyInCart + 1} in cart`
        : "Added to cart",
    );
  };

  const handleCheckPincode = () => {
    const ok = /^\d{6}$/.test(pincode.trim());
    setPinMsg(
      ok
        ? "✅ Delivery available • Estimated 2–5 days • Free shipping above ₹999"
        : "Enter a valid 6-digit pincode",
    );
  };

  if (loading) return <SkeletonDetail />;

  if (err) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
          {err}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            🧩
          </div>
          <h2 className="text-lg font-semibold text-white">
            Product not found
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            This item may no longer be available.
          </p>
        </div>
      </div>
    );
  }

  const inStock = product?.is_active !== false;

  return (
    <div className="min-h-[70vh] bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* BREADCRUMB */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link to="/products" className="hover:text-white">
            Products
          </Link>
          <span className="text-slate-700">/</span>
          <span className="font-semibold text-white line-clamp-1">
            {product.title}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
              <div className="relative">
                <div className="group relative aspect-4/5 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                    loading="lazy"
                  />

                  {/* gradient overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-black/30" />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-500/10 via-transparent to-violet-500/10" />

                  {/* badge */}
                  {product?.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950 shadow">
                      {product.badge}
                    </span>
                  ) : null}

                  {/* overlay chips */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
                        🧪 Tested
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
                        ⚡ Secure packed
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
                        ✅ RoHS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS STRIP */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { t: "GST Invoice", d: "Proper billing available" },
                { t: "Fast Dispatch", d: "Packed within 24–48 hrs" },
                { t: "Secure Packing", d: "Box + bubble wrap" },
              ].map((b) => (
                <div
                  key={b.t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-sm font-semibold text-white">{b.t}</div>
                  <div className="mt-1 text-xs text-slate-300">{b.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: BUY BOX */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {product.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <StarRow rating={4.4} count={128} />
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-semibold",
                      inStock
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border-white/10 bg-white/5 text-slate-400",
                    ].join(" ")}
                  >
                    {inStock ? "In stock" : "Out of stock"}
                  </span>
                </div>

                {product?.short_description ? (
                  <p className="mt-3 text-sm text-slate-200/80">
                    {product.short_description}
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-slate-200/80">
                    Reliable spare part for repair, service, and daily
                    maintenance - consistent fit, clean packaging, quick
                    dispatch.
                  </p>
                )}

                {/* PRICE */}
                <div className="mt-5 flex flex-wrap items-end gap-3">
                  <div className="text-3xl font-extrabold text-white">
                    ₹{price}
                  </div>

                  {product?.mrp ? (
                    <div className="pb-1 text-sm text-slate-500 line-through">
                      ₹{Number(product.mrp)}
                    </div>
                  ) : (
                    <div className="pb-1 text-sm text-slate-300">
                      Inclusive of taxes
                    </div>
                  )}

                  <span className="pb-1 text-sm font-semibold text-cyan-300">
                    {product?.mrp ? "Deal price" : "Best price"}
                  </span>
                </div>

                {/* PINCODE */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">
                    Check delivery
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                    />
                    <button
                      type="button"
                      onClick={handleCheckPincode}
                      className="shrink-0 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                      Check
                    </button>
                  </div>
                  {pinMsg ? (
                    <p className="mt-2 text-xs text-slate-200/80">{pinMsg}</p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-300">
                      COD may be available • Easy returns
                    </p>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={[
                      "w-full rounded-2xl px-6 py-3.5 text-sm font-semibold transition",
                      "focus:outline-none focus:ring-4",
                      !inStock
                        ? "cursor-not-allowed bg-white/10 text-slate-500"
                        : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 focus:ring-cyan-500/20",
                    ].join(" ")}
                  >
                    {!inStock
                      ? "Out of stock"
                      : qtyInCart > 0
                        ? `In cart: ${qtyInCart} • Add more`
                        : "Add to cart"}
                  </button>
                </div>

                {/* OFFERS */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white">
                    Offers for you
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200/80">
                    <li className="flex gap-2">
                      <span>🏷️</span> Bulk pricing available on select items
                    </li>
                    <li className="flex gap-2">
                      <span>🧾</span> GST invoice included
                    </li>
                    <li className="flex gap-2">
                      <span>🚚</span> Free shipping above ₹999 (dummy)
                    </li>
                  </ul>
                </div>
              </div>

              {/* DESCRIPTION + INFO */}
              <div className="mt-6">
                <Accordion
                  items={[
                    {
                      title: "Description",
                      content: product.description ? (
                        <p className="whitespace-pre-line">
                          {product.description}
                        </p>
                      ) : (
                        <p>
                          Precision spare part selected for dependable
                          performance in routine service and repairs.
                        </p>
                      ),
                    },
                    {
                      title: "Specifications",
                      content: (
                        <ul className="list-disc pl-5">
                          <li>
                            Category: {product?.category || "Vehicle Spares"}
                          </li>
                          <li>Part: {product?.title}</li>
                          <li>Quality: Fitment checked / verified (dummy)</li>
                          <li>Compatibility: Vehicle-specific (dummy)</li>
                        </ul>
                      ),
                    },
                    {
                      title: "Package & Handling",
                      content: (
                        <ul className="list-disc pl-5">
                          <li>Protective packaging</li>
                          <li>Secure bubble wrap packing</li>
                          <li>Labelled to avoid fitment mix-ups</li>
                        </ul>
                      ),
                    },
                    {
                      title: "Shipping & Returns",
                      content: (
                        <ul className="list-disc pl-5">
                          <li>Dispatch: within 24–48 hours (dummy)</li>
                          <li>Delivery: 2–5 business days (dummy)</li>
                          <li>Returns: As per spare parts policy</li>
                        </ul>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOT TRUST */}
        <div className="mt-10 flex flex-wrap gap-2 text-xs text-slate-300">
          {[
            "🔒 Secure payments",
            "⚡ Fast dispatch",
            "⚡ Secure packing",
            "✅ Quality checked",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
