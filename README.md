# Razan Karaouni portfolio

Open `index.html` in a browser. No build step.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All the page content (text, sections, links) |
| `css/style.css` | All styling. Colours and fonts are the tokens at the top of `:root` |
| `medilab.html` | The MediLab 5-screens page (opens in a new tab from the MediLab card) |
| `js/main.js` | Mobile hamburger menu, "Copy email" button, certificates toggle |
| `js/security.js` | Redirects http:// to https:// and blocks the site from being framed |
| `js/logo.js` | The 3D RK logo |
| `js/vendor/three.min.js` | three.js r128 (MIT licence in `three.LICENSE.txt`), served from your own site |
| `img/` | Project and certificate images |
| `_headers` | Security headers for Netlify or Cloudflare Pages (GitHub Pages ignores it) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Images

| Where | File |
| --- | --- |
| Lahjetna card | `img/lahjetna.jpg` |
| MediLab card and its 5 screens | `img/medilab-1.png` to `img/medilab-5.png` |
| Custom To-Do List card | `img/custom-todo.jpg` |
| Certificates (click to open full size) | `img/certificate-1.jpg`, `certificate-2.jpg`, `certificate-3.jpg` |

To change an image, save the new file in `img/` and update its `src` (and `href` for certificates) in `index.html`.
Use JPG, PNG, WebP or SVG and keep each file under 300 KB.

## Contact

The Contact section has three buttons: Copy email, Message on LinkedIn, View my GitHub.
The email address is only in `js/main.js` (search for `razankaraouni25@gmail.com`); LinkedIn and GitHub links are in `index.html`.

## Deploying on GitHub Pages (HTTPS)

1. Push all files to your repository (keep `.nojekyll`).
2. Settings > Pages: choose the branch and folder, save.
3. Tick **Enforce HTTPS**. GitHub then redirects http:// to https:// at the server and gives the site a free certificate. `js/security.js` is a second safety net.
4. Open the live site with `http://` and confirm it jumps to `https://`.

## Security notes

- A Content-Security-Policy is set in `index.html`. Scripts and styles only load from your own files, plus Google Fonts for typography.
- No inline scripts, no inline styles, no `eval`, no `innerHTML`, no forms, no cookies, no tracking.
- External links use `rel="noopener noreferrer"`.
- three.js is included in the folder, so no third-party script runs on your page.
- The meta tag cannot set every protection. When you host the site, apply the headers in `_headers`
  (Netlify and Cloudflare Pages read that file automatically; on Apache or nginx copy the same headers into your server config).
  They add clickjacking protection (`frame-ancestors`), `nosniff` and HTTPS-only (HSTS).
- GitHub Pages cannot send custom headers, so clickjacking protection comes from `js/security.js`. For real headers, host on Netlify or Cloudflare Pages.
- Your email address is not shown on the page, only copied when a visitor presses the button, but it is in `js/main.js` in plain text.
- If you add a new external script, image host or font, add its address to the Content-Security-Policy, or the browser will block it.
