/**
 * @param {string} url -
 * @param {string} [title]
 * @param {string} [text]
 * @returns {Promise<'shared'|'copied'|'failed'>}
 */
export async function shareUrl(url, title = "Check this out!", text = "") {
  if (navigator.share) {
    try {
      await navigator.share({ url, title, text });
      return "shared";
    } catch (err) {
      return "failed";
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch (err) {
      return "failed";
    }
  } else {
    return "failed";
  }
}
