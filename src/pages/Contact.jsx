import {
  BUSINESS,
  BUSINESS_EMAIL_HREF,
  BUSINESS_PHONE_HREF,
} from "../config/business";

export default function Contact() {
  return (
    <main className="min-h-[70vh] bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
              {BUSINESS.name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              For spare part availability, billing, order support, or delivery
              questions, contact the Metro Traders team.
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Address
              </div>
              <address className="mt-3 not-italic text-sm leading-6 text-slate-300">
                <strong className="text-white">{BUSINESS.name}</strong>
                <br />
                {BUSINESS.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>

              <div className="mt-5 grid gap-3 text-sm">
                <a
                  href={BUSINESS_PHONE_HREF}
                  className="rounded-lg bg-cyan-500 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Call {BUSINESS.phone}
                </a>
                <a
                  href={BUSINESS_EMAIL_HREF}
                  className="break-words rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label="MOB" value={BUSINESS.phone} />
                <Info label="Mail" value={BUSINESS.email} />
                <Info label="GST" value={BUSINESS.gst} />
                <Info label="UDYAM REG" value={BUSINESS.udyam} />
              </div>

              <form className="mt-6 grid gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                />
                <textarea
                  rows="5"
                  placeholder="Tell us what spare part you need"
                  className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                />
                <button
                  type="button"
                  className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                  onClick={() => alert("Info submitted")}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-950/50 p-4">
      <span className="block text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className="mt-1 block break-words text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
