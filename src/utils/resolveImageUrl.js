import api from "../api/axios";

// Backend origin, derived from the same base URL axios uses (strips trailing /api).
const API_ORIGIN = (api.defaults.baseURL || "").replace(/\/api\/?$/, "");

/**
 * Resolves an artwork/workshop image field into a URL the browser can load.
 * - Absolute URLs (http/https, e.g. seeded Unsplash links) pass through unchanged.
 * - Relative paths (e.g. "/uploads/xyz.jpg", returned by POST /api/upload) get
 *   prefixed with the current backend origin, so images work regardless of
 *   which host (localhost, Render, etc.) is currently serving the API.
 */
export default function resolveImageUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
