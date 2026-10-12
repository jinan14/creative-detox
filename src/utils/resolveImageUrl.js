import api from "../api/axios";

// Backend origin, derived from the same base URL axios uses (strips trailing /api).
const API_ORIGIN = (api.defaults.baseURL || "").replace(/\/api\/?$/, "");

/**
 * Resolves an artwork/workshop image field into a URL the browser can load.
 * - Absolute URLs (http/https, e.g. seeded Unsplash links) pass through unchanged.
 * - "/uploads/..." paths (returned by POST /api/upload) get prefixed with the
 *   current backend origin, so images work regardless of which host
 *   (localhost, Render, etc.) is currently serving the API.
 * - Everything else (e.g. Vite-bundled local asset imports from src/assets)
 *   passes through unchanged — those are already resolvable frontend URLs,
 *   not backend upload paths, and prefixing them with the API origin would
 *   point the browser at the wrong server.
 */
export default function resolveImageUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${API_ORIGIN}${path}`;
  return path;
}

/**
 * Card-sized WebP thumbnail for an uploaded image, generated server-side on
 * upload into uploads/thumbs/ (see server/utils/thumbnail.js):
 *   "/uploads/123-abc.jpeg" -> "<origin>/uploads/thumbs/123-abc.webp"
 * Non-upload images (absolute URLs, bundled assets) have no thumbnail and
 * resolve to the full image. Pair with an onError fallback to
 * resolveImageUrl(path) in case a thumbnail is missing.
 */
export function resolveThumbnailUrl(path) {
  if (!path || !path.startsWith("/uploads/")) return resolveImageUrl(path);
  const filename = path.slice("/uploads/".length).replace(/\.[^.]+$/, ".webp");
  return `${API_ORIGIN}/uploads/thumbs/${filename}`;
}

/**
 * onError handler for <img src={resolveThumbnailUrl(path)}>: swaps in the
 * full image once if the thumbnail is missing (e.g. an upload from before
 * thumbnails existed that hasn't been migrated yet).
 */
export function fallbackToFullImage(path) {
  return (e) => {
    const full = resolveImageUrl(path);
    if (e.currentTarget.src !== full) e.currentTarget.src = full;
  };
}
