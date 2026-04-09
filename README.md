# Norrapat "Mo" Wongsawatpaisan — Portfolio

> **Simple execution, stunning results.**

A handcrafted personal portfolio built with zero frameworks. The design fuses nature-inspired aesthetics with circuit-board engineering visuals, reflecting a career that started with robot competitions and evolved into software engineering.

**Live:** [tongtengkung.github.io/portfolio](https://tongtengkung.github.io/portfolio/)

## Tech Stack

| Layer | Detail |
|-------|--------|
| HTML | Semantic HTML5, inline SVG illustrations, Open Graph meta |
| CSS | Custom properties, Grid, Flexbox, keyframe animations, mix-blend-mode compositing |
| JS | Vanilla ES6 with IntersectionObserver, RequestAnimationFrame |
| Fonts | Google Fonts — Inter, Space Grotesk, JetBrains Mono |

**Zero dependencies.** No npm, no bundler, no framework. Open `index.html` in any modern browser.

## Project Structure

```
portfolio/
├── index.html            # Single-page layout with all sections
├── css/
│   └── style.css         # Green nature theme, responsive breakpoints
├── js/
│   └── main.js           # Particles, scroll animations, skill spotlight, lightbox
├── Pics/                 # Photos and visual assets
│   ├── Profiles.jpg
│   ├── Tech_tree.jpg     # Circuit-board tree reference
│   ├── Tech_grass*.png   # Circuit grass decorations
│   ├── Background_White.png
│   └── ...               # Timeline and award photos
└── README.md
```

## Design Concept

The portfolio tells the story of an engineer who bridges hardware and software. Every visual element reinforces this theme.

**Circuit-board tree** in the "Life Beyond Code" section is hand-coded SVG with 150+ paths forming a dense tree silhouette. Parallel trace lines, junction rings, and endpoint dots recreate the look of a printed circuit board. Eight interactive fruit pods hang from the branches, each representing a personal value or career focus.

**Nature meets technology** throughout: the background tiles the `Background_White.png` pattern (circuit traces intertwined with green leaves) at varying scales per section. Circuit-grass illustrations anchor the tree. Orbiting rings around the profile photo pulse with subtle animation.

**Color palette** is rooted in New Zealand native bush greens:

```css
--green-main:      #2D6A4F
--green-light:     #52B788
--green-lighter:   #74C69D
--green-brightest: #D8F3DC
```

## Features

**Layout and animation:** firefly particle system, brick-reveal scroll animations via IntersectionObserver, morphing avatar border-radius, five concentric orbit rings, parallax hero, shimmer sweep effects on botanical backgrounds.

**Interactive elements:** manual skill spotlight carousel with detailed usage examples, award accordion with expand/collapse transitions, fruit-pod hover bounce animation, image lightbox with zoom-in effect and keyboard dismiss.

**Responsive design:** three breakpoints at 1024px, 768px, and 480px. The circuit tree collapses into a grid on tablet. Timeline switches from alternating two-column to single-column on mobile.

**Performance:** no external JS libraries, passive scroll listeners, IntersectionObserver for lazy animations, font preconnect hints. Total unminified size under 100KB (HTML + CSS + JS, excluding images).

## Sections

1. **Hero** — name, title, orbiting avatar, scroll indicator
2. **At a Glance** — bento grid of quick facts
3. **About** — personal narrative
4. **Skills & Technologies** — tabbed spotlight with real project examples
5. **Professional Journey** — alternating timeline with photos
6. **Awards & Activities** — accordion panels with embedded photos and lightbox
7. **Life Beyond Code** — SVG circuit tree with interactive fruit pods
8. **Contact** — fun fact, email CTA, social links

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Deploy portfolio"
git remote add origin https://github.com/Tongtengkung/portfolio.git
git branch -M main
git push -u origin main
```

Then go to **Settings > Pages > Source: main branch > Save**.

## License

MIT

---

Built by Norrapat "Mo" Wongsawatpaisan | Auckland, NZ | 2026
