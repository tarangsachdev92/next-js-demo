"use client";
import Link from "next/link";

// export const dynamic = "force-static";

// async function getContactInfo() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to load contact info");
//   }

//   return res.json();
// }

export default async function ContactPage() {
  // const contact = await getContactInfo();
  const contact = {name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", company: {name: "Example Inc."}  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Contact Us
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            This page is rendered on the server for every request using a live API.
            It loads contact info dynamically from a remote service.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm dark:bg-slate-950">
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Contact owner
              </h2>
              <p className="text-slate-600 dark:text-slate-300">{contact.name}</p>
              <p className="text-slate-600 dark:text-slate-300">{contact.email}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 shadow-sm dark:bg-slate-950">
              <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                Phone
              </h2>
              <p className="text-slate-600 dark:text-slate-300">{contact.phone}</p>
              <p className="text-slate-500 dark:text-slate-400">{contact.company?.name}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Send a message
          </h2>
          <form className="grid gap-4">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Name</span>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span>Message</span>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
