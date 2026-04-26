import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Demo App",
  description: "Sample app with Postgres-backed authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center gap-3 rounded-3xl px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-900">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                App
              </span>
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  My App
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tailwind menu
                </p>
              </div>
            </Link>

            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <Link
                href="/"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Blog
              </Link>
              <Link
                href="/products"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Products
              </Link>
              <Link
                href="/rendering"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Rendering
              </Link>
              <Link
                href="/signup"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Sign Up
              </Link>
              <Link
                href="/signin"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Sign In
              </Link>
              <Link
                href="/forgot-password"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                Forgot Password
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
