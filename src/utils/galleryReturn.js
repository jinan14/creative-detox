// Remembers which artwork the visitor opened, so returning to the Gallery can
// scroll straight back to it instead of the top of the page.
const KEY = "gallery:lastArtwork";

export const rememberArtwork = (id) => {
  try {
    sessionStorage.setItem(KEY, id);
  } catch {
    // Storage blocked (private mode etc.) — returning just lands at the top.
  }
};

export const takeRememberedArtwork = () => {
  try {
    const id = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return id;
  } catch {
    return null;
  }
};
