import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* ---------- DATA ---------- */

const HERO_BANNERS = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop",
];

const COLLECTIONS = [
  {
    title: "Brake System",
    desc: "Pads, discs, shoes, drums, and hydraulic essentials",
    tag: "brakes",
    badge: "Popular",
    imageUrl:
      "https://images.unsplash.com/photo-1763836393379-68f9721966ee?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Engine Components",
    desc: "Belts, plugs, mounts, gaskets, and service spares",
    tag: "engine",
    badge: "Popular",
    imageUrl:
      "https://images.unsplash.com/photo-1767340077961-105c33d63feb?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Filters & Fluids",
    desc: "Oil filters, air filters, coolant, and brake fluids",
    tag: "filters",
    badge: "Popular",
    imageUrl:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Suspension",
    desc: "Shock absorbers, struts, arms, bushes, and links",
    tag: "suspension",
    badge: "Hot",
    imageUrl:
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Electrical",
    desc: "Batteries, alternators, starters, wiring, and relays",
    tag: "electrical",
    badge: "Hot",
    imageUrl:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=870&auto=format&fit=crop",
  },
  {
    title: "Tires & Wheels",
    desc: "Tyres, alloy wheels, valves, caps, and wheel service parts",
    tag: "wheels",
    badge: "Stocked",
    imageUrl:
      "https://images.unsplash.com/photo-1760836395804-46d2556c07a7?q=80&w=870&auto=format&fit=crop",
  },
];

const TYPE_DATA = [
  { type: "Brake System" },
  { type: "Engine Components" },
  { type: "Filters & Fluids" },
  { type: "Suspension" },
  { type: "Electrical" },
  { type: "Transmission" },
  { type: "Cooling System" },
  { type: "Body & Lighting" },
  { type: "Tires & Wheels" },
  { type: "Interior Accessories" },
];

/* ---------- PAGE ---------- */

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO SLIDER */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="h-64 w-full sm:h-80 md:h-[32rem] lg:h-[36rem]"
        >
          {HERO_BANNERS.map((src, idx) => (
            <SwiperSlide key={src}>
              <div className="relative h-full w-full">
                <img
                  src={src}
                  alt={`Hero banner ${idx + 1}`}
                  className="h-full w-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />

                {/* dark overlay + subtle tech gradient */}
                <div className="pointer-events-none absolute inset-0 bg-black/55" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-cyan-500/10 via-transparent to-violet-500/10" />

                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-6xl px-12 sm:px-16 md:px-6">
                    <div className="max-w-xl">
                      <p className="mb-2 text-sm font-semibold tracking-wide text-slate-200/90">
                        Brake parts • Engine spares • Filters • Lights
                      </p>

                      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Vehicle spare parts for every repair.
                      </h2>

                      <p className="mt-3 max-w-lg text-sm text-slate-200/80">
                        Genuine spares, fast dispatch, and everything you need
                        to keep vehicles running smoothly.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          to="/products"
                          className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
                        >
                          Shop spare parts
                        </Link>

                        <Link
                          to="/products/?category=brakes"
                          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/10"
                        >
                          Browse brakes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-950 to-transparent" />
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
          <TrustItem
            title="Genuine spare parts"
            desc="Quality checked inventory."
            icon="✅"
          />
          <TrustItem
            title="Fast dispatch"
            desc="Quick packing & shipping."
            icon="⚡"
          />
          <TrustItem
            title="Secure payments"
            desc="Safe checkout & invoices."
            icon="🔒"
          />
        </div>
      </section>

      {/* SHOP BY TYPE (your specific data) */}
      <section className="bg-linear-to-b from-slate-950 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Shop by type
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Jump straight into the parts you need.
              </p>
            </div>

            <Link
              to="/products"
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {TYPE_DATA.map((t) => (
              <TypeCard key={t.type} type={t.type} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="bg-linear-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Featured collections
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Curated categories for fast shopping.
              </p>
            </div>

            <Link
              to="/products"
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              View all products →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <CollectionCard
                key={c.tag}
                title={c.title}
                desc={c.desc}
                tag={c.tag}
                badge={c.badge}
                imageUrl={c.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TECH HERO */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100">
              ⚙️ Spares for every service
            </span>

            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Repair, replace, drive - faster.
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-200/75">
              From brake pads to filters and lighting, find the parts that keep
              vehicles reliable and maintenance simple.
            </p>

            <div className="mt-7">
              <Link
                to="/products"
                className="inline-flex rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:ring-4 focus:ring-cyan-500/30"
              >
                Explore catalog
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PreviewCard title="Brake Kits" subtitle="Pads, discs, shoes" />
            <PreviewCard title="Filters" subtitle="Air, oil, fuel, cabin" />
            <PreviewCard
              title="Lighting"
              subtitle="Headlamps, bulbs, indicators"
            />
            <PreviewCard title="Fast Dispatch" subtitle="Packed with care" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-linear-to-r from-slate-900 via-slate-900 to-slate-800 px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold">Need parts for a vehicle?</h3>
                <p className="mt-1 text-sm text-slate-200/75">
                  Browse brakes, filters, engine spares, lighting, and more.
                </p>
              </div>

              <Link
                to="/products"
                className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function PreviewCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-slate-200/70">{subtitle}</p>
    </div>
  );
}

function TrustItem({ title, desc, icon }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        <span>{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-200/70">{desc}</p>
      </div>
    </div>
  );
}

function TypeCard({ type }) {
  const icon = getTypeIcon(type);

  return (
    <Link
      to={`/products/?type=${encodeURIComponent(type)}`}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-500/10 text-lg">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{type}</p>
          <p className="mt-0.5 text-xs text-slate-200/70">Browse →</p>
        </div>
      </div>
    </Link>
  );
}

function CollectionCard({ title, desc, tag, badge, imageUrl }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
      <div className="relative h-44">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/60" />

        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950">
          {badge}
        </span>
      </div>

      <div className="p-5">
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-200/70">{desc}</p>

        <Link
          to={`/products/?type=${encodeURIComponent(tag)}`}
          className="mt-4 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
        >
          Shop collection →
        </Link>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function getTypeIcon(type) {
  const t = String(type || "").toLowerCase();
  if (t.includes("brake")) return "BR";
  if (t.includes("engine")) return "EN";
  if (t.includes("filter")) return "FL";
  if (t.includes("suspension")) return "SU";
  if (t.includes("electrical")) return "EL";
  if (t.includes("transmission")) return "TR";
  if (t.includes("cooling")) return "CO";
  if (t.includes("lighting")) return "LT";
  if (t.includes("wheel")) return "WH";
  if (t.includes("accessories")) return "IN";
  return "SP";
}
