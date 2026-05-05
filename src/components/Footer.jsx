import { Link } from "react-router-dom";
import {
  BUSINESS,
  BUSINESS_EMAIL_HREF,
  BUSINESS_PHONE_HREF,
} from "../config/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg px-1 py-1 font-extrabold tracking-tight text-white hover:bg-white/5"
              aria-label="Go to homepage"
            >
              <img
                src="/Metro Traders Logo.png"
                alt={`${BUSINESS.name} logo`}
                className="h-14 w-auto rounded-md object-contain"
              />
              <span className="text-lg font-black">{BUSINESS.name}</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Vehicle spare parts, workshop essentials, GST billing, secure
              packing, and dependable support from Ahmedabad.
            </p>

            <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Registered Office
              </div>
              <address className="mt-2 not-italic text-sm leading-6 text-slate-300">
                <strong className="text-white">{BUSINESS.name}</strong>
                <br />
                {BUSINESS.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>

              <div className="mt-4 grid gap-2 text-sm text-slate-300">
                <a
                  href={BUSINESS_PHONE_HREF}
                  className="font-semibold text-white hover:text-cyan-300"
                >
                  MOB: {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS_EMAIL_HREF}
                  className="break-words font-semibold text-white hover:text-cyan-300"
                >
                  Mail: {BUSINESS.email}
                </a>
                <span>GST: {BUSINESS.gst}</span>
                <span>UDYAM REG: {BUSINESS.udyam}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-bold text-white">Shop</h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/products">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/orders">
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Support</h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/contact">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/shipping">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-300 hover:text-white"
                      to="/returns-refunds"
                    >
                      Returns & Refunds
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Company</h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link className="text-slate-300 hover:text-white" to="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-300 hover:text-white"
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-300 hover:text-white"
                      to="/terms-of-service"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { t: "GST invoice", d: "Business-ready billing" },
                { t: "Fast dispatch", d: "Careful packing support" },
                { t: "Verified stock", d: "Parts for regular service" },
              ].map((item) => (
                <div
                  key={item.t}
                  className="rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-sm font-semibold text-white">{item.t}</div>
                  <div className="mt-1 text-xs text-slate-300">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            Copyright {year} {BUSINESS.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <Link className="hover:text-white" to="/privacy-policy">
              Privacy
            </Link>
            <span className="text-slate-700">|</span>
            <Link className="hover:text-white" to="/terms-of-service">
              Terms
            </Link>
            <span className="text-slate-700">|</span>
            <Link className="hover:text-white" to="/returns-refunds">
              Returns
            </Link>
            <span className="text-slate-700">|</span>
            <Link className="hover:text-white" to="/shipping">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
