# Jayesh Gour — Portfolio

Dark, technical, multi-page personal portfolio. Plain HTML/CSS/JS — no build step, no framework.

## Structure

```
portfolio/
├── index.html              # Home
├── about.html               # About, education, journey, achievements
├── projects.html            # All projects, tiered
├── contact.html              # Contact info + form
├── projects/
│   ├── momentum-ai.html      # Project detail page
│   └── talkright.html        # Project detail page
├── css/style.css
├── js/script.js
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Adding a new project

1. Add a card to `projects.html` (copy an existing `.project-card` block).
2. If it deserves a full detail page, copy `projects/talkright.html` as a template and update the content.
3. Update `sitemap.xml` if you add a new page.

## Deploying (GitHub Pages)

1. Push this folder as the root of a new repo (e.g. `jayesh-gour.github.io` for a root domain, or any repo name + enable Pages).
2. In the repo: **Settings → Pages → Deploy from branch → main → / (root)**.
3. Site goes live at `https://jayesh-gour.github.io` (or `https://jayesh-gour.github.io/<repo-name>/` if not using the special repo name).
4. Update `sitemap.xml` and `robots.txt` with your actual live URL once deployed.

## Enabling the contact form

The form validates client-side but won't actually send anywhere until you connect it:

1. Go to [formspree.io](https://formspree.io), sign up free, create a form.
2. Copy your form ID.
3. In `contact.html`, replace `YOUR_FORM_ID` in the `<form action="...">` line with it.

## Notes

- No contact-form submissions are faked — until Formspree is connected, submitting shows a clear message instead of pretending to send.
- FitSpark and AI Job Market EDA link straight to GitHub (no live deploy / no dedicated detail page yet) — add detail pages the same way as Momentum AI / TalkRight if you deploy them later.
- Prescripto wasn't included — no repo link was provided. Add it as a Tier 2 card in `projects.html` if you want it in.
