# Portfolio (localllm)

Stack: Vite 5 + React 18 + TypeScript + Tailwind CSS 3 + `motion` (motion/react) + React Three Fiber / three.js. Deployed to GitHub Pages under `/portfolio/` via `npm run deploy`.

- **React 18 pins `@react-three/fiber` to v8**; v9 requires React 19.
- **Motion tuning** lives in `src/components/motion/motionConfig.ts`; add new durations, distances and 3D settings there rather than inline.
- **Heavy effects** (WebGL, blur, tilt) run only on desktop pointers — `(min-width: 768px) and (hover: hover) and (pointer: fine)` — and never under `prefers-reduced-motion`. Phones and tablets get the lighter version; `src/components/HeroNetwork.tsx` is the pattern (lazy chunk, SVG fallback, error boundary).
- **Theme colours** are CSS variables in `src/index.css`. Read them at runtime (e.g. `--color-accent`) instead of hardcoding hex values, including in three.js materials. The site ships the light palette only; the `.dark` block is unused.
- **The `build` script's `cross-env TEMP=… TMP=…` is load-bearing**: esbuild passes chunks over 1 MB (the three.js chunk) through a temp file, and deleting from `%LOCALAPPDATA%\Temp` is denied on the owner's Windows machine, which fails the build.
