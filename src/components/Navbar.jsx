import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { signOut } from "../features/auth/auth.service";
import { useCartStore } from "../store/cart.store";
import { BUSINESS } from "../config/business";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ to, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={(event) => {
        onNavigate?.(event);
      }}
      className={({ isActive }) =>
        cx(
          "rounded-lg px-3 py-2 text-sm font-semibold transition",
          "hover:bg-white/10 hover:text-white",
          isActive ? "bg-white/10 text-white" : "text-slate-300",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { user, loading } = useAuth();
  const items = useCartStore((s) => s.items);
  const [open, setOpen] = useState(false);

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + (it.qty ?? it.quantity ?? 1), 0),
    [items],
  );

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 text-slate-100 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 font-extrabold tracking-tight text-white hover:bg-white/5 sm:gap-3 sm:px-2"
          aria-label="Go to homepage"
        >
          <img
            src="/Metro Traders Logo.png"
            alt={`${BUSINESS.name} logo`}
            className="h-11 w-auto shrink-0 rounded-md object-contain sm:h-14"
          />
          <span className="max-w-[9rem] truncate text-sm font-black sm:max-w-none sm:text-lg">
            {BUSINESS.name}
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavItem to="/products" onNavigate={() => setOpen(false)}>Products</NavItem>
          <NavItem to="/about" onNavigate={() => setOpen(false)}>About</NavItem>
          <NavItem to="/contact" onNavigate={() => setOpen(false)}>Contact</NavItem>

          <NavItem to="/cart" onNavigate={() => setOpen(false)}>
            <span className="flex items-center gap-2">
              Cart
              <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-extrabold text-slate-950">
                {cartCount}
              </span>
            </span>
          </NavItem>

          {user ? (
            <>
              <NavItem to="/orders" onNavigate={() => setOpen(false)}>My Orders</NavItem>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" onNavigate={() => setOpen(false)}>Login</NavItem>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="relative rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            aria-label="Cart"
          >
            Cart
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[11px] font-extrabold text-slate-950">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div className={cx("md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto max-w-6xl border-t border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex flex-col gap-1">
            <NavItem to="/products" onNavigate={() => setOpen(false)}>Products</NavItem>
            <NavItem to="/about" onNavigate={() => setOpen(false)}>About</NavItem>
            <NavItem to="/contact" onNavigate={() => setOpen(false)}>Contact</NavItem>

            {user ? (
              <>
                <NavItem to="/orders" onNavigate={() => setOpen(false)}>My Orders</NavItem>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="mt-2 w-full rounded-lg bg-cyan-500 px-4 py-2 text-left text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login" onNavigate={() => setOpen(false)}>Login</NavItem>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full rounded-lg bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
                >
                  Sign up
                </Link>
              </>
            )}

            <p className="mt-3 text-xs text-slate-400">
              Secure checkout | Fast dispatch | Protective packing
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
