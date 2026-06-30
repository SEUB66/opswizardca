/**
 * Minimal, dependency-free HTML for catastrophic SSR failures. Kept inline so it
 * renders even if the app bundle itself is the thing that failed to load.
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Wizard Ops — temporarily unavailable</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
    background:#23262B; color:#ECEEF2;
    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
  .card { max-width:30rem; text-align:center; padding:2rem; }
  h1 { font-size:1.25rem; margin:0 0 .5rem; }
  p { color:#9BA3AF; margin:0 0 1.5rem; font-size:.925rem; }
  a { display:inline-block; padding:.6rem 1.1rem; border-radius:.6rem;
    background:#A855F7; color:#1A0B2E; font-weight:700; text-decoration:none; }
</style>
</head>
<body>
  <div class="card">
    <h1>This page didn't load</h1>
    <p>Something went wrong on our end. Please refresh or head back home.</p>
    <a href="/">Go home</a>
  </div>
</body>
</html>`;
}
