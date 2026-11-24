# TAPNOIR website

Static site: plain HTML + one stylesheet + one script. No build step — upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

| Page | File |
|---|---|
| Homepage | `index.html` |
| Collection — Noir & Blanc | `collection.html` |
| Product — Personalise | `product.html` (accepts `?finish=noir` or `?finish=blanc`) |
| Packages | `packages.html` |
| About — Philosophy | `about.html` |
| Contact & Enquiry | `contact.html` (accepts `?interest=business`, and the design from the personaliser) |
| Digital Profile (mobile) | `profile.html` |
| Design System (internal, `noindex`) | `design-system.html` |

Shared: `assets/styles.css`, `assets/main.js`.

Run locally: `python -m http.server 5173` from this folder, then open http://localhost:5173.

## Before going live — replace the placeholders

Search the project for `[` and replace:

- `[WHATSAPP NUMBER]` — international format, digits only, e.g. `447700900123` (used in `https://wa.me/…` links)
- `[yourname@gmail.com]`, `[INSTAGRAM HANDLE]`, `[@handle]`, `[City, Country]`, `[response time]`
- Product specs: `[To be announced]`, `[Size · thickness]`, `[Smart chip]`, `[Engraving method]`, `[Contents]`, `[Supported phones]`, `[delivery time]`
- About: founder quote and `[Founder name]`, `[Confirm method.]`, `[Adjust to your real process.]`
- FAQ / packages: lines marked `[Confirm]` or `[…]`
- `profile.html` is a template for a customer's profile: every `[…]` there is that customer's details. Point “Save contact” at a `.vcf` file.
- Privacy / Terms links currently go to `#`.

## The enquiry form

`contact.html` validates and shows the thank-you state, but **does not send the enquiry anywhere yet**. Connect it by defining `window.TAPNOIR_SUBMIT = function (data) { … }` (e.g. `fetch` to Formspree or your own endpoint), or add `action`/`method` to the form and remove the `preventDefault` in `assets/main.js`.
