# ShadowTechX — Static Website (GitHub Pages)

Fully static frontend website. No backend, no server, no build step.

## Architecture

```
GitHub Pages (static hosting)
        ↓
Static multi-page frontend organized by page
        ↓
index.html (intro) · pages/html/home/home.html · pages/html/work/work.html
        ↓
Project inquiry form
        ↓
EmailJS (browser SDK, loaded from CDN)
        ↓
Business email inbox
```

The project inquiry form sends enquiries **directly from the browser** through
the existing EmailJS integration. This website update adds static frontend
pages and does not change the backend or the form service configuration.

## Page structure

```text
pages/
├── html/
│   ├── home/home.html
│   ├── work/work.html
│   └── <page-name>/<page-name>.html
├── css/
│   └── <page-name>/<page-name>.css
└── js/
    └── <page-name>/<page-name>.js
```

Each page has its own HTML, CSS entry point, and JavaScript entry point.
Page-specific CSS imports the page's styles from the shared root `css/` and
root stylesheets. Page JavaScript imports the shared navigation and any
page-specific behavior.

Styles and interactions shared by the homepage and consultation page live in
`pages/css/shared/shared.css` and `pages/js/shared/shared.js`.

`index.html` remains the root intro screen required by GitHub Pages and links
to `pages/html/home/home.html`. The homepage formerly named `index1.html` is
now `pages/html/home/home.html`; the portfolio formerly named `index2.html` is
now `pages/html/work/work.html`.
The consultation form is at `pages/html/contact/contact.html` and retains its
EmailJS submission flow.

Shared assets such as `images/`, root `css/`, root `js/`, and root-level scripts
remain in place. Nested HTML pages set a base URL to the repository root so
existing image, internal page, and shared asset links resolve correctly.

## Page imagery

The non-homepage hero backgrounds and supporting service/editorial images use
direct Unsplash image URLs. Hero image assignments and overlays are maintained
in `css/brand-pages.css`; the Work page hero is in `style2.css`. The URLs are
remote, so visitors need an internet connection to load them. Existing project
screenshots remain local in `images/`.

Image source URLs:

| Image use | Unsplash URL |
|---|---|
| About / team collaboration | `https://images.unsplash.com/photo-1521737711867-e3b97375f902` |
| Studio and desktop workspace | `https://images.unsplash.com/photo-1498050108023-c5249f4df085` |
| Insights / technology concept | `https://images.unsplash.com/photo-1451187580459-43490279c0fa` |
| Client collaboration | `https://images.unsplash.com/photo-1556761175-b413da4baf72` |
| Consultation / communication | `https://images.unsplash.com/photo-1516321318423-f06f85e504b3` |
| Privacy documents | `https://images.unsplash.com/photo-1450101499163-c8848c66ca85` |
| Terms and planning notes | `https://images.unsplash.com/photo-1455390582262-044cdead277a` |
| Web development | `https://images.unsplash.com/photo-1555066931-4365d14bab8c` |
| Mobile apps | `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9` |
| Custom software / dashboards | `https://images.unsplash.com/photo-1460925895917-afdab827c52f` |
| E-commerce | `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d` |
| Applied AI | `https://images.unsplash.com/photo-1677442136019-21780ecad995` |
| Work portfolio hero | `https://images.unsplash.com/photo-1545239351-1141bd82e8a6` |

## EmailJS Setup (required before the form works)

All three values are **frontend-safe** (they are public by design — EmailJS
secures the actual email account on its servers). Never put a Gmail/SMTP
password or any private credential in this repository.

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → add your email service → copy the **Service ID**.
3. **Email Templates** → create a template:
   - **Subject:** `New Shadow Techx Project Inquiry`
   - **Body:**
     ```
     New Shadow Techx Project Inquiry

     Full Name:
     {{name}}

     Professional Email:
     {{email}}

     Phone:
     {{phone}}

     Project Details:
     {{message}}

     Submitted:
     {{time}}
     ```
4. **Account → API Keys** → copy the **Public Key**.
5. Configure the existing `EMAILJS_CONFIG` values in
   `pages/js/shared/shared.js` for your
   EmailJS service, template, and public key. These are frontend credentials;
   never add a private email or SMTP password.

   ```js
   const EMAILJS_CONFIG = {
       serviceId:  'YOUR_EMAILJS_SERVICE_ID',
       templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
       publicKey:  'YOUR_EMAILJS_PUBLIC_KEY'
   };
   ```

Template variables must match the keys sent in `pages/js/shared/shared.js`:
`name`, `email`, `phone`, `message`, and `time`. The project or product name
is included at the start of `message`.

## Deployment (GitHub Pages)

Deployment is automated via `.github/workflows/static.yml` — every push to
`main` publishes the repository root to GitHub Pages. No configuration or
build step is needed.

## Security Notes

- Only EmailJS **Service ID / Template ID / Public Key** are used in the frontend.
- No SMTP, Gmail, or API credentials are stored in any frontend file.
- Environment files (`.env`) are git-ignored and must never be committed.

---

© 2026 Shadow Techx — Authors: Ruman Jyoti Sarmah & Amlan Phukon
