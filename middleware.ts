/**
 * HTTP Basic Auth via Vercel Edge Middleware.
 *
 * Wat het doet:
 *  - Vóór elk request controleert deze middleware de Authorization-header.
 *  - Credentials komen uit env vars `AUTH_USER` en `AUTH_PASS` (Vercel
 *    Project Settings → Environment Variables, of `.env.local` voor `vercel
 *    dev`). NOOIT in source.
 *  - Match → request gaat door (return undefined).
 *  - Mismatch of geen credentials → 401 met `WWW-Authenticate: Basic`,
 *    waarop de browser de native login-dialoog toont.
 *
 * Wanneer de env vars NIET zijn gezet, laten we requests gewoon door. Dat
 * voorkomt een lockout in lokale `npm start`-development (waar de
 * middleware niet draait) en in preview-omgevingen waar je vergeten bent
 * de vars toe te voegen. In Vercel productie horen ze altijd gezet te
 * zijn.
 *
 * Matcher sluit Vercel's interne paden uit (`_vercel/*`, `favicon.ico`)
 * zodat statische assets niet onnodig geblokkeerd worden. De rest van de
 * app valt onder de gate.
 */

export const config = {
  matcher: '/((?!_vercel|favicon\\.ico).*)',
};

export default function middleware(request: Request): Response | undefined {
  const expectedUser = process.env.AUTH_USER;
  const expectedPass = process.env.AUTH_PASS;

  // Geen credentials geconfigureerd → niet blokkeren (zie comment boven).
  if (!expectedUser || !expectedPass) return;

  const header = request.headers.get('authorization');
  if (header && header.toLowerCase().startsWith('basic ')) {
    const encoded = header.slice(6).trim();
    let decoded = '';
    try {
      decoded = atob(encoded);
    } catch {
      // ongeldige base64 — door naar 401
    }
    const sep = decoded.indexOf(':');
    if (sep >= 0) {
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        // Auth geslaagd → laat het request door naar de origin / SPA.
        return;
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Landal Configurator", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
