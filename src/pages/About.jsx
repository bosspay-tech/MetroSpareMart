import { Link } from "react-router-dom";
import { BUSINESS } from "../config/business";

export default function About() {
  return (
    <main className="min-h-[70vh] bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              About Us
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {BUSINESS.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Metro Traders supplies vehicle spare parts and service essentials
              for workshops, fleet teams, and everyday repair needs. We focus on
              dependable stock, clear billing, careful packing, and practical
              support from our Ahmedabad office.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              >
                Shop spare parts
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <img
                src="/Metro Traders Logo.png"
                alt={`${BUSINESS.name} logo`}
                className="mx-auto h-28 w-auto object-contain"
              />
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                <div className="rounded-lg bg-slate-950/50 p-4">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    GST
                  </span>
                  <span className="mt-1 block font-semibold text-white">
                    {BUSINESS.gst}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-950/50 p-4">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    UDYAM REG
                  </span>
                  <span className="mt-1 block break-words font-semibold text-white">
                    {BUSINESS.udyam}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Reliable parts",
              text: "Parts and service items selected for routine repairs and replacement work.",
            },
            {
              title: "Business billing",
              text: "GST details are available for customers who need clean documentation.",
            },
            {
              title: "Responsive support",
              text: "Reach the team directly for product questions, stock checks, and order help.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-lg font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
