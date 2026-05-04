import React from "react";

export default function About() {
  return (
    <div className="min-h-[70vh] bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
            About Us
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            METRO SPARE MART
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            We believe in delivering quality vehicle spare parts, service essentials, and maintenance items directly to your doorstep. With a focus on customer satisfaction and dependable products, we aim to make your shopping experience seamless and secure.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
              🎯
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Our Mission</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              To provide a curated selection of premium vehicle spare parts with transparent pricing and fast delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
              💎
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Quality First</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Every spare part in our catalog is carefully selected to help you receive dependable items for repairs and maintenance.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl">
              🤝
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Customer Support</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              We are dedicated to providing excellent customer service. Our team is always ready to assist you with any inquiries.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-black/20 border border-white/10 px-6 py-12 sm:p-16 backdrop-blur">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-300">
              Discover our collection of premium vehicle spare parts today.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="/products"
                className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              >
                Shop Now
              </a>
              <a href="/contact" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white">
                Contact Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
