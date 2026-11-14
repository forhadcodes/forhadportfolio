# Md Forhad Hussain | Developer Portfolio

Personal portfolio for a Full Stack Developer (MERN), built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**.

![Portfolio home page](docs/home.png)
<!-- Add a screenshot of your finished portfolio at docs/home.png -->

## Features

- Sections: Hero, About, Skills, Projects, Experience / Education, Contact, Footer
- Dark-first theme with a polished light theme (`next-themes`, no flash on load, preference saved)
- Project cards plus a dynamic case-study page for every project (`/projects/[slug]`)
- Working contact form (Resend), with validation, toasts, a honeypot field and basic rate limiting
- Fully responsive, keyboard accessible, AA-contrast colours, respects "reduce motion"
- SEO: metadata API, Open Graph and Twitter images, `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema
- Skeleton loaders and a custom 404 page
- All content lives in `src/data/*`, nothing is hard-coded inside components

## Project structure

```
src/
  app/                 routes, layout, SEO files, /api/contact
  components/
    sections/          Hero, About, Skills, Projects, Experience, Contact
    ui/                Button, ProjectCard, ContactForm, ThemeToggle, ...
  data/                profile.ts, skills.ts, projects.ts, timeline.ts  <- edit these
  lib/                 helpers (site URL, resume check, OG image)
  types/               shared TypeScript types
public/
  images/profile.jpg   your photo
  projects/            project screenshots (<slug>-1.png ... -3.png)
  resume.pdf           downloadable resume
scripts/
  capture-screenshots.mjs
```

## Run locally

```bash
nnpm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Useful scripts: `npm run build`, `npm start`, `npm run typecheck`.

## Make it yours: checklist

1. **StudioSpace links**: open `src/data/projects.ts` and set `liveUrl` and `githubLinks` for StudioSpace. The buttons appear automatically once they are set.
2. **Screenshots**: real screenshots are already in place — see [Screenshots](#screenshots) below. To re-capture them from a live deployment:
   ```bash
   npx playwright install chromium     # first time only
   npm run screenshots                  # BazarDor
   STUDIOSPACE_URL=https://your-live-url npm run screenshots
   ```
   Or save your own 1440x900 PNGs with the same names.
3. **Resume**: `public/resume.pdf` is a starter generated from this portfolio's content. Replace it with your real resume (same file name). If the file is missing, the Download buttons hide themselves.
4. **Contact form**: see below.
5. **Colours**: change `--brand-primary` and `--brand-accent` at the top of `src/app/globals.css`.
6. **Education / experience**: keep `src/data/timeline.ts` identical to your resume.

## Screenshots

Project screenshots live in `public/projects/` (`<slug>-1` … `-3`) and are referenced from `src/data/projects.ts`. The original photo folders are kept in `public/` as backups:

| File in `public/projects/` | Source photo |
| --- | --- |
| `bazardor-1.png` | `public/Bazardor/Bazar-dor Home page.png` |
| `bazardor-2.png` | `public/Bazardor/Bazar-dor product details page.png` |
| `bazardor-3.jpg` | `public/Bazardor/image_a3d080f8.jpg` |
| `studiospace-1.png` | `public/Studiospace/Studiospace banner and navbar sec.png` |
| `studiospace-2.png` | `public/Studiospace/Explore Studio.png` |
| `studiospace-3.png` | `public/Studiospace/My booking.png` |

`public/Studiospace/Add studio.png` is kept as a spare and is not used on the site.

## Contact form setup (Resend)

1. Create a free account at <https://resend.com> and create an API key.
2. Put it in `.env.local`:
   ```
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=sumon639424@gmail.com
   CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
   ```
3. `onboarding@resend.dev` works for testing (Resend only delivers it to your own account email). To send from your own domain, verify the domain in Resend and update `CONTACT_FROM_EMAIL`.

Until it is configured, the form shows a friendly error and the page still offers a direct email link.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. On <https://vercel.com/new>, import the repository (framework is detected as Next.js).
3. Under **Environment Variables** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` (your final URL, e.g. `https://forhadhussain.dev`).
4. Deploy. Every push to `main` redeploys automatically.

### Custom domain

1. Buy a domain (e.g. `forhadhussain.dev`).
2. Vercel project, **Settings, Domains, Add**, then enter the domain.
3. Add the DNS records Vercel shows at your registrar and wait for them to verify.
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy so the sitemap and social previews use it.

## Final checklist

- [ ] Every project has a live link that works
- [ ] README on each project repo, with screenshots
- [ ] Resume matches the portfolio
- [ ] Mobile view tested (375px, 768px, 1280px+)
- [ ] Lighthouse run (target 90+ on all four scores)
- [ ] Pinned repos on GitHub, portfolio link added to LinkedIn
